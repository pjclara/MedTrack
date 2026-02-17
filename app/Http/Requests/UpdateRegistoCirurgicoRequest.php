<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;
use App\Enums\SexoEnum;

class UpdateRegistoCirurgicoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Utente data
            'utente.id' => 'nullable|exists:utentes,id',
            'utente.nome' => 'nullable|string|max:255',
            'utente.processo' => 'required|max:50',
            'utente.data_nascimento' => 'required|date',
            'utente.sexo' => ['required', Rule::enum(SexoEnum::class)],

            // Registo data
            'registo.hospital' => 'required|string|max:255',
            'registo.especialidade' => 'required|string|max:255',
            'registo.data_cirurgia' => 'required|date',
            'registo.tipo_de_cirurgia_id' => 'required|exists:tipo_de_cirurgias,id',
            'registo.tipo_de_origem_id' => 'required|exists:tipo_de_origems,id',
            'registo.ambulatorio' => 'required|boolean',
            'registo.tipo_de_abordagem_id' => ['required', 'exists:tipo_de_abordagems,id'],
            'registo.observacoes' => 'nullable|string|max:2000',

            // Diagnosticos and procedimentos
            'diagnosticos' => 'required|array|min:1',
            'diagnosticos.*.diagnostico_id' => 'required|exists:diagnosticos,id',
            'diagnosticos.*.tipo' => 'nullable|string',
            'diagnosticos.*.procedimentos' => 'required|array|min:1',
            'diagnosticos.*.procedimentos.*.procedimento_id' => 'required|exists:procedimentos,id',
            'diagnosticos.*.procedimentos.*.funcao' => ['required', Rule::enum(FuncaoCirurgiaoEnum::class)],
            'diagnosticos.*.procedimentos.*.clavien_dindo' => ['nullable', Rule::enum(ClavienDindoEnum::class)],
            'diagnosticos.*.procedimentos.*.anatomia_patologica' => 'nullable|string|max:2000',
            'diagnosticos.*.procedimentos.*.observacoes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'utente.processo.required' => 'O número de processo é obrigatório.',
            'utente.data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'utente.sexo.required' => 'O sexo é obrigatório.',

            'registo.data_cirurgia.required' => 'A data da cirurgia é obrigatória.',
            'registo.tipo_de_cirurgia_id.required' => 'O tipo de cirurgia é obrigatório.',
            'registo.tipo_de_origem_id.required' => 'O tipo de origem é obrigatório.',
            'registo.tipo_de_abordagem_id.required' => 'O tipo de abordagem é obrigatório.',

            'diagnosticos.required' => 'É necessário pelo menos um diagnóstico.',
            'diagnosticos.min' => 'É necessário pelo menos um diagnóstico.',
            'diagnosticos.*.procedimentos.required' => 'Cada diagnóstico deve ter pelo menos um procedimento.',
            'diagnosticos.*.procedimentos.min' => 'Cada diagnóstico deve ter pelo menos um procedimento.',
        ];
    }
}
