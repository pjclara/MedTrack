<?php

namespace App\Enums;

enum TipoParticipacaoEnum: string
{
    case PARTICIPANTE = 'Participante';
    case ORADOR = 'Orador';
    case ORGANIZADOR = 'Organizador';
    case MODERADOR = 'Moderador';

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
     * Verifica se é papel ativo (não apenas participante)
     */
    public function isPapelAtivo(): bool
    {
        return $this !== self::PARTICIPANTE;
    }
}
