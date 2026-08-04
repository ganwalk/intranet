import type React from "react";
import {
  BookOpen, GraduationCap,
  Anchor, Sparkles, Mic,
  Layers, Award,
} from "lucide-react";
import { areaIcons } from "@/data/areasEmpresa";

/**
 * Seções do Manual de Tom e Voz — fonte única.
 * Consumida pela sidebar de navegação de /tom-e-voz e pela command palette
 * (que só as exibe quando o manual já foi desbloqueado pela senha).
 */

export type TomEVozSection = {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
};

export const tomEVozGroupLabels: Record<string, string> = {
  introducao: "Introdução",
  areas: "Áreas da Empresa",
  produtos: "Produtos",
};

export const tomEVozSections: TomEVozSection[] = [
  { id: "fundamentos", label: "Fundamentos", icon: BookOpen, group: "introducao" },
  { id: "fundador", label: "Voz da Liderança", icon: Mic, group: "introducao" },

  // Áreas da empresa usam os ícones canônicos de src/data/areasEmpresa.ts
  { id: "marketing", label: "Marketing", icon: areaIcons.Marketing, group: "areas" },
  { id: "comercial", label: "Comercial", icon: areaIcons.Comercial, group: "areas" },
  { id: "atendimento", label: "Atendimento", icon: areaIcons.Atendimento, group: "areas" },
  { id: "consultoria", label: "Consultoria", icon: areaIcons.Consultoria, group: "areas" },
  { id: "capital", label: "Capital Humano", icon: Anchor, group: "areas" },
  { id: "produto-cx", label: "Produto e Cx", icon: Sparkles, group: "areas" },

  { id: "produto-a", label: "Produto A", icon: GraduationCap, group: "produtos" },
  { id: "produto-b", label: "Produto B", icon: Layers, group: "produtos" },
  { id: "produto-c", label: "Produto C", icon: Award, group: "produtos" },
];

export const tomEVozGroups = Object.entries(tomEVozGroupLabels).map(([key, label]) => ({
  label,
  items: tomEVozSections.filter((s) => s.group === key),
}));

/** Chave usada no sessionStorage pelo gate de senha do Tom e Voz. */
export const TOM_E_VOZ_AUTH_KEY = "tom-e-voz-auth";

/**
 * Evento disparado ao desbloquear o manual com a senha correta.
 * A command palette escuta este evento para passar a exibir as seções
 * do Tom e Voz na busca global assim que o usuário se autentica,
 * sem precisar navegar/recarregar a página primeiro.
 */
export const TOM_E_VOZ_UNLOCKED_EVENT = "central:tom-e-voz-unlocked";
