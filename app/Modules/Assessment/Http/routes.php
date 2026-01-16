<?php

use App\Modules\Assessment\Http\Controllers\AssessmentController;
use App\Modules\Assessment\Http\Controllers\AssessmentQuestionController;
use App\Modules\Assessment\Http\Controllers\AssessmentAttemptController;
use Illuminate\Support\Facades\Route;

// Admin routes for assessment management
Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    // Assessments CRUD
    Route::resource('assessments', AssessmentController::class);
    Route::get('assessment-results', [AssessmentAttemptController::class, 'adminIndex'])
        ->name('assessments.results.index');

    // Assessment Questions
    Route::get('assessments/{assessment}/questions/create', [AssessmentQuestionController::class, 'create'])
        ->name('assessments.questions.create');
    Route::post('assessments/{assessment}/questions', [AssessmentQuestionController::class, 'store'])
        ->name('assessments.questions.store');
    Route::post('assessments/{assessment}/questions/bulk', [AssessmentQuestionController::class, 'bulkUpload'])
        ->name('assessments.questions.bulk');
    Route::get('assessments/{assessment}/questions/template', [AssessmentQuestionController::class, 'downloadTemplate'])
        ->name('assessments.questions.template');
    Route::get('assessments/{assessment}/questions/{question}/edit', [AssessmentQuestionController::class, 'edit'])
        ->name('assessments.questions.edit');
    Route::put('assessments/{assessment}/questions/{question}', [AssessmentQuestionController::class, 'update'])
        ->name('assessments.questions.update');
    Route::delete('assessments/{assessment}/questions/{question}', [AssessmentQuestionController::class, 'destroy'])
        ->name('assessments.questions.destroy');
    Route::post('assessments/{assessment}/questions/reorder', [AssessmentQuestionController::class, 'reorder'])
        ->name('assessments.questions.reorder');
});

// Learner routes for taking assessments
Route::middleware(['web', 'auth'])->group(function () {
    // Start assessment attempt
    Route::post('assessments/{assessment}/start', [AssessmentAttemptController::class, 'start'])
        ->name('assessments.start');

    // Take assessment
    Route::get('assessments/{assessment}/attempts/{attempt}', [AssessmentAttemptController::class, 'take'])
        ->name('assessments.take');

    // Submit individual response
    Route::post('assessments/{assessment}/attempts/{attempt}/response', [AssessmentAttemptController::class, 'submitResponse'])
        ->name('assessments.submit-response');

    // Acknowledge attendance disclaimer
    Route::post('assessments/{assessment}/attempts/{attempt}/acknowledge', [AssessmentAttemptController::class, 'acknowledge'])
        ->name('assessments.acknowledge');

    // Submit entire attempt
    Route::post('assessments/{assessment}/attempts/{attempt}/submit', [AssessmentAttemptController::class, 'submit'])
        ->name('assessments.submit');

    // View results
    Route::get('assessments/{assessment}/attempts/{attempt}/results', [AssessmentAttemptController::class, 'results'])
        ->name('assessments.results');

    // My attempts
    Route::get('my-assessments', [AssessmentAttemptController::class, 'index'])
        ->name('assessments.my-attempts');
});
