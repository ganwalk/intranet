import React, { useEffect, useRef, useState } from "react";
import { ComponentShowcase } from "@/components/design-system/ComponentShowcase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProgressGeistProps {
  value: number;
  className?: string;
  "aria-label"?: string;
}

export function ProgressGeist({ value, className, ...rest }: ProgressGeistProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...rest}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function ProgressGeistWidget() {
  const [animated, setAnimated] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // A demo fica animando indefinidamente enquanto montada — como o Design
  // System renderiza todos os componentes de uma vez na mesma página, sem
  // isso o loop continuaria rodando (e re-renderizando) mesmo com a seção
  // fora da viewport, gastando CPU à toa.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setAnimated((v) => (v >= 100 ? 0 : v + 5));
    }, 400);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <ComponentShowcase
      title="Progress"
      description="Barra de progresso minimalista inspirada no Geist: trilha clara, preenchimento sólido em foreground, cantos totalmente arredondados e transição suave."
      code={`function ProgressGeist({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
        style={{ width: \`\${v}%\` }}
      />
    </div>
  );
}

const [animated, setAnimated] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setAnimated((v) => (v >= 100 ? 0 : v + 5));
  }, 400);
  return () => clearInterval(id);
}, []);

// Barras estáticas
<div className="w-full max-w-2xl space-y-6">
  <div className="rounded-xl border bg-card p-6 space-y-5">
    <ProgressGeist value={40} aria-label="40%" />
    <ProgressGeist value={70} aria-label="70%" />
    <ProgressGeist value={100} aria-label="100%" />
  </div>

  {/* Barra animada com controles */}
  <div className="rounded-xl border bg-card p-6 space-y-3">
    <div className="flex items-center justify-between text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
      <span>Animado</span>
      <span>{animated}%</span>
    </div>
    <ProgressGeist value={animated} aria-label={\`\${animated}%\`} />
    <div className="pt-2 flex gap-2">
      <Button size="sm" variant="outline" onClick={() => setAnimated(0)}>Reiniciar</Button>
      <Button size="sm" variant="outline" onClick={() => setAnimated(100)}>Completar</Button>
    </div>
  </div>
</div>`}
      htmlCode={`<style>
  .gprog { position:relative; height:8px; width:100%; overflow:hidden; border-radius:9999px; background:#ececec; }
  .gprog__bar { height:100%; border-radius:9999px; background:hsl(var(--primary)); transition: width .5s ease-out; }
</style>

<div class="gprog"><div class="gprog__bar" style="width:40%"></div></div>
<div class="gprog" style="margin-top:16px"><div class="gprog__bar" style="width:70%"></div></div>
<div class="gprog" style="margin-top:16px"><div class="gprog__bar" style="width:100%"></div></div>`}
    >
      <div ref={wrapperRef} className="w-full max-w-2xl space-y-6">
        <div className="rounded-xl border bg-card p-6 space-y-5">
          <ProgressGeist value={40} aria-label="40%" />
          <ProgressGeist value={70} aria-label="70%" />
          <ProgressGeist value={100} aria-label="100%" />
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-roboto font-bold uppercase tracking-wider text-muted-foreground">
            <span>Animado</span>
            <span>{animated}%</span>
          </div>
          <ProgressGeist value={animated} aria-label={`${animated}%`} />
          <div className="pt-2 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setAnimated(0)}>
              Reiniciar
            </Button>
            <Button size="sm" variant="outline" onClick={() => setAnimated(100)}>
              Completar
            </Button>
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
