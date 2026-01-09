<?php

use App\Models\User;
use App\Models\AtividadeCientifica;
use App\Enums\TipoAtividadeEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = User::factory()->create();
    $this->user = $user;
});

test('user can upload and store scientific activity with file', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    Storage::fake('local');
    $this->actingAs($user);

    $file = UploadedFile::fake()->create('abstract.pdf', 100);

    $data = [
        'titulo' => 'Nova Publicação',
        'tipo' => TipoAtividadeEnum::ARTIGO_REVISTA->value,
        'data' => '2025-01-01',
        'descricao' => 'Descrição detalhada',
        'ficheiro' => $file,
    ];

    $response = $this->post(route('atividades-cientificas.store'), $data);

    $response->assertRedirect(route('atividades-cientificas.index'));
    
    $atividade = AtividadeCientifica::first();
    $this->assertNotNull($atividade->ficheiro_path);
    
    Storage::assertExists($atividade->ficheiro_path);
});

test('user cannot access scientific activity of another user', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    $otherUser = User::factory()->create();
    $atividade = AtividadeCientifica::factory()->create(['user_id' => $otherUser->id]);

    $this->actingAs($user);

    // Test Edit page access - Use getJson to ensure 403 instead of redirect
    $this->getJson(route('atividades-cientificas.edit', $atividade))
        ->assertStatus(403);

    // Test Update
    $this->putJson(route('atividades-cientificas.update', $atividade), [
        'titulo' => 'Hacked',
        'tipo' => TipoAtividadeEnum::ARTIGO_REVISTA->value,
        'data' => '2025-01-01',
    ])->assertStatus(403);
        
    // Test Delete
    $this->deleteJson(route('atividades-cientificas.destroy', $atividade))
        ->assertStatus(403);
});

test('user can download their own file', function () {
    /** @var TestCase $this */
    /** @var User $user */
    $user = $this->user;
    Storage::fake('local');
    $this->actingAs($user);

    $filePath = 'atividades/test.pdf';
    Storage::disk('local')->put($filePath, 'content');

    $atividade = AtividadeCientifica::factory()->create([
        'user_id' => $user->id,
        'ficheiro_path' => $filePath,
        'ficheiro_original_name' => 'test.pdf'
    ]);

    $response = $this->get(route('atividades-cientificas.download', $atividade));

    $response->assertStatus(200);
    $response->assertHeader('Content-Disposition', 'attachment; filename=test.pdf');
});
