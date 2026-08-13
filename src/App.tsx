import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrandProvider } from "@/contexts/BrandContext";
import { ViewProvider } from "@/contexts/ViewContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEgg } from "@/components/EasterEgg";
import { ScrollToTop } from "@/components/ScrollToTop";
import React, { Suspense, lazy } from "react";

/**
 * Lazy por rota: o Design System sozinho arrasta o catálogo inteiro de ~60
 * componentes (a maior fatia do bundle, de longe). Sem isso, visitar
 * /tom-e-voz ou /solucoes baixava e parseava esse catálogo à toa, mesmo
 * sem nunca renderizá-lo.
 */
const DesignSystem = lazy(() => import("./pages/DesignSystem"));
const TomEVozPage = lazy(() => import("./pages/TomEVozPage"));
const SolucoesPage = lazy(() => import("./pages/SolucoesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Placeholder mínimo enquanto o chunk da rota carrega — sem layout próprio
    pra não "piscar" contra o header/skeleton real da página assim que ela monta. */
function RouteFallback() {
  return <div className="min-h-screen" aria-hidden="true" />;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message ?? String(error) };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", color: "#b00" }}>
          <h2>Algo deu errado ao renderizar o app.</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{this.state.message}</pre>
          <button style={{ marginTop: 16 }} onClick={() => this.setState({ hasError: false, message: "" })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <BrandProvider>
        <ViewProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <ScrollToTop />
              <CommandPalette />
              <EasterEgg />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<DesignSystem />} />
                  <Route path="/design-system" element={<DesignSystem />} />
                  <Route path="/tom-e-voz" element={<TomEVozPage />} />
                  <Route path="/solucoes" element={<SolucoesPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ViewProvider>
      </BrandProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
