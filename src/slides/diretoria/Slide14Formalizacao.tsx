import type { SlideProps } from '../config'
import { Cartao, Frame, Termo, delay } from './ui'

/**
 * Slide 14 do plano — O plano que formalizamos. Arquétipo título+grade.
 *
 * Lista simples dos compromissos, com destaque **apenas para os prazos**: só
 * os dois primeiros itens têm data, e são os dois únicos em roxo. Os outros
 * dois ficam sem qualificador para não inventar prazo onde não há.
 */

interface Compromisso {
  termo: string
  prazo?: string
}

const COMPROMISSOS: Compromisso[] = [
  { termo: 'POC', prazo: '15/10' },
  { termo: 'Expansão', prazo: 'Seis meses' },
  { termo: 'Continuidade operacional' },
  { termo: 'Responsabilidades e acompanhamento' },
]

export const ACTIONS = ['O compromisso']

export default function Slide14Formalizacao({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Formalização do plano'>
      <div className='flex flex-col gap-3'>
        {COMPROMISSOS.map((c, i) => (
          <Cartao
            key={c.termo}
            estado='aceso'
            className='px-8 py-6 flex items-baseline gap-5 animate-ilum-rise motion-reduce:animate-none max-[900px]:flex-col max-[900px]:gap-1'
            style={delay(0.12 + i * 0.08)}
          >
            <Termo>{c.termo}</Termo>
            {c.prazo && (
              <span className='text-[clamp(17px,1.7vw,27px)] font-[700] tracking-[-0.6px] text-[#7c3aed]'>
                · {c.prazo}
              </span>
            )}
          </Cartao>
        ))}
      </div>
    </Frame>
  )
}
