<?php

use App\Modules\Identity\Http\Controllers\LoginController;
use App\Modules\Identity\Http\Controllers\RoleController;
use App\Modules\Identity\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('web')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    })->name('login');

    Route::get('/auth/redirect', [LoginController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/callback', [LoginController::class, 'handleGoogleCallback']);
});

// Admin routes
Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    // Users Management
    Route::resource('users', UserController::class);
    Route::post('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])
        ->name('users.toggle-status');
    Route::post('users/{user}/enrollments', [UserController::class, 'enroll'])
        ->name('users.enrollments.store');

    // Roles Management
    Route::resource('roles', RoleController::class);
    Route::post('roles/{role}/duplicate', [RoleController::class, 'duplicate'])
        ->name('roles.duplicate');
});
