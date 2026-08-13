import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { simboloPorMarca } from "@/assets/simbolo";
import { useBrand } from "@/contexts/BrandContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Volume2, Palette, ChevronDown, X, Layers } from "lucide-react";

const systems = [
  {
    id: "design-system",
    label: "Design System",
    description: "Componentes, cores, tipografia e padrões visuais",
    icon: Palette,
    path: "/design-system",
  },
  {
    id: "tom-e-voz",
    label: "Manual de Tom e Voz",
    description: "Diretrizes de comunicação verbal da marca",
    icon: Volume2,
    path: "/tom-e-voz",
  },
  {
    id: "solucoes",
    label: "Nossas Soluções",
    description: "Guia completo dos nossos produtos digitais",
    icon: Layers,
    path: "/solucoes",
  },
];

export function GlobalNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand } = useBrand();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const currentSystem = systems.find((s) => s.path === location.pathname) || systems[0];
  const simbolo = simboloPorMarca(brand);

  /* Indicador deslizante — "pill" que acompanha o item em foco (hover ou
     ativo) na nav desktop, medindo a posição real do botão a cada troca em
     vez de depender de índices, pra ficar preciso mesmo com labels de
     tamanhos diferentes. */
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({ left: 0, width: 0, ready: false });
  const targetId = hoveredId ?? currentSystem.id;

  useLayoutEffect(() => {
    const update = () => {
      const nav = navRef.current;
      const el = itemRefs.current[targetId];
      if (!nav || !el) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width, ready: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [targetId]);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("central-nav-welcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setShowWelcome(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("central-nav-welcome", "true");
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Logo — sem caixa: o símbolo fica solto sobre o fundo da navegação e
          troca de cor por tema, já que precisa de contraste contra o fundo
          e não mais contra uma superfície própria. Clicável: leva pro
          Design System, a home do template. */}
      <button
        onClick={() => navigate("/")}
        className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Ir para o início"
      >
        <img
          src={simbolo.preto.url}
          alt="Logo"
          className="h-7 w-7 md:h-8 md:w-8 dark:hidden"
        />
        <img
          src={simbolo.branco.url}
          alt=""
          aria-hidden="true"
          className="hidden h-7 w-7 md:h-8 md:w-8 dark:block"
        />
      </button>

      {/* Mobile: dropdown */}
      <div className="md:hidden">
        <DropdownMenu onOpenChange={(open) => { if (open) dismissWelcome(); }}>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none group rounded-xl px-2 py-1.5 -mx-2 hover:bg-muted transition-colors">
            <div className="text-left">
              <p className="text-sm font-bold font-anek leading-tight text-foreground">
                {currentSystem.label}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-80 p-2 space-y-1 bg-popover/95 backdrop-blur-xl shadow-xl">
            <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider font-roboto font-bold px-2 py-2.5">
              Navegar entre sistemas
            </DropdownMenuLabel>

            {systems.map((system, i) => {
              const Icon = system.icon;
              const isActive = location.pathname === system.path;
              return (
                <DropdownMenuItem
                  key={system.id}
                  onClick={() => navigate(system.path)}
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: "backwards" }}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                    "focus:bg-muted hover:bg-muted data-[highlighted]:bg-muted",
                    "animate-in fade-in slide-in-from-top-1 duration-200",
                    isActive && "bg-muted/60"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-lg shrink-0 mt-0.5 transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-card text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold font-anek text-foreground leading-tight">
                      {system.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug mt-1 font-roboto">
                      {system.description}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-[9px] font-bold text-foreground uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded-md bg-foreground/10 font-roboto shrink-0">
                      Atual
                    </span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: horizontal nav */}
      <nav ref={navRef} className="hidden md:flex items-center gap-0.5 relative">
        {/* Pill deslizante — mede a posição real do item em foco (hover ou
            ativo) e anima transform/width até ele, como um seletor
            segmentado. Fica atrás do texto (z-0) e não recebe clique. */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-full rounded-full bg-foreground/8 pointer-events-none transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
            opacity: indicator.ready ? 1 : 0,
          }}
        />
        {systems.map((system) => {
          const Icon = system.icon;
          const isActive = location.pathname === system.path;
          const isHovered = hoveredId === system.id;
          return (
            <div
              key={system.id}
              className="relative"
              onMouseEnter={() => setHoveredId(system.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                ref={(el) => { itemRefs.current[system.id] = el; }}
                onClick={() => navigate(system.path)}
                className={cn(
                  "relative z-10 px-3 py-2 text-sm font-normal font-anek rounded-full transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {system.label}
              </button>

              {/* Popup — sempre no DOM, entra e sai com CSS transition */}
              <div
                className="absolute top-full left-1/2 z-50 mt-1.5 w-[220px]"
                style={{
                  transform: isHovered
                    ? "translateX(-50%) translateY(0px)"
                    : "translateX(-50%) translateY(-5px)",
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? "auto" : "none",
                  transition: "opacity 200ms cubic-bezier(0.22,1,0.36,1), transform 200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div className="relative bg-popover/95 backdrop-blur-xl rounded-xl p-3 shadow-xl">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-popover rotate-45 rounded-sm" />
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-lg shrink-0 mt-0.5",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-card text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium font-anek text-foreground leading-tight">{system.label}</p>
                      <p className="text-xs text-muted-foreground font-roboto mt-0.5 leading-snug">{system.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Welcome tooltip — mobile only */}
      {showWelcome && (
        <div className="md:hidden absolute top-full left-12 mt-3 z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
          {/* O max-w desconta também o deslocamento `left-12` e o padding do
              header (3rem + 1rem + 1rem), senão o balão vaza pela direita. */}
          <div className="relative bg-popover/95 rounded-xl p-4 shadow-xl w-[380px] max-w-[calc(100vw-5rem)] backdrop-blur-xl">
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-popover rotate-45 rounded-sm" />
            <button
              onClick={dismissWelcome}
              className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Fechar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="pr-6">
              <p className="text-[10px] font-bold font-roboto uppercase tracking-wider text-muted-foreground mb-1.5">
                Dica de navegação
              </p>
              <p className="text-sm font-anek font-bold text-foreground leading-tight mb-1">
                Navegue entre as áreas
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-roboto">
                Por aqui você acessa o Design System, o Manual de Tom e Voz e Nossas Soluções — tudo em um só lugar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
