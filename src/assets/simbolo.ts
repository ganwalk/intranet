import { publicUrl } from "@/lib/utils";

/**
 * Marca do template — um símbolo geométrico com duas variações que
 * conversam entre si: a Marca A "gira" para um lado, a Marca B é o mesmo
 * desenho espelhado, "girando" para o outro. A mesma família de forma em
 * cores opostas comunica que os dois produtos pertencem ao mesmo
 * ecossistema. `raw` traz o markup para reuso programático (recolorir,
 * baixar) e `url` é o caminho pronto para `<img src>`.
 */

/**
 * Três pétalas arredondadas (cada uma um par de arcos de raios diferentes,
 * como uma "vesica" assimétrica) girando em torno de um núcleo central —
 * mais curvo e amigável que um triskelion de pontas retas, mantendo a
 * simetria geométrica que dá o ar institucional.
 */
const PATH_A =
  "M50,50 A32,32 0 0,1 50,10 A21,21 0 0,1 50,50 Z " +
  "M50,50 A32,32 0 0,1 84.64,70 A21,21 0 0,1 50,50 Z " +
  "M50,50 A32,32 0 0,1 15.36,70 A21,21 0 0,1 50,50 Z " +
  "M50,42 A8,8 0 1,1 50,58 A8,8 0 1,1 50,42 Z";

/** Espelho horizontal exato de PATH_A (arcos com sweep invertido) — mesma família, "giro" invertido. */
const PATH_B =
  "M50,50 A32,32 0 0,0 50,10 A21,21 0 0,0 50,50 Z " +
  "M50,50 A32,32 0 0,0 84.64,70 A21,21 0 0,0 50,50 Z " +
  "M50,50 A32,32 0 0,0 15.36,70 A21,21 0 0,0 50,50 Z " +
  "M50,42 A8,8 0 1,0 50,58 A8,8 0 1,0 50,42 Z";

const RAW = (fill: string, path: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill-rule="evenodd" clip-rule="evenodd" fill="${fill}" d="${path}"/></svg>`;

// Marca A
export const simboloPretoA = { url: publicUrl("/simbolo-a-preto.svg"), raw: RAW("#111111", PATH_A) };
export const simboloBrancoA = { url: publicUrl("/simbolo-a-branco.svg"), raw: RAW("#ffffff", PATH_A) };
/** Variante de acento — cor primária da Marca A. */
export const simboloAcentoA = { url: publicUrl("/simbolo-a-acento.svg"), raw: RAW("#AC1522", PATH_A) };

// Marca B
export const simboloPretoB = { url: publicUrl("/simbolo-b-preto.svg"), raw: RAW("#111111", PATH_B) };
export const simboloBrancoB = { url: publicUrl("/simbolo-b-branco.svg"), raw: RAW("#ffffff", PATH_B) };
/** Variante de acento — cor primária da Marca B. */
export const simboloAcentoB = { url: publicUrl("/simbolo-b-acento.svg"), raw: RAW("#2B76EE", PATH_B) };

export type Brand = "marca-a" | "marca-b";

/** Símbolo (preto/branco/acento) da marca ativa — para componentes que trocam de logo conforme o contexto. */
export function simboloPorMarca(brand: Brand) {
  return brand === "marca-b"
    ? { preto: simboloPretoB, branco: simboloBrancoB, acento: simboloAcentoB }
    : { preto: simboloPretoA, branco: simboloBrancoA, acento: simboloAcentoA };
}

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
