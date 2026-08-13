import React from "react";
import { cn } from "@/lib/utils";

/**
 * Hero padrão das páginas de conteúdo (Design System, Tom e Voz, Nossas
 * Soluções): faixa de largura total da página com caixinha de ícone,
 * título e descrição — mesmo estilo, tamanhos e posicionamento em todas
 * as páginas para que a Central pareça um único programa. O conteúdo
 * interno permanece alinhado ao container de 7xl das páginas. `actions`
 * aceita botões extras alinhados à direita.
 */
interface PageHeroProps {
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  id?: string;
}

export function PageHero({ icon: Icon, title, description, actions, className, id }: PageHeroProps) {
  return (
    <div id={id} className={cn("relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-8 pb-2">
        <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-8 md:px-10 md:py-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary animate-in zoom-in-75 duration-500 delay-100 fill-mode-backwards">
                  <Icon className="h-6 w-6" />
                </span>
                <h1 className="text-3xl md:text-4xl font-bold font-anek text-foreground">{title}</h1>
              </div>
              <p className="text-muted-foreground font-roboto max-w-2xl">{description}</p>
            </div>
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}
