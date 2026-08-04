import type { LucideIcon } from "lucide-react";
import {
  Monitor, Library, Video, Palette, MessageSquareQuote, MessagesSquare,
  Sparkles, Handshake, HeartHandshake, PartyPopper, Smartphone, CreditCard,
} from "lucide-react";
import type { TagTone } from "@/components/widgets/Tag";

/**
 * Marcos do Time de Produto — fonte única da trilha exibida no Hub.
 *
 * A maior parte das datas vem das Atualizações da Escola
 * (`src/data/novidades.ts`), que é o registro mês a mês do que foi
 * entregue. Os marcos que não aparecem lá estão marcados com
 * `dataAssumida: true` — a estimativa está no comentário de cada item e
 * o componente sinaliza a data como aproximada na interface.
 */

export type MarcoStatus = "concluido" | "em-andamento" | "planejado" | "adiado";

export interface Marco {
  id: string;
  /** Ícone do marco (lucide). Substitui o emoji: escala e herda cor. */
  icon: LucideIcon;
  titulo: string;
  /** Rótulo completo da data, exibido no cartão (ex.: "Abril de 2026"). */
  quando: string;
  /** Rótulo curto usado na régua de períodos sob a trilha (ex.: "Abr"). */
  periodo: string;
  /** Data âncora (ISO) — define a ordem cronológica dos marcos na onda. */
  data: string;
  descricao: string;
  status: MarcoStatus;
  tone: TagTone;
  /** Sub-entregas mostradas no painel de detalhe ao selecionar o marco. */
  detalhes?: string[];
  /** Rota interna da Central relacionada ao marco. */
  to?: string;
  /** Link externo relacionado ao marco. */
  href?: string;
  /** Data estimada — não consta nas Atualizações da Escola. */
  dataAssumida?: boolean;
  /** Marco que acontece ao longo de vários meses, sem data única. */
  continuo?: boolean;
  /** Sem data anunciada. A `data` só posiciona o marco na trilha e a
   *  interface mostra "em breve" no lugar de qualquer data. */
  semData?: boolean;
}

