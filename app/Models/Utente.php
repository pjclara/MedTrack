<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\SexoEnum;
use App\Traits\BelongsToUser;

class Utente extends Model
{
    use HasFactory, BelongsToUser;

    protected $fillable = [
        'nome',
        'idade',
        'sexo',
        'processo',
        'user_id',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'sexo' => SexoEnum::class,
    ];

    /**

     * Relação com registos cirúrgicos
     */
    public function registosCirurgicos()
    {
        return $this->hasMany(RegistoCirurgico::class);
    }

    /**
     * Obtém o nome completo com processo
     */
    public function getNomeComProcessoAttribute()
    {
        return "{$this->nome} (#{$this->processo})";
    }

    /**
     * Scope para filtrar por sexo
     */
    public function scopeSexo($query, $sexo)
    {
        return $query->where('sexo', $sexo);
    }
}
