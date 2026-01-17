<?php

namespace App\Enums;

enum TipoDiagnosticoEnum: string
{
    case BENIGNO = 'Benigno';
    case MALIGNO = 'Maligno';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
