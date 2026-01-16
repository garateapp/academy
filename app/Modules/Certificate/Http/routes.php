<?php

use App\Modules\Certificate\Http\Controllers\CertificateController;
use App\Modules\Certificate\Http\Controllers\CertificateTemplateController;
use Illuminate\Support\Facades\Route;

// Admin routes for certificate management
Route::middleware(['web', 'auth'])->prefix('admin')->name('admin.')->group(function () {
    // Certificates CRUD
    Route::resource('certificates', CertificateController::class)->except(['edit', 'update']);

    // Certificate actions
    Route::post('certificates/{certificate}/revoke', [CertificateController::class, 'revoke'])
        ->name('certificates.revoke');
    Route::post('certificates/{certificate}/regenerate', [CertificateController::class, 'regenerate'])
        ->name('certificates.regenerate');
    Route::get('certificates/{certificate}/download', [CertificateController::class, 'download'])
        ->name('certificates.download');

    // Certificate Templates CRUD
    Route::resource('certificate-templates', CertificateTemplateController::class);
    Route::post('certificate-templates/{template}/duplicate', [CertificateTemplateController::class, 'duplicate'])
        ->name('certificate-templates.duplicate');
});

// Learner routes
Route::middleware(['web', 'auth'])->group(function () {
    // My certificates
    Route::get('my-certificates', [CertificateController::class, 'myCertificates'])
        ->name('certificates.my-certificates');

    // Download own certificate
    Route::get('certificates/{certificate}/download', [CertificateController::class, 'download'])
        ->name('certificates.download');
});

// Public routes
Route::middleware('web')->group(function () {
    // Certificate verification
    Route::get('verify-certificate/{verificationCode}', [CertificateController::class, 'verify'])
        ->name('certificates.verify');
});
