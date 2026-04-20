<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuncaoCirurgiao extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
    ];

    public function cirurgias()
    {
        return $this->hasMany(Cirurgia::class);
    }
}
