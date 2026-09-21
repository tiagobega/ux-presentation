import { Fragment } from 'react'
import type { SlideProps } from '../config'
import { LOGOS, type LogoId } from './logos'
import { Frame, delay } from './ui'

/**
 * Arquitetura atual e problemas.
 *
 * Sete etapas sobre UM único desenho, que nunca é reposicionado:
 * 1. o diagrama se desenha (zonas → nós → conexões → faixa de identidade);
 * 2 a 6. cada etapa marca um problema e **mantém as marcas anteriores acesas**,
 *    para os cinco problemas ficarem empilhados sobre o mesmo desenho;
 * 7. as consequências, já com os cinco problemas marcados.
 */

type NodeId =
  | 'react' | 'powerbi' | 'cliente'
  | 'hardware' | 'ingestao' | 'oracle' | 'yoda'
  | 'minio' | 's3' | 'supabase'

interface DiagramNode {
  id: NodeId
  x: number
  y: number
  /**
   * O que sobra escrito na linha do título. Fica vazio quando o logo já é a
   * marca por extenso (Oracle), e guarda só o qualificador quando o logo diz
   * a tecnologia e o nome interno precisa aparecer (Yoda, LLM, triggers).
   */
  title: string
  sub: string
  logo?: LogoId
  /** Altura do logo em unidades do viewBox; a largura sai do `aspect`. */
  logoH?: number
}

/** Caixas do diagrama, na ordem em que se desenham na etapa 1. */
const NODES: DiagramNode[] = [
  { id: 'react', x: 20, y: 42, title: 'React · APEX / OCI', sub: 'APIs no APEX' },
  { id: 'powerbi', x: 215, y: 42, title: 'Power BI · Flutter', sub: 'Servidor interno' },
  { id: 'cliente', x: 410, y: 42, title: 'Ambiente cliente', sub: 'APIs · bancos · cloud' },
  { id: 'hardware', x: 20, y: 177, title: 'Hardware', sub: 'Geração de dados' },
  { id: 'ingestao', x: 20, y: 282, title: 'triggers', sub: 'Cron-jobs · APIs', logo: 'nodered', logoH: 22 },
  { id: 'oracle', x: 235, y: 282, title: '', sub: 'Cidades e ambientes', logo: 'oracle', logoH: 16 },
  { id: 'yoda', x: 425, y: 282, title: 'Yoda', sub: 'Base central', logo: 'postgresql', logoH: 22 },
  { id: 'minio', x: 645, y: 42, title: 'MinIO', sub: 'On-premises', logo: 'minio', logoH: 20 },
  { id: 's3', x: 645, y: 177, title: 'S3', sub: 'AWS · imagens', logo: 's3', logoH: 22 },
  { id: 'supabase', x: 645, y: 307, title: 'LLM', sub: 'Dados e processamento', logo: 'supabase', logoH: 20 },
]

interface Link {
  d: string
  /** Números dos problemas que passam por esse caminho. */
  ps: number[]
  /**
   * Ponta da seta: onde o caminho termina e para onde ele aponta, em graus.
   *
   * A seta não é um `marker` do SVG de propósito. Marcador ignora o
   * `stroke-dashoffset` que desenha a linha, então as dez pontas apareciam
   * todas no primeiro quadro, soltas, enquanto as linhas ainda cresciam até
   * elas. Como elemento comum, cada ponta tem o próprio tempo e entra quando
   * a sua linha chega.
   *
   * Os valores saem da ponta do `d` — ao mexer no caminho, recalcule aqui
   * (ângulo = atan2 do trecho final).
   */
  ponta: { x: number; y: number; ang: number }
}

/** Conexões relatadas entre os ambientes. */
const LINKS: Link[] = [
  { d: 'M95 108 L320 284', ps: [4], ponta: { x: 320, y: 284, ang: 38 } },
  { d: 'M290 108 L505 284', ps: [3], ponta: { x: 505, y: 284, ang: 39.3 } },
  { d: 'M500 108 L500 284', ps: [3], ponta: { x: 500, y: 284, ang: 90 } },
  { d: 'M500 108 L315 284', ps: [4], ponta: { x: 315, y: 284, ang: 136.4 } },
  { d: 'M95 242 L95 282', ps: [1], ponta: { x: 95, y: 282, ang: 90 } },
  { d: 'M182 316 L232 316', ps: [1], ponta: { x: 232, y: 316, ang: 0 } },
  { d: 'M182 330 C200 380 445 395 490 348', ps: [1, 3], ponta: { x: 490, y: 348, ang: -44.6 } },
  { d: 'M590 327 C625 327 625 339 645 339', ps: [5], ponta: { x: 645, y: 339, ang: 1.2 } },
  { d: 'M730 307 C825 190 670 140 588 86', ps: [5], ponta: { x: 588, y: 86, ang: -146.8 } },
  { d: 'M727 111 L727 177', ps: [2], ponta: { x: 727, y: 177, ang: 90 } },
]

