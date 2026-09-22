import type { SlideProps } from '../config'
import { Frame, Grade, Rotulo, Termo } from './ui'

/**
 * Slide 10 do plano — O marco de 15/10. Arquétipo título+grade.
 *
 * A data fica em destaque no título e os quatro itens de aceite entram como
 * grade. "Proposto" permanece visível de propósito: os critérios se apoiam nas
 * TIA-10 e TIA-20, mas a cobertura exata do aceite ainda depende do catálogo e
 * da equipe. Concluir a prova da base não é o mesmo que reconstruir toda a
 * aplicação de Uberlândia.
 */

const ACEITE = ['Fluxo representativo', 'Acesso e dados', 'Integração APEX', 'Configuração neutra']

export const ACTIONS = ['A evidência da POC']

export default function Slide10Poc({ action: _ }: SlideProps) {
  void _

  return (
    <Frame
      title={
        <>
          POC Uberlândia · <span className='text-[#7c3aed]'>15/10</span>
        </>
      }
    >
      <Rotulo>ACEITE PROPOSTO</Rotulo>
      <Grade colunas={4} itens={ACEITE.map((a) => <Termo key={a}>{a}</Termo>)} />
    </Frame>
  )
}
