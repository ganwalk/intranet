import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CodeFooter } from "@/components/design-system/CodeFooter";
import { Sun, Moon } from "lucide-react";
import { useBrand } from "@/contexts/BrandContext";
import { useTheme } from "@/contexts/ThemeContext";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  code?: string;
  htmlCode?: string;
  children: React.ReactNode;
  className?: string;
  showToggle?: boolean;
}

export function ComponentShowcase({ title, description, code, htmlCode, children, className, showToggle = true }: ComponentShowcaseProps) {
  const { brand } = useBrand();
  const { theme } = useTheme();

  const effectiveCode =
    code ??
    `// TODO: snippet React deste componente ainda não foi fornecido.\n// Passe a prop \`code\` (e opcionalmente \`htmlCode\`) ao ComponentShowcase\n// para que o bloco "Ver código" exiba o conteúdo correto.`;
  const hasCode = Boolean(code);

  const [isDark, setIsDark] = useState(theme === "dark");
  const [userOverrode, setUserOverrode] = useState(false);

  useEffect(() => {
    if (!userOverrode) setIsDark(theme === "dark");
  }, [theme, userOverrode]);

  return (
    <div className={cn("glass-panel rounded-2xl overflow-hidden", className)}>
      <div className="px-6 py-4 bg-foreground/[0.03]">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold min-w-0 truncate">{title}</h3>
          {showToggle && (
            <button
              type="button"
              onClick={() => { setUserOverrode(true); setIsDark((d) => !d); }}
              aria-label={isDark ? "Visualizar em tema claro" : "Visualizar em tema escuro"}
              title={isDark ? "Tema claro" : "Tema escuro"}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 h-8 w-[88px] rounded-lg bg-background text-foreground hover:bg-muted transition-colors text-[10px] font-roboto font-bold uppercase tracking-wider"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{isDark ? "Claro" : "Escuro"}</span>
            </button>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1 pr-[104px]">{description}</p>}
      </div>

      <div className={cn(isDark ? "dark" : "light", brand === "marca-b" && "marca-b")}>
        <div className="p-6 flex flex-wrap items-center gap-4 bg-background text-foreground">
          {children}
        </div>
      </div>

      <CodeFooter
        title={title}
        hasCode={hasCode}
        effectiveCode={effectiveCode}
        code={code}
        htmlCode={htmlCode}
        description={description}
      />
    </div>
  );
}
