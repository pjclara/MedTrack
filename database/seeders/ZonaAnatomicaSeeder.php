<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ZonaAnatomica;

class ZonaAnatomicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $zonas = [
                ['nome' => 'Abdomen', 'descricao' => 'Região abdominal', 'user_id' => $user->id],
                ['nome' => 'Tórax', 'descricao' => 'Cavidade torácica', 'user_id' => $user->id],
                ['nome' => 'Cabeça', 'descricao' => 'Região cefálica', 'user_id' => $user->id],
                ['nome' => 'Pescoco', 'descricao' => 'Região cervical', 'user_id' => $user->id],
                ['nome' => 'Pélvica', 'descricao' => 'Região pélvica', 'user_id' => $user->id],
                ['nome' => 'Membros Superiores', 'descricao' => 'Braços e mãos', 'user_id' => $user->id],
                ['nome' => 'Membros Inferiores', 'descricao' => 'Pernas e pés', 'user_id' => $user->id],
                ['nome' => 'Coluna', 'descricao' => 'Eixo vertebral', 'user_id' => $user->id],
            ];

            foreach ($zonas as $zona) {
                \App\Models\ZonaAnatomica::create($zona);
            }
        }
    }
}
