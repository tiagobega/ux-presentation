import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '../config'
import { BORDA, Caixa, Chip, MALVA, ROXO, Rotulo, SUAVE, TINTA, TRANSICAO, ponta, type Direcao } from './diagrama'
import { COR, Pagina, SaidaDaTela, delay } from './ui'

/**
 * Slide 6 — O Router. Abre a parte 2 do deck, como o slide 2 abre a do
 * Builder: a página começa em ameixa com o nome da parte, e a tela encolhe até
 * o bloco do Router, no centro do desenho (`SaidaDaTela`).
 *
 * Depois, o caminho de um dado, um trecho por passo, sobre o mesmo desenho:
 *
 * 1. **chega**: a foto vem do Jetson, e o Router junta o contexto do contrato,
 *    que vem do Intelifleets;
 * 2. **processa**: o Router manda a foto ao Vision;
 * 3. **volta**: o resultado volta ao Router, que grava no Banco Yoda;
 * 4. **entrega**: o Router entrega ao projeto só o que a regra do contrato
 *    manda — a ponte para o slide 7, que mostra as regras.
 *
 * O que já passou fica aceso; só o trecho do passo corrente leva partículas.
 * A arquitetura é a do diagrama do Programa de Tecnologia (a mesma do slide 1).
 */

export const ACTIONS = ['O Router', 'Chega', 'Processa', 'Volta', 'Entrega']

/** O bloco do Router: o alvo da tela que encolhe. */
const ROUTER = { x: 430, y: 205, w: 210, h: 150 }

interface Trecho {
  id: string
  d: string
  pontas: [number, number, Direcao][]
  /** Passo em que acende. */
  passo: number
  rotulo?: { x: number; y: number; texto: string; anchor?: 'start' | 'middle' | 'end' }
  tracejado?: boolean
}

const TRECHOS: Trecho[] = [
  { id: 'captura', d: 'M200 280 H426', pontas: [[428, 280, 'direita']], passo: 1, rotulo: { x: 313, y: 268, texto: 'FOTO', anchor: 'middle' } },
  {
    id: 'contexto',
    d: 'M535 122 V201',
    pontas: [[535, 203, 'baixo']],
    passo: 1,
    tracejado: true,
    rotulo: { x: 523, y: 168, texto: 'CONTEXTO DO CONTRATO', anchor: 'end' },
  },
  { id: 'entrada', d: 'M640 230 H690 V100 H756', pontas: [[758, 100, 'direita']], passo: 2, rotulo: { x: 682, y: 170, texto: 'ENTRADA', anchor: 'end' } },
  { id: 'resultado', d: 'M760 135 H730 V255 H644', pontas: [[642, 255, 'esquerda']], passo: 3, rotulo: { x: 740, y: 205, texto: 'RESULTADO' } },
  { id: 'grava', d: 'M585 355 V450 H756', pontas: [[758, 450, 'direita']], passo: 3, rotulo: { x: 597, y: 410, texto: 'GRAVA' } },
  { id: 'entrega', d: 'M640 305 H996', pontas: [[998, 305, 'direita']], passo: 4, rotulo: { x: 820, y: 295, texto: 'REGRA DO CONTRATO', anchor: 'middle' } },
]

/** O que a fala diz em cada passo, numa linha. */
const LEGENDAS = [
  'A esteira de dados da empresa: tudo o que chega do campo passa por aqui.',
  'A foto chega do campo, e o Router junta o contexto do contrato que vem do Intelifleets.',
  'O Router encaminha a foto para o processamento no Vision.',
  'O resultado volta ao Router, que grava tudo no Banco Yoda.',
  'O Router entrega a cada projeto só o que a regra do contrato manda.',
]

function Caminho({ t, passo }: { t: Trecho; passo: number }) {
  const reduzido = useReducedMotion()
  const aceso = passo >= t.passo
  const corrente = passo === t.passo
  const cor = aceso ? ROXO : BORDA
  return (
    <g>
      <motion.path
        d={t.d}
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeDasharray={t.tracejado ? '5 5' : undefined}
        initial={false}
        animate={{ stroke: t.tracejado && aceso ? MALVA : cor, strokeWidth: aceso && !t.tracejado ? 2.6 : 1.6 }}
        transition={TRANSICAO}
      />
      {t.pontas.map(([x, y, dir], i) => (
        <motion.polygon key={i} points={ponta(x, y, dir)} initial={false} animate={{ fill: t.tracejado && aceso ? MALVA : cor }} transition={TRANSICAO} />
      ))}
      {t.rotulo && (
        <motion.g initial={false} animate={{ opacity: aceso ? 1 : 0.35 }} transition={TRANSICAO}>
          <Rotulo x={t.rotulo.x} y={t.rotulo.y} anchor={t.rotulo.anchor} cor={aceso ? ROXO : SUAVE}>
            {t.rotulo.texto}
          </Rotulo>
        </motion.g>
      )}
      {corrente && !t.tracejado && !reduzido && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.5 }}>
          {[0, 0.33, 0.66].map((fase) => (
            <circle key={fase} r={4.5} fill={ROXO}>
              <animateMotion dur='1.8s' begin={`-${fase * 1.8}s`} repeatCount='indefinite' path={t.d} />
            </circle>
          ))}
        </motion.g>
      )}
    </g>
  )
}

