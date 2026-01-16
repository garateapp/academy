<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'cover_image',
        'duration_minutes',
        'difficulty',
        'version',
        'status',
        'valid_from',
        'valid_until',
        'created_by',
        'updated_by',
        'published_at',
        'allow_self_enrollment',
    ];

    protected $casts = [
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'published_at' => 'datetime',
        'allow_self_enrollment' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function creator()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'updated_by');
    }

    public function modules()
    {
        return $this->hasMany(CourseModule::class)->orderBy('sort_order');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function attendanceSessions()
    {
        return $this->hasMany(AttendanceSession::class)->orderByDesc('session_date');
    }

    public function prerequisites()
    {
        return $this->belongsToMany(Course::class, 'course_prerequisites', 'course_id', 'prerequisite_course_id');
    }

    public function isPrerequisiteFor()
    {
        return $this->belongsToMany(Course::class, 'course_prerequisites', 'prerequisite_course_id', 'course_id');
    }

    public function learningPaths()
    {
        return $this->belongsToMany(LearningPath::class, 'learning_path_items')
            ->withPivot(['sort_order', 'is_required'])
            ->withTimestamps();
    }

    public function isPublished(): bool
    {
        return $this->status === 'active' && $this->published_at !== null;
    }

    public function isExpired(): bool
    {
        return $this->valid_until && $this->valid_until->isPast();
    }

    public function isValid(): bool
    {
        $now = now();
        $validFrom = $this->valid_from ? $now->greaterThanOrEqualTo($this->valid_from) : true;
        $validUntil = $this->valid_until ? $now->lessThanOrEqualTo($this->valid_until) : true;

        return $validFrom && $validUntil;
    }
}
