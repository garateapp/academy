<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('module_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->foreignId('module_id')->constrained('course_modules')->onDelete('cascade');
            $table->integer('duration_seconds')->default(0);
            $table->integer('last_position_seconds')->default(0);
            $table->integer('total_watched_seconds')->default(0);
            $table->decimal('percent_complete', 5, 2)->default(0);
            $table->timestamp('last_heartbeat_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'enrollment_id', 'module_id'], 'unique_module_progress');
            $table->index(['enrollment_id', 'module_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module_progress');
    }
};
