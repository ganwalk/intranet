/* ===================================================================
 *  TOM E VOZ — Dados do Manual de Tom e Voz
 *  Guia de comunicação verbal da marca: vocabulário, exemplos e
 *  diretrizes de voz para as áreas e produtos da empresa.
 * =================================================================== */

/* ------------------------------------------------------------------ */
/*  DICIONÁRIO DO MANUAL                                               */
/* ------------------------------------------------------------------ */

export const dicionario = [
  { termo: "Brand awareness", definicao: "Consciência ou reconhecimento de marca; o quanto a marca é conhecida e lembrada pelo público-alvo." },
  { termo: "Branding", definicao: "Gestão da marca que garante que a empresa não pareça \"só mais uma\" no mercado, englobando cultura, estilo e jeito de comunicar." },
  { termo: "Buy and hold", definicao: "Estratégia de investimento de longo prazo baseada em fundamentos sólidos, ignorando oscilações diárias." },
  { termo: "Canais", definicao: "Meios por onde a marca chega ao público, como redes sociais, e-mail ou WhatsApp." },
  { termo: "Chatbot", definicao: "Ferramenta de mensagens automatizadas para garantir agilidade no primeiro contato." },
  { termo: "Churn", definicao: "Indicador de quando um cliente cancela ou sai da base; o objetivo é mantê-lo o mais baixo possível." },
  { termo: "Lead", definicao: "Contato de alguém que demonstrou interesse em se tornar cliente." },
  { termo: "Stakeholder", definicao: "Todas as partes interessadas no negócio, de sócios e colaboradores a fornecedores e investidores." },
];

/* ------------------------------------------------------------------ */
/*  INTRODUÇÃO AO MANUAL                                              */
/* ------------------------------------------------------------------ */

export const introducaoManual = {
  titulo: "O que você vai encontrar neste manual?",
  paragrafos: [
    "Este não é mais um manual de redação institucional para ficar esquecido em uma pasta de rede. É o guia de comunicação verbal da empresa: sempre que você precisar falar ou escrever em nome dela, é aqui que você deve buscar orientação. Mapeamos o que funciona, o que é real e o que é terminantemente proibido.",
    "Seja em uma conversa entre colegas, em um atendimento a clientes ou diante da imprensa, a regra é uma só: precisamos soar como uma única voz. Leia, entenda e aplique — se a comunicação não for clara, ela não serve.",
  ],
};

/* ------------------------------------------------------------------ */
/*  TOM E VOZ — O que é isso?                                         */
/* ------------------------------------------------------------------ */

export const tomEVozIntro = {
  titulo: "Tom e Voz? O que é isso?",
  paragrafos: [
    "Se a empresa fosse uma pessoa, ela não seria um robô de terno repetindo scripts prontos. Ela teria opinião, jeito próprio de falar e uma verdade inegociável. Principalmente em mercados onde todo mundo tenta parecer inteligente usando palavras difíceis, a nossa identidade é o que nos separa da manada.",
    "Ter um Tom e uma Voz definidos não é sobre seguir regras gramaticais. É sobre garantir que, seja em um post ou em um e-mail, o cliente sinta que está falando com a mesma empresa.",
  ],
};

/* ------------------------------------------------------------------ */
/*  VOZ                                                                */
/* ------------------------------------------------------------------ */

export const vozDefinicao = {
  titulo: "Voz",
  paragrafos: [
    "A voz é aquilo que não muda, não importa o cenário. A nossa voz é simples, direta, transparente e humana. Não falamos para impressionar — falamos para sermos entendidos.",
    "Além disso, a nossa voz é subversiva: não temos medo de questionar o status quo do mercado. E é autêntica: falamos com a confiança de quem não precisa de máscaras para se comunicar.",
  ],
  atributos: ["Simples", "Direta", "Transparente", "Humana", "Subversiva", "Autêntica"],
};

/* ------------------------------------------------------------------ */
/*  TOM                                                                */
/* ------------------------------------------------------------------ */

