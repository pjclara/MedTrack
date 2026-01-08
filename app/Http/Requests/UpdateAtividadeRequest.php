<?php

namespace App\Http\Requests;

use App\Enums\TipoAtividadeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAtividadeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string|max:2000',
            'tipo' => ['required', Rule::enum(TipoAtividadeEnum::class)],
            'data' => 'required|date',
            'revista_conferencia' => 'nullable|string|max:255',
            'localizacao' => 'nullable|string|max:255',
            'categoria' => 'nullable|string|in:' . implode(',', config('medfolio.categoria_atividade_options')),
            'autores' => 'nullable|string|max:1000',
            'autor_principal' => 'boolean',
            'posicao_autor' => 'nullable|integer|min:1|max:100',
            'doi' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:50',
            'link' => 'nullable|url|max:500',
            'fator_impacto' => 'nullable|numeric|min:0|max:99999',
            'ficheiro' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx,jpg,jpeg,png|max:10240', // 10MB
            'observacoes' => 'nullable|string|max:2000',
            'remover_ficheiro' => 'boolean', // Flag to remove existing file
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'titulo.required' => 'O título é obrigatório.',
            'titulo.max' => 'O título não pode ter mais de 255 caracteres.',
            'tipo.required' => 'O tipo de atividade é obrigatório.',
            'data.required' => 'A data é obrigatória.',
            'data.date' => 'A data deve ser uma data válida.',
            'categoria.in' => 'A categoria selecionada é inválida.',
            'autor_principal.boolean' => 'O campo autor principal deve ser verdadeiro ou falso.',
            'posicao_autor.integer' => 'A posição do autor deve ser um número inteiro.',
            'posicao_autor.min' => 'A posição do autor deve ser no mínimo 1.',
            'link.url' => 'O link deve ser uma URL válida.',
            'fator_impacto.numeric' => 'O fator de impacto deve ser um número.',
            'fator_impacto.min' => 'O fator de impacto deve ser no mínimo 0.',
            'ficheiro.file' => 'O ficheiro deve ser um arquivo válido.',
            'ficheiro.mimes' => 'O ficheiro deve ser do tipo: PDF, DOC, DOCX, PPT, PPTX, JPG, JPEG ou PNG.',
            'ficheiro.max' => 'O ficheiro não pode ser maior que 10MB.',
        ];
    }
}
