import { motion } from 'motion/react'
import { CircleCheckBig, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, up, easeIn, easeOut } from '../kit'

const hoje = [
  'Templates dinâmicos montados pelo sistema de origem, sem release',
  'Preenchimento offline com fila de sincronização persistida',
  'Sessões duplicáveis e validação campo a campo com Zod',
  'Roteirização por menor distância e rastreio em tempo real',
]

const amanha = [
  'PWA testada e app publicado também na App Store',
  'Rebranding aplicado e layout responsivo em tablet e desktop',
  'Rastreio consumido direto pelos sistemas de origem',
]

export default function Slide20Encerramento({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-8 justify-center'>
      <motion.div
        {...up(0.0)}
        className='font-mono text-sm tracking-[0.2em] text-purple/45 uppercase text-center'
      >
        Encerramento
      </motion.div>

      <motion.h1
        {...up(0.12)}
        className='text-[54px] font-bold leading-[1.05] text-text tracking-[-0.03em] text-center'
      >
        O que o Informs já faz{' '}
        <em className='not-italic text-purple'>e o que vem a seguir.</em>
      </motion.h1>

      <div className='grid grid-cols-[1fr_auto_1fr] gap-8 items-stretch mt-2'>
        <motion.div
          {...up(0.32, easeIn)}
          className='border border-text/10 bg-black/2 p-9 flex flex-col gap-5'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase'>
            Informs hoje
          </div>
          {hoje.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.5 + i * 0.09 }}
              className='flex items-start gap-3'
            >
              <CircleCheckBig
                className='size-5 text-purple/50 shrink-0 mt-1'
                strokeWidth={1.8}
              />
              <span className='text-[18px] text-text/70 leading-[1.45]'>{h}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.6 }}
          className='self-center'
        >
          <ArrowRight className='size-9 text-purple/45' strokeWidth={1.6} />
        </motion.div>

        <motion.div
          {...up(0.44, easeIn)}
          className='border border-purple/30 bg-purple/[0.06] p-9 flex flex-col gap-5'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
            Informs amanhã
          </div>
          {amanha.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.7 + i * 0.09 }}
              className='flex items-start gap-3'
            >
              <ArrowRight
                className='size-5 text-purple/60 shrink-0 mt-1'
                strokeWidth={2}
              />
              <span className='text-[18px] text-text/75 leading-[1.45]'>{a}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...up(1.05, easeIn)}
        className='flex flex-col items-center gap-4 mt-2'
      >
        <div className='w-12 h-px bg-purple/30' />
        <div className='text-[40px] font-bold text-purple tracking-[-0.03em]'>
          Perguntas?
        </div>
      </motion.div>
    </SlideShell>
  )
}
