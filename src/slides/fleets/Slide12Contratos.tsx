import { motion } from 'motion/react'
import { HardDrive, Users, CircleDollarSign, Target, ScrollText } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, Bar, up, easeIn, easeOut } from './kit'

const campos = [
  { label: 'Cidade', valor: 'Campinas · SP' },
  { label: 'Endereço', valor: 'Av. das Amoreiras, 1204' },
  { label: 'Valor mensal', valor: 'R$ 148.600,00' },
  { label: 'Tipo', valor: 'Coleta contínua' },
]

const abas = [
  { Icon: HardDrive, label: 'Dispositivos', valor: '87 vinculados' },
  { Icon: Users, label: 'Colaboradores', valor: '64 ativos' },
  { Icon: CircleDollarSign, label: 'Pagamentos', valor: 'Julho · aberto' },
]

export default function Slide12Contratos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Contratos'
        title={
          <>
            O contrato é o <Accent>centro de custo</Accent> da operação.
          </>
        }
        lead='É onde pessoas, dispositivos e dinheiro se encontram — e onde o cálculo de pagamento começa.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_1fr] gap-10 items-center'>
        {/* maquete da ficha do contrato */}
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-text/10 bg-white/50'
        >
          <div className='px-7 py-5 border-b border-text/8 flex items-center justify-between'>
            <div className='flex items-center gap-3.5'>
              <ScrollText className='size-6 text-purple/60' strokeWidth={1.6} />
              <div>
                <div className='font-mono text-[11px] tracking-[0.12em] text-purple/50 uppercase'>
                  Contrato
                </div>
                <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.15]'>
                  Campinas · Coleta
                </div>
              </div>
            </div>
            <span className='font-mono text-[11px] tracking-[0.12em] uppercase border border-purple/30 bg-purple/[0.08] text-purple/80 px-3 py-1.5'>
              Vigente
            </span>
          </div>

          <div className='px-7 py-5 grid grid-cols-2 gap-x-8 gap-y-4 border-b border-text/8'>
            {campos.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.6 + i * 0.08 }}
              >
                <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
                  {c.label}
                </div>
                <div className='text-[19px] text-text/80 leading-[1.3] mt-1'>
                  {c.valor}
                </div>
              </motion.div>
            ))}
          </div>

          <div className='grid grid-cols-3 divide-x divide-text/8'>
            {abas.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.95 + i * 0.1 }}
                className='px-6 py-5 flex flex-col gap-2'
              >
                <a.Icon className='size-5 text-purple/55' strokeWidth={1.7} />
                <div className='text-[17px] font-semibold text-text/85 leading-[1.2]'>
                  {a.label}
                </div>
                <div className='font-mono text-[11px] text-purple/50'>
                  {a.valor}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* o vínculo colaborador ↔ contrato */}
        <motion.div
          {...up(0.5, easeIn)}
          className='border border-purple/30 bg-purple/[0.05] p-8 flex flex-col gap-6'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
            Vínculo Colaborador ↔ Contrato
          </div>
          <div className='text-[27px] font-bold text-text tracking-[-0.02em] leading-[1.2]'>
            Cada pessoa entra no contrato com uma meta e um valor acordado.
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.85 }}
              className='border border-purple/20 bg-white/50 px-6 py-5'
            >
              <div className='flex items-center gap-2.5 mb-2'>
                <Target className='size-5 text-purple/60' strokeWidth={1.7} />
                <span className='font-mono text-[11px] tracking-[0.1em] text-purple/60'>
                  metaKm
                </span>
              </div>
              <div className='text-[34px] font-bold text-text tracking-[-0.03em] leading-none'>
                2.400
                <span className='text-[18px] font-normal text-text/45 ml-1.5'>
                  km/mês
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.95 }}
              className='border border-purple/20 bg-white/50 px-6 py-5'
            >
              <div className='flex items-center gap-2.5 mb-2'>
                <CircleDollarSign className='size-5 text-purple/60' strokeWidth={1.7} />
                <span className='font-mono text-[11px] tracking-[0.1em] text-purple/60'>
                  valueCents
                </span>
              </div>
              <div className='text-[34px] font-bold text-text tracking-[-0.03em] leading-none'>
                R$ 2.320
                <span className='text-[18px] font-normal text-text/45 ml-1.5'>
                  /mês
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Bar kicker='Por que isso importa' delay={1.1}>
        Esses dois campos são a base do cálculo de pagamento —{' '}
        <span className='text-purple'>
          o contrato é onde o mês seguinte já está definido.
        </span>
      </Bar>
    </SlideShell>
  )
}
