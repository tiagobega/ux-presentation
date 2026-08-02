import { motion } from 'motion/react'
import { SquareStack, Copy, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'

const instancias = [
  { titulo: 'Equipamento 1', campos: ['Transformador', 'Série 4482-A', '3 fotos'] },
  { titulo: 'Equipamento 2', campos: ['Luminária LED', 'Série 9013-C', '2 fotos'] },
  { titulo: 'Equipamento 3', campos: ['Caixa de emenda', 'Série 1177-B', '4 fotos'] },
]

export default function Slide09Duplicacao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do app · Duplicação de sessão'
        title={
          <>
            Uma sessão, <Accent>quantas repetições forem precisas.</Accent>
          </>
        }
        lead='O sistema de origem não sabe de antemão quantos equipamentos existem naquele ponto. A sessão é marcada como duplicável e cada instância guarda as próprias respostas de forma independente.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[360px_60px_1fr] gap-6 items-center'>
        {/* o molde */}
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-purple/25 bg-purple/[0.05] p-7 flex flex-col gap-4'
        >
          <div className='flex items-center justify-between'>
            <SquareStack className='size-8 text-purple/60' strokeWidth={1.5} />
            <span className='font-mono text-[10px] tracking-[0.12em] text-purple/50 uppercase border border-purple/25 px-2 py-1'>
              duplicável
            </span>
          </div>
          <div className='text-[26px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
            Sessão “Equipamento”
          </div>
          <div className='text-[16px] text-text/55 leading-[1.45]'>
            Definida uma única vez no template.
          </div>
          <div className='flex flex-col gap-2 mt-1'>
            {['Tipo do equipamento', 'Número de série', 'Fotos'].map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeOut, delay: 0.55 + i * 0.08 }}
                className='font-mono text-[12px] tracking-[0.08em] text-purple/55 border-l-2 border-purple/25 pl-3'
              >
                {c}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.75 }}
          className='flex flex-col items-center gap-2'
        >
          <Copy className='size-7 text-purple/50' strokeWidth={1.6} />
          <ArrowRight className='size-5 text-purple/40' strokeWidth={2} />
        </motion.div>

        {/* as instâncias */}
        <div className='grid grid-cols-3 gap-4'>
          {instancias.map((inst, i) => (
            <motion.div
              key={inst.titulo}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: easeOut, delay: 0.9 + i * 0.18 }}
              className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3'
            >
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[11px] tracking-[0.12em] text-purple/50 uppercase'>
                  Instância {i + 1}
                </span>
                <span className='w-2 h-2 rounded-full bg-purple/40' />
              </div>
              <div className='text-[20px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
                {inst.titulo}
              </div>
              <div className='flex flex-col gap-1.5 mt-1'>
                {inst.campos.map((c) => (
                  <div key={c} className='text-[15px] text-text/60 leading-[1.35]'>
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
