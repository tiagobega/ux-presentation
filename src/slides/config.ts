import type { ComponentType } from 'react'

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export interface SlideProps {
  action: string
}

/** Entrada do menu/dot nav: rótulo do slide + seus steps internos. */
export interface SlideEntry {
  label: string
  actions: readonly string[]
}

/**
 * Um deck é a dupla (componentes na ordem da esteira, config na mesma ordem).
 * Vive em `<deck>/deck.ts`; a seleção do deck ativo fica em `slides/decks.ts`.
 * Este arquivo não importa nenhum deck de propósito — os slides importam
 * SLIDE_PADDING daqui, e importar o deck de volta fecharia um ciclo.
 */
export interface Deck {
  id: string
  /** Assinatura no canto esquerdo da nav. */
  brand: string
  /** Título da aba do navegador. */
  title: string
  slides: ComponentType<SlideProps>[]
  config: readonly SlideEntry[]
}
