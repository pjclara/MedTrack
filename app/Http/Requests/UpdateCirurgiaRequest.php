<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class UpdateCirurgiaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registo_cirurgico_id' => 'required|exists:registo_cirurgicos,id',
            'diagnostico_id' => 'required|exists:diagnosticos,id',
            'procedimento_id' => 'required|exists:procedimentos,id',
            'funcao' => ['required', Rule::enum(FuncaoCirurgiaoEnum::class)],
            'clavien-dindo' => ['nullable', Rule::enum(ClavienDindoEnum::class)],
            'observacoes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'registo_cirurgico_id.required' => 'O registo cirúrgico é obrigatório.',
            'registo_cirurgico_id.exists' => 'O registo cirúrgico selecionado não existe.',
            'diagnostico_id.required' => 'O diagnóstico é obrigatório.',
            'diagnostico_id.exists' => 'O diagnóstico selecionado não existe.',
            'procedimento_id.required' => 'O procedimento é obrigatório.',
            'procedimento_id.exists' => 'O procedimento selecionado não existe.',
            'funcao.required' => 'A função é obrigatória.',
            'observacoes.max' => 'As observações não podem ter mais de 2000 caracteres.',
        ];
    }
}
