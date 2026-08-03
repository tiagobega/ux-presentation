import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from '../kit'

const fluxos = [
  { texto: 'Publica o template e gera o formulário' },
  { texto: 'Entrega a demanda pro campo, mesmo offline' },
  { texto: 'Devolve o formulário preenchido' },
]

export default function Slide02Arquitetura({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Arquitetura'
        title={<>Um fluxo só, <Accent>de ponta a ponta.</Accent></>}
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-12'>
        <div className='grid grid-cols-3 gap-6 px-2'>
          {fluxos.map((f, i) => (
            <motion.div
              key={f.texto}
              {...up(0.3 + i * 0.14, easeIn)}
              className='flex items-center gap-3 pt-3'
            >
              <ArrowRight className='size-5 text-purple/50 shrink-0' strokeWidth={2} />
              <span className='font-mono text-[12px] tracking-[0.08em] text-purple/70 uppercase leading-[1.3]'>
                {f.texto}
              </span>
            </motion.div>
          ))}
        </div>

        <Punch delay={0.75}>
          O sistema de origem decide o quê. O Informs cuida do como chegar ao campo.
        </Punch>
      </div>
    </SlideShell>
  )
}
