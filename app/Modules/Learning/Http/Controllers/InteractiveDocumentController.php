<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Learning\Application\Services\InteractiveDocumentService;
use App\Modules\Learning\Domain\CourseModule;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\InteractiveDocumentSubmission;
use App\Modules\Learning\Domain\ModuleCompletion;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class InteractiveDocumentController extends Controller
{
    public function __construct(
        private readonly InteractiveDocumentService $interactiveDocumentService
    ) {}

    public function open(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();
        $enrollment = $this->resolveEnrollment($user->id, $module);

        $this->ensureModuleUnlocked($user->id, $enrollment->id, $module);

        abort_if($module->type !== 'interactive_document', 404);

        $submission = $this->interactiveDocumentService->markOpened($user, $module, $enrollment);

        return response()->json([
            'submission_id' => $submission->id,
            'attempt_number' => $submission->attempt_number,
            'status' => $submission->status,
            'opened_at' => $submission->opened_at,
        ]);
    }

    public function submit(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();
        $enrollment = $this->resolveEnrollment($user->id, $module);

        $this->ensureModuleUnlocked($user->id, $enrollment->id, $module);

        abort_if($module->type !== 'interactive_document', 404);

        $payload = $request->validate([
            'responses' => ['required', 'array'],
            'declaration_accepted' => ['required', 'boolean'],
        ]);

        $submission = $this->interactiveDocumentService->submit(
            request: $request,
            user: $user,
            module: $module,
            enrollment: $enrollment,
            responses: $payload['responses'],
            declarationAccepted: (bool) $payload['declaration_accepted'],
        );

        $recipients = collect(explode(',', (string) (config('mail.to_default') ?: env('MAIL_TO_DEFAULT') ?: env('MAIL_FROM_ADDRESS'))))
            ->map(fn ($email) => trim($email))
            ->filter(fn ($email) => filter_var($email, FILTER_VALIDATE_EMAIL))
            ->unique()
            ->values();

        if ($recipients->isNotEmpty()) {
            $module->loadMissing('course');

            $subject = 'Documento interactivo enviado: ' . ($module->title ?? 'Documento');
            $body = "Usuario: {$user->name} ({$user->email})\n" .
                "Curso: " . ($module->course->name ?? $module->course->title ?? '') . "\n" .
                "Módulo: " . ($module->title ?? '') . "\n" .
                "Intento: {$submission->attempt_number}\n" .
                "ID envío: {$submission->id}\n" .
                "Fecha: " . ($submission->submitted_at?->toDateTimeString() ?? now()->toDateTimeString());

            try {
                Mail::raw($body, function (Message $message) use ($recipients, $subject) {
                    $message->to($recipients->all())->subject($subject);
                });
            } catch (\Throwable $e) {
                // Silenciar errores de envío para no romper respuesta
            }
        }

        return response()->json([
            'submitted' => true,
            'submission' => [
                'id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'status' => $submission->status,
                'updated_at' => $submission->updated_at,
                'submitted_at' => $submission->submitted_at,
                'completed_at' => $submission->completed_at,
                'responses' => $submission->responses_json,
                'declaration_accepted' => $submission->declaration_accepted,
            ],
        ]);
    }

    public function saveDraft(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();
        $enrollment = $this->resolveEnrollment($user->id, $module);

        $this->ensureModuleUnlocked($user->id, $enrollment->id, $module);

        abort_if($module->type !== 'interactive_document', 404);

        $payload = $request->validate([
            'responses' => ['required', 'array'],
            'declaration_accepted' => ['required', 'boolean'],
        ]);

        $submission = $this->interactiveDocumentService->saveDraft(
            request: $request,
            user: $user,
            module: $module,
            enrollment: $enrollment,
            responses: $payload['responses'],
            declarationAccepted: (bool) $payload['declaration_accepted'],
        );

        return response()->json([
            'saved' => true,
            'submission' => [
                'id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'status' => $submission->status,
                'updated_at' => $submission->updated_at,
                'responses' => $submission->responses_json,
                'declaration_accepted' => $submission->declaration_accepted,
            ],
        ]);
    }

    public function startNewAttempt(Request $request, CourseModule $module): JsonResponse
    {
        $user = $request->user();
        $enrollment = $this->resolveEnrollment($user->id, $module);

        $this->ensureModuleUnlocked($user->id, $enrollment->id, $module);

        abort_if($module->type !== 'interactive_document', 404);

        $submission = $this->interactiveDocumentService->startNewAttempt($user, $module, $enrollment);

        return response()->json([
            'created' => true,
            'submission' => [
                'id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'status' => $submission->status,
                'updated_at' => $submission->updated_at,
                'responses' => $submission->responses_json,
                'declaration_accepted' => $submission->declaration_accepted,
            ],
        ]);
    }

    public function receipt(Request $request, CourseModule $module): SymfonyResponse
    {
        $user = $request->user();
        $enrollment = $this->resolveEnrollment($user->id, $module);

        abort_if($module->type !== 'interactive_document', 404);

        $submissionId = (int) $request->integer('submission');
        $submission = $submissionId > 0
            ? $this->interactiveDocumentService->getSubmissionById($module, $enrollment, $user, $submissionId)
            : $this->interactiveDocumentService->getLatestSubmission($module, $enrollment, $user);

        abort_if(!$submission || $submission->submitted_at === null, 404);

        $module->load('course');

        $pdf = Pdf::loadView('interactive-documents.receipt', [
            'course' => $module->course,
            'module' => $module,
            'user' => $user,
            'submission' => $submission,
            'schema' => is_array($submission->schema_json) ? $submission->schema_json : [],
            'responses' => is_array($submission->responses_json) ? $submission->responses_json : [],
        ])->setPaper('letter');

        $fileName = Str::slug($module->title ?: 'documento') . '-intento-' . $submission->attempt_number . '-comprobante.pdf';

        return $pdf->download($fileName);
    }

    public function adminIndex(Request $request): Response
    {
        $this->authorize('viewAny', InteractiveDocumentSubmission::class);

        $search = trim((string) $request->query('search', ''));

        $submissions = InteractiveDocumentSubmission::query()
            ->whereNotNull('submitted_at')
            ->with(['user:id,name,email', 'module:id,title,course_id', 'module.course:id,title'])
            ->when($search !== '', function ($query) use ($search) {
                $like = '%' . addcslashes($search, '_%') . '%';

                $query->where(function ($q) use ($like) {
                    $q->whereHas('user', fn ($qq) => $qq->where('name', 'like', $like)
                        ->orWhere('email', 'like', $like))
                        ->orWhereHas('module', fn ($qq) => $qq->where('title', 'like', $like))
                        ->orWhereHas('module.course', fn ($qq) => $qq->where('title', 'like', $like));
                });
            })
            ->orderByDesc('submitted_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/InteractiveDocuments/Index', [
            'submissions' => $submissions->through(fn (InteractiveDocumentSubmission $submission) => [
                'id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'status' => $submission->status,
                'title' => $submission->schema_json['title'] ?? $submission->module?->title ?? 'Documento interactivo',
                'document_code' => $submission->schema_json['document_code'] ?? null,
                'course_title' => $submission->module?->course?->title,
                'module_title' => $submission->module?->title,
                'user' => [
                    'id' => $submission->user?->id,
                    'name' => $submission->user?->name,
                    'email' => $submission->user?->email,
                ],
                'submitted_at' => $submission->submitted_at?->toIso8601String(),
                'download_url' => route('admin.interactive-documents.download', $submission->id),
            ]),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function adminReceipt(InteractiveDocumentSubmission $submission): SymfonyResponse
    {
        $this->authorize('view', $submission);

        abort_if($submission->submitted_at === null, 404);

        $submission->load(['module.course', 'user']);

        $pdf = Pdf::loadView('interactive-documents.receipt', [
            'course' => $submission->module->course,
            'module' => $submission->module,
            'user' => $submission->user,
            'submission' => $submission,
            'schema' => is_array($submission->schema_json) ? $submission->schema_json : [],
            'responses' => is_array($submission->responses_json) ? $submission->responses_json : [],
        ])->setPaper('letter');

        $fileName = Str::slug($submission->module->title ?: 'documento') . '-intento-' . $submission->attempt_number . '-comprobante.pdf';

        return $pdf->download($fileName);
    }

    private function resolveEnrollment(int $userId, CourseModule $module): Enrollment
    {
        $enrollment = Enrollment::where('user_id', $userId)
            ->where('course_id', $module->course_id)
            ->first();

        if (!$enrollment) {
            abort(403);
        }

        return $enrollment;
    }

    private function ensureModuleUnlocked(int $userId, int $enrollmentId, CourseModule $module): void
    {
        $moduleOrder = $module->course->modules()->orderBy('sort_order')->get(['id']);
        $completedModuleIds = ModuleCompletion::where('user_id', $userId)
            ->where('enrollment_id', $enrollmentId)
            ->pluck('module_id')
            ->all();

        $unlockedModuleIds = [];
        foreach ($moduleOrder as $orderedModule) {
            $unlockedModuleIds[] = $orderedModule->id;
            if (!in_array($orderedModule->id, $completedModuleIds, true)) {
                break;
            }
        }

        if (!in_array($module->id, $unlockedModuleIds, true)) {
            abort(403);
        }
    }
}
