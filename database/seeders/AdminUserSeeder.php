<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminUser::firstOrCreate(
            ['email' => 'admin@medtrack.com'],
            [
                'name' => 'Administrador MedTrack',
                'password' => 'password',
                'role' => 'super_admin',
            ]
        );

        AdminUser::firstOrCreate(
            ['email' => 'gestor@medtrack.com'],
            [
                'name' => 'Gestor MedTrack',
                'password' => 'password',
                'role' => 'admin',
            ]
        );
    }
}
