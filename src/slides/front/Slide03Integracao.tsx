import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Como o front conversa com o back.
 *
 * Cinco conversas, uma por linha, e três faixas: o que roda no navegador, o
 * contrato que as duas pontas combinam e o que responde do outro lado. Cada
 * etapa acende uma linha inteira — as caixas e as setas daquela conversa.
 *
 * A linha do tempo real aponta ao contrário de propósito: ali quem começa a
 * conversa é o back-end.
 */

interface Conversa {
  /** Rótulo da etapa na nav. */
  key: string
  navegador: { titulo: string; sub: string }
  contrato: { titulo: string; sub: string }
  backend: { titulo: string; sub: string }
  /** A conversa começa no back-end: as setas apontam para o navegador. */
  reverso?: boolean
  legenda: string
}

const CONVERSAS: Conversa[] = [
  {
    key: 'Sessão',
    navegador: { titulo: 'Shell', sub: 'guarda a sessão' },
    contrato: { titulo: 'Gates', sub: 'Cognito · PKCE · token' },
    backend: { titulo: 'Usuários e permissões', sub: 'quem é e o que pode' },
    legenda:
      'Um login só. O shell guarda a sessão e todo módulo herda quem é o usuário e o que ele pode fazer.',
  },
  {
    key: 'Dados',
    navegador: { titulo: 'Módulos', sub: 'Informs · Fleets · Obras' },
    contrato: { titulo: 'Cliente de dados', sub: 'tipos · erro · repetição' },
    backend: { titulo: 'APIs por produto', sub: 'uma por domínio' },
    legenda:
      'Todo módulo fala com o back pelo mesmo cliente: mesmo contrato de tipos, mesmo tratamento de erro, mesma política de repetição.',
  },
  {
    key: 'Tempo real',
    navegador: { titulo: 'Acompanhamento', sub: 'mapa · alertas' },
    contrato: { titulo: 'Canal aberto', sub: 'WebSocket' },
    backend: { titulo: 'Ilum', sub: 'eventos e rastreio' },
    reverso: true,
    legenda:
      'Rastreio e alerta chegam empurrados pelo back-end. O front não fica perguntando de novo a cada segundo.',
  },
  {
    key: 'Offline',
    navegador: { titulo: 'Fila local', sub: 'o que o campo fez sem rede' },
    contrato: { titulo: 'Sincronização', sub: 'sobe quando a rede volta' },
    backend: { titulo: 'APIs por produto', sub: 'mesma porta de entrada' },
    legenda:
      'O que o campo faz sem rede fica numa fila no aparelho e sobe pela mesma porta quando a rede volta.',
  },
  {
    key: 'Observabilidade',
    navegador: { titulo: 'Uso e erro', sub: 'eventos do front' },
    contrato: { titulo: 'Coletor', sub: 'sessão · versão do módulo' },
    backend: { titulo: 'Métricas e logs', sub: 'baseline da plataforma' },
    legenda:
      'Uso, erro e adoção dos componentes compartilhados chegam ao mesmo lugar que as métricas do back. É o baseline que hoje não existe.',
  },
]

export const ACTIONS = CONVERSAS.map((c) => c.key)

/** Geometria das faixas. Uma linha por conversa, sempre na mesma altura. */
const FAIXAS = [
  { x: 15, w: 235 },
  { x: 330, w: 250 },
  { x: 655, w: 235 },
]
const LINHA_Y = (i: number) => 48 + i * 66
const CENTRO_Y = (i: number) => LINHA_Y(i) + 26
const ALTURA = 52

/** Meia-seta em V, desenhada a partir da ponta para trás. */
const SETA = 'M-8,-4.2 L0,0 L-8,4.2'

