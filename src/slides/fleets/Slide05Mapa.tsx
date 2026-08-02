import { motion } from 'motion/react'
import { Lock, Bell } from 'lucide-react'
import type { SlideProps } from '../config'
import { MODULOS } from '../../data/fleets'
import { SlideShell, SlideHeader, Accent, up, easeIn } from './kit'

export default function Slide05Mapa({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Mapa da plataforma'
        title={
          <>
            Sete módulos, <Accent>uma navegação.</Accent>
          </>
        }
        lead='Do dado bruto do hardware até o fechamento financeiro do mês — tudo dentro do mesmo menu.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-4 grid-rows-2 gap-4'>
        {MODULOS.map((m, i) => (
          <motion.div
            key={m.nome}
            {...up(0.28 + i * 0.07, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3 justify-center relative'
          >
            {m.gated && (
              <div className='absolute top-5 right-5 flex items-center gap-1.5'>
                <Lock className='size-3.5 text-purple/40' strokeWidth={2} />
                <span className='font-mono text-[9px] tracking-[0.14em] text-purple/40 uppercase'>
                  gated
                </span>
              </div>
            )}
            <m.Icon
              className='size-9 text-purple/55 flex-shrink-0'
              strokeWidth={1.5}
            />
            <div className='text-[23px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
              {m.nome}
            </div>
            <div className='text-[15px] text-text/55 leading-[1.45]'>
              {m.resumo}
            </div>
          </motion.div>
        ))}

        {/* oitava célula: as duas regras de navegação */}
        <motion.div
          {...up(0.78, easeIn)}
          className='border border-purple/30 bg-purple/[0.07] p-6 flex flex-col gap-4 justify-center'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
            Duas regras do menu
          </div>
          <div className='flex items-start gap-3'>
            <Lock className='size-5 text-purple/60 shrink-0 mt-0.5' strokeWidth={1.8} />
            <div className='text-[16px] text-text/75 leading-[1.4]'>
              Contratos, Pagamentos e Configuração só aparecem para quem tem
              permissão.
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <Bell className='size-5 text-purple/60 shrink-0 mt-0.5' strokeWidth={1.8} />
            <div className='text-[16px] text-text/75 leading-[1.4]'>
              Alertas carrega um badge com a contagem de alertas{' '}
              <span className='font-mono text-[13px] text-purple/70'>OPEN</span>.
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
