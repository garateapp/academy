<?php

use App\Modules\Reporting\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/courses/export', [ReportController::class, 'exportByCourse'])->name('reports.courses.export');
    Route::get('reports/courses/acta', [ReportController::class, 'acta'])->name('reports.courses.acta');
    Route::get('reports/courses', [ReportController::class, 'byCourse'])->name('reports.courses');
});
