<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class ModuleCompletion extends Model
{
    protected $fillable = [
        'user_id',
        'enrollment_id',
        'module_id',
        'completed_at',
        'time_spent_seconds',
        'score',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'score' => 'decimal:2',
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

    public function getTimeSpentFormatted(): string
    {
        $seconds = $this->time_spent_seconds;
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        if ($hours > 0) {
            return sprintf('%dh %dm %ds', $hours, $minutes, $secs);
        } elseif ($minutes > 0) {
            return sprintf('%dm %ds', $minutes, $secs);
        } else {
            return sprintf('%ds', $secs);
        }
    }
}
