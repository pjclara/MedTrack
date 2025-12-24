<?php

namespace Tests\Unit\Enums;

use App\Enums\FuncaoCirurgiaoEnum;
use Tests\TestCase;

class FuncaoCirurgiaoEnumTest extends TestCase
{
    public function test_funcao_cirurgiao_enum_has_correct_values(): void
    {
        expect(FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value)->toBe('Cirurgião Principal')
            ->and(FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value)->toBe('Cirurgião Assistente')
            ->and(FuncaoCirurgiaoEnum::RESIDENTE->value)->toBe('Residente')
            ->and(FuncaoCirurgiaoEnum::INTERNO->value)->toBe('Interno');
    }

    public function test_is_principal_returns_true_for_main_surgeon(): void
    {
        expect(FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->isPrincipal())->toBeTrue()
            ->and(FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->isPrincipal())->toBeFalse();
    }

    public function test_is_assistente_returns_true_for_assistants(): void
    {
        expect(FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->isAssistente())->toBeTrue()
            ->and(FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->isAssistente())->toBeFalse()
            ->and(FuncaoCirurgiaoEnum::RESIDENTE->isAssistente())->toBeFalse()
            ->and(FuncaoCirurgiaoEnum::INTERNO->isAssistente())->toBeFalse();
    }
}
