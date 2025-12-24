<?php

namespace App\Enums;

enum SexoEnum: string
{
    case MASCULINO = 'Masculino';
    case FEMININO = 'Feminino';
    case OUTRO = 'Outro';

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
}
