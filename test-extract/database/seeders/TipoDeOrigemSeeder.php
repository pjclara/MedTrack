<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoDeOrigem;

class TipoDeOrigemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            'Consulta Externa',
            'Urgência',
            'Internamento',
        ];

        foreach ($tipos as $tipo) {
            TipoDeOrigem::firstOrCreate(['nome' => $tipo]);
        }
    }
}
