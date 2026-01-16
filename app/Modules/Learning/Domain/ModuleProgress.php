<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class ModuleProgress extends Model
{
    protected $fillable = [
        'user_id',
        'enrollment_id',
        'module_id',
        'duration_seconds',
        'last_position_seconds',
        'total_watched_seconds',
        'percent_complete',
        'last_heartbeat_at',
    ];

    protected $casts = [
        'last_heartbeat_at' => 'datetime',
        'percent_complete' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function module()
    {
        return $this->belongsTo(CourseModule::class, 'module_id');
    }
}
