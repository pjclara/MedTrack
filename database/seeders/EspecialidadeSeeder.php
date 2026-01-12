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
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $especialidades = [
                [
                    'nome' => 'Cirurgia Geral',
                    'descricao' => 'Procedimentos cirúrgicos gerais e de urgência',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Cirurgia Cardiotorácica',
                    'descricao' => 'Cirurgias do coração, pulmões e tórax',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Cirurgia Vascular',
                    'descricao' => 'Procedimentos em artérias, veias e sistema linfático',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Neurocirurgia',
                    'descricao' => 'Cirurgias do sistema nervoso central e periférico',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Ortopedia',
                    'descricao' => 'Cirurgias do sistema musculoesquelético',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Urologia',
                    'descricao' => 'Procedimentos do sistema urinário e reprodutor masculino',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Ginecologia',
                    'descricao' => 'Cirurgias do sistema reprodutor feminino',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Oftalmologia',
                    'descricao' => 'Procedimentos oftalmológicos',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Otorrinolaringologia',
                    'descricao' => 'Cirurgias de ouvido, nariz e garganta',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Cirurgia Plástica',
                    'descricao' => 'Procedimentos reconstrutivos e estéticos',
                    'user_id' => $user->id,
                ],
            ];

            foreach ($especialidades as $especialidade) {
                Especialidade::firstOrCreate(
                    ['nome' => $especialidade['nome'], 'user_id' => $especialidade['user_id']],
                    ['descricao' => $especialidade['descricao']]
                );
            }
        }
    }
}
