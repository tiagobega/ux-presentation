import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { easeIn, easeOut } from '../kit'
import formAnatomy from '../../assets/form-anatomy.svg'

// Full-bleed: sem SLIDE_PADDING, para o SVG usar o máximo de tela possível.
export default function Slide04Anatomia({ action: _ }: SlideProps) {
  void _
  return (
    <div className='flex-1 flex flex-col items-center min-h-0 overflow-hidden pt-8 pb-6'>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className='text-[36px] font-bold leading-[1.02] text-text tracking-[-0.03em] text-center shrink-0'
      >
        Anatomia do formulário
      </motion.h1>

      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        transition={{ clipPath: { duration: 1, ease: easeIn, delay: 0.25 }, opacity: { duration: 0.3, delay: 0.25 } }}
        className='flex-1 min-h-0 w-full flex items-center justify-center px-24 pt-4'
      >
        <img
          src={formAnatomy}
          alt='Formulário com seções e campos aninhados'
          className='h-full w-full object-contain'
        />
      </motion.div>
    </div>
  )
}
