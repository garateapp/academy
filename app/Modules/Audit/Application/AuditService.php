<?php

namespace App\Modules\Audit\Application;

use App\Modules\Audit\Domain\AuditLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditService
{
    public function log(string $action, ?string $entityType = null, ?string $entityId = null, ?array $payload = null): void
    {
        AuditLog::create([
            'actor_user_id' => Auth::id(),
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'payload_json' => $payload,
            'ip' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
