export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    label: 'Os Problemas',
    actions: ['Problemas'],
  },
  {
    label: 'Onde Estamos',
    actions: ['Cadeia', 'Personas'],
  },
  {
    label: 'A Solução',
    actions: ['Design System', 'Stack IC'],
  },
  {
    label: 'Em Andamento',
    actions: ['Fleets', 'Vision', 'SABESP'],
  },
] as const

export type SlideIndex = 0 | 1 | 2 | 3 | 4

export interface SlideProps {
  action: string
}
