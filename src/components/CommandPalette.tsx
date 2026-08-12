import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Palette, Volume2,
  Sun, Moon, Layers,
} from "lucide-react";
import { CatIcon } from "@phosphor-icons/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sections, categoryLabels } from "@/data/designSystemSections";
import { solucoesSections } from "@/data/solucoes";
import { tomEVozSections, tomEVozGroupLabels } from "@/data/tomEVozSections";
import { TRIGGER_CAT_EVENT } from "@/components/EasterEgg";
import { useTheme } from "@/contexts/ThemeContext";

/** Evento global disparado pelo botão de busca do header. */
export const OPEN_PALETTE_EVENT = "central:open-palette";

const paginas = [
  { label: "Design System", path: "/design-system", icon: Palette, keywords: "componentes tokens cores tipografia" },
  { label: "Manual de Tom e Voz", path: "/tom-e-voz", icon: Volume2, keywords: "comunicação escrita linguagem voz" },
  { label: "Nossas Soluções", path: "/solucoes", icon: Layers, keywords: "produtos soluções guia vendas" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  const goToSection = (path: string, id: string) => {
    navigate(path);
    // aguarda a página montar antes de rolar até a seção
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar páginas, componentes, pessoas…" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>Nada encontrado. Tente outro termo.</CommandEmpty>

        <CommandGroup heading="Páginas">
          {paginas.map((p) => {
            const Icon = p.icon;
            return (
              <CommandItem key={p.path} value={`${p.label} ${p.keywords}`} onSelect={() => run(() => navigate(p.path))}>
                <Icon className="mr-2 shrink-0" />
                {p.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Componentes do Design System">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <CommandItem
                key={s.id}
                value={`${s.label} ${s.keywords ?? ""} ${categoryLabels[s.category] ?? ""}`}
                onSelect={() => run(() => goToSection("/design-system", s.id))}
              >
                <Icon className="mr-2 shrink-0" />
                <span className="flex-1">{s.label}</span>
                <span className="text-xs text-muted-foreground">{categoryLabels[s.category]}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Nossas Soluções">
          {solucoesSections.map((s) => {
            const Icon = s.icon;
            return (
              <CommandItem
                key={s.id}
                value={`${s.label} soluções produto ${s.anchors.map((a) => a.label).join(" ")}`}
                onSelect={() => run(() => goToSection("/solucoes", s.id))}
              >
                <Icon className="mr-2 shrink-0" />
                <span className="flex-1">{s.label}</span>
                <span className="text-xs text-muted-foreground">Nossas Soluções</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Manual de Tom e Voz">
          {tomEVozSections.map((s) => {
            const Icon = s.icon;
            return (
              <CommandItem
                key={s.id}
                value={`${s.label} tom e voz ${tomEVozGroupLabels[s.group] ?? ""}`}
                onSelect={() => run(() => goToSection("/tom-e-voz", s.id))}
              >
                <Icon className="mr-2 shrink-0" />
                <span className="flex-1">{s.label}</span>
                <span className="text-xs text-muted-foreground">{tomEVozGroupLabels[s.group]}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem value="alternar tema claro escuro dark light" onSelect={() => run(toggle)}>
            {theme === "dark" ? <Sun className="mr-2 shrink-0" /> : <Moon className="mr-2 shrink-0" />}
            Alternar tema {theme === "dark" ? "claro" : "escuro"}
          </CommandItem>
          {/* Easter egg — o gatinho só aparece pra quem procura por ele. */}
          <CommandItem
            value="gato cat miau meow surpresa easter egg"
            onSelect={() => run(() => window.dispatchEvent(new CustomEvent(TRIGGER_CAT_EVENT)))}
          >
            <CatIcon size={32} className="mr-2 shrink-0" style={{ width: 32, height: 32 }} />
            Gatinho surpresa
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
