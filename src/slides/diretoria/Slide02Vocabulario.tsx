import type { SlideProps } from '../config'
import { Cartao, Rotulo, Termo, delay, estadoDe } from './ui'

/**
 * Slide 2 do plano — Plataforma, produto e serviço. Arquétipo
 * pergunta-em-camadas.
 *
 * Três camadas reveladas de baixo para cima. Apenas os nomes: as definições
 * são a fala, não a tela. O vocabulário segue o registro mais recente do
 * Linear, em que serviço é a extensão específica de um cliente, e não a
 * aplicação inteira entregue a ele.
 */

/** Na ordem em que acendem: a base primeiro. Na tela a pilha aparece invertida. */
const CAMADAS = ['Plataforma', 'Produto', 'Serviço específico']

export const ACTIONS = CAMADAS

export default function Slide02Vocabulario({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  const pilha = [...CAMADAS].reverse()

  return (
    <section className='flex flex-1 min-h-0 flex-col justify-center font-ilum text-[#251a34] px-[52px] py-9 max-[900px]:p-5'>
      <h1
        className='text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-10 animate-ilum-rise motion-reduce:animate-none'
        style={delay(0.1)}
      >
        Plataforma, produto e serviço
      </h1>

      <div className='flex flex-col gap-3'>
        {pilha.map((nome, i) => {
          const ordem = CAMADAS.indexOf(nome)
          return (
            <Cartao
              key={nome}
              estado={estadoDe(ordem, step)}
              className='px-8 py-9 flex items-baseline gap-7 animate-ilum-rise motion-reduce:animate-none max-[900px]:flex-col max-[900px]:gap-2'
              style={delay(0.22 + i * 0.09)}
            >
              <span className='shrink-0 w-[92px]'>
                <Rotulo>{`CAMADA ${CAMADAS.length - ordem}`}</Rotulo>
              </span>
              <Termo grande>{nome}</Termo>
            </Cartao>
          )
        })}
      </div>
    </section>
  )
}
