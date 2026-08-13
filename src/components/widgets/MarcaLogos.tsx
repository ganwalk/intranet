import React from "react";
import { cn } from "@/lib/utils";
import {
  simboloBrancoA, simboloPretoA, simboloAcentoA,
  simboloBrancoB, simboloPretoB, simboloAcentoB,
  downloadSvgBlob, downloadPngFromSvg,
} from "@/assets/simbolo";
import { ArrowDown, Download, FileImage, FileText, X as XIcon } from "lucide-react";

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

function ViolacaoCard({ titulo, desc, children }: { titulo: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <div className="relative bg-neutral-100 h-28 flex items-center justify-center">
        {children}
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
          <XIcon className="h-3 w-3" strokeWidth={3} />
        </span>
      </div>
      <div className="p-3">
        <p className="text-xs font-bold text-neutral-900">{titulo}</p>
        <p className="text-[11px] text-neutral-500 mt-0.5">{desc}</p>
      </div>
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
        <p className="text-muted-foreground mb-2">
          A área de segurança (safe zone) é o raio mínimo livre ao redor do símbolo — nenhum texto, borda de
          layout, foto ou outro logotipo pode invadir esse espaço. A unidade de referência é <strong>X</strong>,
          igual à altura total do símbolo: a distância mínima livre em cada lado é <strong>X ÷ 2</strong>.
        </p>
        <p className="text-muted-foreground mb-6">
          Vale tanto para aplicações isoladas (favicon, avatar) quanto para o símbolo ao lado de outros
          elementos — títulos, botões, fotos — em qualquer composição.
        </p>

        <div className="border rounded-xl p-10 bg-neutral-100 flex items-center justify-center">
          <div className="relative">
            {/* Marcadores de medida — topo e lateral, em X */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-bold text-neutral-400 font-mono">X/2</span>
              <span className="block h-3 w-px bg-neutral-300" />
            </span>
            <span className="absolute top-1/2 -left-8 -translate-y-1/2 flex items-center gap-0.5">
              <span className="block w-3 h-px bg-neutral-300" />
              <span className="text-[10px] font-bold text-neutral-400 font-mono -rotate-90 origin-center">X/2</span>
            </span>
            <div className="border-2 border-dashed border-neutral-300 p-8">
              <img src={simboloPretoA.url} alt="Símbolo com área de segurança" className="h-16" />
            </div>
          </div>
        </div>

        <p className="text-sm font-bold font-anek text-foreground mt-8 mb-3">O que evitar</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ViolacaoCard titulo="Símbolo espremido" desc="Colado à borda do layout ou de outro elemento, sem nenhuma folga.">
            <img src={simboloPretoA.url} alt="Símbolo sem área de segurança, colado à borda" className="absolute inset-1 h-[calc(100%-8px)] w-auto" />
          </ViolacaoCard>
          <ViolacaoCard titulo="Elemento sobre o símbolo" desc="Texto, foto ou botão sobrepondo parte do símbolo.">
            <img src={simboloPretoA.url} alt="Símbolo com elemento sobreposto" className="h-14" />
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-neutral-400/70" />
          </ViolacaoCard>
          <ViolacaoCard titulo="Baixo contraste" desc="Símbolo aplicado sobre fundo muito próximo da sua própria cor.">
            <div className="absolute inset-0 bg-neutral-300" />
            <img src={simboloPretoA.url} alt="Símbolo com baixo contraste contra o fundo" className="h-14 opacity-40 relative" />
          </ViolacaoCard>
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
