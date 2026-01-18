<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\RegistoCirurgico;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        
        // Simple logic for complete vs incomplete: 
        // A user is "complete" if they have at least 1 surgical record (currículo com dados)
        $completeUsers = User::has('registosCirurgicos')->count();
        $incompleteUsers = $totalUsers - $completeUsers;

        $recentUsers = User::latest()->take(5)->get();
        
        $recentRecords = collect()
            ->merge(RegistoCirurgico::with(['user', 'utente'])->latest()->take(5)->get()->map(fn($r) => [
                'type' => 'Cirurgia',
                'user' => $r->user?->name,
                'target' => $r->utente?->nome,
                'detail' => $r->tipoDeCirurgia?->nome,
                'date' => $r->data_cirurgia,
                'id' => $r->id
            ]))
            ->merge(\App\Models\AtividadeCientifica::with('user')->latest()->take(5)->get()->map(fn($a) => [
                'type' => 'Atividade',
                'user' => $a->user?->name,
                'target' => $a->tipo,
                'detail' => $a->titulo,
                'date' => $a->created_at,
                'id' => $a->id
            ]))
            ->merge(\App\Models\Formacao::with('user')->latest()->take(5)->get()->map(fn($f) => [
                'type' => 'Formação',
                'user' => $f->user?->name,
                'target' => $f->entidade,
                'detail' => $f->nome,
                'date' => $f->created_at,
                'id' => $f->id
            ]))
            ->sortByDesc('date')
            ->take(8)
            ->values();

        return Inertia::render('admin/dashboard', [
            'metrics' => [
                'total_users' => $totalUsers,
                'complete_curriculums' => $completeUsers,
                'incomplete_curriculums' => $incompleteUsers,
            ],
            'recent_users' => $recentUsers,
            'recent_records' => $recentRecords,
        ]);
    }
}
