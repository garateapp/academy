<?php

namespace App\Modules\Assessment\Domain;

use App\Modules\Identity\Domain\User;
use App\Modules\Learning\Domain\Enrollment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id',
        'user_id',
        'enrollment_id',
        'attempt_number',
        'status',
        'started_at',
        'submitted_at',
        'graded_at',
        'graded_by',
        'score',
        'points_earned',
        'total_points',
        'passed',
        'instructor_feedback',
        'attendance_acknowledged',
        'attendance_rut',
        'attendance_acknowledged_at',
    ];

    protected $casts = [
        'passed' => 'boolean',
        'started_at' => 'datetime',
        'submitted_at' => 'datetime',
        'graded_at' => 'datetime',
        'attendance_acknowledged' => 'boolean',
        'attendance_acknowledged_at' => 'datetime',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function grader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(AssessmentResponse::class, 'attempt_id');
    }

    // Helper methods
    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    public function isSubmitted(): bool
    {
        return in_array($this->status, ['submitted', 'graded']);
    }

    public function isGraded(): bool
    {
        return $this->status === 'graded';
    }

    public function requiresManualGrading(): bool
    {
        return $this->responses()
            ->whereHas('question', function ($query) {
                $query->whereIn('type', ['short_answer', 'essay']);
            })
            ->whereNull('is_correct')
            ->exists();
    }

    public function calculateScore(): void
    {
        $this->points_earned = $this->responses()->sum('points_awarded');
        $this->total_points = $this->assessment->getTotalPoints();

        if ($this->total_points > 0) {
            $this->score = round(($this->points_earned / $this->total_points) * 100);
            $this->passed = $this->score >= $this->assessment->passing_score;
        }

        $this->save();
    }

    public function getTimeElapsed(): ?int
    {
        if (!$this->submitted_at) {
            return null;
        }

        return $this->started_at->diffInMinutes($this->submitted_at);
    }

    public function isTimeExpired(): bool
    {
        if (!$this->assessment->time_limit_minutes) {
            return false;
        }

        $elapsed = now()->diffInMinutes($this->started_at);
        return $elapsed >= $this->assessment->time_limit_minutes;
    }
}
