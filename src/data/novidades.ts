/**
 * Fonte única do Mural de Novidades.
 * Consumida pelo Hub (accordion resumido) e pela página /novidades (mural completo).
 */

export interface NovidadeItem {
  emoji: string;
  titulo: string;
  descricao: string;
  /**
   * Comparação opcional "antes/depois" — categoria independente que só
   * renderiza quando ao menos um dos dois campos existe (ex.: um anúncio
   * sem estado anterior claro pode ter só `depois`).
   */
  antes?: string;
  depois?: string;
  /** Resultados/entregas concretas da seção. Categoria independente e opcional. */
  resultados?: string[];
  /** Quem assinou a entrega. Categoria independente e opcional. */
  envolvidos?: string[];
  /**
   * Marca a novidade como destaque do Mural do Hub.
   *
   * O carrossel do Hub reúne os destaques de toda a história — não só os do
   * mês mais recente —, por isso o texto curto do card mora aqui, separado
   * da copy longa da edição do mês. Campos ausentes caem no item.
   */
  destaque?: {
    titulo?: string;
    descricao?: string;
  };
  /** Link externo. Itens sem link não renderizam CTA. */
  link?: string;
}

export interface NovidadeMensal {
  mes: string;
  ano: number;
  intro: string;
  items: NovidadeItem[];
  spoiler: string[];
  rodape?: string;
}

/** Mapa de nome do mês (pt-BR) → número com dois dígitos, para o badge do Mural. */
const MES_NUMERO: Record<string, string> = {
  janeiro: "01", fevereiro: "02", março: "03", marco: "03", abril: "04",
  maio: "05", junho: "06", julho: "07", agosto: "08", setembro: "09",
  outubro: "10", novembro: "11", dezembro: "12",
};

export const mesNumero = (mes: string) => MES_NUMERO[mes.trim().toLowerCase()] ?? "--";

