<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = Area::where('user_id', auth()->id())
            ->orderBy('nome')
            ->paginate(15);
        return Inertia::render('areas/index', [
            'areas' => $areas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Area::class);
        return Inertia::render('areas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAreaRequest $request)
    {
        Gate::authorize('create', Area::class);
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Area::create($validated);

        return redirect()->route('areas.index')
            ->with('success', 'Área criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Area $area)
    {
        Gate::authorize('view', $area);
        $area->load('diagnosticos', 'procedimentos');
        return Inertia::render('areas/show', [
            'area' => $area
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Area $area)
    {
        Gate::authorize('update', $area);
        return Inertia::render('areas/edit', [
            'area' => $area
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAreaRequest $request, Area $area)
    {
        Gate::authorize('update', $area);
        $validated = $request->validated();

        $area->update($validated);

        return redirect()->route('areas.index')
            ->with('success', 'Área atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Area $area)
    {
        Gate::authorize('delete', $area);
        $area->delete();

        return redirect()->route('areas.index')
            ->with('success', 'Área removida com sucesso.');
    }
}
