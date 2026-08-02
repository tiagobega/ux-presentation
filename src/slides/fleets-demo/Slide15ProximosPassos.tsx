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
import { SlideShell, SlideHeader, Accent, up, easeIn } from './kit'

const STEP2 = 'Amarração'

interface Frente {
  /** Ataca qual dor da abertura. */
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
    ataca: 'Matar o erro humano',
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

export default function Slide15ProximosPassos({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0
  let ordem = -1

  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Próximos passos'
        title={
          <>
            Sete frentes, <Accent>três dores.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-3 gap-6 w-full'>
        {frentes.map((f, fi) => (
          <div key={f.ataca} className='flex flex-col gap-4 min-h-0'>
            <motion.div
              animate={{ opacity: phase === 1 ? 1 : 0.18 }}
              transition={{ duration: 0.45, ease: easeIn, delay: fi * 0.1 }}
              className='flex items-center gap-3 shrink-0'
            >
              <span className='font-mono text-[12px] tracking-[0.16em] text-purple/70 uppercase whitespace-nowrap'>
                {f.ataca}
              </span>
              <span className='h-px flex-1 bg-purple/25' />
            </motion.div>

            {f.itens.map((it) => {
              ordem += 1
              return (
                <motion.div
                  key={it.nome}
                  {...up(0.3 + ordem * 0.08, easeIn)}
                  className='border border-purple/18 bg-purple/[0.04] px-7 py-8 flex items-center gap-5'
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

      <motion.div
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: easeIn, delay: 0.35 }}
        className='text-[26px] font-bold text-center text-text tracking-[-0.02em] leading-[1.25]'
      >
        Nada disso parte do zero:{' '}
        <span className='text-purple'>
          o registry de tipos e o perfil DRIVER já existem.
        </span>
      </motion.div>
    </SlideShell>
  )
}
