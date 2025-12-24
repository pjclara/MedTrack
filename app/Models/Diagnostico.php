<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'area',
        'descricao',
    ];

    protected $guarded = ['id'];

    /**
     * Relação com área
     */
    public function areaRelation()
    {
        return $this->belongsTo(Area::class, 'area', 'nome');
    }

    /**
     * Relação com cirurgias
     */
    public function cirurgias()
    {
        return $this->hasMany(Cirurgia::class);
    }
}
