<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('assessment_attempts')->cascadeOnDelete();
            $table->foreignId('question_id')->constrained('assessment_questions')->cascadeOnDelete();
            $table->foreignId('selected_option_id')->nullable()->constrained('assessment_question_options')->nullOnDelete();
            $table->text('text_response')->nullable()->comment('For short answer and essay questions');
            $table->boolean('is_correct')->nullable();
            $table->integer('points_awarded')->nullable();
            $table->text('feedback')->nullable()->comment('Instructor feedback for this specific answer');
            $table->timestamps();

            $table->index(['attempt_id', 'question_id']);
            $table->unique(['attempt_id', 'question_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_responses');
    }
};
