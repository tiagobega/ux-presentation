export const SLIDE_CONFIG = [
  {
    label: 'Fundamento',
    stepLabels: ['Dados', 'Contexto', 'Informação', 'Decisão', 'Execução'],
  },
  {
    label: 'O Desafio',
    stepLabels: ['Personas', 'Riscos'],
  },
  {
    label: 'Crescimento',
    stepLabels: ['Modelo UX', 'Comparativo'],
  },
  {
    label: 'Branding',
    stepLabels: ['Presença', 'Declaração'],
  },
  {
    label: 'Stack IC',
    stepLabels: ['Pipeline', 'Produtos'],
  },
  {
    label: 'Escopo',
    stepLabels: ['Módulos', 'Entrega', 'Próximo Passo'],
  },
] as const

export type SlideIndex = 0 | 1 | 2 | 3 | 4 | 5

export interface SlideProps {
  step: number
}
