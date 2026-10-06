# CareerForge — Fase 4

CareerForge é uma base para uma plataforma multiusuário que compara perfis profissionais com vagas e, nas próximas fases, gera currículos especializados.

## Fase 4

A aplicação agora possui uma camada de providers de vagas. A primeira integração real é com a Adzuna.

Fluxo:

`Provider -> Adapter -> Job Domain -> Validation -> Match Engine -> Ranking`

A aplicação não depende diretamente do payload da Adzuna. `AdzunaProvider` cuida da comunicação HTTP e `adzunaJobAdapter` converte cada anúncio para o contrato interno de `Job`.

## Executar em modo demo

```bash
npm install
npm run dev
```

Sem credenciais, o CareerForge usa automaticamente o `DemoProvider`.

## Executar com Adzuna

1. Crie credenciais no portal de desenvolvedores da Adzuna.
2. Copie `.env.example` para `.env`.
3. Preencha `ADZUNA_APP_ID` e `ADZUNA_APP_KEY`.
4. Ajuste país, busca e localização.
5. Execute `npm run dev`.

Nunca envie o arquivo `.env` para o Git. Ele já está no `.gitignore`.

## Limitação conhecida

O endpoint de busca da Adzuna fornece apenas um trecho da descrição e não fornece competências, idiomas e formação como listas estruturadas. A Fase 5 será responsável por enriquecer/interpretar descrições para o matching, sem acoplar essa inteligência ao provider.
