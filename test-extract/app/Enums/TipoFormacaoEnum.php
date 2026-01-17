<?php

namespace App\Enums;

enum TipoFormacaoEnum: string
{
    case CONGRESSO = 'Congresso';
    case WORKSHOP = 'Workshop';
    case WEBINAR = 'Webinar';
    case CURSO = 'Curso';
    case CONFERENCIA = 'Conferência';
    case SEMINARIO = 'Seminário';
    case SIMPOSIO = 'Simpósio';
    case JORNADAS = 'Jornadas';

    /**
     * Obtém todos os valores do enum
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Obtém a label do enum
     */
    public function label(): string
    {
        return $this->value;
    }

    /**
     * Verifica se é um evento de longa duração
     */
    public function isEventoLongo(): bool
    {
        return in_array($this, [
            self::CONGRESSO,
            self::CURSO,
            self::JORNADAS,
        ]);
    }

    /**
     * Verifica se é um evento online
     */
    public function isPotencialmenteOnline(): bool
    {
        return in_array($this, [
            self::WEBINAR,
            self::WORKSHOP,
        ]);
    }
}
