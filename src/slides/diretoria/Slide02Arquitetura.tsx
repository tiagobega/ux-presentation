import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Slide 2 do plano — Arquitetura. Absorve os antigos slides 2, 3 e 4
 * (vocabulário, desenho da arquitetura e base compartilhada).
 *
 * Um desenho só, que nunca se reposiciona. A primeira etapa monta o diagrama e
 * as seis seguintes acendem um termo por vez, com uma definição curta na
 * faixa de baixo. É a exceção assumida ao critério editorial do plano: o
 * vocabulário precisa de uma linha de explicação, e uma linha por vez mantém
 * a tela com uma ideia só.
 *
 * **Onde cada peça da base compartilhada entra** é o argumento do slide, e
 * está na geometria: o design system liga na plataforma, o registry liga na
 * faixa dos módulos e o microfront-end liga no conector entre as duas — ele é
 * o encaixe, não uma camada.
 *
 * Três cuidados do plano seguem embutidos:
 * - Produtos e Serviços específicos são duas células de uma faixa só, o que
 *   permite ligar o Query aos módulos com uma linha, sem cruzar o desenho.
 * - Nada liga o front diretamente aos Dados: a faixa desce para APIs, e é a
 *   API que alcança os dados.
 * - Não há um banco por módulo, e o MCP não aparece aqui — ele é o anexo.
 */

type Foco =
  | 'plataforma'
  | 'produto'
  | 'servico'
  | 'designSystem'
  | 'registry'
  | 'microfrontends'

interface Definicao {
  /** Rótulo da etapa na nav e termo em destaque na faixa. */
  termo: string
  texto: string
}

const DEFINICOES: Record<Foco, Definicao> = {
  plataforma: {
    termo: 'Plataforma',
    texto: 'A aplicação que reúne e configura os módulos: navegação, acesso e configuração.',
  },
  produto: {
    termo: 'Produto',
    texto: 'Capacidade que queremos aproveitar em mais de uma plataforma.',
  },
  servico: {
    termo: 'Serviço específico',
    texto: 'A extensão que atende uma necessidade particular daquele cliente.',
  },
  designSystem: {
    termo: 'Design system',
    texto: 'A experiência comum: componentes e padrões visuais usados por todos.',
  },
  registry: {
    termo: 'Registry',
    texto: 'A distribuição: onde componentes e blocos padronizados são publicados para quem constrói as aplicações.',
  },
  microfrontends: {
    termo: 'Microfront-ends',
    texto: 'O encaixe: produtos com autonomia justificada evoluem separados e são incorporados à plataforma.',
  },
}

/** A ordem da fala: primeiro o que a arquitetura é, depois o que a sustenta. */
const ORDEM: Foco[] = [
  'plataforma',
  'produto',
  'servico',
  'designSystem',
  'registry',
  'microfrontends',
]

export const ACTIONS = ['A estrutura', ...ORDEM.map((f) => DEFINICOES[f].termo)]

/** Meia-seta em V, desenhada a partir da ponta para trás. */
const SETA = 'M-7,-3.8 L0,0 L-7,3.8'

const NEUTRA = 'fill-[#ffffffcc] stroke-[#bfa9d6] [stroke-width:1.6]'
const ACESA = 'fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.4]'
const TRACO = 'stroke-[#8e73ad] [stroke-width:1.8]'
const TRACO_ACESO = 'stroke-[#7c3aed] [stroke-width:2.6]'
/** Ligações de apoio: pontilhadas, porque sustentam o desenho e não são o fluxo. */
const APOIO = 'stroke-[#b49cce] [stroke-width:1.5] [stroke-dasharray:5_5]'
const APOIO_ACESO = 'stroke-[#7c3aed] [stroke-width:2.2] [stroke-dasharray:5_5]'

/** As três peças da base compartilhada, na altura do que cada uma serve. */
const BASE: { foco: Foco; y: number; nome: string }[] = [
  { foco: 'designSystem', y: 52, nome: 'Design system' },
  { foco: 'microfrontends', y: 124, nome: 'Microfront-ends' },
  { foco: 'registry', y: 201, nome: 'Registry' },
]

