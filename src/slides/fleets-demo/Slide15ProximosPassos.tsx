import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Package,
  Smartphone,
  QrCode,
  ScanLine,
  Camera,
  Tv,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, up, easeIn } from './kit'

interface Frente {
  /** Dor da abertura que a coluna ataca. */
  ataca: string
  itens: { Icon: LucideIcon; nome: string }[]
}

// Agrupado pela amarração do roteiro: cada coluna responde a uma dor da abertura.
const frentes: Frente[] = [
  {
    ataca: 'Visibilidade real do hardware',
    itens: [
      { Icon: Activity, nome: 'Heartbeat' },
      { Icon: Package, nome: 'Estoque de hardware' },
    ],
  },
  {
    ataca: 'Mitigar o erro humano',
    itens: [
      { Icon: Smartphone, nome: 'App do motorista' },
      { Icon: QrCode, nome: 'QR Code de hardware' },
      { Icon: ScanLine, nome: 'Instalação assistida' },
    ],
  },
  {
    ataca: 'Ampliar alcance e presença',
    itens: [
      { Icon: Camera, nome: 'N100 / Câmeras' },
      { Icon: Tv, nome: 'Dashboard em TV 55"' },
    ],
  },
]

export default function Slide15ProximosPassos({ action: _ }: SlideProps) {
  void _
  let ordem = -1

  return (
    <SlideShell className='gap-9'>
      <SlideHeader eyebrow='Roadmap' title='Próximos passos' />

      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-3 gap-6 w-full'>
          {frentes.map((f, fi) => (
            <div key={f.ataca} className='flex flex-col gap-4 min-h-0'>
              <motion.div
                {...up(0.22 + fi * 0.08, easeIn)}
                className='flex items-center gap-3 shrink-0'
              >
                <span className='text-[19px] font-semibold text-purple tracking-[-0.01em] whitespace-nowrap'>
                  {f.ataca}
                </span>
                <span className='h-px flex-1 bg-purple/25' />
              </motion.div>

              {f.itens.map((it) => {
                ordem += 1
                return (
                  <motion.div
                    key={it.nome}
                    {...up(0.34 + ordem * 0.08, easeIn)}
                    className='border border-purple/18 bg-purple/[0.04] px-7 py-10 flex items-center gap-5'
                  >
                    <it.Icon
                      className='size-9 text-purple/55 shrink-0'
                      strokeWidth={1.4}
                    />
                    <span className='text-[27px] font-bold text-text tracking-[-0.03em] leading-[1.1]'>
                      {it.nome}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
