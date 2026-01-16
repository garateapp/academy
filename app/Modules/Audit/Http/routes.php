<?php

use App\Modules\Audit\Http\Controllers\AuditLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'can:view-audit-logs'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
});
