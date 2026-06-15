export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    label: 'UX hoje',
    actions: ['Reconhecimento'],
  },
  {
    label: 'Mais dados',
    actions: ['Situação', 'Perguntas'],
  },
  {
    label: 'O protagonista',
    actions: ['Valor'],
  },
  {
    label: 'Falhas na cadeia',
    actions: ['Casos'],
  },
  {
    label: 'O custo',
    actions: ['Custo'],
  },
  {
    label: 'A cadeia',
    actions: ['Coleta → Contexto', 'Informação → Acompanhamento'],
  },
  {
    label: 'Narrativa',
    actions: ['Narrativa'],
  },
  {
    label: 'Stack IC',
    actions: ['Stack IC'],
  },
  {
    label: 'Branding dos produtos',
    actions: ['Marcas'],
  },
  {
    label: 'Onde o UX entra',
    actions: ['Foco'],
  },
  {
    label: 'Respostas',
    actions: ['Respostas'],
  },
  {
    label: 'Citação',
    actions: ['Fim'],
  },
] as const

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export type SlideIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface SlideProps {
  action: string
}
