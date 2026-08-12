# Intranet de Produto — Template Whitelabel

Intranet interna de produto: Design System, Manual de Tom e Voz e catálogo de soluções.

---

## Sobre este projeto

Este repositório é um **template whitelabel**, construído a partir da intranet de produto de um time de banking real. Todos os dados oficiais — nome da empresa, identidade visual, fotos de colaboradores, nomes de produtos e conteúdo de negócio — foram **removidos e substituídos por placeholders fictícios** para preservar a segurança e a integridade das informações consolidadas da empresa de origem. Nada neste repositório identifica pessoas, produtos ou a organização que o originou.

Use-o como ponto de partida para a intranet de produto do seu próprio time: troque os placeholders (`[Produto A]`, `[Evento Anual]` etc.), a paleta de cores e os dados de exemplo pelos da sua organização. As descrições do template evitam citar qualquer nome de empresa — não há um placeholder de "nome da empresa" para preencher.

## O que é

A intranet reúne em um só lugar:

- **Design System** — biblioteca de componentes, guias de estilo, paletas de cores, tipografia e exemplos de código prontos para uso
- **Tom e Voz** — manual de comunicação da marca por produto e área da empresa
- **Nossas Soluções** — guia dos produtos do ecossistema (placeholders)

---

## Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Design System | Home do template — showcase interativo de componentes com código React e HTML |
| `/design-system` | Design System | Mesma página acima |
| `/tom-e-voz` | Tom e Voz | Manual de comunicação por área e produto |
| `/solucoes` | Nossas Soluções | Guia dos produtos (placeholders) |

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
│   │   ├── DesignSystem.tsx
│   │   ├── TomEVozPage.tsx
│   │   ├── SolucoesPage.tsx
│   │   └── NotFound.tsx
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
│   │   └── simbolo.ts              # Marca do template (SVG, sem fotos)
│   ├── lib/
│   │   └── utils.ts                # cn() + publicUrl()
│   ├── App.tsx                     # Roteador + providers
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Variáveis CSS e estilos globais
├── public/                         # Assets estáticos (servidos diretamente)
│   ├── simbolo-a-preto.svg
│   ├── simbolo-a-branco.svg
│   ├── simbolo-a-acento.svg
│   ├── simbolo-b-preto.svg
│   ├── simbolo-b-branco.svg
│   ├── simbolo-b-acento.svg
│   └── 404.html                    # Fallback para SPA no GitHub Pages
├── index.html                      # Entry HTML do Vite
├── vite.config.ts                  # Base path /central/ para GitHub Pages
├── tailwind.config.ts
└── tsconfig.json
```

Este template **não usa fotos**: colaboradores mencionados no Manual de Tom e Voz são representados por avatares com iniciais (`src/components/TeamPhoto.tsx`) e a marca é um símbolo SVG genérico, com uma variação para cada produto do ecossistema (`src/assets/simbolo.ts`).

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
<img src={publicUrl("/simbolo-a-branco.svg")} />
```
Necessário por causa do base path `/central/` no GitHub Pages.

**Adaptar para a sua empresa:**
1. Substitua os placeholders `[Produto A]`, `[Evento Anual]` etc. pelos nomes reais da sua organização (busque por `[` nos arquivos de `src/data/`). Escreva as descrições de forma que não precisem citar o nome da empresa.
2. Troque a paleta de marca em `src/index.css` (`--primary`, `--brand`, `--accent`, `--chart-1`, ...). Por padrão, a Marca A é vermelha e a Marca B é azul.
3. Troque o símbolo em `src/assets/simbolo.ts` e nos SVGs de `public/`.

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
