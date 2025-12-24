# Resumo das Tabelas da Base de Dados

Este documento descreve as tabelas principais presentes na base de dados do projecto.

---

## users (Utilizadores)
- `id` — ID único
- `name` — Nome do utilizador
- `email` — Email único
- `email_verified_at` — Data de verificação do email (nullable)
- `password` — Password encriptada
- `two_factor_secret` — Segredo 2FA (nullable)
- `two_factor_recovery_codes` — Códigos de recuperação 2FA (nullable)
- `two_factor_confirmed_at` — Data de confirmação 2FA (nullable)
- `remember_token` — Token de sessão
- `created_at`, `updated_at`

Tabelas relacionadas: `password_reset_tokens`, `sessions`.

---

## utentes (Pacientes)
- `id` — ID único
- `nome` — Nome do utente
- `data_nascimento` — Data de nascimento (`date`)
- `sexo` — Sexo (string / enum)
- `processo` — Número do processo (`integer`)
- `created_at`, `updated_at`

Relações: 1 utente → N `registo_cirurgicos`.

---

## registo_cirurgicos (Registos Cirúrgicos)
- `id` — ID único
- `utente_id` — FK para `utentes` (cascade delete)
- `data_cirurgia` — Data da cirurgia (`date`)
- `tipo_de_cirurgia_id` — FK para `tipo_de_cirurgias` (cascade delete)
- `tipo_de_abordagem` — Tipo de abordagem (string / enum)
- `observacoes` — Observações (text, nullable)
- `created_at`, `updated_at`

Relações: N:1 com `utentes`; N:1 com `tipo_de_cirurgias`; 1:N com `cirurgias`.

---

## tipo_de_cirurgias (Tipos de Cirurgia)
- `id` — ID único
- `nome` — Nome do tipo
- `created_at`, `updated_at`

1 tipo → N `registo_cirurgicos`.

---

## cirurgias (Detalhes da Cirurgia)
- `id` — ID único
- `registo_cirurgico_id` — FK para `registo_cirurgicos` (cascade delete)
- `diagnostico_id` — FK para `diagnosticos` (cascade delete)
- `procedimento_id` — FK para `procedimentos` (cascade delete)
- `funcao` — Função do cirurgião (string / enum)
- `clavien-dindo` — Classificação de complicações (nullable)
- `observacoes` — Observações (text, nullable)
- `created_at`, `updated_at`

Relações: N:1 com `registo_cirurgicos`, `diagnosticos`, `procedimentos`.

---

## diagnosticos (Diagnósticos)
- `id` — ID único
- `nome` — Nome do diagnóstico
- `area` — Área médica (string)
- `descricao` — Descrição (text, nullable)
- `created_at`, `updated_at`

1 diagnóstico → N `cirurgias`.

---

## procedimentos (Procedimentos)
- `id` — ID único
- `nome` — Nome do procedimento
- `area` — Área médica (string)
- `descricao` — Descrição (text, nullable)
- `created_at`, `updated_at`

1 procedimento → N `cirurgias`.

---

## areas (Áreas Médicas)
- `id` — ID único
- `nome` — Nome único da área
- `descricao` — Descrição (nullable)
- `created_at`, `updated_at`

---

## tipo_de_origems (Tipos de Origem)
- `id` — ID único
- `nome` — Nome único
- `created_at`, `updated_at`

---

## Sistema de Permissões (Spatie)
Tabelas geradas pelo pacote de permissão:
- `permissions`
- `roles`
- `model_has_permissions`
- `model_has_roles`
- `role_has_permissions`

---

## Diagrama simplificado das relações

```
Utente (1) ─┬─> (N) RegistoCirurgico
            │
            └─> TipoDeCirurgia (N:1)
                
RegistoCirurgico (1) ─> (N) Cirurgia
                            │
                            ├─> Diagnostico (N:1)
                            └─> Procedimento (N:1)

Area ─> Diagnosticos/Procedimentos (referência)

User ─> Roles ─> Permissions (sistema de permissões)
```

---

## Observações
- Campos `date` nas migrations são mapeados para casts `date` nos modelos (`Carbon` no backend). Para uso em inputs HTML `type="date"` é necessário formatar como `Y-m-d` ao enviar os dados para o frontend.
- Para ver as definições exactas, consulte as migrations em `database/migrations/`.

---

*Gerado automaticamente por assistência de desenvolvimento.*
