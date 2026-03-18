<?php

namespace App\Modules\Identity\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Identity\Domain\User;
use App\Modules\Identity\Domain\Role;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\InteractiveDocumentSubmission;
use App\Modules\Identity\Http\Requests\StoreUserRequest;
use App\Modules\Identity\Http\Requests\UpdateUserRequest;
use App\Modules\Audit\Application\AuditService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService
    ) {
        $this->authorizeResource(User::class, 'user');
    }

    public function index(): Response
    {
        $users = User::with('role')
            ->withCount(['enrollments' => function ($query) {
                $query->where('status', 'active');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', User::class);

        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->authorize('create', User::class);

        $validated = $request->validated();

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user = User::create($validated);

        $this->auditService->log(
            action: 'user.created',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
            ]
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    public function show(User $user): Response
    {
        $user->load([
            'role.permissions',
            'enrollments.course.modules',
            'moduleCompletions.module',
            'interactiveDocumentSubmissions.module.course',
        ]);

        $user->loadCount([
            'enrollments',
            'moduleCompletions',
        ]);

        $enrolledCourseIds = $user->enrollments->pluck('course_id')->all();
        $availableCourses = Course::whereIn('status', ['active', 'published'])
            ->whereNotIn('id', $enrolledCourseIds)
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('Admin/Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'area' => $user->area,
                'position' => $user->position,
                'status' => $user->status,
                'google_id' => $user->google_id,
                'avatar' => $user->avatar,
                'last_login_at' => $user->last_login_at?->toIso8601String(),
                'created_at' => $user->created_at?->toIso8601String(),
                'role' => [
                    'id' => $user->role->id,
                    'name' => $user->role->name,
                    'description' => $user->role->description,
                    'permissions' => $user->role->permissions->map(fn ($permission) => [
                        'id' => $permission->id,
                        'key' => $permission->key,
                        'name' => $permission->name,
                        'module' => $permission->module,
                    ])->values(),
                ],
                'enrollments' => $user->enrollments->map(function (Enrollment $enrollment) {
                    return [
                        'id' => $enrollment->id,
                        'course' => [
                            'id' => $enrollment->course?->id,
                            'title' => $enrollment->course?->title,
                            'slug' => $enrollment->course?->slug,
                        ],
                        'status' => $enrollment->status,
                        'progress' => round($enrollment->calculateProgress(), 2),
                        'enrolled_at' => $enrollment->created_at?->toIso8601String(),
                        'completed_at' => $enrollment->completed_at?->toIso8601String(),
                    ];
                })->values(),
                'enrollments_count' => $user->enrollments_count,
                'module_completions' => $user->moduleCompletions
                    ->sortByDesc('completed_at')
                    ->values()
                    ->map(fn ($completion) => [
                        'id' => $completion->id,
                        'module' => [
                            'id' => $completion->module?->id,
                            'title' => $completion->module?->title,
                        ],
                        'completed_at' => $completion->completed_at?->toIso8601String(),
                        'score' => $completion->score !== null ? (float) $completion->score : null,
                    ]),
                'module_completions_count' => $user->module_completions_count,
                'interactive_document_submissions' => $user->interactiveDocumentSubmissions
                    ->whereNotNull('submitted_at')
                    ->sortByDesc('submitted_at')
                    ->values()
                    ->map(fn (InteractiveDocumentSubmission $submission) => [
                        'id' => $submission->id,
                        'attempt_number' => $submission->attempt_number,
                        'status' => $submission->status,
                        'title' => $submission->schema_json['title'] ?? $submission->module?->title ?? 'Documento interactivo',
                        'document_code' => $submission->schema_json['document_code'] ?? null,
                        'course_title' => $submission->module?->course?->title,
                        'module_title' => $submission->module?->title,
                        'submitted_at' => $submission->submitted_at?->toIso8601String(),
                        'receipt_url' => route('admin.users.interactive-documents.receipt', [
                            'user' => $user->id,
                            'submission' => $submission->id,
                        ]),
                    ]),
            ],
            'availableCourses' => $availableCourses,
        ]);
    }

    public function interactiveDocumentReceipt(User $user, InteractiveDocumentSubmission $submission): SymfonyResponse
    {
        $this->authorize('view', $user);

        abort_unless($submission->user_id === $user->id, 404);

        $submission->loadMissing('module.course');
        abort_unless($submission->module !== null && $submission->submitted_at !== null, 404);

        $schema = is_array($submission->schema_json) ? $submission->schema_json : [];
        $responses = is_array($submission->responses_json) ? $submission->responses_json : [];

        $pdf = Pdf::loadView('interactive-documents.receipt', [
            'course' => $submission->module->course,
            'module' => $submission->module,
            'user' => $user,
            'submission' => $submission,
            'schema' => $schema,
            'responses' => $responses,
        ])->setPaper('letter');

        $fileName = Str::slug(($submission->module->title ?: 'documento') . '-' . $user->name)
            . '-intento-' . $submission->attempt_number . '-comprobante.pdf';

        return $pdf->download($fileName);
    }

    public function edit(User $user): Response
    {
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();

        $oldValues = $user->only(['name', 'email', 'area', 'position', 'role_id', 'status']);

        // Only hash password if a new one is provided
        if (isset($validated['password']) && !empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        $this->auditService->log(
            action: 'user.updated',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'old_values' => $oldValues,
                'new_values' => $user->only(['name', 'email', 'area', 'position', 'role_id', 'status']),
            ]
        );

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    public function destroy(User $user): RedirectResponse
    {
        // Prevent deleting users with active enrollments
        $activeEnrollments = $user->enrollments()->where('status', 'active')->count();

        if ($activeEnrollments > 0) {
            return back()->with('error', 'No se puede eliminar un usuario con matrículas activas.');
        }

        $this->auditService->log(
            action: 'user.deleted',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        );

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $oldStatus = $user->status;
        $newStatus = $oldStatus === 'active' ? 'inactive' : 'active';

        $user->update(['status' => $newStatus]);

        $this->auditService->log(
            action: 'user.status_changed',
            entityType: 'user',
            entityId: (string) $user->id,
            payload: [
                'user_id' => $user->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
            ]
        );

        return back()->with('success', 'Estado del usuario actualizado.');
    }

    public function enroll(Request $request, User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $validated = $request->validate([
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'due_at' => ['nullable', 'date'],
            'assigned_via' => ['nullable', 'in:manual,automatic,self_enrollment'],
        ]);

        $alreadyEnrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $validated['course_id'])
            ->exists();

        if ($alreadyEnrolled) {
            return back()->with('error', 'El usuario ya esta matriculado en este curso.');
        }

        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $validated['course_id'],
            'assigned_by' => $request->user()->id,
            'assigned_via' => $validated['assigned_via'] ?? 'manual',
            'due_at' => $validated['due_at'] ?? null,
            'status' => 'active',
        ]);

        $this->auditService->log(
            action: 'enrollment.created',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $user->id,
                'course_id' => $validated['course_id'],
                'assigned_by' => $request->user()->id,
                'assigned_via' => $validated['assigned_via'] ?? 'manual',
                'due_at' => $validated['due_at'] ?? null,
            ]
        );

        return back()->with('success', 'Curso asignado correctamente.');
    }
}
