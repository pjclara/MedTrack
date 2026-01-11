<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZonaAnatomica extends Model
{
    use HasFactory;

    protected $table = 'zona_anatomicas';

    protected $fillable = [
        'nome',
        'descricao',
        'user_id',
    ];

    /**
     * Relação com o utilizador
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
