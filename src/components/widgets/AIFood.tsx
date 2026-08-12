import React, { useState, useMemo } from "react";
import { useBrand } from "@/contexts/BrandContext";
import { useSystemView, viewLabels } from "@/contexts/ViewContext";
import { Copy, Check, Bot, Sparkles, Code2, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Master Prompts — 100% standalone, sem dependência externa ────────────────

const masterPrompts = {
  "marca-a": {
    institucional: `Você é um Desenvolvedor Front-end Especialista. Gere seções de Landing Page ou Site Institucional para a Marca A seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente: contém tudo que você precisa saber sobre o Design System da Marca A.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. ESSÊNCIA DA MARCA (inegociável)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A Marca A tem um tom institucional, sóbrio e técnico. Autoridade direta, sem promessas vazias.
❌ NUNCA: liquid glass, gradientes coloridos, emojis decorativos, estética startup colorida.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PALETA OFICIAL (use SOMENTE estas cores)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Vermelho primário: #AD1522  → botões, títulos em fundo claro
• Vermelho escuro:   #BF222F  → hover de botões
• Vermelho acento:   #F07580  → destaque em fundo ESCURO apenas
• Branco:  #FFFFFF  |  Cinza claro: #F2F2F2  |  Cinza médio: #6B6B6B
• Cinza chumbo: #1B1B1B (cards em dark)  |  Preto: #000000
❌ PROIBIDO: roxo, rosa, cores fora da paleta, gradientes coloridos, neon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TIPOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• H1: Anek Latin 600  54px / 36px mobile  lh 1.1
• H2: Anek Latin 600  41px / 30px
• Corpo: Roboto 400  17px  lh 1.6
• Eyebrow / Botão: Sora 700  UPPERCASE  tracking largo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. BOTÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• border-radius: 5px  |  border: sempre 1px solid  |  padding py-[18px] px-[32px]
• Primário: bg #AD1522  text branco  |  hover: bg transparente  text #AD1522
• Outline (fundo escuro): bg transparente  border branca  |  hover: bg branco  text #AD1522
• Estados: default → hover (240ms) → active (scale 0.99) → focus (ring #AD1522) → disabled → loading

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. CARDS E LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• radius 12px sempre (exceto botões)  |  hover: shadow suave + translateY(-2px)
❌ PROIBIDO: backdrop-blur, glassmorphism, transparências translúcidas
• Sections alternam fundo: branco → cinza claro → branco → preto (impacto) → branco
• Container max-w 1200px  |  gaps sempre múltiplos de 15px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. EXEMPLO DE HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<section class="bg-white py-[90px]">
  <div class="max-w-[1200px] mx-auto px-6">
    <span class="font-sora text-[12px] font-bold uppercase tracking-[0.15em] text-[#AD1522]">Eyebrow</span>
    <h1 class="font-anek text-[54px] font-semibold leading-[1.1] text-[#AD1522] mt-[15px]">
      Título institucional de impacto.
    </h1>
    <p class="font-roboto text-[20px] text-[#6B6B6B] mt-[30px] max-w-[640px]">
      Texto de apoio curto e direto.
    </p>
    <div class="flex gap-[15px] mt-[45px]">
      <button class="font-sora font-bold uppercase text-[14px] py-[18px] px-[32px] bg-[#AD1522] text-white border border-[#AD1522] hover:bg-transparent hover:text-[#AD1522] transition-all duration-[240ms]">
        Ação primária
      </button>
    </div>
  </div>
</section>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Botões radius 5px  |  Cards radius 12px
□ Tipografia Anek/Roboto/Sora corretamente atribuída
□ Sem backdrop-blur, sem gradientes coloridos
□ Todos os estados dos botões implementados
□ Acessibilidade: aria-label, focus-visible ring, contraste ≥ 4.5:1

Agora gere a seção solicitada:`,

    ferramentas: `Você é um Desenvolvedor Front-end Especialista. Gere um Widget ou Calculadora para a Marca A seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ferramentas são usadas dentro de LPs ou como apps standalone. Linguagem visual "fintech moderna",
paleta vermelho. O usuário precisa ler números rápido — hierarquia tipográfica é tudo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CONTAINER E TIPOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
• Título: Anek 700 22px  |  Valor de resultado: Anek 700 36px #AD1522 tabular-nums
• Labels de input: Roboto 500 13px uppercase  |  Texto auxiliar: Roboto 400 12px cinza claro

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. INPUTS E SLIDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-gray-50 rounded-xl px-4 py-3">
  <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Label</label>
  <input class="bg-transparent border-0 text-2xl font-anek font-bold w-full focus:outline-none" />
</div>
• Focus: ring-2 ring-[#AD1522]/30  |  Error: ring-2 ring-red-500/30 + mensagem abaixo
• Slider thumb: 20px circular bg-[#AD1522] border-2 border-white shadow-md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. BOTÕES E RESULTADO (aqui são arredondados)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primário: bg-[#AD1522] text-white rounded-[5px]  |  hover bg-[#BF222F]
• Estados: default → hover → active → focus (ring #AD1522) → disabled → loading (spinner + "Calculando...")

<div class="bg-red-50 rounded-xl p-5 mt-6">
  <p class="font-roboto text-xs uppercase text-[#AD1522]/70">Rótulo do resultado</p>
  <p class="font-anek text-4xl font-bold text-[#AD1522] mt-2 tabular-nums">R$ 1.234.567</p>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ESTADOS OBRIGATÓRIOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Idle (exemplo pré-preenchido)  □ Editando  □ Calculando  □ Resultado (fade-in)
□ Reset  □ Erro de validação  □ Valor zerado  □ Valor máximo (overflow numérico)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Card pai: bg-white + rounded-2xl + shadow-xl
□ Botões rounded-[5px]  |  Valores: tabular-nums + font-anek + #AD1522
□ Todos os 8 estados implementados
□ Responsivo: max-w-md centrado

Agora gere a ferramenta solicitada:`,

    plataforma: `Este contexto não se aplica. A Marca A não utiliza a visão Plataforma EAD.`,
  },

  "marca-b": {
    institucional: `Você é um Desenvolvedor Front-end Especialista. Gere seções de Landing Page ou Site Institucional para a Marca B seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. ESSÊNCIA DA MARCA (inegociável)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A Marca B tem um tom independente, descontraído e editorial — sofisticado e premium.
Glassmorphism é a assinatura visual (cards translúcidos com blur).
❌ NUNCA use o vermelho da Marca A (#AD1522) como cor de fundo, borda ou ícone.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PALETA OFICIAL AZUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Azul principal: #2B76EE  → acentos, ícones, botão primário, slider thumb
• Azul escura:    #08409B  → tipografia de destaque, eyebrow, badges ativos
• Azul profunda:  #0B3B85  → texto sobre fundo claro com forte contraste
• Vermelho da Marca A:  #AD1522  → SOMENTE como cor de texto dentro de botões azul
• Cinza texto: #18181B  |  Cinza secundário: #52525B / #71717A
• Translúcidos: rgba(255,255,255,0.5) / rgba(0,0,0,0.12)
❌ PROIBIDO: vermelho da Marca A como cor de fundo/borda, cores fora da paleta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. FUNDO E CARDS TRANSLÚCIDOS (assinatura visual)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nunca fundo branco chapado — sempre gradiente radial suave:
  background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%);

.marca-b-glass-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 32px;
  transition: transform 320ms ease, box-shadow 320ms ease;
}
.marca-b-glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(43,118,238, 0.25);
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. TIPOGRAFIA E BOTÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• H1: Anek Latin 700  56px / 36px mobile  #18181B
• Corpo: Roboto 400  17px  #52525B
• Eyebrow: Anek 600 13px uppercase, pill bg azul translúcida
• Botões: radius 5px em LP (pílula proibida) — primário bg #2B76EE text #AD1522
  hover: bg transparente border #2B76EE text #18181B
• Estados: default → hover → active → focus (ring #2B76EE) → disabled → loading

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. EXEMPLO DE HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<section style="background: radial-gradient(ellipse at top, #f4f4f5 0%, #e4e4e7 100%); padding: 120px 0;">
  <div class="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-[60px] items-center">
    <div>
      <span class="inline-flex px-3 py-1.5 rounded-full text-[13px] font-anek font-semibold uppercase text-[#08409B] bg-[rgba(43,118,238,0.1)]">
        Eyebrow
      </span>
      <h1 class="font-anek text-[56px] font-bold leading-[1.05] text-[#18181B] mt-6">
        Título editorial com <span class="text-[#08409B]">destaque azul</span>.
      </h1>
      <p class="font-roboto text-[17px] text-[#52525B] mt-6 max-w-[480px]">Texto de apoio curto.</p>
      <div class="flex gap-[15px] mt-[45px]">
        <button class="font-sora font-bold uppercase text-[14px] py-[18px] px-[32px] bg-[#2B76EE] text-[#AD1522] border border-[#2B76EE] hover:bg-transparent hover:text-[#18181B] transition-all duration-[300ms]">
          Ação primária
        </button>
      </div>
    </div>
    <div class="marca-b-glass-card"><!-- conteúdo do card translúcido --></div>
  </div>
</section>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Cards com backdrop-filter: blur(24px)
□ Fundos com gradiente radial (nunca branco chapado)
□ Botões radius 5px em LP — pílula proibida
□ Vermelho da Marca A SOMENTE em texto de botão azul
□ Todos os estados dos botões implementados
□ Acessibilidade: aria-label, focus ring azul, contraste ≥ 4.5:1

Agora gere a seção solicitada:`,

    ferramentas: `Você é um Desenvolvedor Front-end Especialista. Gere uma Calculadora ou Widget para a Marca B seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ferramentas que demonstram conceitos (juros compostos, inflação, aporte, etc.).
Estilo: editorial premium, azul sutil, foco em leitura limpa de números.
❌ NUNCA use o vermelho da Marca A. Aqui o destaque é azul.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CONTAINER, TIPOGRAFIA E INPUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<div class="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-6 max-w-md mx-auto border border-gray-100">
• Valor em destaque: Anek 700 36px #0B3B85 tabular-nums  |  Labels: Roboto 500 13px uppercase
• Inputs: bg-gray-50 rounded-xl  |  Focus: ring-2 ring-[#2B76EE]/40

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. SLIDERS E BOTÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Slider thumb: 22px circular bg-[#2B76EE] border-3 border-white  |  accent-color: #2B76EE
• Primário: bg-[#2B76EE] text-zinc-900 rounded-[5px]  |  hover bg-[#08409B]
• Estados: default → hover → active → focus (ring #2B76EE) → disabled → loading

<div class="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-100">
  <p class="font-roboto text-xs uppercase text-gray-500">Rótulo do resultado</p>
  <p class="font-anek text-4xl font-bold text-[#0B3B85] mt-2 tabular-nums">R$ 1.234.567</p>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. ESTADOS OBRIGATÓRIOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Idle  □ Editando  □ Calculando  □ Resultado (fade-in)  □ Reset
□ Erro de validação  □ Valor zerado  □ Valor máximo (overflow numérico)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Sem vermelho da Marca A — apenas azul e cinzas
□ Slider thumb azul + border branca + shadow
□ Valores: font-anek + tabular-nums + cor #0B3B85
□ Todos os 8 estados implementados

Agora gere a ferramenta solicitada:`,

    plataforma: `Você é um Desenvolvedor Front-end Especialista. Gere interfaces de Plataforma EAD para a Marca B seguindo EXATAMENTE as regras abaixo. Este prompt é autossuficiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. CONTEXTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Plataforma onde o aluno consome aulas, lê materiais e acompanha progresso.
Estética: limpa, clara, focada em leitura longa, sem fadiga visual.
❌ NÃO é o visual translúcido da LP. Aqui é UI funcional sólida.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. LIGHT MODE (padrão) E TIPOGRAFIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Body: bg-gray-50  |  Cards/sidebars: bg-white + border border-gray-200
• Título de módulo: Anek 700 24px  |  Corpo: Roboto 400 16px text-gray-700
• Dark mode alternativo: bg-zinc-950 + cards bg-zinc-900

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. IDENTIDADE AZUL — uso pontual
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cor primária #2B76EE (text-blue-600 #08409B em fundo claro para contraste).
• Aula em curso: bg-blue-50 border-l-4 border-blue-500  |  Badge "Em andamento": bg-blue-100 text-blue-800
• Aulas concluídas: ícone text-emerald-500  |  Bloqueadas: opacity-60 text-gray-400
• Barra de progresso: bg-[#2B76EE] com transition-all

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. VIDEO PLAYER (regra fixa)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Container: sempre bg-black + aspect-video (mesmo em light mode)
• Barra de progresso: h-1 bg-white/20 + fill bg-[#2B76EE]
• Estados: idle (poster) → loading (spinner) → playing → paused → buffering → erro → concluído

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. PLAYLIST DE AULAS (sidebar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<aside class="w-80 bg-white border-l border-gray-200">
  <li class="flex gap-3 px-4 py-3 bg-blue-50 border-l-4 border-blue-500">
    <PlayCircle class="w-5 h-5 text-blue-600 shrink-0" />
    <div><p class="font-anek font-semibold text-sm text-gray-900 truncate">Aula em andamento</p>
    <p class="font-roboto text-xs text-blue-700">Assistindo · 4:21 / 18:00</p></div>
  </li>
</aside>
Estados de item: concluída (CheckCircle emerald) | em andamento (bg-blue-50) | disponível | bloqueada (opacity-60)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. CHECKLIST FINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Light mode como padrão  |  Vídeo sempre bg-black
□ Aula em curso: bg-blue-50 + border-l-4 border-blue-500  |  Concluída: text-emerald-500
□ Player com todos os estados implementados
□ Azul #2B76EE apenas em CTAs, progresso e playlist ativa

Agora gere a interface solicitada:`,
  },
};

// ─── Catálogos de componentes ─────────────────────────────────────────────────

const componentCatalog = {
  institucional: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO — SITES & LPs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use SOMENTE componentes desta lista:

Fundamentos: Marca & Logos | Tipografia (Anek/Roboto/Sora) | Cores + Data Viz | Ícones Phosphor
Layout: Cards & Containers | Botões | Grid e Espaçamento

Seções LP: Grade Curricular | Contagem Regressiva | FAQ Accordion | Tabela de Preços
          Jornada do Herói | Widgets Flutuantes | Calculadora de Rendimentos

Feedback: Tooltip | Toast/Notificação | Popconfirm | Spin | Skeleton | Empty | Result
Navegação: Drawer | Steps/Wizard | Segmented | Tabs | Anchor | Tour
Entrada:   Upload | Rate | AutoComplete | TreeSelect | Transfer | Mentions | Cascader
Exibição:  Statistic | Timeline | Tree | Descriptions | Tabela | Progress Bar | Gráfico Pizza | Watermark`,

  ferramentas: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO — FERRAMENTAS / CALCULADORAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fundamentos aplicáveis: Tipografia | Cores | Ícones Phosphor

Entradas (núcleo): AutoComplete | TreeSelect | Transfer | Cascader | Mentions | Rate | Upload
Resultados:        Statistic/KPI | Gráfico Pizza | Timeline | Descriptions | Tree | Empty | Result
Feedback:          Spin | Skeleton | Toast | Popconfirm (reset) | Tooltip (dicas nos campos)
Navegação:         Steps (multi-step) | Segmented (alternância) | Anchor (resultados longos) | Tour | Drawer (filtros)
Container:         Cards radius 12px | Layout múltiplos de 15px | Botões Sora Bold UPPERCASE`,

  plataforma: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CATÁLOGO COMPLETO — PLATAFORMA EAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Específicos EAD: Visualização de Cursos | Video Player | Playlist | Dashboard do Aluno
                  Notas & Anotações | Avaliação de Aulas | Certificados | Comunidade & Dúvidas

Globais reutilizáveis: Statistic | Timeline | Steps | Tree | Descriptions | Empty | Result | Tour
                        Segmented | Anchor | Tooltip | Toast | Skeleton | Spin | Popconfirm
                        AutoComplete (busca) | Rate (avaliar aula) | Mentions (comentários)
                        Upload (exercícios) | Cascader / TreeSelect (filtros) | Transfer | Watermark
                        Gráfico Pizza (progresso)

Hierarquia obrigatória: Player → Conteúdo → Playlist. Componentes auxiliares são satélites.`,
};

// ─── Componente ───────────────────────────────────────────────────────────────

type TabId = "global" | "componentes";

export function AIFood() {
  const { brand } = useBrand();
  const { view } = useSystemView();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("global");

  const prompt = useMemo(() => {
    const base = masterPrompts[brand]?.[view];
    if (!base) return "Prompt não disponível para esta combinação.";
    const catalog = componentCatalog[view as keyof typeof componentCatalog] ?? "";
    return base + catalog;
  }, [brand, view]);

  const brandLabel = brand === "marca-a" ? "Marca A" : "Marca B";
  const brandColor = brand === "marca-a" ? "text-[#AD1522]/70" : "text-[#2B76EE]/70";
  const promptColor = brand === "marca-a" ? "text-[#F07580]" : "text-[#5593F6]";
  const selectionColor = brand === "marca-a"
    ? "selection:bg-[#F07580]/30 selection:text-white"
    : "selection:bg-[#5593F6]/30 selection:text-white";

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/10">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-anek">AI-Food</h2>
            <p className="text-xs text-muted-foreground font-roboto uppercase tracking-wider">Alimentadores automáticos para qualquer IA</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">Prompt Global</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Alimenta a IA com todas as regras do Design System {brandLabel} para gerar seções do zero.
            </p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">Por Componente</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Cada componente do Design System tem seu próprio AI-Food com código + estados + regras.
            </p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold font-roboto uppercase tracking-wider">100% Isolado</span>
            </div>
            <p className="text-xs text-muted-foreground font-roboto leading-relaxed">
              Cada prompt é autossuficiente: funciona no ChatGPT, Claude, Cursor ou qualquer outra IA.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b">
        <button
          onClick={() => setActiveTab("global")}
          className={`px-4 py-2 text-sm font-medium font-roboto border-b-2 transition-colors ${
            activeTab === "global"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Prompt Global
          </span>
        </button>
        <button
          onClick={() => setActiveTab("componentes")}
          className={`px-4 py-2 text-sm font-medium font-roboto border-b-2 transition-colors ${
            activeTab === "componentes"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Por Componente
          </span>
        </button>
      </div>

      {activeTab === "global" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-roboto leading-relaxed max-w-3xl">
            Master Prompt gerado automaticamente para{" "}
            <strong className="text-foreground">{brandLabel}</strong> /{" "}
            <strong className="text-foreground">{viewLabels[view]}</strong>.
            Inclui paleta, tipografia, botões, cards, layout, componentes disponíveis e checklist completo.
          </p>

          <div className="bg-[#0f172a] rounded-xl overflow-hidden relative border border-[#1e293b] shadow-xl">
            {/* Copy button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="bg-white text-[#0f172a] hover:bg-gray-200 font-bold shadow-lg gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copiado!" : "Copiar Prompt"}
              </Button>
            </div>

            {/* Info bar */}
            <div className="flex items-center gap-2 px-6 pt-4 pb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brandColor}`}>
                {brandLabel}
              </span>
              <span className="text-[#334155]">•</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest font-roboto ${brandColor}`}>
                {viewLabels[view]}
              </span>
              <span className="text-[#334155]">•</span>
              <span className="text-[10px] font-bold uppercase tracking-widest font-roboto text-[#334155]">
                Prompt Standalone
              </span>
            </div>

            {/* Prompt content */}
            <div className="p-6 pt-2 overflow-x-auto max-h-[600px] overflow-y-auto">
              <pre className={`whitespace-pre-wrap font-mono text-[13px] leading-relaxed ${promptColor} ${selectionColor}`}>
                {prompt}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === "componentes" && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold font-anek text-foreground mb-1">
                  AI-Food por componente — como usar
                </p>
                <p className="text-sm text-muted-foreground font-roboto leading-relaxed">
                  Cada componente do Design System tem um botão <strong className="text-foreground">AI-Food</strong> no cabeçalho do showcase.
                  Clique nele para expandir o prompt isolado daquele componente específico — inclui código React,
                  código HTML, regras do Design System e todos os estados visuais obrigatórios.
                  O prompt é 100% standalone: cole direto no ChatGPT, Claude, Cursor ou qualquer IA.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Botões", href: "#buttons", desc: "Primário, Outline, Ghost, Destrutivo — todos os estados (hover, active, focus, disabled, loading)" },
              { label: "Cards & Containers", href: "#cards-containers", desc: "Variantes de fundo claro e escuro, hover com sombra, bordas e padding" },
              { label: "Calculadoras", href: "#tool-calc", desc: "Container, inputs, sliders, caixa de resultado — 8 estados da ferramenta" },
              { label: "Grade Curricular", href: "#grade", desc: "Tabs pill, carrossel mobile, estados de módulo (aberto, fechado, ativo)" },
              { label: "Tabela de Preços", href: "#pricing", desc: "Toggle individual/pacote, badge de desconto, plano em destaque" },
              { label: "Video Player", href: "#plat-player", desc: "7 estados: idle, loading, playing, paused, buffering, error, concluído" },
              { label: "Playlist de Aulas", href: "#plat-playlist", desc: "Estados: concluída, em andamento, disponível, bloqueada" },
              { label: "Jornada do Herói", href: "#journey", desc: "Timeline interativa com glow, progresso e estados de etapa" },
              { label: "Notificações/Toasts", href: "#notifications", desc: "Success, warning, info, error — auto-dismiss 4s, ações inline" },
              { label: "Steps / Wizard", href: "#steps", desc: "Etapas: pendente, atual, concluída, com erro" },
              { label: "Statistic / KPI", href: "#statistic", desc: "Valor principal, delta positivo/negativo, loading skeleton" },
              { label: "Widgets Flutuantes", href: "#floaters", desc: "WhatsApp com pulse, balão de texto, animações de float" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={`Ir para ${item.label} no Design System`}
                className="group rounded-lg border bg-card p-4 flex items-start gap-3 transition-all duration-200 hover:border-accent/60 hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Bot className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold font-anek text-foreground group-hover:underline underline-offset-2">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-roboto mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground font-roboto text-center pt-2">
            As caixas acima levam direto ao componente no Design System. Lá, clique no botão{" "}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-foreground font-bold text-[10px] uppercase tracking-wider">
              <Bot className="h-3 w-3" /> AI-Food
            </span>{" "}
            no cabeçalho do showcase para gerar e copiar o prompt isolado.
          </p>
        </div>
      )}
    </div>
  );
}
