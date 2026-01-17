<?php

use App\Models\AdminUser;
use App\Models\User;
use App\Models\AdminActivityLog;

beforeEach(function () {
    $this->admin = AdminUser::create([
        'name' => 'Test Admin',
        'email' => 'test@admin.com',
        'password' => 'password',
        'role' => 'super_admin',
    ]);
});

test('admin activity is logged when a user is modified', function () {
    $user = User::factory()->create();
    
    $this->actingAs($this->admin, 'admin')
        ->put(route('admin.users.update', $user), [
            'name' => 'Updated Name',
            'email' => $user->email,
        ]);

    $this->assertDatabaseHas('admin_activity_logs', [
        'admin_user_id' => $this->admin->id,
        'action' => 'Edit User',
        'target_type' => User::class,
        'target_id' => $user->id,
    ]);
});

test('admin activity is logged when a user is deleted', function () {
    $user = User::factory()->create();
    
    $this->actingAs($this->admin, 'admin')
        ->delete(route('admin.users.destroy', $user));

    $this->assertDatabaseHas('admin_activity_logs', [
        'admin_user_id' => $this->admin->id,
        'action' => 'Delete User',
        'target_type' => User::class,
    ]);
});

test('admin can see activity logs list', function () {
    // Manually create some logs
    AdminActivityLog::create([
        'admin_user_id' => $this->admin->id,
        'action' => 'Test Action',
        'ip_address' => '127.0.0.1',
    ]);
    
    $response = $this->actingAs($this->admin, 'admin')
        ->get(route('admin.logs.index'));

    $response->assertStatus(200);
    $response->assertSee('Test Action');
});
