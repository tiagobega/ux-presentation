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
    label: 'Ingestão',
    actions: ['Refatoração'],
  },
  {
    label: 'Plataforma',
    actions: ['Produção e adoção'],
  },
  {
    label: 'Alertas',
    actions: ['Detectar → resolver'],
  },
  {
    label: 'Vision · arquitetura',
    actions: ['As três camadas', 'A foto atravessa'],
  },
  {
    label: 'Vision · expansão',
    actions: ['SABESP e além'],
  },
  {
    label: 'Informs',
    actions: ['Produto vivo'],
  },
  {
    label: 'SGC',
    actions: ['Decisão open source'],
  },
  {
    label: 'Gravata',
    actions: ['Streaming integrado'],
  },
  {
    label: 'Gestão de Obras',
    actions: ['Demo em 1 semana'],
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
    label: 'Claude corporativo',
    actions: ['IA para o time'],
  },
  {
    label: 'Dev com IA',
    actions: ['O novo workflow'],
  },
  {
    label: 'MCPs',
    actions: ['Integração universal'],
  },
  {
    label: 'Créditos',
    actions: ['Os times'],
  },
  {
    label: 'Roadmap',
    actions: ['Agora, próximo, explorando'],
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
  | 17
  | 18
  | 19

export interface SlideProps {
  action: string
}
