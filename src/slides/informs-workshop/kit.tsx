import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { up, easeOut, drama } from '../kit'

/**
 * Kit do deck de workshop. Reexporta o vocabulário compartilhado e substitui
 * os componentes que traziam texto abaixo de 20px: numa sala, com o deck
 * projetado, eyebrow de 14px e detalhe de 16px não se leem. Aqui 20px é o
 * piso de qualquer texto, inclusive o mono de apoio.
 *
 * O kit é local de propósito — os decks Informs, Fleets e Fleets demo seguem
 * com a escala original de `../kit`.
 */

export {
  easeOut,
  easeIn,
  drama,
  up,
  Accent,
  SlideShell,
  Punch,
  Reveal,
} from '../kit'

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
        className='font-mono text-[20px] tracking-[0.16em] text-purple/45 mb-3 uppercase'
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
          className='mt-3 text-[20px] text-text/50 leading-[1.5] max-w-[1200px]'
        >
          {lead}
        </motion.p>
      )}
    </div>
  )
}

/** Faixa roxa de apoio — kicker mono e a frase de fecho. */
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
      {...up(delay, easeOut)}
      className='border border-purple/30 bg-purple/[0.07] px-9 py-5'
    >
      <div className='font-mono text-[20px] tracking-[0.14em] text-purple/60 uppercase mb-1.5'>
        {kicker}
      </div>
      <div className='text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.3]'>
        {children}
      </div>
    </motion.div>
  )
}

/** Chip mono. */
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
      className={`font-mono text-[20px] tracking-[0.06em] uppercase border px-3 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
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
        className='grid gap-5'
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => {
          const early = i < split
          const shown = early || phase === 1
          const delay = early
            ? 0.4 + i * 0.22
            : phase === 1
              ? 0.25 + (i - split) * 0.22
              : 0
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
                className='w-full border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3'
              >
                <div className='font-mono text-[20px] tracking-[0.1em] text-purple/55 uppercase'>
                  0{i + 1}
                </div>
                <div className='text-[26px] font-bold text-text/90 leading-[1.12] tracking-[-0.02em]'>
                  {s.label}
                </div>
                <div className='text-[20px] text-text/60 leading-[1.4] mt-auto'>
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
