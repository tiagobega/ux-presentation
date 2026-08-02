import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Target, BellRing, CircleHelp, Truck } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, Bar, up, easeIn, easeOut } from './kit'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: Target,
    titulo: 'Visibilidade de metas',
    texto:
      'A meta de KM já está no vínculo colaborador ↔ contrato. Falta o motorista poder vê-la sem pedir para alguém.',
  },
  {
    Icon: BellRing,
    titulo: 'Hardware inoperante no bolso',
    texto:
      'Os mesmos eventos do módulo de Alertas viram push — quem está com o veículo é quem pode agir mais rápido.',
  },
  {
    Icon: CircleHelp,
    titulo: 'Suporte ao usuário',
    texto:
      'Um canal direto do motorista, em vez de mensagem repassada por três pessoas até chegar na operação.',
  },
]

export default function Slide19AppMotorista({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Próximo passo 2 de 3'
        title={
          <>
            App do <Accent>motorista.</Accent>
          </>
        }
        lead='O perfil DRIVER já existe no modelo de permissão — hoje com leitura restrita e nenhuma superfície própria.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[400px_1fr] gap-12 items-center'>
        {/* maquete do app */}
        <motion.div
          {...up(0.3, easeIn)}
          className='justify-self-center border-[10px] border-text/85 rounded-[38px] bg-white/70 w-[330px] overflow-hidden'
        >
          <div className='bg-purple px-6 pt-6 pb-7'>
            <div className='font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase'>
              Fleets · Motorista
            </div>
            <div className='text-[24px] font-bold text-white tracking-[-0.02em] mt-1'>
              José Marinho
            </div>
          </div>

          <div className='px-6 py-6 flex flex-col gap-6'>
            <div>
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase mb-2'>
                Meta de julho
              </div>
              <div className='text-[30px] font-bold text-text tracking-[-0.03em] leading-none'>
                1.840
                <span className='text-[16px] font-normal text-text/40'>
                  {' '}
                  / 2.400 km
                </span>
              </div>
              <div className='h-2.5 bg-purple/10 mt-3'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '77%' }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.7 }}
                  className='h-full bg-purple/70'
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.95 }}
              className='border border-red-500/25 bg-red-500/[0.05] p-4 flex items-start gap-3'
            >
              <BellRing
                className='size-5 text-red-500/65 shrink-0 mt-0.5'
                strokeWidth={1.7}
              />
              <div>
                <div className='text-[15px] font-bold text-text/85 leading-[1.25]'>
                  Câmera sem transmissão
                </div>
                <div className='text-[13px] text-text/50 leading-[1.35] mt-1'>
                  Verifique o posicionamento do equipamento.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.15 }}
              className='border border-purple/25 bg-purple/[0.05] px-4 py-3 flex items-center gap-2.5'
            >
              <CircleHelp className='size-5 text-purple/60' strokeWidth={1.7} />
              <span className='text-[15px] font-semibold text-purple/80'>
                Falar com o suporte
              </span>
            </motion.div>
          </div>
        </motion.div>

        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.42 + i * 0.12, easeIn)}
              className='border border-purple/15 bg-purple/[0.03] p-7 flex items-start gap-5'
            >
              <p.Icon className='size-8 text-purple/55 shrink-0' strokeWidth={1.5} />
              <div>
                <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                  {p.titulo}
                </div>
                <div className='text-[17px] text-text/60 leading-[1.5] mt-2'>
                  {p.texto}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Bar kicker='Por que destrava rápido' delay={0.85}>
        <span className='flex items-center gap-3'>
          <Truck className='size-6 text-purple/70 shrink-0' strokeWidth={1.7} />
          Meta e alerta já existem no backend.{' '}
          <span className='text-purple'>
            O app é a superfície nova, não o dado novo.
          </span>
        </span>
      </Bar>
    </SlideShell>
  )
}
