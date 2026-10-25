import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '../config'
import {
  BORDA,
  Caixa,
  Chip,
  Entra,
  Foco,
  MALVA,
  Pilula,
  ROXO,
  Rotulo,
  TINTA,
  TRANSICAO,
  aparece,
  entrada,
  ponta,
  type Direcao,
} from './diagrama'
import { Pagina, TelaParte } from './ui'

/**
 * Slide 1 — Arquitetura.
 *
 * O diagrama do programa de tecnologia, sem o InteliRoad: os hardwares soltos,
 * o Intelifleets só como gestão da frota, o Ilum no meio. Três passos sobre
 * **um desenho só**, e a câmera é o `viewBox`:
 *
 * 1. o ecossistema inteiro, com partículas correndo pelas setas de dado, e o
 *    projeto ainda genérico ("Contrato / Projeto");
 * 2. **a demo**, sem mexer a câmera: apaga o que ela não usa (Geobox, Geolux,
 *    IRI, Luminosidade) e o projeto vira Uberlândia, agosto de 2026. O todo
 *    vem antes de propósito: a arquitetura é a de hoje, a demo é um recorte;
 * 3. a câmera fecha no Ilum e ele se abre em **Builder** e **Router**, os dois
 *    validados, com o nome do Ilum em cima das duas metades para quem se
 *    distraiu no zoom.
 *
 * **O Router é a metade que pesa.** O Builder roda uma vez por projeto (cria o
 * banco e o código base); o Router é a esteira contínua de dados da empresa.
 * Por isso o Router é a metade chapada e a seta dele até o projeto é grossa e
 * corre sempre, enquanto a do Builder é tracejada e fina: uso único.
 * O projeto não se abre aqui: é o slide 2 que o monta, peça por peça.
 *
 * 4. **o mergulho**: a câmera entra na metade do Builder, que se enche de
 *    ameixa, e a tela inteira vira o Builder (`TelaParte`). O slide 2 entra
 *    por corte sobre esse mesmo quadro e o encolhe até o bloco do Builder:
 *    a sensação é de ter entrado nele.
 *
 * O desenho é montado em código, não importado do Figma: o `fluxo-novo.svg`
 * desenhava o Ilum com outro papel. As peças de SVG estão em `diagrama.tsx`.
 */

export const ACTIONS = ['O ecossistema', 'A demo', 'O Ilum', 'Dentro do Builder']

/** A câmera de cada passo; o mundo tem 1200 × 640. O último é o mergulho na metade do Builder. */
const CAMERA = ['40 26 1150 610', '40 26 1150 610', '30 150 820 300', '60 230 300 190']

const SETA_NEUTRA = MALVA
const SETA_FROTA = '#C9B6CC'

/** Quando a varredura termina e as partículas podem começar a correr. */
const FIM_DA_ENTRADA = 1.7

type Passo = 0 | 1 | 2 | 3
type Quatro<T = number> = readonly [T, T, T, T]

/**
 * Opacidade de cada bloco em cada passo. O que sai de foco apaga, mas fica
 * no lugar: é o mesmo desenho, mais perto.
 */
const FOCO = {
  periferia: [1, 1, 0.28, 0],
  /** O que a demo não usa: Geobox, Geolux, IRI e Luminosidade. */
  foraDaDemo: [1, 0.12, 0.35, 0],
  projeto: [1, 1, 0.28, 0],
  ilum: [1, 1, 1, 1],
  titulo: [1, 1, 0, 0],
  aberto: [0, 0, 1, 1],
  router: [1, 1, 1, 0],
  /** A metade do Builder se enche de ameixa no mergulho. */
  mergulho: [0, 0, 0, 1],
} satisfies Record<string, Quatro>

// ── Setas ─────────────────────────────────────────────────────────────────

/**
 * De quem é a seta. No zoom, as do Router ficam em ameixa cheia e a do
 * Builder em malva: as duas metades estão validadas, e a cor diz de quem é
 * cada caminho e qual pesa mais.
 */
type Dono = 'router' | 'builder' | 'frota'

const COR_SETA: Record<Dono, Quatro<string>> = {
  router: [SETA_NEUTRA, SETA_NEUTRA, ROXO, ROXO],
  builder: [SETA_NEUTRA, SETA_NEUTRA, SETA_NEUTRA, SETA_NEUTRA],
  frota: [SETA_FROTA, SETA_FROTA, SETA_FROTA, SETA_FROTA],
}

