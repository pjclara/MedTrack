<?php

namespace App\Policies;

use App\Models\Formacao;
use App\Models\User;

class FormacaoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Formacao $formacao): bool
    {
        return $formacao->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Formacao $formacao): bool
    {
        return $formacao->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Formacao $formacao): bool
    {
        return $formacao->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Formacao $formacao): bool
    {
        return $formacao->user_id === $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Formacao $formacao): bool
    {
        return $formacao->user_id === $user->id;
    }
}
