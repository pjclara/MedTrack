<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diagnostico;

class DiagnosticoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $diagnosticos = [
                // Abdomen
                ['nome' => 'Apendicite Aguda', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Inflamação aguda do apêndice', 'user_id' => $user->id],
                ['nome' => 'Colecistite', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Inflamação da vesícula biliar', 'user_id' => $user->id],
                ['nome' => 'Peritonite', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Inflamação do peritônio', 'user_id' => $user->id],
                ['nome' => 'Mioma Uterino', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Tumor benigno do útero', 'user_id' => $user->id],
                ['nome' => 'Endometriose', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Presença de endométrio fora do útero', 'user_id' => $user->id],
                
                // Inguinal/Pélvica
                ['nome' => 'Hérnia Inguinal', 'zona_anatomica' => 'Pélvica', 'descricao' => 'Protrusão de conteúdo abdominal pela região inguinal', 'user_id' => $user->id],
                ['nome' => 'Hérnia Umbilical', 'zona_anatomica' => 'Abdomen', 'descricao' => 'Protrusão pela região umbilical', 'user_id' => $user->id],
                ['nome' => 'Litíase Renal', 'zona_anatomica' => 'Pélvica', 'descricao' => 'Cálculos renais', 'user_id' => $user->id],
                ['nome' => 'Hiperplasia Benigna da Próstata', 'zona_anatomica' => 'Pélvica', 'descricao' => 'Aumento benigno do volume prostático', 'user_id' => $user->id],

                // Tórax
                ['nome' => 'Doença Arterial Coronária', 'zona_anatomica' => 'Tórax', 'descricao' => 'Obstrução das artérias coronárias', 'user_id' => $user->id],
                ['nome' => 'Aneurisma da Aorta', 'zona_anatomica' => 'Tórax', 'descricao' => 'Dilatação anormal da aorta', 'user_id' => $user->id],
                ['nome' => 'Valvulopatia', 'zona_anatomica' => 'Tórax', 'descricao' => 'Doença das válvulas cardíacas', 'user_id' => $user->id],
                
                // Membros
                ['nome' => 'Varizes', 'zona_anatomica' => 'Membros Inferiores', 'descricao' => 'Veias dilatadas e tortuosas', 'user_id' => $user->id],
                ['nome' => 'Insuficiência Venosa Crónica', 'zona_anatomica' => 'Membros Inferiores', 'descricao' => 'Má circulação venosa dos membros', 'user_id' => $user->id],
                ['nome' => 'Fratura do Fémur', 'zona_anatomica' => 'Membros Inferiores', 'descricao' => 'Fratura do osso do fémur', 'user_id' => $user->id],
                ['nome' => 'Gonartrose', 'zona_anatomica' => 'Membros Inferiores', 'descricao' => 'Artrose do joelho', 'user_id' => $user->id],
                ['nome' => 'Coxartrose', 'zona_anatomica' => 'Membros Inferiores', 'descricao' => 'Artrose da anca', 'user_id' => $user->id],
                
                // Cabeça e Pescoço
                ['nome' => 'Hérnia Discal', 'zona_anatomica' => 'Coluna', 'descricao' => 'Protrusão do disco intervertebral', 'user_id' => $user->id],
                ['nome' => 'Tumor Cerebral', 'zona_anatomica' => 'Cabeça', 'descricao' => 'Neoplasia do sistema nervoso central', 'user_id' => $user->id],
                ['nome' => 'Catarata', 'zona_anatomica' => 'Cabeça', 'descricao' => 'Opacificação do cristalino', 'user_id' => $user->id],
                ['nome' => 'Amigdalite Crónica', 'zona_anatomica' => 'Cabeça', 'descricao' => 'Inflamação crónica das amígdalas', 'user_id' => $user->id],
            ];

            foreach ($diagnosticos as $diagnostico) {
                Diagnostico::create($diagnostico);
            }
        }
    }
}
