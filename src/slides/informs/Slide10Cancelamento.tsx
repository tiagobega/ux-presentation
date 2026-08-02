import { motion } from 'motion/react'
import { Camera, Type, Check } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, AppCard, AppButton, StatusLine, APP } from './ui'

const justificativas = [
  { motivo: 'Local inacessível', texto: true, foto: true },
  { motivo: 'Endereço não localizado', texto: true, foto: false },
  { motivo: 'Recusa do responsável', texto: true, foto: false },
  { motivo: 'Imóvel demolido', texto: false, foto: true },
]

export default function Slide10Cancelamento({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Cancelamento'
        title={
          <>
            Cancelar exige <Accent>uma justificativa estruturada.</Accent>
          </>
        }
        lead='Cada motivo define o que precisa ser comprovado. A visita que não aconteceu também volta como dado para o sistema de origem.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_400px] gap-12 items-center'>
        <div className='flex flex-col gap-3'>
          <motion.div
            {...up(0.26, easeIn)}
            className='grid grid-cols-[1fr_140px_140px] gap-4 px-6 font-mono text-[11px] tracking-[0.16em] text-purple/45 uppercase'
          >
            <div>Justificativa</div>
            <div>Texto</div>
            <div>Foto</div>
          </motion.div>

          {justificativas.map((j, i) => (
            <motion.div
              key={j.motivo}
              {...up(0.32 + i * 0.1, easeIn)}
              className='grid grid-cols-[1fr_140px_140px] gap-4 items-center border border-text/10 bg-black/2 px-6 py-4'
            >
              <div className='text-[21px] font-bold text-text/85 tracking-[-0.02em] leading-[1.15]'>
                {j.motivo}
              </div>
              {[
                { exige: j.texto, Icon: Type, rotulo: 'Texto' },
                { exige: j.foto, Icon: Camera, rotulo: 'Foto' },
              ].map((c) => (
                <div
                  key={c.rotulo}
                  className={`flex items-center gap-2.5 border px-3 py-2 ${
                    c.exige
                      ? 'border-purple/30 bg-purple/[0.06]'
                      : 'border-text/10 bg-black/[0.015]'
                  }`}
                >
                  <c.Icon
                    className={`size-5 shrink-0 ${
                      c.exige ? 'text-purple/70' : 'text-text/25'
                    }`}
                    strokeWidth={1.7}
                  />
                  <span
                    className={`text-[15px] font-semibold leading-[1.2] ${
                      c.exige ? 'text-purple/85' : 'text-text/35'
                    }`}
                  >
                    {c.exige ? 'Obrigatório' : 'Opcional'}
                  </span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div {...up(0.44, easeIn)} className='justify-self-center'>
          <AppScreen voltar width='w-[380px]'>
            <div
              className='text-[11px] font-semibold uppercase tracking-wide'
              style={{ color: APP.muted }}
            >
              Motivo do cancelamento
            </div>

            {justificativas.slice(0, 3).map((j, i) => (
              <motion.div
                key={j.motivo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.75 + i * 0.1 }}
              >
                <AppCard
                  className={`px-3 py-2.5 flex items-center justify-between gap-3 ${
                    i === 0 ? 'border-2 border-sky-500' : ''
                  }`}
                >
                  <span className='text-[14px] font-semibold text-[#09090b] leading-[1.2]'>
                    {j.motivo}
                  </span>
                  {i === 0 && (
                    <Check className='size-4 text-sky-500 shrink-0' strokeWidth={2.5} />
                  )}
                </AppCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 1.1 }}
              className='flex flex-col gap-2'
            >
              <div className='text-[13px] font-medium text-[#09090b]'>
                Observação <span className='text-red-500'>*</span>
              </div>
              <div className='h-14 rounded-md bg-white border border-[#e4e4e7]' />
              <div className='rounded-md border border-dashed border-sky-500/50 bg-sky-500/[0.05] py-3 flex items-center justify-center gap-2'>
                <Camera className='size-4 text-sky-500' strokeWidth={1.8} />
                <span className='text-[12px] text-sky-600 font-medium'>
                  Foto obrigatória para este motivo
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className='flex items-center justify-between gap-3'
            >
              <StatusLine status='CANCELLED' />
              <div className='w-[170px]'>
                <AppButton tone='danger'>Confirmar</AppButton>
              </div>
            </motion.div>
          </AppScreen>
        </motion.div>
      </div>
    </SlideShell>
  )
}
