import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Bell, PanelRight, SlidersHorizontal, Smartphone } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn, easeOut } from './kit'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: Bell,
    titulo: 'Lista e KPIs de alertas',
    texto:
      'O que está OPEN aparece primeiro, com o contador no menu antes de qualquer clique.',
  },
  {
    Icon: PanelRight,
    titulo: 'Sheet de detalhe',
    texto:
      'O alerta abre ao lado da lista — sem perder o contexto do que estava sendo olhado.',
  },
  {
    Icon: SlidersHorizontal,
    titulo: 'Toolbar de filtros',
    texto:
      'Recorta por status, tipo e contrato para achar o padrão por trás dos alertas.',
  },
]

const alertas = [
  { device: 'JETSON_000148', motivo: 'Sem transmissão há 3 dias', open: true },
  { device: 'GEOBOX_000072', motivo: 'GPS sem sinal', open: true },
  { device: 'JETSON_000091', motivo: 'Câmera obstruída', open: true },
  { device: 'GEOBOX_000031', motivo: 'Chip sem dados', open: false },
]

export default function Slide10Alertas({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Alertas'
        title={
          <>
            Hardware inoperante <Accent>não pode ficar invisível.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_640px] gap-10 items-center'>
        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.28 + i * 0.1, easeIn)}
              className='border-l-2 border-purple/40 bg-purple/[0.04] px-6 py-5'
            >
              <div className='flex items-center gap-3.5'>
                <p.Icon
                  className='size-6 text-purple/55 shrink-0'
                  strokeWidth={1.6}
                />
                <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                  {p.titulo}
                </div>
              </div>
              <div className='text-[16px] text-text/55 leading-[1.5] mt-2'>
                {p.texto}
              </div>
            </motion.div>
          ))}
        </div>

        {/* maquete da lista de alertas */}
        <motion.div
          {...up(0.4, easeIn)}
          className='border border-text/10 bg-white/50'
        >
          <div className='px-7 py-4 border-b border-text/8 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Bell className='size-5 text-purple/60' strokeWidth={1.7} />
              <span className='text-[18px] font-bold text-text tracking-[-0.02em]'>
                Alertas
              </span>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.8 }}
              className='font-mono text-[11px] tracking-[0.1em] text-white bg-purple px-2.5 py-1 rounded-full'
            >
              3 OPEN
            </motion.span>
          </div>
          {alertas.map((a, i) => (
            <motion.div
              key={a.device}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.85 + i * 0.1 }}
              className='px-7 py-4 border-b border-text/[0.06] last:border-0 flex items-center justify-between gap-6'
            >
              <div>
                <div className='font-mono text-[12px] tracking-[0.08em] text-purple/55'>
                  {a.device}
                </div>
                <div className='text-[17px] text-text/75 leading-[1.3] mt-1'>
                  {a.motivo}
                </div>
              </div>
              <span
                className={`font-mono text-[10px] tracking-[0.12em] uppercase border px-2.5 py-1 shrink-0 ${
                  a.open
                    ? 'border-red-500/30 bg-red-500/[0.06] text-red-500/70'
                    : 'border-text/12 bg-black/[0.02] text-text/40'
                }`}
              >
                {a.open ? 'open' : 'resolvido'}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...up(0.9, easeIn)}
        className='flex items-center justify-center gap-4'
      >
        <Smartphone className='size-6 text-purple/60 shrink-0' strokeWidth={1.7} />
        <Punch delay={0.95}>
          Hoje o alerta vive no painel web.{' '}
          <span className='text-purple'>
            O mesmo evento vira push no app do motorista.
          </span>
        </Punch>
      </motion.div>
    </SlideShell>
  )
}