/** Meia-seta em V, desenhada a partir da ponta para trás. */
const SETA = 'M-8,-4.2 L0,0 L-8,4.2'

/** Quando a linha `i` começa a se desenhar, e quando a ponta dela chega. */
const atrasoDaLinha = (i: number) => 0.65 + i * 0.04
const atrasoDaPonta = (i: number) => atrasoDaLinha(i) + 0.55

interface Problem {
  /** Rótulo do step, como aparece na nav. */
  key: string
  title: string
  text: string
  nodes: NodeId[]
  /** Marca também a faixa de identidade no rodapé do diagrama. */
  identidade?: boolean
}

const PROBLEMS: Problem[] = [
  {
    key: 'Ingestão',
    title: 'Ingestão e processamento',
    text: 'Node-RED, triggers e cron-jobs sem padrão comum de versionamento, documentação e monitoramento. Manutenção dependente de conhecimento localizado.',
    nodes: ['ingestao'],
  },
  {
    key: 'Ambientes',
    title: 'Armazenamento em dois ambientes',
    text: 'MinIO interno e S3 atendem a mesma solução. Duas estruturas para configurar e manter, com finalidade e responsabilidades a esclarecer.',
    nodes: ['minio', 's3'],
  },
  {
    key: 'Dados',
    title: 'Carga sobre a base central',
    text: 'Rotinas e consumidores externos acessam o Yoda diretamente. A carga por consumidor e o inventário das rotinas antigas não estão claros.',
    nodes: ['yoda', 'cliente', 'ingestao'],
  },
  {
    key: 'Aplicações',
    title: 'Aplicações e identidade',
    text: 'APEX condiciona o uso do Oracle. Gates / Cognito, APEX e mecanismos próprios convivem sem padrão comum, o que dificulta acoplar produtos às plataformas.',
    nodes: ['react', 'powerbi', 'oracle'],
    identidade: true,
  },
  {
    key: 'LLM',
    title: 'Integração do LLM',
    text: 'Movimentações entre Yoda e Supabase, alterações de estrutura e processamento sem uma esteira comum de publicação e rastreabilidade.',
    nodes: ['yoda', 'supabase'],
  },
]

const CONSEQUENCIAS = [
  'Sustentação complexa',
  'Dependência de conhecimento localizado',
  'Dificuldade para controlar acessos, mudanças e carga',
  'Integrações específicas e custo de operação',
]

/** 1 desenho + 5 problemas + 1 fecho. O `deck.ts` lê daqui. */
export const ACTIONS = ['Desenho', ...PROBLEMS.map((p) => p.key), 'Consequências']

/**
 * Caixa do diagrama. `marks` são os números dos problemas já marcados nela —
 * eles se acumulam, e só o problema da etapa corrente recebe o realce forte.
 */
