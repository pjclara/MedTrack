<?php

namespace App\Exports;

use App\Models\AtividadeCientifica;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AtividadesCientificasExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function query()
    {
        return AtividadeCientifica::query()
            ->where('user_id', $this->userId)
            ->orderBy('data', 'desc');
    }

    public function headings(): array
    {
        return [
            'Título',
            'Tipo',
            'Data',
            'Revista/Conferência',
            'Localização',
            'Categoria',
            'Autores',
            'Autor Principal',
            'Posição Autor',
            'DOI',
            'ISBN',
            'Fator de Impacto',
            'Observações'
        ];
    }

    public function map($atividade): array
    {
        return [
            $atividade->titulo,
            $atividade->tipo->value ?? $atividade->tipo,
            $atividade->data->format('d/m/Y'),
            $atividade->revista_conferencia,
            $atividade->localizacao,
            $atividade->categoria,
            $atividade->autores,
            $atividade->autor_principal ? 'Sim' : 'Não',
            $atividade->posicao_autor,
            $atividade->doi,
            $atividade->isbn,
            $atividade->fator_impacto,
            $atividade->observacoes
        ];
    }
}
