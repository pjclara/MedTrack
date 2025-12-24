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
            'Cirurgia de Emergência',
            'Cirurgia Ambulatória',
            'Cirurgia de Grande Porte',
            'Cirurgia de Médio Porte',
            'Cirurgia de Pequeno Porte',
            'Cirurgia Minimamente Invasiva',
            'Cirurgia Reconstrutiva',
            'Cirurgia Paliativa',
        ];

        foreach ($tipos as $tipo) {
            TipoDeCirurgia::create(['nome' => $tipo]);
        }
    }
}
