<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = Area::orderBy('nome')->paginate(15);
        return Inertia::render('Areas/Index', [
            'areas' => $areas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Areas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAreaRequest $request)
    {
        $validated = $request->validated();

        Area::create($validated);

        return redirect()->route('areas.index')
            ->with('success', 'Área criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Area $area)
    {
        $area->load('diagnosticos', 'procedimentos');
        return Inertia::render('Areas/Show', [
            'area' => $area
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Area $area)
    {
        return Inertia::render('Areas/Edit', [
            'area' => $area
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAreaRequest $request, Area $area)
    {
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
        $area->delete();

        return redirect()->route('areas.index')
            ->with('success', 'Área removida com sucesso.');
    }
}
