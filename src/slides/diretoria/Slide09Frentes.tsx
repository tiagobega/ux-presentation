import type { SlideProps } from '../config'
import { Frame, Numerados } from './ui'

/**
 * Slide 9 do plano — O plano de execução. Arquétipo linha-do-tempo.
 *
 * Seis blocos numerados, deliberadamente **sem** régua de tempo: as frentes
 * podem avançar em paralelo, e associar um bloco a um mês diria algo que o
 * backlog não sustenta. Seis frentes não são seis meses nem seis fases
 * sequenciais.
 */

const FRENTES = [
  'Catálogo',
  'Fundação',
  'Sistema visual',
  'Composição e dados',
  'Qualidade',
  'Publicação',
]

export const ACTIONS = ['Os marcos de construção']

export default function Slide09Frentes({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Frentes de execução'>
      <Numerados itens={FRENTES} colunas={3} />
    </Frame>
  )
}
