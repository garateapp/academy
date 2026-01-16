<?php

namespace App\Modules\Learning\Domain;

use Illuminate\Database\Eloquent\Model;

class UserActivityLog extends Model
{
    public const UPDATED_AT = null; // Solo usa created_at

    protected $table = 'user_activity_log';

    protected $fillable = [
        'user_id',
        'enrollment_id',
        'module_id',
        'action',
        'metadata_json',
    ];

    protected $casts = [
        'metadata_json' => 'array',
        'created_at' => 'datetime',
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

    public static function logAction(
        int $userId,
        ?int $enrollmentId,
        ?int $moduleId,
        string $action,
        ?array $metadata = null
    ): self {
        return self::create([
            'user_id' => $userId,
            'enrollment_id' => $enrollmentId,
            'module_id' => $moduleId,
            'action' => $action,
            'metadata_json' => $metadata,
        ]);
    }
}
