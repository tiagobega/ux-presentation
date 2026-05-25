export const SLIDE_CONFIG = [
  {
    label: 'Fundamento',
    actions: ['Dados', 'Contexto', 'Informação', 'Decisão', 'Execução'],
  },
  {
    label: 'O Desafio',
    actions: ['Personas', 'Riscos'],
  },
  {
    label: 'Crescimento',
    actions: ['Modelo UX', 'Comparativo'],
  },
  {
    label: 'Branding',
    actions: ['Presença', 'Declaração'],
  },
  {
    label: 'Stack IC',
    actions: ['Pipeline', 'Produtos'],
  },
  {
    label: 'Escopo',
    actions: ['Módulos', 'Entrega', 'Próximo Passo'],
  },
] as const

export type SlideIndex = 0 | 1 | 2 | 3 | 4 | 5

export interface SlideProps {
  action: string
}
