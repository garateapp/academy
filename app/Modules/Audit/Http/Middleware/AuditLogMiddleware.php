<?php

namespace App\Modules\Audit\Http\Middleware;

use App\Modules\Audit\Application\AuditService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuditLogMiddleware
{
    public function __construct(
        protected AuditService $auditService
    ) {}

    public function handle(Request $request, Closure $next, string $action): Response
    {
        $response = $next($request);

        if ($response->isSuccessful()) {
            $this->auditService->log(
                action: $action,
                entityType: null, // Can be inferred or passed
                entityId: null,   // Can be inferred or passed
                payload: $request->all(),
            );
        }

        return $response;
    }
}
