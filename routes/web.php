<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UtenteController;
use App\Http\Controllers\TipoDeCirurgiaController;
use App\Http\Controllers\TipoDeOrigemController;
use App\Http\Controllers\EspecialidadeController;
use App\Http\Controllers\ZonaAnatomicaController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\DiagnosticoController;
use App\Http\Controllers\ProcedimentoController;
use App\Http\Controllers\RegistoCirurgicoController;
use App\Http\Controllers\AtividadeCientificaController;
use App\Http\Controllers\FormacaoController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $userId = auth()->id();
        $currentMonth = now()->startOfMonth();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'totalRegistos' => \App\Models\RegistoCirurgico::where('user_id', $userId)->count(),
                'totalUtentes' => \App\Models\Utente::whereHas('registosCirurgicos', function($q) use ($userId) {
                    $q->where('user_id', $userId);
                })->count(),
                'cirurgiasMes' => \App\Models\RegistoCirurgico::where('user_id', $userId)
                    ->whereDate('data_cirurgia', '>=', $currentMonth)
                    ->count(),
                'complicacoes' => \App\Models\Cirurgia::whereHas('registoCirurgico', function($q) use ($userId) {
                    $q->where('user_id', $userId);
                })->whereNotNull('clavien-dindo')->count(),
                'totalPublicacoes' => \App\Models\AtividadeCientifica::where('user_id', $userId)->count(),
                'formacoes' => \App\Models\Formacao::where('user_id', $userId)->count(),
                'horasFormacao' => \App\Models\Formacao::where('user_id', $userId)->sum('duracao_horas') ?? 0,
                'creditosFormacao' => \App\Models\Formacao::where('user_id', $userId)->sum('creditos') ?? 0,
            ],
            'recentRegistos' => \App\Models\RegistoCirurgico::where('user_id', $userId)
                ->with(['utente', 'tipoDeCirurgia'])
                ->latest('data_cirurgia')
                ->take(5)
                ->get()
                ->map(fn($r) => [
                    'id' => $r->id,
                    'data_cirurgia' => $r->data_cirurgia->format('d/m/Y'),
                    'utente_nome' => $r->utente->nome,
                    'tipo' => $r->tipoDeCirurgia->nome,
                ]),
        ]);
    })->name('dashboard');

    // CRUD Routes
    Route::resource('utentes', UtenteController::class);
    Route::get('api/utentes/processo/{processo}', [UtenteController::class, 'findByProcesso'])
        ->name('api.utentes.processo');
    Route::resource('tipos-de-cirurgia', TipoDeCirurgiaController::class);
    Route::resource('tipos-de-origem', TipoDeOrigemController::class);
    Route::resource('especialidades', EspecialidadeController::class);
    Route::resource('zona-anatomicas', ZonaAnatomicaController::class);
    Route::resource('hospitals', HospitalController::class);
    Route::resource('diagnosticos', DiagnosticoController::class);
    Route::resource('procedimentos', ProcedimentoController::class);
    Route::resource('users', UserController::class);
    Route::resource('registos-cirurgicos', RegistoCirurgicoController::class)
        ->parameters(['registos-cirurgicos' => 'registo']);
    
    // Atividade Científica Routes
    Route::resource('atividades-cientificas', AtividadeCientificaController::class)
        ->parameters(['atividades-cientificas' => 'atividade']);
    Route::get('atividades-cientificas/{atividade}/download', [AtividadeCientificaController::class, 'download'])
        ->name('atividades-cientificas.download');
    
    // Formações Routes
    Route::resource('formacoes', FormacaoController::class)
        ->parameters(['formacoes' => 'formacao']);
    Route::get('formacoes/{formacao}/download', [FormacaoController::class, 'download'])
        ->name('formacoes.download');
});

require __DIR__.'/settings.php';
