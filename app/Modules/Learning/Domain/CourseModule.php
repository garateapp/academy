<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class CourseModule extends Model
{
    protected $appends = [
        'assessment_id',
    ];

    protected $fillable = [
        'course_id',
        'type',
        'title',
        'description',
        'content',
        'asset_path',
        'asset_type',
        'duration_minutes',
        'is_required',
        'sort_order',
        'config_json',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'config_json' => 'array',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function assessment()
    {
        return $this->hasOne(\App\Modules\Assessment\Domain\Assessment::class, 'module_id');
    }

    public function completions()
    {
        return $this->hasMany(ModuleCompletion::class, 'module_id');
    }

    public function activityLogs()
    {
        return $this->hasMany(UserActivityLog::class, 'module_id');
    }

    public function isCompleted($userId, $enrollmentId): bool
    {
        return $this->completions()
            ->where('user_id', $userId)
            ->where('enrollment_id', $enrollmentId)
            ->exists();
    }

    public function getAssessmentIdAttribute(): ?int
    {
        if ($this->relationLoaded('assessment') && $this->assessment) {
            return $this->assessment->id;
        }

        $value = $this->config_json['assessment_id'] ?? null;

        return is_numeric($value) ? (int) $value : null;
    }
}
