<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Application\Services\AssessmentService;
use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\Course;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\ModuleCompletion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseApprovalController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService,
        private readonly AssessmentService $assessmentService
    ) {}

    public function index(Request $request): Response
    {
        abort_unless(auth()->user()->email === 'carlos.alvarez@garatehermanos.cl', 403);

        $courses = Course::with(['category', 'modules.assessment'])
            ->whereIn('status', ['active', 'published'])
            ->orderBy('title')
            ->get()
            ->map(fn (Course $course) => [
                'id' => $course->id,
                'title' => $course->title,
                'category' => $course->category?->name,
                'has_assessment' => $course->modules()->whereHas('assessment')->exists(),
                'enrollments_count' => $course->enrollments()->count(),
            ]);

        $selectedCourseId = $request->integer('course_id');
        $enrollments = null;
        $course = null;

        if ($selectedCourseId) {
            $course = Course::with(['modules.assessment'])->findOrFail($selectedCourseId);
            $enrollments = Enrollment::with('user')
                ->where('course_id', $selectedCourseId)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function (Enrollment $enrollment) use ($course) {
                    $latestAttempt = $this->latestAttempt($enrollment->user_id, $course);
                    return [
                        'id' => $enrollment->id,
                        'user' => [
                            'id' => $enrollment->user?->id,
                            'name' => $enrollment->user?->name,
                            'email' => $enrollment->user?->email,
                        ],
                        'status' => $enrollment->status,
                        'progress' => $enrollment->status === 'completed' ? 100 : round($enrollment->calculateProgress(), 2),
                        'enrolled_at' => $enrollment->created_at?->toIso8601String(),
                        'completed_at' => $enrollment->completed_at?->toIso8601String(),
                        'has_assessment' => $course->modules()->whereHas('assessment')->exists(),
                        'attempt' => $latestAttempt ? [
                            'id' => $latestAttempt->id,
                            'status' => $latestAttempt->status,
                            'score' => $latestAttempt->score,
                            'passed' => $latestAttempt->passed,
                            'graded_at' => $latestAttempt->graded_at?->toIso8601String(),
                        ] : null,
                    ];
                });
        }

        return Inertia::render('Admin/CourseApprovals/Index', [
            'courses' => $courses->values(),
            'course' => $course ? [
                'id' => $course->id,
                'title' => $course->title,
                'has_assessment' => $course->modules()->whereHas('assessment')->exists(),
            ] : null,
            'enrollments' => $enrollments,
            'selected_course_id' => $selectedCourseId,
        ]);
    }

    public function grade(Request $request, Enrollment $enrollment): RedirectResponse
    {
        abort_unless(auth()->user()->email === 'carlos.alvarez@garatehermanos.cl', 403);

        $course = $enrollment->course;
        abort_unless($course->modules()->whereHas('assessment')->exists(), 403);

        $validated = $request->validate([
            'score' => ['required', 'numeric', 'between:0,100'],
            'passed' => ['required', 'boolean'],
        ]);

        $attempt = $this->latestAttempt($enrollment->user_id, $course);
        abort_unless($attempt, 404, 'No hay intento de evaluación para calificar.');

        $attempt->update([
            'score' => (float) $validated['score'],
            'passed' => (bool) $validated['passed'],
            'status' => 'graded',
            'graded_at' => now(),
            'graded_by' => auth()->id(),
        ]);

        if ((bool) $validated['passed']) {
            $assessment = $course->modules()->whereHas('assessment')->first()->assessment;
            ModuleCompletion::firstOrCreate(
                [
                    'user_id' => $enrollment->user_id,
                    'enrollment_id' => $enrollment->id,
                    'module_id' => $assessment->module_id,
                ],
                [
                    'completed_at' => now(),
                    'time_spent_seconds' => 0,
                    'score' => (float) $validated['score'],
                ]
            );
            $enrollment->autoCompleteIfReady();
        }

        $this->auditService->log(
            action: 'enrollment.graded_manually',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $enrollment->user_id,
                'course_id' => $course->id,
                'score' => (float) $validated['score'],
                'passed' => (bool) $validated['passed'],
                'graded_by' => auth()->id(),
            ]
        );

        return back()->with('success', 'Evaluación calificada correctamente.');
    }

    public function complete(Request $request, Enrollment $enrollment): RedirectResponse
    {
        abort_unless(auth()->user()->email === 'carlos.alvarez@garatehermanos.cl', 403);

        $course = $enrollment->course;

        if ($course->modules()->whereHas('assessment')->exists()) {
            $attempt = $this->latestAttempt($enrollment->user_id, $course);
            abort_unless(
                $attempt && $attempt->status === 'graded' && $attempt->passed === true,
                403,
                'El usuario debe tener la evaluación aprobada para finalizar el curso.'
            );
        }

        $enrollment->complete();

        $this->markModulesCompleted($enrollment);

        $this->auditService->log(
            action: 'enrollment.completed_manually',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $enrollment->user_id,
                'course_id' => $course->id,
                'completed_by' => auth()->id(),
            ]
        );

        return back()->with('success', 'Curso marcado como finalizado.');
    }

    public function rehabilitate(Request $request, Enrollment $enrollment): RedirectResponse
    {
        abort_unless(auth()->user()->email === 'carlos.alvarez@garatehermanos.cl', 403);

        $enrollment->update([
            'status' => 'active',
            'completed_at' => null,
        ]);

        $this->auditService->log(
            action: 'enrollment.rehabilitated',
            entityType: 'enrollment',
            entityId: (string) $enrollment->id,
            payload: [
                'user_id' => $enrollment->user_id,
                'course_id' => $enrollment->course_id,
                'rehabilitated_by' => auth()->id(),
            ]
        );

        return back()->with('success', 'Usuario rehabilitado en el curso.');
    }

    public function completeAll(Request $request, Course $course): RedirectResponse
    {
        abort_unless(auth()->user()->email === 'carlos.alvarez@garatehermanos.cl', 403);

        $hasAssessment = $course->modules()->whereHas('assessment')->exists();
        $enrollments = Enrollment::where('course_id', $course->id)
            ->where('status', 'active')
            ->get();

        $completed = 0;
        foreach ($enrollments as $enrollment) {
            if ($hasAssessment) {
                $attempt = $this->latestAttempt($enrollment->user_id, $course);
                if (! $attempt || $attempt->status !== 'graded' || $attempt->passed !== true) {
                    continue;
                }
            }

            $enrollment->complete();

            $this->markModulesCompleted($enrollment);
            $completed++;

            $this->auditService->log(
                action: 'enrollment.completed_manually',
                entityType: 'enrollment',
                entityId: (string) $enrollment->id,
                payload: [
                    'user_id' => $enrollment->user_id,
                    'course_id' => $course->id,
                    'completed_by' => auth()->id(),
                    'bulk' => true,
                ]
            );
        }

        $this->auditService->log(
            action: 'course.completed_all_enrollments',
            entityType: 'course',
            entityId: (string) $course->id,
            payload: [
                'course_id' => $course->id,
                'completed_count' => $completed,
                'completed_by' => auth()->id(),
            ]
        );

        return back()->with('success', "Se finalizaron {$completed} usuarios del curso.");
    }

    private function markModulesCompleted(Enrollment $enrollment): void
    {
        $course = $enrollment->course;
        $course->load('modules');

        foreach ($course->modules as $module) {
            if (! $module->is_required) {
                continue;
            }

            ModuleCompletion::firstOrCreate(
                [
                    'user_id'       => $enrollment->user_id,
                    'enrollment_id' => $enrollment->id,
                    'module_id'     => $module->id,
                ],
                [
                    'completed_at'       => now(),
                    'time_spent_seconds' => ($module->duration_minutes ?? 1) * 60,
                    'score'              => null,
                ]
            );
        }
    }

    private function latestAttempt(int $userId, Course $course): ?AssessmentAttempt
    {
        $assessmentIds = \App\Modules\Assessment\Domain\Assessment::whereIn(
            'module_id',
            $course->modules()->pluck('id')
        )->pluck('id');

        if ($assessmentIds->isEmpty()) {
            return null;
        }

        return AssessmentAttempt::whereIn('assessment_id', $assessmentIds->all())
            ->where('user_id', $userId)
            ->latest('id')
            ->first();
    }
}
