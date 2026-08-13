# CLAUDE.md — Intranet de Produto (template whitelabel)

Guia de navegação para IAs. Leia este arquivo antes de explorar o repositório.

## O que é este projeto

SPA React + TypeScript implantada no GitHub Pages (`/central/`). É um **template whitelabel** de intranet de produto, com as seções: Design System, Tom e Voz e Nossas Soluções. Todo o conteúdo (nomes de produtos, pessoas) é fictício e genérico — use como ponto de partida, substituindo os placeholders (`[Produto A]`, ...) pelos dados reais da sua organização. As descrições do template são escritas para nunca precisar citar o nome de uma empresa.

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
src/pages/          → Uma página por rota (DesignSystem, TomEVozPage, SolucoesPage, NotFound)
src/components/ui/  → Componentes base shadcn/ui — NÃO editar diretamente
src/components/widgets/ → Componentes customizados do template
src/components/GlobalNav.tsx → Navegação global responsiva
src/components/TeamPhoto.tsx → Avatar com iniciais (não há fotos neste template)
src/components/widgets/RoadmapTimeline.tsx → Trilha em onda, documentada no Design System (dados em src/data/roadmapMarcos.ts)
src/components/PageHero.tsx → Hero padrão de todas as páginas (ícone, título, descrição, ações)
src/contexts/       → ThemeContext, BrandContext, ViewContext
src/assets/simbolo.ts → Marca do template (SVG genérico, sem fotos) — uma variação por marca (A/B)
src/lib/utils.ts    → cn() e publicUrl()
public/             → Assets estáticos (SVGs da marca, 404.html)
```

## Rotas

```
/               → src/pages/DesignSystem.tsx (mesma página de /design-system — home do template)
/design-system  → src/pages/DesignSystem.tsx
/tom-e-voz      → src/pages/TomEVozPage.tsx
/solucoes       → src/pages/SolucoesPage.tsx (dados em src/data/solucoes.ts)
*               → src/pages/NotFound.tsx
```

## Padrões importantes

**Referenciar assets em `/public`** — sempre usar `publicUrl()`:
```tsx
import { publicUrl } from "@/lib/utils";
<img src={publicUrl("/simbolo-a-branco.svg")} />
```
Sem isso, o path quebra no GitHub Pages (base `/central/`).

**Alias `@/`** aponta para `src/`. Use em todos os imports internos.

**Componentes base** (`src/components/ui/`) são gerados pelo shadcn/ui CLI. Não editar manualmente — use a CLI para adicionar/atualizar: `npx shadcn@latest add <component>`.

**Tema dark/light** — `ThemeContext` aplica a classe `dark` no `<html>` e persiste em `localStorage` como `central-theme`. O `index.html` lê isso antes do React montar para evitar flash.

**Hero das páginas** — toda página de conteúdo abre com `<PageHero>` passado pela prop `hero` do `PageShell`.

**Marca** — `BrandContext` alterna entre duas variantes de marca (`marca-a` e `marca-b`, exibidas como "Marca A"/"Marca B"). A classe `marca-b` é aplicada no `<html>` quando a segunda variante está ativa. A Marca A é vermelha e a Marca B é azul — mesmo monograma (`src/assets/simbolo.ts`, um "S" com uma nota musical em negativo) nas duas, a distinção vem só da cor primária. A paleta de cada variante mora em `src/index.css` (`:root`/`.marca-b`).

**Avatares do time** — sempre renderizar com `<TeamPhoto id="…" alt="…" />` (`src/components/TeamPhoto.tsx`). Não há fotos: o componente gera um avatar colorido com as iniciais do nome, de forma determinística a partir do `id`. Usado hoje na seção "Voz da Liderança" do Manual de Tom e Voz.

**Componentes especiais documentados no Design System** — `RoadmapTimeline` (trilha em onda, dados em `src/data/roadmapMarcos.ts`), `NovidadeCard` (card do mural de novidades, dados em `src/data/novidades.ts`) e o catálogo de Produtos Físicos (`src/components/ProdutosFisicos.tsx`, dados em `src/data/produtosFisicos.ts`) não têm mais páginas próprias — ficam documentados como widgets dentro de `/design-system`.

**Nossas Soluções** — as seções (`src/data/solucoes.ts`) usam os slugs `produto-a` até `produto-e` (5 produtos, mais a seção `resumo` ao final), que também definem o acento de cor de cada seção em `src/index.css` (classes `.sol-produto-a` ... `.sol-produto-e`). Ao editar os dados, mantenha os slugs em sincronia com o CSS.

## Como adicionar uma nova página

1. Criar `src/pages/NovaPagina.tsx`
2. Importar e registrar rota em `src/App.tsx`
3. Adicionar link em `src/components/GlobalNav.tsx`

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
