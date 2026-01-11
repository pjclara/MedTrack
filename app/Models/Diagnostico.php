<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'especialidade',
        'tipo',
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
     * Relação com especialidade
     */
    public function especialidadeRelation()
    {
        return $this->belongsTo(Especialidade::class, 'especialidade', 'nome');
    }

    /**
     * Relação com cirurgias
     */
    public function cirurgias()
    {
        return $this->hasMany(Cirurgia::class);
    }
}