export const tomDefinicao = {
  titulo: "Tom",
  paragrafos: [
    "Se a voz é o que dizemos, o tom é como dizemos. Ele é o ajuste que fazemos dependendo do momento. Você não fala com um lead da mesma forma que fala em uma reunião de resultados.",
    "Por isso, ao escrever, leia o cenário. Temos senso de humor e liberdade para sermos ácidos e inteligentes quando o contexto permite, sem nunca perder a classe. Tenha em mente as seguintes regras:",
  ],
  regras: [
    { contexto: "Em momentos de celebração", descricao: "O tom da nossa leveza e do humor sobe." },
    { contexto: "Em momentos de suporte ou erro", descricao: "O tom baixa para a resolução técnica." },
  ],
  conclusao: "O tom muda, mas a nossa voz permanece intacta. Se o contexto exigir seriedade, seja sóbrio, mas continue sendo a marca. Se permitir humor, seja engraçado, mas continue sendo a marca.",
};

/* ------------------------------------------------------------------ */
/*  A VOZ DA LIDERANÇA                                                 */
/* ------------------------------------------------------------------ */

export const vozFundador = {
  titulo: "A voz da liderança",
  paragrafos: [
    "Toda empresa é guiada por uma liderança, e o tom e a voz da marca são uma extensão direta da forma como ela vê o mundo. Por isso, entender como a liderança se comunica é entender a alma do negócio.",
    "Mas é preciso ter em mente uma distinção clara: a liderança é formada por pessoas reais, e como tal, sua personalidade pode ser visceral e imprevisível. Já a marca é a institucionalização desse espírito, mantendo pilares predefinidos para garantir a constância da comunicação.",
    "Ao abordar temas pessoais, a liderança não tem medo de ser vulnerável. Ela utiliza um tom emotivo, estabelecendo uma conexão humana ao compartilhar experiências reais — essa crueza gera uma identificação imediata que nenhuma linguagem institucional \"perfeita\" conseguiria replicar.",
    "A comunicação é, acima de tudo, sem rodeios: clareza absoluta e transparência total, eliminando burocracias linguísticas. É didática, mas nunca rebuscada ou monótona.",
  ],
  comoNaoComunicar: {
    titulo: "Como NÃO se comunicar na voz da liderança",
    intro: "Vai escrever um e-mail, post ou carta que será assinada pela liderança? Preste atenção nos erros que você não pode cometer:",
    itens: [
      "Ser vago ou genérico",
      "Usar linguagem excessivamente formal",
      "Usar jargões ou termos excessivamente técnicos",
      "Fazer afirmações sem empatia ou reconhecimento",
      "Fazer promessas irreais ou soluções mágicas",
    ],
  },
  exemplosErros: [
    {
      erro: "Hoje, vamos falar sobre finanças de forma geral.",
      correcao: "Se você não aprende a cuidar do seu dinheiro, alguém vai cuidar dele por você... e eu te garanto que não vai ser a seu favor.",
      porque: "Frases de impacto direcionam o público para algo relevante. Ser vago prejudica a conexão emocional.",
    },
    {
      erro: "Prezados seguidores, gostaria de compartilhar as últimas análises sobre o mercado financeiro.",
      correcao: "Então vamos lá!? Hoje eu vou falar sobre o atual momento do mercado. Vou te mostrar o que realmente importa: onde está o risco e onde está a oportunidade.",
      porque: "A comunicação é descontraída e próxima. Um tom formal cria distância com o público.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  MARKETING                                                          */
/* ------------------------------------------------------------------ */

export const marketing = {
  titulo: "Marketing",
  personalidade: {
    titulo: "A personalidade da marca",
    paragrafos: [
      "Nossa personalidade é inspirada em quem tem opinião própria: rebelde, cosmopolita e sem papas na língua. Valorizamos a experiência em vez da performance vazia.",
      "Nosso tom é o de quem tem repertório, mas mantém os pés no chão. Somos sofisticados o suficiente para ter autoridade, e autênticos o suficiente para não perder a essência.",
    ],
  },
  guerrilha: {
    titulo: "O posicionamento de guerrilha",
    paragrafo: "Não temos a pretensão de ser a maior marca do mercado, mas temos a obrigação de ser a que faz mais barulho. O nosso marketing é situacional e de guerrilha: se o consenso vai para um lado, apontamos as falhas e subvertemos o padrão. Nossa meta não é a conversão imediata, mas o brand awareness agressivo.",
  },
  luxo: {
    titulo: "Luxo e exclusividade",
    paragrafo: "Para nós, luxo não é ostentação. Odiamos o exibicionismo vazio. O nosso luxo é a exclusividade da experiência: curiosidade, cultura e valor, nunca apenas preço.",
  },
  liberdadeMedo: {
    titulo: "A liberdade e o uso estratégico do medo",
    paragrafo: "Vendemos de duas formas complementares. Primeiro, através da liberdade: o lado inspiracional do que uma decisão bem tomada proporciona. Segundo, o que move o ponteiro é o medo — exploramos as urgências reais que o público enfrenta.",
  },
  donts: {
    titulo: "Os \"Dont's\" e limites inegociáveis",
    intro: "Para manter a nossa essência, existem termos e posturas que são terminantemente proibidos:",
    itens: [
      { proibido: "Ostentação e termos de enriquecimento rápido.", motivo: "Não nos importamos com o preço, mas sim com o valor da exclusividade e experiência." },
      { proibido: "Estrangeirismos e palavras em inglês sem necessidade.", motivo: "Abrimos exceções apenas para termos já consolidados no público de alta renda." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  CANAIS                                                             */
/* ------------------------------------------------------------------ */

export const canaisData = {
  intro: "Operamos múltiplas identidades que se complementam no funil, mas mantêm independências:",
  canais: [
    { nome: "Instagram", descricao: "A nossa vitrine de lifestyle. Comunicação mais polida, mas sem perder o deboche. É o canal para vender a experiência da marca." },
    { nome: "YouTube", descricao: "Onde a autoridade dos nossos especialistas aparece de forma visceral e orgânica, com conteúdo educativo e próximo." },
    { nome: "LinkedIn", descricao: "O único lugar onde o emoji morre. Aqui, o tom é 100% institucional, focado em autoridade e mercado." },
  ],
};

/* ------------------------------------------------------------------ */
/*  FUNIL DE VENDAS                                                    */
/* ------------------------------------------------------------------ */

export const funilVendas = [
  { etapa: "Topo (Conteúdo educativo)", tom: "Didático, direto, simples e rebelde", gatilho: "Medo / Indignação com o sistema" },
  { etapa: "Meio (Anúncios / Landing pages)", tom: "Cosmopolita, debochado e aspiracional", gatilho: "Exclusividade / Experiência / Provas sociais" },
  { etapa: "Fundo (Consultoria / Produtos premium)", tom: "Técnico, sóbrio e seguro", gatilho: "Proteção / Longo prazo" },
];

/* ------------------------------------------------------------------ */
/*  TIME COMERCIAL                                                     */
/* ------------------------------------------------------------------ */

export const comercial = {
  titulo: "Time comercial",
  intro: "O time comercial é o primeiro aperto de mão que o cliente recebe. O tom não é de quem implora por uma venda, mas de quem seleciona futuros clientes. Somos entusiastas, diretos e, acima de tudo, honestos. Se a empresa não for para ele, deixamos claro logo de cara. Se for, não deixamos ele perder a oportunidade.",
  pilares: {
    intro: "A comunicação do time comercial se apoia em 4 pilares fundamentais:",
    itens: [
      { nome: "Entusiasmado", descricao: "Saudamos com um cumprimento em tom de empolgação, um equilíbrio entre comunicação formal e informal. Sem aquele \"bom dia, como posso te ajudar?\" protocolar." },
      { nome: "Investigativo", descricao: "Não vendemos um simples produto, vendemos solução de vida. O tom é de uma conversa informal entre pessoas, não um interrogatório." },
      { nome: "Transparente", descricao: "Se o cliente não tem o perfil adequado, somos transparentes em dizer isso. Se tem, deixamos claro que a decisão é dele, mas a oportunidade é agora." },
      { nome: "Humanizado", descricao: "O nosso atendimento é humano, não robotizado. Reagimos às mensagens, usamos emojis e fazemos comentários breves que validam a vida do lead." },
    ],
  },
  audio: {
    titulo: "Quebre o padrão e envie áudio APENAS nestes 3 cenários",
    itens: [
      "Complexidade: quando uma explicação complexa se torna um \"textão\" confuso;",
      "Espelhamento: se o lead mandou áudio, ele te deu permissão para responder com áudio;",
      "Prova de vida: se o lead desconfiar que está falando com uma IA/bot.",
    ],
  },
  dicas: {
    titulo: "Dicas valiosas",
    itens: [
      "Fechamento assumido. Não pergunte \"se\" ele quer comprar. Pergunte \"como\". A venda é a consequência natural de uma boa conversa.",
      "Personalize sempre. Responda de acordo com o que o cliente realmente disse, nunca com script copiado e colado.",
    ],
  },
  exemplos: [
    { erro: "\"Você quer comprar o nosso produto?\"", correcao: "\"Você prefere pagar no crédito ou no pix?\"" },
    { erro: "Falar com desespero, dando a entender que precisamos do dinheiro dele.", correcao: "O gatilho de urgência serve para ajudar o cliente a parar de procrastinar, não para \"bater meta\" a qualquer custo." },
    { erro: "Linguagem muito formal e que gera distanciamento.", correcao: "Adaptar a comunicação ao jeito do cliente falar é essencial para ele se sentir à vontade." },
  ],
  fluxo: {
    titulo: "Fluxo de comunicação para o vendedor colar na parede",
    itens: [
      "Saudação: \"Opa, tudo bem?\";",
      "Entender a dor e o contexto (criar o vínculo);",
      "Solução — mostrar como resolve a dor identificada;",
      "Qualificar o interesse e entender se a oferta faz sentido para o lead;",
      "Fechamento direto, sem dar chance para o \"vou pensar\";",
      "Acompanhamento até a confirmação do pagamento.",
    ],
  },
  passoPasso: "Temos um passo a passo a ser seguido, e todas as perguntas centrais são obrigatórias. Mas você pode (e deve) fazer outras perguntas quando for conveniente, para se aproximar mais do cliente e entender melhor o cenário.",
};

/* ------------------------------------------------------------------ */
/*  ATENDIMENTO                                                        */
/* ------------------------------------------------------------------ */

export const atendimento = {
  titulo: "Atendimento",
  paragrafos: [
    "O cliente nem sempre tem razão. Não temos medo de sustentar nossa posição ou esclarecer fatos, desde que com polidez. Buscamos a resolução real, não o \"agrado\" superficial. Em todo atendimento com conflito, adotamos como padrão o questionamento: \"O que podemos fazer para que você fique satisfeito?\"",
    "Somos diretos e sinceros, mas nunca agressivos, mesmo diante de grosserias. Não somos robôs de script. O cliente deve sentir que você conhece o histórico dele — não peça para ele explicar tudo de novo.",
  ],
  personalizacao: {
    titulo: "Cada atendimento é personalizado",
    paragrafo: "Se o cliente é formal, responda com sobriedade. Se ele usa gírias e emojis, você tem permissão para ser leve e descontraído. O importante é gerar conexão e mostrar que não somos um robô.",
  },
  cuidados: {
    titulo: "Cuidados que precisamos tomar",
    paragrafos: [
      "Menções a sites públicos de reclamação interrompem qualquer tentativa de retenção. Em vez disso, cancelamos e reembolsamos imediatamente para proteger a imagem da marca. Não discutimos com o cliente.",
      "Em situações que envolvem clientes grosseiros, nossa arma é a educação extrema. Somos refinados e atendemos bem para que o cliente repense sobre sua própria atitude.",
    ],
  },
  erros: {
    titulo: "Como corrigimos erros",
    intro: "Somos passíveis de erros, mas a forma como lidamos com cada um deles é o que demonstra a nossa eficiência:",
    itens: [
      { tipo: "Erro pequeno", descricao: "Resolva rápido e com discrição, sem fazer ruído desnecessário." },
      { tipo: "Erro grave (dinheiro / acesso)", descricao: "Reconhecimento total, pedido de desculpas sincero e humildade. A transparência é o que retém o cliente." },
    ],
  },
  diretrizesLinguisticas: {
    titulo: "Diretrizes linguísticas e vocabulário inegociável",
    intro: "A escrita é a nossa carta de apresentação. Erros de português mancham nossa autoridade.",
    tabela: [
      { proibido: "Gerundismo (Ex.: vou estar transferindo)", use: "Vou transferir, vou verificar" },
      { proibido: "Clichês de call center (aguarde na linha)", use: "Linguagem direta e humana" },
      { proibido: "\"Gritar\" em caixa alta (caps lock)", use: "Use apenas para siglas ou tickers" },
      { proibido: "Figurinhas e gifs", use: "Emojis moderados (conforme o cliente permitir)" },
      { proibido: "Palavras negativas como \"infelizmente\" ou \"impossível\"", use: "Foque no que pode ser feito ou explique a regra de forma objetiva" },
    ],
  },
  audioTexto: {
    titulo: "Como nos comunicamos por áudio ou por texto?",
    paragrafos: [
      "O padrão de mensagens seguido pelo nosso time de atendimento é o de texto. Conversas em formato de texto são mais fáceis de gerar histórico e servir de comprovação, caso seja necessário.",
      "Utilizamos áudio apenas para explicar conceitos complexos ou acalmar clientes irritados. De qualquer forma, sempre enviamos o áudio acompanhado de um breve resumo em texto.",
    ],
  },
  boasPraticas: {
    titulo: "Boas práticas de atendimento",
    itens: [
      "Em hipótese alguma comece um atendimento sem saber o nome do cliente;",
      "Ajuste o nome do cliente no chat caso ele esteja escrito em caixa alta ou incorreto;",
      "O chat só acaba quando o problema for resolvido. Em caso de falta de resposta por mais de 24 horas, encerre educadamente deixando as portas abertas.",
    ],
  },
  seguranca: {
    titulo: "Segurança de dados",
    paragrafo: "A confiança do cliente é o nosso maior ativo. Jamais confirme endereços ou dados por telefone/chat sem uma verificação robusta, e nunca peça ou forneça redes sociais pessoais.",
  },
};

/* ------------------------------------------------------------------ */
/*  CONSULTORIA                                                        */
/* ------------------------------------------------------------------ */

export const consultoria = {
  titulo: "Consultoria",
  intro: "A essência da consultoria é ser uma \"mente estratégica\". Nossa voz não é a de quem empurra produtos, mas a de uma autoridade no assunto. Somos como especialistas que diagnosticam e prescrevem a melhor rota para o cliente, sempre embasados em uma metodologia de longo prazo.",
  pilares: {
    titulo: "Os pilares fundamentais da consultoria",
    itens: [
      { nome: "Autoridade", descricao: "O consultor lidera a conversa com perguntas pré-estabelecidas para entender a dor e o histórico do cliente, e é didático ao expor pontos e estratégias." },
      { nome: "Transparência radical", descricao: "Jamais garantimos resultados. Se o cliente estiver desalinhado com a nossa filosofia, preferimos recusar o lead a gerar frustração futura." },
      { nome: "Adaptabilidade", descricao: "Adaptamos o nível de formalidade conforme a abertura dada pelo cliente. Direto → técnico e preciso. Aberto → conexão mais próxima e pessoal." },
      { nome: "Respaldo técnico em crises", descricao: "Em momentos de estresse, nossa voz une o acolhimento emocional à frieza técnica, evitando decisões por impulso." },
    ],
  },
  boasPraticas: {
    titulo: "Boas práticas de atendimento na consultoria",
    itens: [
      "Via WhatsApp: emojis e figurinhas com moderação, dependendo do rapport com o cliente.",
      "Preferimos texto para documentar decisões. Áudio e vídeo apenas mediante autorização prévia.",
      "Após a qualificação inicial, o consultor deve retornar em até 24 horas úteis.",
    ],
  },
  gestaoCrises: {
    titulo: "Gestão de crises",
    paragrafo: "Diante de interações hostis, priorizamos o decoro e a sobriedade, restabelecendo um ambiente de diálogo seguro. Se o atrito persistir, a conversa deve sair do texto para uma reunião ou ligação, evitando más interpretações.",
  },
  comoNaoComunicar: {
    titulo: "Como NÃO nos comunicamos",
    intro: "Um termo errado é suficiente para nos relacionarem a um vendedor comissionado sem foco no cliente. Tenha em mente as palavras proibidas e os motivos:",
    itens: [
      { proibido: "Termos de especulação, como \"aposta\" ou \"alavancagem\".", motivo: "Não vendemos nenhum tipo de ganho fácil." },
      { proibido: "Vícios de vendedor, como \"oportunidade imperdível!\".", motivo: "Evite termos usados por profissionais comissionados." },
      { proibido: "Verbo \"garantir\" quando o assunto for rentabilidade ou resultado.", motivo: "O que nos diferencia é a transparência de que o mercado é variável." },
      { proibido: "Agressividade reativa.", motivo: "Mesmo que o cliente seja rude, o tom deve ser paciente e didático." },
      { proibido: "Ir contra a metodologia oficial da empresa.", motivo: "A voz da empresa precisa estar sempre alinhada com o que é ensinado publicamente." },
    ],
  },
  fluxo: {
    titulo: "Qual é o fluxo de comunicação dentro da consultoria?",
    itens: [
      { etapa: "Qualificação", descricao: "Tom investigativo e padronizado para filtrar o perfil." },
      { etapa: "Primeiro contato", descricao: "\"Quebra-gelo\" humano seguido de postura de especialista." },
      { etapa: "Entrega da proposta", descricao: "Tom técnico, transparente e focado nos objetivos combinados na reunião inicial." },
      { etapa: "Acompanhamento", descricao: "Nutrição de relacionamento, focada em segurança e educação contínua." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  CAPITAL HUMANO                                                     */
/* ------------------------------------------------------------------ */

export const capitalHumano = {
  titulo: "Capital Humano",
  paragrafos: [
    "Esqueça a polidez excessiva e o vocabulário engomado do corporativês. Nossa comunicação interna é propositalmente crua, simples e transparente, feita para que qualquer pessoa do time entenda cada palavra sem esforço. Se uma ideia não é clara, ela é inútil.",
    "Temos uma profunda aversão à comunicação passivo-agressiva. Aqui, falamos direto e sem rodeios. Nossa fala é direcionada para o acontecimento, a entrega e o resultado percebido.",
  ],
  crises: {
    titulo: "Postura em crises",
    paragrafo: "Em momentos de tempestade interna, mantemos uma voz calma e calculista, digerindo cada informação para responder com a intensidade exata que o momento exige. Quando mudamos um processo ou enfrentamos um problema, comunicamos a intenção por trás do ato, sempre em fatos, sem endossar culpas públicas.",
  },
  vocabulario: {
    titulo: "Vocabulário e código de conduta",
    intro: "Alguns termos internos que reforçam a nossa cultura:",
    itens: [
      { use: "Time", evite: "Recurso humano", porque: "Tratamos pessoas como pessoas, não como recursos a serem alocados." },
      { use: "Conversa direta", evite: "Feedback formal", porque: "Preferimos devolutivas sinceras a processos engessados." },
      { use: "Todos juntos", evite: "Reunião de alinhamento", porque: "Indica uma conversa franca e coletiva, não uma formalidade." },
    ],
  },
  employerBranding: {
    titulo: "Atração de talentos",
    paragrafo: "Nossa marca empregadora não vende ilusões. Não somos uma empresa de mimos corporativos superficiais — nosso ambiente é de conversa franca e reconhecimento pela ambição. Atraímos quem quer construir algo fora da curva.",
  },
  onboarding: {
    titulo: "Onboarding e rituais de humanização",
    paragrafos: [
      "No nosso onboarding, a primeira impressão é a ambientação em uma cultura onde o meio importa tanto quanto o fim. Apesar da nossa crueza externa, somos profundamente humanos nas relações individuais.",
      "Celebramos conquistas pessoais e marcos de vida do time para garantir que cada pessoa sinta que faz parte de algo maior.",
    ],
  },
  hellYesHellNo: {
    titulo: "Hell Yes, Hell No — Redes sociais",
    intro: "O que aplicamos (e o que evitamos) nas comunicações em redes sociais:",
    pares: [
      { hellYes: "Defender nossas pessoas e nossa cultura", hellNo: "Nos envolver em polêmicas sem relação com a marca" },
      { hellYes: "Nos posicionar de forma assertiva em momentos oportunos", hellNo: "Fazer postagens sobre produtos ainda não divulgados" },
      { hellYes: "Responder comentários sempre de forma cordial", hellNo: "Comunicar de maneira grosseira ou que exponha colegas" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  PRODUTO E CX                                                       */
/* ------------------------------------------------------------------ */

export const produtoCx = {
  titulo: "Produto e Cx",
  intro: "A excelência não é um objetivo, é o ponto de partida. Para manter esse padrão, seguimos regras rígidas de estilo e comportamento.",
  tabela: [
    ["Ponto de exclamação em excesso", "Orgulho da origem da marca"],
    ["Promessas de ganho rápido", "Valorização da conquista"],
    ["\"Garantia\" e qualquer variação", "Linguagem criativa e persuasiva"],
    ["Linguagem acadêmica ou rebuscada", "Autoridade construída com dados reais"],
    ["Copys claramente feitas só com IA, sem revisão", "Revisão humana atenta ao tom da marca"],
  ],
};

/* ------------------------------------------------------------------ */
/*  FORMATOS E SUPORTES                                                */
/* ------------------------------------------------------------------ */

export const formatosSuportes = {
  titulo: "Formatos e suportes: como cada material se comporta",
  itens: [
    { formato: "E-mails", estilo: "Humor, ironia e storytelling. Títulos chamativos (curiosidade) e uso obrigatório do primeiro nome." },
    { formato: "Plataforma / Aulas", estilo: "Didática, simples e objetiva. Incorpora a voz da liderança para não ser um material seco." },
    { formato: "E-books", estilo: "Linguagem educativa e detalhada, com foco no aprofundamento do conteúdo." },
    { formato: "Slides", estilo: "Linguagem minimalista e resumida. Apenas os pontos de foco." },
    { formato: "Cartas", estilo: "Voz pessoal da liderança quando for o caso. Assinatura de quem escreveu, sempre revisada antes de sair." },
  ],
};

/* ------------------------------------------------------------------ */
/*  PARTICULARIDADES DE CONTEÚDOS                                      */
/* ------------------------------------------------------------------ */

export const particularidadesConteudo = {
  intro: "Cada linguagem é adaptada a diferentes tipos de conteúdo, para diferentes finalidades:",
  itens: [
    { nome: "Vídeos institucionais", descricao: "Roteiros informativos, mas com \"toques filosóficos\". Quem apresenta deve imprimir sua própria personalidade para gerar proximidade." },
    { nome: "Redes sociais", descricao: "Escrita criativa e ideativa, num estilo mais descontraído, informal e inspiracional." },
  ],
  tecnicas: [
    { nome: "Inclusividade", descricao: "Escrevemos pensando em quem tem mais dificuldade de entender. Se essa pessoa entender, todos entendem." },
    { nome: "Conversão", descricao: "Em roteiros de vendas, a abordagem é direta e focada em mostrar o diferencial real da marca." },
  ],
  padroesAssinatura: {
    titulo: "Padrões de assinatura e fechamento",
    intro: "Para e-mails e comunicações de equipe, o padrão é a proximidade:",
    itens: [
      { nome: "Assinatura", descricao: "\"Abraços / Equipe [Produto]\" ou \"Equipe [Empresa]\"." },
      { nome: "Storytelling", descricao: "Todo texto deve ter um começo, meio e fim que prenda a atenção do leitor." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  PRODUTOS — exemplos representativos                                */
/* ------------------------------------------------------------------ */

export type ProdutoVoz = {
  titulo: string;
  intro: string;
  voz: string;
  tom: string;
  diretrizes: string[];
  evitar: string[];
  exemplos: { situacao: string; comoAgir: string; evitar: string }[];
};

export const produtoA: ProdutoVoz = {
  titulo: "Produto A — Educação",
  intro: "É a porta de entrada para o público, com uma personalidade de mestre experiente que não usa palavras difíceis para parecer inteligente: é direto, didático e, às vezes, visceral para tirar o aluno da inércia.",
  voz: "Simples, direta, transparente e humana.",
  tom: "Explicativo e descontraído. O tom de um bate-papo sério, mas sem rodeios.",
  diretrizes: [
    "Traduza o \"economês\" (ou o jargão técnico do setor) para uma linguagem clara e de fácil entendimento.",
    "Use analogias do dia a dia para explicar conceitos complexos.",
    "Repudie soluções fáceis, ganhos rápidos ou estratégias milagrosas.",
  ],
  evitar: ["\"Garantia de resultado\"", "\"Curso\" (use \"treinamento\")", "\"Cliente\" (use \"aluno\" ou \"membro\")"],
  exemplos: [
    { situacao: "E-mail de aviso", comoAgir: "\"Fala, [nome]. Tá lembrado que nosso encontro é hoje, às 19h?\"", evitar: "\"Prezado(a), informamos que o encontro ocorrerá às 19h.\"" },
    { situacao: "Aula teórica", comoAgir: "\"Isso pode até não ser o assunto mais empolgante, mas faz bem para o seu bolso.\"", evitar: "Explicação técnica sem tradução para o dia a dia." },
  ],
};

export const produtoB: ProdutoVoz = {
  titulo: "Produto B — Consultoria premium",
  intro: "É o atendimento dedicado a quem busca uma relação de longo prazo. Combinamos a sofisticação técnica de um serviço especializado com o calor humano que é a marca da empresa.",
  voz: "Técnica e sóbria, mas com humanidade.",
  tom: "Sério quando o assunto exige, mas nunca frio ou impessoal. Aspiracional sem ser arrogante.",
  diretrizes: [
    "Trate a relação como parceria de longo prazo, não como transação pontual.",
    "Use vocabulário de precisão e planejamento, sem pressa.",
    "Seja transparente mesmo quando a resposta não for o que o cliente quer ouvir.",
  ],
  evitar: ["Linguagem de varejo (\"promoção\", \"oferta limitada\")", "Promessas de rentabilidade ou resultado garantido", "Pressão de fechamento"],
  exemplos: [
    { situacao: "Primeira reunião", comoAgir: "\"Antes de falar de números, quero entender o que você já construiu e onde quer chegar.\"", evitar: "\"Temos o melhor produto do mercado para o seu perfil.\"" },
    { situacao: "Revisão de estratégia", comoAgir: "\"O cenário mudou, então vamos ajustar o plano — não o objetivo.\"", evitar: "Ignorar o contexto emocional do cliente diante de uma perda." },
  ],
};

export const produtoC: ProdutoVoz = {
  titulo: "Produto C — Ferramenta digital",
  intro: "É a ferramenta que substitui o \"achismo\" por dados. Assume o papel de um braço direito tecnológico que faz o trabalho pesado para que o usuário foque na decisão final.",
  voz: "Técnica, objetiva, facilitadora e confiável.",
  tom: "Pragmático e encorajador — o tom de quem entrega o \"dossiê pronto\".",
  diretrizes: [
    "Contraste a facilidade da ferramenta com a rotina caótica de quem ainda usa planilhas soltas.",
    "Trate funcionalidades como \"superpoderes\", não apenas como recursos técnicos.",
    "Deixe claro que a ferramenta apoia a decisão — ela não decide pelo usuário.",
  ],
  evitar: ["\"Dica quente\"", "\"Palpite\" ou \"achismo\"", "Recomendação direta de compra ou venda"],
  exemplos: [
    { situacao: "E-mail de boas-vindas", comoAgir: "\"Analisar ficou simples. Seu período de teste começou agora.\"", evitar: "Lista técnica de funcionalidades sem contexto de uso." },
    { situacao: "Falha no pagamento", comoAgir: "\"A gente tentou, mas parece que seu cartão está de folga hoje.\"", evitar: "Mensagem de erro genérica e impessoal." },
  ],
};
