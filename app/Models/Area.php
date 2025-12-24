<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
    ];

    protected $guarded = ['id'];

    /**
     * Relação com diagnósticos
     */
    public function diagnosticos()
    {
        return $this->hasMany(Diagnostico::class, 'area', 'nome');
    }

    /**
     * Relação com procedimentos
     */
    public function procedimentos()
    {
        return $this->hasMany(Procedimento::class, 'area', 'nome');
    }

    /**
     * Scope para buscar por nome
     */
    public function scopeBuscar($query, $termo)
    {
        return $query->where('nome', 'like', "%{$termo}%")
            ->orWhere('descricao', 'like', "%{$termo}%");
    }
}
