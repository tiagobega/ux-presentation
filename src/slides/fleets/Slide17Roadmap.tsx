import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Package, Smartphone, ScanLine } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from './kit'

interface Frente {
  Icon: LucideIcon
  nome: string
  ataca: string
  texto: string
}

const frentes: Frente[] = [
  {
    Icon: Package,
    nome: 'Gerenciamento de estoque',
    ataca: 'Visibilidade de hardware',
    texto:
      'Enxergar o inventário antes de ele ir a campo, não só o item já instalado.',
  },
  {
    Icon: Smartphone,
    nome: 'App do motorista',
    ataca: 'Experiência do motorista',
    texto:
      'Dar ao perfil DRIVER uma superfície própria: metas, avisos e suporte.',
  },
  {
    Icon: ScanLine,
    nome: 'Instalação assistida',
    ataca: 'Qualidade da instalação',
    texto:
      'Fechar o ciclo com a própria Jetson confirmando o que foi instalado.',
  },
]

export default function Slide17Roadmap({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Próximos passos'
        title={
          <>
            Três frentes, <Accent>três problemas diferentes.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 gap-5 items-center'>
        {frentes.map((f, i) => (
          <motion.div
            key={f.nome}
            {...up(0.3 + i * 0.12, easeIn)}
            className='border border-purple/20 bg-purple/[0.04] p-9 flex flex-col gap-6 h-full justify-center'
          >
            <div className='flex items-start justify-between'>
              <f.Icon className='size-11 text-purple/55 shrink-0' strokeWidth={1.4} />
              <span className='font-mono text-[34px] font-bold text-purple/15 leading-none'>
                0{i + 1}
              </span>
            </div>
            <div className='text-[32px] font-bold text-text tracking-[-0.03em] leading-[1.08]'>
              {f.nome}
            </div>
            <div className='h-px bg-purple/15' />
            <div>
              <div className='font-mono text-[11px] tracking-[0.16em] text-purple/55 uppercase mb-2'>
                Ataca
              </div>
              <div className='text-[21px] font-semibold text-text/90 leading-[1.25] tracking-[-0.01em]'>
                {f.ataca}
              </div>
            </div>
            <div className='text-[16px] text-text/55 leading-[1.5]'>
              {f.texto}
            </div>
          </motion.div>
        ))}
      </div>

      <Punch delay={0.8}>
        Nenhuma das três parte do zero.{' '}
        <span className='text-purple'>
          O dado já existe — falta a superfície.
        </span>
      </Punch>
    </SlideShell>
  )
}
