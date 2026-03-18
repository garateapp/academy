<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('interactive_document_submissions', 'attempt_number')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->unsignedInteger('attempt_number')->default(1)->after('user_id');
            });
        }

        if (!$this->hasIndex('interactive_document_submissions', 'interactive_document_module_id_index')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->index('module_id', 'interactive_document_module_id_index');
            });
        }

        if ($this->hasIndex('interactive_document_submissions', 'interactive_document_unique_submission')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->dropUnique('interactive_document_unique_submission');
            });
        }

        if (!$this->hasIndex('interactive_document_submissions', 'interactive_document_lookup_index')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->index(['module_id', 'enrollment_id', 'user_id'], 'interactive_document_lookup_index');
            });
        }

        if (Schema::hasColumn('interactive_document_submissions', 'attempt_number')) {
            DB::table('interactive_document_submissions')
                ->whereNull('attempt_number')
                ->update(['attempt_number' => 1]);
        }
    }

    public function down(): void
    {
        if ($this->hasIndex('interactive_document_submissions', 'interactive_document_lookup_index')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->dropIndex('interactive_document_lookup_index');
            });
        }

        if ($this->hasIndex('interactive_document_submissions', 'interactive_document_module_id_index')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->dropIndex('interactive_document_module_id_index');
            });
        }

        if (Schema::hasColumn('interactive_document_submissions', 'attempt_number')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->dropColumn('attempt_number');
            });
        }

        if (!$this->hasIndex('interactive_document_submissions', 'interactive_document_unique_submission')) {
            Schema::table('interactive_document_submissions', function (Blueprint $table) {
                $table->unique(['module_id', 'enrollment_id', 'user_id'], 'interactive_document_unique_submission');
            });
        }
    }

    private function hasIndex(string $table, string $indexName): bool
    {
        $database = DB::getDatabaseName();

        return DB::table('information_schema.statistics')
            ->where('table_schema', $database)
            ->where('table_name', $table)
            ->where('index_name', $indexName)
            ->exists();
    }
};
