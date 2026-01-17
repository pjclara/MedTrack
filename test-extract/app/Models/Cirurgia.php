<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class Cirurgia extends Model
{
    use HasFactory;

    protected $fillable = [
        'registo_cirurgico_id',
        'diagnostico_id',
        'procedimento_id',
        'tipo',
        'funcao',
        'clavien-dindo',
        'anatomia_patologica',
        'observacoes',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'funcao' => FuncaoCirurgiaoEnum::class,
        'clavien-dindo' => ClavienDindoEnum::class,
    ];

    /**
     * Relação com registo cirúrgico
     */
    public function registoCirurgico()
    {
        return $this->belongsTo(RegistoCirurgico::class);
    }

    /**
     * Relação com diagnóstico
     */
    public function diagnostico()
    {
        return $this->belongsTo(Diagnostico::class);
    }

    /**
     * Relação com procedimento
     */
    public function procedimento()
    {
        return $this->belongsTo(Procedimento::class);
    }

    /**
     * Verifica se tem complicações
     */
    public function temComplicacoes()
    {
        return !empty($this->{'clavien-dindo'});
    }

    /**
     * Scope para filtrar por diagnóstico
     */
    public function scopePorDiagnostico($query, $diagnosticoId)
    {
        return $query->where('diagnostico_id', $diagnosticoId);
    }

    /**
     * Scope para filtrar por procedimento
     */
    public function scopePorProcedimento($query, $procedimentoId)
    {
        return $query->where('procedimento_id', $procedimentoId);
    }

    /**
     * Scope para cirurgias com complicações
     */
    public function scopeComComplicacoes($query)
    {
        return $query->whereNotNull('clavien-dindo');
    }
}
