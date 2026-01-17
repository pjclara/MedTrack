<?php

use App\Models\AdminUser;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->admin = AdminUser::create([
        'name' => 'Test Admin',
        'email' => 'test@admin.com',
        'password' => 'password',
        'role' => 'super_admin',
    ]);
    
    User::factory()->count(5)->create();
});

test('admin can see user list', function () {
    $response = $this->actingAs($this->admin, 'admin')
        ->get(route('admin.users.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/users/index')
        ->has('users.data', 5) // 5 created in beforeEach
    );
});

test('admin can search for users', function () {
    $user = User::factory()->create(['name' => 'Searchable User']);
    
    $response = $this->actingAs($this->admin, 'admin')
        ->get(route('admin.users.index', ['search' => 'Searchable User']));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/users/index')
        ->has('users.data', 1)
        ->where('users.data.0.name', 'Searchable User')
    );
});

test('admin can see user details', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($this->admin, 'admin')
        ->get(route('admin.users.show', $user));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/users/show')
        ->where('user.id', $user->id)
    );
});
