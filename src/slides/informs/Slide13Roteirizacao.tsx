import { motion } from 'motion/react'
import { Crosshair, Flag, Navigation } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppButton, APP } from './ui'

const modos = [
  {
    nome: 'Configurando',
    texto:
      'Define o ponto de partida, por GPS ou toque no mapa, e opcionalmente um destino final.',
  },
  {
    nome: 'Pré-visualização',
    texto:
      'O Informs ordena os formulários pela rota mais curta e mostra a distância total.',
  },
  {
    nome: 'Navegando',
    texto:
      'O verificador segue a sequência parada a parada, com opção de abrir a navegação externa.',
  },
  {
    nome: 'Concluído',
    texto: 'A rota encerra quando o último ponto da sequência é atendido.',
  },
]

/** Pontos da maquete de mapa, em coordenadas relativas ao quadro. */
const paradas = [
  { x: 16, y: 74 },
  { x: 34, y: 46 },
  { x: 52, y: 62 },
  { x: 68, y: 30 },
  { x: 86, y: 52 },
]

export default function Slide13Roteirizacao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do app · Roteirização'
        title={
          <>
            O verificador não decide <Accent>a ordem das visitas.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_540px] gap-12 items-center'>
        <div className='flex flex-col gap-3'>
          {modos.map((m, i) => (
            <motion.div
              key={m.nome}
              {...up(0.3 + i * 0.11, easeIn)}
              className='border-l-2 border-purple/40 bg-purple/[0.04] px-6 py-4 flex items-start gap-5'
            >
              <span className='font-mono text-[13px] tracking-[0.12em] text-purple/45 mt-1 shrink-0'>
                0{i + 1}
              </span>
              <div>
                <div className='text-[22px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                  {m.nome}
                </div>
                <div className='text-[16px] text-text/55 leading-[1.45] mt-1'>
                  {m.texto}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* maquete da aba Mapa com a rota calculada */}
        <motion.div
          {...up(0.4, easeIn)}
          className='justify-self-center w-full border border-text/10 rounded-lg overflow-hidden'
          style={{ background: APP.bg }}
        >
          <div className='relative h-[330px]'>
            <svg
              className='absolute inset-0 w-full h-full'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
            >
              <motion.polyline
                points={paradas.map((p) => `${p.x},${p.y}`).join(' ')}
                fill='none'
                stroke={APP.primary}
                strokeOpacity='0.55'
                strokeWidth='3'
                vectorEffect='non-scaling-stroke'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: easeOut, delay: 0.7 }}
              />
            </svg>

            {paradas.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: easeOut, delay: 0.75 + i * 0.14 }}
                className='absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[11px] font-bold'
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  border: `2px solid ${APP.primary}`,
                  color: APP.primary,
                  boxShadow: '0 1px 4px rgba(9,9,11,0.15)',
                }}
              >
                {i + 1}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className='absolute left-5 bottom-4 flex items-center gap-2 text-[11px] font-medium'
              style={{ color: APP.muted }}
            >
              <Crosshair className='size-4' strokeWidth={1.8} />
              Partida por GPS
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className='absolute right-5 top-4 flex items-center gap-2 text-[11px] font-medium'
              style={{ color: APP.muted }}
            >
              <Flag className='size-4' strokeWidth={1.8} />
              Destino
            </motion.div>
          </div>

          {/* overlay de rota calculada, como no app */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 1.5 }}
            className='m-4 rounded-2xl bg-white border border-[#e4e4e7] p-4 flex flex-col gap-3'
            style={{ boxShadow: '0 4px 14px rgba(9,9,11,0.08)' }}
          >
            <div className='text-[17px] font-bold text-[#09090b]'>Rota calculada</div>
            <div className='text-[14px]' style={{ color: APP.muted }}>
              5 paradas · 14,2 km
            </div>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <AppButton tone='outline'>Cancelar</AppButton>
              </div>
              <div className='flex-1'>
                <AppButton>
                  <Navigation className='size-4' strokeWidth={2} />
                  Iniciar
                </AppButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
