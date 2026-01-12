<?php

namespace App\Traits;

use App\Models\Scopes\UserScope;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([UserScope::class])]
trait BelongsToUser
{
    /**
     * Boot the trait.
     */
    protected static function bootBelongsToUser()
    {
        static::addGlobalScope(new UserScope);

        static::creating(function ($model) {
            if (!$model->user_id && Auth::check()) {
                $model->user_id = Auth::id();
            }
        });
    }

    /**
     * Relation with the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
