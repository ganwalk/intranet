import React from "react";
import { cn } from "@/lib/utils";
import {
  simboloBrancoA, simboloPretoA, simboloAcentoA,
  simboloBrancoB, simboloPretoB, simboloAcentoB,
  downloadSvgBlob, downloadPngFromSvg,
} from "@/assets/simbolo";
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

function SimboloDownloadButtons({ svgRaw, svgUrl, filename, dark = false }: {
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

function SimboloCard({ src, raw, alt, label, desc, sufixo, dark = false }: {
  src: string;
  raw: string;
  alt: string;
  label: string;
  desc: string;
  sufixo: string;
  dark?: boolean;
}) {
  return (
    <div className={cn(
      "border rounded-xl p-10 flex flex-col items-center justify-center",
      dark ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-neutral-100"
    )}>
      <img src={src} alt={alt} className="h-16 mb-4" />
      <span className={cn("text-sm font-bold mb-1", dark ? "text-neutral-100" : "text-neutral-900")}>{label}</span>
      <span className={cn("text-xs", dark ? "text-neutral-400" : "text-neutral-500")}>{desc}</span>
      <SimboloDownloadButtons svgRaw={raw} svgUrl={src} filename={`simbolo-${sufixo}`} dark={dark} />
    </div>
  );
}

export function MarcaLogos() {
  return (
    <div className="space-y-12">
      {/* Símbolo — mesmo monograma, cor de cada marca */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Símbolo da marca</h3>
        <p className="text-muted-foreground mb-6">
          Um monograma único — o "S" da marca com uma nota musical embutida em negativo — usado pelos dois
          produtos do ecossistema. A distinção entre Marca A e Marca B vem da cor primária de cada uma, não
          da forma. Cada uma tem três variações: preto, branco e acento.
        </p>

        <div className="space-y-8">
          <div>
            <p className="text-sm font-bold font-anek text-foreground mb-3">Marca A</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SimboloCard src={simboloPretoA.url} raw={simboloPretoA.raw} alt="Símbolo Marca A preto" label="Preto" desc="Para fundos claros" sufixo="marca-a-preto" />
              <SimboloCard src={simboloBrancoA.url} raw={simboloBrancoA.raw} alt="Símbolo Marca A branco" label="Branco" desc="Para fundos escuros" sufixo="marca-a-branco" dark />
              <SimboloCard src={simboloAcentoA.url} raw={simboloAcentoA.raw} alt="Símbolo Marca A acento" label="Acento" desc="Cor primária da Marca A" sufixo="marca-a-acento" dark />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold font-anek text-foreground mb-3">Marca B</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SimboloCard src={simboloPretoB.url} raw={simboloPretoB.raw} alt="Símbolo Marca B preto" label="Preto" desc="Para fundos claros" sufixo="marca-b-preto" />
              <SimboloCard src={simboloBrancoB.url} raw={simboloBrancoB.raw} alt="Símbolo Marca B branco" label="Branco" desc="Para fundos escuros" sufixo="marca-b-branco" dark />
              <SimboloCard src={simboloAcentoB.url} raw={simboloAcentoB.raw} alt="Símbolo Marca B acento" label="Acento" desc="Cor primária da Marca B" sufixo="marca-b-acento" dark />
            </div>
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
            <img src={simboloPretoA.url} alt="Símbolo com área de segurança" className="h-16" />
          </div>
        </div>
      </div>

      {/* Dimensão Mínima */}
      <div>
        <h3 className="text-lg font-bold mb-2 font-anek">Dimensão Mínima</h3>
        <p className="text-muted-foreground mb-6">A dimensão mínima preserva a legibilidade do símbolo em diferentes meios de aplicação.</p>
        <div className="border rounded-xl p-8 bg-neutral-100 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <img src={simboloPretoA.url} alt="Símbolo em tamanho padrão" className="h-16" />
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <img src={simboloPretoA.url} alt="Símbolo em tamanho mínimo" className="h-6" />
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