export const novidadesMensais: NovidadeMensal[] = [
  {
    mes: "Julho", ano: 2026,
    intro: "Julho chegou ao fim e o time não parou: tivemos entregas que facilitam a rotina e a jornada de quem usa os nossos produtos. Bora conferir o que rolou neste mês?",
    items: [
      {
        emoji: "🖥️",
        titulo: "Nova versão do Hub",
        descricao: "A nova versão do Hub já está disponível para todos os usuários. Desenvolvemos um visual mais moderno, com funcionalidades pensadas para facilitar ao máximo o acesso a todas as soluções no dia a dia.",
        antes: "O Hub reunia os produtos numa interface antiga, pensada quando o catálogo era bem menor.",
        depois: "Visual novo e funcionalidades que facilitam o acesso a todas as soluções em um só lugar.",
        envolvidos: ["Colaborador 1", "Colaborador 4", "Colaborador 7"],
        destaque: {},
      },
      {
        emoji: "💼",
        titulo: "Novas estratégias de carteira na plataforma",
        descricao: "Lançamos um conjunto de estratégias prontas com rebalanceamento automático dos aportes, sempre alinhadas à filosofia de longo prazo — sem exigir nenhuma venda de ativos.",
      },
      {
        emoji: "📊",
        titulo: "Novo módulo de indicadores",
        descricao: "Subimos um novo módulo exclusivo aprofundando a parte técnica de avaliação de empresas.",
        envolvidos: ["Colaborador 2", "Colaborador 5"],
        destaque: { titulo: "Novo módulo de indicadores" },
      },
      {
        emoji: "🌎",
        titulo: "Novo módulo sobre a ferramenta de análise",
        descricao: "Liberamos um módulo completo ensinando o passo a passo para extrair o máximo da nossa ferramenta de análise.",
        envolvidos: ["Colaborador 3"],
      },
    ],
    spoiler: [
      "🗣️ Sistema de indicações — lançamento em breve",
      "📚 Novo módulo inicial do [Produto A] — em produção",
      "📱 Aplicativo unificado — projeto ganhando forma",
    ],
    rodape: "E com isso, bora para agosto! Caso tenham mais sugestões ou ideias, podem mandar pra gente.",
  },
  {
    mes: "Junho", ano: 2026,
    intro: "Neste mês de junho, como de costume, tivemos uma série de novidades e atualizações. Bora conferir o que o time fez neste mês?",
    items: [
      {
        emoji: "📊",
        titulo: "[Produto A] completamente regravado",
        descricao: "A gente sempre acompanha os feedbacks de vocês e sabe que manter o conteúdo atualizado é essencial para a experiência de aprendizagem. Por isso, concluímos a regravação integral de todas as aulas do treinamento.",
        antes: "Aulas gravadas em versões anteriores, com o conteúdo internacional concentrado em uma única aula.",
        depois: "Treinamento inteiro regravado, com conteúdo 100% atualizado e dividido em partes menores para facilitar o estudo.",
        resultados: [
          "Módulo avançado dividido em partes menores, focadas em análise setorial",
          "Novo módulo sobre o mercado internacional",
          "Último módulo com o conteúdo 100% repaginado",
        ],
        envolvidos: ["Colaborador 3", "Colaborador 6", "Colaborador 9"],
        destaque: {
          titulo: "[Produto A] 100% regravado",
          descricao: "Concluímos a regravação integral e a atualização de todo o conteúdo do [Produto A], focados em manter o padrão de qualidade da experiência de estudo.",
        },
      },
      {
        emoji: "📓",
        titulo: "Cadernos de exercício em todos os módulos",
        descricao: "Para quem sentia falta de colocar o conhecimento em prática, lançamos cadernos de exercícios antes de todas as avaliações. A ideia é simples: deixar o aprendizado mais dinâmico e fixar melhor o conteúdo.",
        antes: "As avaliações vinham logo após as aulas, sem um material de prática entre elas.",
        depois: "Caderno de exercícios disponível antes da avaliação de cada módulo.",
        envolvidos: ["Colaborador 5"],
        destaque: {},
      },
      {
        emoji: "📊",
        titulo: "Comparador de ativos",
        descricao: "Lançamos mais uma funcionalidade para facilitar a vida de quem investe: um comparador exclusivo que permite colocar os ativos lado a lado e analisá-los com base em diferentes indicadores.",
        antes: "Analisar ativos exigia abrir um de cada vez e cruzar os indicadores manualmente.",
        depois: "Comparador coloca os ativos lado a lado por indicador, com destaque para os principais números.",
      },
      {
        emoji: "🎥",
        titulo: "Encontro itinerante com a comunidade",
        descricao: "Neste mês, o encontro itinerante fez mais uma parada. Quem estava presente acompanhou de perto a gravação ao vivo, e ainda teve uma galera que esticou a experiência com o time depois do evento.",
      },
    ],
    spoiler: [
      "🖥️ Nova versão do Hub — lançamento marcado para o início de julho",
      "🗣️ Nova plataforma para o sistema de indicações (em fase de reformulação)",
      "📚 Novo módulo inicial do [Produto A] (em processo de criação)",
    ],
    rodape: "E com isso, bora para julho! Caso tenham mais sugestões ou ideias, podem mandar pra gente.",
  },
  {
    mes: "Maio", ano: 2026,
    intro: "Maio acabou de terminar e, como de costume, o time trabalhou firme para atualizar nossos produtos e lançar novidades. Bora conferir o que rolou por aqui durante o mês?",
    items: [
      {
        emoji: "🏛️",
        titulo: "Treinamento completo para certificação profissional",
        descricao: "Reformulamos completamente a experiência de aprendizado para ajudar quem estuda para certificações do setor a se preparar com foco e confiança.",
        resultados: ["Aulas repaginadas com explicações diretas e objetivas", "Simulados comentados para treinar na prática", "Estrutura otimizada para se encaixar na rotina de estudos"],
      },
      {
        emoji: "📊",
        titulo: "Ranking de ativos e novos vídeos de análise",
        descricao: "Nova funcionalidade para facilitar a vida de quem investe. Os assinantes têm acesso a rankeamentos dos principais ativos com base em diferentes indicadores, além de novos vídeos de análise com o time de especialistas.",
        antes: "Não havia como comparar os ativos com base em indicadores, nem contar com vídeos de análise.",
        depois: "Ranking dos principais ativos por indicador e vídeos de análise do time de especialistas.",
      },
      {
        emoji: "🛠️",
        titulo: "Melhorias no [Produto A]",
        descricao: "Continuamos implementando melhorias técnicas, visuais e de conteúdo no ambiente de aulas. Essas correções só acontecem porque vocês compartilham feedbacks com a gente — obrigado!",
      },
      {
        emoji: "🪩",
        titulo: "Encontro Anual confirmado",
        descricao: "O Encontro Anual está de volta, dessa vez maior. Serão 2 dias completos de imersão com palestras sobre mercado, cenário econômico e negócios, e uma festa de encerramento. Os ingressos do 1º lote já estão à venda!",
      },
    ],
    spoiler: [
      "🗣️ Nova plataforma para o sistema de indicações (em fase de reformulação)",
      "💳 Novo produto financeiro com benefícios exclusivos",
      "📈 Novo módulo de indicadores",
    ],
    rodape: "E com isso, bora para junho! Caso tenham mais sugestões ou ideias, podem mandar pra gente.",
  },
  {
    mes: "Abril", ano: 2026,
    intro: "Abril foi um mês de trabalho intenso, com todo o time reunido para o encontro presencial mais especial do ano. Depois de alguns dias de imersão, voltamos com ainda mais gás para entregar novidades exclusivas.",
    items: [
      {
        emoji: "🔧",
        titulo: "Melhorias técnicas no Hub",
        descricao: "Realizamos melhorias técnicas e corrigimos bugs que atrapalhavam a experiência no Hub, para garantir que a navegação seja cada vez mais fluida e intuitiva.",
      },
      {
        emoji: "📊",
        titulo: "Nova visualização em tabela para análise de ativos",
        descricao: "Nova funcionalidade para comparar ativos de forma prática. Agora dá para visualizar tudo de uma vez e ordenar pelas colunas que mais importam para a sua estratégia.",
      },
      {
        emoji: "📝",
        titulo: "Conteúdo atualizado com as regras vigentes",
        descricao: "Revisamos o módulo bônus para refletir todas as novas obrigatoriedades do período, para os alunos não caírem em nenhuma pegadinha.",
        antes: "Módulo bônus ainda refletia as regras dos anos anteriores.",
        depois: "Todas as novas obrigatoriedades já detalhadas no módulo.",
      },
    ],
    spoiler: [
      "🪩 Vendas do Encontro Anual mais próximas do que nunca",
      "🗣️ Nova plataforma para o sistema de indicações (em fase de prototipação)",
      "💳 Novo produto financeiro com benefícios exclusivos (em breve)",
    ],
    rodape: "Como sempre, feedbacks são muito bem-vindos. Bora para maio!",
  },
];

/** Uma entrega em destaque no Mural do Hub, já resolvida com o mês de origem. */
export interface NovidadeDestaque {
  titulo: string;
  descricao: string;
  mes: string;
  ano: number;
  envolvidos?: string[];
  link?: string;
}

/**
 * Destaques do Mural, varridos de toda a história — e não de um mês fixo.
 * A ordem é a cronológica da fonte (do mais recente para o mais antigo),
 * então basta marcar `destaque` num item para ele entrar no carrossel do Hub.
 */
export const novidadesDestaque: NovidadeDestaque[] = novidadesMensais.flatMap((mes) =>
  mes.items
    .filter((item) => item.destaque)
    .map((item) => ({
      titulo: item.destaque!.titulo ?? item.titulo,
      descricao: item.destaque!.descricao ?? item.descricao,
      mes: mes.mes,
      ano: mes.ano,
      envolvidos: item.envolvidos,
      link: item.link,
    }))
);
