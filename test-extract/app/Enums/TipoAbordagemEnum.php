<?php

namespace App\Enums;

enum TipoAbordagemEnum: string
{
    case CONVENCIONAL = 'Convencional';
    case LAPAROSCOPICA = 'Laparoscópica';
    case ROBOTICA = 'Robótica';
    case ENDOSCOPICA = 'Endoscópica';
    case HIBRIDA = 'Híbrida';

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
