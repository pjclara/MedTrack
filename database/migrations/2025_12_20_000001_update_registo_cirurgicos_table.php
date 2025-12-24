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
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreignId('tipo_de_origem_id')
                ->nullable()
                ->after('tipo_de_cirurgia_id')
                ->constrained('tipo_de_origems')
                ->nullOnDelete();
            $table->boolean('ambulatorio')
                ->default(false)
                ->after('tipo_de_origem_id');
        });

        Schema::table('cirurgias', function (Blueprint $table) {
            $table->text('anatomia_patologica')
                ->nullable()
                ->after('clavien-dindo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cirurgias', function (Blueprint $table) {
            $table->dropColumn('anatomia_patologica');
        });

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->dropColumn(['ambulatorio']);
            $table->dropConstrainedForeignId('tipo_de_origem_id');
        });
    }
};
