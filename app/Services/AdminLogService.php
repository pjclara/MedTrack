<?php

namespace App\Services;

use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AdminLogService
{
    /**
     * Log an admin action.
     */
    public static function log(string $action, ?string $targetType = null, ?int $targetId = null, ?array $details = null)
    {
        $adminUserId = Auth::guard('admin')->id();

        if (!$adminUserId) {
            return;
        }

        AdminActivityLog::create([
            'admin_user_id' => $adminUserId,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'details' => $details,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
