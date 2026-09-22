import type { SlideProps } from '../config'
import { Cartao, Rotulo, Termo, delay, estadoDe } from './ui'

/**
 * Slide 1 do plano — O compromisso do ILUM. Arquétipo pergunta-em-camadas.
 *
 * Duas etapas na horizontal, com destaque para a data da POC. Os dois blocos
 * ocupam o lugar desde o primeiro quadro e só acendem; nada entra empurrando
 * o vizinho no meio da fala. Sem frase de fechamento, por critério editorial.
 */

interface Etapa {
  /** O dado: é ele que fica em destaque na tela. */
  marco: string
  termo: string
  /** Só a data da POC tem o corpo maior; a duração é qualificador, não marco. */
  destaque?: boolean
}

const ETAPAS: Etapa[] = [
  { marco: '15/10', termo: 'POC de Uberlândia', destaque: true },
  { marco: 'Seis meses seguintes', termo: 'Incorporação de produtos' },
]

export const ACTIONS = ['O compromisso', 'Uberlândia', 'Expansão']

export default function Slide01Compromisso({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))

  return (
    <section className='flex flex-1 min-h-0 flex-col justify-center font-ilum text-[#251a34] px-[52px] py-9 max-[900px]:p-5'>
      <h1
        className='text-[clamp(28px,3.4vw,54px)] font-[750] tracking-[-1.6px] leading-[1.1] mb-12 animate-ilum-rise motion-reduce:animate-none'
        style={delay(0.1)}
      >
        ILUM · Plano de execução
      </h1>

      <div className='grid grid-cols-2 gap-6 max-[900px]:grid-cols-1'>
        {ETAPAS.map((e, i) => {
          // O índice do bloco é uma etapa à frente: a primeira só mostra o título.
          const estado = estadoDe(i + 1, step)
          return (
            <Cartao
              key={e.marco}
              estado={estado}
              className='px-8 py-10 animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.25 + i * 0.1)}
            >
              <Rotulo>{`ETAPA ${i + 1}`}</Rotulo>
              <span
                className={`block font-[750] tracking-[-1.2px] leading-[1.05] mt-3 transition-colors duration-300 motion-reduce:transition-none ${
                  e.destaque ? 'text-[clamp(30px,3.6vw,58px)]' : 'text-[clamp(22px,2.3vw,38px)]'
                } ${estado === 'apagado' ? 'text-[#b3a6bf]' : 'text-[#7c3aed]'}`}
              >
                {e.marco}
              </span>
              <span className='block mt-4'>
                <Termo>{e.termo}</Termo>
              </span>
            </Cartao>
          )
        })}
      </div>
    </section>
  )
}
