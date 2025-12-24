<?php

namespace Tests\Unit\Models;

use App\Enums\ClavienDindoEnum;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Models\Cirurgia;
use App\Models\RegistoCirurgico;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CirurgiaTest extends TestCase
{
    use RefreshDatabase;

    public function test_cirurgia_casts_funcao_to_enum(): void
    {
        $cirurgia = Cirurgia::factory()->create([
            'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
        ]);

        expect($cirurgia->funcao)
            ->toBeInstanceOf(FuncaoCirurgiaoEnum::class)
            ->and($cirurgia->funcao)->toBe(FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL);
    }

    public function test_cirurgia_casts_clavien_dindo_to_enum(): void
    {
        $cirurgia = Cirurgia::factory()->create([
            'clavien-dindo' => ClavienDindoEnum::GRAU_II->value,
        ]);

        expect($cirurgia->{'clavien-dindo'})
            ->toBeInstanceOf(ClavienDindoEnum::class)
            ->and($cirurgia->{'clavien-dindo'})->toBe(ClavienDindoEnum::GRAU_II);
    }

    public function test_cirurgia_belongs_to_registo_cirurgico(): void
    {
        $cirurgia = Cirurgia::factory()->create();

        expect($cirurgia->registoCirurgico)->toBeInstanceOf(RegistoCirurgico::class);
    }

    public function test_cirurgia_belongs_to_diagnostico(): void
    {
        $cirurgia = Cirurgia::factory()->create();

        expect($cirurgia->diagnostico)->toBeInstanceOf(Diagnostico::class);
    }

    public function test_cirurgia_belongs_to_procedimento(): void
    {
        $cirurgia = Cirurgia::factory()->create();

        expect($cirurgia->procedimento)->toBeInstanceOf(Procedimento::class);
    }

    public function test_tem_complicacoes_returns_true_when_clavien_dindo_is_set(): void
    {
        $cirurgia = Cirurgia::factory()->create([
            'clavien-dindo' => ClavienDindoEnum::GRAU_II->value,
        ]);

        expect($cirurgia->temComplicacoes())->toBeTrue();
    }

    public function test_tem_complicacoes_returns_false_when_clavien_dindo_is_null(): void
    {
        $cirurgia = Cirurgia::factory()->create([
            'clavien-dindo' => null,
        ]);

        expect($cirurgia->temComplicacoes())->toBeFalse();
    }
}
