export const SLIDE_CONFIG = [
  {
    label: 'Abertura',
    actions: ['Tese do ecossistema'],
  },
  {
    label: 'Mapa do ecossistema',
    actions: ['O mapa'],
  },
  {
    label: 'Intelifleets',
    actions: ['O hub · 3 frentes'],
  },
  {
    label: 'Plataforma',
    actions: ['Produção e adoção'],
  },
  {
    label: 'Ingestão',
    actions: ['Refatoração'],
  },
  {
    label: 'Alertas',
    actions: ['Detectar → resolver'],
  },
  {
    label: 'Intelivision',
    actions: ['As três camadas', 'A foto atravessa', 'Onde isso escala'],
  },
  {
    label: 'Informs',
    actions: ['Produto vivo'],
  },
  {
    label: 'CVAT',
    actions: ['Decisão open source'],
  },
  {
    label: 'Gravata',
    actions: ['Streaming integrado'],
  },
  {
    label: 'Gestão de Obras',
    actions: ['Novo produto'],
  },
  {
    label: 'Zeladoria',
    actions: ['A próxima fronteira'],
  },
  {
    label: 'Padrões & Inovação',
    actions: ['Bloco transversal'],
  },
  {
    label: 'IcePanel',
    actions: ['Arquitetura e ADRs'],
  },
  {
    label: 'Claude, dev com IA & MCPs',
    actions: ['Um único fluxo de IA'],
  },
  {
    label: 'Roadmap',
    actions: ['Agora, próximo, explorando', 'Hoje', 'Objetivo'],
  },
  {
    label: 'Créditos',
    actions: ['Agradecimentos'],
  },
] as const

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export type SlideIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16

export interface SlideProps {
  action: string
}
