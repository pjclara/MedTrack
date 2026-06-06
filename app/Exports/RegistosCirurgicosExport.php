<?php

namespace App\Exports;

use App\Models\RegistoCirurgico;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class RegistosCirurgicosExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function query()
    {
        return RegistoCirurgico::query()
            ->where('user_id', $this->userId)
            ->with(['utente', 'tipoDeCirurgia', 'tipoDeAbordagem', 'hospital', 'especialidade', 'cirurgias.diagnostico', 'cirurgias.procedimento'])
            ->orderBy('data_cirurgia', 'desc');
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()
            ->getStyle('J:J')
            ->getAlignment()
            ->setWrapText(true);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => [self::class, 'afterSheet'],
        ];
    }

    public function headings(): array
    {
        return [
            'Data',
            'Idade',
            'Sexo',
            'Processo',
            'Hospital',
            'Especialidade',
            'Tipo de Cirurgia',
            'Tipo de Abordagem',
            'Ambulatório',
            'Cirurgias (Diagnósticos / Procedimentos / Função do Cirurgião / Complicações / Anatomia Patológica / Observações)',
            'Observações'
        ];
    }

    public function map($registo): array
    {
        $cirurgiasStr = $registo->cirurgias->map(function ($c) {
            $diag = $c->diagnostico ? $c->diagnostico->nome : 'N/A';
            $proc = $c->procedimento ? $c->procedimento->nome : 'N/A';
            $funcao = $c->funcaoCirurgiao ? " ({$c->funcaoCirurgiao->nome})" : '';
            $complicacoes = $c->{'clavien-dindo'} ? " [Clavien-Dindo: " . (is_object($c->{'clavien-dindo'}) ? $c->{'clavien-dindo'}->value : $c->{'clavien-dindo'}) . "]" : '';
            $anatomia_patologica = $c->anatomia_patologica ? " [Anatomia Patológica: {$c->anatomia_patologica}]" : '';
            $observacoes = $c->observacoes ? " [Observações: {$c->observacoes}]" : '';
            return "[$diag / $proc / $funcao / $complicacoes / $anatomia_patologica / $observacoes]";
        })->implode(PHP_EOL);


        $data= [
            $registo->data_cirurgia->format('d/m/Y'),
            $registo->utente->idade,
            $registo->utente->sexo->value,
            $registo->utente->processo,
            $registo->hospital?->nome,
            $registo->especialidade?->nome,
            $registo->tipoDeCirurgia->nome,
            $registo->tipoDeAbordagem->nome ?? 'N/A',
            $registo->ambulatorio ? 'Sim' : 'Não',
            $cirurgiasStr,
            $registo->observacoes
        ];

        return $data;
    }
}

