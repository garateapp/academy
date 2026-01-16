<?php

namespace App\Modules\Survey\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SurveyResponse extends Model
{
    protected $fillable = [
        'assignment_id',
        'question_id',
        'user_id',
        'text_response',
    ];

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(SurveyAssignment::class, 'assignment_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestion::class, 'question_id');
    }

    public function selectedOptions(): BelongsToMany
    {
        return $this->belongsToMany(
            SurveyQuestionOption::class,
            'survey_response_options',
            'response_id',
            'option_id'
        )->withTimestamps();
    }

    public function respondent(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'user_id');
    }
}
