import type { SlideProps } from '../config'
import { Frame, Matriz } from './ui'

/**
 * Slide 7 do plano — O portfólio em andamento. Arquétipo tabela.
 *
 * Uma linha por frente, todas com o mesmo peso visual. Os status vêm da
 * atualização do usuário em setembro de 2026; nenhum prazo de COMGAS, do
 * painel do Informs ou de Recife foi informado, então nenhum aparece aqui.
 */

const PORTFOLIO: [string, string][] = [
  ['COMGAS · RFID', 'Reestruturação com Giovanni'],
  ['FLEETS', 'Guia de instalação · Setembro'],
  ['INFORMS', 'PWA entregue · Painel em evolução'],
  ['Obras', 'Entregue ao Fortes'],
  ['Planejamento', 'Homologação POA · Apresentação Recife'],
]

export const ACTIONS = ['As entregas']

export default function Slide07Portfolio({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Portfólio · Status e entregas'>
      <Matriz cabecalho={['Frente', 'Status / entrega']} linhas={PORTFOLIO} />
    </Frame>
  )
}
