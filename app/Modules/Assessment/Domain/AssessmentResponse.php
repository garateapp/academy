<?php

namespace App\Modules\Assessment\Domain;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'question_id',
        'selected_option_id',
        'text_response',
        'is_correct',
        'points_awarded',
        'feedback',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(AssessmentAttempt::class, 'attempt_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(AssessmentQuestion::class, 'question_id');
    }

    public function selectedOption(): BelongsTo
    {
        return $this->belongsTo(AssessmentQuestionOption::class, 'selected_option_id');
    }

    // Helper methods
    public function autoGrade(): void
    {
        $question = $this->question;

        // Only auto-grade multiple choice and true/false
        if (!in_array($question->type, ['multiple_choice', 'true_false'])) {
            return;
        }

        if (!$this->selected_option_id) {
            $this->is_correct = false;
            $this->points_awarded = 0;
            $this->save();
            return;
        }

        $selectedOption = $this->selectedOption;
        $this->is_correct = $selectedOption->is_correct;
        $this->points_awarded = $this->is_correct ? $question->points : 0;
        $this->save();
    }
}
