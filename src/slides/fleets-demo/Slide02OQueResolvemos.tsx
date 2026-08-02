import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ShieldCheck, Eye, History } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from './kit'

interface Ganho {
  Icon: LucideIcon
  texto: string
}

// Espelha, na mesma ordem, as três dores do slide anterior.
const ganhos: Ganho[] = [
  { Icon: ShieldCheck, texto: 'Regra de negócio no lugar certo' },
  { Icon: Eye, texto: 'Visibilidade real' },
  { Icon: History, texto: 'Rastreabilidade e auditoria' },
]

export default function Slide02OQueResolvemos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-10'>
      <SlideHeader
        eyebrow='O que resolvemos'
        title={
          <>
            Agora: <Accent>fonte única de verdade.</Accent>
          </>
        }
      />

      {/* Mesma anatomia do slide anterior — só a cor muda: de cinza para roxo. */}
      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-3 gap-6 w-full'>
        {ganhos.map((g, i) => (
          <motion.div
            key={g.texto}
            {...up(0.3 + i * 0.13, easeIn)}
            className='border border-purple/25 bg-purple/[0.05] p-10 flex flex-col gap-14'
          >
            <div className='flex items-start justify-between'>
              <g.Icon
                className='size-11 text-purple/55 shrink-0'
                strokeWidth={1.4}
              />
              <span className='font-mono text-[34px] font-bold text-purple/15 leading-none'>
                0{i + 1}
              </span>
            </div>
            <div className='text-[38px] font-bold text-text tracking-[-0.03em] leading-[1.05]'>
              {g.texto}
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <Punch delay={0.85}>
        De “planilha que exporta erro”{' '}
        <span className='text-purple'>para “plataforma que impede o erro”.</span>
      </Punch>
    </SlideShell>
  )
}
