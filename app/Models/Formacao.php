<?php

namespace App\Models;

use App\Enums\TipoFormacaoEnum;
use App\Enums\TipoParticipacaoEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Formacao extends Model
{
    use HasFactory;

    protected $table = 'formacoes';

    protected $fillable = [
        'user_id',
        'titulo',
        'descricao',
        'tipo',
        'data_inicio',
        'data_fim',
        'duracao_horas',
        'entidade_organizadora',
        'localizacao',
        'categoria',
        'tipo_participacao',
        'tema_apresentacao',
        'certificado_path',
        'certificado_original_name',
        'certificado_size',
        'creditos',
        'observacoes',
    ];

    protected $casts = [
        'data_inicio' => 'date',
        'data_fim' => 'date',
        'duracao_horas' => 'integer',
        'certificado_size' => 'integer',
        'creditos' => 'decimal:2',
        'tipo' => TipoFormacaoEnum::class,
        'tipo_participacao' => TipoParticipacaoEnum::class,
    ];

    /**
     * Relacionamento com User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope: Ordenar por data mais recente
     */
    public function scopeRecentes($query)
    {
        return $query->orderBy('data_inicio', 'desc');
    }

    /**
     * Scope: Filtrar por tipo
     */
    public function scopePorTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Scope: Filtrar por ano
     */
    public function scopePorAno($query, int $ano)
    {
        return $query->whereYear('data_inicio', $ano);
    }

    /**
     * Scope: Filtrar formações futuras
     */
    public function scopeFuturas($query)
    {
        return $query->where('data_inicio', '>=', now()->toDateString());
    }

    /**
     * Scope: Filtrar formações passadas
     */
    public function scopePassadas($query)
    {
        return $query->where('data_inicio', '<', now()->toDateString());
    }

    /**
     * Accessor: Data de início formatada
     */
    public function getDataInicioFormatadaAttribute(): string
    {
        return $this->data_inicio?->format('d/m/Y') ?? '';
    }

    /**
     * Accessor: Data de fim formatada
     */
    public function getDataFimFormatadaAttribute(): ?string
    {
        return $this->data_fim?->format('d/m/Y');
    }

    /**
     * Accessor: Período formatado
     */
    public function getPeriodoFormatadoAttribute(): string
    {
        if (!$this->data_fim || $this->data_inicio->equalTo($this->data_fim)) {
            return $this->data_inicio_formatada;
        }

        return $this->data_inicio_formatada . ' a ' . $this->data_fim_formatada;
    }

    /**
     * Accessor: Tamanho do certificado formatado
     */
    public function getCertificadoSizeFormatadoAttribute(): ?string
    {
        if (!$this->certificado_size) {
            return null;
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $size = $this->certificado_size;
        $unit = 0;

        while ($size >= 1024 && $unit < count($units) - 1) {
            $size /= 1024;
            $unit++;
        }

        return round($size, 2) . ' ' . $units[$unit];
    }

    /**
     * Verifica se tem certificado anexado
     */
    public function temCertificado(): bool
    {
        return !is_null($this->certificado_path);
    }

    /**
     * Verifica se é evento de múltiplos dias
     */
    public function isEventoMultiplo(): bool
    {
        return $this->data_fim && !$this->data_inicio->equalTo($this->data_fim);
    }

    /**
     * Verifica se é formação futura
     */
    public function isFutura(): bool
    {
        return $this->data_inicio >= now()->toDateString();
    }
}
