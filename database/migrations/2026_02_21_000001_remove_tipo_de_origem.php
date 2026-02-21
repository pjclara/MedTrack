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
            $table->dropForeign(['tipo_de_origem_id']);
            $table->dropColumn('tipo_de_origem_id');
        });

        Schema::dropIfExists('tipo_de_origems');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('tipo_de_origems', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->timestamps();
        });

        Schema::table('registo_cirurgicos', function (Blueprint $table) {
            $table->foreignId('tipo_de_origem_id')->nullable()->constrained('tipo_de_origems')->nullOnDelete();
        });
    }
};
