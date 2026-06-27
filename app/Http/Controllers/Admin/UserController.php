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
            ->with(['hospital:id,nome', 'especialidade:id,nome'])
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
            'hospitals' => Hospital::orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::orderBy('nome')->get(['id', 'nome']),
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        // 1) Criar o utilizador
        $user = User::create($validated);

        // 2) procurar hospital 

        $hospitalNome = Hospital::whereId($request->input('hospital_id'))->first();


        $hospital = Hospital::create([
            'nome' => $hospitalNome->nome ?? 'Hospital de ' . $user->name,
            'user_id' => $user->id,
        ]);

        // 3) Criar especialidade associada ao utilizador

        $especialidadeNome = Especialidade::whereId($request->input('especialidade_id'))->first();
        $especialidade = Especialidade::create([
            'nome' => $especialidadeNome->nome ?? 'Especialidade de ' . $user->name,
            'user_id' => $user->id,
        ]);

        // 4) Atualizar o user para apontar para estes dois registos
        $user->update([
            'hospital_id' => $hospital->id,
            'especialidade_id' => $especialidade->id,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilizador criado com sucesso.');
    }

    public function show(User $user)
    {
        $user->load(['hospital:id,nome', 'especialidade:id,nome']);

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
            'user' => $user->load(['hospital:id,nome', 'especialidade:id,nome']),
            'hospitals' => Hospital::orderBy('nome')->get(['id', 'nome']),
            'especialidades' => Especialidade::orderBy('nome')->get(['id', 'nome']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'hospital_id' => 'nullable|integer|exists:hospitals,id',
            'especialidade_id' => 'nullable|integer|exists:especialidades,id',
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
