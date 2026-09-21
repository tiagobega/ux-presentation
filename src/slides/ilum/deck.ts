import type { Deck } from '../config'
import Slide00ArquiteturaAtual, { ACTIONS as ACOES_ATUAL } from './Slide00ArquiteturaAtual'
import Slide01EstruturaProposta, { ACTIONS as ACOES_PROPOSTA } from './Slide01EstruturaProposta'
import Slide02Planejamento, { ACTIONS as ACOES_PLANEJAMENTO } from './Slide02Planejamento'
import Slide03RiscosLimites, { ACTIONS as ACOES_RISCOS } from './Slide03RiscosLimites'

/**
 * Deck Ilum — apresentação administrativa, quatro slides e sem capa.
 * A fala está em `ilum-roteiro.md`.
 *
 * 0 Arquitetura atual (7 steps: o desenho, um problema por step acumulando as
 * marcas, e o fecho com as consequências) · 1 Estrutura proposta · 2
 * Planejamento macro · 3 Dificuldades, riscos e limites.
 *
 * Os steps de cada slide vêm do próprio slide (`ACTIONS`), porque lá eles são
 * estruturais: o slide 0, por exemplo, calcula quantos problemas já estão
 * marcados a partir da posição do step. Assim a nav e o slide não saem de
 * sincronia quando um problema ou uma fase é acrescentada.
 */
export const ILUM_DECK: Deck = {
  id: 'ilum',
  brand: 'INTELICITY · ILUM',
  title: 'Intelicity · Ilum',
  slides: [
    Slide00ArquiteturaAtual,
    Slide01EstruturaProposta,
    Slide02Planejamento,
    Slide03RiscosLimites,
  ],
  config: [
    { label: 'Estrutura atual', actions: ACOES_ATUAL },
    { label: 'Novo Fluxo', actions: ACOES_PROPOSTA },
    { label: 'Cronograma macro', actions: ACOES_PLANEJAMENTO },
    { label: 'Riscos e limites', actions: ACOES_RISCOS },
  ],
}
