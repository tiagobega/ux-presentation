import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SLIDE_PADDING } from './config'

/**
 * Vocabulário visual compartilhado pelos decks (Fleets, Informs).
 * Mesmos easings, tipografia e espaçamentos do deck de Branding & UX —
 * extraídos aqui porque são dezenas de slides repetindo a mesma anatomia:
 * eyebrow mono → título → lead → corpo → punch line.
 */

export const easeOut: [number, number, number, number] = [0, 0, 0.2, 1]
export const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1]
export const drama: [number, number, number, number] = [0.77, 0, 0.22, 1]

export const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
})

/** Destaque roxo dentro de um título. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className='not-italic text-purple'>{children}</em>
}

export function SlideShell({
  children,
  className = 'gap-7',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col min-h-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

export function SlideHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}) {
  return (
    <div>
      <motion.div
        {...up(0.0)}
        className='font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase'
      >
        {eyebrow}
      </motion.div>
      <motion.h1
        {...up(0.1)}
        className='text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]'
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          {...up(0.18)}
          className='mt-3 text-[17px] text-text/50 leading-[1.55] max-w-[1080px]'
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}

/** Punch line de fechamento do slide. */
export function Punch({
  children,
  delay = 0.75,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      {...up(delay, easeIn)}
      className='text-[25px] font-bold text-center text-text tracking-[-0.02em] leading-[1.25]'
    >
      {children}
    </motion.div>
  )
}

/** Faixa roxa de apoio — usada para teses, bases técnicas e observações. */
export function Bar({
  kicker,
  children,
  delay = 0.6,
}: {
  kicker: string
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      {...up(delay, easeIn)}
      className='border border-purple/30 bg-purple/[0.07] px-9 py-5'
    >
      <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase mb-1.5'>
        {kicker}
      </div>
      <div className='text-[21px] font-bold text-text tracking-[-0.02em] leading-[1.3]'>
        {children}
      </div>
    </motion.div>
  )
}

/** Chip mono — módulos, status, entidades. */
export function Chip({
  children,
  tone = 'purple',
}: {
  children: ReactNode
  tone?: 'purple' | 'muted' | 'alert'
}) {
  const tones = {
    purple: 'border-purple/25 bg-purple/[0.06] text-purple/75',
    muted: 'border-text/12 bg-black/[0.02] text-text/50',
    alert: 'border-red-500/25 bg-red-500/[0.05] text-red-500/70',
  }
  return (
    <span
      className={`font-mono text-[11px] tracking-[0.1em] uppercase border px-2.5 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

/**
 * Bloco que abre e fecha por `max-height` — para a história crescer step a
 * step sem que o conteúdo já visível mude de lugar.
 *
 * - `max` em px precisa ser um pouco maior que a altura real do conteúdo
 *   aberto: `max-height` só limita, então o bloco para de crescer no tamanho
 *   dele.
 * - O espaçamento vai DENTRO (`pt-*` no filho), senão o `gap` do pai sobra
 *   enquanto o bloco está fechado.
 * - `fade={false}` anima só a altura: use quando o conteúdo deve aparecer
 *   DEPOIS da abertura, com um fade próprio e atrasado.
 */
export function Reveal({
  shown,
  children,
  max,
  delay = 0,
  fade = true,
  className = '',
}: {
  shown: boolean
  children: ReactNode
  /** Teto em px — a altura do conteúdo aberto, com uma folga curta. */
  max: number
  delay?: number
  fade?: boolean
  className?: string
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        maxHeight: shown ? max : 0,
        ...(fade ? { opacity: shown ? 1 : 0 } : {}),
      }}
      transition={{
        maxHeight: { duration: 0.5, ease: easeIn, delay: shown ? delay : 0 },
        opacity: {
          duration: shown ? 0.4 : 0.2,
          ease: easeIn,
          delay: shown ? delay + 0.08 : 0,
        },
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * Passos numerados de um fluxo ponta a ponta, revelados em duas fases.
 * `split` = quantos passos aparecem na fase 0.
 */
export function FlowSteps({
  steps,
  phase,
  split,
}: {
  steps: { label: string; detail: string }[]
  phase: 0 | 1
  split: number
}) {
  return (
    <div className='flex-1 min-h-0 flex flex-col justify-center gap-6'>
      {/* linha do tempo */}
      <div className='h-[18px] flex items-center shrink-0 px-[8%]'>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 1 ? 1 : split / steps.length }}
          transition={{
            duration: phase === 1 ? 1 : 0.8,
            ease: drama,
            delay: phase === 1 ? 0.15 : 0.35,
          }}
          className='h-[2px] w-full bg-purple/30'
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div
        className='grid gap-6'
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => {
          const early = i < split
          const shown = early || phase === 1
          const delay = early ? 0.4 + i * 0.22 : phase === 1 ? 0.25 + (i - split) * 0.22 : 0
          return (
            <div key={s.label} className='relative flex'>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: shown ? 1 : 0, opacity: shown ? 1 : 0 }}
                transition={{ duration: 0.3, ease: easeOut, delay }}
                className='absolute left-1/2 -top-[41px] -translate-x-1/2 z-10 w-[16px] h-[16px] rounded-full border-2 border-purple bg-white'
                style={{ boxShadow: '0 0 0 5px rgba(124,58,237,0.08)' }}
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 14 }}
                transition={{ duration: 0.45, ease: easeOut, delay: delay + 0.05 }}
                className='w-full border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-3'
              >
                <div className='font-mono text-[13px] tracking-[0.12em] text-purple/55 uppercase'>
                  0{i + 1}
                </div>
                <div className='text-[24px] font-bold text-text/90 leading-[1.12] tracking-[-0.02em]'>
                  {s.label}
                </div>
                <div className='text-[16px] text-text/60 leading-[1.5] mt-auto'>
                  {s.detail}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
