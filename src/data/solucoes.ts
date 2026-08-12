import {
  GraduationCap, RefreshCw, Award, Layers, BarChart3, Globe2, Table2,
  Video, Users, BookOpen, Wrench, ShieldCheck, LineChart,
  type LucideIcon,
} from "lucide-react";

/**
 * Nossas Soluções — guia genérico dos produtos digitais da marca. Os dados
 * vivem aqui; a renderização fica em src/pages/SolucoesPage.tsx.
 */

/* ============================================================
   Navegação (subnav da página + busca global)
   ============================================================ */

export interface SolucaoSection {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Âncoras internas da seção (aparecem na busca global). */
  anchors: { id: string; label: string }[];
}

export const solucoesSections: SolucaoSection[] = [
  {
    id: "produto-a", label: "[Produto A]", icon: GraduationCap,
    anchors: [
      { id: "produto-a-sobre", label: "O que é" },
      { id: "produto-a-recursos", label: "Recursos" },
    ],
  },
  {
    id: "produto-b", label: "[Produto B]", icon: RefreshCw,
    anchors: [
      { id: "produto-b-sobre", label: "O que é" },
      { id: "produto-b-recursos", label: "Recursos" },
    ],
  },
  {
    id: "produto-c", label: "[Produto C]", icon: Award,
    anchors: [
      { id: "produto-c-sobre", label: "O que é" },
      { id: "produto-c-recursos", label: "Recursos" },
    ],
  },
  {
    id: "produto-d", label: "[Produto D]", icon: BarChart3,
    anchors: [
      { id: "produto-d-sobre", label: "O que é" },
      { id: "produto-d-recursos", label: "Recursos" },
    ],
  },
  {
    id: "produto-e", label: "[Produto E]", icon: Globe2,
    anchors: [
      { id: "produto-e-sobre", label: "O que é" },
      { id: "produto-e-recursos", label: "Recursos" },
    ],
  },
  /* Fecho da página: a tabela-resumo vem depois de todos os produtos. Como é
     uma seção de síntese, e não de um produto, não tem cor de marca. */
  { id: "resumo", label: "Resumo", icon: Table2, anchors: [] },
];

/* ============================================================
   Tipos compartilhados
   ============================================================ */

export interface FeatureItem {
  icon: LucideIcon;
  /** Prefixo em negrito (opcional). */
  destaque?: string;
  texto: string;
}

export interface QuickInfo {
  tipo: "investimento" | "acesso";
  texto: string;
}

export interface ProdutoSolucao {
  /** Mesmo id da seção correspondente em `solucoesSections`. */
  id: string;
  badge: string;
  nome: string;
  paraQuemE: string;
  oQueE: string;
  info: QuickInfo[];
  recursos: FeatureItem[];
}

/* ============================================================
   Produtos
   ============================================================ */

