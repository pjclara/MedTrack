<?php

namespace Database\Factories;

use App\Models\TipoDeOrigem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoDeOrigem>
 */
class TipoDeOrigemFactory extends Factory
{
    protected $model = TipoDeOrigem::class;

    public function definition(): array
    {
        static $counter = 0;
        $tipos = [
            'Consulta Externa',
            'Urgência',
            'Internamento',
            'Referenciação',
            'Triagem',
        ];
        
        return [
            'nome' => $tipos[$counter++ % count($tipos)] . ' ' . fake()->unique()->numberBetween(1, 10000),
        ];
    }
}
