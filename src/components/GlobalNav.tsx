import React, { useState, useEffect } from "react";
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
          className="h-8 w-8 md:h-10 md:w-10 dark:hidden"
        />
        <img
          src={simbolo.branco.url}
          alt=""
          aria-hidden="true"
          className="hidden h-8 w-8 md:h-10 md:w-10 dark:block"
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

            {systems.map((system) => {
              const Icon = system.icon;
              const isActive = location.pathname === system.path;
              return (
                <DropdownMenuItem
                  key={system.id}
                  onClick={() => navigate(system.path)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                    "focus:bg-muted hover:bg-muted data-[highlighted]:bg-muted",
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
      <nav className="hidden md:flex items-center gap-0.5">
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
                onClick={() => navigate(system.path)}
                className={cn(
                  "relative px-3 py-2 text-sm font-normal font-anek rounded-full transition-colors duration-200",
                  isActive
                    ? "text-foreground bg-foreground/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
