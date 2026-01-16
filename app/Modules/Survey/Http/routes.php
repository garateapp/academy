<?php

use App\Modules\Survey\Http\Controllers\SurveyAssignmentController;
use App\Modules\Survey\Http\Controllers\SurveyController;
use App\Modules\Survey\Http\Controllers\SurveyQuestionController;
use App\Modules\Survey\Http\Controllers\SurveyResponseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('surveys', SurveyController::class);
    Route::get('surveys/{survey}/export', [SurveyController::class, 'export'])->name('surveys.export');

    Route::post('surveys/{survey}/assignments', [SurveyAssignmentController::class, 'store'])
        ->name('surveys.assignments.store');

    Route::get('surveys/{survey}/questions/create', [SurveyQuestionController::class, 'create'])
        ->name('surveys.questions.create');
    Route::post('surveys/{survey}/questions', [SurveyQuestionController::class, 'store'])
        ->name('surveys.questions.store');
    Route::get('surveys/{survey}/questions/{question}/edit', [SurveyQuestionController::class, 'edit'])
        ->name('surveys.questions.edit');
    Route::put('surveys/{survey}/questions/{question}', [SurveyQuestionController::class, 'update'])
        ->name('surveys.questions.update');
    Route::delete('surveys/{survey}/questions/{question}', [SurveyQuestionController::class, 'destroy'])
        ->name('surveys.questions.destroy');
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('surveys/invite/{token}', [SurveyResponseController::class, 'show'])
        ->name('surveys.invite');
    Route::post('surveys/invite/{token}', [SurveyResponseController::class, 'submit'])
        ->name('surveys.submit');
    Route::get('my-surveys', [SurveyResponseController::class, 'index'])
        ->name('surveys.my');
});
