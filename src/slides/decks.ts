import type { Deck } from './config'
import { FLEETS_DECK } from './fleets/deck'
import { FLEETS_DEMO_DECK } from './fleets-demo/deck'
import { FRONT_DECK } from './front/deck'
import { INFORMS_DECK } from './informs/deck'
import { ILUM_DECK } from './ilum/deck'

/**
 * Decks disponíveis. O ativo é o Front-end; `?deck=ilum` volta ao deck de
 * arquitetura, `?deck=informs` abre o Informs, `?deck=fleets-demo` a
 * apresentação de demo ao vivo do Fleets e `?deck=fleets` o deck Fleets
 * autocontido, sem precisar editar código. O deck de Branding & UX
 * (`src/slides/Slide00`–`12`) segue no repositório apenas como referência
 * e não está listado aqui.
 */
export const DECKS: Record<string, Deck> = {
  fleets: FLEETS_DECK,
  'fleets-demo': FLEETS_DEMO_DECK,
  front: FRONT_DECK,
  informs: INFORMS_DECK,
  ilum: ILUM_DECK,
}

const DECK_PADRAO = FRONT_DECK

function resolveDeck(): Deck {
  if (typeof window === 'undefined') return DECK_PADRAO
  const pedido = new URLSearchParams(window.location.search).get('deck')
  return (pedido && DECKS[pedido]) || DECK_PADRAO
}

export const DECK = resolveDeck()
export const SLIDES = DECK.slides
export const SLIDE_CONFIG = DECK.config
