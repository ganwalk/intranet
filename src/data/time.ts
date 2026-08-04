/**
 * Membros do Time de Produto — fonte única.
 * Consumida pelo carrossel do Hub, pela command palette (busca global) e por /time.
 *
 * Dados fictícios: este é um template whitelabel e não referencia nenhuma
 * pessoa real. Os avatares (ver src/components/TeamPhoto.tsx) são gerados a
 * partir das iniciais do nome — não há fotos.
 */

export interface MembroTime {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: MembroTime[] = [
  { id: "colaborador-01", name: "Colaborador 1",  role: "Fundador(a) e CEO",         bio: "Fundou a empresa com a missão de oferecer soluções financeiras acessíveis." },
  { id: "colaborador-02", name: "Colaborador 2",  role: "Diretor(a) de Produto",     bio: "Lidera a estratégia de produto e a visão de longo prazo da plataforma." },
  { id: "colaborador-03", name: "Colaborador 3",  role: "Coordenador(a) de Produto", bio: "Coordena sprints e a entrega contínua de valor ao usuário final." },
  { id: "colaborador-04", name: "Colaborador 4",  role: "Analista de CX",            bio: "Garante a melhor experiência possível para cada cliente." },
  { id: "colaborador-05", name: "Colaborador 5",  role: "Gerente de Produto",        bio: "Conduz discovery, roadmap e priorização das iniciativas do produto." },
  { id: "colaborador-06", name: "Colaborador 6",  role: "Designer de Produto",       bio: "Cria interfaces funcionais e refinadas para a plataforma." },
  { id: "colaborador-07", name: "Colaborador 7",  role: "Designer de Produto",       bio: "Cuida de identidade visual, marca e componentes do design system." },
  { id: "colaborador-08", name: "Colaborador 8",  role: "Redator(a)",                bio: "Define o tom e a voz da empresa em todos os canais e produtos." },
  { id: "colaborador-09", name: "Colaborador 9",  role: "Analista de Produto",       bio: "Analisa dados e métricas para embasar decisões de produto." },
  { id: "colaborador-10", name: "Colaborador 10", role: "Analista de Produto",       bio: "Conduz pesquisas com usuários e validação de hipóteses." },
  { id: "colaborador-11", name: "Colaborador 11", role: "Assistente de Produto",     bio: "Apoia as iniciativas de produto e os processos internos do time." },
  { id: "colaborador-12", name: "Colaborador 12", role: "Assistente de Produto",     bio: "Contribui com análises, documentação e execução de projetos." },
];
