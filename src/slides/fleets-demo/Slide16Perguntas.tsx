import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { SlideShell, up, easeIn } from './kit'

export default function Slide16Perguntas({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-10 justify-center items-center'>
      <motion.div
        {...up(0.0)}
        className='font-mono text-sm tracking-[0.2em] text-purple/45 uppercase'
      >
        Encerramento
      </motion.div>

      <motion.div
        {...up(0.12)}
        className='text-[34px] font-semibold text-text/60 tracking-[-0.02em] leading-[1.3] text-center max-w-[1200px]'
      >
        Fonte única de verdade que{' '}
        <span className='text-text'>impede o erro</span> e dá{' '}
        <span className='text-text'>visibilidade</span> — do físico ao
        operacional.
      </motion.div>

      <motion.h1
        {...up(0.3, easeIn)}
        className='text-[120px] font-bold leading-[0.9] tracking-[-0.05em] text-text text-center'
      >
        Obrigado.
      </motion.h1>

      <motion.div {...up(0.5, easeIn)} className='w-12 h-px bg-purple/30' />

      <motion.div
        {...up(0.6, easeIn)}
        className='text-[46px] font-bold text-purple tracking-[-0.03em]'
      >
        Perguntas?
      </motion.div>

      <motion.div
        {...up(0.78, easeIn)}
        className='font-mono text-[12px] tracking-[0.16em] text-text/35 uppercase text-center leading-[2]'
      >
        Tiago Bega · tiago.bega@intelicitybr.com.br
        <br />
        <span className='text-purple/45'>
          Glossário e detalhe dos fluxos na documentação de apoio
        </span>
      </motion.div>
    </SlideShell>
  )
}
