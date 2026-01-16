<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_activity_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('enrollment_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('module_id')->nullable()->constrained('course_modules')->onDelete('cascade');
            $table->string('action'); // started, paused, resumed, completed, downloaded
            $table->json('metadata_json')->nullable();
            $table->timestamp('created_at');

            // Índices para mejorar consultas
            $table->index(['user_id', 'created_at']);
            $table->index(['enrollment_id', 'action']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_activity_log');
    }
};
