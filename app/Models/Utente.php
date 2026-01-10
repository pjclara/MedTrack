<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\SexoEnum;

class Utente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'data_nascimento',
        'sexo',
        'processo',
        'user_id',
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'data_nascimento' => 'date',
        'sexo' => SexoEnum::class,
    ];

    /**
     * Relação com o utilizador que registou o utente
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relação com registos cirúrgicos
     */
    public function registosCirurgicos()
    {
        return $this->hasMany(RegistoCirurgico::class);
    }

    /**
     * Obtém a idade do utente
     */
    public function getIdadeAttribute()
    {
        return $this->data_nascimento->age;
    }

    /**
     * Obtém a data de nascimento formatada (dd/mm/yyyy)
     */
    public function getDataNascimentoFormatadaAttribute()
    {
        return $this->data_nascimento->format('d/m/Y');
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
