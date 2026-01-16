<?php

namespace App\Modules\Survey\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Survey extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'is_anonymous',
        'expires_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(SurveyQuestion::class)->orderBy('sort_order');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(SurveyAssignment::class);
    }

    public function responses(): HasManyThrough
    {
        return $this->hasManyThrough(
            SurveyResponse::class,
            SurveyAssignment::class,
            'survey_id',
            'assignment_id'
        );
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'updated_by');
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }
}
