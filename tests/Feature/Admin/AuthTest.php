<?php

use App\Models\AdminUser;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->admin = AdminUser::create([
        'name' => 'Test Admin',
        'email' => 'test@admin.com',
        'password' => Hash::make('password'),
        'role' => 'admin',
    ]);
});

test('admin login page is accessible', function () {
    $response = $this->get(route('admin.login'));
    $response->assertStatus(200);
});

test('admin can login with valid credentials', function () {
    $response = $this->post(route('admin.login'), [
        'email' => 'test@admin.com',
        'password' => 'password',
    ]);

    $response->assertRedirect(route('admin.dashboard'));
    $this->assertAuthenticatedAs($this->admin, 'admin');
});

test('admin cannot login with invalid password', function () {
    $response = $this->post(route('admin.login'), [
        'email' => 'test@admin.com',
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors('email');
    $this->assertGuest('admin');
});

test('guest is redirected to login when accessing dashboard', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('admin.login'));
});

test('authenticated admin can logout', function () {
    $this->actingAs($this->admin, 'admin');
    
    $response = $this->post(route('admin.logout'));
    
    $response->assertRedirect(route('admin.login'));
    $this->assertGuest('admin');
});
