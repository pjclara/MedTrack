<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Area>
 */
class AreaFactory extends Factory
{
    protected $model = Area::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->unique()->word() . ' ' . fake()->unique()->numberBetween(1, 1000),
            'descricao' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
