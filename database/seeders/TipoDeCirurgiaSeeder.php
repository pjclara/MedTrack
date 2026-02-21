<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoDeCirurgia;

class TipoDeCirurgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            'Cirurgia Eletiva',
            'Cirurgia de Urgência',
            'Cirurgia Ambulatória',
            'Pequena Cirurgia',
        ];

        foreach ($tipos as $tipo) {
            TipoDeCirurgia::firstOrCreate(['nome' => $tipo]);
        }
    }
}
