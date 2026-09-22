import type { SlideProps } from '../config'
import { Cartao, Frame, Selo, Termo, delay, type Situacao } from './ui'

/**
 * Slide 4 — Cronograma.
 *
 * Cinco marcos numa linha que varre da esquerda para a direita. As bolinhas
 * vivem na **mesma grade dos cartões**, com o mesmo `gap`: é isso que garante
 * o alinhamento, já que com os cartões numa grade o centro de cada um não cai
 * em 10%, 30%, 50%… por causa dos vãos.
 *
 * Só os marcos que têm data mostram data. "Adaptação de novos produtos" não
 * tem, e inventar uma seria transformar uma sequência em compromisso.
 */

interface Marco {
  nome: string
  situacao: Situacao
  selo: string
}

const MARCOS: Marco[] = [
  { nome: 'Levantamento', situacao: 'feito', selo: 'OK' },
  { nome: 'Criação da base', situacao: 'agora', selo: 'Em execução' },
  { nome: 'POC · Uberlândia', situacao: 'agora', selo: '15/10' },
  { nome: 'Adaptação de novos produtos', situacao: 'aSeguir', selo: 'A seguir' },
  { nome: 'Adaptação de plataformas', situacao: 'aSeguir', selo: 'a partir de FEV/27' },
]

/** A bolinha do que já passou e do que está correndo é cheia; a futura, oca. */
const BOLINHA: Record<Situacao, string> = {
  feito: 'bg-[#7c3aed] border-[#7c3aed]',
  agora: 'bg-[#7c3aed] border-[#7c3aed]',
  aSeguir: 'bg-white border-[#c3aadc]',
}

const GRADE = 'grid grid-cols-5 gap-4 max-[900px]:grid-cols-2'

export const ACTIONS = ['Os marcos']

export default function Slide04Cronograma({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Cronograma'>
      <div className='flex flex-col gap-6'>
        <div className='relative max-[900px]:hidden'>
          <div
            className='absolute left-0 right-[9px] top-[7px] h-[2px] bg-[#c3aadc] origin-left animate-ilum-sweep motion-reduce:animate-none'
            style={delay(0.1)}
          />
          <svg
            className='absolute right-0 top-[1px] w-[10px] h-[14px] animate-ilum-fade motion-reduce:animate-none'
            viewBox='0 0 10 14'
            aria-hidden='true'
            style={delay(0.75)}
          >
            <path d='M0 0 L10 7 L0 14 Z' className='fill-[#c3aadc]' />
          </svg>

          <div className={GRADE}>
            {MARCOS.map((m, i) => (
              <div key={m.nome} className='flex justify-center'>
                <span
                  className={`w-4 h-4 rounded-full border-2 ${BOLINHA[m.situacao]} animate-ilum-pop motion-reduce:animate-none`}
                  style={delay(0.45 + i * 0.09)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={GRADE}>
          {MARCOS.map((m, i) => (
            <Cartao
              key={m.nome}
              estado={m.situacao === 'aSeguir' ? 'aceso' : 'atual'}
              className='px-6 py-7 animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.62 + i * 0.09)}
            >
              <Termo>{m.nome}</Termo>
              <span className='block mt-3'>
                <Selo situacao={m.situacao}>{m.selo}</Selo>
              </span>
            </Cartao>
          ))}
        </div>
      </div>
    </Frame>
  )
}
