<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Procedimento;

class ProcedimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $procedimentos = [
                // Cirurgia Geral
                ['nome' => 'Apendicectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção cirúrgica do apêndice', 'user_id' => $user->id],
                ['nome' => 'Colecistectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção da vesícula biliar', 'user_id' => $user->id],
                ['nome' => 'Herniorrafia Inguinal', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Correção de hérnia inguinal', 'user_id' => $user->id],
                ['nome' => 'Laparotomia Exploradora', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Abertura cirúrgica do abdómen para exploração', 'user_id' => $user->id],
                ['nome' => 'Gastrectomia', 'especialidade' => 'Cirurgia Geral', 'descricao' => 'Remoção total ou parcial do estômago', 'user_id' => $user->id],
                
                // Cirurgia Cardiotorácica
                ['nome' => 'Bypass Coronário', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Revascularização do miocárdio', 'user_id' => $user->id],
                ['nome' => 'Substituição Valvular', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Troca de válvula cardíaca', 'user_id' => $user->id],
                ['nome' => 'Correção de Aneurisma', 'especialidade' => 'Cirurgia Cardiotorácica', 'descricao' => 'Correção cirúrgica de aneurisma', 'user_id' => $user->id],
                
                // Cirurgia Vascular
                ['nome' => 'Safenectomia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Remoção da veia safena', 'user_id' => $user->id],
                ['nome' => 'Escleroterapia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Tratamento de varizes por injeção', 'user_id' => $user->id],
                ['nome' => 'Angioplastia', 'especialidade' => 'Cirurgia Vascular', 'descricao' => 'Desobstrução de artérias', 'user_id' => $user->id],
                
                // Neurocirurgia
                ['nome' => 'Discectomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Remoção de disco intervertebral', 'user_id' => $user->id],
                ['nome' => 'Laminectomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Remoção de lâmina vertebral', 'user_id' => $user->id],
                ['nome' => 'Craniotomia', 'especialidade' => 'Neurocirurgia', 'descricao' => 'Abertura do crânio', 'user_id' => $user->id],
                
                // Ortopedia
                ['nome' => 'Osteossíntese', 'especialidade' => 'Ortopedia', 'descricao' => 'Fixação cirúrgica de fratura', 'user_id' => $user->id],
                ['nome' => 'Artroplastia do Joelho', 'especialidade' => 'Ortopedia', 'descricao' => 'Prótese total do joelho', 'user_id' => $user->id],
                ['nome' => 'Artroplastia da Anca', 'especialidade' => 'Ortopedia', 'descricao' => 'Prótese total da anca', 'user_id' => $user->id],
                ['nome' => 'Artroscopia', 'especialidade' => 'Ortopedia', 'descricao' => 'Visualização endoscópica de articulação', 'user_id' => $user->id],
                
                // Urologia
                ['nome' => 'Nefrolitotomia', 'especialidade' => 'Urologia', 'descricao' => 'Remoção de cálculo renal', 'user_id' => $user->id],
                ['nome' => 'Prostatectomia', 'especialidade' => 'Urologia', 'descricao' => 'Remoção da próstata', 'user_id' => $user->id],
                ['nome' => 'Cistoscopia', 'especialidade' => 'Urologia', 'descricao' => 'Endoscopia da bexiga', 'user_id' => $user->id],
                ['nome' => 'RTU Prostática', 'especialidade' => 'Urologia', 'descricao' => 'Ressecção transuretral da próstata', 'user_id' => $user->id],
                
                // Ginecologia
                ['nome' => 'Histerectomia', 'especialidade' => 'Ginecologia', 'descricao' => 'Remoção do útero', 'user_id' => $user->id],
                ['nome' => 'Miomectomia', 'especialidade' => 'Ginecologia', 'descricao' => 'Remoção de miomas uterinos', 'user_id' => $user->id],
                ['nome' => 'Laparoscopia Ginecológica', 'especialidade' => 'Ginecologia', 'descricao' => 'Cirurgia ginecológica por via laparoscópica', 'user_id' => $user->id],
                
                // Oftalmologia
                ['nome' => 'Facoemulsificação', 'especialidade' => 'Oftalmologia', 'descricao' => 'Cirurgia de catarata', 'user_id' => $user->id],
                ['nome' => 'Vitrectomia', 'especialidade' => 'Oftalmologia', 'descricao' => 'Remoção do vítreo ocular', 'user_id' => $user->id],
                
                // Otorrinolaringologia
                ['nome' => 'Amigdalectomia', 'especialidade' => 'Otorrinolaringologia', 'descricao' => 'Remoção das amígdalas', 'user_id' => $user->id],
                ['nome' => 'Septoplastia', 'especialidade' => 'Otorrinolaringologia', 'descricao' => 'Correção do septo nasal', 'user_id' => $user->id],
                
                // Cirurgia Plástica
                ['nome' => 'Abdominoplastia', 'especialidade' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia estética do abdómen', 'user_id' => $user->id],
                ['nome' => 'Mamoplastia', 'especialidade' => 'Cirurgia Plástica', 'descricao' => 'Cirurgia da mama', 'user_id' => $user->id],
            ];

            foreach ($procedimentos as $procedimento) {
                Procedimento::create($procedimento);
            }
        }
    }
}
