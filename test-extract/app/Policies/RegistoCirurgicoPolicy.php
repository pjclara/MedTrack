<?php

namespace App\Policies;

use App\Models\RegistoCirurgico;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RegistoCirurgicoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Todos os users autenticados podem ver a lista (mas será filtrada)
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, RegistoCirurgico $registoCirurgico): bool
    {
        // User só pode ver os seus próprios registos
        return $registoCirurgico->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Todos os users autenticados podem criar registos
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, RegistoCirurgico $registoCirurgico): bool
    {
        // User só pode atualizar os seus próprios registos
        return $registoCirurgico->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, RegistoCirurgico $registoCirurgico): bool
    {
        // User só pode eliminar os seus próprios registos
        return $registoCirurgico->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, RegistoCirurgico $registoCirurgico): bool
    {
        // User só pode restaurar os seus próprios registos
        return $registoCirurgico->user_id === $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, RegistoCirurgico $registoCirurgico): bool
    {
        // User só pode eliminar permanentemente os seus próprios registos
        return $registoCirurgico->user_id === $user->id;
    }
}
