<?php

namespace Database\Factories;

use App\Enums\ClavienDindoEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Models\Cirurgia;
use App\Models\RegistoCirurgico;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cirurgia>
 */
class CirurgiaFactory extends Factory
{
    protected $model = Cirurgia::class;

    public function definition(): array
    {
        $clavienDindo = fake()->boolean(30) 
            ? fake()->randomElement(ClavienDindoEnum::cases())->value 
            : null;

        return [
            'registo_cirurgico_id' => RegistoCirurgico::factory(),
            'diagnostico_id' => Diagnostico::factory(),
            'procedimento_id' => Procedimento::factory(),
            'funcao' => fake()->randomElement(FuncaoCirurgiaoEnum::cases())->value,
            'clavien-dindo' => $clavienDindo,
            'observacoes' => fake()->optional()->sentence(),
        ];
    }

    public function withComplication(): Factory
    {
        return $this->state(fn (array $attributes) => [
            'clavien-dindo' => fake()->randomElement([
                ClavienDindoEnum::GRAU_I->value,
                ClavienDindoEnum::GRAU_II->value,
                ClavienDindoEnum::GRAU_IIIA->value,
            ]),
        ]);
    }

    public function withSevereComplication(): Factory
    {
        return $this->state(fn (array $attributes) => [
            'clavien-dindo' => fake()->randomElement([
                ClavienDindoEnum::GRAU_IVA->value,
                ClavienDindoEnum::GRAU_IVB->value,
                ClavienDindoEnum::GRAU_V->value,
            ]),
        ]);
    }

    public function asPrincipalSurgeon(): Factory
    {
        return $this->state(fn (array $attributes) => [
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
        ]);
    }
}
