<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class Hospital extends Model
{
    use HasFactory, BelongsToUser;

    protected $fillable = ['nome', 'user_id'];
}
