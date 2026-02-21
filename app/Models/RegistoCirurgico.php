<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class RegistoCirurgico extends Model
{
    use HasFactory, BelongsToUser;

    protected $fillable = [
        'user_id',
        'utente_id',
        'hospital',
        'especialidade',
        'data_cirurgia',
        'tipo_de_cirurgia_id',
        'tipo_de_abordagem_id',
        'ambulatorio',
        'observacoes',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'data_cirurgia' => 'date',
        'ambulatorio' => 'boolean',
        'tipo_de_cirurgia_id' => 'integer',
        'tipo_de_abordagem_id' => 'integer',
    ];

    /**
     * Relação com utente
     */
    public function utente()
    {
        return $this->belongsTo(Utente::class);
    }

    /**
     * Relação com tipo de cirurgia
     */
    public function tipoDeCirurgia()
    {
        return $this->belongsTo(TipoDeCirurgia::class);
    }

    /**
     * Relação com tipo de abordagem
     */
    public function tipoDeAbordagem()
    {
        return $this->belongsTo(TipoDeAbordagem::class);
    }

    /**
     * Relação com cirurgias
     */
    public function cirurgias()
    {
        return $this->hasMany(Cirurgia::class);
    }

    /**
     * Obtém a data formatada
     */
    public function getDataCirurgiaFormatadaAttribute()
    {
        return $this->data_cirurgia->format('d/m/Y');
    }

    /**
     * Scope para filtrar por período
     */
    public function scopeEntreDatas($query, $dataInicio, $dataFim)
    {
        return $query->whereBetween('data_cirurgia', [$dataInicio, $dataFim]);
    }

    /**
     * Scope para filtrar por tipo de cirurgia
     */
    public function scopePorTipo($query, $tipoId)
    {
        return $query->where('tipo_de_cirurgia_id', $tipoId);
    }
}
