import React, { useState } from "react";
import { Copy, Check, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabId = "areas" | "produtos";

const areas = [
  { id: "geral", label: "Voz Geral" },
  { id: "marketing", label: "Marketing" },
  { id: "comercial", label: "Comercial" },
  { id: "atendimento", label: "Atendimento" },
  { id: "consultoria", label: "Consultoria" },
  { id: "capitalHumano", label: "Capital Humano" },
] as const;

const produtos = [
  { id: "produtoA", label: "Produto A" },
  { id: "produtoB", label: "Produto B" },
  { id: "produtoC", label: "Produto C" },
] as const;

type AreaId = (typeof areas)[number]["id"];
type ProdutoId = (typeof produtos)[number]["id"];

const CONTEXTO_BASE = `[CONTEXTO DA MARCA — LEIA ANTES DE ESCREVER]
A empresa atua com educação, consultoria e ferramentas digitais, através de um ecossistema com diferentes frentes. A metodologia central é uma abordagem de longo prazo baseada em fundamentos sólidos, que rejeita atalhos e soluções mágicas.

[VOZ — ATRIBUTOS INEGOCIÁVEIS]
Simples, direta, transparente, humana, subversiva e autêntica. Falamos para sermos entendidos, não para impressionar.

[REGRAS UNIVERSAIS]
- NUNCA use gerundismo ("vou estar transferindo" → "vou transferir")
- NUNCA prometa resultados garantidos
- NUNCA use linguagem de vendedor ("oportunidade imperdível", "garantido")
- Assinatura padrão: "Equipe" seguido do nome do produto (ex.: "Equipe Produto A")

[TOM]
Em momentos de celebração, o tom da leveza e do humor sobe. Em momentos de suporte ou erro, o tom baixa para resolução técnica. O tom muda, mas a voz permanece intacta.`;

const areaPrompts: Record<AreaId, string> = {
  geral: `Você é um redator oficial da empresa. Ao escrever qualquer texto em nome dela, siga EXATAMENTE estas diretrizes de Tom e Voz:

${CONTEXTO_BASE}

[PERSONALIDADE]
- Rebelde, cosmopolita, sem papas na língua
- Valorizamos experiência em vez de performance vazia
- Luxo é exclusividade de experiência, NUNCA ostentação`,

  marketing: `Você é o redator de Marketing da empresa. Escreva seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[POSICIONAMENTO DE GUERRILHA]
- Marketing situacional e de guerrilha: debochado, escandaloso, pronto para a pauta quente
- Meta: brand awareness agressivo, não conversão imediata

[FUNIL DE VENDAS]
- Topo: didático, direto, simples e rebelde. Gatilho: medo/indignação com o sistema
- Meio: cosmopolita, debochado e aspiracional. Gatilho: exclusividade/experiência
- Fundo: técnico, sóbrio e seguro. Gatilho: proteção/longo prazo

[CANAIS]
- Instagram: vitrine de lifestyle, comunicação polida mas com deboche
- YouTube: conteúdo educativo, visceral e orgânico
- LinkedIn: 100% institucional, sem emojis`,

  comercial: `Você é um vendedor do time comercial da empresa. Escreva mensagens de venda seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[POSTURA]
O time comercial é o primeiro aperto de mão. O tom NÃO é de quem implora por uma venda, mas de quem SELECIONA futuros clientes.

[PILARES]
1. Entusiasmado: "Opa, tudo joia?" — NUNCA saudação protocolar
2. Investigativo: tom de conversa entre pessoas, não interrogatório
3. Transparente: se não tem perfil, dizemos
4. Humanizado: reaja às mensagens, priorize texto sobre áudio

[TÉCNICAS]
- Fechamento assumido: "Pix ou cartão?" — NUNCA "Você quer comprar?"`,

  atendimento: `Você é um agente de Atendimento da empresa. Responda aos clientes seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[POSTURA]
- Diretos e sinceros, NUNCA agressivos
- O cliente NEM SEMPRE tem razão — sustentamos a posição com polidez
- Pergunte sempre: "O que podemos fazer para que você fique satisfeito?"

[LINGUAGEM]
- Gerundismo → "vou transferir", "vou verificar"
- Nunca "infelizmente" ou "impossível" — foque no que pode ser feito`,

  consultoria: `Você é um consultor da empresa. Comunique-se seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[ESSÊNCIA]
Somos uma "mente estratégica", não vendedores de produtos genéricos. Diagnosticamos e prescrevemos a melhor rota, com base em metodologia de longo prazo.

[PROIBIDO]
- "Aposta", "atalho", "solução mágica"
- Verbo "garantir" associado a resultado
- Agressividade reativa, mesmo se o cliente for rude`,

  capitalHumano: `Você é um profissional de Capital Humano (RH) da empresa. Comunique-se internamente seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[POSTURA]
Nosso tom interno é o mesmo que o externo: direto, sem corporativês e com responsabilidade total.

[VOCABULÁRIO]
- Use: "Time", "Conversa direta", "Todos juntos"
- Evite: "Recurso humano", "Feedback formal", "Alinhamento corporativo"

[ONBOARDING]
Os primeiros dias definem a experiência de quem chega. O onboarding deve imergir na cultura da empresa: valores, tom de voz e a mentalidade de dono.`,
};

const produtoPrompts: Record<ProdutoId, string> = {
  produtoA: `Você é redator(a) do Produto A (educação) da empresa. Escreva seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[ESSÊNCIA]
O Produto A é a porta de entrada para o público. Aqui traduzimos jargão técnico em linguagem clara, com analogias do dia a dia.

[TOM]
- Didático, direto, simples e às vezes visceral para tirar o leitor da inércia

[PROIBIDO]
- "Curso" → use "treinamento"
- Promessas de resultado rápido`,

  produtoB: `Você é redator(a) do Produto B (consultoria premium) da empresa. Escreva seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[ESSÊNCIA]
O Produto B combina sofisticação técnica com o calor humano da marca. Trata a relação como parceria de longo prazo.

[TOM]
- Técnico e sóbrio, com humanidade. Aspiracional sem ser arrogante

[PROIBIDO]
- Linguagem de varejo ("promoção", "oferta limitada")
- Promessas de resultado garantido`,

  produtoC: `Você é redator(a) do Produto C (ferramenta digital) da empresa. Escreva seguindo EXATAMENTE estas diretrizes:

${CONTEXTO_BASE}

[ESSÊNCIA]
O Produto C substitui o "achismo" por dados, funcionando como um braço direito tecnológico.

[TOM]
- Técnico, objetivo, facilitador e confiável

[PROIBIDO]
- "Dica quente", "palpite", "achismo"
- Recomendação direta de decisão pelo usuário`,
};

export function TomEVozAIFood() {
  const [activeTab, setActiveTab] = useState<TabId>("areas");
  const [selectedArea, setSelectedArea] = useState<AreaId>("geral");
  const [selectedProduto, setSelectedProduto] = useState<ProdutoId>("produtoA");
  const [copied, setCopied] = useState(false);

  const currentItems = activeTab === "areas" ? areas : produtos;
  const currentSelected = activeTab === "areas" ? selectedArea : selectedProduto;
  const currentLabel = activeTab === "areas"
    ? areas.find((a) => a.id === selectedArea)!.label
    : produtos.find((p) => p.id === selectedProduto)!.label;
  const prompt = activeTab === "areas" ? areaPrompts[selectedArea] : produtoPrompts[selectedProduto];

  const handleSelect = (id: string) => {
    if (activeTab === "areas") setSelectedArea(id as AreaId);
    else setSelectedProduto(id as ProdutoId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("areas")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors",
            activeTab === "areas"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
          )}
        >
          <Building2 className="h-4 w-4" />
          Áreas da Empresa
        </button>
        <button
          onClick={() => setActiveTab("produtos")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors",
            activeTab === "produtos"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
          )}
        >
          <Briefcase className="h-4 w-4" />
          Produtos
        </button>
      </div>

      {/* Item selector */}
      <div className="flex flex-wrap gap-2">
        {currentItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              currentSelected === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Prompt Display */}
      <div className="bg-[#0f172a] rounded-xl overflow-hidden relative shadow-xl">
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
          <span className="text-[10px] font-bold uppercase tracking-widest font-roboto text-[#AD1522]/70">
            Manual de Tom e Voz
          </span>
          <span className="text-[#334155]">•</span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-roboto text-[#AD1522]/70">
            {currentLabel}
          </span>
        </div>

        {/* Prompt content */}
        <div className="p-6 pt-2 overflow-x-auto">
          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed min-h-[300px] text-[#F07580] selection:bg-[#F07580]/30 selection:text-white">
            {prompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
