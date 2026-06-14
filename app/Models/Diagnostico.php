<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class Diagnostico extends Model
{
    use HasFactory, BelongsToUser;

    protected $fillable = [
        'nome',
        'zona_anatomica_id',
        'tipo',
        'descricao',
        'user_id',
    ];

    protected $guarded = ['id'];

    /**
     * Relação com a zona anatómica
     */
    public function zonaAnatomica()
    {
        return $this->belongsTo(ZonaAnatomica::class, 'zona_anatomica_id');
    }



    /**
     * Relação com cirurgias
     */
    public function cirurgias()
    {
        return $this->hasMany(Cirurgia::class);
    }
}
