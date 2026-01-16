<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survey_response_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('survey_responses')->cascadeOnDelete();
            $table->foreignId('option_id')->constrained('survey_question_options')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['response_id', 'option_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_response_options');
    }
};
