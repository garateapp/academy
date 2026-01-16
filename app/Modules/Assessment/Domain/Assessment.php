<?php

namespace App\Modules\Assessment\Domain;

use App\Modules\Learning\Domain\CourseModule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assessment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'module_id',
        'title',
        'description',
        'type',
        'time_limit_minutes',
        'passing_score',
        'max_attempts',
        'randomize_questions',
        'shuffle_questions',
        'shuffle_options',
        'show_correct_answers',
        'allow_review',
        'show_results',
        'available_from',
        'available_until',
        'is_required',
        'sort_order',
    ];

    protected $casts = [
        'randomize_questions' => 'boolean',
        'shuffle_options' => 'boolean',
        'show_correct_answers' => 'boolean',
        'allow_review' => 'boolean',
        'show_results' => 'boolean',
        'is_required' => 'boolean',
        'available_from' => 'datetime',
        'available_until' => 'datetime',
    ];

    protected $appends = [
        'shuffle_questions',
    ];

    public function getShuffleQuestionsAttribute(): bool
    {
        return (bool) ($this->attributes['randomize_questions'] ?? false);
    }

    public function setShuffleQuestionsAttribute(bool $value): void
    {
        $this->attributes['randomize_questions'] = $value;
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(CourseModule::class, 'module_id');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class)->orderBy('sort_order');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(AssessmentAttempt::class);
    }

    // Helper methods
    public function isAvailable(): bool
    {
        $now = now();

        if ($this->available_from && $now->lt($this->available_from)) {
            return false;
        }

        if ($this->available_until && $now->gt($this->available_until)) {
            return false;
        }

        return true;
    }

    public function getTotalPoints(): int
    {
        return $this->questions()->sum('points');
    }

    public function canUserAttempt($userId): bool
    {
        if (!$this->isAvailable()) {
            return false;
        }

        if ($this->max_attempts === null) {
            return true;
        }

        $attemptCount = $this->attempts()
            ->where('user_id', $userId)
            ->whereIn('status', ['submitted', 'graded'])
            ->count();

        return $attemptCount < $this->max_attempts;
    }

    public function getUserBestScore($userId): ?int
    {
        return $this->attempts()
            ->where('user_id', $userId)
            ->where('status', 'graded')
            ->max('score');
    }
}
