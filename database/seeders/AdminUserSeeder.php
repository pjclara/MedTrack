<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminUser::create([
            'name' => 'Super Admin',
            'email' => 'admin@medfolio.com',
            'password' => 'admin123',
            'role' => 'super_admin',
        ]);
        
        AdminUser::create([
            'name' => 'Gestor Medfolio',
            'email' => 'gestor@medfolio.com',
            'password' => 'admin123',
            'role' => 'admin',
        ]);
    }
}
