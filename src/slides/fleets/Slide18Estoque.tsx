import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { PackageOpen, ArrowLeftRight, MapPin, Package } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, Bar, Chip, up, easeIn } from './kit'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: PackageOpen,
    titulo: 'O hardware antes do campo',
    texto:
      'Uma visão dedicada ao que ainda está Fabricado ou A instalar — hoje esses estados só existem dentro da lista de dispositivos.',
  },
  {
    Icon: ArrowLeftRight,
    titulo: 'Entradas e saídas',
    texto:
      'Controle de movimentação e disponibilidade real: quanto há, do que há e para onde foi.',
  },
  {
    Icon: MapPin,
    titulo: 'Localização física',
    texto:
      'Saber em que depósito, caixa ou cidade a peça está antes de prometer uma instalação.',
  },
]

export default function Slide18Estoque({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Próximo passo 1 de 3'
        title={
          <>
            Gerenciamento de <Accent>estoque.</Accent>
          </>
        }
        lead='Hoje rastreamos o item. O passo seguinte é gerenciar o inventário como um todo.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 gap-4 items-center'>
        {pontos.map((p, i) => (
          <motion.div
            key={p.titulo}
            {...up(0.3 + i * 0.12, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-8 flex flex-col gap-5 h-full justify-center'
          >
            <p.Icon className='size-9 text-purple/55 shrink-0' strokeWidth={1.5} />
            <div className='text-[26px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
              {p.titulo}
            </div>
            <div className='text-[17px] text-text/60 leading-[1.55]'>
              {p.texto}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...up(0.66, easeIn)}
        className='border border-red-500/20 bg-red-500/[0.03] px-9 py-5 flex items-center gap-5'
      >
        <Package className='size-7 text-red-500/55 shrink-0' strokeWidth={1.6} />
        <div className='text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.25]'>
          Reduz o “device fantasma”{' '}
          <span className='text-purple'>
            e acelera a alocação para novas instalações.
          </span>
        </div>
      </motion.div>

      <Bar kicker='O que já existe' delay={0.78}>
        <span className='flex items-center gap-3 flex-wrap'>
          Status e atividades de device já estão no modelo.
          <Chip>Fabricado</Chip>
          <Chip>A instalar</Chip>
          <Chip>DeviceActivity</Chip>
          <span className='text-purple'>Falta a camada de estoque.</span>
        </span>
      </Bar>
    </SlideShell>
  )
}
