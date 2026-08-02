export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    label: 'O problema',
    actions: ['Problema'],
  },
  {
    label: 'Domínio',
    actions: ['Entidades', 'Regra de ouro'],
  },
  {
    label: 'Perfis',
    actions: ['Perfis', 'LGPD'],
  },
  {
    label: 'Quem usa',
    actions: ['Quem usa'],
  },
  {
    label: 'Módulos',
    actions: ['Módulos'],
  },
  {
    label: 'Dashboard',
    actions: ['Dashboard'],
  },
  {
    label: 'Dispositivos',
    actions: ['Dispositivos'],
  },
  {
    label: 'Ciclo de vida',
    actions: ['Estados', 'Rastro'],
  },
  {
    label: 'Instalação',
    actions: ['Instalação'],
  },
  {
    label: 'Alertas',
    actions: ['Alertas'],
  },
  {
    label: 'Colaboradores',
    actions: ['Pessoas'],
  },
  {
    label: 'Contratos',
    actions: ['Contratos'],
  },
  {
    label: 'Pagamentos',
    actions: ['Pagamentos'],
  },
  {
    label: 'Governança',
    actions: ['Governança'],
  },
  {
    label: 'Fluxo 1 · Hardware',
    actions: ['Estoque → Campo', 'Operação → Fim'],
  },
  {
    label: 'Fluxo 2 · Contrato',
    actions: ['Contrato → Vínculo', 'Fechamento'],
  },
  {
    label: 'Roadmap',
    actions: ['Três frentes'],
  },
  {
    label: 'Estoque',
    actions: ['Estoque'],
  },
  {
    label: 'App do motorista',
    actions: ['App'],
  },
  {
    label: 'Instalação assistida',
    actions: ['Ciclo fechado'],
  },
  {
    label: 'Encerramento',
    actions: ['Fim'],
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
  | 20
  | 21

export interface SlideProps {
  action: string
}
