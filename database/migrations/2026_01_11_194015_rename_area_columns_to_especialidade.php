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
            $table->renameColumn('area_cirurgica', 'especialidade');
        });

        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->renameColumn('area', 'especialidade');
        });

        Schema::table('procedimentos', function (Blueprint $table) {
            $table->renameColumn('area', 'especialidade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->renameColumn('especialidade', 'area_cirurgica');
        });

        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->renameColumn('especialidade', 'area');
        });

        Schema::table('procedimentos', function (Blueprint $table) {
            $table->renameColumn('especialidade', 'area');
        });
    }
};
