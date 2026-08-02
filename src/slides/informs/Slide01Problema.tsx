import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ClipboardList, WifiOff, Eye, Timer } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn } from '../kit'

const dores: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: ClipboardList,
    titulo: 'Formulários rígidos',
    texto:
      'Cada sistema de origem tem seu próprio formato de vistoria, e um app feito sob medida para ele.',
  },
  {
    Icon: WifiOff,
    titulo: 'Campo sem conectividade',
    texto:
      'Se cai a internet no meio da rua, o trabalho para ou some. O verificador refaz do zero.',
  },
  {
    Icon: Eye,
    titulo: 'Zero visibilidade',
    texto:
      'Ninguém sabe onde o verificador está, o que já foi feito nem quanto falta da rota.',
  },
  {
    Icon: Timer,
    titulo: 'Mudança vira projeto',
    texto:
      'Mudou a regra da vistoria? Novo projeto vira um novo desenvolvimento, novo app, nova release, semanas de espera até chegar ao campo.',
  },
]

export default function Slide01Problema({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='O problema'
        title={
          <>
            Um moto-verificador na rua, com{' '}
            <Accent>uma lista de endereços.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-4 gap-4 items-center'>
        {dores.map((d, i) => (
          <motion.div
            key={d.titulo}
            {...up(0.3 + i * 0.1, easeIn)}
            className='border border-text/10 bg-black/2 p-7 flex flex-col gap-4 h-full justify-center'
          >
            <d.Icon
              className='size-8 text-red-500/65 flex-shrink-0'
              strokeWidth={1.5}
            />
            <div className='text-[23px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
              {d.titulo}
            </div>
            <div className='text-[16px] text-text/60 leading-[1.5]'>
              {d.texto}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
