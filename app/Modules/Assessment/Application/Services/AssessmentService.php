<?php

namespace App\Modules\Assessment\Application\Services;

use App\Modules\Assessment\Domain\Assessment;
use App\Modules\Assessment\Domain\AssessmentAttempt;
use App\Modules\Assessment\Domain\AssessmentResponse;
use App\Modules\Audit\Application\AuditService;
use Illuminate\Support\Facades\DB;

class AssessmentService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function startAttempt(Assessment $assessment, int $userId, ?int $enrollmentId = null): AssessmentAttempt
    {
        // Get the next attempt number
        $attemptNumber = $assessment->attempts()
            ->where('user_id', $userId)
            ->max('attempt_number') + 1;

        $attempt = AssessmentAttempt::create([
            'assessment_id' => $assessment->id,
            'user_id' => $userId,
            'enrollment_id' => $enrollmentId,
            'attempt_number' => $attemptNumber,
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        $this->auditService->log(
            action: 'assessment.attempt_started',
            entityType: 'assessment_attempt',
            entityId: (string) $attempt->id,
            payload: [
                'assessment_id' => $assessment->id,
                'attempt_id' => $attempt->id,
                'user_id' => $userId,
                'attempt_number' => $attemptNumber,
            ]
        );

        return $attempt;
    }

    public function submitResponse(AssessmentAttempt $attempt, int $questionId, array $data): AssessmentResponse
    {
        $response = AssessmentResponse::updateOrCreate(
            [
                'attempt_id' => $attempt->id,
                'question_id' => $questionId,
            ],
            [
                'selected_option_id' => $data['selected_option_id'] ?? null,
                'text_response' => $data['text_response'] ?? null,
            ]
        );

        // Auto-grade if applicable
        $response->autoGrade();

        return $response;
    }

    public function submitAttempt(AssessmentAttempt $attempt): void
    {
        DB::transaction(function () use ($attempt) {
            // Mark as submitted
            $attempt->update([
                'status' => 'submitted',
                'submitted_at' => now(),
            ]);

            // Auto-grade all responses
            foreach ($attempt->responses as $response) {
                $response->autoGrade();
            }

            // Check if manual grading is needed
            if (!$attempt->requiresManualGrading()) {
                $this->gradeAttempt($attempt);
            }

            $this->auditService->log(
                action: 'assessment.attempt_submitted',
                entityType: 'assessment_attempt',
                entityId: (string) $attempt->id,
                payload: [
                    'assessment_id' => $attempt->assessment_id,
                    'attempt_id' => $attempt->id,
                    'user_id' => $attempt->user_id,
                    'requires_manual_grading' => $attempt->requiresManualGrading(),
                ]
            );
        });
    }

    public function gradeAttempt(AssessmentAttempt $attempt, ?int $graderId = null): void
    {
        DB::transaction(function () use ($attempt, $graderId) {
            $attempt->calculateScore();

            $attempt->update([
                'status' => 'graded',
                'graded_at' => now(),
                'graded_by' => $graderId,
            ]);

            $this->auditService->log(
                action: 'assessment.attempt_graded',
                entityType: 'assessment_attempt',
                entityId: (string) $attempt->id,
                payload: [
                    'assessment_id' => $attempt->assessment_id,
                    'attempt_id' => $attempt->id,
                    'user_id' => $attempt->user_id,
                    'score' => $attempt->score,
                    'passed' => $attempt->passed,
                    'graded_by' => $graderId,
                ]
            );
        });
    }

    public function gradeResponse(AssessmentResponse $response, bool $isCorrect, int $pointsAwarded, ?string $feedback = null): void
    {
        $response->update([
            'is_correct' => $isCorrect,
            'points_awarded' => $pointsAwarded,
            'feedback' => $feedback,
        ]);

        // Recalculate attempt score
        $attempt = $response->attempt;
        if ($attempt->status === 'submitted') {
            // Check if all responses are graded
            if (!$attempt->requiresManualGrading()) {
                $this->gradeAttempt($attempt);
            }
        }
    }

    public function getAttemptStatistics(Assessment $assessment): array
    {
        $attempts = $assessment->attempts()->where('status', 'graded')->get();

        if ($attempts->isEmpty()) {
            return [
                'total_attempts' => 0,
                'average_score' => 0,
                'pass_rate' => 0,
                'highest_score' => 0,
                'lowest_score' => 0,
            ];
        }

        return [
            'total_attempts' => $attempts->count(),
            'average_score' => round($attempts->avg('score'), 2),
            'pass_rate' => round(($attempts->where('passed', true)->count() / $attempts->count()) * 100, 2),
            'highest_score' => $attempts->max('score'),
            'lowest_score' => $attempts->min('score'),
        ];
    }

    public function getUserProgress(int $userId, int $assessmentId): array
    {
        $assessment = Assessment::findOrFail($assessmentId);
        $attempts = $assessment->attempts()
            ->where('user_id', $userId)
            ->orderBy('attempt_number', 'desc')
            ->get();

        $bestScore = $attempts->where('status', 'graded')->max('score');
        $latestAttempt = $attempts->first();

        return [
            'can_attempt' => $assessment->canUserAttempt($userId),
            'attempts_used' => $attempts->whereIn('status', ['submitted', 'graded'])->count(),
            'max_attempts' => $assessment->max_attempts,
            'best_score' => $bestScore,
            'passed' => $bestScore >= $assessment->passing_score,
            'latest_attempt' => $latestAttempt,
        ];
    }
}
