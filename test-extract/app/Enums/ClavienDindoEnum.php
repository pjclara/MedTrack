<?php

namespace App\Enums;

enum ClavienDindoEnum: string
{
    case Sem_Complicacoes = 'Sem Complicações';
    case GRAU_I = 'I';
    case GRAU_II = 'II';
    case GRAU_IIIA = 'IIIa';
    case GRAU_IIIB = 'IIIb';
    case GRAU_IVA = 'IVa';
    case GRAU_IVB = 'IVb';
    case GRAU_V = 'V';

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
     * Obter descrição da classificação
     */
    public function descricao(): string
    {
        return match($this) {
            self::GRAU_I => 'Qualquer desvio do curso pós-operatório normal',
            self::GRAU_II => 'Requer tratamento farmacológico',
            self::GRAU_IIIA => 'Requer intervenção cirúrgica sem anestesia geral',
            self::GRAU_IIIB => 'Requer intervenção cirúrgica com anestesia geral',
            self::GRAU_IVA => 'Disfunção de um órgão (incluindo diálise)',
            self::GRAU_IVB => 'Disfunção multi-orgânica',
            self::GRAU_V => 'Morte do paciente',
        };
    }

    /**
     * Verificar se é complicação grave (≥ IIIa)
     */
    public function isGrave(): bool
    {
        return in_array($this, [
            self::GRAU_IIIA,
            self::GRAU_IIIB,
            self::GRAU_IVA,
            self::GRAU_IVB,
            self::GRAU_V,
        ]);
    }

    /**
     * Verificar se resultou em óbito
     */
    public function isObito(): bool
    {
        return $this === self::GRAU_V;
    }
}
