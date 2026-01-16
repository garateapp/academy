<?php

namespace App\Modules\Assessment\Domain;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssessmentQuestion extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'assessment_id',
        'type',
        'question_text',
        'explanation',
        'points',
        'sort_order',
        'is_required',
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(AssessmentQuestionOption::class, 'question_id')->orderBy('sort_order');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(AssessmentResponse::class, 'question_id');
    }

    // Helper methods
    public function getCorrectOptions()
    {
        return $this->options()->where('is_correct', true)->get();
    }

    public function isMultipleChoice(): bool
    {
        return $this->type === 'multiple_choice';
    }

    public function isTrueFalse(): bool
    {
        return $this->type === 'true_false';
    }

    public function isTextBased(): bool
    {
        return in_array($this->type, ['short_answer', 'essay']);
    }

    public function requiresManualGrading(): bool
    {
        return $this->isTextBased();
    }
}
