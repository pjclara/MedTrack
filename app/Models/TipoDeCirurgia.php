<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoDeCirurgia extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
    ];

    /**
     * Relação com registos cirúrgicos
     */
    public function registoCirurgicos()
    {
        return $this->hasMany(RegistoCirurgico::class);
    }
}
