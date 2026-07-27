<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('course_modules')
            ->whereNull('duration_minutes')
            ->update(['duration_minutes' => 1]);

        Schema::table('course_modules', function (Blueprint $table) {
            $table->integer('duration_minutes')->unsigned()->default(1)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('course_modules', function (Blueprint $table) {
            $table->integer('duration_minutes')->nullable()->change();
        });
    }
};
