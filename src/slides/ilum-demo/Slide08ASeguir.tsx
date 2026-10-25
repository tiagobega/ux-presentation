import type { SlideProps } from '../config'
import { COR, Cartao, Pagina, Rotulo, delay } from './ui'

/**
 * Slide 8 — O que vem a seguir.
 *
 * Em destaque, chapado em ameixa, o tempo real: Builder e Router estão
 * validados, mas o projeto ainda recebe o mês carregado, não cada foto quando
 * ela chega. Os outros três itens têm o mesmo peso. Nenhum tem data, porque
 * nenhum prazo foi informado.
 */

export const ACTIONS = ['Os próximos passos']

const OUTROS = [
  { termo: 'O Back lendo o Oracle', detalhe: 'os dados já estão idênticos' },
  { termo: 'A tabela Prata da unicidade', detalhe: 'ADR-0044' },
  { termo: 'O Builder criando os usuários do banco', detalhe: 'DT-02' },
]

export default function Slide08ASeguir(_: SlideProps) {
  return (
    <Pagina n={8} eyebrow='A seguir' titulo='O que vem depois da demo'>
      <div className='grid grid-cols-[1.1fr_1fr] gap-[1.6vw]'>
        <Cartao
          estado='atual'
          className='px-[2.2vw] py-[2.2vw] flex flex-col justify-center gap-[0.8vw] animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.15)}
        >
          <Rotulo cor='#ffffffb0'>01 · Tempo real</Rotulo>
          <span className='text-[2.2vw] font-bold leading-[1.15]'>Fotos novas chegando sozinhas</span>
          <span className='text-[1.3vw] opacity-80'>Hoje o projeto recebe o mês carregado; o próximo é receber cada foto quando ela chega</span>
        </Cartao>

        <div className='flex flex-col gap-[1vw]'>
          {OUTROS.map((o, i) => (
            <Cartao
              key={o.termo}
              estado='aceso'
              className='flex-1 px-[1.6vw] py-[1.1vw] animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.3 + i * 0.1)}
            >
              <span className='block text-[1vw] font-bold' style={{ color: COR.malva }}>
                {String(i + 2).padStart(2, '0')}
              </span>
              <span className='block text-[1.55vw] font-bold'>{o.termo}</span>
              <span className='block mt-[0.2vw] text-[1.05vw]' style={{ color: COR.cinza }}>
                {o.detalhe}
              </span>
            </Cartao>
          ))}
        </div>
      </div>
    </Pagina>
  )
}
