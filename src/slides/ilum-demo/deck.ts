import type { Deck } from '../config'
import Slide00Equipe, { ACTIONS as A00 } from './Slide00Equipe'
import Slide01Arquitetura, { ACTIONS as A01 } from './Slide01Arquitetura'
import Slide02FluxoBuilder, { ACTIONS as FLUXO_BUILDER } from './Slide02FluxoBuilder'
import Slide02Builder, { ACTIONS as A02 } from './Slide02Builder'
import Slide03Recorte, { ACTIONS as A03 } from './Slide03Recorte'
import Slide04Tempo, { ACTIONS as A04 } from './Slide04Tempo'
import Slide05Engines, { ACTIONS as A05 } from './Slide05Engines'
import Slide06Router, { ACTIONS as A06 } from './Slide06Router'
import Slide07Recortes, { ACTIONS as A07 } from './Slide07Recortes'
import Slide08ASeguir, { ACTIONS as A08 } from './Slide08ASeguir'

/**
 * Deck Ilum · demo — dez slides, começando pela equipe.
 *
 * O arco: a arquitetura e o recorte da demo dentro dela → **o Builder**: o que
 * ele monta (depois do slide 4, fora do deck, o apresentador mostra o Airflow
 * com as DAGs que já rodaram) e as três provas do relatório: o recorte, o
 * tempo e a fidelidade entre as engines → **o Router**: o caminho de um dado
 * e a regra que decide o que chega a cada projeto → o que vem depois. Nada
 * roda ao vivo.
 *
 * A fala e o plano B estão em `plano-ilum-demo.md`. Os números estão em
 * `dados.ts`, tirados do relatório do run de 25/10.
 */
export const ILUM_DEMO_DECK: Deck = {
  id: 'ilum-demo',
  background: 'white',
  brand: 'INTELICITY · ILUM',
  title: 'Ilum · Demonstração',
  slides: [
    Slide00Equipe,
    Slide01Arquitetura,
    Slide02FluxoBuilder,
    Slide02Builder,
    Slide03Recorte,
    Slide04Tempo,
    Slide05Engines,
    Slide06Router,
    Slide07Recortes,
    Slide08ASeguir,
  ],
  config: [
    { label: 'Equipe', actions: A00 },
    { label: 'Arquitetura', actions: A01 },
    // Entra por corte: a arquitetura termina dentro do Builder.
    { label: 'O Builder', actions: FLUXO_BUILDER, corte: true },
    { label: 'O projeto', actions: A02 },
    { label: 'O recorte', actions: A03 },
    { label: 'O tempo', actions: A04 },
    { label: 'Duas engines', actions: A05 },
    // Entra por corte, direto na tela do Router, como o Builder.
    { label: 'O Router', actions: A06, corte: true },
    { label: 'Recortes', actions: A07 },
    { label: 'A seguir', actions: A08 },
  ],
}
