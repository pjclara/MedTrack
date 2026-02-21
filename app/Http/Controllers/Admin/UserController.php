<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Especialidade;
use App\Models\Hospital;
use App\Models\User;
use App\Services\AdminLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $users = User::when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->withCount(['registosCirurgicos', 'atividadesCientificas', 'formacoes'])
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => ['search' => $search]
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create', [
            'hospitals' => Hospital::orderBy('nome')->pluck('nome')->unique()->values(),
            'especialidades' => Especialidade::orderBy('nome')->pluck('nome')->unique()->values(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'hospital_de_origem' => 'nullable|string|max:255',
            'especialidade' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $request->boolean('is_active', true);

        $user = User::create($validated);

        AdminLogService::log('Create User', User::class, $user->id, $request->except('password'));

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilizador criado com sucesso.');
    }

    public function show(User $user)
    {
        $user->loadCount([
            'registosCirurgicos as registos_count', 
            'atividadesCientificas as atividades_count', 
            'formacoes as formacoes_count'
        ]);
        
        $recentActivity = collect()
            ->merge($user->registosCirurgicos()->latest()->take(5)->get()->map(fn($i) => [
                'type' => 'Registo Cirúrgico',
                'description' => "Cirurgia a " . ($i->utente?->nome ?? 'Utente'),
                'date' => $i->created_at->format('Y-m-d H:i:s'),
                'color' => 'emerald'
            ]))
            ->merge($user->atividadesCientificas()->latest()->take(5)->get()->map(fn($i) => [
                'type' => 'Atividade Científica',
                'description' => $i->titulo,
                'date' => $i->created_at->format('Y-m-d H:i:s'),
                'color' => 'blue'
            ]))
            ->merge($user->formacoes()->latest()->take(5)->get()->map(fn($i) => [
                'type' => 'Formação',
                'description' => $i->nome,
                'date' => $i->created_at->format('Y-m-d H:i:s'),
                'color' => 'purple'
            ]))
            ->sortByDesc('date')
            ->take(10)
            ->values();

        return Inertia::render('admin/users/show', [
            'user' => $user,
            'recentActivity' => $recentActivity
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'hospitals' => Hospital::orderBy('nome')->pluck('nome')->unique()->values(),
            'especialidades' => Especialidade::orderBy('nome')->pluck('nome')->unique()->values(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'hospital_de_origem' => 'nullable|string|max:255',
            'especialidade' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $user->update($validated);

        AdminLogService::log('Edit User', User::class, $user->id, $validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilizador atualizado com sucesso.');
    }

    public function destroy(User $user)
    {
        AdminLogService::log('Delete User', User::class, $user->id, ['user_email' => $user->email]);
        
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilizador removido com sucesso.');
    }
}