export const produtosSolucoes: ProdutoSolucao[] = [
  {
    id: "produto-a",
    badge: "Educação",
    nome: "[Produto A]",
    paraQuemE: "Quem está começando e precisa de uma base sólida sobre o tema, do zero ao avançado.",
    oQueE: "Um treinamento estruturado em módulos, com aulas gravadas, comunidade de apoio e material complementar para aplicar o conteúdo na prática.",
    info: [
      { tipo: "investimento", texto: "Pagamento único ou parcelado" },
      { tipo: "acesso", texto: "Acesso por tempo determinado" },
    ],
    recursos: [
      { icon: Video, destaque: "Aulas gravadas:", texto: "conteúdo disponível a qualquer hora, no ritmo de quem estuda." },
      { icon: Users, destaque: "Comunidade:", texto: "espaço para tirar dúvidas e trocar experiências com outros alunos." },
      { icon: BookOpen, destaque: "Material de apoio:", texto: "resumos e guias complementares às aulas." },
    ],
  },
  {
    id: "produto-b",
    badge: "Assinatura",
    nome: "[Produto B]",
    paraQuemE: "Quem já concluiu o treinamento inicial e quer conteúdo novo e ferramentas de forma contínua.",
    oQueE: "Uma assinatura recorrente com módulos extras, atualizados com frequência, além de acesso a ferramentas exclusivas para assinantes.",
    info: [
      { tipo: "investimento", texto: "Mensal ou anual" },
      { tipo: "acesso", texto: "Enquanto a assinatura estiver ativa" },
    ],
    recursos: [
      { icon: RefreshCw, destaque: "Conteúdo sempre novo:", texto: "módulos extras adicionados com regularidade." },
      { icon: Wrench, destaque: "Ferramentas exclusivas:", texto: "acesso contínuo a recursos de apoio à decisão." },
      { icon: Users, destaque: "Encontros periódicos:", texto: "sessões ao vivo para tirar dúvidas com a equipe." },
    ],
  },
  {
    id: "produto-c",
    badge: "Certificação",
    nome: "[Produto C]",
    paraQuemE: "Profissionais que buscam uma certificação reconhecida do setor ou querem se especializar.",
    oQueE: "Uma trilha de ensino profissionalizante, com conteúdo direcionado para as principais certificações da área.",
    info: [
      { tipo: "investimento", texto: "Por certificação" },
      { tipo: "acesso", texto: "Acesso por 1 ano" },
    ],
    recursos: [
      { icon: Award, destaque: "Trilha direcionada:", texto: "conteúdo específico para cada certificação." },
      { icon: BookOpen, destaque: "Simulados:", texto: "exercícios com resolução comentada." },
      { icon: Users, destaque: "Comunidade dedicada:", texto: "espaço para trocar experiências sobre as certificações." },
    ],
  },
  {
    id: "produto-d",
    badge: "Dados e ferramentas",
    nome: "[Produto D]",
    paraQuemE: "Quem busca dados confiáveis e ferramentas de análise para apoiar suas próprias decisões.",
    oQueE: "Uma plataforma de consulta de dados, com indicadores e comparativos para apoio à análise — sem recomendações de compra ou venda.",
    info: [
      { tipo: "investimento", texto: "Plano gratuito e planos pagos" },
      { tipo: "acesso", texto: "Assinatura contínua" },
    ],
    recursos: [
      { icon: BarChart3, destaque: "Indicadores atualizados:", texto: "dados replicados de fontes públicas confiáveis." },
      { icon: ShieldCheck, destaque: "Uso pessoal:", texto: "ferramenta de apoio à análise, sem recomendações automáticas." },
    ],
  },
  {
    id: "produto-e",
    badge: "Especialização",
    nome: "[Produto E]",
    paraQuemE: "Quem busca expandir o conhecimento para além do mercado local.",
    oQueE: "Um treinamento avançado com módulos dedicados a estratégias, ferramentas e particularidades do cenário internacional.",
    info: [
      { tipo: "investimento", texto: "Pagamento único" },
      { tipo: "acesso", texto: "Acesso por 1 ano" },
    ],
    recursos: [
      { icon: Globe2, destaque: "Visão global:", texto: "fundamentos e estratégias aplicadas a outros mercados." },
      { icon: LineChart, destaque: "Conteúdo avançado:", texto: "módulos voltados a quem já tem uma base consolidada." },
    ],
  },
];

/* ============================================================
   Resumo de Produtos — derivado dos produtos acima
   ============================================================ */

export interface ResumoProduto {
  id: string;
  produto: string;
  investimento: string;
  paraQuemE: string;
  acesso: string;
}

export const resumoProdutos: ResumoProduto[] = produtosSolucoes.map((p) => ({
  id: p.id,
  produto: p.nome,
  investimento: p.info.find((i) => i.tipo === "investimento")?.texto ?? "—",
  paraQuemE: p.paraQuemE,
  acesso: p.info.find((i) => i.tipo === "acesso")?.texto ?? "—",
}));
