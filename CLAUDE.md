# CLAUDE.md — Central de Produto (template whitelabel)

Guia de navegação para IAs. Leia este arquivo antes de explorar o repositório.

## O que é este projeto

SPA React + TypeScript implantada no GitHub Pages (`/central/`). É um **template whitelabel** de intranet de produto, com as seções: Design System, Time, Tom e Voz, Nossas Soluções, Roadmap, Novidades e Produtos Físicos. Todo o conteúdo (nomes de empresa, produtos, pessoas) é fictício e genérico — use como ponto de partida, substituindo os placeholders (`[Empresa]`, `[Produto A]`, ...) pelos dados reais da sua organização.

## Entry points

| Arquivo | Papel |
|---------|-------|
| `src/App.tsx` | Roteador (React Router v6) + todos os providers |
| `src/main.tsx` | Mount do React |
| `src/index.css` | CSS global + variáveis de tema (HSL) |
| `index.html` | HTML base do Vite |
| `vite.config.ts` | Base path `/central/` para GitHub Pages |

## Onde está cada coisa

```
src/pages/          → Uma página por rota (Hub, DesignSystem, TimePage, etc.)
src/components/ui/  → Componentes base shadcn/ui — NÃO editar diretamente
src/components/widgets/ → Componentes customizados do template
src/components/GlobalNav.tsx → Navegação global responsiva
src/components/TeamPhoto.tsx → Avatar com iniciais (não há fotos neste template)
src/components/ProdutosFisicos.tsx → Card e filtro de categorias dos produtos físicos
src/components/widgets/RoadmapTimeline.tsx → Trilha em onda do Hub (dados em src/data/roadmapMarcos.ts)
src/components/PageHero.tsx → Hero padrão de todas as páginas (ícone, título, descrição, ações)
src/components/VoltarParaCentral.tsx → Atalho de volta ao Hub das sub-páginas
src/contexts/       → ThemeContext, BrandContext, ViewContext
src/assets/olhos.ts → Marca do template (SVG genérico, sem fotos)
src/lib/utils.ts    → cn() e publicUrl()
public/             → Assets estáticos (SVGs da marca, 404.html)
```

## Rotas

```
/               → src/pages/Hub.tsx
/design-system  → src/pages/DesignSystem.tsx
/time           → src/pages/TimePage.tsx (dados fictícios em src/data/time.ts)
/tom-e-voz      → src/pages/TomEVozPage.tsx
/solucoes       → src/pages/SolucoesPage.tsx (dados em src/data/solucoes.ts)
/roadmap        → src/pages/RoadmapPage.tsx
/novidades      → src/pages/NovidadesPage.tsx
/produtos-fisicos → src/pages/ProdutosFisicosPage.tsx (catálogo em src/data/produtosFisicos.ts)
*               → src/pages/NotFound.tsx
```

## Padrões importantes

**Referenciar assets em `/public`** — sempre usar `publicUrl()`:
```tsx
import { publicUrl } from "@/lib/utils";
<img src={publicUrl("/olho-branco.svg")} />
```
Sem isso, o path quebra no GitHub Pages (base `/central/`).

**Alias `@/`** aponta para `src/`. Use em todos os imports internos.

**Componentes base** (`src/components/ui/`) são gerados pelo shadcn/ui CLI. Não editar manualmente — use a CLI para adicionar/atualizar: `npx shadcn@latest add <component>`.

**Tema dark/light** — `ThemeContext` aplica a classe `dark` no `<html>` e persiste em `localStorage` como `central-theme`. O `index.html` lê isso antes do React montar para evitar flash.

**Hero das páginas** — toda página de conteúdo abre com `<PageHero>` passado pela prop `hero` do `PageShell`. Sub-páginas do Hub (que não aparecem na navegação global) passam `actions={<VoltarParaCentral />}`.

**Marca** — `BrandContext` alterna entre duas variantes de marca (`marca-a` e `marca-b`, exibidas como "Marca A"/"Marca B"). A classe `marca-b` é aplicada no `<html>` quando a segunda variante está ativa. Componentes na pasta `widgets/` podem ter variantes por marca. A paleta de cada variante mora em `src/index.css` (`:root`/`.marca-b`).

**Avatares do time** — sempre renderizar com `<TeamPhoto id="…" alt="…" />` (`src/components/TeamPhoto.tsx`). Não há fotos: o componente gera um avatar colorido com as iniciais do nome, de forma determinística a partir do `id`.

**Trilha do roadmap (Hub)** — os marcos vêm de `src/data/roadmapMarcos.ts`. A ordem na onda vem do campo `data`, e cada marco cai numa crista (cartão acima) ou num vale (cartão abaixo) conforme o índice — não há posição manual. A agenda de eventos (`src/data/eventos.ts`) alimenta a exportação `.ics` da Command Palette.

**Mural de Novidades** — `src/data/novidades.ts` é o registro mês a mês, do mais recente para o mais antigo, e alimenta duas telas: `/novidades` mostra o histórico inteiro, e o carrossel do Hub mostra só os itens marcados com `destaque`. Não há imagens: cada card usa o painel da marca.

**Produtos físicos** — o catálogo vem de `src/data/produtosFisicos.ts`. Os itens marcados como destaque aparecem no Hub (`produtosFisicosDestaque`); o resto aparece em `/produtos-fisicos`. Card e filtro de categorias são compartilhados via `src/components/ProdutosFisicos.tsx`. Este template não inclui fotos de produto.

**Nossas Soluções** — as seções (`src/data/solucoes.ts`) usam os slugs `produto-a` até `produto-g`, que também definem o acento de cor de cada seção em `src/index.css` (classes `.sol-produto-a` ... `.sol-produto-g`). Ao editar os dados, mantenha os slugs em sincronia com o CSS.

## Como adicionar uma nova página

1. Criar `src/pages/NovaPagina.tsx`
2. Importar e registrar rota em `src/App.tsx`
3. Adicionar link em `src/components/GlobalNav.tsx` (sistemas principais) ou só em
   `src/components/CommandPalette.tsx` (sub-páginas do Hub, como `/novidades` e
   `/produtos-fisicos`)

## Como adicionar um widget ao Design System

1. Criar componente em `src/components/widgets/NomeWidget.tsx`
2. Importar e adicionar em `src/pages/DesignSystem.tsx` dentro de um `<ComponentShowcase>`

## Pull Requests

Todo PR deve ser escrito **em português**: título, descrição e comentários. Isso inclui PRs gerados por IA.

## Build e deploy

```bash
npm run dev          # dev server em localhost:8080
npm run build        # build de produção
npm run test         # testes (Vitest)
npm run lint         # ESLint
```

Deploy automático: push em `main` → GitHub Actions → GitHub Pages.
