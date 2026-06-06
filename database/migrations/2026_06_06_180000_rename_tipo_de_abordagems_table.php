<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('tipo_de_abordagems') || Schema::hasTable('tipo_de_abordagens')) {
            return;
        }

        // Remove FK before renaming table (compatível entre motores de BD)
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropForeign(['tipo_de_abordagem_id']);
        });

        Schema::rename('tipo_de_abordagems', 'tipo_de_abordagens');

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreign('tipo_de_abordagem_id')
                ->references('id')
                ->on('tipo_de_abordagens')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('tipo_de_abordagens') || Schema::hasTable('tipo_de_abordagems')) {
            return;
        }

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropForeign(['tipo_de_abordagem_id']);
        });

        Schema::rename('tipo_de_abordagens', 'tipo_de_abordagems');

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreign('tipo_de_abordagem_id')
                ->references('id')
                ->on('tipo_de_abordagems')
                ->nullOnDelete();
        });
    }
};
