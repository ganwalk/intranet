import { publicUrl } from "@/lib/utils";

/**
 * Marca do template — três variantes de cor do mesmo símbolo (SVG puro,
 * sem fotos). `raw` traz o markup para reuso programático (recolorir,
 * baixar) e `url` é o caminho pronto para `<img src>`.
 */

const RAW = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill-rule="evenodd" clip-rule="evenodd" fill="${fill}" d="M50 4 L96 50 L50 96 L4 50 Z M50 28 L72 50 L50 72 L28 50 Z"/></svg>`;

export const olhoPreto = { url: publicUrl("/olho-preto.svg"), raw: RAW("#111111") };
export const olhoBranco = { url: publicUrl("/olho-branco.svg"), raw: RAW("#ffffff") };
/** Variante de acento (antigo "amarelo") — agora na cor primária do template. */
export const olhoAmarelo = { url: publicUrl("/olho-amarelo.svg"), raw: RAW("#4F46E5") };

export function downloadSvgBlob(svgRaw: string, filename: string): void {
  const blob = new Blob([svgRaw], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPngFromSvg(svgRaw: string, filename: string, size = 512): void {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgRaw)}`;
}
