import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { BORDA, LILAS, MALVA, ROXO, Rotulo, SUAVE, TRANSICAO } from './diagrama'
import { COR, Cartao, Pagina, delay } from './ui'

/**
 * Slide 7 — Os recortes do Router. Continua a parte 2: o slide 6 mostra o
 * caminho do dado; este, a regra que decide o que cada projeto recebe.
 *
 * O recorte do envio: cada contrato escolhe quais fotos chegam ao projeto, e
 * quem aplica é o Router. As opções e as frases vêm do guia "Regras de
 * agrupamento por contrato" (bloco A, "Recorte do envio"); o "Tudo, sem
 * recorte" fica de fora, por decisão do apresentador. O recorte da demo é
 * frota + cidade: os carros do contrato de Uberlândia, só dentro do IBGE dela.
 *
 * Um mapa só, com carros do contrato (ameixa) e de outros contratos (cinza),
 * e a cada passo um recorte se aplica: quem passa fica aceso, quem não passa
 * apaga no lugar. A divisa de cada recorte acende junto. O último passo é o
 * recorte que a demo usou (frota + cidade) e leva o selo.
 *
 * O mapa é ilustrativo: as cidades, a área e os carros não são Uberlândia.
 * Quem está dentro de quê está escrito em cada carro, não calculado: assim o
 * desenho nunca diverge da regra.
 */

export const ACTIONS = ['Frota do contrato', 'Uma cidade', 'Várias cidades', 'Polígono', 'Frota + cidade']

type Zona = 'A' | 'B' | 'fora'

interface Carro {
  x: number
  y: number
  /** Do contrato (ameixa) ou de outro contrato (cinza). */
  contrato: boolean
  zona: Zona
  /** Dentro da área desenhada (que fica dentro da cidade A). */
  area: boolean
}

const c = (x: number, y: number, contrato: boolean, zona: Zona, area = false): Carro => ({ x, y, contrato, zona, area })

const CARROS: Carro[] = [
  // Dentro da área desenhada (cidade A).
  c(190, 200, true, 'A', true),
  c(260, 240, true, 'A', true),
  c(220, 300, true, 'A', true),
  c(300, 190, true, 'A', true),
  c(240, 180, false, 'A', true),
  c(280, 310, false, 'A', true),
  c(180, 260, false, 'A', true),
  // Cidade A, fora da área.
  c(110, 380, true, 'A'),
  c(370, 110, true, 'A'),
  c(390, 400, true, 'A'),
  c(120, 140, false, 'A'),
  c(350, 420, false, 'A'),
  c(400, 260, false, 'A'),
  // Cidade B.
  c(560, 200, true, 'B'),
  c(640, 290, true, 'B'),
  c(600, 170, false, 'B'),
  c(540, 300, false, 'B'),
  c(660, 220, false, 'B'),
  // Na estrada, fora das cidades.
  c(470, 240, true, 'fora'),
  c(730, 420, true, 'fora'),
  c(460, 90, false, 'fora'),
  c(720, 80, false, 'fora'),
  c(480, 470, false, 'fora'),
]

/** A regra de cada passo: quem passa. */
const PASSA: ((k: Carro) => boolean)[] = [
  (k) => k.contrato,
  (k) => k.zona === 'A',
  (k) => k.zona === 'A' || k.zona === 'B',
  (k) => k.area,
  (k) => k.contrato && k.zona === 'A',
]

const CIDADE_A = 'M70 120 L170 60 L330 70 L430 130 L445 260 L420 430 L300 470 L150 455 L70 380 Z'
const CIDADE_B = 'M510 150 L620 120 L700 170 L710 300 L620 350 L520 320 Z'
const AREA = 'M160 175 L250 150 L330 170 L335 260 L300 340 L210 345 L160 290 Z'

/** Que divisa acende em cada passo. */
const ACESA = {
  A: [false, true, true, false, true],
  B: [false, false, true, false, false],
  area: [false, false, false, true, false],
}

const RECORTES = [
  { nome: 'Frota do contrato', frase: 'os carros do contrato, onde estiverem' },
  { nome: 'Uma cidade', frase: 'qualquer carro dentro da cidade (um IBGE)' },
  { nome: 'Várias cidades', frase: 'qualquer carro dentro das cidades (lista de IBGE)' },
  { nome: 'Polígono', frase: 'uma área contínua desenhada no mapa' },
  { nome: 'Frota + cidade', frase: 'os carros do contrato, só dentro da cidade (um IBGE)' },
]

function Divisa({ d, acesa, nome, x, y, tracejada }: { d: string; acesa: boolean; nome: string; x: number; y: number; tracejada?: boolean }) {
  return (
    <g>
      <motion.path
        d={d}
        strokeWidth={acesa ? 2.2 : 1.2}
        strokeDasharray={tracejada ? '7 5' : undefined}
        initial={false}
        animate={{ fill: acesa ? LILAS : '#ffffff00', stroke: acesa ? ROXO : BORDA }}
        transition={TRANSICAO}
      />
      <motion.g initial={false} animate={{ opacity: acesa ? 1 : 0.55 }} transition={TRANSICAO}>
        <Rotulo x={x} y={y} cor={acesa ? ROXO : SUAVE}>
          {nome}
        </Rotulo>
      </motion.g>
    </g>
  )
}

