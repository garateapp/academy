<?php

namespace App\Modules\Assessment\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Application\Services\AssessmentService;
use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Assessment\Http\Requests\StoreAssessmentRequest;
use App\Modules\Assessment\Http\Requests\UpdateAssessmentRequest;
use App\Modules\Audit\Application\AuditService;
use App\Modules\Learning\Domain\CourseModule;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    public function __construct(
        private readonly AuditService $auditService,
        private readonly AssessmentService $assessmentService
    ) {
        $this->authorizeResource(Assessment::class, 'assessment');
    }

    public function index(): Response
    {
        $assessments = Assessment::with(['module.course'])
            ->withCount(['questions', 'attempts'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Assessments/Index', [
            'assessments' => $assessments,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Assessment::class);

        $modules = CourseModule::with('course')
            ->orderBy('title')
            ->get();

        return Inertia::render('Admin/Assessments/Create', [
            'modules' => $modules,
        ]);
    }

    public function store(StoreAssessmentRequest $request): RedirectResponse
    {
        $this->authorize('create', Assessment::class);

        $assessment = Assessment::create($request->validated());

        $this->auditService->log(
            action: 'assessment.created',
            entityType: 'assessment',
            entityId: (string) $assessment->id,
            payload: [
                'assessment_id' => $assessment->id,
                'title' => $assessment->title,
                'type' => $assessment->type,
            ]
        );

        return redirect()->route('admin.assessments.show', $assessment)
            ->with('success', 'Evaluación creada exitosamente.');
    }

    public function show(Assessment $assessment): Response
    {
        $assessment->load([
            'module.course',
            'questions.options',
        ]);

        $assessment->loadCount(['questions', 'attempts']);

        $statistics = $this->assessmentService->getAttemptStatistics($assessment);

        return Inertia::render('Admin/Assessments/Show', [
            'assessment' => $assessment,
            'statistics' => $statistics,
        ]);
    }

    public function edit(Assessment $assessment): Response
    {
        $modules = CourseModule::with('course')
            ->orderBy('title')
            ->get();

        return Inertia::render('Admin/Assessments/Edit', [
            'assessment' => $assessment,
            'modules' => $modules,
        ]);
    }

    public function update(UpdateAssessmentRequest $request, Assessment $assessment): RedirectResponse
    {
        $oldData = $assessment->toArray();

        $assessment->update($request->validated());

        $this->auditService->log(
            action: 'assessment.updated',
            entityType: 'assessment',
            entityId: (string) $assessment->id,
            payload: [
                'assessment_id' => $assessment->id,
                'old_values' => $oldData,
                'new_values' => $assessment->fresh()->toArray(),
            ]
        );

        return redirect()->route('admin.assessments.show', $assessment)
            ->with('success', 'Evaluación actualizada exitosamente.');
    }

    public function destroy(Assessment $assessment): RedirectResponse
    {
        // Check if there are any attempts
        if ($assessment->attempts()->exists()) {
            return back()->with('error', 'No se puede eliminar una evaluación que tiene intentos registrados.');
        }

        $assessmentData = $assessment->toArray();
        $assessment->delete();

        $this->auditService->log(
            action: 'assessment.deleted',
            entityType: 'assessment',
            entityId: (string) $assessmentData['id'],
            payload: [
                'assessment_id' => $assessmentData['id'],
                'title' => $assessmentData['title'],
            ]
        );

        return redirect()->route('admin.assessments.index')
            ->with('success', 'Evaluación eliminada exitosamente.');
    }
}
