/**
 * AI-Food Generator — gera prompts standalone para qualquer componente do Design System.
 * Cada prompt é 100% isolado: inclui regras de marca, código do componente, todos os estados
 * e checklist de entrega. Funciona em qualquer IA (ChatGPT, Claude, Cursor, Gemini, etc.).
 */

// ─── Regras de marca ────────────────────────────────────────────────────────

const MARCA_A_BASE = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — MARCA A
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDENTIDADE
Tom institucional, sóbrio e técnico.
❌ NUNCA: liquid glass, gradientes coloridos, emojis decorativos, estética startup colorida.

PALETA OFICIAL (use SOMENTE estas cores)
• Vermelho:              #AD1522  → primária, botões, títulos
• Vermelho Escuro:        #BF222F  → hover de botões
• Vermelho Destaque:       #F07580  → acentos em fundo ESCURO apenas
• Branco Puro:         #FFFFFF
• Cinza Claro:         #F2F2F2
• Cinza Médio:         #6B6B6B  → textos secundários
• Cinza Chumbo:        #1B1B1B  → cards em dark
• Preto Puro:          #000000
❌ PROIBIDO: roxo, rosa, azul (cor da Marca B), gradientes coloridos, neon

TIPOGRAFIA
• H1: Satoshi 600  54px/36px mobile  lh 1.1
• H2: Satoshi 600  41px/30px         lh 1.15
• Corpo: Satoshi 400  17px  lh 1.6
• Botão/CTA: Satoshi 700  14px UPPERCASE  ls 0.05em

BOTÕES — identidade visual mais marcante
• border-radius: 5px — NUNCA pílulas (rounded-full)
• Primário (fundo claro):  bg #AD1522  text #FFF   border #AD1522
  Hover:                   bg transparent  text #AD1522  border #AD1522
• Transition: all 240ms ease

CARDS
• border-radius: 12px SEMPRE
• Hover: shadow-[0_8px_24px_rgba(0,0,0,0.06)] translateY(-2px) transition 240ms
❌ PROIBIDO: backdrop-blur, liquid glass, transparências translúcidas`;

const MARCA_B_BASE = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — MARCA B
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IDENTIDADE
Tom próximo, descomplicado, visual sofisticado e editorial.
Glassmorphism é a assinatura visual — usar em cards de LP.
❌ NUNCA use o vermelho da Marca A (#AD1522) — exceto dentro de texto de botão azul.

PALETA OFICIAL
• Azul Principal:  #2B76EE  → acentos, ícones, botão primário, slider thumb
• Azul Escura:     #08409B  → tipografia de destaque, eyebrow, badges
• Vermelho (Marca A):    #AD1522  → SOMENTE em texto dentro de botões azul
• Cinza Texto:        #18181B
• Cinza Secundário:   #52525B / #71717A
❌ PROIBIDO: vermelho como cor de fundo/borda, cores saturadas fora da paleta

FUNDO DE PÁGINA (assinatura da Marca B)
• NUNCA fundo branco chapado — use gradiente radial cinza sutil:
  background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%);

CARDS TRANSLÚCIDOS (assinatura visual)
• background: rgba(255,255,255,0.5)  backdrop-filter: blur(24px)
• border: 1px solid rgba(0,0,0,0.12)  border-radius: 16px  padding: 32px
• Hover: translateY(-8px)  transition: 320ms ease

TIPOGRAFIA
• H1: Satoshi 700  56px/36px mobile  lh 1.05
• Corpo: Satoshi 400  17px  #52525B
• Botão/CTA: Satoshi 700  14px UPPERCASE  ls 0.05em

BOTÕES
• border-radius: 5px em LP — NUNCA pílulas (rounded-full)
• Primário (fundo claro): bg #2B76EE  text #AD1522  border #2B76EE
  Hover: bg transparent  border #2B76EE  text #18181B`;

const FERRAMENTAS_EXTRA = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO: FERRAMENTAS / CALCULADORAS / WIDGETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Container pai: bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto
  (rounded-2xl é a ÚNICA exceção à regra de bordas de cards)
• Botões: rounded-[5px] — mesmo padrão do Design System
• Valores: tabular-nums font-anek font-bold text-4xl
• Inputs: bg-gray-50 rounded-xl px-4 py-3 (sem border visível no default)
• Sliders:
  - Track: h-2 bg-gray-200 rounded-full
  - Fill/Thumb: cor primária da marca ativa
• Caixa de resultado: bg-red-50 (Marca A) / bg-gray-50 (Marca B)
  rounded-xl p-5 mt-6`;

const PLATAFORMA_EXTRA = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXTO: PLATAFORMA EAD (MARCA B)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Light mode (padrão): body bg-gray-50  cards bg-white border border-gray-200
• Dark mode (toggle): body bg-zinc-950  cards bg-zinc-900 border border-zinc-800
• Vídeo: SEMPRE bg-black aspect-video — mesmo em light mode
• Aula ativa (em andamento):  bg-blue-50 border-l-4 border-blue-500
• Aula concluída:              ícone text-emerald-500
• Progresso: barra h-2 bg-gray-200 fill bg-[#2B76EE] rounded-full`;

