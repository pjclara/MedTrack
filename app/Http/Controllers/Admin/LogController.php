<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index()
    {
        $logs = AdminActivityLog::with('adminUser')
            ->latest()
            ->paginate(50);

        return Inertia::render('admin/logs/index', [
            'logs' => $logs
        ]);
    }
}
