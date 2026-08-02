import type { Deck } from './config'
import { FLEETS_DECK } from './fleets/deck'
import { FLEETS_DEMO_DECK } from './fleets-demo/deck'
import { INFORMS_DECK } from './informs/deck'

/**
 * Decks disponíveis. O ativo é o Informs; `?deck=fleets-demo` abre a
 * apresentação de demo ao vivo do Fleets e `?deck=fleets` o deck Fleets
 * autocontido, sem precisar editar código. O deck de Branding & UX
 * (`src/slides/Slide00`–`12`) segue no repositório apenas como referência
 * e não está listado aqui.
 */
export const DECKS: Record<string, Deck> = {
  fleets: FLEETS_DECK,
  'fleets-demo': FLEETS_DEMO_DECK,
  informs: INFORMS_DECK,
}

const DECK_PADRAO = INFORMS_DECK

function resolveDeck(): Deck {
  if (typeof window === 'undefined') return DECK_PADRAO
  const pedido = new URLSearchParams(window.location.search).get('deck')
  return (pedido && DECKS[pedido]) || DECK_PADRAO
}

export const DECK = resolveDeck()
export const SLIDES = DECK.slides
export const SLIDE_CONFIG = DECK.config