/** Uma ponta do desenho, que acende quando o caminho chega nela. */
function Ponta({ passo, desde, children }: { passo: number; desde: number; children: React.ReactNode }) {
  return (
    <motion.g initial={false} animate={{ opacity: passo >= desde ? 1 : 0.35 }} transition={TRANSICAO}>
      {children}
    </motion.g>
  )
}

export default function Slide06Router({ action, active = true }: SlideProps) {
  const passo = Math.max(0, ACTIONS.indexOf(action))
  const reduzido = useReducedMotion()
  const bloco = useRef<SVGRectElement>(null)

  return (
    <Pagina n={8} eyebrow='Router' titulo='O caminho de um dado' corpo=''>
      <svg
        viewBox='20 20 1180 490'
        preserveAspectRatio='xMidYMid meet'
        className='flex-1 min-h-0 w-full h-full'
        role='img'
        aria-label='A foto chega do Jetson ao Router, que junta o contexto do contrato vindo do Intelifleets, encaminha ao Vision, recebe o resultado, grava no Banco Yoda e entrega ao projeto Uberlândia o que a regra do contrato manda.'
        style={{ fontFamily: 'inherit', overflow: 'hidden' }}
      >
        {TRECHOS.map((t) => (
          <Caminho key={t.id} t={t} passo={passo} />
        ))}

        <Ponta passo={passo} desde={1}>
          <Rotulo x={40} y={238}>
            CAMPO
          </Rotulo>
          <Chip x={40} y={250} w={160} h={60} nome='Jetson' sub='hardware modular' />
        </Ponta>

        <Ponta passo={passo} desde={1}>
          <Caixa x={390} y={40} w={290} h={82} titulo='Intelifleets' sub='dispositivo, veículo e contrato' />
        </Ponta>

        <Ponta passo={passo} desde={2}>
          <Caixa x={760} y={50} w={240} h={110} titulo='Processamento' />
          <Chip x={784} y={98} w={190} h={44} nome='Vision' sub='imagens' />
        </Ponta>

        <Ponta passo={passo} desde={3}>
          <Caixa x={760} y={400} w={240} h={100} titulo='Banco Yoda' sub='nosso banco de dados · Ouro' />
        </Ponta>

        <Ponta passo={passo} desde={4}>
          <rect x={1000} y={230} width={180} height={150} fill='#fff' stroke={ROXO} />
          <Rotulo x={1020} y={258} cor={ROXO}>
            PROJETO
          </Rotulo>
          <text x={1020} y={286} fontSize={18} fontWeight={800} fill={TINTA}>
            Uberlândia
          </text>
          <text x={1020} y={308} fontSize={11.5} fill={SUAVE}>
            Grogu, o banco do projeto
          </text>
          <text x={1020} y={352} fontSize={11.5} fontWeight={700} fill={ROXO}>
            frota + IBGE da cidade
          </text>
        </Ponta>

        {/* O Router, sempre aceso: é o assunto. */}
        <rect ref={bloco} x={ROUTER.x} y={ROUTER.y} width={ROUTER.w} height={ROUTER.h} fill={ROXO} />
        <Rotulo x={ROUTER.x + 22} y={ROUTER.y + 36} cor='#ffffffb0'>
          ILUM
        </Rotulo>
        <text x={ROUTER.x + 22} y={ROUTER.y + 72} fontSize={30} fontWeight={800} letterSpacing={-0.5} fill='#fff'>
          Router
        </text>
        <text x={ROUTER.x + 22} y={ROUTER.y + 100} fontSize={12} fill='#ffffffc0'>
          recebe, encaminha,
        </text>
        <text x={ROUTER.x + 22} y={ROUTER.y + 118} fontSize={12} fill='#ffffffc0'>
          grava e entrega
        </text>
      </svg>

      {/* A legenda do passo, numa linha; `key` refaz a entrada a cada troca. */}
      <p
        key={passo}
        className='shrink-0 text-center text-[1.4vw] font-semibold animate-ilum-in motion-reduce:animate-none'
        style={{ color: COR.tinta, ...delay(0.1) }}
      >
        {LEGENDAS[passo]}
      </p>

      {!reduzido && active && <SaidaDaTela bloco={bloco} parte='Router' />}
    </Pagina>
  )
}
