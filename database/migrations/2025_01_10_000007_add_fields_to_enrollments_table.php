<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            //$table->foreignId('learning_path_id')->nullable()->after('course_id')->constrained()->onDelete('set null');
            $table->enum('assigned_via', ['manual', 'automatic', 'self_enrollment'])->default('manual')->after('assigned_by');
            $table->timestamp('started_at')->nullable()->after('due_at');
            $table->timestamp('completed_at')->nullable()->after('started_at');
            $table->decimal('score', 5, 2)->nullable()->after('status');
            $table->integer('attempts')->default(0)->after('score');

            // Actualizar status para incluir más opciones
            $table->string('status')->default('pending')->change(); // pending, in_progress, completed, failed, expired
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropForeign(['learning_path_id']);
            $table->dropColumn([
                'learning_path_id',
                'assigned_via',
                'started_at',
                'completed_at',
                'score',
                'attempts',
            ]);
        });
    }
};
