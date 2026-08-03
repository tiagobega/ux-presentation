import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { STATUS_FORM, STATUS_STYLE } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, easeIn, easeOut, drama } from '../kit'

const STEP2 = 'O laranja'

export default function Slide08Status({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Status'
        title={
          <>
            Cinco status <Accent>para o ciclo de um formulário.</Accent>
          </>
        }
        lead='Iniciar move de Pendente para Em andamento e marca o horário. Enviar fecha em Completo, com horário de conclusão. Cancelar sai do fluxo esperado e fica registrado com o motivo.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center'>
        <div className='flex flex-col gap-6'>
          {/* linha do tempo: sólida no fluxo esperado, tracejada no desvio */}
          <div className='h-[16px] flex items-center px-[10%]'>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: drama, delay: 0.35 }}
              className='h-[2px] w-[72%] bg-purple/30 origin-left'
            />
            <div className='h-[2px] flex-1 border-t-2 border-dashed border-purple/20' />
          </div>

          <div className='grid grid-cols-5 gap-4'>
            {STATUS_FORM.map((s, i) => {
              const st = STATUS_STYLE[s.key]
              const desvio = s.key === 'CANCELLED'
              const foco = phase === 1 && s.soApp
              return (
                <div key={s.key} className='relative flex'>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: easeOut, delay: 0.4 + i * 0.18 }}
                    className={`absolute left-1/2 -top-[39px] -translate-x-1/2 z-10 w-[16px] h-[16px] rounded-full border-2 border-white ${st.dot}`}
                    style={{ boxShadow: '0 0 0 5px rgba(124,58,237,0.08)' }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: phase === 1 && !s.soApp ? 0.45 : 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: phase === 1 ? easeIn : easeOut,
                      delay: phase === 1 ? 0 : 0.45 + i * 0.18,
                    }}
                    className={`w-full p-6 flex flex-col gap-3 ${st.bg} ${
                      foco ? 'border-2' : 'border'
                    } ${desvio ? 'border-dashed' : ''} ${st.border}`}
                  >
                    <div className='flex items-center justify-between'>
                      <s.Icon
                        className={`size-7 shrink-0 ${st.icon}`}
                        strokeWidth={1.5}
                      />
                      <span className='font-mono text-[12px] tracking-[0.12em] text-text/25'>
                        0{i + 1}
                      </span>
                    </div>
                    <div
                      className={`text-[21px] font-bold tracking-[-0.02em] leading-[1.1] ${st.text}`}
                    >
                      {st.label}
                    </div>
                    <div className='text-[15px] text-text/55 leading-[1.45]'>
                      {s.detalhe}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </SlideShell>
  )
}
