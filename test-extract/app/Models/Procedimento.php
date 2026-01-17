<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class Procedimento extends Model
{
    use HasFactory, BelongsToUser;

    protected $fillable = [
        'nome',
        'especialidade',
        'descricao',
        'user_id',
    ];

    protected $guarded = ['id'];

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
