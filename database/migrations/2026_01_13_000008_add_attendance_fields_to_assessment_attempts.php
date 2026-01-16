<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_attempts', function (Blueprint $table) {
            $table->boolean('attendance_acknowledged')->default(false)->after('instructor_feedback');
            $table->string('attendance_rut', 20)->nullable()->after('attendance_acknowledged');
            $table->timestamp('attendance_acknowledged_at')->nullable()->after('attendance_rut');
        });
    }

    public function down(): void
    {
        Schema::table('assessment_attempts', function (Blueprint $table) {
            $table->dropColumn([
                'attendance_acknowledged',
                'attendance_rut',
                'attendance_acknowledged_at',
            ]);
        });
    }
};
