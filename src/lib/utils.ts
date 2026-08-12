import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constrói o caminho para arquivos em /public respeitando o base URL do Vite.
 *
 * Necessário para GitHub Pages, onde o app é servido sob um sub-caminho
 * (ex: /central-de-produto/) em vez da raiz "/". Referenciar arquivos com
 * paths absolutos puros como "/simbolo-a-branco.svg" resolve para a raiz do
 * domínio (github.io/simbolo-a-branco.svg) em vez de
 * github.io/central-de-produto/simbolo-a-branco.svg.
 *
 * Uso:
 *   <img src={publicUrl('/simbolo-a-branco.svg')} />
 *   // em dev  → /simbolo-a-branco.svg
 *   // em prod → /central-de-produto/simbolo-a-branco.svg
 */
export function publicUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
