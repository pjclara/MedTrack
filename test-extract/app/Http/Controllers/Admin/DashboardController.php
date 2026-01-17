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
        $recentRecords = RegistoCirurgico::with(['user', 'utente'])->latest()->take(5)->get();

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
