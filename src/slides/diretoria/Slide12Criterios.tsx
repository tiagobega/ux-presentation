import type { SlideProps } from '../config'
import { Frame, Matriz } from './ui'

/**
 * Slide 12 do plano — Como acompanhamos o resultado. Arquétipo tabela.
 *
 * Tabela única de entregáveis e critérios, sem indicador percentual: não há
 * linha de base para sustentar meta numérica de redução de tempo ou custo.
 * "Segundo contexto" é a prova de reutilização; não equivale, por si só, a
 * implantação do produto em um segundo cliente.
 */

const CRITERIOS: [string, string][] = [
  ['Base comum', 'Configuração neutra'],
  ['Uberlândia', 'Paridade homologada'],
  ['Produto incorporado', 'Fluxo homologado'],
  ['Reutilização', 'Segundo contexto'],
  ['Continuidade', 'Retorno de versão validado'],
  ['Sustentação', 'Responsável e documentação'],
]

export const ACTIONS = ['Os critérios de conclusão']

export default function Slide12Criterios({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Critérios de conclusão'>
      <Matriz cabecalho={['Entregável', 'Aceite proposto']} linhas={CRITERIOS} />
    </Frame>
  )
}
