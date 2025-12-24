<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cirurgia;
use App\Models\RegistoCirurgico;
use App\Models\Diagnostico;
use App\Models\Procedimento;
use App\Enums\FuncaoCirurgiaoEnum;
use App\Enums\ClavienDindoEnum;

class CirurgiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $registos = RegistoCirurgico::all();
        $diagnosticos = Diagnostico::all();
        $procedimentos = Procedimento::all();

        if ($registos->isEmpty() || $diagnosticos->isEmpty() || $procedimentos->isEmpty()) {
            $this->command->warn('Execute RegistoCirurgicoSeeder, DiagnosticoSeeder e ProcedimentoSeeder primeiro!');
            return;
        }

        $cirurgias = [
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Colecistite')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Colecistectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => 'Cirurgia sem complicações',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Apendicite Aguda')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Apendicectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => null,
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Hérnia Inguinal')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Herniorrafia Inguinal')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value,
                'clavien-dindo' => ClavienDindoEnum::GRAU_I->value,
                'observacoes' => 'Pequeno seroma no pós-operatório, resolvido conservadoramente',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Gonartrose')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Artroplastia do Joelho')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => 'Prótese total do joelho, excelente resultado',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Coxartrose')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Artroplastia da Anca')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::RESIDENTE->value,
                'clavien-dindo' => null,
                'observacoes' => 'Cirurgia sob supervisão',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Varizes')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Safenectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => null,
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Litíase Renal')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Nefrolitotomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => ClavienDindoEnum::GRAU_II->value,
                'observacoes' => 'Infeção urinária pós-operatória tratada com antibióticos',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Mioma Uterino')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Miomectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_ASSISTENTE->value,
                'clavien-dindo' => null,
                'observacoes' => 'Procedimento laparoscópico bem sucedido',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Catarata')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Facoemulsificação')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => 'Implante de lente intraocular',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Amigdalite Crónica')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Amigdalectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::INTERNO->value,
                'clavien-dindo' => null,
                'observacoes' => 'Cirurgia sob orientação',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Hérnia Discal')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Discectomia')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => ClavienDindoEnum::GRAU_IIIA->value,
                'observacoes' => 'Necessária drenagem de hematoma pós-operatório',
            ],
            [
                'registo_cirurgico_id' => $registos->random()->id,
                'diagnostico_id' => $diagnosticos->where('nome', 'Fratura do Fémur')->first()->id ?? $diagnosticos->random()->id,
                'procedimento_id' => $procedimentos->where('nome', 'Osteossíntese')->first()->id ?? $procedimentos->random()->id,
                'funcao' => FuncaoCirurgiaoEnum::CIRURGIAO_PRINCIPAL->value,
                'clavien-dindo' => null,
                'observacoes' => 'Fixação com placa e parafusos',
            ],
        ];

        foreach ($cirurgias as $cirurgia) {
            Cirurgia::create($cirurgia);
        }
    }
}
