import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Como um serviço se monta.
 *
 * Um desenho só, que nunca se reposiciona: registry à esquerda, shell no
 * centro, serviços entregues à direita. Cada etapa acende as peças daquela
 * parte da conversa e a legenda abaixo troca — o resto do desenho continua
 * legível, em vez de apagar.
 *
 * A legenda usa `key={action}` de propósito: trocar a chave remonta o
 * parágrafo, e a animação de entrada roda de novo a cada etapa.
 *
 * As pontas de seta são elementos comuns, não `marker`: marcador ignora o
 * `stroke-dashoffset` que desenha a linha, e as pontas apareceriam todas no
 * primeiro quadro, soltas, enquanto as linhas ainda cresciam até elas.
 */

type Foco = 'shell' | 'registry' | 'modulos' | 'tema'

const LEGENDAS: Record<Foco, { rotulo: string; texto: string }> = {
  shell: {
    rotulo: 'Shell',
    texto:
      'O shell é a aplicação que o usuário abre. Ele resolve a rota, carrega o que precisa e guarda quem está logado.',
  },
  registry: {
    rotulo: 'Registry',
    texto:
      'Cada produto é publicado versionado no registry. É de lá que o shell sabe o que existe e em que versão.',
  },
  modulos: {
    rotulo: 'Módulos',
    texto:
      'O módulo é carregado em tempo de execução. Subir uma versão do produto não exige reconstruir o serviço.',
  },
  tema: {
    rotulo: 'Tema por cliente',
    texto:
      'Os mesmos módulos viram três serviços diferentes. Muda a composição, o tema e a configuração, não o código.',
  },
}

const ORDEM: Foco[] = ['shell', 'registry', 'modulos', 'tema']

export const ACTIONS = ORDEM.map((f) => LEGENDAS[f].rotulo)

interface Caixa {
  x: number
  y: number
  w: number
  h: number
  titulo: string
  sub?: string
  focos: Foco[]
}

/** Produtos publicados. Um cartão por módulo, na coluna da esquerda. */
const MODULOS: Caixa[] = [
  { x: 20, y: 70, w: 220, h: 56, titulo: 'Query', sub: 'Consulta e relatório', focos: ['registry', 'modulos'] },
  { x: 20, y: 140, w: 220, h: 56, titulo: 'Informs', sub: 'Formulário em campo', focos: ['registry', 'modulos'] },
  { x: 20, y: 210, w: 220, h: 56, titulo: 'Gates', sub: 'Identidade', focos: ['registry', 'modulos'] },
  { x: 20, y: 280, w: 220, h: 56, titulo: 'Obras', sub: 'Planejamento', focos: ['registry', 'modulos'] },
]

/** O que o shell resolve para todo módulo que sobe nele. */
const CAMADAS_SHELL: Caixa[] = [
  { x: 315, y: 65, w: 260, h: 58, titulo: 'Roteamento e carregamento', focos: ['shell', 'modulos'] },
  { x: 315, y: 135, w: 260, h: 58, titulo: 'Sessão e permissões', focos: ['shell'] },
  { x: 315, y: 205, w: 260, h: 58, titulo: 'Design System e tokens', focos: ['shell'] },
  { x: 315, y: 275, w: 260, h: 58, titulo: 'Tema e configuração do cliente', focos: ['shell', 'tema'] },
]

interface Servico {
  y: number
  nome: string
  modulos: string
  /** Cor do cabeçalho: é o tema do cliente, o que muda de um serviço para o outro. */
  cor: string
}

const SERVICOS: Servico[] = [
  { y: 45, nome: 'Uberlândia', modulos: 'Query · Informs · Obras', cor: '#2563eb' },
  { y: 160, nome: 'SABESP', modulos: 'Informs · Query', cor: '#0ea5e9' },
  { y: 275, nome: 'Recape', modulos: 'Obras · Query', cor: '#f97316' },
]

interface Ligacao {
  d: string
  ponta: { x: number; y: number; ang: number }
  focos: Foco[]
}

const LIGACOES: Ligacao[] = [
  { d: 'M249 205 L292 205', ponta: { x: 292, y: 205, ang: 0 }, focos: ['modulos'] },
  { d: 'M594 205 C622 205 624 92 647 92', ponta: { x: 647, y: 92, ang: 0 }, focos: ['tema'] },
  { d: 'M594 205 L647 207', ponta: { x: 647, y: 207, ang: 2 }, focos: ['tema'] },
  { d: 'M594 205 C622 205 624 322 647 322', ponta: { x: 647, y: 322, ang: 0 }, focos: ['tema'] },
]

/** Meia-seta em V, desenhada a partir da ponta para trás. */
const SETA = 'M-8,-4.2 L0,0 L-8,4.2'

