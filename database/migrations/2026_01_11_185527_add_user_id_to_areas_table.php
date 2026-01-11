<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('areas', function (Blueprint $table) {
            if (!Schema::hasColumn('areas', 'user_id')) {
                $table->foreignId('user_id')->after('id')->nullable()->constrained()->onDelete('cascade');
            }
            $table->dropUnique(['nome']);
            $table->unique(['user_id', 'nome']);
        });
        
        // Atribuir o primeiro user a áreas órfãs (se existirem) e depois tornar non-nullable
        $firstUser = \App\Models\User::first();
        if ($firstUser) {
            \App\Models\Area::whereNull('user_id')->update(['user_id' => $firstUser->id]);
        }
        
        Schema::table('areas', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('areas', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'nome']);
            $table->unique(['nome']);
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
