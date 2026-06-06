<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'hospital_id',
        'especialidade_id',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active' => 'boolean',
            'hospital_id' => 'integer',
            'especialidade_id' => 'integer',
        ];
    }

    /**
     * Hospital associado ao utilizador.
     */
    public function hospital(): BelongsTo
    {
        return $this->belongsTo(Hospital::class);
    }

    /**
     * Especialidade associada ao utilizador.
     */
    public function especialidade(): BelongsTo
    {
        return $this->belongsTo(Especialidade::class);
    }

    /**
     * Get the utentes for the user.
     */
    public function utentes()
    {
        return $this->hasMany(Utente::class);
    }

    /**
     * Get the registos cirurgicos for the user.
     */
    public function registosCirurgicos()
    {
        return $this->hasMany(RegistoCirurgico::class);
    }

    /**
     * Get the atividades científicas for the user.
     */
    public function atividadesCientificas()
    {
        return $this->hasMany(AtividadeCientifica::class);
    }

    /**
     * Get the formações for the user.
     */
    public function formacoes()
    {
        return $this->hasMany(Formacao::class);
    }
}