const OPACIDADE: Record<Dono, Quatro> = {
  router: [1, 1, 1, 0],
  builder: [1, 1, 1, 0],
  frota: [1, 1, 0.55, 0],
}

interface SetaProps {
  d: string
  pontas: [number, number, Direcao][]
  dono: Dono
  passo: Passo
  /** Onde a seta começa, para a varredura de entrada. */
  x: number
  tracejada?: boolean
  rotulo?: { x: number; y: number; texto: string; anchor?: 'start' | 'middle' | 'end' }
  /** Trajetos das partículas; por padrão, o próprio `d`. */
  trilhas?: string[]
}

function Seta({ d, pontas, dono, passo, x, tracejada, rotulo, trilhas }: SetaProps) {
  const cor = COR_SETA[dono][passo]
  const larg = passo === 2 && dono === 'router' ? 2.4 : 1.6
  const t0 = entrada(x)
  const reduzido = useReducedMotion()

  return (
    <motion.g initial={false} animate={{ opacity: OPACIDADE[dono][passo] }} transition={TRANSICAO}>
      {tracejada ? (
        <motion.path
          d={d}
          fill='none'
          strokeDasharray='5 5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, stroke: cor, strokeWidth: larg }}
          transition={{ opacity: { duration: 0.5, delay: t0 }, default: TRANSICAO }}
        />
      ) : (
        <motion.path
          d={d}
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, stroke: cor, strokeWidth: larg }}
          transition={{ pathLength: { duration: 0.55, delay: t0, ease: 'easeInOut' }, default: TRANSICAO }}
        />
      )}
      {pontas.map(([px, py, dir], i) => (
        <motion.polygon
          key={i}
          points={ponta(px, py, dir)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, fill: cor }}
          transition={{ opacity: { duration: 0.3, delay: t0 + 0.45 }, default: TRANSICAO }}
        />
      ))}
      {rotulo && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: t0 + 0.3 }}>
          <Rotulo x={rotulo.x} y={rotulo.y} anchor={rotulo.anchor}>
            {rotulo.texto}
          </Rotulo>
        </motion.g>
      )}
      {/* Partículas só no que leva dado continuamente; o que é tracejado
          (gestão, contexto, a criação do projeto) não corre. */}
      {!reduzido && !tracejada && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: FIM_DA_ENTRADA }}>
          {(trilhas ?? [d]).flatMap((trilha, i) =>
            [0, 0.5].map((fase) => (
              <circle key={`${i}-${fase}`} r={passo === 2 ? 4 : 3.2} fill={ROXO}>
                {/* `begin` negativo: a partícula já nasce no meio do trajeto,
                    em vez de esperar parada na origem do SVG. */}
                <animateMotion dur='2.4s' begin={`-${(fase + i * 0.17) * 2.4}s`} repeatCount='indefinite' path={trilha} />
              </circle>
            )),
          )}
        </motion.g>
      )}
    </motion.g>
  )
}

// ── O Ilum ────────────────────────────────────────────────────────────────

const ILUM = { x: 60, y: 230, w: 600, h: 190 }
const MEIO_ILUM = ILUM.x + ILUM.w / 2

/**
 * Uma metade do Ilum aberto. O Router é chapado em ameixa e o Builder é
 * contorno: os dois validados, e a forma diz qual pesa mais antes de qualquer
 * palavra.
 */
function Metade({ inicio, x, nome, selo, chapada, itens }: {
  /** Onde a metade começa: o retângulo chapado cobre dali até o meio. */
  inicio: number
  x: number
  nome: string
  selo: string
  chapada: boolean
  itens: string[]
}) {
  const tinta = chapada ? '#fff' : TINTA
  return (
    <g>
      {chapada && <rect x={inicio} y={ILUM.y} width={ILUM.w / 2} height={ILUM.h} fill={ROXO} />}
      <Pilula x={x} y={ILUM.y + 22} texto={selo} cheia={!chapada} invertida={chapada} />
      <text x={x} y={ILUM.y + 80} fontSize={26} fontWeight={800} letterSpacing={-0.4} fill={chapada ? '#fff' : ROXO}>
        {nome}
      </text>
      {itens.map((item, i) => (
        <g key={item}>
          <rect x={x} y={ILUM.y + 104 + i * 24} width={5} height={5} fill={chapada ? '#ffffffb0' : SETA_NEUTRA} />
          <text x={x + 14} y={ILUM.y + 112 + i * 24} fontSize={13} fill={tinta}>
            {item}
          </text>
        </g>
      ))}
    </g>
  )
}

