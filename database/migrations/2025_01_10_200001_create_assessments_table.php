<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('course_modules')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['quiz', 'exam', 'assignment', 'survey'])->default('quiz');
            $table->integer('time_limit_minutes')->nullable()->comment('Time limit in minutes, null = no limit');
            $table->integer('passing_score')->default(70)->comment('Minimum score to pass (percentage)');
            $table->integer('max_attempts')->nullable()->comment('Maximum attempts allowed, null = unlimited');
            $table->boolean('randomize_questions')->default(false);
            $table->boolean('show_correct_answers')->default(true)->comment('Show correct answers after completion');
            $table->boolean('allow_review')->default(true)->comment('Allow reviewing assessment after submission');
            $table->timestamp('available_from')->nullable();
            $table->timestamp('available_until')->nullable();
            $table->boolean('is_required')->default(true)->comment('Required to complete the module');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['module_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
