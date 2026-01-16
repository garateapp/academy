<?php

namespace App\Modules\Assessment\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Application\Services\AssessmentService;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Assessment\Domain\AssessmentAttempt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentAttemptController extends Controller
{
    public function __construct(
        private readonly AssessmentService $assessmentService
    ) {}

    public function start(Assessment $assessment): RedirectResponse
    {
        $user = auth()->user();

        // Check if user can attempt
        if (!$assessment->canUserAttempt($user->id)) {
            return back()->with('error', 'No puedes realizar más intentos en esta evaluación.');
        }

        if (!$assessment->isAvailable()) {
            return back()->with('error', 'Esta evaluación no está disponible en este momento.');
        }

        // Check for existing in-progress attempt
        $existingAttempt = $assessment->attempts()
            ->where('user_id', $user->id)
            ->where('status', 'in_progress')
            ->first();

        if ($existingAttempt) {
            return redirect()->route('assessments.take', [$assessment, $existingAttempt]);
        }

        $attempt = $this->assessmentService->startAttempt($assessment, $user->id);

        return redirect()->route('assessments.take', [$assessment, $attempt]);
    }

    public function take(Assessment $assessment, AssessmentAttempt $attempt): Response
    {
        $this->authorize('view', $attempt);

        // Check if time expired
        if ($attempt->isTimeExpired() && $attempt->isInProgress()) {
            $this->assessmentService->submitAttempt($attempt);
            return redirect()->route('assessments.results', [$assessment, $attempt])
                ->with('warning', 'El tiempo de la evaluación ha expirado.');
        }

        $assessment->load(['questions.options', 'module']);
        $attempt->load('responses');

        // Randomize questions if configured
        $questions = $assessment->shuffle_questions
            ? $assessment->questions->shuffle()
            : $assessment->questions;

        if ($assessment->shuffle_options) {
            $questions = $questions->map(function ($question) {
                $question->setRelation('options', $question->options->shuffle());
                return $question;
            });
        }

        $requiresAttendanceDisclaimer = (bool) ($assessment->module?->is_required);

        return Inertia::render('Learner/Assessments/Take', [
            'assessment' => $assessment,
            'attempt' => $attempt,
            'questions' => $questions,
            'timeRemaining' => $this->getTimeRemaining($attempt, $assessment),
            'requiresAttendanceDisclaimer' => $requiresAttendanceDisclaimer,
        ]);
    }

    public function acknowledge(Request $request, Assessment $assessment, AssessmentAttempt $attempt): RedirectResponse
    {
        $this->authorize('update', $attempt);

        $assessment->load('module');
        $requiresAttendanceDisclaimer = (bool) ($assessment->module?->is_required);

        if (!$requiresAttendanceDisclaimer) {
            return back()->with('error', 'Esta evaluacion no requiere declaracion de asistencia.');
        }

        $data = $request->validate([
            'attendance_rut' => ['required', 'string', 'max:20'],
            'accepted' => ['required', 'boolean'],
        ]);

        if (!$data['accepted']) {
            return back()->with('error', 'Debes aceptar la declaracion de asistencia.');
        }

        $attempt->update([
            'attendance_rut' => $data['attendance_rut'],
            'attendance_acknowledged' => true,
            'attendance_acknowledged_at' => now(),
        ]);

        return back()->with('success', 'Declaracion registrada. Ya puedes responder la evaluacion.');
    }

    public function submitResponse(Request $request, Assessment $assessment, AssessmentAttempt $attempt): RedirectResponse
    {
        $this->authorize('update', $attempt);

        $assessment->load('module');
        if ($assessment->module?->is_required && !$attempt->attendance_acknowledged) {
            return back()->with('error', 'Debes aceptar la declaracion de asistencia antes de responder.');
        }

        if (!$attempt->isInProgress()) {
            return back()->with('error', 'Este intento ya ha sido enviado.');
        }

        $request->validate([
            'question_id' => ['required', 'exists:assessment_questions,id'],
            'selected_option_id' => ['nullable', 'exists:assessment_question_options,id'],
            'text_response' => ['nullable', 'string'],
        ]);

        $this->assessmentService->submitResponse(
            $attempt,
            $request->input('question_id'),
            $request->only(['selected_option_id', 'text_response'])
        );

        return back()->with('success', 'Respuesta guardada.');
    }

    public function submit(Assessment $assessment, AssessmentAttempt $attempt): RedirectResponse
    {
        $this->authorize('update', $attempt);

        $assessment->load('module');
        if ($assessment->module?->is_required && !$attempt->attendance_acknowledged) {
            return back()->with('error', 'Debes aceptar la declaracion de asistencia antes de enviar.');
        }

        if (!$attempt->isInProgress()) {
            return back()->with('error', 'Este intento ya ha sido enviado.');
        }

        $this->assessmentService->submitAttempt($attempt);

        return redirect()->route('assessments.results', [$assessment, $attempt])
            ->with('success', 'Evaluación enviada exitosamente.');
    }

    public function results(Assessment $assessment, AssessmentAttempt $attempt): Response
    {
        $this->authorize('view', $attempt);

        $attempt->load([
            'responses.question.options',
            'responses.selectedOption',
        ]);

        $userProgress = $this->assessmentService->getUserProgress(
            $attempt->user_id,
            $assessment->id
        );

        return Inertia::render('Learner/Assessments/Results', [
            'assessment' => $assessment,
            'attempt' => $attempt,
            'userProgress' => $userProgress,
        ]);
    }

    public function index(): Response
    {
        $user = auth()->user();

        $attempts = AssessmentAttempt::with(['assessment.module.course', 'user'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Learner/Assessments/MyAttempts', [
            'attempts' => $attempts,
        ]);
    }

    public function adminIndex(): Response
    {
        $user = auth()->user();
        $roleName = strtolower($user->role?->name ?? '');
        $roleSlug = strtolower($user->role?->slug ?? '');
        $isAdmin = in_array($roleName, ['superadmin', 'admin'], true)
            || in_array($roleSlug, ['superadmin', 'super-admin', 'admin'], true);

        if (!$isAdmin) {
            abort(403);
        }

        $attempts = AssessmentAttempt::with(['assessment.module.course', 'user'])
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('Admin/Assessments/ResultsIndex', [
            'attempts' => $attempts,
        ]);
    }

    private function getTimeRemaining(AssessmentAttempt $attempt, Assessment $assessment): ?int
    {
        if (!$assessment->time_limit_minutes) {
            return null;
        }

        $elapsed = now()->diffInMinutes($attempt->started_at);
        $remaining = $assessment->time_limit_minutes - $elapsed;

        return max(0, $remaining);
    }
}
