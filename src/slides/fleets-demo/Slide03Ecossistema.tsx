import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Cpu, Antenna, LayoutDashboard, Users, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Accent, up, easeIn, easeOut } from './kit'

const STEP2 = 'Auth & permissão'

interface No {
  Icon: LucideIcon
  nome: string
  detalhe: string
  destaque?: boolean
}

// Campo (devices) → Ingestor → Fleets → Usuários
const nos: No[] = [
  { Icon: Cpu, nome: 'Campo', detalhe: 'Jetson · GeoBox' },
  { Icon: Antenna, nome: 'Ingestor', detalhe: 'GPS + imagens' },
  { Icon: LayoutDashboard, nome: 'Fleets', detalhe: 'A operação', destaque: true },
  { Icon: Users, nome: 'Usuários', detalhe: '5 perfis' },
]

export default function Slide03Ecossistema({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Ecossistema'
        title={
          <>
            Do campo até o usuário, <Accent>um caminho só.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 flex items-center justify-center gap-6'>
        {nos.map((n, i) => (
          <div key={n.nome} className='flex items-center gap-6'>
            {i > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: easeOut,
                  delay: 0.42 + (i - 1) * 0.16,
                }}
              >
                <ArrowRight
                  className='size-8 text-purple/40 shrink-0'
                  strokeWidth={1.6}
                />
              </motion.div>
            )}
            <motion.div
              {...up(0.3 + i * 0.16, easeIn)}
              className={`w-[320px] h-[360px] flex flex-col items-center justify-center gap-6 border ${
                n.destaque
                  ? 'border-purple/40 bg-purple/[0.08]'
                  : 'border-text/10 bg-black/[0.02]'
              }`}
            >
              <n.Icon
                className={`size-16 shrink-0 ${
                  n.destaque ? 'text-purple/70' : 'text-purple/40'
                }`}
                strokeWidth={1.3}
              />
              <div
                className={`text-[38px] font-bold tracking-[-0.03em] leading-none ${
                  n.destaque ? 'text-purple' : 'text-text/85'
                }`}
              >
                {n.nome}
              </div>
              <div className='font-mono text-[13px] tracking-[0.12em] text-text/40 uppercase'>
                {n.detalhe}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <Bar kicker='Base técnica' visible={phase === 1} delay={0.1}>
        Autenticação: <span className='text-purple'>GatesAuth (Cognito)</span> ·
        Permissão: <span className='text-purple'>CASL</span>
        <span className='block text-[17px] font-normal text-text/50 mt-2'>
          O mapa e as metas se alimentam dessa telemetria.
        </span>
      </Bar>
    </SlideShell>
  )
}