export const marcos: Marco[] = [
  {
    id: "hub-v1",
    icon: Monitor,
    titulo: "v1 do Hub",
    quando: "Outubro de 2025",
    periodo: "Out/25",
    data: "2025-10-22",
    status: "concluido",
    tone: "graphite",
    descricao:
      "Primeira versão da Central de Produto: um único lugar para o time acompanhar entregas, roadmap e novidades.",
    detalhes: [
      "Acesso unificado às informações de produto em uma só tela",
      "Base que serviu de aprendizado para a versão seguinte do Hub",
    ],
  },
  {
    id: "modulos",
    icon: Library,
    titulo: "Novo conteúdo liberado na Escola",
    quando: "Fevereiro a julho de 2026",
    periodo: "Fev–Jul",
    data: "2026-02-01",
    status: "em-andamento",
    tone: "violet",
    continuo: true,
    descricao:
      "Uma leva de módulos novos e atualizados entrou no ar ao longo do primeiro semestre.",
    detalhes: [
      "Fevereiro — novo módulo introdutório sobre análise de investimentos",
      "Março — módulo avançado de análise setorial",
      "Abril — conteúdo atualizado com as regras vigentes do período",
      "Junho — módulo prático sobre a ferramenta de análise",
    ],
    to: "/solucoes",
  },
  {
    id: "design-system",
    icon: Palette,
    titulo: "Design System",
    quando: "Abril de 2026",
    periodo: "Abr",
    data: "2026-04-05",
    status: "concluido",
    tone: "magenta",
    descricao:
      "Tokens, componentes e padrões de interface reunidos e documentados — a base visual compartilhada por todos os produtos.",
    detalhes: [
      "Tokens de cor, tipografia e espaçamento com suporte a tema claro e escuro",
      "Biblioteca de componentes documentada e navegável dentro da Central",
      "Escala de cores adequada também para materiais impressos (CMYK)",
    ],
    to: "/design-system",
  },
  {
    id: "tom-e-voz",
    icon: MessageSquareQuote,
    titulo: "Manual de Tom e Voz",
    quando: "Abril de 2026",
    periodo: "Abr",
    data: "2026-04-20",
    status: "concluido",
    tone: "blue",
    descricao:
      "O jeito da empresa de falar virou guia: diretrizes de linguagem por área e por produto, para a comunicação soar como uma só voz.",
    detalhes: [
      "Diretrizes de linguagem para cada área da empresa",
      "Seções específicas por produto",
    ],
    to: "/tom-e-voz",
  },
  {
    id: "qa-design",
    icon: MessagesSquare,
    titulo: "Q&A de Design",
    // Sem data registrada nas Atualizações da Escola. Estimado para maio,
    // logo depois da publicação do Design System e do Manual de Tom e Voz.
    quando: "Maio de 2026",
    periodo: "Mai",
    data: "2026-05-10",
    dataAssumida: true,
    status: "concluido",
    tone: "amber",
    descricao:
      "Rodada aberta de perguntas e respostas do time de Design com a empresa: como pedir, como priorizamos e como usar o Design System no dia a dia.",
    detalhes: [
      "Sessão aberta para tirar dúvidas sobre a esteira de Design",
      "Como abrir uma solicitação e o que o time precisa receber junto",
    ],
  },
  {
    id: "encontros-regionais",
    icon: Video,
    titulo: "Encontros itinerantes com a comunidade",
    quando: "Março a junho de 2026",
    periodo: "Mar–Jun",
    data: "2026-03-15",
    status: "concluido",
    tone: "brick",
    continuo: true,
    descricao:
      "Uma série de encontros presenciais em diferentes cidades, com transmissão ao vivo e um momento de troca com a comunidade.",
    detalhes: [
      "Primeira edição do formato itinerante, em março",
      "Segunda edição, em junho, com after presencial com os membros",
    ],
  },
  {
    id: "encontro-regional-extra",
    icon: Video,
    // Sem data confirmada — a edição foi adiada. A âncora só posiciona o
    // marco na trilha (depois das entregas de julho); a interface não
    // mostra data nenhuma.
    // O minicartão já mostra o estado "Adiada" ao lado; o rótulo de data
    // fala da data em si para os dois não repetirem a mesma palavra.
    titulo: "Encontro itinerante extra",
    quando: "Adiada — nova data a definir",
    periodo: "Sem data",
    data: "2026-07-20",
    status: "adiado",
    tone: "neutral",
    descricao:
      "Uma edição adicional do encontro itinerante foi adiada. Assim que a nova data fechar, ela aparece aqui.",
  },
  {
    id: "hub-v2",
    icon: Sparkles,
    titulo: "Nova versão do Hub",
    quando: "9 de julho de 2026",
    periodo: "Jul",
    data: "2026-07-09",
    status: "concluido",
    tone: "primary",
    descricao:
      "O Hub ganhou uma nova versão: interface redesenhada, dados integrados de ponta a ponta e um só lugar para acompanhar tudo o que o membro tem contratado.",
    detalhes: [
      "Interface migrada para o novo design, com a experiência inteira revista",
      "Integrações entre os principais produtos num só painel",
      "Cards personalizados conforme o que o membro já contratou",
    ],
  },
  {
    id: "treinamento-atendimento",
    icon: HeartHandshake,
    titulo: "Treinamento de atendimento ao cliente",
    quando: "15 de julho de 2026",
    periodo: "Jul",
    data: "2026-07-15",
    status: "concluido",
    tone: "success",
    descricao:
      "Formação do time em produto e experiência do cliente — para que cada ponto de contato com o membro tenha a mesma temperatura.",
    detalhes: [
      "Trilha de produto para quem atende o membro no dia a dia",
      "Padrões de atendimento conectados ao Manual de Tom e Voz",
    ],
    to: "/tom-e-voz",
  },
  {
    id: "sistema-indicacao",
    icon: Handshake,
    titulo: "Sistema de indicação",
    quando: "Agosto de 2026",
    periodo: "Ago",
    data: "2026-08-15",
    status: "planejado",
    tone: "info",
    descricao:
      "Nova plataforma de indicações, com liberação simultânea para os principais produtos.",
    detalhes: [
      "Acompanhamento semanal de indicações e conversões no início da operação",
      "Logística de premiação definida — prêmios físicos e digitais",
    ],
  },
  {
    id: "encontro-anual",
    icon: PartyPopper,
    titulo: "Encontro Anual",
    quando: "7 e 8 de novembro de 2026",
    periodo: "Nov",
    data: "2026-11-07",
    status: "planejado",
    tone: "warning",
    descricao:
      "Dois dias completos de imersão, com palestras sobre mercado, cenário econômico e negócios — e uma festa para fechar.",
    detalhes: [
      "2 dias de imersão presencial",
      "Palestras sobre mercado, cenário econômico e negócios",
      "Festa de encerramento",
    ],
  },
  {
    id: "app-unico",
    icon: Smartphone,
    titulo: "Aplicativo unificado",
    quando: "Dezembro de 2026",
    periodo: "Dez",
    data: "2026-12-01",
    status: "planejado",
    tone: "violet",
    descricao:
      "O aplicativo que reúne os produtos num só lugar, construído de forma colaborativa com a comunidade de devs e designers.",
  },
  {
    // Sem data anunciada — a âncora só o mantém no fim da trilha.
    id: "novo-produto",
    icon: CreditCard,
    titulo: "Novo produto financeiro",
    quando: "Em breve",
    periodo: "Em breve",
    data: "2027-01-01",
    semData: true,
    status: "planejado",
    tone: "graphite",
    descricao:
      "Um novo produto financeiro próprio, com benefícios exclusivos para os membros.",
  },
];

/** Marcos em ordem cronológica — ordem em que aparecem na trilha. */
export const marcosOrdenados: Marco[] = [...marcos].sort((a, b) =>
  a.data < b.data ? -1 : a.data > b.data ? 1 : 0
);

/**
 * Índice do marco em foco na abertura da trilha: o primeiro que ainda não
 * passou (ou, se o ano já acabou, o último da lista).
 */
export function indiceMarcoAtual(ref: Date = new Date()): number {
  const hoje = ref.toISOString().slice(0, 10);
  const i = marcosOrdenados.findIndex((m) => m.data >= hoje);
  return i === -1 ? marcosOrdenados.length - 1 : i;
}

/** Próximo marco ainda por acontecer — usado no destaque do topo do Hub. */
export function proximoMarco(ref: Date = new Date()): Marco | undefined {
  const hoje = ref.toISOString().slice(0, 10);
  return marcosOrdenados.find((m) => m.data >= hoje);
}
