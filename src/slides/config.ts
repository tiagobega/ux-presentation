/**
 * Deck Fleets (apresentação com demo ao vivo) — 17 slides.
 * Espelha `fleets-slides.md` + os ajustes de `fleets-ajustes.md`;
 * a fala de cada slide está em `fleets-roteiro.md`.
 * Slides 6–14 são de fluxo: só marcam o domínio enquanto a aplicação
 * roda no monitor 2 — por isso têm um único step.
 */
export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    // Pergunta → resposta → uma dor por step (cada uma com a descrição).
    label: 'Por que existe',
    actions: [
      'A pergunta',
      'A resposta',
      'Não escala',
      'Não conversa',
      'Sem regra',
    ],
  },
  {
    // O diagrama sobe camada por camada; o 2º step acende o que falta construir.
    label: 'Arquitetura',
    actions: ['Hoje', 'Em construção'],
  },
  {
    label: 'Usuários',
    actions: ['Permissões'],
  },
  {
    // Mesma mecânica da abertura: pergunta → resposta → um ganho por step → fecho.
    label: 'O que resolvemos',
    actions: [
      'A pergunta',
      'A resposta',
      'Regra de negócio',
      'Visibilidade',
      'Rastreabilidade',
      'O foco',
    ],
  },
  {
    label: 'Glossário',
    actions: ['Vocabulário'],
  },
  {
    label: 'Fluxo · Autenticação',
    actions: ['Autenticação'],
  },
  {
    label: 'Fluxo · Cadastros base',
    actions: ['Cadastros'],
  },
  {
    label: 'Fluxo · Contrato',
    actions: ['Contrato'],
  },
  {
    label: 'Fluxo · Colaboradores',
    actions: ['Pessoas'],
  },
  {
    label: 'Fluxo · Dispositivos',
    actions: ['Hardware'],
  },
  {
    label: 'Fluxo · Coleta em campo',
    actions: ['Coleta'],
  },
  {
    label: 'Fluxo · Pagamentos',
    actions: ['Pagamentos'],
  },
  {
    label: 'Fluxo · Alertas',
    actions: ['Alertas'],
  },
  {
    label: 'Fluxo · Dashboards',
    actions: ['Indicadores'],
  },
  {
    label: 'Próximos passos',
    actions: ['Roadmap'],
  },
  {
    label: 'Perguntas',
    actions: ['Obrigado'],
  },
] as const

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export interface SlideProps {
  action: string
}
