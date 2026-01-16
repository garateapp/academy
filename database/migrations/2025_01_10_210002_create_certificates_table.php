<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('learning_path_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('template_id')->constrained('certificate_templates');
            $table->string('certificate_number')->unique()->comment('Unique certificate identifier');
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamp('issued_at');
            $table->timestamp('expires_at')->nullable()->comment('For certificates that expire');
            $table->timestamp('revoked_at')->nullable();
            $table->foreignId('revoked_by')->nullable()->constrained('users');
            $table->text('revocation_reason')->nullable();
            $table->string('pdf_path')->nullable()->comment('Path to generated PDF');
            $table->string('verification_code')->unique()->comment('Public verification code');
            $table->json('metadata')->nullable()->comment('Additional certificate data like scores, hours, etc.');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'course_id']);
            $table->index(['user_id', 'learning_path_id']);
            $table->index('verification_code');
            $table->index('certificate_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
