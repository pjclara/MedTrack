<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Especialidade;

class EspecialidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $especialidades = [
            [
                'nome' => 'Cirurgia Geral',
                'descricao' => 'Procedimentos cirúrgicos gerais e de urgência',
            ],
            [
                'nome' => 'Cirurgia Cardiotorácica',
                'descricao' => 'Cirurgias do coração, pulmões e tórax',
            ],
            [
                'nome' => 'Cirurgia Vascular',
                'descricao' => 'Procedimentos em artérias, veias e sistema linfático',
            ],
            [
                'nome' => 'Neurocirurgia',
                'descricao' => 'Cirurgias do sistema nervoso central e periférico',
            ],
            [
                'nome' => 'Ortopedia',
                'descricao' => 'Cirurgias do sistema musculoesquelético',
            ],
            [
                'nome' => 'Urologia',
                'descricao' => 'Procedimentos do sistema urinário e reprodutor masculino',
            ],
            [
                'nome' => 'Ginecologia',
                'descricao' => 'Cirurgias do sistema reprodutor feminino',
            ],
            [
                'nome' => 'Oftalmologia',
                'descricao' => 'Procedimentos oftalmológicos',
            ],
            [
                'nome' => 'Otorrinolaringologia',
                'descricao' => 'Cirurgias de ouvido, nariz e garganta',
            ],
            [
                'nome' => 'Cirurgia Plástica',
                'descricao' => 'Procedimentos reconstrutivos e estéticos',
            ],
        ];

        foreach ($especialidades as $especialidade) {
            Especialidade::create($especialidade);
        }
    }
}
