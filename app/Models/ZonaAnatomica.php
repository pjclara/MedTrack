<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class ZonaAnatomica extends Model
{
    use HasFactory, BelongsToUser;

    // with timestamps = false, the model won't automatically manage created_at and updated_at fields
    public $timestamps = false;

    protected $table = 'zona_anatomicas';

    protected $fillable = [
        'nome',
        'descricao',
        'user_id',
        'ordem'
    ];


    public function diagnosticos()
    {
        return $this->hasMany(Diagnostico::class, 'zona_anatomica', 'nome')
            ->where('user_id', $this->user_id);
    }
}
