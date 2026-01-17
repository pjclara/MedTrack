<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Atribuir admin ao administrador
        $admin = User::whereIn('email', ['admin@medtrack.com'])->get();
        foreach ($admin as $user) {
            $user->assignRole($adminRole);
        }

        // Atribuir user aos outros (opcional, mas boa prática)
        $users = User::whereNotIn('email', ['admin@medtrack.com'])->get();
        foreach ($users as $user) {
            $user->assignRole($userRole);
        }
    }
}
