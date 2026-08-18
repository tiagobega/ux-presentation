import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Radio, CloudOff, UploadCloud } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Accent, up, easeIn } from './kit'

/**
 * Maquete animada do rastreio, em loop, para rodar sozinha enquanto se fala.
 *
 * O que está desenhado é o comportamento real do produto (`informs_front`
 * `stores/tracking-store.ts` e `informs-back/ws_server`): o app do INSPECTOR
 * lê o GPS a cada 5 s ou 10 m, manda `{lat, lng, ts_device, accuracy}` por
 * WebSocket, e quando a conexão cai os pings ficam em buffer e sobem em
 * pacote na reconexão. Por isso o loop tem uma janela sem sinal no meio.
 */

const DUR = 18000
const TRAJETO =
  'M 70 400 L 70 300 L 330 300 L 330 130 L 560 130 L 560 225 L 690 225'

/** Janela sem sinal, em fração do loop. */
const OFF_INI = 0.42
const OFF_FIM = 0.66
/** Até quando o aviso de "buffer enviado" fica na tela depois da volta. */
const FLUSH_FIM = 0.74

/** Um ping a cada ~5% do trajeto, como o intervalo de GPS do app. */
const PINGS = Array.from({ length: 18 }, (_, i) => 0.04 + i * 0.052).filter(
  (f) => f < 1,
)

const PARADAS = [
  { x: 70, y: 400, n: 1 },
  { x: 330, y: 300, n: 2 },
  { x: 330, y: 130, n: 3 },
  { x: 560, y: 225, n: 4 },
  { x: 690, y: 225, n: 5 },
]

const RUAS_H = [70, 130, 225, 300, 400]
const RUAS_V = [70, 200, 330, 450, 560, 690]

/** O ponto do desenho vira coordenada plausível de São Paulo. */
function paraLatLng(x: number, y: number) {
  return {
    lat: -23.548 - (y / 460) * 0.018,
    lng: -46.648 + (x / 760) * 0.024,
  }
}

