<?php

namespace Tests\Unit\Enums;

use App\Enums\ClavienDindoEnum;
use Tests\TestCase;

class ClavienDindoEnumTest extends TestCase
{
    public function test_clavien_dindo_enum_has_correct_values(): void
    {
        expect(ClavienDindoEnum::GRAU_I->value)->toBe('I')
            ->and(ClavienDindoEnum::GRAU_II->value)->toBe('II')
            ->and(ClavienDindoEnum::GRAU_IIIA->value)->toBe('IIIa')
            ->and(ClavienDindoEnum::GRAU_IIIB->value)->toBe('IIIb')
            ->and(ClavienDindoEnum::GRAU_IVA->value)->toBe('IVa')
            ->and(ClavienDindoEnum::GRAU_IVB->value)->toBe('IVb')
            ->and(ClavienDindoEnum::GRAU_V->value)->toBe('V');
    }

    public function test_descricao_returns_correct_description(): void
    {
        expect(ClavienDindoEnum::GRAU_I->descricao())
            ->toBe('Qualquer desvio do curso pós-operatório normal')
            ->and(ClavienDindoEnum::GRAU_V->descricao())
            ->toBe('Morte do paciente');
    }

    public function test_is_grave_returns_true_for_severe_complications(): void
    {
        expect(ClavienDindoEnum::GRAU_IVA->isGrave())->toBeTrue()
            ->and(ClavienDindoEnum::GRAU_IVB->isGrave())->toBeTrue()
            ->and(ClavienDindoEnum::GRAU_V->isGrave())->toBeTrue();
    }

    public function test_is_grave_returns_false_for_minor_complications(): void
    {
        expect(ClavienDindoEnum::GRAU_I->isGrave())->toBeFalse()
            ->and(ClavienDindoEnum::GRAU_II->isGrave())->toBeFalse();
    }

    public function test_is_grave_returns_true_for_grade_three_and_above(): void
    {
        expect(ClavienDindoEnum::GRAU_IIIA->isGrave())->toBeTrue()
            ->and(ClavienDindoEnum::GRAU_IIIB->isGrave())->toBeTrue();
    }

    public function test_is_obito_returns_true_only_for_grade_v(): void
    {
        expect(ClavienDindoEnum::GRAU_V->isObito())->toBeTrue()
            ->and(ClavienDindoEnum::GRAU_I->isObito())->toBeFalse()
            ->and(ClavienDindoEnum::GRAU_IVB->isObito())->toBeFalse();
    }
}
