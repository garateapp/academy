<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('course_modules', function (Blueprint $table) {
            $table->text('description')->nullable()->after('title');
            $table->string('asset_type')->nullable()->after('asset_path');
            $table->integer('duration_minutes')->nullable()->after('asset_type');
            $table->boolean('is_required')->default(true)->after('duration_minutes');
            $table->json('config_json')->nullable()->after('sort_order');

            // Actualizar la columna type para incluir más opciones
            $table->string('type')->change(); // Ya existe, solo asegurar que soporta: text, video, file, scorm, link, assessment
        });
    }

    public function down(): void
    {
        Schema::table('course_modules', function (Blueprint $table) {
            $table->dropColumn([
                'description',
                'asset_type',
                'duration_minutes',
                'is_required',
                'config_json',
            ]);
        });
    }
};