function Box({
  x,
  y,
  w = 175,
  title,
  sub,
  logo,
  logoH = 20,
  order,
  marks,
  current,
}: {
  x: number
  y: number
  w?: number
  title: string
  sub?: string
  logo?: LogoId
  logoH?: number
  order: number
  marks: number[]
  current: boolean
}) {
  // Um estado por vez: empilhar utilities da mesma propriedade deixaria o
  // vencedor por conta da ordem na folha gerada, que não é garantida.
  const caixa = current
    ? 'fill-[#f3ebff] stroke-[#6d28d9] [stroke-width:2.6] drop-shadow-[0_0_5px_rgba(124,58,237,0.45)]'
    : marks.length
      ? 'fill-[#f3ebff] stroke-[#7c3aed] [stroke-width:2]'
      : 'fill-[#faf7ff] stroke-[#bfa9d6] [stroke-width:1.5]'

  const arte = logo ? LOGOS[logo] : null
  const logoW = arte ? logoH * arte.aspect : 0
  // O logo fica centrado na linha do título; o que sobrou de texto vem depois.
  const textoX = x + 12 + (arte ? logoW + 7 : 0)

  return (
    <g
      className='[transform-box:fill-box] origin-center animate-ilum-rise motion-reduce:animate-none'
      style={delay(0.12 + order * 0.05)}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={65}
        rx={8}
        className={`${caixa} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
      />
      {arte && (
        <svg
          x={x + 12}
          y={y + 20 - logoH / 2}
          width={logoW}
          height={logoH}
          viewBox={arte.viewBox}
          dangerouslySetInnerHTML={{ __html: arte.body }}
        />
      )}
      {title && (
        <text x={textoX} y={y + 26} className='fill-[#312140] text-[16px] font-semibold'>
          {title}
        </text>
      )}
      {sub && (
        <text x={x + 12} y={y + 47} className='fill-[#6b597b] text-[12px] font-normal'>
          {sub}
        </text>
      )}
      {marks.map((n, i) => (
        <g
          key={n}
          className='[transform-box:fill-box] origin-center animate-ilum-pop motion-reduce:animate-none'
        >
          <circle
            cx={x + 14 + i * 22}
            cy={y}
            r={9}
            className='fill-[#7c3aed] stroke-white [stroke-width:2]'
          />
          <text
            x={x + 14 + i * 22}
            y={y + 4}
            className='fill-white text-[11px] font-bold [text-anchor:middle] [font-family:ui-monospace,monospace]'
          >
            {n}
          </text>
        </g>
      ))}
    </g>
  )
}

export default function Slide00ArquiteturaAtual({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  /** Quantos problemas já estão marcados (0 no desenho, 5 no fecho). */
  const marcados = Math.min(step, PROBLEMS.length)
  /** Índice do problema em foco, ou -1 no desenho e nas consequências. */
  const atual = step >= 1 && step <= PROBLEMS.length ? step - 1 : -1
  const fecho = step === ACTIONS.length - 1

  const marksDe = (id: NodeId) =>
    PROBLEMS.flatMap((p, i) => (i < marcados && p.nodes.includes(id) ? [i + 1] : []))
  const noFoco = (id: NodeId) => atual >= 0 && PROBLEMS[atual].nodes.includes(id)

  const identidadeMarcada = PROBLEMS.some((p, i) => i < marcados && p.identidade)
  const identidadeNoFoco = atual >= 0 && !!PROBLEMS[atual].identidade
  const faixaIdentidade = identidadeNoFoco
    ? 'fill-[#e4d4f9] stroke-[#7c3aed] [stroke-width:2.6] drop-shadow-[0_0_5px_rgba(124,58,237,0.45)]'
    : identidadeMarcada
      ? 'fill-[#e4d4f9] stroke-[#7c3aed] [stroke-width:2]'
      : 'fill-[#eee5fa] stroke-[#ad8bce]'

  return (
    <Frame
      title='Arquitetura atual e problemas'
    >
      <div className='grid grid-cols-[minmax(0,3fr)_minmax(235px,1fr)] gap-7 items-center max-[900px]:grid-cols-1'>
        <svg
          className='w-full max-h-[60vh] max-[900px]:max-h-none'
          viewBox='0 0 850 510'
          role='img'
          aria-label='Ambientes e conexões atuais: ingestão, bancos, aplicações, armazenamento e LLM'
        >
          <g className='animate-ilum-fade motion-reduce:animate-none'>
            <rect
              x='5'
              y='5'
              width='600'
              height='112'
              className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]'
            />
            <rect
              x='5'
              y='139'
              width='600'
              height='254'
              className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]'
            />
            <rect
              x='624'
              y='5'
              width='220'
              height='388'
              className='fill-[#ffffff45] stroke-[#baaacb] [stroke-dasharray:5_5]'
            />
            <text x='17' y='24' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>
              APLICAÇÕES E CLIENTES
            </text>
            <text x='17' y='159' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>
              PROCESSAMENTO E BANCOS
            </text>
            <text x='636' y='24' className='fill-[#77618e] text-[12px] tracking-[1.1px]'>
              OUTROS AMBIENTES
            </text>
          </g>

          <g>
            {LINKS.map((l, i) => {
              const aceso = l.ps.some((p) => p <= marcados)
              const emFoco = atual >= 0 && l.ps.includes(atual + 1)
              const traco = aceso ? 'stroke-[#7c3aed] opacity-100' : 'stroke-[#a18bab] opacity-75'
              const largura = emFoco ? '[stroke-width:2.6]' : '[stroke-width:1.5]'
              const cor = `fill-none ${traco} ${largura} transition-[stroke,stroke-width,opacity] duration-300 motion-reduce:transition-none`
              return (
                <Fragment key={l.d}>
                  <path
                    className={`${cor} [stroke-dasharray:1] animate-ilum-draw motion-reduce:animate-none`}
                    d={l.d}
                    pathLength={1}
                    style={delay(atrasoDaLinha(i))}
                  />
                  {/* O grupo cuida da entrada; a opacidade do traço fica com o estado aceso/apagado. */}
                  <g
                    className='animate-ilum-tip motion-reduce:animate-none'
                    style={delay(atrasoDaPonta(i))}
                  >
                    <path
                      className={`${cor} [stroke-linecap:round] [stroke-linejoin:round]`}
                      d={SETA}
                      transform={`translate(${l.ponta.x} ${l.ponta.y}) rotate(${l.ponta.ang})`}
                    />
                  </g>
                </Fragment>
              )
            })}
          </g>

          {NODES.map((n, i) => (
            <Box
              key={n.id}
              x={n.x}
              y={n.y}
              title={n.title}
              sub={n.sub}
              logo={n.logo}
              logoH={n.logoH}
              order={i}
              marks={marksDe(n.id)}
              current={noFoco(n.id)}
            />
          ))}

          <g
            className='[transform-box:fill-box] origin-center animate-ilum-rise motion-reduce:animate-none'
            style={delay(1.1)}
          >
            <rect
              x='10'
              y='420'
              width='830'
              height='70'
              rx='8'
              className={`${faixaIdentidade} transition-[fill,stroke,stroke-width] duration-300 motion-reduce:transition-none`}
            />
            <text x='26' y='447' className='fill-[#61467d] text-[13px]'>
              IDENTIDADE
            </text>
            <text x='26' y='473' className='fill-[#61467d] text-[13px]'>
              Gates / Cognito · login APEX · mecanismos próprios — sem padrão comum de integração
            </text>
          </g>
        </svg>

        <aside className='border-l-[3px] border-l-[#7c3aed] pl-[23px]' aria-live='polite'>
          <span className='block text-[12px] [line-height:normal] [font-family:monospace] text-[#7c3aed] mb-[18px]'>
            {step === 0
              ? 'O CONJUNTO'
              : fecho
                ? 'QUADRO COMPLETO'
                : `PROBLEMA ${String(step).padStart(2, '0')} / 0${PROBLEMS.length}`}
          </span>

          {step === 0 ? (
            <div className='animate-ilum-in motion-reduce:animate-none'>
              <h2 className='text-[clamp(17px,1.55vw,24px)] font-[650] leading-[1.2] mb-3'>
                Ambientes e integrações
              </h2>
              <p className='text-[clamp(13px,1.22vw,19px)] leading-[1.5] text-[#64566f]'>
                Aplicações, bancos e serviços distribuídos. O desenho reúne os caminhos relatados;
                não é um inventário exaustivo.
              </p>
            </div>
          ) : (
            <ol className={`list-none m-0 p-0 flex flex-col ${fecho ? 'gap-[7px]' : 'gap-[11px]'}`}>
              {PROBLEMS.slice(0, marcados).map((p, i) => (
                <li
                  key={p.key}
                  className={`flex gap-[10px] items-start transition-opacity duration-300 motion-reduce:transition-none animate-ilum-in motion-reduce:animate-none ${
                    i === atual ? 'opacity-100' : fecho ? 'opacity-80' : 'opacity-60'
                  }`}
                >
                  <span
                    className={`shrink-0 w-[22px] h-[22px] rounded-[999px] text-center text-[11px] font-semibold leading-[22px] [font-family:ui-monospace,monospace] transition-colors duration-300 motion-reduce:transition-none ${
                      i === atual ? 'bg-[#7c3aed] text-white' : 'bg-[#e7dbf7] text-[#5a3581]'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <b
                      className={`block font-[650] leading-[1.25] text-[#312140] ${
                        fecho ? 'text-[clamp(11px,.85vw,13px)]' : 'text-[clamp(12px,1vw,15px)]'
                      }`}
                    >
                      {p.title}
                    </b>
                    {i === atual && (
                      <p className='text-[clamp(12px,.95vw,15px)] leading-[1.4] mt-1.5 text-[#64566f]'>
                        {p.text}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          {fecho && (
            <div className='mt-5 border-t border-t-[#d6cae1] pt-3.5 animate-ilum-note motion-reduce:animate-none'>
              <b className='block text-[11px] tracking-[0.1em] uppercase text-[#7c3aed] mb-2.5'>
                Consequências
              </b>
              <ul className='list-none m-0 p-0 flex flex-col gap-[7px]'>
                {CONSEQUENCIAS.map((c, i) => (
                  <li
                    key={c}
                    style={delay(0.12 + i * 0.09)}
                    className="relative pl-3.5 text-[clamp(12px,.95vw,15px)] leading-[1.35] text-[#3d2c4d] animate-ilum-in motion-reduce:animate-none before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#7c3aed]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Frame>
  )
}
