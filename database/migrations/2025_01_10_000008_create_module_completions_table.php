<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('module_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->foreignId('module_id')->constrained('course_modules')->onDelete('cascade');
            $table->timestamp('completed_at');
            $table->integer('time_spent_seconds')->default(0);
            $table->decimal('score', 5, 2)->nullable();
            $table->timestamps();

            // Índice único para evitar duplicados
            $table->unique(['user_id', 'enrollment_id', 'module_id'], 'unique_module_completion');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module_completions');
    }
};
