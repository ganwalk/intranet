import { publicUrl } from "@/lib/utils";

/**
 * Marca do template — um símbolo geométrico com duas variações que
 * conversam entre si: a Marca A "gira" para um lado, a Marca B é o mesmo
 * desenho espelhado, "girando" para o outro. A mesma família de forma em
 * cores opostas comunica que os dois produtos pertencem ao mesmo
 * ecossistema. `raw` traz o markup para reuso programático (recolorir,
 * baixar) e `url` é o caminho pronto para `<img src>`.
 */

const PATH_A =
  "M50,5 L54.66,32.61 L50,50 L58.19,44.26 Z " +
  "M88.97,72.5 L62.73,62.73 L50,50 L50.88,59.96 Z " +
  "M11.03,72.5 L32.61,54.66 L50,50 L40.94,45.78 Z " +
  "M50,44 L55.2,53 L44.8,53 Z";

/** Espelho horizontal exato de PATH_A — mesma família, "giro" invertido. */
const PATH_B =
  "M50,5 L45.34,32.61 L50,50 L41.81,44.26 Z " +
  "M11.03,72.5 L37.27,62.73 L50,50 L49.12,59.96 Z " +
  "M88.97,72.5 L67.39,54.66 L50,50 L59.06,45.78 Z " +
  "M50,44 L55.2,53 L44.8,53 Z";

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