const ESTADOS_UNIVERSAIS = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTADOS OBRIGATÓRIOS — implemente TODOS os aplicáveis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Default (idle)              — aparência padrão sem interação
□ Hover                       — transition 240ms ease (320ms na Marca B LP)
□ Active / Pressed            — estado de clique (scale 0.98 ou brightness 0.9)
□ Focus                       — outline 2px offset 2px na cor primária (acessibilidade)
□ Disabled                    — opacity 50%, cursor not-allowed, pointer-events none
□ Loading (se aplicável)      — spinner 20px + texto "Carregando..." + disabled
□ Error / Validação (se aplic.)— border-color #DC2626 + mensagem abaixo em text-sm
□ Empty state (se aplicável)  — ilustração/ícone + CTA para ação primária
□ Responsivo                  — mobile-first; breakpoints sm(640) md(768) lg(1024)`;

const CHECKLIST = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECKLIST ANTES DE ENTREGAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Todos os estados visuais implementados
□ Transições fluidas (240ms ease padrão)
□ Tipografia correta: Satoshi em todos os pesos (títulos, corpo, labels e botões CTA)
□ Paleta de cores da marca respeitada sem exceções
□ Responsivo mobile/desktop testado
□ Acessibilidade: aria-label nos ícones, focus-visible ring, contraste ≥ 4.5:1
□ Marca A: sem liquid glass, sem gradientes coloridos, botões com border-radius 5px
□ Marca B LP: cards translúcidos (backdrop-blur 24px), gradiente radial no fundo
□ Plataforma: vídeo sempre bg-black, aula ativa com border-l-4 azul`;

// ─── Função principal ────────────────────────────────────────────────────────

export function generateComponentPrompt(
  brand: "marca-a" | "marca-b",
  view: "institucional" | "ferramentas" | "plataforma",
  title: string,
  description: string | undefined,
  code: string | undefined,
  htmlCode: string | undefined
): string {
  const brandLabel = brand === "marca-a" ? "Marca A" : "Marca B";
  const viewLabel =
    view === "institucional"
      ? "Sites & LPs"
      : view === "ferramentas"
      ? "Ferramentas / Calculadoras"
      : "Plataforma EAD";

  const brandRules = brand === "marca-a" ? MARCA_A_BASE : MARCA_B_BASE;
  const viewExtra =
    view === "ferramentas"
      ? FERRAMENTAS_EXTRA
      : view === "plataforma"
      ? PLATAFORMA_EXTRA
      : "";

  const sep = "━".repeat(60);

  const codeBlock = code
    ? `\n${sep}\nCÓDIGO REACT / TSX\n${sep}\n${code}`
    : "";

  const htmlBlock = htmlCode
    ? `\n${sep}\nCÓDIGO HTML / CSS / JS\n${sep}\n${htmlCode}`
    : "";

  const descBlock = description ? `\n${description}` : "";

  return `Você é um Desenvolvedor Front-end Especialista. Replique EXATAMENTE o componente abaixo, pertencente ao Design System ${brandLabel} (${viewLabel}).

${sep}
COMPONENTE: ${title.toUpperCase()}
${sep}${descBlock}${codeBlock}${htmlBlock}

${brandRules}${viewExtra ? `\n${viewExtra}` : ""}

${ESTADOS_UNIVERSAIS}

${CHECKLIST}

${sep}
INSTRUÇÕES FINAIS
${sep}
1. Analise o código acima e entenda cada detalhe visual e funcional.
2. Replique o componente "${title}" com TODOS os estados listados acima.
3. Respeite RIGOROSAMENTE a paleta de cores, tipografia e espaçamentos do Design System ${brandLabel}.
4. Entregue código limpo, pronto para produção, sem comentários de explicação.
5. Se precisar de props adicionais, liste-as com seus tipos TypeScript.

Agora replique o componente "${title}":`;
}

// ─── Prompt global por brand/view ────────────────────────────────────────────

export function getGlobalPromptRules(
  brand: "marca-a" | "marca-b",
  view: "institucional" | "ferramentas" | "plataforma"
): string {
  const brandRules = brand === "marca-a" ? MARCA_A_BASE : MARCA_B_BASE;
  const viewExtra =
    view === "ferramentas"
      ? FERRAMENTAS_EXTRA
      : view === "plataforma"
      ? PLATAFORMA_EXTRA
      : "";
  return brandRules + (viewExtra ? `\n${viewExtra}` : "");
}
