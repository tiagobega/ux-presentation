import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  HardDrive,
  FileSpreadsheet,
  TriangleAlert,
  ArrowRight,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from './kit'

const dores: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: HardDrive,
    titulo: 'Hardware sem ciclo de vida',
    texto:
      'Jetson e GeoBox circulam entre estoque, veículo e manutenção sem um registro único de onde cada peça está e por onde passou.',
  },
  {
    Icon: FileSpreadsheet,
    titulo: 'Contratos e pagamentos soltos',
    texto:
      'Centros de custo, vínculos de motorista e fechamento mensal vivem em planilhas e ferramentas que não conversam entre si.',
  },
  {
    Icon: TriangleAlert,
    titulo: 'Erro humano e hardware mudo',
    texto:
      'Device errado no veículo errado, chip trocado, equipamento inoperante que ninguém percebe — cada um deles custa caro.',
  },
]

const cadeia = ['Dispositivo', 'Veículo', 'Pessoa', 'Contrato', 'Pagamento']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide01Problema({ action: _ }: SlideProps) {
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='O problema'
        title={
          <>
            Três mundos que hoje vivem em{' '}
            <Accent>planilhas separadas.</Accent>
          </>
        }
        lead='O hardware que instalamos nos veículos, os contratos e centros de custo, e as pessoas que operam a frota. Cada um com sua própria fonte de verdade.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 gap-4 items-center'>
        {dores.map((d, i) => (
          <motion.div
            key={d.titulo}
            {...up(0.3 + i * 0.12, easeIn)}
            className='border border-text/10 bg-black/2 p-7 flex flex-col gap-4 h-full justify-center'
          >
            <d.Icon
              className='size-8 text-red-500/65 flex-shrink-0'
              strokeWidth={1.5}
            />
            <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
              {d.titulo}
            </div>
            <div className='text-[16px] text-text/60 leading-[1.5]'>
              {d.texto}
            </div>
          </motion.div>
        ))}
      </div>

      {/* a cadeia que o Fleets amarra */}
      <motion.div
        {...up(0.66, easeIn)}
        className='border border-purple/30 bg-purple/[0.07] px-9 py-6 flex items-center gap-8'
      >
        <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase leading-[1.6] shrink-0'>
          Fleets
          <br />
          fonte única
          <br />
          de verdade
        </div>
        <div className='w-px self-stretch bg-purple/20' />
        <div className='flex items-center gap-4 flex-1 justify-center'>
          {cadeia.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: easeIn,
                delay: 0.8 + i * 0.1,
              }}
              className='flex items-center gap-4'
            >
              <span className='text-[22px] font-bold text-text tracking-[-0.02em]'>
                {c}
              </span>
              {i < cadeia.length - 1 && (
                <ArrowRight className='size-4 text-purple/45' strokeWidth={2} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Punch delay={1.3}>
        O diferencial não é cadastrar cada peça.{' '}
        <span className='text-purple'>
          É rastrear o vínculo entre elas, com auditoria.
        </span>
      </Punch>
    </SlideShell>
  )
}
