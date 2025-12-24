# Documentação do Sistema Medfolio

## Estrutura Implementada

### Models (8)
Todos os models incluem:
- ✅ Campos `$fillable` e `$guarded` para proteção de mass assignment
- ✅ Relacionamentos Eloquent completos
- ✅ Casts para tipos de dados (datas e **Enums**)
- ✅ Métodos auxiliares e scopes customizados

1. **Utente** (`app/Models/Utente.php`)
   - Campos: nome, data_nascimento, sexo, processo
   - Casts: data_nascimento → date, **sexo → SexoEnum**
   - Relacionamentos: hasMany RegistoCirurgico
   - Métodos: getIdadeAttribute(), getNomeComProcessoAttribute()
   - Scopes: scopeSexo()

2. **TipoDeCirurgia** (`app/Models/TipoDeCirurgia.php`)
   - Campos: nome
   - Relacionamentos: hasMany RegistoCirurgico

3. **TipoDeOrigem** (`app/Models/TipoDeOrigem.php`)
   - Campos: nome (unique)

4. **Area** (`app/Models/Area.php`)
   - Campos: nome (unique), descricao
   - Relacionamentos: hasMany Diagnostico, hasMany Procedimento
   - Scopes: scopeBuscar()

5. **Diagnostico** (`app/Models/Diagnostico.php`)
   - Campos: nome, area, descricao
   - Relacionamentos: belongsTo Area, hasMany Cirurgia

6. **Procedimento** (`app/Models/Procedimento.php`)
   - Campos: nome, area, descricao
   - Relacionamentos: belongsTo Area, hasMany Cirurgia

7. **RegistoCirurgico** (`app/Models/RegistoCirurgico.php`)
   - Campos: utente_id, data_cirurgia, tipo_de_cirurgia_id, tipo_de_abordagem, observacoes
   - Casts: data_cirurgia → date, **tipo_de_abordagem → TipoAbordagemEnum**
   - Relacionamentos: belongsTo Utente, belongsTo TipoDeCirurgia, hasMany Cirurgia
   - Métodos: getDataCirurgiaFormatadaAttribute()
   - Scopes: scopeEntreDatas(), scopePorTipo()

8. **Cirurgia** (`app/Models/Cirurgia.php`)
   - Campos: registo_cirurgico_id, diagnostico_id, procedimento_id, funcao, clavien-dindo, observacoes
   - Casts: **funcao → FuncaoCirurgiaoEnum, clavien-dindo → ClavienDindoEnum**
   - Relacionamentos: belongsTo RegistoCirurgico, belongsTo Diagnostico, belongsTo Procedimento
   - Métodos: temComplicacoes()
   - Scopes: scopePorDiagnostico(), scopePorProcedimento(), scopeComComplicacoes()

### Controllers CRUD (8)
Todos os controllers incluem:
- ✅ Métodos CRUD completos (index, create, store, show, edit, update, destroy)
- ✅ Uso de Request classes para validação
- ✅ Eager loading otimizado com select específico de colunas
- ✅ Paginação (15 itens por página)
- ✅ Mensagens de feedback ao usuário
- ✅ Integração com Inertia.js

1. `UtenteController` → Rota: `/utentes`
2. `TipoDeCirurgiaController` → Rota: `/tipos-de-cirurgia`
3. `TipoDeOrigemController` → Rota: `/tipos-de-origem`
4. `AreaController` → Rota: `/areas`
5. `DiagnosticoController` → Rota: `/diagnosticos`
6. `ProcedimentoController` → Rota: `/procedimentos`
7. `RegistoCirurgicoController` → Rota: `/registos-cirurgicos`
8. `CirurgiaController` → Rota: `/cirurgias`

### Request Classes (10)
Validações organizadas e reutilizáveis **usando Enums**:

#### Utente
- `StoreUtenteRequest` - Validação de criação
- `UpdateUtenteRequest` - Validação de atualização

#### Area
- `StoreAreaRequest` - Validação de criação
- `UpdateAreaRequest` - Validação de atualização

#### Diagnostico/Procedimento
- `StoreDiagnosticoRequest` - Validação de diagnósticos
- `StoreProcedimentoRequest` - Validação de procedimentos

#### RegistoCirurgico
- `StoreRegistoCirurgicoRequest` - Validação de criação
- `UpdateRegistoCirurgicoRequest` - Validação de atualização

#### Cirurgia
- `StoreCirurgiaRequest` - Validação de criação
- `UpdateCirurgiaRequest` - Validação de atualização

