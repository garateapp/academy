<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interactive_document_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('course_modules')->cascadeOnDelete();
            $table->foreignId('enrollment_id')->constrained('enrollments')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['not_started', 'in_progress', 'submitted'])->default('not_started');
            $table->json('schema_json')->nullable();
            $table->json('responses_json')->nullable();
            $table->text('declaration_label')->nullable();
            $table->boolean('declaration_accepted')->default(false);
            $table->string('content_hash', 64)->nullable();
            $table->string('response_hash', 64)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('opened_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['module_id', 'enrollment_id', 'user_id'], 'interactive_document_unique_submission');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interactive_document_submissions');
    }
};
