<?php

namespace App\Policies;

use App\Models\AtividadeCientifica;
use App\Models\User;

class AtividadeCientificaPolicy
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
    public function view(User $user, AtividadeCientifica $atividade): bool
    {
        return $atividade->user_id === $user->id;
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
    public function update(User $user, AtividadeCientifica $atividade): bool
    {
        return $atividade->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AtividadeCientifica $atividade): bool
    {
        return $atividade->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AtividadeCientifica $atividade): bool
    {
        return $atividade->user_id === $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AtividadeCientifica $atividade): bool
    {
        return $atividade->user_id === $user->id;
    }
}
