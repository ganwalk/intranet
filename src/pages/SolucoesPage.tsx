import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ChevronDown, Clock, FileDown, Layers, Tag as TagIcon,
  HelpCircle, Wrench, Table2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { sidebarNavClass } from "@/components/sidebarNav";
import { Tag } from "@/components/widgets/Tag";
import {
  solucoesSections,
  produtosSolucoes,
  resumoProdutos,
  type FeatureItem, type QuickInfo,
} from "@/data/solucoes";

/* ============================================================
   Blocos de apoio
   ============================================================ */

const quickInfoIcons = { investimento: TagIcon, acesso: Clock } as const;

/* Cor de acento do produto — herdada da seção via var --sol-accent
   (classes .sol-produto-a..g no index.css), com fallback no verde primário. */
const accentText = "text-[hsl(var(--sol-accent,var(--primary)))]";
const accentChip = "bg-[hsl(var(--sol-accent,var(--primary))/0.12)] text-[hsl(var(--sol-accent,var(--primary)))]";

function QuickInfoBar({ items, className }: { items: QuickInfo[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, i) => {
        const Icon = quickInfoIcons[item.tipo];
        return (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm font-roboto text-foreground"
          >
            <Icon className={cn("h-4 w-4 shrink-0", accentText)} />
            {item.texto}
          </span>
        );
      })}
    </div>
  );
}

function ParaQuemE({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[hsl(var(--sol-accent,var(--primary))/0.08)] backdrop-blur-xl p-5 shadow-sm">
      <p className="text-sm md:text-base text-muted-foreground font-roboto leading-relaxed">
        <strong className={cn("font-semibold", accentText)}>Para quem é:</strong> {children}
      </p>
    </div>
  );
}

function BlocoTitle({ icon: Icon, children, as: As = "h3" }: { icon: React.ElementType; children: React.ReactNode; as?: "h2" | "h3" | "h4" }) {
  return (
    <As className="flex items-center gap-3 text-xl md:text-2xl font-bold font-anek text-foreground mb-4">
      <Icon className={cn("h-6 w-6 shrink-0", accentText)} />
      {children}
    </As>
  );
}

function FeatureList({ items, cols = 1 }: { items: FeatureItem[]; cols?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", cols === 2 && "md:grid-cols-2")}>
      {items.map((f, i) => {
        const Icon = f.icon;
        return (
          <li key={i} className="flex items-start gap-4 rounded-xl glass-panel p-5">
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", accentText)} />
            <p className="text-sm text-muted-foreground font-roboto leading-relaxed">
              {f.destaque && <strong className="text-foreground font-semibold">{f.destaque} </strong>}
              {f.texto}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/** Painel de mídia genérico — sem screenshots ou fotos: gradiente + ícone da
    seção, na cor de acento do produto. */
function ProdutoPlaceholder({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="relative h-56 md:h-[340px] overflow-hidden rounded-2xl glass-panel bg-gradient-to-br from-[hsl(var(--sol-accent,var(--primary))/0.16)] to-[hsl(var(--sol-accent,var(--primary))/0.03)] flex items-center justify-center">
      <Icon className={cn("h-20 w-20", accentText, "opacity-40")} strokeWidth={1.5} />
    </div>
  );
}

interface ProdutoHeroProps {
  badge: string;
  titulo: string;
  icon: React.ElementType;
  info: QuickInfo[];
  paraQuemE: React.ReactNode;
}

function ProdutoHero({ badge, titulo, icon, info, paraQuemE }: ProdutoHeroProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <ProdutoPlaceholder icon={icon} />
      <div className="flex flex-col justify-center gap-4">
        <div>
          <Tag tone="primary" className={cn("mb-3", accentChip)}>{badge}</Tag>
          <h2 className="text-2xl md:text-3xl font-bold font-anek text-foreground">{titulo}</h2>
        </div>
        <QuickInfoBar items={info} />
        <ParaQuemE>{paraQuemE}</ParaQuemE>
      </div>
    </div>
  );
}

/**
 * Botão flutuante de exportação — segue a anatomia documentada em
 * "Widgets Flutuantes" do Design System: botão circular sólido de 64px
 * com ícone, hover scale e balão opcional no hover. Fica no canto
 * inferior esquerdo da tela.
 */
function ExportFloater({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="fixed bottom-5 left-5 z-40 flex flex-col items-start print:hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "bg-white text-gray-900 dark:bg-[#2a2a2a] dark:text-white",
          "p-3 px-4 rounded-xl rounded-bl-none shadow-lg mb-2.5 ml-2.5",
          "max-w-[200px] font-anek text-[14px] leading-snug relative",
          "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-left",
          hovered
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible translate-y-2.5 scale-90"
        )}
      >
        <strong>Exportar</strong> o guia completo em PDF
        <div className="absolute -bottom-1.5 left-2.5 w-0 h-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-white dark:border-t-[#2a2a2a]" />
      </div>
      <button
        type="button"
        onClick={onClick}
        aria-label="Exportar guia completo em PDF"
        className={cn(
          "relative w-16 h-16 rounded-full shadow-lg cursor-pointer flex items-center justify-center",
          "bg-primary text-primary-foreground",
          "hover:scale-110 active:scale-95 transition-transform duration-200"
        )}
      >
        <FileDown className="h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
      </button>
    </div>
  );
}

function ExportButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="flex justify-end pt-6 print:hidden">
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sol-accent,var(--primary))/0.12)] px-4 py-2 text-sm font-anek font-bold uppercase tracking-wide hover:bg-[hsl(var(--sol-accent,var(--primary))/0.2)] transition-colors",
          accentText
        )}
      >
        <FileDown className="h-4 w-4" />
        {children}
      </button>
    </div>
  );
}