Todas as Request classes incluem:
- ✅ Regras de validação específicas **com Enums tipados**
- ✅ Mensagens de erro personalizadas em português
- ✅ Validações de existência em tabelas relacionadas
- ✅ Limites de caracteres apropriados

### Rotas
Arquivo: `routes/web.php`

Todas as rotas estão protegidas pelo middleware `auth:verified`:
```php
Route::resource('utentes', UtenteController::class);
Route::resource('tipos-de-cirurgia', TipoDeCirurgiaController::class);
Route::resource('tipos-de-origem', TipoDeOrigemController::class);
Route::resource('areas', AreaController::class);
Route::resource('diagnosticos', DiagnosticoController::class);
Route::resource('procedimentos', ProcedimentoController::class);
Route::resource('registos-cirurgicos', RegistoCirurgicoController::class);
Route::resource('cirurgias', CirurgiaController::class);
```

### Configuração
Arquivo: `config/medfolio.php`

Opções centralizadas usando **Enums** (PHP 8.1+):
- ✅ Opções de sexo → `SexoEnum`
- ✅ Tipos de abordagem cirúrgica → `TipoAbordagemEnum`
- ✅ Funções do cirurgião → `FuncaoCirurgiaoEnum`
- ✅ Classificação Clavien-Dindo → `ClavienDindoEnum`
- ✅ Configurações de paginação

### Enums (4)
Todos os enums incluem métodos auxiliares:

1. **SexoEnum** (`app/Enums/SexoEnum.php`)
   - Valores: Masculino, Feminino, Outro
   - Métodos: values(), toArray(), label()

2. **TipoAbordagemEnum** (`app/Enums/TipoAbordagemEnum.php`)
   - Valores: Convencional, Laparoscópica, Robótica, Endoscópica, Híbrida
   - Métodos: values(), toArray(), label()

3. **FuncaoCirurgiaoEnum** (`app/Enums/FuncaoCirurgiaoEnum.php`)
   - Valores: Cirurgião Principal, Cirurgião Assistente, Residente, Interno
   - Métodos: values(), toArray(), label(), isPrincipal(), isAssistente()

4. **ClavienDindoEnum** (`app/Enums/ClavienDindoEnum.php`)
   - Valores: I, II, IIIa, IIIb, IVa, IVb, V
   - Métodos: values(), toArray(), label(), descricao(), isGrave(), isObito()

### Service Provider
Arquivo: `app/Providers/MedfolioServiceProvider.php`

- ✅ Compartilha **Enums** com o frontend via Inertia
- ✅ Expõe values() e toArray() para cada Enum
- ✅ Registrado em `bootstrap/providers.php`

## Otimizações Implementadas

### Performance
1. **Eager Loading**: Todos os controllers usam `with()` para evitar N+1 queries
2. **Select Específico**: Queries carregam apenas colunas necessárias
3. **withCount()**: Contagem de relacionamentos sem carregar dados desnecessários
4. **Paginação**: Limitação de resultados em todas as listagens

### Segurança
1. **Mass Assignment Protection**: `$fillable` e `$guarded` em todos os models
2. **Request Validation**: Todas as entradas validadas via Form Requests
3. **Middleware de Autenticação**: Todas as rotas protegidas
4. **Validação de Foreign Keys**: Verificação de existência em tabelas relacionadas
### Boas Práticas
1. **SRP**: Separação de validação (Requests) e lógica (Controllers)
2. **DRY**: Reutilização de código via scopes e métodos auxiliares
3. **Type Safety**: Uso de Enums para valores fixos (PHP 8.1+)
4. **Mensagens em Português**: Feedback claro ao usuário
5. **Documentação**: Comentários PHPDoc em todos os métodos
6. **Type Hints**: Tipos definidos em todos os parâmetros e retornos
5. **Type Hints**: Tipos definidos em todos os parâmetros e retornos

## Próximos Passos

### Backend (Próximos)
- [ ] Implementar filtros avançados
- [ ] Adicionar exportação de dados (Excel/PDF)
- [ ] Criar sistema de permissões (Spatie Permission)
- [ ] Implementar logs de auditoria
- [ ] Adicionar testes automatizados

### Database
- [x] Executar migrations: `php artisan migrate`
- [x] Criar seeders para dados de teste
- [x] Popular base de dados: `php artisan db:seed` ou `php artisan medfolio:seed`
- [ ] Adicionar índices adicionais para otimização

