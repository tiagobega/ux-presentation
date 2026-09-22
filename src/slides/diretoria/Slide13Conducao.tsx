import type { SlideProps } from '../config'
import { Frame, Grade, Termo } from './ui'

/**
 * Slide 13 do plano — A condução desse trabalho. Arquétipo título+grade.
 *
 * Quatro itens com o mesmo peso visual, e o escopo fica na fala. É um escopo
 * a formalizar: a tela não declara mandato concedido, gestão de pessoas nem
 * propriedade sobre outras áreas.
 */

const RESPONSABILIDADES = ['Arquitetura', 'Padrões', 'Integração entre frentes', 'Acompanhamento das entregas']

export const ACTIONS = ['A responsabilidade']

export default function Slide13Conducao({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Responsabilidades · Front-end'>
      <Grade colunas={4} itens={RESPONSABILIDADES.map((r) => <Termo key={r}>{r}</Termo>)} />
    </Frame>
  )
}
