import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ClipboardList, WifiOff, Eye, Timer } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, Reveal, easeIn } from '../kit'

interface Dor {
  Icon: LucideIcon
  titulo: string
  texto: string
}

// Uma dor por step, já com a descrição: a fala apresenta uma, depois a próxima.
const dores: Dor[] = [
  {
    Icon: ClipboardList,
    titulo: 'Formulários rígidos',
    texto: 'Cada sistema de origem tem seu formato de vistoria, e um app sob medida para ele.',
  },
  {
    Icon: WifiOff,
    titulo: 'Campo sem conectividade',
    texto: 'Se cai a internet no meio da rua, o trabalho para ou some.',
  },
  {
    Icon: Eye,
    titulo: 'Zero visibilidade',
    texto: 'Ninguém sabe onde o verificador está nem quanto falta da rota.',
  },
  {
    Icon: Timer,
    titulo: 'Mudança vira projeto',
    texto: 'Mudou a regra da vistoria? Novo desenvolvimento, nova release, semanas de espera.',
  },
]

/**
 * 1 a pergunta sozinha · 2 a resposta · 3 a 6 uma dor cada.
 * A linha das dores abre por `max-height` no step 3 (e o primeiro card entra
 * em fade depois disso); os outros três só acendem, porque a linha já existe.
 */
const STEPS = [
  'A pergunta',
  'A resposta',
  'Formulários rígidos',
  'Campo sem conectividade',
  'Zero visibilidade',
  'Mudança vira projeto',
]

/** O título abre grande, recua com a resposta e assenta quando as dores entram. */
const ESCALA_TITULO = [1.22, 1.1, 1, 1, 1, 1]

/** Espera a abertura da linha terminar antes de acender o primeiro card. */
const ATRASO_1O_CARD = 0.45

export default function Slide01PorQueExiste({ action }: SlideProps) {
  const step = Math.max(0, STEPS.indexOf(action)) // 0..5

  return (
    <SlideShell className='justify-center items-center'>
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: ESCALA_TITULO[0] }}
        animate={{ opacity: 1, y: 0, scale: ESCALA_TITULO[step] }}
        transition={{ duration: 0.55, ease: easeIn }}
        className='text-[64px] font-bold leading-[1.02] text-text tracking-[-0.03em] text-center origin-center'
      >
        Por que o <em className='not-italic text-purple'>Informs</em> existe?
      </motion.h1>

      {/* step 2 — a resposta */}
      <Reveal shown={step >= 1} max={190} className='w-full'>
        <p className='pt-10 text-[22px] font-medium text-text/70 leading-[1.5] text-center max-w-[980px] mx-auto'>
          Um moto-verificador vai a campo com uma lista de endereços. <br />
          <span className='font-bold text-text'>
            Cada sistema de origem resolve isso à sua maneira.
          </span>
        </p>
      </Reveal>

      {/* step 3 — a linha abre por altura; os cards acendem por cima dela */}
      <Reveal shown={step >= 2} max={340} fade={false} className='w-full'>
        <div className='pt-14 grid grid-cols-4 gap-5 w-full'>
          {dores.map((d, i) => {
            const aceso = step >= i + 2
            return (
              <motion.div
                key={d.titulo}
                initial={false}
                animate={{ opacity: aceso ? 1 : 0 }}
                transition={{
                  duration: 0.45,
                  ease: easeIn,
                  delay: aceso && i === 0 ? ATRASO_1O_CARD : 0,
                }}
                className='border border-text/10 bg-black/[0.02] p-8 flex flex-col items-center text-center gap-6'
              >
                <d.Icon className='size-9 text-red-500/60 shrink-0' strokeWidth={1.4} />
                <div className='text-[24px] font-bold text-text/85 tracking-[-0.02em] leading-[1.12]'>
                  {d.titulo}
                </div>
                <div className='text-[15px] text-text/60 leading-[1.45]'>{d.texto}</div>
              </motion.div>
            )
          })}
        </div>
      </Reveal>
    </SlideShell>
  )
}