function Ilum({ passo }: { passo: Passo }) {
  const aberto = passo >= 2
  return (
    <>
      {/* Fechado, o Ilum é o bloco chapado do diagrama; aberto, vira o
          contorno que recebe as duas metades. */}
      <Foco op={FOCO.ilum} passo={passo}>
        <Entra x={ILUM.x + 200}>
          <motion.rect
            x={ILUM.x}
            y={ILUM.y}
            width={ILUM.w}
            height={ILUM.h}
            stroke={ROXO}
            strokeWidth={1.6}
            initial={false}
            animate={{ fill: aberto ? '#ffffff' : ROXO }}
            transition={TRANSICAO}
          />
        </Entra>
      </Foco>

      <Foco op={FOCO.titulo} passo={passo}>
        <Entra x={ILUM.x + 220}>
          <text x={MEIO_ILUM} y={ILUM.y + 98} textAnchor='middle' fontSize={44} fontWeight={800} letterSpacing={-1} fill='#fff'>
            Ilum
          </text>
          <text x={MEIO_ILUM} y={ILUM.y + 128} textAnchor='middle' fontSize={13.5} fill='#ffffffc0'>
            Prepara cada projeto e faz o roteamento dos dados
          </text>
        </Entra>
      </Foco>

      <Foco op={FOCO.aberto} passo={passo}>
        {/* O nome em cima das duas metades: no zoom, quem se distraiu ainda
            sabe que está dentro do Ilum. */}
        <text x={ILUM.x} y={ILUM.y - 14} fontSize={22} fontWeight={800} letterSpacing={-0.4} fill={ROXO}>
          Ilum
        </text>
        <Metade
          inicio={ILUM.x}
          x={ILUM.x + 24}
          nome='Builder'
          selo='PROVADO · UBERLÂNDIA'
          chapada={false}
          itens={['Prepara o banco e os dados', 'Carrega e valida o histórico', 'Gera o código base: back e front']}
        />
        <Foco op={FOCO.router} passo={passo}>
          <Metade
            inicio={MEIO_ILUM}
            x={MEIO_ILUM + 24}
            nome='Router'
            selo='VALIDADO'
            chapada
            itens={['Recebe e contextualiza os dados', 'Encaminha ao processamento', 'Entrega a cada projeto os seus dados']}
          />
        </Foco>
      </Foco>

      {/* O mergulho: a metade do Builder se enche de ameixa enquanto a
          câmera entra nela. */}
      <Foco op={FOCO.mergulho} passo={passo}>
        <rect x={ILUM.x} y={ILUM.y} width={ILUM.w / 2} height={ILUM.h} fill={ROXO} />
      </Foco>
    </>
  )
}

// ── O projeto ─────────────────────────────────────────────────────────────

/**
 * O cartão do projeto, sempre fechado aqui. Genérico no ecossistema;
 * Uberlândia a partir da demo. O slide 2 parte deste mesmo cartão.
 */
function Projeto({ passo }: { passo: Passo }) {
  const demo = passo >= 1
  return (
    <Foco op={FOCO.projeto} passo={passo}>
      <Entra x={120}>
        <rect x={60} y={510} width={480} height={112} fill='#fff' stroke={BORDA} />
        <motion.g {...aparece(!demo)}>
          <Rotulo x={84} y={538}>
            CADA CONTRATO
          </Rotulo>
          <text x={84} y={560} fontSize={16} fontWeight={750} letterSpacing={-0.5} fill={TINTA}>
            Contrato / Projeto
          </text>
        </motion.g>
        <motion.g {...aparece(demo, 0.2)}>
          <Rotulo x={84} y={538} cor={ROXO}>
            PROJETO DA DEMO
          </Rotulo>
          <text x={84} y={560} fontSize={16} fontWeight={750} letterSpacing={-0.5} fill={TINTA}>
            Uberlândia · agosto de 2026
          </text>
        </motion.g>
        {['Banco', 'Back', 'Front'].map((nome, i) => (
          <g key={nome}>
            <rect x={84 + i * 150} y={572} width={136} height={36} fill='#fff' stroke={BORDA} />
            <text x={98 + i * 150} y={595} fontSize={13} fontWeight={700} fill={TINTA}>
              {nome}
            </text>
          </g>
        ))}
      </Entra>
    </Foco>
  )
}

