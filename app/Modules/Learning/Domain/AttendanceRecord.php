<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttendanceRecord extends Model
{
    protected $fillable = [
        'session_id',
        'user_id',
        'status',
        'recorded_by',
        'recorded_at',
        'notes',
    ];

    protected $casts = [
        'recorded_at' => 'datetime',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(AttendanceSession::class, 'session_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'recorded_by');
    }
}
