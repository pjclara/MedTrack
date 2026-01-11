<?php

namespace Database\Factories;

use App\Models\Diagnostico;
use App\Models\Especialidade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Diagnostico>
 */
class DiagnosticoFactory extends Factory
{
    protected $model = Diagnostico::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->words(3, true),
            'zona_anatomica' => fake()->randomElement(['Abdomen', 'Tórax', 'Pescoço', 'Membros Superiores', 'Membros Inferiores']),
            'descricao' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
