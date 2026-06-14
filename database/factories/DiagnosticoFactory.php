<?php

namespace Database\Factories;

use App\Models\Diagnostico;
use App\Models\User;
use App\Models\ZonaAnatomica;
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
            'zona_anatomica_id' => ZonaAnatomica::factory(),
            'descricao' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
