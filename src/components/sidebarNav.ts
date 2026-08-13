import { cn } from "@/lib/utils";

/**
 * Estilos compartilhados dos menus laterais das páginas de conteúdo
 * (Design System, Tom e Voz, Nossas Soluções). Fonte única para o visual
 * dos itens (estilo sutil de Nossas Soluções) e para a geometria do
 * container — mesma largura, posição sticky e paddings em todas as
 * páginas, evitando layout shift ao navegar entre seções.
 */

/** Container do menu lateral desktop, colado sob o header sticky. */
export const sidebarNavClass =
  "sticky top-20 max-h-[calc(100vh-6rem)] w-60 shrink-0 my-8 mr-4 p-3 overflow-y-auto hidden md:block glass-solid rounded-2xl";

/** Rótulo de grupo (categoria) dentro do menu. */
export const sidebarGroupLabelClass =
  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

/** Item de navegação — ativo recebe destaque sutil (vidro + anel), não preenchido a chapado. */
export function sidebarItemClass(active: boolean, extra?: string) {
  return cn(
    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-anek text-left leading-tight transition-colors",
    active
      ? "bg-primary/10 font-semibold text-foreground ring-1 ring-primary/25"
      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
    extra
  );
}
