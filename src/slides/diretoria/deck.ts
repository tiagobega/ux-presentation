import type { Deck } from '../config'
import Slide01Arquitetura, { ACTIONS as A01 } from './Slide01Arquitetura'
import Slide02CidadeX, { ACTIONS as A02 } from './Slide02CidadeX'
import Slide03ComoFazer, { ACTIONS as A03 } from './Slide03ComoFazer'
import Slide04Cronograma, { ACTIONS as A04 } from './Slide04Cronograma'
import Slide05EntregasParalelas, { ACTIONS as A05 } from './Slide05EntregasParalelas'

/**
 * Deck ILUM · diretoria — cinco slides, sem capa.
 *
 * O arco: a arquitetura que existe e o vocabulário que sai dela → onde isso
 * pode chegar (a composição por prompt) → o que vamos construir para chegar
 * lá → em que ordem → e o que o time entrega em paralelo a tudo isso.
 *
 * A fala e as ressalvas estão em `plano-ilum-diretoria.md`, que registra
 * também o que saiu da versão anterior, de treze slides.
 *
 * Os steps de cada slide vêm do próprio slide (`ACTIONS`) — a nav e o slide
 * não saem de sincronia quando uma etapa é acrescentada.
 */
export const DIRETORIA_DECK: Deck = {
  id: 'diretoria',
  brand: 'INTELICITY · ILUM',
  title: 'ILUM · Plano de execução',
  slides: [
    Slide01Arquitetura,
    Slide02CidadeX,
    Slide03ComoFazer,
    Slide04Cronograma,
    Slide05EntregasParalelas,
  ],
  config: [
    { label: 'Arquitetura', actions: A01 },
    { label: 'Cidade X', actions: A02 },
    { label: 'Como fazer', actions: A03 },
    { label: 'Cronograma', actions: A04 },
    { label: 'Em paralelo', actions: A05 },
  ],
}
