<?php

namespace Tests\Unit\Enums;

use App\Enums\SexoEnum;
use Tests\TestCase;

class SexoEnumTest extends TestCase
{
    public function test_sexo_enum_has_correct_values(): void
    {
        expect(SexoEnum::MASCULINO->value)->toBe('Masculino')
            ->and(SexoEnum::FEMININO->value)->toBe('Feminino')
            ->and(SexoEnum::OUTRO->value)->toBe('Outro');
    }

    public function test_sexo_enum_can_be_created_from_value(): void
    {
        $sexo = SexoEnum::from('Masculino');

        expect($sexo)->toBe(SexoEnum::MASCULINO);
    }

    public function test_sexo_enum_try_from_returns_null_for_invalid_value(): void
    {
        $sexo = SexoEnum::tryFrom('invalido');

        expect($sexo)->toBeNull();
    }

    public function test_sexo_enum_cases_returns_all_cases(): void
    {
        $cases = SexoEnum::cases();

        expect($cases)->toHaveCount(3)
            ->and($cases)->toContain(SexoEnum::MASCULINO)
            ->and($cases)->toContain(SexoEnum::FEMININO)
            ->and($cases)->toContain(SexoEnum::OUTRO);
    }
}
