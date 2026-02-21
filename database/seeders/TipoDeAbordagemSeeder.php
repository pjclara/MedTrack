<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoDeAbordagem;

class TipoDeAbordagemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $tipos = [
                ['nome' => 'Convencional', 'user_id' => $user->id],
                ['nome' => 'Laparoscópica', 'user_id' => $user->id],
                ['nome' => 'Robótica', 'user_id' => $user->id],
                ['nome' => 'Conversão', 'user_id' => $user->id],
            ];

            foreach ($tipos as $tipo) {
                TipoDeAbordagem::firstOrCreate(
                    ['nome' => $tipo['nome'], 'user_id' => $tipo['user_id']],
                    $tipo
                );
            }
        }
    }
}
