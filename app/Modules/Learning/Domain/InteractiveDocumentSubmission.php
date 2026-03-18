<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class InteractiveDocumentSubmission extends Model
{
    protected $fillable = [
        'module_id',
        'enrollment_id',
        'user_id',
        'attempt_number',
        'status',
        'schema_json',
        'responses_json',
        'declaration_label',
        'declaration_accepted',
        'content_hash',
        'response_hash',
        'ip_address',
        'user_agent',
        'opened_at',
        'submitted_at',
        'completed_at',
    ];

    protected $casts = [
        'schema_json' => 'array',
        'responses_json' => 'array',
        'declaration_accepted' => 'boolean',
        'opened_at' => 'datetime',
        'submitted_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function module()
    {
        return $this->belongsTo(CourseModule::class, 'module_id');
    }

    public function scopeForContext($query, int $moduleId, int $enrollmentId, int $userId)
    {
        return $query
            ->where('module_id', $moduleId)
            ->where('enrollment_id', $enrollmentId)
            ->where('user_id', $userId);
    }

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class);
    }
}
