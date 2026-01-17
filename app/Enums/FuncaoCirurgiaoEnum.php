<?php

namespace App\Enums;

enum FuncaoCirurgiaoEnum: string
{
    case CIRURGIAO_PRINCIPAL = 'Cirurgião Principal';
    case CIRURGIAO_ASSISTENTE = 'Cirurgião Assistente';

    /**
     * Obter todos os valores
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Obter todos os casos como array associativo
     */
    public static function toArray(): array
    {
        return array_combine(
            array_column(self::cases(), 'name'),
            array_column(self::cases(), 'value')
        );
    }

    /**
     * Obter label formatado
     */
    public function label(): string
    {
        return $this->value;
    }

    /**
     * Verificar se é cirurgião principal
     */
    public function isPrincipal(): bool
    {
        return $this === self::CIRURGIAO_PRINCIPAL;
    }

    /**
     * Verificar se é assistente
     */
    public function isAssistente(): bool
    {
        return $this === self::CIRURGIAO_ASSISTENTE;
    }
}
