import React from "react";
import { cn } from "@/lib/utils";

/**
 * Avatar de colaborador — âncora única de todos os "retratos" do time.
 *
 * Este template não usa fotos: todo colaborador é representado por um
 * avatar com as iniciais do nome, numa cor estável derivada do seu id.
 * Isso garante o mesmo visual em qualquer tela (Hub, /time, Tom e Voz)
 * sem depender de nenhum arquivo de imagem.
 */

const AVATAR_PALETTE = [
  "bg-indigo-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-orange-500",
];

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  // Segunda palavra numérica ("Colaborador 12"): usa o número inteiro em vez
  // de só o primeiro dígito, senão "Colaborador 1"/"10"/"11"/"12" colidem.
  if (/^\d+$/.test(words[1])) return (words[0][0] + words[1]).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

interface TeamPhotoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Id do colaborador — mesma chave de `teamMembers`. */
  id: string;
  /** Nome usado para gerar as iniciais exibidas. */
  alt: string;
  /** Mantido por compatibilidade de API — não há mais estado "sem foto". */
  fallback?: React.ReactNode;
}

export function TeamPhoto({ id, alt, className, style, ...rest }: TeamPhotoProps) {
  const color = AVATAR_PALETTE[hashId(id) % AVATAR_PALETTE.length];
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex items-center justify-center font-anek font-bold text-white select-none",
        color,
        className,
      )}
      style={style}
      {...rest}
    >
      <span aria-hidden="true">{initials(alt)}</span>
    </div>
  );
}
