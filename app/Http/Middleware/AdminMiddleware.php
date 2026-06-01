<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminGuardAuthenticated = Auth::guard('admin')->check();

        $webUser = Auth::guard('web')->user();
        $webUserIsAdmin = $webUser && method_exists($webUser, 'hasRole') && $webUser->hasRole('admin');

        if (!$adminGuardAuthenticated && !$webUserIsAdmin) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }

            if (Auth::guard('web')->check()) {
                return redirect()->route('dashboard');
            }

            return redirect()->route('admin.login');
        }

        return $next($request);
    }
}