/* ============================================================
   Navegação: sidebar (desktop) + chips (mobile)
   ============================================================ */

interface NavState {
  activeSection: string;
  activeAnchor: string | null;
  goTo: (id: string) => void;
}

function SolucoesSidebar({ activeSection, activeAnchor, goTo }: NavState) {
  /** Expansão manual por produto — sem entrada, segue o scrollspy. */
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});

  return (
    <nav
      aria-label="Produtos"
      className={cn(sidebarNavClass, "print:hidden space-y-1 timeline-scrollbar")}
    >
        {solucoesSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isOpen = manualOpen[section.id] ?? isActive;
          return (
            <div key={section.id} className={`sol-${section.id}`}>
              <div
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isActive ? "bg-[hsl(var(--sol-accent,var(--primary))/0.1)]" : "hover:bg-muted/60"
                )}
              >
                <button
                  onClick={() => goTo(section.id)}
                  className={cn(
                    "flex items-center gap-2.5 flex-1 min-w-0 px-3 py-2 text-sm font-anek text-left transition-colors",
                    isActive ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", accentText)} />
                  {section.label}
                </button>
                {section.anchors.length > 0 && (
                  <button
                    onClick={() => setManualOpen((o) => ({ ...o, [section.id]: !isOpen }))}
                    aria-label={`${isOpen ? "Recolher" : "Expandir"} subseções de ${section.label}`}
                    aria-expanded={isOpen}
                    className="px-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
                  </button>
                )}
              </div>
              {isOpen && section.anchors.length > 0 && (
                <ul className="mt-1 mb-2 ml-[1.15rem] pl-3 space-y-0.5">
                  {section.anchors.map((anchor) => (
                    <li key={anchor.id}>
                      <button
                        onClick={() => goTo(anchor.id)}
                        className={cn(
                          "block w-full rounded-md px-2 py-1.5 text-left text-[13px] font-roboto transition-colors",
                          activeAnchor === anchor.id
                            ? "bg-[hsl(var(--sol-accent,var(--primary))/0.1)] font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {anchor.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
    </nav>
  );
}

function SolucoesMobileNav({ activeSection, goTo }: Omit<NavState, "activeAnchor">) {
  return (
    <div className="md:hidden print:hidden sticky top-14 md:top-16 z-40 glass-nav">
      <nav
        aria-label="Produtos"
        className="flex gap-1 overflow-x-auto px-4 md:px-8 py-2 timeline-scrollbar"
      >
        {solucoesSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => goTo(section.id)}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-anek transition-colors",
                `sol-${section.id}`,
                isActive
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", !isActive && accentText)} />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================================================
   Página
   ============================================================ */

export default function SolucoesPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(solucoesSections[0].id);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  /** "all" = guia completo; id de seção = exporta só aquela; null = tela normal. */
  const [printing, setPrinting] = useState<string | null>(null);

  // Rola até a âncora do hash (#produto-a etc.) ao abrir a página com link direto.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [location.hash]);

  // Trava o scrollspy durante a navegação programática (clique no menu),
  // evitando que o highlight pisque em seções intermediárias — mesma
  // funcionalidade do Design System e do Tom e Voz.
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    };
  }, []);

  // Scrollspy: produto ativo + subseção ativa dentro dele.
  useEffect(() => {
    const onScroll = () => {
      if (isNavigatingRef.current) return;
      let current = solucoesSections[0].id;
      for (const section of solucoesSections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 160) current = section.id;
      }
      setActiveSection(current);

      const section = solucoesSections.find((s) => s.id === current);
      let anchor: string | null = null;
      for (const a of section?.anchors ?? []) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= 170) anchor = a.id;
      }
      setActiveAnchor(anchor);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Exportar PDF: espera montar e chama a impressão nativa. O afterprint
  // restaura a tela.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(null);
    window.addEventListener("afterprint", done);
    const timer = setTimeout(() => window.print(), 450);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  const exportPdf = (target: string = "all") => setPrinting(target);

  /** Esconde a seção na impressão quando outra seção foi escolhida. */
  const printHide = (id: string) =>
    printing && printing !== "all" && printing !== id ? "print:hidden" : undefined;

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Marca imediatamente o destino como ativo e trava o scrollspy até a
    // animação terminar (delay proporcional à distância percorrida).
    isNavigatingRef.current = true;
    const section = solucoesSections.find((s) => s.id === id);
    if (section) {
      setActiveSection(id);
      setActiveAnchor(null);
    } else {
      const parent = solucoesSections.find((s) => s.anchors.some((a) => a.id === id));
      if (parent) {
        setActiveSection(parent.id);
        setActiveAnchor(id);
      }
    }

    const targetTop = el.getBoundingClientRect().top + window.scrollY;
    const releaseDelay = Math.min(1600, Math.max(750, Math.abs(window.scrollY - targetTop) * 0.9));
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    navTimerRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, releaseDelay);
  };

  return (
    <PageShell
      width="7xl"
      footer="Nossas Soluções — Guia de Produtos"
      mainClassName="pb-16"
      hero={
        <>
          <SolucoesMobileNav activeSection={activeSection} goTo={goTo} />
          <PageHero
            icon={Layers}
            title="Soluções digitais da marca"
            description="Um compilado dos produtos digitais em um só lugar: para quem é, o que entrega, recursos e condições — o material de consulta oficial do time."
            className={cn(printing && printing !== "all" && "print:hidden")}
          />
        </>
      }
    >
      {/* Exportação do guia completo — flutuante no canto inferior esquerdo */}
      <ExportFloater onClick={() => exportPdf()} />

      {/* Conteúdo: sidebar de navegação + seções dos produtos */}
      <div className="flex gap-0 relative">
        <SolucoesSidebar activeSection={activeSection} activeAnchor={activeAnchor} goTo={goTo} />

        <div className="flex-1 py-8 pl-0 md:pl-8 min-w-0 space-y-24">

        {produtosSolucoes.map((produto, index) => {
          const section = solucoesSections.find((s) => s.id === produto.id);
          const Icon = section?.icon ?? Layers;
          return (
            <section
              key={produto.id}
              id={produto.id}
              className={cn(
                `sol-${produto.id}`,
                "scroll-mt-32 space-y-12",
                index > 0 && "pt-16",
                printHide(produto.id)
              )}
            >
              <ProdutoHero
                badge={produto.badge}
                titulo={produto.nome}
                icon={Icon}
                info={produto.info}
                paraQuemE={produto.paraQuemE}
              />

              <div id={`${produto.id}-sobre`} className="scroll-mt-32 space-y-4">
                <BlocoTitle icon={HelpCircle}>O que é</BlocoTitle>
                <p className="text-muted-foreground font-roboto max-w-3xl">{produto.oQueE}</p>
              </div>

              <div id={`${produto.id}-recursos`} className="scroll-mt-32 space-y-5">
                <BlocoTitle icon={Wrench}>Recursos</BlocoTitle>
                <FeatureList items={produto.recursos} cols={2} />
              </div>

              <ExportButton onClick={() => exportPdf(produto.id)}>Exportar {produto.nome} (PDF)</ExportButton>
            </section>
          );
        })}

        {/* ==================== RESUMO ==================== */}
        <section id="resumo" className={cn("scroll-mt-32 space-y-5 pt-16", printHide("resumo"))}>
          <div>
            <Tag tone="primary" className="mb-3">Tabela Comparativa</Tag>
            <BlocoTitle icon={Table2} as="h2">Resumo de Produtos</BlocoTitle>
            <p className="text-muted-foreground font-roboto">
              Reúne, para consulta rápida, as informações objetivas de cada produto do ecossistema.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl glass-panel">
            <table className="w-full min-w-[720px] text-sm font-roboto text-left">
              <thead>
                <tr className="bg-muted/60">
                  {["Produto", "Investimento", "Para quem é", "Acesso"].map((h) => (
                    <th key={h} className="px-5 py-3 font-anek font-bold text-xs uppercase tracking-wider text-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumoProdutos.map((p) => (
                  <tr key={p.id} className={cn("align-top even:bg-foreground/[0.02] hover:bg-muted/30 transition-colors", `sol-${p.id}`)}>
                    <td className="px-5 py-4 font-anek font-bold text-[hsl(var(--sol-accent,var(--primary)))] whitespace-nowrap">{p.produto}</td>
                    <td className="px-5 py-4 text-foreground">{p.investimento}</td>
                    <td className="px-5 py-4 text-muted-foreground leading-relaxed">{p.paraQuemE}</td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">{p.acesso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExportButton onClick={() => exportPdf("resumo")}>Exportar Resumo (PDF)</ExportButton>
        </section>
        </div>
      </div>
    </PageShell>
  );
}
