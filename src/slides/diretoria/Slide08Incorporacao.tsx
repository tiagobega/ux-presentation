import type { SlideProps } from '../config'
import { Frame, Matriz } from './ui'

/**
 * Slide 8 do plano — Como o portfólio entra. Arquétipo matriz.
 *
 * Os destinos são propostas de enquadramento, não migrações concluídas: o
 * cabeçalho mantém "proposto" e o RFID mantém "A definir". A ordem de entrada
 * dos produtos nos seis meses ainda não foi definida, e a tabela não a sugere.
 */

const INCORPORACAO: [string, string][] = [
  ['Uberlândia', 'Plataforma de referência'],
  ['Obras e Planejamento', 'Produtos'],
  ['Administração do Informs', 'Produto'],
  ['COMGAS · RFID', 'A definir'],
  ['Guia de instalação · Fleets', 'Operação de campo'],
]

export const ACTIONS = ['A incorporação']

export default function Slide08Incorporacao({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Incorporação ao ILUM'>
      <Matriz cabecalho={['Iniciativa', 'Destino proposto']} linhas={INCORPORACAO} />
    </Frame>
  )
}
