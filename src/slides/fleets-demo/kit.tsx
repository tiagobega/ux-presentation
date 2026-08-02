import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SLIDE_PADDING } from '../config'

/**
 * Vocabulário visual do deck Fleets (apresentação com demo ao vivo).
 *
 * Regra do deck (ver `fleets-slides.md`): o slide é âncora visual, não documento.
 * O conteúdo vive na fala (`fleets-roteiro.md`) e na aplicação no monitor 2.
 * Por isso a anatomia é curta: eyebrow → título grande → poucos tokens.
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
        className='text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]'
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          {...up(0.18)}
          className='mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[1080px]'
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
      className='text-[26px] font-bold text-center text-text tracking-[-0.02em] leading-[1.25]'
    >
      {children}
    </motion.div>
  )
}

/** Faixa roxa de apoio — teses, bases técnicas, frase de ouro. */
export function Bar({
  kicker,
  children,
  delay = 0.6,
  visible = true,
}: {
  kicker: string
  children: ReactNode
  delay?: number
  /** Faixas amarradas a um segundo step entram por aqui. */
  visible?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: easeIn, delay: visible ? delay : 0 }}
      className='border border-purple/30 bg-purple/[0.07] px-9 py-5'
    >
      <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase mb-1.5'>
        {kicker}
      </div>
      <div className='text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.3]'>
        {children}
      </div>
    </motion.div>
  )
}

/** Chip mono — perfis, módulos, status. */
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
    alert: 'border-amber-500/30 bg-amber-500/[0.07] text-amber-600/80',
  }
  return (
    <span
      className={`font-mono text-[11px] tracking-[0.1em] uppercase border px-2.5 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

/** Selo pulsante: a atenção da plateia deve estar no outro monitor. */
export function LiveBadge({ delay = 0.1 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className='flex items-center gap-2.5 border border-purple/25 bg-purple/[0.05] px-3.5 py-2 shrink-0'
    >
      <motion.span
        animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className='size-[7px] rounded-full bg-purple'
      />
      <span className='font-mono text-[10px] tracking-[0.18em] text-purple/70 uppercase'>
        Ao vivo · monitor 2
      </span>
    </motion.div>
  )
}

/**
 * Slide de demo: enquanto a aplicação roda no monitor 2, o slide só sinaliza
 * onde estamos. Título grande, tokens do fluxo, nada mais — sem parágrafos.
 */
export function DemoSlide({
  eyebrow,
  title,
  titleSize = 'text-[80px]',
  sub,
  chips,
  note,
  tag,
}: {
  eyebrow: string
  title: ReactNode
  /** Títulos longos pedem um passo abaixo na escala. */
  titleSize?: string
  sub?: ReactNode
  /** Tokens do fluxo, separados por `·` — máximo 4. */
  chips?: string[]
  /** Ressalva curta, entre parênteses. */
  note?: string
  /** Selo ao lado do eyebrow, ex.: `beta`. */
  tag?: string
}) {
  return (
    <SlideShell className='gap-0'>
      <div className='flex items-center justify-between gap-6 pb-6 border-b border-purple/12'>
        <motion.div
          {...up(0.0)}
          className='flex items-center gap-4 min-w-0'
        >
          <span className='font-mono text-sm tracking-[0.2em] text-purple/45 uppercase truncate'>
            {eyebrow}
          </span>
          {tag && <Chip tone='alert'>{tag}</Chip>}
        </motion.div>
        <LiveBadge delay={0.15} />
      </div>

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-9'>
        <motion.h1
          {...up(0.22)}
          className={`${titleSize} font-bold leading-[1.0] text-text tracking-[-0.04em] max-w-[1500px]`}
        >
          {title}
        </motion.h1>

        {sub && (
          <motion.div
            {...up(0.34)}
            className='text-[32px] text-text/40 leading-[1.2] tracking-[-0.02em]'
          >
            {sub}
          </motion.div>
        )}

        {chips && chips.length > 0 && (
          <div className='flex items-center flex-wrap gap-x-5 gap-y-3'>
            {chips.map((c, i) => (
              <motion.div
                key={c}
                {...up(0.42 + i * 0.09, easeIn)}
                className='flex items-center gap-5'
              >
                {i > 0 && (
                  <span className='font-mono text-[18px] text-purple/25'>·</span>
                )}
                <span className='font-mono text-[19px] tracking-[0.14em] text-text/45 uppercase'>
                  {c}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {note && (
          <motion.div
            {...up(0.5, easeIn)}
            className='text-[19px] italic text-text/35 leading-[1.4]'
          >
            {note}
          </motion.div>
        )}
      </div>
    </SlideShell>
  )
}
