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
        $admin = User::where('email', 'admin@medtrack.com')->first();
        if ($admin) {
            $admin->assignRole($adminRole);
        }

        // Atribuir user aos outros (opcional, mas boa prática)
        $users = User::where('email', '!=', 'admin@medtrack.com')->get();
        foreach ($users as $user) {
            $user->assignRole($userRole);
        }
    }
}
