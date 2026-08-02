import { motion } from 'motion/react'
import { Paperclip, ShieldCheck } from 'lucide-react'
import type { SlideProps } from '../config'
import { CICLO_DEVICE, ATIVIDADES, AUDIT_EVENTS } from '../../data/fleets'
import {
  SlideShell,
  SlideHeader,
  Accent,
  Chip,
  up,
  easeIn,
  easeOut,
  drama,
} from './kit'

const STEP2 = 'Rastro'

export default function Slide08CicloVida({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo-chave · Ciclo de vida do dispositivo'
        title={
          <>
            Todo hardware percorre <Accent>os mesmos cinco estados.</Accent>
          </>
        }
        lead='Manutenção e Perdido saem do fluxo esperado — mas nenhum dos dois sai do histórico.'
      />

      {/* timeline e rastro formam um bloco único, centrado no espaço restante:
          o rastro ocupa lugar mesmo invisível, então o step 2 não desloca nada. */}
      <div className='flex-1 min-h-0 flex flex-col justify-center gap-10'>
        <div className='flex flex-col gap-6'>
          {/* linha do tempo: sólida no fluxo feliz, tracejada no desvio */}
          <div className='h-[16px] flex items-center px-[10%]'>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: drama, delay: 0.35 }}
              className='h-[2px] w-[52%] bg-purple/30 origin-left'
            />
            <div className='h-[2px] flex-1 border-t-2 border-dashed border-purple/20' />
          </div>

          <div className='grid grid-cols-5 gap-4'>
            {CICLO_DEVICE.map((e, i) => (
              <div key={e.nome} className='relative flex'>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: easeOut, delay: 0.4 + i * 0.2 }}
                  className={`absolute left-1/2 -top-[39px] -translate-x-1/2 z-10 w-[16px] h-[16px] rounded-full border-2 bg-white ${
                    e.feliz ? 'border-purple' : 'border-purple/40'
                  }`}
                  style={{ boxShadow: '0 0 0 5px rgba(124,58,237,0.08)' }}
                />
                <motion.div
                  {...up(0.45 + i * 0.2, easeOut)}
                  className={`w-full p-6 flex flex-col gap-3 ${
                    e.feliz
                      ? 'border border-purple/15 bg-purple/[0.03]'
                      : 'border border-dashed border-purple/25 bg-black/[0.015]'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <e.Icon
                      className={`size-7 shrink-0 ${
                        e.feliz ? 'text-purple/55' : 'text-text/35'
                      }`}
                      strokeWidth={1.5}
                    />
                    <span className='font-mono text-[12px] tracking-[0.12em] text-purple/45'>
                      0{i + 1}
                    </span>
                  </div>
                  <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
                    {e.nome}
                  </div>
                  <div className='text-[15px] text-text/55 leading-[1.45]'>
                    {e.detalhe}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* o rastro de cada transição — segundo step */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 18 }}
          transition={{ duration: 0.5, ease: easeIn }}
          className='shrink-0 grid grid-cols-2 gap-4'
        >
          <div className='border border-purple/25 bg-purple/[0.05] p-6 flex flex-col gap-4'>
            <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
              Cada transição gera uma DeviceActivity
            </div>
            <div className='flex flex-wrap gap-2'>
              {ATIVIDADES.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
            <div className='flex items-center gap-2.5 text-[16px] text-text/65'>
              <Paperclip className='size-5 text-purple/55 shrink-0' strokeWidth={1.7} />
              Fotos e evidências anexadas, guardadas no S3
            </div>
          </div>

          <div className='border border-purple/25 bg-purple/[0.05] p-6 flex flex-col gap-4'>
            <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
              E um registro no AuditLog
            </div>
            <div className='flex flex-wrap gap-2'>
              {AUDIT_EVENTS.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
            <div className='flex items-center gap-2.5 text-[16px] text-text/65'>
              <ShieldCheck className='size-5 text-purple/55 shrink-0' strokeWidth={1.7} />
              Quem mudou, o que mudou e quando — sempre recuperável
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
