<?php

namespace App\Modules\Learning\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Certificate\Domain\Certificate;
use App\Modules\Learning\Domain\Enrollment;
use App\Modules\Learning\Domain\InteractiveDocumentSubmission;
use Inertia\Inertia;
use Inertia\Response;

class LearningHistoryController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $courses = Enrollment::with('course:id,title')
            ->where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (Enrollment $enrollment) => [
                'id' => $enrollment->id,
                'status' => $enrollment->status,
                'started_at' => $enrollment->started_at?->toIso8601String(),
                'completed_at' => $enrollment->completed_at?->toIso8601String(),
                'due_at' => $enrollment->due_at?->toIso8601String(),
                'course' => [
                    'id' => $enrollment->course?->id,
                    'title' => $enrollment->course?->title,
                    'url' => $enrollment->course?->id ? route('courses.show', $enrollment->course->id) : null,
                ],
            ])
            ->values()
            ->all();

        $assessments = AssessmentAttempt::with('assessment.module.course:id,title')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (AssessmentAttempt $attempt) => [
                'id' => $attempt->id,
                'attempt_number' => $attempt->attempt_number,
                'status' => $attempt->status,
                'score' => $attempt->score,
                'started_at' => $attempt->started_at?->toIso8601String(),
                'submitted_at' => $attempt->submitted_at?->toIso8601String(),
                'assessment' => [
                    'id' => $attempt->assessment?->id,
                    'title' => $attempt->assessment?->title,
                    'course_title' => $attempt->assessment?->module?->course?->title,
                    'results_url' => $attempt->assessment?->id
                        ? route('assessments.results', [$attempt->assessment->id, $attempt->id])
                        : null,
                ],
            ])
            ->values()
            ->all();

        $certificates = Certificate::with('course:id,title')
            ->where('user_id', $user->id)
            ->orderByDesc('issued_at')
            ->get()
            ->map(fn (Certificate $certificate) => [
                'id' => $certificate->id,
                'certificate_number' => $certificate->certificate_number,
                'issued_at' => $certificate->issued_at?->toIso8601String(),
                'course_title' => $certificate->course?->title,
                'download_url' => route('certificates.download', $certificate->id),
            ])
            ->values()
            ->all();

        $documents = InteractiveDocumentSubmission::with('module.course:id,title')
            ->where('user_id', $user->id)
            ->whereNotNull('submitted_at')
            ->orderByDesc('submitted_at')
            ->orderByDesc('attempt_number')
            ->get()
            ->map(fn (InteractiveDocumentSubmission $submission) => [
                'id' => $submission->id,
                'attempt_number' => $submission->attempt_number,
                'status' => $submission->status,
                'submitted_at' => $submission->submitted_at?->toIso8601String(),
                'completed_at' => $submission->completed_at?->toIso8601String(),
                'title' => $submission->schema_json['title'] ?? $submission->module?->title ?? 'Documento interactivo',
                'document_code' => $submission->schema_json['document_code'] ?? null,
                'course_title' => $submission->module?->course?->title,
                'module_title' => $submission->module?->title,
                'receipt_url' => $submission->module
                    ? route('modules.interactive-document.receipt', [
                        'module' => $submission->module_id,
                        'submission' => $submission->id,
                    ])
                    : null,
            ])
            ->values()
            ->all();

        return Inertia::render('Learner/History/Index', [
            'stats' => [
                'courses' => count($courses),
                'assessments' => count($assessments),
                'certificates' => count($certificates),
                'documents' => count($documents),
            ],
            'history' => [
                'courses' => $courses,
                'assessments' => $assessments,
                'certificates' => $certificates,
                'documents' => $documents,
            ],
        ]);
    }
}