// ── O slide ───────────────────────────────────────────────────────────────

/** Os três hardwares, sem a caixa do InteliRoad. */
const HARDWARES = [
  { nome: 'Jetson', sub: 'hardware modular', x: 80 },
  { nome: 'Geobox', sub: 'hardware modular', x: 240 },
  { nome: 'Geolux', sub: 'luminosidade', x: 400 },
]
const HW = { y: 62, w: 140, h: 52 }
/** Onde as capturas descem no Ilum: em cima do Router. */
const ENTRADA_ROUTER = 510

export default function Slide01Arquitetura({ action }: SlideProps) {
  const passo = Math.max(0, ACTIONS.indexOf(action)) as Passo

  const captura = (h: (typeof HARDWARES)[number]) => `M${h.x + HW.w / 2} ${HW.y + HW.h} V178 H${ENTRADA_ROUTER} V${ILUM.y - 2}`
  const [jetson, ...foraDaDemo] = HARDWARES
  const base = ILUM.y + ILUM.h

  return (
    <Pagina n={1} eyebrow='Arquitetura' titulo='Do campo ao projeto, passando pelo Ilum' corpo=''>
      <motion.svg
        className='flex-1 min-h-0 w-full h-full'
        initial={false}
        animate={{ viewBox: CAMERA[passo] }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        viewBox={CAMERA[0]}
        preserveAspectRatio='xMidYMid meet'
        role='img'
        aria-label='Os hardwares Jetson, Geobox e Geolux enviam capturas ao Ilum (na demo, só o Jetson, processado só pelo Vision, para o projeto Uberlândia, agosto de 2026); o Intelifleets faz a gestão da frota e passa o contexto da captura; o Ilum troca com os processadores, grava nos dados corporativos, cria cada projeto uma vez e entrega a ele os dados continuamente. Dentro do Ilum, o Builder, que cria o projeto, e o Router, a esteira de dados, os dois validados.'
        // `overflow: hidden`: com o zoom, o desenho vazaria por cima do título.
        style={{ fontFamily: 'inherit', overflow: 'hidden' }}
      >
        {/* ── Setas (por baixo das caixas) ── */}
        {/* A captura do Jetson leva o barramento inteiro; as do Geobox e do
            Geolux são só as descidas, e apagam no passo da demo. */}
        <Foco op={FOCO.foraDaDemo} passo={passo}>
          {foraDaDemo.map((h) => (
            <Seta
              key={h.nome}
              d={`M${h.x + HW.w / 2} ${HW.y + HW.h} V178`}
              trilhas={[captura(h)]}
              pontas={[]}
              dono='router'
              passo={passo}
              x={h.x}
            />
          ))}
        </Foco>
        <Seta
          d={captura(jetson)}
          pontas={[[ENTRADA_ROUTER, ILUM.y - 1, 'baixo']]}
          dono='router'
          passo={passo}
          x={150}
          rotulo={{ x: ENTRADA_ROUTER + 12, y: 206, texto: 'CAPTURAS' }}
        />
        <Seta
          d='M758 92 H546'
          pontas={[[546, 92, 'esquerda'], [758, 92, 'direita']]}
          dono='frota'
          passo={passo}
          x={560}
          tracejada
          rotulo={{ x: 652, y: 82, texto: 'GESTÃO', anchor: 'middle' }}
        />
        <Seta
          d={`M840 150 V196 H610 V${ILUM.y - 2}`}
          pontas={[[610, ILUM.y - 1, 'baixo']]}
          dono='frota'
          passo={passo}
          x={620}
          tracejada
          rotulo={{ x: 852, y: 182, texto: 'CONTEXTO DA CAPTURA' }}
        />
        <Seta
          d={`M${ILUM.x + ILUM.w} 300 H758`}
          pontas={[[758, 300, 'direita']]}
          dono='router'
          passo={passo}
          x={660}
          rotulo={{ x: 710, y: 290, texto: 'ENTRADAS', anchor: 'middle' }}
        />
        <Seta
          d={`M760 352 H${ILUM.x + ILUM.w + 2}`}
          pontas={[[ILUM.x + ILUM.w + 1, 352, 'esquerda']]}
          dono='router'
          passo={passo}
          x={700}
          rotulo={{ x: 710, y: 374, texto: 'RESULTADOS', anchor: 'middle' }}
        />
        <Seta
          d={`M610 ${base} V508`}
          pontas={[[610, 508, 'baixo']]}
          dono='router'
          passo={passo}
          x={610}
          rotulo={{ x: 622, y: 470, texto: 'GRAVAÇÃO' }}
        />
        {/* As duas ligações do Ilum com o projeto, uma de cada metade: a
            criação, uma vez, tracejada; a esteira de dados, sempre. */}
        <Seta
          d={`M210 ${base} V508`}
          pontas={[[210, 508, 'baixo']]}
          dono='builder'
          passo={passo}
          x={210}
          tracejada
          rotulo={{ x: 222, y: 470, texto: 'CRIAÇÃO · UMA VEZ' }}
        />
        <Seta
          d={`M450 ${base} V508`}
          pontas={[[450, 508, 'baixo']]}
          dono='router'
          passo={passo}
          x={450}
          rotulo={{ x: 462, y: 470, texto: 'DADOS · SEMPRE' }}
        />

        {/* ── Periferia ── */}
        <Foco op={FOCO.periferia} passo={passo}>
          <Entra x={80}>
            <Rotulo x={80} y={46}>
              CAMPO
            </Rotulo>
          </Entra>
          <Entra x={jetson.x}>
            <Chip x={jetson.x} y={HW.y} w={HW.w} h={HW.h} nome={jetson.nome} sub={jetson.sub} />
          </Entra>
          <Foco op={FOCO.foraDaDemo} passo={passo}>
            {foraDaDemo.map((h) => (
              <Entra key={h.nome} x={h.x}>
                <Chip x={h.x} y={HW.y} w={HW.w} h={HW.h} nome={h.nome} sub={h.sub} />
              </Entra>
            ))}
          </Foco>

          <Entra x={760}>
            <Caixa x={760} y={36} w={410} h={114} titulo='Intelifleets' sub='Gestão da frota e dos dispositivos' />
            <text x={784} y={128} fontSize={12.5} fill='#5E5860'>
              Dispositivos · veículos · contratos
            </text>
          </Entra>

          <Entra x={760}>
            <Caixa x={760} y={230} w={410} h={190} titulo='Processadores' />
            <Chip x={784} y={290} w={120} h={52} nome='Vision' sub='imagens' />
            <Foco op={FOCO.foraDaDemo} passo={passo}>
              <Chip x={908} y={290} w={120} h={52} nome='IRI' sub='qualidade viária' />
              <Chip x={1032} y={290} w={120} h={52} nome='Luminosidade' sub='Geolux' />
            </Foco>
            <text x={784} y={392} fontSize={12} fill='#5E5860'>
              Método, versão e resultado rastreáveis
            </text>
          </Entra>

          <Entra x={580}>
            <Caixa x={580} y={510} w={590} h={112} titulo='Dados corporativos' />
            <Chip x={604} y={562} w={266} h={44} nome='Banco Yoda' sub='nosso banco de dados · Ouro' />
            <Chip x={882} y={562} w={266} h={44} nome='Object Storage' sub='imagens e originais' />
          </Entra>
        </Foco>

        <Ilum passo={passo} />
        <Projeto passo={passo} />
      </motion.svg>

      {/* Quando a câmera termina de entrar, a tela inteira vira o Builder. */}
      <motion.div
        className='pointer-events-none absolute inset-0 z-20'
        initial={false}
        animate={{ opacity: passo === 3 ? 1 : 0 }}
        transition={{ duration: 0.45, delay: passo === 3 ? 0.85 : 0 }}
        aria-hidden={passo !== 3}
      >
        <TelaParte parte='Builder' />
      </motion.div>
    </Pagina>
  )
}
