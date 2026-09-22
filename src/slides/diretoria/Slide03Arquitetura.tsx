import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Slide 3 do plano — A arquitetura em uma imagem. Arquétipo diagrama-svg.
 *
 * Etapa única: o desenho se monta sozinho quando a câmera chega. Três faixas,
 * com o Query ao lado, ligado à faixa dos módulos por uma linha discreta.
 *
 * Três cuidados do plano estão embutidos na geometria:
 * - Produtos e Serviços específicos são **duas células de uma faixa só**, não
 *   duas caixas soltas. É o que permite ligar o Query aos módulos com uma
 *   linha, sem cruzar o desenho para alcançar a célula distante.
 * - Nada liga o front diretamente aos Dados: a faixa desce para APIs, e é a
 *   API que alcança os dados.
 * - Não há um banco por módulo, e o MCP não aparece aqui — ele é o anexo.
 */

export const ACTIONS = ['A estrutura']

/** Meia-seta em V, desenhada a partir da ponta para trás. */
const SETA = 'M-7,-3.8 L0,0 L-7,3.8'

const CAIXA = 'fill-[#ffffffcc] stroke-[#bfa9d6] [stroke-width:1.6]'
const TRACO = 'stroke-[#8e73ad] [stroke-width:1.8]'

export default function Slide03Arquitetura({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Arquitetura'>
      <svg
        className='w-full max-h-[64vh] max-[900px]:max-h-none'
        viewBox='0 0 900 392'
        role='img'
        aria-label='Plataforma sobre a faixa de produtos e serviços específicos, que desce para APIs e dados, com o Query ao lado'
      >
        {/* Faixa 1 — a plataforma */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.12)}>
          <rect x='30' y='22' width='620' height='92' rx='10' className={CAIXA} />
          <text x='52' y='62' className='fill-[#312140] text-[24px] font-bold'>
            Plataforma
          </text>
          <text x='52' y='92' className='fill-[#6b597b] text-[15px]'>
            Navegação · Acesso · Configuração
          </text>
        </g>

        {/* Faixa 2 — os módulos, duas células de uma faixa só */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.24)}>
          <rect x='30' y='155' width='620' height='100' rx='10' className={CAIXA} />
          <line x1='340' y1='155' x2='340' y2='255' className='stroke-[#dacfe6] [stroke-width:1.4]' />
          <text x='185' y='212' className='fill-[#312140] text-[21px] font-bold [text-anchor:middle]'>
            Produtos
          </text>
          <text x='495' y='212' className='fill-[#312140] text-[21px] font-bold [text-anchor:middle]'>
            Serviços específicos
          </text>
        </g>

        {/* Faixa 3 — as APIs e os dados */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.36)}>
          <rect x='120' y='292' width='250' height='76' rx='10' className={CAIXA} />
          <rect x='430' y='292' width='220' height='76' rx='10' className={CAIXA} />
          <text x='245' y='338' className='fill-[#312140] text-[20px] font-bold [text-anchor:middle]'>
            APIs
          </text>
          <text x='540' y='338' className='fill-[#312140] text-[20px] font-bold [text-anchor:middle]'>
            Dados
          </text>
        </g>

        {/* Query, ao lado, ligado aos módulos por uma linha discreta */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.48)}>
          <rect
            x='710'
            y='165'
            width='160'
            height='90'
            rx='10'
            className='fill-[#f3ebff] stroke-[#c3aadc] [stroke-width:1.6]'
          />
          <text x='790' y='203' className='fill-[#312140] text-[20px] font-bold [text-anchor:middle]'>
            Query
          </text>
          <text x='790' y='228' className='fill-[#6b597b] text-[12px] italic [text-anchor:middle]'>
            visão de integração
          </text>
        </g>

        {[
          { d: 'M340 118 L340 147', ponta: { x: 340, y: 149, ang: 90 }, atraso: 0.6 },
          { d: 'M245 259 L245 286', ponta: { x: 245, y: 288, ang: 90 }, atraso: 0.68 },
          { d: 'M374 330 L422 330', ponta: { x: 424, y: 330, ang: 0 }, atraso: 0.76 },
        ].map((l) => (
          <g key={l.d}>
            <path
              d={l.d}
              pathLength={1}
              fill='none'
              className={`${TRACO} [stroke-dasharray:1] animate-ilum-draw motion-reduce:animate-none`}
              style={delay(l.atraso)}
            />
            <path
              d={SETA}
              fill='none'
              transform={`translate(${l.ponta.x} ${l.ponta.y}) rotate(${l.ponta.ang})`}
              className={`${TRACO} animate-ilum-tip motion-reduce:animate-none`}
              style={delay(l.atraso + 0.5)}
            />
          </g>
        ))}

        {/* Discreta de propósito: o Query é visão de integração, não uma dependência do fluxo. */}
        <path
          d='M706 210 L656 210'
          pathLength={1}
          fill='none'
          className='stroke-[#b49cce] [stroke-width:1.5] [stroke-dasharray:0.06] animate-ilum-fade motion-reduce:animate-none'
          style={delay(0.86)}
        />
      </svg>
    </Frame>
  )
}
