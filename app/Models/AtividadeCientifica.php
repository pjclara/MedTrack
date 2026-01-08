<?php

namespace App\Models;

use App\Enums\TipoAtividadeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtividadeCientifica extends Model
{
    use HasFactory;

    protected $table = 'atividades_cientificas';

    protected $fillable = [
        'user_id',
        'titulo',
        'descricao',
        'tipo',
        'data',
        'revista_conferencia',
        'localizacao',
        'categoria',
        'autores',
        'autor_principal',
        'posicao_autor',
        'doi',
        'isbn',
        'link',
        'fator_impacto',
        'ficheiro_path',
        'ficheiro_original_name',
        'ficheiro_size',
        'observacoes',
    ];

    protected $casts = [
        'data' => 'date',
        'tipo' => TipoAtividadeEnum::class,
        'autor_principal' => 'boolean',
        'posicao_autor' => 'integer',
        'fator_impacto' => 'decimal:3',
        'ficheiro_size' => 'integer',
    ];

    /**
     * Relação com o utilizador
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtém a data formatada (dd/mm/yyyy)
     */
    public function getDataFormatadaAttribute()
    {
        return $this->data->format('d/m/Y');
    }

    /**
     * Verifica se tem ficheiro anexo
     */
    public function temFicheiro(): bool
    {
        return !is_null($this->ficheiro_path);
    }

    /**
     * Obtém o tamanho do ficheiro formatado
     */
    public function getFicheiroSizeFormatadoAttribute()
    {
        if (!$this->ficheiro_size) {
            return null;
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $size = $this->ficheiro_size;
        $unit = 0;

        while ($size >= 1024 && $unit < count($units) - 1) {
            $size /= 1024;
            $unit++;
        }

        return round($size, 2) . ' ' . $units[$unit];
    }

    /**
     * Scope para filtrar por tipo
     */
    public function scopePorTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Scope para filtrar por ano
     */
    public function scopePorAno($query, int $ano)
    {
        return $query->whereYear('data', $ano);
    }

    /**
     * Scope para filtrar por categoria
     */
    public function scopePorCategoria($query, string $categoria)
    {
        return $query->where('categoria', $categoria);
    }

    /**
     * Scope para autor principal
     */
    public function scopeAutorPrincipal($query)
    {
        return $query->where('autor_principal', true);
    }

    /**
     * Scope para ordenar por data (mais recente primeiro)
     */
    public function scopeRecentes($query)
    {
        return $query->orderBy('data', 'desc');
    }
}
