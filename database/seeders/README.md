# Seeders do Sistema Medfolio

## 📋 Ordem de Execução

Os seeders devem ser executados na seguinte ordem (já configurado no `DatabaseSeeder`):

1. **AreaSeeder** - 10 áreas cirúrgicas
2. **TipoDeCirurgiaSeeder** - 10 tipos de cirurgia
3. **TipoDeOrigemSeeder** - 6 tipos de origem
4. **DiagnosticoSeeder** - 21 diagnósticos
5. **ProcedimentoSeeder** - 31 procedimentos
6. **UtenteSeeder** - 15 utentes
7. **RegistoCirurgicoSeeder** - 10 registos cirúrgicos
8. **CirurgiaSeeder** - 12 cirurgias

## 🚀 Como Executar

### Executar todos os seeders:
```bash
php artisan db:seed
```

### Executar um seeder específico:
```bash
php artisan db:seed --class=AreaSeeder
php artisan db:seed --class=UtenteSeeder
```

### Resetar e popular novamente:
```bash
php artisan migrate:fresh --seed
```

## 📊 Dados Criados

### Áreas (10)
- Cirurgia Geral
- Cirurgia Cardiotorácica
- Cirurgia Vascular
- Neurocirurgia
- Ortopedia
- Urologia
- Ginecologia
- Oftalmologia
- Otorrinolaringologia
- Cirurgia Plástica

### Tipos de Cirurgia (10)
- Cirurgia Eletiva
- Cirurgia de Urgência
- Cirurgia de Emergência
- Cirurgia Ambulatória
- Cirurgia de Grande/Médio/Pequeno Porte
- Cirurgia Minimamente Invasiva
- Cirurgia Reconstrutiva
- Cirurgia Paliativa

### Diagnósticos (21)
Exemplos por área:
- **Cirurgia Geral**: Apendicite Aguda, Colecistite, Hérnias
- **Ortopedia**: Gonartrose, Coxartrose, Fratura do Fémur
- **Urologia**: Litíase Renal, Hiperplasia Benigna da Próstata
- E mais...

### Procedimentos (31)
Exemplos por área:
- **Cirurgia Geral**: Apendicectomia, Colecistectomia, Herniorrafia
- **Ortopedia**: Artroplastia do Joelho/Anca, Osteossíntese
- **Neurocirurgia**: Discectomia, Laminectomia, Craniotomia
- E mais...

### Utentes (15)
- Dados realistas com nomes portugueses
- Idades variadas (nascimentos entre 1955-1990)
- Distribuição equilibrada entre sexos
- Números de processo sequenciais (100001-100015)

### Registos Cirúrgicos (10)
- Datas distribuídas nos últimos 6 meses
- Diferentes tipos de abordagem (Laparoscópica, Convencional, Robótica, etc.)
- Alguns com observações, outros sem

### Cirurgias (12)
- Relacionadas com diagnósticos e procedimentos correspondentes
- Diferentes funções (Cirurgião Principal, Assistente, Residente, Interno)
- Algumas com complicações (Clavien-Dindo I, II, IIIa)
- Maioria sem complicações

## 🎯 Características dos Dados

### Realismo
- ✅ Nomes portugueses autênticos
- ✅ Datas de nascimento realistas
- ✅ Diagnósticos e procedimentos correspondentes
- ✅ Distribuição temporal de cirurgias
- ✅ Alguns casos com complicações (realista)

### Enums Utilizados
- **SexoEnum**: Masculino, Feminino
- **TipoAbordagemEnum**: Convencional, Laparoscópica, Robótica, Endoscópica, Híbrida
- **FuncaoCirurgiaoEnum**: Cirurgião Principal, Cirurgião Assistente, Residente, Interno
- **ClavienDindoEnum**: I, II, IIIa (complicações)

### Relações
- ✅ Foreign keys respeitadas
- ✅ Relações entre tabelas consistentes
- ✅ Diagnósticos e procedimentos da mesma área

## 🔧 Personalização

### Adicionar mais utentes:
Edite `UtenteSeeder.php` e adicione mais registos ao array `$utentes`.

### Adicionar mais áreas médicas:
Edite `AreaSeeder.php` e adicione ao array `$areas`.

### Adicionar mais diagnósticos/procedimentos:
Edite os respectivos seeders e adicione aos arrays.

## ⚠️ Notas Importantes

1. **Ordem de execução**: Os seeders têm dependências (foreign keys), execute sempre na ordem correta.

2. **Duplicação**: Use `migrate:fresh --seed` para limpar e repovoar completamente.

3. **Produção**: Estes seeders são para desenvolvimento/testes. **NÃO execute em produção**.

4. **Usuários de teste**:
   - Email: `test@example.com` / Password: `password`
   - Email: `admin@medfolio.com` / Password: `password`

## 📝 Exemplo de Uso

```bash
# 1. Resetar banco de dados
php artisan migrate:fresh

# 2. Popular com dados de teste
php artisan db:seed

# 3. Verificar dados criados
php artisan tinker
>>> App\Models\Utente::count()
=> 15
>>> App\Models\Cirurgia::with('diagnostico', 'procedimento')->first()
```

## 🎨 Extensões Futuras

Possíveis melhorias:
- [ ] Adicionar Factory para gerar dados aleatórios
- [ ] Criar seeder para usuários com roles/permissions
- [ ] Adicionar mais casos clínicos complexos
- [ ] Gerar relatórios e estatísticas de exemplo
- [ ] Criar dados para testes automatizados
