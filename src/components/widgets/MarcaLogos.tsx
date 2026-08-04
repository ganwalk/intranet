import React from "react";
import { useBrand } from "@/contexts/BrandContext";
import { cn } from "@/lib/utils";
import { olhoBranco, olhoPreto, olhoAmarelo, downloadSvgBlob, downloadPngFromSvg } from "@/assets/olhos";
import { ArrowDown, Download, FileImage, FileText } from "lucide-react";

async function downloadPdf(src: string, filename: string) {
  try {
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write(`
        <html><head><title>${filename}</title>
        <style>@media print{@page{margin:0}body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh}}</style>
        </head><body><img src="${src}" style="max-width:100%;max-height:100vh;object-fit:contain"/><script>setTimeout(function(){window.print()},500)</script></body></html>
      `);
    }
  } catch {
    console.error("Erro ao gerar PDF");
  }
}

// ─── Botões de download para o símbolo (blob local, sem fetch) ──────────────

function OlhoDownloadButtons({ svgRaw, svgUrl, filename, dark = false }: {
  svgRaw: string;
  svgUrl: string;
  filename: string;
  dark?: boolean;
}) {
  const btnClass = dark
    ? "text-neutral-300 hover:text-neutral-100 border-neutral-700 hover:border-neutral-500"
    : "text-neutral-500 hover:text-neutral-900 border-neutral-300 hover:border-neutral-500";

  return (
    <div className="flex items-center gap-1.5 mt-3">
      <button
        onClick={() => downloadSvgBlob(svgRaw, filename)}
        className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}
        title="Baixar SVG"
      >
        <Download className="h-3 w-3" /> SVG
      </button>
      <button
        onClick={() => downloadPngFromSvg(svgRaw, filename)}
        className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}
        title="Baixar PNG"
      >
        <FileImage className="h-3 w-3" /> PNG
      </button>
      <button
        onClick={() => downloadPdf(svgUrl, filename)}
        className={cn("flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors", btnClass)}
        title="Baixar PDF"
      >
        <FileText className="h-3 w-3" /> PDF
      </button>
    </div>
  );
}

export function MarcaLogos() {
  const { brand } = useBrand();

  return (
    <div className="space-y-12">
      {/* Símbolo — Universal */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Símbolo da marca</h3>
        <p className="text-muted-foreground mb-6">Três variantes de cor do mesmo símbolo. Use a versão adequada conforme o fundo.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-100">
            <img src={olhoPreto.url} alt="Símbolo preto" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-900 mb-1">Preto</span>
            <span className="text-xs text-neutral-500">Para fundos claros</span>
            <OlhoDownloadButtons svgRaw={olhoPreto.raw} svgUrl={olhoPreto.url} filename="simbolo-preto" />
          </div>
          <div className="border border-neutral-800 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-900">
            <img src={olhoBranco.url} alt="Símbolo branco" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-100 mb-1">Branco</span>
            <span className="text-xs text-neutral-400">Para fundos escuros</span>
            <OlhoDownloadButtons svgRaw={olhoBranco.raw} svgUrl={olhoBranco.url} filename="simbolo-branco" dark />
          </div>
          <div className="border border-neutral-800 rounded-xl p-10 flex flex-col items-center justify-center bg-neutral-900">
            <img src={olhoAmarelo.url} alt="Símbolo de acento" className="h-16 mb-4" />
            <span className="text-sm font-bold text-neutral-100 mb-1">Acento</span>
            <span className="text-xs text-neutral-400">
              Cor primária da marca {brand === "marca-a" ? "Marca A" : "Marca B"}
            </span>
            <OlhoDownloadButtons svgRaw={olhoAmarelo.raw} svgUrl={olhoAmarelo.url} filename="simbolo-acento" dark />
          </div>
        </div>
      </div>

      {/* Área de Segurança */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Área de Segurança</h3>
        <p className="text-muted-foreground mb-6">
          A área de segurança (safe zone) usa a própria dimensão do símbolo como espaçamento mínimo
          nos quatro lados, garantindo que nenhum elemento gráfico invada o espaço da marca.
        </p>
        <div className="border rounded-xl p-10 bg-neutral-100 flex items-center justify-center">
          <div className="border-2 border-dashed border-neutral-300 p-8">
            <img src={olhoPreto.url} alt="Símbolo com área de segurança" className="h-16" />
          </div>
        </div>
      </div>

      {/* Dimensão Mínima */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Dimensão Mínima</h3>
        <p className="text-muted-foreground mb-6">A dimensão mínima preserva a legibilidade do símbolo em diferentes meios de aplicação.</p>
        <div className="border rounded-xl p-8 bg-neutral-100 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <img src={olhoPreto.url} alt="Símbolo em tamanho padrão" className="h-16" />
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <img src={olhoPreto.url} alt="Símbolo em tamanho mínimo" className="h-6" />
          </div>
          <div className="mt-6 w-full max-w-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-bold">Impressos</span>
              <span className="font-bold">1 x 1 cm</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-bold">Digital</span>
              <span className="font-bold">24 x 24 px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
