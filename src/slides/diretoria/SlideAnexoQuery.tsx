import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Anexo do plano — Query e comunicação. Arquétipo diagrama-svg.
 *
 * Diagrama horizontal com três elementos. O MCP aparece **junto à conexão**,
 * em itálico e fora de qualquer caixa: ele ilustra uma possibilidade de
 * integração e não pode ter aparência de entregável nem de marco. É a única
 * tela do deck em que o MCP aparece.
 */

export const ACTIONS = ['A visão de comunicação']

const CAIXA = 'fill-[#ffffffcc] stroke-[#bfa9d6] [stroke-width:1.6]'

/** Seta dupla: a comunicação vai nos dois sentidos. */
const BIDIRECIONAL = (x: number, y: number) =>
  `M${x - 26} ${y} L${x + 26} ${y} M${x - 26} ${y} l7 -4.5 M${x - 26} ${y} l7 4.5 M${x + 26} ${y} l-7 -4.5 M${x + 26} ${y} l-7 4.5`

export default function SlideAnexoQuery({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Query · Comunicação'>
      <svg
        className='w-full max-h-[52vh] max-[900px]:max-h-none'
        viewBox='0 0 900 230'
        role='img'
        aria-label='Query conversa com os módulos por uma camada de integração; MCP aparece como possibilidade'
      >
        {[
          { x: 40, nome: 'Query' },
          { x: 350, nome: 'Integração' },
          { x: 660, nome: 'Módulos' },
        ].map((c, i) => (
          <g key={c.nome} className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.12 + i * 0.09)}>
            <rect x={c.x} y='60' width='200' height='88' rx='10' className={CAIXA} />
            <text
              x={c.x + 100}
              y='112'
              className='fill-[#312140] text-[22px] font-bold [text-anchor:middle]'
            >
              {c.nome}
            </text>
          </g>
        ))}

        {[295, 605].map((x, i) => (
          <path
            key={x}
            d={BIDIRECIONAL(x, 104)}
            fill='none'
            className='stroke-[#8e73ad] [stroke-width:1.8] animate-ilum-fade motion-reduce:animate-none'
            style={delay(0.45 + i * 0.08)}
          />
        ))}

        {/* Junto à conexão, sem caixa: ilustra uma possibilidade, não uma entrega. */}
        <text
          x='295'
          y='180'
          className='fill-[#6b597b] text-[13px] italic [text-anchor:middle] animate-ilum-in motion-reduce:animate-none'
          style={delay(0.62)}
        >
          MCP (ilustrativo · fora do escopo de front-end)
        </text>
      </svg>
    </Frame>
  )
}
