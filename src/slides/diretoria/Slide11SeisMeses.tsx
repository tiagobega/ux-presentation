import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Termo, delay } from './ui'

/**
 * Slide 11 do plano — Os seis meses seguintes. Arquétipo linha-do-tempo.
 *
 * Três blocos depois da POC. Só a duração de seis meses foi confirmada: os
 * blocos são proposta de organização, e nenhum produto é atribuído a um
 * período. As bolinhas vivem na mesma grade dos cartões, com o mesmo `gap` —
 * é isso que garante o alinhamento, já que com os cartões numa grade o centro
 * de cada um não cai em 1/6, 3/6 e 5/6 por causa dos vãos.
 */

interface Bloco {
  periodo: string
  marco: string
}

const BLOCOS: Bloco[] = [
  { periodo: 'Meses 1–2', marco: 'Base e catálogo' },
  { periodo: 'Meses 3–4', marco: 'Incorporação de produtos' },
  { periodo: 'Meses 5–6', marco: 'Adoção e estabilização' },
]

const GRADE = 'grid grid-cols-3 gap-5 max-[900px]:grid-cols-1'

export const ACTIONS = ['A expansão']

export default function Slide11SeisMeses({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Expansão · Cronograma proposto'>
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
            {BLOCOS.map((b, i) => (
              <div key={b.periodo} className='flex justify-center'>
                <span
                  className='w-4 h-4 rounded-full border-2 bg-white border-[#7c3aed] animate-ilum-pop motion-reduce:animate-none'
                  style={delay(0.45 + i * 0.09)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={GRADE}>
          {BLOCOS.map((b, i) => (
            <Cartao
              key={b.periodo}
              estado='aceso'
              className='px-6 py-8 animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.62 + i * 0.09)}
            >
              <Rotulo>{b.periodo.toUpperCase()}</Rotulo>
              <span className='block mt-3'>
                <Termo>{b.marco}</Termo>
              </span>
            </Cartao>
          ))}
        </div>

        <p
          className='text-center text-[clamp(13px,1.15vw,17px)] text-[#5a3581] animate-ilum-in motion-reduce:animate-none'
          style={delay(1)}
        >
          Outubro de 2026 → Abril de 2027
        </p>
      </div>
    </Frame>
  )
}
