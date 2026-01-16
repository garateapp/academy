<?php

namespace App\Modules\Survey\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SurveyAssignment extends Model
{
    protected $fillable = [
        'survey_id',
        'user_id',
        'token',
        'status',
        'expires_at',
        'sent_at',
        'completed_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'sent_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class, 'assignment_id');
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }
}
