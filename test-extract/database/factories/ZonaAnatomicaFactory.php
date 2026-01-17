<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\ZonaAnatomica;
use Illuminate\Database\Eloquent\Factories\Factory;

class ZonaAnatomicaFactory extends Factory
{
    protected $model = ZonaAnatomica::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->unique()->word() . ' ' . $this->faker->numberBetween(1, 100),
            'descricao' => $this->faker->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