function Bloco({ c, aceso, ordem }: { c: Caixa; aceso: boolean; ordem: number }) {
  const caixa = aceso
    ? 'fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.4]'
    : 'fill-[#faf7ff] stroke-[#bfa9d6] [stroke-width:1.5]'

  return (
    <g className='animate-ilum-rise motion-reduce:animate-none' style={delay(0.15 + ordem * 0.05)}>
      <rect
        x={c.x}
        y={c.y}
        width={c.w}
        height={c.h}
        rx={8}
        className={`${caixa} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
      />
      <text x={c.x + 14} y={c.sub ? c.y + 25 : c.y + c.h / 2 + 5} className='fill-[#312140] text-[15px] font-semibold'>
        {c.titulo}
      </text>
      {c.sub && (
        <text x={c.x + 14} y={c.y + 44} className='fill-[#6b597b] text-[12px] font-normal'>
          {c.sub}
        </text>
      )}
    </g>
  )
}

export default function Slide02Composicao({ action }: SlideProps) {
  const foco = ORDEM[Math.max(0, ACTIONS.indexOf(action))]
  const aceso = (c: { focos: Foco[] }) => c.focos.includes(foco)

  return (
    <Frame
      title='Como um serviço se monta'
      note='Composição, tema e configuração são dados do serviço. O código do módulo é o mesmo nos três.'
    >
      <svg
        className='w-full max-h-[58vh] max-[900px]:max-h-none'
        viewBox='0 0 900 400'
        role='img'
        aria-label='Registry de módulos, shell da plataforma e os serviços entregues a cada cliente'
      >
        <g className='animate-ilum-fade motion-reduce:animate-none'>
          <rect x='5' y='30' width='250' height='350' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <rect x='300' y='30' width='290' height='350' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <rect x='640' y='30' width='255' height='350' className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]' />
          <text x='17' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>REGISTRY DE MÓDULOS</text>
          <text x='312' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>PLATAFORMA · SHELL</text>
          <text x='652' y='22' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>SERVIÇOS ENTREGUES</text>
        </g>

        {MODULOS.map((c, i) => (
          <Bloco key={c.titulo} c={c} aceso={aceso(c)} ordem={i} />
        ))}
        {CAMADAS_SHELL.map((c, i) => (
          <Bloco key={c.titulo} c={c} aceso={aceso(c)} ordem={i + 4} />
        ))}

        <text x='17' y='365' className='fill-[#6b597b] text-[12px]'>
          versionados e publicados
        </text>

        {/* Serviços: janelinha com o cabeçalho na cor do cliente. */}
        {SERVICOS.map((s, i) => {
          const ligado = foco === 'tema'
          return (
            <g
              key={s.nome}
              className='animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.35 + i * 0.06)}
            >
              <rect
                x={655}
                y={s.y}
                width={235}
                height={95}
                rx={8}
                className={`transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none ${
                  ligado
                    ? 'fill-[#ffffff] stroke-[#6d28d9] [stroke-width:2.4]'
                    : 'fill-[#faf7ff] stroke-[#bfa9d6] [stroke-width:1.5]'
                }`}
              />
              <path
                d={`M655 ${s.y + 8} a8 8 0 0 1 8 -8 h219 a8 8 0 0 1 8 8 v16 h-235 z`}
                fill={ligado ? s.cor : '#c9b6de'}
                className='transition-[fill] duration-300 motion-reduce:transition-none'
              />
              <text x={772} y={s.y + 18} className='fill-white text-[12px] font-semibold [text-anchor:middle]'>
                {s.nome}
              </text>
              <text x={772} y={s.y + 50} className='fill-[#312140] text-[13px] [text-anchor:middle]'>
                {s.modulos}
              </text>
              <text x={772} y={s.y + 74} className='fill-[#6b597b] text-[11px] [text-anchor:middle]'>
                mesma base · tema do cliente
              </text>
            </g>
          )
        })}

        {LIGACOES.map((l, i) => {
          const ligado = aceso(l)
          const traco = ligado ? 'stroke-[#7c3aed] [stroke-width:2.4]' : 'stroke-[#c0aed2] [stroke-width:1.6]'
          return (
            <g key={l.d}>
              <path
                d={l.d}
                pathLength={1}
                fill='none'
                className={`[stroke-dasharray:1] animate-ilum-draw motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none ${traco}`}
                style={delay(0.6 + i * 0.06)}
              />
              <path
                d={SETA}
                fill='none'
                transform={`translate(${l.ponta.x} ${l.ponta.y}) rotate(${l.ponta.ang})`}
                className={`animate-ilum-tip motion-reduce:animate-none transition-[stroke,stroke-width] duration-300 motion-reduce:transition-none ${traco}`}
                style={delay(1.1 + i * 0.06)}
              />
            </g>
          )
        })}

        <text x={270} y={196} className='fill-[#6b597b] text-[11px] [text-anchor:middle]'>
          carrega
        </text>
        <text x={270} y={225} className='fill-[#6b597b] text-[11px] [text-anchor:middle]'>
          em runtime
        </text>
      </svg>

      <p
        key={action}
        className='rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-6 animate-ilum-in motion-reduce:animate-none'
      >
        <span className='font-semibold'>{LEGENDAS[foco].rotulo}.</span> {LEGENDAS[foco].texto}
      </p>
    </Frame>
  )
}
