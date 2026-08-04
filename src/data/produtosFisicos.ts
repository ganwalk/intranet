import type { LucideIcon } from "lucide-react";
import { Boxes, CupSoda, Gem, Home, NotebookPen, Shirt } from "lucide-react";
import type { TagTone } from "@/components/widgets/Tag";

/**
 * Catálogo dos produtos físicos — brindes, kits e materiais de marca que o
 * time de Produto planeja, desenha e produz.
 *
 * Sem fotos de estúdio cadastradas, cada item cai no placeholder padrão do
 * card (ícone + categoria). Para incluir uma foto, adicione o campo `img`
 * com a URL do asset.
 */

export type CategoriaProdutoFisico =
  | "Canecas e garrafas"
  | "Vestuário"
  | "Papelaria"
  | "Acessórios"
  | "Casa & mesa"
  | "Sacolas & caixas";

export interface ProdutoFisico {
  /** Identificador único do item — também serve de key nas listas. */
  slug: string;
  nome: string;
  categoria: CategoriaProdutoFisico;
  desc: string;
  /** URL da foto otimizada, quando houver. Sem foto, o card usa um placeholder. */
  img?: string;
}

/** Identidade visual de cada categoria — tom do Design System + ícone. */
export const categoriaVisual: Record<
  CategoriaProdutoFisico,
  { tone: TagTone; icon: LucideIcon }
> = {
  "Canecas e garrafas": { tone: "green", icon: CupSoda },
  "Vestuário": { tone: "magenta", icon: Shirt },
  "Papelaria": { tone: "blue", icon: NotebookPen },
  "Acessórios": { tone: "violet", icon: Gem },
  "Casa & mesa": { tone: "olive", icon: Home },
  "Sacolas & caixas": { tone: "graphite", icon: Boxes },
};

/**
 * Ordem curada: os quatro primeiros são os mesmos, e na mesma ordem, do
 * destaque do Hub (`PRODUTOS_FISICOS_DESTAQUE`), para que "Todos os
 * produtos" comece do jeito que a Central já mostrou na home. O resto do
 * catálogo segue livre.
 */
export const produtosFisicos: ProdutoFisico[] = [
  {
    slug: "caneca",
    nome: "Caneca de cerâmica",
    categoria: "Canecas e garrafas",
    desc: "Caneca de cerâmica com o símbolo da marca.",
  },
  {
    slug: "garrafa-termica",
    nome: "Garrafa térmica",
    categoria: "Canecas e garrafas",
    desc: "Garrafa térmica de aço inox, tamanho padrão.",
  },
  {
    slug: "bone",
    nome: "Boné",
    categoria: "Vestuário",
    desc: "Boné em algodão com bordado da marca.",
  },
  {
    slug: "camiseta",
    nome: "Camiseta",
    categoria: "Vestuário",
    desc: "Camiseta básica em algodão, estampa serigrafada.",
  },
  {
    slug: "ecobag",
    nome: "Ecobag",
    categoria: "Sacolas & caixas",
    desc: "Sacola de algodão reutilizável com estampa em silk.",
  },
  {
    slug: "agenda",
    nome: "Agenda",
    categoria: "Papelaria",
    desc: "Agenda anual com capa personalizada.",
  },
  {
    slug: "porta-cartao",
    nome: "Porta-cartão",
    categoria: "Acessórios",
    desc: "Porta-cartão dobrável em couro sintético.",
  },
  {
    slug: "vela-aromatica",
    nome: "Vela aromática",
    categoria: "Casa & mesa",
    desc: "Vela aromática em pote de vidro.",
  },
];

/**
 * Vitrine do Hub — os quatro produtos escolhidos a dedo para a home.
 * A seleção é por slug, e não pelos primeiros do catálogo, para reordenar
 * o catálogo sem mexer sem querer no que aparece na página inicial.
 */
export const PRODUTOS_FISICOS_DESTAQUE = [
  "caneca",
  "garrafa-termica",
  "bone",
  "camiseta",
] as const;

/** Os produtos da vitrine, na ordem acima. */
export const produtosFisicosDestaque = PRODUTOS_FISICOS_DESTAQUE
  .map((slug) => produtosFisicos.find((p) => p.slug === slug))
  .filter((p): p is ProdutoFisico => Boolean(p));

/** Categorias na ordem em que aparecem no catálogo — usada nos filtros. */
export const categoriasProdutosFisicos = Array.from(
  new Set(produtosFisicos.map((p) => p.categoria))
) as CategoriaProdutoFisico[];

/** Quantos produtos cada categoria tem — mostrado nos filtros. */
export const contagemPorCategoria = produtosFisicos.reduce(
  (acc, p) => {
    acc[p.categoria] = (acc[p.categoria] ?? 0) + 1;
    return acc;
  },
  {} as Record<CategoriaProdutoFisico, number>
);
