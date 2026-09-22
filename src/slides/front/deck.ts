import type { Deck } from '../config'
import Slide00Vocabulario, { ACTIONS as ACOES_VOCABULARIO } from './Slide00Vocabulario'
import Slide01BaseComum, { ACTIONS as ACOES_BASE } from './Slide01BaseComum'
import Slide02Composicao, { ACTIONS as ACOES_COMPOSICAO } from './Slide02Composicao'
import Slide03Integracao, { ACTIONS as ACOES_INTEGRACAO } from './Slide03Integracao'
import Slide04Contratos, { ACTIONS as ACOES_CONTRATOS } from './Slide04Contratos'
import Slide05Entregaveis, { ACTIONS as ACOES_ENTREGAVEIS } from './Slide05Entregaveis'
import Slide06Etapas, { ACTIONS as ACOES_ETAPAS } from './Slide06Etapas'

/**
 * Deck Front-end — o recorte de front-end e da conversa com o back-end do
 * planejamento de produto e tecnologia. Sete slides, sem capa, no mesmo
 * formato administrativo do deck Ilum. A fala está em `front-roteiro.md`.
 *
 * O arco: as três palavras (plataforma, produto, serviço) → o custo de
 * reconstruir o básico → como um serviço se monta → como o front conversa
 * com o back → onde fica a fronteira → o que está sendo entregue → em que
 * ordem.
 *
 * Os steps de cada slide vêm do próprio slide (`ACTIONS`): acrescentar um
 * entregável ou uma conversa já atualiza a navegação, sem editar dois lugares.
 */
export const FRONT_DECK: Deck = {
  id: 'front',
  brand: 'INTELICITY · FRONT-END',
  title: 'Intelicity · Front-end e back-end',
  slides: [
    Slide00Vocabulario,
    Slide01BaseComum,
    Slide02Composicao,
    Slide03Integracao,
    Slide04Contratos,
    Slide05Entregaveis,
    Slide06Etapas,
  ],
  config: [
    { label: 'Três palavras', actions: ACOES_VOCABULARIO },
    { label: 'O custo de hoje', actions: ACOES_BASE },
    { label: 'Como se monta', actions: ACOES_COMPOSICAO },
    { label: 'Front e back', actions: ACOES_INTEGRACAO },
    { label: 'A fronteira', actions: ACOES_CONTRATOS },
    { label: 'Entregáveis', actions: ACOES_ENTREGAVEIS },
    { label: 'Duas etapas', actions: ACOES_ETAPAS },
  ],
}
