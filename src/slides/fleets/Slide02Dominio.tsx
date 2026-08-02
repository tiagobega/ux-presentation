import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  HardDrive,
  Car,
  Users,
  ScrollText,
  CircleDollarSign,
  History,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn } from './kit'

const STEP2 = 'Regra de ouro'

interface Entidade {
  Icon: LucideIcon
  nome: string
  papel: string
  campos: string
}

const entidades: Entidade[] = [
  {
    Icon: HardDrive,
    nome: 'Device',
    papel: 'O hardware IoT',
    campos: 'tipo, versão, firmware, status, chip 4G — ex.: JETSON_000001',
  },
  {
    Icon: Car,
    nome: 'Vehicle',
    papel: 'O veículo',
    campos: 'placa, modelo, tipo — sempre ligado a uma pessoa',
  },
  {
    Icon: Users,
    nome: 'Collaborator / Person',
    papel: 'O motorista',
    campos: 'o identificador primário na experiência do produto',
  },
  {
    Icon: ScrollText,
    nome: 'Contract',
    papel: 'O centro de custo',
    campos: 'cidade, valor mensal, tipo, status',
  },
  {
    Icon: CircleDollarSign,
    nome: 'Payment',
    papel: 'O pagamento mensal',
    campos: 'mês, valor estimado vs. valor pago',
  },
  {
    Icon: History,
    nome: 'DeviceActivity / AuditLog',
    papel: 'O histórico',
    campos: 'toda transição e toda ação sensível, registradas',
  },
]

export default function Slide02Dominio({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Modelo de domínio'
        title={
          <>
            Seis entidades sustentam{' '}
            <Accent>a plataforma inteira.</Accent>
          </>
        }
        lead='Todo módulo do Fleets é uma leitura diferente destas seis coisas — e dos vínculos entre elas.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4'>
        {entidades.map((e, i) => (
          <motion.div
            key={e.nome}
            {...up(0.28 + i * 0.07, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3 justify-center'
          >
            <div className='flex items-center gap-3'>
              <e.Icon
                className='size-7 text-purple/55 flex-shrink-0'
                strokeWidth={1.5}
              />
              <div className='font-mono text-[13px] tracking-[0.1em] text-purple/60'>
                {e.nome}
              </div>
            </div>
            <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
              {e.papel}
            </div>
            <div className='text-[15px] text-text/55 leading-[1.5]'>
              {e.campos}
            </div>
          </motion.div>
        ))}
      </div>

      {/* regra de ouro — revelada no segundo step */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 16 }}
        transition={{ duration: 0.5, ease: easeIn }}
        className='border border-purple/30 bg-purple/[0.07] px-9 py-6 flex items-center gap-9'
      >
        <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase shrink-0'>
          Regra de ouro
        </div>
        <div className='text-[27px] font-bold text-text tracking-[-0.02em] leading-[1.2]'>
          O veículo é o centro do dado,{' '}
          <span className='text-purple'>
            mas a pessoa é o centro da experiência.
          </span>
          <span className='block text-[17px] font-normal text-text/50 mt-2'>
            O operador procura “o equipamento do fulano” — nunca “o veículo X”.
          </span>
        </div>
      </motion.div>
    </SlideShell>
  )
}
