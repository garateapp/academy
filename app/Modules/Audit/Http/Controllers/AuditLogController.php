<?php

namespace App\Modules\Audit\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Audit\Domain\AuditLog;
use App\Modules\Identity\Domain\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('view-audit-logs');

        $filters = [
            'user_id' => $request->input('user_id'),
            'action' => $request->input('action'),
            'date_from' => $request->input('date_from'),
            'date_to' => $request->input('date_to'),
        ];

        $dateFrom = $filters['date_from']
            ? Carbon::parse($filters['date_from'])->startOfDay()
            : null;
        $dateTo = $filters['date_to']
            ? Carbon::parse($filters['date_to'])->endOfDay()
            : null;

        $logsQuery = AuditLog::with('actor')
            ->when($filters['user_id'], fn ($query) => $query->where('actor_user_id', $filters['user_id']))
            ->when($filters['action'], fn ($query) => $query->where('action', 'like', '%' . $filters['action'] . '%'));

        if ($dateFrom && $dateTo) {
            $logsQuery->whereBetween('created_at', [$dateFrom, $dateTo]);
        } elseif ($dateFrom) {
            $logsQuery->where('created_at', '>=', $dateFrom);
        } elseif ($dateTo) {
            $logsQuery->where('created_at', '<=', $dateTo);
        }

        $logs = $logsQuery
            ->orderByDesc('created_at')
            ->paginate(25)
            ->withQueryString();

        $users = User::select('id', 'name', 'email')
            ->orderBy('name')
            ->get()
            ->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);

        return Inertia::render('Admin/AuditLogs/Index', [
            'logs' => $logs,
            'filters' => $filters,
            'users' => $users,
        ]);
    }
}