function Bloco({
  faixa,
  linha,
  titulo,
  sub,
  aceso,
  ordem,
}: {
  faixa: number
  linha: number
  titulo: string
  sub: string
  aceso: boolean
  ordem: number
}) {
  const { x, w } = FAIXAS[faixa]
  const y = LINHA_Y(linha)
  const caixa = aceso
    ? 'fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.4]'
    : 'fill-[#faf7ff] stroke-[#bfa9d6] [stroke-width:1.5]'

  return (
    <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.12 + ordem * 0.04)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={ALTURA}
        rx={8}
        className={`${caixa} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
      />
      <text x={x + 13} y={y + 22} className='fill-[#312140] text-[15px] font-semibold'>
        {titulo}
      </text>
      <text x={x + 13} y={y + 40} className='fill-[#6b597b] text-[12px] font-normal'>
        {sub}
      </text>
    </g>
  )
}

/** Seta entre duas faixas vizinhas, na altura da linha. */
function Ligacao({
  de,
  para,
  linha,
  reverso,
  aceso,
  ordem,
}: {
  de: number
  para: number
  linha: number
  reverso?: boolean
  aceso: boolean
  ordem: number
}) {
  const fim = FAIXAS[de].x + FAIXAS[de].w + 4
  const inicio = FAIXAS[para].x - 4
  const y = CENTRO_Y(linha)
  const d = reverso ? `M${inicio} ${y} L${fim} ${y}` : `M${fim} ${y} L${inicio} ${y}`
  const ponta = reverso ? { x: fim, ang: 180 } : { x: inicio, ang: 0 }
  const traco = aceso
    ? 'stroke-[#7c3aed] [stroke-width:2.4]'
    : 'stroke-[#c0aed2] [stroke-width:1.6]'

  return (
    <g>
      <path
        d={d}
        pathLength={1}
        fill='none'
        className={`[stroke-dasharray:1] animate-ilum-draw motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none ${traco}`}
        style={delay(0.55 + ordem * 0.04)}
      />
      <path
        d={SETA}
        fill='none'
        transform={`translate(${ponta.x} ${y}) rotate(${ponta.ang})`}
        className={`animate-ilum-tip motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none ${traco}`}
        style={delay(1.05 + ordem * 0.04)}
      />
    </g>
  )
}

export default function Slide03Integracao({ action }: SlideProps) {
  const atual = Math.max(0, ACTIONS.indexOf(action))
  const conversa = CONVERSAS[atual]

  return (
    <Frame
      title='Como o front conversa com o back'
      note='O que muda de um produto para o outro é o que a API responde, não a forma de chamar. Por isso o contrato fica na plataforma e não em cada módulo.'
    >
      <svg
        className='w-full max-h-[58vh] max-[900px]:max-h-none'
        viewBox='0 0 900 400'
        role='img'
        aria-label='Sessão, dados, tempo real, offline e observabilidade entre o navegador e o back-end'
      >
        <g className='animate-ilum-fade motion-reduce:animate-none'>
          <rect x='5' y='30' width='255' height='348' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <rect x='320' y='30' width='270' height='348' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <rect x='645' y='30' width='255' height='348' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <text x='17' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>NAVEGADOR</text>
          <text x='332' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>CONTRATO COMPARTILHADO</text>
          <text x='657' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>BACK-END</text>
        </g>

        {CONVERSAS.map((c, i) => {
          const aceso = i === atual
          return (
            <g key={c.key}>
              <Bloco faixa={0} linha={i} titulo={c.navegador.titulo} sub={c.navegador.sub} aceso={aceso} ordem={i * 3} />
              <Bloco faixa={1} linha={i} titulo={c.contrato.titulo} sub={c.contrato.sub} aceso={aceso} ordem={i * 3 + 1} />
              <Bloco faixa={2} linha={i} titulo={c.backend.titulo} sub={c.backend.sub} aceso={aceso} ordem={i * 3 + 2} />
              <Ligacao de={0} para={1} linha={i} reverso={c.reverso} aceso={aceso} ordem={i * 2} />
              <Ligacao de={1} para={2} linha={i} reverso={c.reverso} aceso={aceso} ordem={i * 2 + 1} />
            </g>
          )
        })}
      </svg>

      <p
        key={action}
        className='rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-6 animate-ilum-in motion-reduce:animate-none'
      >
        <span className='font-semibold'>{conversa.key}.</span> {conversa.legenda}
      </p>
    </Frame>
  )
}