export default function Slide02Arquitetura({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  const foco: Foco | null = step === 0 ? null : ORDEM[step - 1]
  const def = foco ? DEFINICOES[foco] : null
  const aceso = (f: Foco) => foco === f

  return (
    <Frame title='Arquitetura'>
      <svg
        className='w-full max-h-[56vh] max-[900px]:max-h-none'
        viewBox='0 0 1000 420'
        role='img'
        aria-label='Plataforma sobre a faixa de produtos e serviços específicos, que desce para APIs e dados; a base compartilhada liga design system, microfront-ends e registry ao desenho, com o Query ao lado'
      >
        {/* ── Base compartilhada ── */}
        <g className='animate-ilum-fade motion-reduce:animate-none' style={delay(0.1)}>
          <rect
            x='0'
            y='40'
            width='200'
            height='235'
            rx='10'
            className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]'
          />
          <text x='10' y='30' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>
            BASE COMPARTILHADA
          </text>
        </g>

        {BASE.map((p, i) => (
          <g
            key={p.foco}
            className='animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.2 + i * 0.06)}
          >
            <rect
              x='12'
              y={p.y}
              width='176'
              height='62'
              rx='9'
              className={`${aceso(p.foco) ? ACESA : NEUTRA} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
            />
            <text
              x='100'
              y={p.y + 37}
              className='fill-[#312140] text-[16px] font-bold [text-anchor:middle]'
            >
              {p.nome}
            </text>
          </g>
        ))}

        {/* ── Faixa 1: a plataforma ── */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.16)}>
          <rect
            x='250'
            y='40'
            width='570'
            height='92'
            rx='10'
            className={`${aceso('plataforma') ? ACESA : NEUTRA} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
          />
          <text x='272' y='80' className='fill-[#312140] text-[24px] font-bold'>
            Plataforma
          </text>
          <text x='272' y='110' className='fill-[#6b597b] text-[15px]'>
            Navegação · Acesso · Configuração
          </text>
        </g>

        {/* ── Faixa 2: os módulos, duas células de uma faixa só ── */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.28)}>
          <rect x='250' y='182' width='570' height='100' rx='10' className={NEUTRA} />
          {/* Realce por célula: cantos arredondados só do lado de fora da faixa. */}
          {aceso('produto') && (
            <path
              d='M260 182 h275 v100 h-275 a10 10 0 0 1 -10 -10 v-80 a10 10 0 0 1 10 -10 z'
              className='fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.4] animate-ilum-fade motion-reduce:animate-none'
            />
          )}
          {aceso('servico') && (
            <path
              d='M535 182 h275 a10 10 0 0 1 10 10 v80 a10 10 0 0 1 -10 10 h-275 z'
              className='fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.4] animate-ilum-fade motion-reduce:animate-none'
            />
          )}
          <line x1='535' y1='182' x2='535' y2='282' className='stroke-[#dacfe6] [stroke-width:1.4]' />
          <text x='392' y='239' className='fill-[#312140] text-[21px] font-bold [text-anchor:middle]'>
            Produtos
          </text>
          <text x='677' y='239' className='fill-[#312140] text-[21px] font-bold [text-anchor:middle]'>
            Serviços específicos
          </text>
        </g>

        {/* ── Faixa 3: APIs e dados ── */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.4)}>
          <rect x='290' y='322' width='210' height='70' rx='10' className={NEUTRA} />
          <rect x='570' y='322' width='210' height='70' rx='10' className={NEUTRA} />
          <text x='395' y='365' className='fill-[#312140] text-[20px] font-bold [text-anchor:middle]'>
            APIs
          </text>
          <text x='675' y='365' className='fill-[#312140] text-[20px] font-bold [text-anchor:middle]'>
            Dados
          </text>
        </g>

        {/* ── Query, ao lado ── */}
        <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.52)}>
          <rect
            x='860'
            y='190'
            width='140'
            height='84'
            rx='10'
            className='fill-[#f3ebff] stroke-[#c3aadc] [stroke-width:1.6]'
          />
          <text x='930' y='226' className='fill-[#312140] text-[19px] font-bold [text-anchor:middle]'>
            Query
          </text>
          <text x='930' y='250' className='fill-[#6b597b] text-[12px] italic [text-anchor:middle]'>
            visão de integração
          </text>
        </g>

        {/* Fluxo: plataforma → módulos → APIs → dados */}
        {[
          {
            d: 'M535 133 L535 176',
            ponta: { x: 535, y: 178, ang: 90 },
            atraso: 0.64,
            // O conector é o próprio microfront-end: o encaixe entre as duas faixas.
            realce: 'microfrontends' as Foco,
          },
          { d: 'M395 283 L395 316', ponta: { x: 395, y: 318, ang: 90 }, atraso: 0.72, realce: null },
          { d: 'M504 357 L562 357', ponta: { x: 564, y: 357, ang: 0 }, atraso: 0.8, realce: null },
        ].map((l) => {
          const forte = l.realce !== null && aceso(l.realce)
          const classe = forte ? TRACO_ACESO : TRACO
          return (
            <g key={l.d}>
              <path
                d={l.d}
                pathLength={1}
                fill='none'
                className={`${classe} [stroke-dasharray:1] animate-ilum-draw motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none`}
                style={delay(l.atraso)}
              />
              <path
                d={SETA}
                fill='none'
                transform={`translate(${l.ponta.x} ${l.ponta.y}) rotate(${l.ponta.ang})`}
                className={`${classe} animate-ilum-tip motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none`}
                style={delay(l.atraso + 0.5)}
              />
            </g>
          )
        })}

        {/* Apoio: cada peça da base compartilhada ligada ao que ela sustenta. */}
        {[
          { d: 'M192 83 L246 86', foco: 'designSystem' as Foco, atraso: 0.88 },
          { d: 'M192 155 L529 155', foco: 'microfrontends' as Foco, atraso: 0.94 },
          { d: 'M192 232 L246 232', foco: 'registry' as Foco, atraso: 1 },
        ].map((l) => (
          <path
            key={l.d}
            d={l.d}
            fill='none'
            className={`${aceso(l.foco) ? APOIO_ACESO : APOIO} animate-ilum-fade motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none`}
            style={delay(l.atraso)}
          />
        ))}

        {/* Discreta de propósito: o Query é visão de integração, não dependência do fluxo. */}
        <path
          d='M856 232 L824 232'
          fill='none'
          className={`${APOIO} animate-ilum-fade motion-reduce:animate-none`}
          style={delay(1.06)}
        />
      </svg>

      {/* Uma definição por vez. A faixa ocupa o lugar desde o primeiro quadro. */}
      <div className='min-h-[74px] flex items-center'>
        {def && (
          <p
            key={action}
            className='w-full rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.15vw,17px)] leading-[1.45] py-4 px-6 animate-ilum-in motion-reduce:animate-none'
          >
            <span className='font-[700]'>{def.termo}.</span> {def.texto}
          </p>
        )}
      </div>
    </Frame>
  )
}
