<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class LearningPath extends Model
{
    protected $fillable = [
        'name',
        'description',
        'cover_image',
        'status',
        'created_by',
    ];

    public function creator()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'created_by');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'learning_path_items')
            ->withPivot(['sort_order', 'is_required'])
            ->withTimestamps()
            ->orderBy('learning_path_items.sort_order');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function isPublished(): bool
    {
        return $this->status === 'active';
    }

    public function getTotalDuration(): int
    {
        return $this->courses()->sum('duration_minutes') ?? 0;
    }

    public function getCourseCount(): int
    {
        return $this->courses()->count();
    }
}
