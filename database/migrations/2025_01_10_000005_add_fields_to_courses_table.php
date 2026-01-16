<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('id')->constrained()->onDelete('set null');
            $table->string('slug')->unique()->after('title');
            $table->string('cover_image')->nullable()->after('description');
            $table->integer('duration_minutes')->nullable()->after('cover_image');
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->default('beginner')->after('duration_minutes');
            $table->timestamp('valid_from')->nullable()->after('status');
            $table->timestamp('valid_until')->nullable()->after('valid_from');
            $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->onDelete('set null');
            $table->timestamp('published_at')->nullable()->after('updated_by');

            // Renombrar expires_at a valid_until (ya está agregado arriba)
            $table->dropColumn('expires_at');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->timestamp('expires_at')->nullable();
            $table->dropForeign(['category_id']);
            $table->dropForeign(['updated_by']);
            $table->dropColumn([
                'category_id',
                'slug',
                'cover_image',
                'duration_minutes',
                'difficulty',
                'valid_from',
                'valid_until',
                'updated_by',
                'published_at',
            ]);
        });
    }
};
