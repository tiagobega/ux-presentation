export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    label: 'Selecionar OS',
    actions: ['Seleção'],
  },
  {
    label: 'Escopo da análise',
    actions: ['Escopo'],
  },
  {
    label: 'Processamento',
    actions: ['Imagens', 'Bronze', 'Prata', 'Ouro'],
  },
  {
    label: 'Output',
    actions: ['Output'],
  },
] as const

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export type SlideIndex = 0 | 1 | 2 | 3 | 4

export interface SlideProps {
  action: string
}
