<?php

use App\Modules\Learning\Http\Controllers\CategoryController;
use App\Modules\Learning\Http\Controllers\CourseController;
use App\Modules\Learning\Http\Controllers\CourseModuleController;
use App\Modules\Learning\Http\Controllers\LearningPathController;
use App\Modules\Learning\Http\Controllers\LearningHistoryController;
use App\Modules\Learning\Http\Controllers\ModuleProgressController;
use App\Modules\Learning\Http\Controllers\ModuleCompletionController;
use App\Modules\Learning\Http\Controllers\ModuleViewController;
use App\Modules\Learning\Http\Controllers\InteractiveDocumentController;
use App\Modules\Learning\Http\Controllers\AttendanceSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    // Courses CRUD
    Route::resource('courses', CourseController::class);
    Route::get('my-history', [LearningHistoryController::class, 'index'])
        ->name('learning.history');
    Route::post('courses/{course}/modules', [CourseModuleController::class, 'store'])
        ->name('courses.modules.store');
    Route::put('courses/{course}/modules/{module}', [CourseModuleController::class, 'update'])
        ->name('courses.modules.update');
    Route::delete('courses/{course}/modules/{module}', [CourseModuleController::class, 'destroy'])
        ->name('courses.modules.destroy');
    Route::post('courses/{course}/modules/reorder', [CourseModuleController::class, 'reorder'])
        ->name('courses.modules.reorder');
    Route::post('courses/{course}/enrollments', [CourseController::class, 'enrollUsers'])
        ->name('courses.enrollments.store');
    Route::post('courses/{course}/self-enroll', [CourseController::class, 'selfEnroll'])
        ->name('courses.self-enroll');
    Route::post('courses/{course}/attendance-sessions', [AttendanceSessionController::class, 'store'])
        ->name('courses.attendance-sessions.store');
    Route::post('courses/{course}/attendance-sessions/{session}/roster', [AttendanceSessionController::class, 'uploadRoster'])
        ->name('courses.attendance-sessions.roster');
    Route::post('courses/{course}/attendance-sessions/{session}/records', [AttendanceSessionController::class, 'storeRecords'])
        ->name('courses.attendance-sessions.records');

    Route::get('modules/{module}', [ModuleViewController::class, 'show'])
        ->name('modules.show');
    Route::post('modules/{module}/progress', [ModuleProgressController::class, 'store'])
        ->name('modules.progress.store');
    Route::post('modules/{module}/complete', [ModuleCompletionController::class, 'store'])
        ->name('modules.complete.store');
    Route::post('modules/{module}/interactive-document/open', [InteractiveDocumentController::class, 'open'])
        ->name('modules.interactive-document.open');
    Route::post('modules/{module}/interactive-document/new-attempt', [InteractiveDocumentController::class, 'startNewAttempt'])
        ->name('modules.interactive-document.new-attempt');
    Route::post('modules/{module}/interactive-document/draft', [InteractiveDocumentController::class, 'saveDraft'])
        ->name('modules.interactive-document.draft');
    Route::post('modules/{module}/interactive-document/submit', [InteractiveDocumentController::class, 'submit'])
        ->name('modules.interactive-document.submit');
    Route::get('modules/{module}/interactive-document/receipt', [InteractiveDocumentController::class, 'receipt'])
        ->name('modules.interactive-document.receipt');

    // Course status actions
    Route::post('courses/{course}/publish', [CourseController::class, 'publish'])
        ->name('courses.publish');
    Route::post('courses/{course}/unpublish', [CourseController::class, 'unpublish'])
        ->name('courses.unpublish');
    Route::post('courses/{course}/archive', [CourseController::class, 'archive'])
        ->name('courses.archive');
});

// Admin routes
Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    // Categories Management
    Route::resource('categories', CategoryController::class);
    Route::post('categories/reorder', [CategoryController::class, 'reorder'])
        ->name('categories.reorder');

    // Learning Paths
    Route::resource('learning-paths', LearningPathController::class);
});
