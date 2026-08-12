import React, { useState, useEffect, useRef } from "react";
import { TomEVoz } from "@/components/widgets/TomEVoz";
import { GlobalNav } from "@/components/GlobalNav";
import { useBrand } from "@/contexts/BrandContext";
import { BookOpen, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchButton } from "@/components/SearchButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PageHero } from "@/components/PageHero";
import { sidebarNavClass, sidebarGroupLabelClass, sidebarItemClass } from "@/components/sidebarNav";
import { Button } from "@/components/ui/button";
import { tomEVozGroups, tomEVozSections } from "@/data/tomEVozSections";

const allSectionIds = tomEVozSections.map((s) => s.id);

function SidebarNav({
  activeSection,
  scrollToSection,
}: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  return (
    <div className="space-y-1">
      {tomEVozGroups.map((group, gi) => (
        <div key={gi} className={cn(gi > 0 && "mt-4")}>
          {group.label && <p className={sidebarGroupLabelClass}>{group.label}</p>}
          <ul className="space-y-0.5 mt-1">
            {group.items.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={sidebarItemClass(activeSection === id)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function TomEVozPage() {
  const { brand, setBrand } = useBrand();
  const [previousBrand] = useState(brand);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("fundamentos");

  useEffect(() => {
    setBrand("marca-a");
    return () => {
      setBrand(previousBrand);
    };
  }, []);

  // Trava o scroll-spy durante a navegação programática (clique no menu),
  // evitando que o highlight pisque em seções intermediárias — mesma
  // funcionalidade do Design System.
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;
      const headerOffset = 100;
      let currentId = allSectionIds[0];

      for (const id of allSectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= headerOffset) {
          currentId = id;
        } else {
          break;
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (!el) return;

    isNavigatingRef.current = true;
    setActiveSection(sectionId);

    const targetTop = el.getBoundingClientRect().top + window.scrollY - 80;
    const maxTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const top = Math.min(Math.max(targetTop, 0), maxTop);
    const releaseDelay = Math.min(1600, Math.max(750, Math.abs(window.scrollY - top) * 0.9));

    window.scrollTo({ top, behavior: "smooth" });

    if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    navTimerRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
      setActiveSection(sectionId);
    }, releaseDelay);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-foreground/10">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold font-anek">Manual de Tom e Voz</p>
                      <p className="text-xs text-muted-foreground">Guia de comunicação da empresa</p>
                    </div>
                  </div>
                </div>
                <nav className="px-2 py-4">
                  <SidebarNav activeSection={activeSection} scrollToSection={scrollToSection} />
                </nav>
              </SheetContent>
            </Sheet>

            <GlobalNav />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <SearchButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <PageHero
        icon={BookOpen}
        title="Manual de Tom e Voz"
        description="Este é o guia oficial de comunicação da empresa. Aqui você encontra as diretrizes de voz, tom e linguagem para todas as áreas e produtos."
      />

      <div className="max-w-7xl mx-auto flex gap-0 relative px-4 md:px-8">
        <nav className={sidebarNavClass}>
          <SidebarNav activeSection={activeSection} scrollToSection={scrollToSection} />
        </nav>

        <main className="flex-1 py-8 pl-0 md:pl-8 min-w-0 overflow-hidden max-w-4xl">
          <TomEVoz />
        </main>
      </div>
    </div>
  );
}