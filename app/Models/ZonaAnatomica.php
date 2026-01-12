<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class ZonaAnatomica extends Model
{
    use HasFactory, BelongsToUser;

    protected $table = 'zona_anatomicas';

    protected $fillable = [
        'nome',
        'descricao',
        'user_id',
    ];
}
