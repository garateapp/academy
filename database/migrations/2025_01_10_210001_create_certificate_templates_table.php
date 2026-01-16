<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificate_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('content')->comment('HTML template with placeholders');
            $table->string('orientation')->default('landscape')->comment('landscape or portrait');
            $table->string('size')->default('A4')->comment('Paper size: A4, Letter, etc.');
            $table->json('styles')->nullable()->comment('CSS styles for the template');
            $table->json('placeholders')->nullable()->comment('Available placeholders with descriptions');
            $table->boolean('is_default')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificate_templates');
    }
};
