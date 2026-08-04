# Central de Produto — Template Whitelabel

Intranet interna de produto: Design System, documentação do Time de Produto, Manual de Tom e Voz, Roadmap e catálogo de soluções.

---

## Sobre este projeto

Este repositório é um **template whitelabel**, construído a partir da intranet de produto de um time de banking real. Todos os dados oficiais — nome da empresa, identidade visual, fotos de colaboradores, nomes de produtos e conteúdo de negócio — foram **removidos e substituídos por placeholders fictícios** para preservar a segurança e a integridade das informações consolidadas da empresa de origem. Nada neste repositório identifica pessoas, produtos ou a organização que o originou.

Use-o como ponto de partida para a intranet de produto do seu próprio time: troque os placeholders (`[Empresa]`, `[Produto A]`, `[Evento Anual]` etc.), a paleta de cores e os dados de exemplo pelos da sua organização.

## O que é

A Central de Produto é uma intranet centralizada para os times de Produto, Design e Conteúdo. Ela reúne em um só lugar:

- **Design System** — biblioteca de componentes, guias de estilo, paletas de cores, tipografia e exemplos de código prontos para uso
- **Time de Produto** — organograma, perfis (fictícios) dos colaboradores e estrutura dos times
- **Tom e Voz** — manual de comunicação da marca por produto e área da empresa
- **Nossas Soluções** — guia dos produtos do ecossistema (placeholders)
- **Roadmap e Novidades** — planejamento e atualizações recentes
- **Produtos Físicos** — catálogo de brindes e materiais impressos (placeholders)

---

## Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Hub | Página inicial com acessos rápidos, produtos e novidades |
| `/design-system` | Design System | Showcase interativo de componentes com código React e HTML |
| `/time` | Time | Organograma e cards dos colaboradores (dados fictícios) |
| `/tom-e-voz` | Tom e Voz | Manual de comunicação por área e produto |
| `/solucoes` | Nossas Soluções | Guia dos produtos (placeholders) |
| `/roadmap` | Roadmap | Planejamento de produto |
| `/novidades` | Novidades | Atualizações recentes |
| `/produtos-fisicos` | Produtos Físicos | Catálogo de brindes e materiais impressos |

---

## Stack Técnica

| Categoria | Tecnologia |
|-----------|-----------|
| Framework UI | React 18 + TypeScript 5 |
| Build | Vite 5 (SWC) |
| Roteamento | React Router v6 |
| Estilização | Tailwind CSS 3 + CSS Variables |
| Componentes base | shadcn/ui + Radix UI |
| Ícones | Lucide React |
| Gráficos | Recharts |
| Formulários | React Hook Form + Zod |
| Estado servidor | TanStack React Query |
| Temas | dark/light + duas variantes de marca |
| Testes | Vitest + Testing Library |
| Deploy | GitHub Actions → GitHub Pages |

---

## Estrutura do Projeto

```
central/
├── src/
│   ├── pages/              # Páginas da aplicação (uma por rota)
│   │   ├── Hub.tsx         # Página inicial
│   │   ├── DesignSystem.tsx
│   │   ├── TimePage.tsx
│   │   ├── TomEVozPage.tsx
│   │   ├── SolucoesPage.tsx
│   │   ├── RoadmapPage.tsx
│   │   ├── NovidadesPage.tsx
│   │   └── ProdutosFisicosPage.tsx
│   ├── components/
│   │   ├── GlobalNav.tsx           # Navegação global responsiva
│   │   ├── ui/                     # Componentes base (shadcn/ui — não editar)
│   │   ├── widgets/                # Componentes customizados
│   │   └── design-system/          # Controles de demo (toggles de tema/marca)
│   ├── contexts/
│   │   ├── ThemeContext.tsx         # Dark/light mode
│   │   ├── BrandContext.tsx         # Alterna entre as duas variantes de marca
│   │   └── ViewContext.tsx
│   ├── hooks/
│   ├── assets/
│   │   └── olhos.ts                 # Marca do template (SVG, sem fotos)
│   ├── lib/
│   │   └── utils.ts                # cn() + publicUrl()
│   ├── App.tsx                     # Roteador + providers
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Variáveis CSS e estilos globais
├── public/                         # Assets estáticos (servidos diretamente)
│   ├── olho-amarelo.svg
│   ├── olho-branco.svg
│   ├── olho-preto.svg
│   └── 404.html                    # Fallback para SPA no GitHub Pages
├── index.html                      # Entry HTML do Vite
├── vite.config.ts                  # Base path /central/ para GitHub Pages
├── tailwind.config.ts
└── tsconfig.json
```

Este template **não usa fotos**: colaboradores são representados por avatares com iniciais (`src/components/TeamPhoto.tsx`) e a marca é um símbolo SVG genérico (`src/assets/olhos.ts`).

---

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 8080)
npm run dev

# Build de produção
npm run build

# Rodar testes
npm run test

# Lint
npm run lint
```

O app roda em `http://localhost:8080/central/`.

---

## Deploy

O deploy é automático via GitHub Actions ao fazer push na branch `main`:

1. Instala dependências
2. Roda `npm run build` com `VITE_BASE=/central/`
3. Publica o `dist/` no GitHub Pages

O workflow está em `.github/workflows/deploy.yml`.

---

## Convenções

**Adicionar uma nova página:**
1. Criar o componente em `src/pages/NomeDaPagina.tsx`
2. Importar e adicionar a rota em `src/App.tsx`
3. Adicionar o link de navegação em `src/components/GlobalNav.tsx`

**Referenciar assets em `/public`:**
```tsx
import { publicUrl } from "@/lib/utils";
<img src={publicUrl("/olho-branco.svg")} />
```
Necessário por causa do base path `/central/` no GitHub Pages.

**Adaptar para a sua empresa:**
1. Substitua os placeholders `[Empresa]`, `[Produto A]`, `[Evento Anual]` etc. pelos nomes reais da sua organização (busque por `[` nos arquivos de `src/data/`).
2. Troque a paleta de marca em `src/index.css` (`--primary`, `--brand`, `--accent`, `--chart-1`, ...).
3. Troque a marca em `src/assets/olhos.ts` e nos SVGs de `public/`.
4. Preencha `src/data/time.ts` com os colaboradores reais do seu time.

**Tema e Marca:**
- `ThemeContext` — dark/light (persiste em `localStorage` como `central-theme`)
- `BrandContext` — alterna entre as duas variantes de marca do template (aplica classe no `<html>`)

---

## Testes

```bash
npm run test        # roda uma vez
npm run test:watch  # modo watch
```

Os testes ficam em `src/components/widgets/__tests__/` e `src/test/`.
