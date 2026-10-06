# CareerForge

O CareerForge é um projeto que estou desenvolvendo para facilitar a busca por vagas e tornar o processo de candidatura mais direcionado.

A ideia surgiu de um problema que encontrei durante minha própria busca por oportunidades: analisar várias vagas, entender quais realmente combinam com o meu perfil e adaptar o currículo para cada uma delas acaba sendo um processo bastante repetitivo.

O projeto começou como uma ferramenta pessoal, mas estou estruturando a aplicação para que possa ser utilizada por profissionais de diferentes áreas.

## O que o projeto faz atualmente

Nesta primeira etapa, o CareerForge consegue:

- manter um perfil profissional com competências, experiência, formação, idiomas e preferências;
- buscar vagas através de uma API externa;
- transformar os dados recebidos para um formato interno padronizado;
- comparar cada vaga com o perfil profissional;
- calcular um percentual de compatibilidade;
- destacar pontos fortes e possíveis gaps;
- ordenar as vagas pela compatibilidade com o candidato.

Um resultado atual da aplicação se parece com:

```text
Desenvolvedor Back-end Júnior — Empresa Exemplo

Match: 93.5%
Recomendação: CANDIDATAR

Pontos fortes:
✓ JavaScript
✓ Node.js
✓ APIs REST
✓ Senioridade compatível
✓ Experiência compatível
✓ Localização compatível
```

## Como funciona

As vagas externas não são utilizadas diretamente pelo sistema.

Cada provider possui um adapter responsável por transformar os dados recebidos em um modelo de vaga conhecido pelo CareerForge.

```text
API de vagas
     │
     ▼
Job Provider
     │
     ▼
Adapter
     │
     ▼
Job Domain
     │
     ▼
Match Engine
     │
     ▼
Ranking
```

Essa separação permite adicionar outras fontes de vagas futuramente sem precisar alterar toda a lógica de matching.

## Matching

O Match Engine analisa diferentes aspectos do perfil e da vaga.

Atualmente são considerados:

| Critério | Peso |
| --- | ---: |
| Competências | 35% |
| Cargo / área | 25% |
| Experiência | 10% |
| Senioridade | 10% |
| Localização / modalidade | 10% |
| Idiomas | 5% |
| Formação | 5% |

Os pesos ainda estão sendo ajustados conforme o projeto evolui.

A intenção não é apenas dizer se uma vaga é compatível ou não, mas conseguir explicar **por que** ela recebeu determinada pontuação.

## Estrutura

O projeto está sendo organizado separando regras de negócio das integrações externas.

```text
src/
├── config/
├── data/
├── domain/
│   ├── candidate/
│   └── job/
├── integrations/
│   └── jobs/
├── job/
├── services/
├── utils/
└── index.js
```

O `domain` concentra os modelos e regras principais da aplicação, enquanto `integrations` fica responsável pela comunicação com serviços externos.

## Tecnologias

Até o momento o projeto utiliza:

- JavaScript
- Node.js
- ES Modules
- REST APIs
- Fetch API

Para a busca inicial de vagas estou utilizando a API da Adzuna.

## Executando o projeto

É necessário ter uma versão recente do Node.js instalada.

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/careerforge.git
cd careerforge
```

Crie seu arquivo de configuração:

```bash
cp .env.example .env
```

Preencha no `.env` suas credenciais da API:

```env
ADZUNA_APP_ID=your_app_id
ADZUNA_APP_KEY=your_app_key

ADZUNA_COUNTRY=br
JOBS_QUERY=desenvolvedor javascript
JOBS_LOCATION=
JOBS_RESULTS_PER_PAGE=10
```

Depois execute:

```bash
npm start
```

Durante o desenvolvimento:

```bash
npm run dev
```

Sem as credenciais da API, o projeto pode utilizar o provider de demonstração.

> O arquivo `.env` não deve ser enviado para o repositório.

## Próximos passos

O projeto ainda está em desenvolvimento. Algumas das próximas etapas são:

- [x] Estrutura inicial do Match Engine
- [x] Modelo genérico de candidato
- [x] Modelo e normalização de vagas
- [x] Integração com uma API real de vagas
- [ ] Melhorar a interpretação dos requisitos das vagas
- [ ] Melhorar o algoritmo de matching e ranking
- [ ] Gerar currículos específicos para cada vaga
- [ ] Exportar currículos em PDF/DOCX
- [ ] Adicionar uma API própria para o CareerForge
- [ ] Persistência em banco de dados
- [ ] Autenticação e múltiplos usuários
- [ ] Interface web

Uma regra importante para as próximas etapas é que a personalização dos currículos deve utilizar apenas informações existentes no perfil do candidato. O sistema não deve adicionar experiências ou conhecimentos que a pessoa não possui.

## Status

O CareerForge está sendo desenvolvido de forma incremental. Neste momento o foco está no backend e na qualidade do matching antes de partir para a interface.

A ideia é continuar evoluindo o projeto enquanto valido o funcionamento com vagas reais.
