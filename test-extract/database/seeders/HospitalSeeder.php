<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hospital;

class HospitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $hospitais = [
                [
                    'nome' => 'Hospital de Santa Maria',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Hospital de São João',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Hospital de Santo António',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Hospital da Luz',
                    'user_id' => $user->id,
                ],
                [
                    'nome' => 'Hospital CUF Descobertas',
                    'user_id' => $user->id,
                ],
            ];

            foreach ($hospitais as $hospital) {
                Hospital::firstOrCreate(
                    ['nome' => $hospital['nome'], 'user_id' => $hospital['user_id']]
                );
            }
        }
    }
}
