import type { SlideProps } from '../config'
import { Frame, Grade, Termo } from './ui'

/**
 * Slide 4 do plano — O que permite reaproveitar. Arquétipo título+grade.
 *
 * Três colunas com os nomes, sem descrição abaixo dos termos: a distinção
 * entre registry, pacotes compartilhados e produtos independentes ainda está
 * em decisão (TIA-32), e escrever a explicação na tela a congelaria.
 */

const PECAS = ['Design system', 'Registry', 'Microfront-ends']

export const ACTIONS = ['As peças compartilhadas']

export default function Slide04BaseCompartilhada({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Base compartilhada'>
      <Grade colunas={3} itens={PECAS.map((p) => <Termo key={p} grande>{p}</Termo>)} />
    </Frame>
  )
}
