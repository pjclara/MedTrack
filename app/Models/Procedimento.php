<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedimento extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'area',
        'descricao',
        'user_id',
    ];

    protected $guarded = ['id'];

    /**
     * Relação com o utilizador
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