### Seeders Disponíveis
Os seguintes seeders estão criados e prontos para uso:
- ✅ **AreaSeeder** - 10 áreas cirúrgicas
- ✅ **TipoDeCirurgiaSeeder** - 10 tipos de cirurgia
- ✅ **TipoDeOrigemSeeder** - 6 tipos de origem
- ✅ **DiagnosticoSeeder** - 21 diagnósticos
- ✅ **ProcedimentoSeeder** - 31 procedimentos
- ✅ **UtenteSeeder** - 15 utentes com dados realistas
- ✅ **RegistoCirurgicoSeeder** - 10 registos cirúrgicos
- ✅ **CirurgiaSeeder** - 12 cirurgias com complicações variadas

**Comando customizado**: `php artisan medfolio:seed [--fresh] [--table=nome]`

### Frontend (Inertia.js + Vue/React)
- [ ] Criar views para cada CRUD
- [ ] Implementar componentes de formulário
- [ ] Adicionar tabelas com ordenação e filtros
- [ ] Criar dashboards com estatísticas

### Backend (Próximos)
- [ ] Implementar filtros avançados
- [ ] Adicionar exportação de dados (Excel/PDF)
- [ ] Criar sistema de permissões (Spatie Permission)
- [ ] Implementar logs de auditoria

## Comandos Úteis

```bash
# Popular base de dados (comando customizado)
php artisan medfolio:seed
php artisan medfolio:seed --fresh  # Reset completo
php artisan medfolio:seed --table=utentes  # Popular apenas uma tabela

# Comandos tradicionais
php artisan migrate
php artisan db:seed
php artisan migrate:fresh --seed

# Seeders individuais
php artisan db:seed --class=AreaSeeder
php artisan db:seed --class=UtenteSeeder

# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Listar rotas
php artisan route:list

# Verificar status
php artisan about
```

## Estrutura de Arquivos Criados
```
app/
├── Console/
│   └── Commands/
│       └── SeedMedfolioData.php
├── Enums/
│   ├── SexoEnum.php
│   ├── TipoAbordagemEnum.php
│   ├── FuncaoCirurgiaoEnum.php
│   └── ClavienDindoEnum.php
├── Http/
├── Http/
│   ├── Controllers/
│   │   ├── AreaController.php
│   │   ├── CirurgiaController.php
│   │   ├── DiagnosticoController.php
│   │   ├── ProcedimentoController.php
│   │   ├── RegistoCirurgicoController.php
│   │   ├── TipoDeCirurgiaController.php
│   │   ├── TipoDeOrigemController.php
│   │   └── UtenteController.php
│   └── Requests/
│       ├── StoreAreaRequest.php
│       ├── UpdateAreaRequest.php
│       ├── StoreCirurgiaRequest.php
│       ├── UpdateCirurgiaRequest.php
│       ├── StoreDiagnosticoRequest.php
│       ├── StoreProcedimentoRequest.php
│       ├── StoreRegistoCirurgicoRequest.php
│       ├── UpdateRegistoCirurgicoRequest.php
│       ├── StoreUtenteRequest.php
│       └── UpdateUtenteRequest.php
├── Models/
│   ├── Area.php
│   ├── Cirurgia.php
│   ├── Diagnostico.php
│   ├── Procedimento.php
│   ├── RegistoCirurgico.php
│   ├── TipoDeCirurgia.php
│   ├── TipoDeOrigem.php
│   └── Utente.php
config/
└── medfolio.php

database/
└── seeders/
    ├── README.md
    ├── DatabaseSeeder.php
    ├── AreaSeeder.php
    ├── TipoDeCirurgiaSeeder.php
    ├── TipoDeOrigemSeeder.php
    ├── DiagnosticoSeeder.php
    ├── ProcedimentoSeeder.php
    ├── UtenteSeeder.php
    ├── RegistoCirurgicoSeeder.php
    └── CirurgiaSeeder.php

routes/
└── web.php (atualizado)

bootstrap/
└── providers.php (atualizado)
```

---

**Total de arquivos criados/modificados: 44**
- 4 Enums
- 8 Models (com Enum casts)
- 8 Controllers
- 10 Request Classes (com validação de Enums)
- 1 Config File (usando Enums)
- 1 Service Provider (compartilhando Enums)
- 8 Seeders (com dados realistas)
- 1 Comando Artisan customizado
- 1 README de seeders
- 2 Arquivos de configuração atualizados
