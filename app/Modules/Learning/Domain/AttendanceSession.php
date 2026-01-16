<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttendanceSession extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'session_date',
        'location',
        'notes',
        'roster_path',
        'roster_hash',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'session_date' => 'date',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function records(): HasMany
    {
        return $this->hasMany(AttendanceRecord::class, 'session_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'updated_by');
    }
}
