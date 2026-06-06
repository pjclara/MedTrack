<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class TipoDeAbordagem extends Model
{
    use HasFactory;

    protected $table = 'tipo_de_abordagens';

    protected $fillable = [
        'nome',
        'user_id',
    ];

    /**
     * Relação com o utilizador criador.
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
}
