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
                    'nome' => 'Centro Hospitalar de Leiria',
                    'user_id' => $user->id,
                ]               
            ];

            foreach ($hospitais as $hospital) {
                Hospital::firstOrCreate(
                    ['nome' => $hospital['nome'], 'user_id' => $hospital['user_id']]
                );
            }
        }
    }
}
