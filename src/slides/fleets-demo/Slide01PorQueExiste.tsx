import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Table2, Unplug, TriangleAlert } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from './kit'

interface Dor {
  Icon: LucideIcon
  texto: string
}

// Os três pontos da "trágica história" — o detalhe de cada um vive na fala.
const dores: Dor[] = [
  { Icon: Table2, texto: 'Não escala a gestão de campo' },
  { Icon: Unplug, texto: 'Não conversa com sistema' },
  { Icon: TriangleAlert, texto: 'Sem regra de negócio' },
]

export default function Slide01PorQueExiste({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-10'>
      <SlideHeader
        eyebrow='Por que o Fleets existe'
        title={
          <>
            Antes: <Accent>uma planilha.</Accent>
          </>
        }
      />

      {/* Cartões do tamanho do conteúdo, centrados na área livre — o slide é âncora, não painel. */}
      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-3 gap-6 w-full'>
        {dores.map((d, i) => (
          <motion.div
            key={d.texto}
            {...up(0.3 + i * 0.13, easeIn)}
            className='border border-text/10 bg-black/[0.02] p-10 flex flex-col gap-14'
          >
            <div className='flex items-start justify-between'>
              <d.Icon
                className='size-11 text-text/25 shrink-0'
                strokeWidth={1.4}
              />
              <span className='font-mono text-[34px] font-bold text-text/[0.08] leading-none'>
                0{i + 1}
              </span>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='text-[38px] font-bold text-text/75 tracking-[-0.03em] leading-[1.05]'>
                {d.texto}
              </div>
              {i === 2 && (
                <motion.div
                  {...up(0.75, easeIn)}
                  className='font-mono text-[15px] tracking-[0.1em] text-text/35 uppercase'
                >
                  → dado quebrado
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <Punch delay={0.9}>
        O dado nascia sujo{' '}
        <span className='text-purple'>e virava problema lá na frente.</span>
      </Punch>
    </SlideShell>
  )
}
