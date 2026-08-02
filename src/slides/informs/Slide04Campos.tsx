import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { TIPOS_CAMPO, CAMPOS_INFO } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'

export default function Slide04Campos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Vocabulário de montagem'
        title={
          <>
            Dez tipos de campo <Accent>cobrem qualquer vistoria.</Accent>
          </>
        }
        lead='O template combina os tipos que já existem, sem pedir campo novo ao time de software.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-7'>
        <div>
          <motion.div
            {...up(0.24, easeIn)}
            className='font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase mb-3'
          >
            Campos de coleta
          </motion.div>
          <div className='grid grid-cols-5 gap-3'>
            {TIPOS_CAMPO.map((t, i) => (
              <motion.div
                key={t.nome}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.3 + i * 0.05 }}
                className='border border-purple/15 bg-purple/[0.03] px-5 py-4 flex items-center gap-3.5'
              >
                <t.Icon
                  className='size-6 text-purple/55 shrink-0'
                  strokeWidth={1.6}
                />
                <span className='text-[17px] font-semibold text-text/85 leading-[1.2] tracking-[-0.01em]'>
                  {t.nome}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            {...up(0.68, easeIn)}
            className='font-mono text-[11px] tracking-[0.16em] text-text/40 uppercase mb-3'
          >
            Campos informativos, só leitura
          </motion.div>
          <div className='grid grid-cols-4 gap-3'>
            {CAMPOS_INFO.map((c, i) => (
              <motion.div
                key={c.nome}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.74 + i * 0.07 }}
                className='border border-text/12 bg-black/[0.02] px-5 py-4 flex items-start gap-3.5'
              >
                <c.Icon
                  className='size-6 text-text/40 shrink-0 mt-0.5'
                  strokeWidth={1.6}
                />
                <div>
                  <div className='text-[17px] font-semibold text-text/75 leading-[1.2] tracking-[-0.01em]'>
                    {c.nome}
                  </div>
                  <div className='text-[14px] text-text/45 leading-[1.35] mt-0.5'>
                    {c.detalhe}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
