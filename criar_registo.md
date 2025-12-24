## Passo 1 – Utente

Campo obrigatório: nº de processo

Ao introduzir o nº de processo:

procurar automaticamente o utente na BD

se existir:

carregar os dados

permitir editar

se não existir:

permitir criar novo utente rentrando os dados necessários

## Passo 2 – Registo Cirúrgico

Criar um novo registo cirúrgico associado ao utente

Campos:

data da cirurgia

tipo de cirurgia

origem

ambulatório (Sim/Não)

observações gerais

## Passo 3 – Diagnósticos

Cada registo cirúrgico pode ter um ou mais diagnósticos

Interface deve permitir:

adicionar múltiplos diagnósticos

remover diagnósticos

## Passo 4 – Intervenções / Procedimentos

Cada diagnóstico pode ter uma ou mais intervenções (procedimentos)

Para cada intervenção:

selecionar procedimento

definir a função do utilizador nessa intervenção (ex: Cirurgião principal, Ajudante, Observador)

permitir que o mesmo utilizador tenha funções diferentes em intervenções diferentes

## Passo 5 – Dados adicionais da cirurgia

Para cada intervenção permitir:

Clavien-Dindo (opcional)

Anatomia patológica (opcional)

observações específicas

## Passo 6 – Revisão e Confirmação

Resumo completo:

dados do utente

registo cirúrgico

diagnósticos

intervenções e funções

Possibilidade de:

voltar a passos anteriores

confirmar e gravar tudo numa única transação