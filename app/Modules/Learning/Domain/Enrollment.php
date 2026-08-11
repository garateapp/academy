<?php

namespace App\Modules\Learning\Domain;

use App\Modules\Assessment\Domain\AssessmentAttempt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'learning_path_id',
        'assigned_by',
        'assigned_via',
        'due_at',
        'started_at',
        'completed_at',
        'status',
        'score',
        'attempts',
    ];

    protected $casts = [
        'due_at'       => 'datetime',
        'started_at'   => 'datetime',
        'completed_at' => 'datetime',
        'score'        => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function learningPath()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function assigner()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'assigned_by');
    }

    public function moduleCompletions()
    {
        return $this->hasMany(ModuleCompletion::class);
    }

    public function activityLogs()
    {
        return $this->hasMany(UserActivityLog::class);
    }

    public function assessmentAttempts(): HasMany
    {
        return $this->hasMany(AssessmentAttempt::class);
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isOverdue(): bool
    {
        return $this->due_at && $this->due_at->isPast() && ! $this->isCompleted();
    }

    public function calculateProgress(): float
    {
        $totalModules = $this->course->modules()->where('is_required', true)->count();

        if ($totalModules === 0) {
            return $this->isCompleted() ? 100 : 0;
        }

        $completedModules = $this->moduleCompletions()
            ->whereHas('module', fn ($q) => $q->where('is_required', true))
            ->count();

        return ($completedModules / $totalModules) * 100;
    }

    public function autoCompleteIfReady(): void
    {
        if ($this->status === 'completed') {
            return;
        }

        if ($this->calculateProgress() >= 100) {
            $this->complete();
        }
    }

    public function complete(): void
    {
        if ($this->status === 'completed') {
            return;
        }

        $this->update([
            'status'       => 'completed',
            'completed_at' => now(),
        ]);

        // Auto-issue certificate if assessment was passed
        $certificateService = app(\App\Modules\Certificate\Application\Services\CertificateService::class);
        $certificateService->autoIssueOnCompletion($this);
    }
}