export default function Slide06Rastreio({ action: _ }: SlideProps) {
  void _
  const trajetoRef = useRef<SVGPathElement>(null)
  const [comprimento, setComprimento] = useState(0)
  const [t, setT] = useState(0)
  const [pos, setPos] = useState({ x: 70, y: 400 })

  useEffect(() => {
    const path = trajetoRef.current
    if (!path) return
    const total = path.getTotalLength()
    setComprimento(total)

    let raf = 0
    let inicio: number | undefined

    const passo = (agora: number) => {
      if (inicio === undefined) inicio = agora
      const atual = ((agora - inicio) % DUR) / DUR
      setT(atual)
      const p = path.getPointAtLength(total * atual)
      setPos({ x: p.x, y: p.y })
      raf = requestAnimationFrame(passo)
    }

    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [])

  const offline = t >= OFF_INI && t < OFF_FIM
  const acabouDeSubir = t >= OFF_FIM && t < FLUSH_FIM

  const emBuffer = offline
    ? PINGS.filter((f) => f >= OFF_INI && f <= t).length
    : 0
  const enviados = offline
    ? PINGS.filter((f) => f < OFF_INI).length
    : PINGS.filter((f) => f <= t).length

  const { lat, lng } = paraLatLng(pos.x, pos.y)
  const tsDevice = 1755400000000 + Math.round(t * DUR)
  const accuracy = (6 + Math.sin(t * 26) * 2.5).toFixed(1)

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Rastreio'
        title={
          <>
            A rota do verificador, <Accent>ping a ping.</Accent>
          </>
        }
        lead='Quando o verificador inicia o percurso, o app passa a emitir a posição. Quem acompanha vê o trajeto se desenhar em tempo real.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1.55fr_1fr] gap-6'>
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-purple/20 bg-[#faf9fc] overflow-hidden relative'
        >
          <svg viewBox='0 0 760 460' className='w-full h-full'>
            <rect x='0' y='0' width='760' height='460' fill='#f4f2f7' />

            {RUAS_H.map((y) => (
              <line
                key={`h${y}`}
                x1='0'
                y1={y}
                x2='760'
                y2={y}
                stroke='#ffffff'
                strokeWidth={y === 300 ? 16 : 10}
              />
            ))}
            {RUAS_V.map((x) => (
              <line
                key={`v${x}`}
                x1={x}
                y1='0'
                x2={x}
                y2='460'
                stroke='#ffffff'
                strokeWidth={x === 330 ? 16 : 10}
              />
            ))}

            {/* trajeto planejado, apagado */}
            <path
              ref={trajetoRef}
              d={TRAJETO}
              fill='none'
              stroke='rgba(124,58,237,0.18)'
              strokeWidth='6'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeDasharray='2 12'
            />

            {/* trajeto já percorrido */}
            {comprimento > 0 && (
              <path
                d={TRAJETO}
                fill='none'
                stroke='#7c3aed'
                strokeWidth='6'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeDasharray={comprimento}
                strokeDashoffset={comprimento * (1 - t)}
              />
            )}

            {PARADAS.map((p) => (
              <g key={p.n}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r='17'
                  fill='#ffffff'
                  stroke='rgba(124,58,237,0.55)'
                  strokeWidth='3'
                />
                <text
                  x={p.x}
                  y={p.y + 8}
                  textAnchor='middle'
                  fontSize='22'
                  fontWeight='700'
                  fill='#7c3aed'
                >
                  {p.n}
                </text>
              </g>
            ))}

            {/* pings: roxo quando subiram, laranja quando ficaram em buffer */}
            {comprimento > 0 &&
              PINGS.filter((f) => f <= t).map((f) => {
                const p = trajetoRef.current?.getPointAtLength(comprimento * f)
                if (!p) return null
                const preso = offline && f >= OFF_INI
                return (
                  <circle
                    key={f}
                    cx={p.x}
                    cy={p.y}
                    r={preso ? 7 : 6}
                    fill={preso ? '#f97316' : '#7c3aed'}
                    opacity={preso ? 0.95 : 0.5}
                  />
                )
              })}

            {/* o verificador */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r='26'
              fill={offline ? 'rgba(249,115,22,0.16)' : 'rgba(124,58,237,0.16)'}
            />
            <circle
              cx={pos.x}
              cy={pos.y}
              r='12'
              fill={offline ? '#f97316' : '#7c3aed'}
              stroke='#ffffff'
              strokeWidth='4'
            />
          </svg>

          <div className='absolute top-5 left-5 flex items-center gap-2.5 bg-white/95 border border-text/10 px-4 py-2'>
            {offline ? (
              <CloudOff className='size-6 text-orange-500 shrink-0' strokeWidth={1.8} />
            ) : acabouDeSubir ? (
              <UploadCloud className='size-6 text-purple shrink-0' strokeWidth={1.8} />
            ) : (
              <Radio className='size-6 text-purple shrink-0' strokeWidth={1.8} />
            )}
            <span className='font-mono text-[20px] tracking-[0.06em] text-text/70 uppercase'>
              {offline
                ? `sem sinal · ${emBuffer} em buffer`
                : acabouDeSubir
                  ? 'buffer enviado'
                  : 'wss conectado'}
            </span>
          </div>
        </motion.div>

        <motion.div
          {...up(0.44, easeIn)}
          className='border border-purple/20 bg-purple/[0.04] p-7 flex flex-col gap-5 justify-center'
        >
          <div className='font-mono text-[20px] tracking-[0.12em] text-purple/60 uppercase'>
            Inspector → servidor
          </div>

          <div className='border border-purple/20 bg-white/70 p-5 font-mono text-[20px] leading-[1.6] text-text/75'>
            <div>{'{'}</div>
            <div className='pl-5'>
              &quot;lat&quot;: <span className='text-purple'>{lat.toFixed(6)}</span>,
            </div>
            <div className='pl-5'>
              &quot;lng&quot;: <span className='text-purple'>{lng.toFixed(6)}</span>,
            </div>
            <div className='pl-5'>
              &quot;ts_device&quot;: <span className='text-purple'>{tsDevice}</span>,
            </div>
            <div className='pl-5'>
              &quot;accuracy&quot;: <span className='text-purple'>{accuracy}</span>
            </div>
            <div>{'}'}</div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='border border-purple/15 bg-white/50 px-5 py-4'>
              <div className='text-[34px] font-bold text-purple leading-none'>
                {enviados}
              </div>
              <div className='font-mono text-[20px] tracking-[0.08em] text-text/45 uppercase mt-2'>
                enviados
              </div>
            </div>
            <div
              className={`border px-5 py-4 ${
                emBuffer > 0
                  ? 'border-orange-400/50 bg-orange-400/[0.08]'
                  : 'border-text/10 bg-white/50'
              }`}
            >
              <div
                className={`text-[34px] font-bold leading-none ${
                  emBuffer > 0 ? 'text-orange-500' : 'text-text/25'
                }`}
              >
                {emBuffer}
              </div>
              <div className='font-mono text-[20px] tracking-[0.08em] text-text/45 uppercase mt-2'>
                em buffer
              </div>
            </div>
          </div>

          <div className='text-[20px] text-text/60 leading-[1.35]'>
            GPS a cada 5 segundos ou 10 metros. Sem rede, o ping fica no aparelho
            e sobe em pacote quando a conexão volta.
          </div>
        </motion.div>
      </div>

      <Bar kicker='O histórico' delay={1.0}>
        Nada disso se apaga. Fica guardado para sempre, então dá para saber a
        rota que a pessoa fez, o que ajuda em questões administrativas.
      </Bar>
    </SlideShell>
  )
}