export default function Slide07Recortes({ action }: SlideProps) {
  const passo = Math.max(0, ACTIONS.indexOf(action))
  const passa = PASSA[passo]

  return (
    <Pagina n={7} eyebrow='Router' titulo='Cada contrato escolhe o que chega ao projeto' corpo=''>
      <div className='flex flex-1 min-h-0 gap-[2.4vw]'>
        <div className='flex flex-1 min-w-0 flex-col animate-ilum-in motion-reduce:animate-none' style={delay(0.15)}>
          <svg
            viewBox='40 30 720 470'
            preserveAspectRatio='xMidYMid meet'
            className='flex-1 min-h-0 w-full h-full'
            role='img'
            aria-label={`Mapa ilustrativo com duas cidades, uma área desenhada e carros do contrato e de outros contratos. Recorte aplicado: ${RECORTES[passo].nome}, ${RECORTES[passo].frase}.`}
            style={{ fontFamily: 'inherit' }}
          >
            {/* Estradas: ligam as cidades e levam os carros de fora. */}
            <path d='M20 250 C 200 262, 300 252, 445 246 S 600 236, 780 262' fill='none' stroke='#ece6ee' strokeWidth={10} strokeLinecap='round' />
            <path d='M462 40 L472 240 L482 490' fill='none' stroke='#ece6ee' strokeWidth={10} strokeLinecap='round' />
            <path d='M716 40 L728 490' fill='none' stroke='#ece6ee' strokeWidth={10} strokeLinecap='round' />

            <Divisa d={CIDADE_A} acesa={ACESA.A[passo]} nome='IBGE A' x={84} y={112} />
            <Divisa d={CIDADE_B} acesa={ACESA.B[passo]} nome='IBGE B' x={600} y={112} />
            <Divisa d={AREA} acesa={ACESA.area[passo]} nome='ÁREA DESENHADA' x={170} y={366} tracejada />

            {CARROS.map((k, i) => {
              const dentro = passa(k)
              return (
                <motion.g key={i} initial={false} animate={{ opacity: dentro ? 1 : 0.16 }} transition={{ duration: 0.5, delay: (i % 7) * 0.03 }}>
                  <motion.circle
                    cx={k.x}
                    cy={k.y}
                    fill='none'
                    stroke={k.contrato ? ROXO : '#9b929d'}
                    strokeWidth={1.4}
                    initial={false}
                    animate={{ r: dentro ? 13 : 7, opacity: dentro ? 0.55 : 0 }}
                    transition={TRANSICAO}
                  />
                  <circle cx={k.x} cy={k.y} r={7} fill={k.contrato ? ROXO : '#b3aab5'} stroke='#fff' strokeWidth={1.5} />
                </motion.g>
              )
            })}
          </svg>

          {/* Legenda, com os nomes do guia de regras. */}
          <div className='flex shrink-0 items-center gap-[1.6vw] text-[0.95vw]' style={{ color: COR.cinza }}>
            <span className='flex items-center gap-[0.5vw]'>
              <span className='size-[0.8vw] rounded-full' style={{ backgroundColor: ROXO }} /> carro do contrato
            </span>
            <span className='flex items-center gap-[0.5vw]'>
              <span className='size-[0.8vw] rounded-full bg-[#b3aab5]' /> carro de outro contrato
            </span>
            <span className='flex items-center gap-[0.5vw]'>
              <span className='w-[1.6vw] border-t-2 border-dashed' style={{ borderColor: MALVA }} /> divisa do recorte
            </span>
          </div>
        </div>

        <div className='flex w-[34vw] shrink-0 flex-col justify-center gap-[0.7vw]'>
          {RECORTES.map((r, i) => {
            const atual = i === passo
            const demo = i === RECORTES.length - 1
            return (
              <Cartao
                key={r.nome}
                estado={atual ? 'atual' : 'aceso'}
                className='px-[1.3vw] py-[0.85vw] animate-ilum-rise motion-reduce:animate-none'
                style={delay(0.25 + i * 0.07)}
              >
                <span className='flex items-center justify-between gap-[0.8vw]'>
                  <span className='text-[1.3vw] font-bold'>{r.nome}</span>
                  {demo && (
                    <span
                      className='px-[0.6vw] py-[0.2vw] text-[0.75vw] font-bold tracking-[0.08em]'
                      style={atual ? { backgroundColor: '#fff', color: ROXO } : { backgroundColor: ROXO, color: '#fff' }}
                    >
                      RECORTE DA DEMO
                    </span>
                  )}
                </span>
                <span className='block mt-[0.15vw] text-[0.95vw] opacity-80'>{r.frase}</span>
              </Cartao>
            )
          })}
        </div>
      </div>
    </Pagina>
  )
}
