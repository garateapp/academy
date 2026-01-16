<?php

namespace App\Modules\Audit\Domain;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'actor_user_id',
        'action',
        'entity_type',
        'entity_id',
        'payload_json',
        'ip',
        'user_agent',
    ];

    protected $casts = [
        'payload_json' => 'array',
    ];

    public function actor()
    {
        return $this->belongsTo(\App\Modules\Identity\Domain\User::class, 'actor_user_id');
    }
}
