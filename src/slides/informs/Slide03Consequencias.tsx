import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { LayoutTemplate, CloudOff, Satellite, Rocket } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, Reveal, easeIn } from '../kit'

interface Ganho {
  Icon: LucideIcon
  texto: string
  detalhe: string
}

// Espelha, na mesma ordem, as quatro dores da abertura (`Slide01PorQueExiste`).
const ganhos: Ganho[] = [
  {
    Icon: LayoutTemplate,
    texto: 'Templates dinâmicos',
    detalhe: 'O sistema de origem monta o formulário sem depender de release.',
  },
  {
    Icon: CloudOff,
    texto: 'Offline-first',
    detalhe: 'Fila de sincronização, autosave e upload adiado.',
  },
  {
    Icon: Satellite,
    texto: 'Rastreio em tempo real',
    detalhe: 'GPS em background e WebSocket a cada troca de status.',
  },
  {
    Icon: Rocket,
    texto: 'Publicação instantânea',
    detalhe: 'Mudou a regra? O sistema de origem publica de novo, sem novo app.',
  },
]

/**
 * Mesma mecânica da abertura: 1 a pergunta sozinha · 2 a resposta · 3 a 6 um
 * ganho cada · 7 o fechamento.
 * A linha dos ganhos abre por `max-height` no step 3 (e o primeiro card entra
 * em fade depois disso); os outros três só acendem, porque a linha já existe.
 */
const STEPS = [
  'A pergunta',
  'A resposta',
  'Templates dinâmicos',
  'Offline-first',
  'Rastreio em tempo real',
  'Publicação instantânea',
  'O foco',
]

/** O título abre grande, recua com a resposta e assenta quando os ganhos entram. */
const ESCALA_TITULO = [1.22, 1.1, 1, 1, 1, 1, 1]

/** Espera a abertura da linha terminar antes de acender o primeiro card. */
const ATRASO_1O_CARD = 0.45

export default function Slide03Consequencias({ action }: SlideProps) {
  const step = Math.max(0, STEPS.indexOf(action)) // 0..6

  return (
    <SlideShell className='justify-center items-center'>
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: ESCALA_TITULO[0] }}
        animate={{ opacity: 1, y: 0, scale: ESCALA_TITULO[step] }}
        transition={{ duration: 0.55, ease: easeIn }}
        className='text-[58px] font-bold leading-[1.05] text-text tracking-[-0.03em] text-center origin-center max-w-[1100px]'
      >
        O que o <em className='not-italic text-purple'>Informs</em> resolve?
      </motion.h1>

      {/* step 2 — a resposta */}
      <Reveal shown={step >= 1} max={200} className='w-full'>
        <p className='pt-10 text-[22px] font-medium text-text/70 leading-[1.5] text-center max-w-[980px] mx-auto'>
          O template fica com o sistema de origem. <br />O preenchimento fica com o{' '}
          <span className='font-bold text-text'>app, offline, no bolso do verificador.</span>
        </p>
      </Reveal>

      {/* step 3 — a linha abre por altura; os cards acendem por cima dela */}
      <Reveal shown={step >= 2} max={340} fade={false} className='w-full'>
        <div className='pt-12 grid grid-cols-4 gap-5 w-full'>
          {ganhos.map((g, i) => {
            const aceso = step >= i + 2
            return (
              <motion.div
                key={g.texto}
                initial={false}
                animate={{ opacity: aceso ? 1 : 0 }}
                transition={{
                  duration: 0.45,
                  ease: easeIn,
                  delay: aceso && i === 0 ? ATRASO_1O_CARD : 0,
                }}
                className='border border-purple/25 bg-purple/[0.05] p-8 flex flex-col items-center text-center gap-6'
              >
                <g.Icon className='size-9 text-purple/55 shrink-0' strokeWidth={1.4} />
                <div className='text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.1]'>
                  {g.texto}
                </div>
                <div className='text-[15px] font-medium text-text/75 leading-[1.4]'>
                  {g.detalhe}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Reveal>

      {/* step 7 — o fechamento */}
      <Reveal shown={step >= 6} max={140} className='w-full'>
        <p className='pt-12 text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.3] text-center max-w-[1080px] mx-auto'>
          O que se pergunta e como se preenche{' '}
          <span className='text-purple'>são coisas separadas.</span>
          <br />
          Isso é o Informs.
        </p>
      </Reveal>
    </SlideShell>
  )
}
