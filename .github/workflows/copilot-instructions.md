# GitHub Copilot — Instruções Personalizadas (Versão Final)

## Como eu escrevo código
- Priorizo código **limpo, manutenível e escalável**, com forte ênfase em clareza e estrutura.
- Prefiro implementações **explícitas e previsíveis**, evitando “mágica” ou abstrações desnecessárias.
- Utilizo **recursos modernos das linguagens** (PHP 8+, ES2020+, TypeScript quando disponível).
- Sigo **PSR-12**, **princípios SOLID** (quando apropriado) e **nomenclatura orientada ao domínio**.
- Espero código **pronto para produção**, consistente e alinhado às convenções do framework.

---

## Laravel (Backend)
- Utilize o **Eloquent ORM de forma idiomática** (scopes, accessors/mutators, resource collections).
- Sempre utilize **FormRequest classes** para validação.
- Utilize **API Resources** para todas as respostas da API.
- Mantenha os controllers **enxutos**; mova a lógica de negócio para **Service classes**.
- Utilize **injeção de dependência**; evite facades, exceto quando forem idiomáticas (ex.: `Log`, `Cache`).
- Utilize **Policies** para autorização.
- Utilize **Jobs** para tarefas pesadas ou assíncronas.
- Utilize **Events/Listeners** para efeitos colaterais.
- Utilize **migrations, factories e seeders** de forma consistente.
- Utilize **Eloquent scopes** para lógica de filtragem.
- Utilize **Pest / PHPUnit** para testes unitários e de integração.
- Utilize **observers** para lógica que deve ser executada em eventos do modelo (criação, atualização, exclusão).
- Prefira **helper functions do Laravel** (`abort_if`, `now`, `blank`, etc.) quando aumentarem a clareza.

---

## React (Frontend)
- Utilize **apenas componentes funcionais e Hooks**.
- Extraia lógica compartilhada para **custom hooks**.
- Prefira **React Query (ou SWR)** para estado de servidor; evite Redux, a menos que seja explicitamente necessário.
- Utilize **React Hook Form** com **Zod ou Yup** para validação de schemas.
- Utilize **componentes controlados** e uma arquitetura limpa orientada a componentes.
- Utilize **lazy loading, Suspense e error boundaries** quando apropriado.
- Utilize **Axios ou fetch** com interceptors para comunicação com a API.
- Siga uma estrutura de pastas limpa:
    - `components/` para componentes reutilizáveis
    - `pages/` para componentes de página
    - `hooks/` para custom hooks
    - `services/` para chamadas de API
    - `utils/` para funções utilitárias
- Utilize **Tailwind CSS** para estilização.


## Contexto do Projeto
- O backend é uma **API Laravel** (frequentemente com Sanctum ou JWT) consumida por um **React SPA** (Vite).
- As respostas da API seguem uma **estrutura consistente via Laravel API Resources**.
- A **validação** é sempre feita por meio de FormRequests.
- A **autorização** é tratada por meio de Policies.
- A **lógica de negócio** reside em Service classes.
- A **lógica de filtros** utiliza Eloquent scopes.
- Banco de dados: **MySQL ou PostgreSQL**, com migrations, factories e seeders.
- Testes:
- Backend: **Pest / PHPUnit**
- Frontend: **Vitest / Jest**
- Valorizo código **modular, testável e fácil de entender**.

---

## Como o Copilot deve responder
- Fornecer **sugestões concisas e de alta qualidade**, alinhadas às melhores práticas de Laravel e React.
- Preferir **clareza em vez de soluções excessivamente inteligentes**.
- Evitar padrões ultrapassados:
- Nada de componentes de classe no React
- Nada de validação inline em controllers do Laravel
- Nada de boilerplate de Redux, a menos que seja solicitado
- Ao gerar código backend, **incluir FormRequests, Resources e Services por padrão**.
- Ao gerar código frontend, **utilizar hooks, React Query e padrões modernos do React**.
- Sugerir **melhorias proativamente** quando o código puder ser mais limpo, idiomático ou manutenível.
- Utilizar **nomenclatura e estrutura de pastas consistentes**, alinhadas às convenções modernas.

---

## Preferências Adicionais
- Valorizo **raciocínio estruturado**, **arquitetura limpa** e **decisões baseadas em evidências**.
- Espero código que **antecipe edge cases** e siga padrões previsíveis.
- Atuo em domínios **clínicos, técnicos e analíticos** — precisão é fundamental.
- Em caso de dúvida, escolha a opção que **melhore a manutenibilidade e a clareza a longo prazo**.
