<?php

namespace App\Enums;

enum TipoAtividadeEnum: string
{
    case ARTIGO_REVISTA = 'Artigo Revista';
    case POSTER_CONGRESSO = 'Poster Congresso';
    case COMUNICACAO_ORAL = 'Comunicação Oral';
    case SESSAO_CLINICA = 'Sessão Clínica';
    case JOURNAL_CLUB = 'Journal Club';
    case WORKSHOP = 'Workshop';
    case CONFERENCIA = 'Conferência';
    case CAPITULO_LIVRO = 'Capítulo de Livro';

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
     * Verifica se é uma publicação científica (requer DOI/ISBN)
     */
    public function isPublicacao(): bool
    {
        return in_array($this, [
            self::ARTIGO_REVISTA,
            self::CAPITULO_LIVRO,
        ]);
    }

    /**
     * Verifica se é apresentação em congresso/conferência
     */
    public function isApresentacao(): bool
    {
        return in_array($this, [
            self::POSTER_CONGRESSO,
            self::COMUNICACAO_ORAL,
            self::CONFERENCIA,
        ]);
    }

    /**
     * Verifica se é atividade educacional interna
     */
    public function isEducacional(): bool
    {
        return in_array($this, [
            self::SESSAO_CLINICA,
            self::JOURNAL_CLUB,
            self::WORKSHOP,
        ]);
    }
}
