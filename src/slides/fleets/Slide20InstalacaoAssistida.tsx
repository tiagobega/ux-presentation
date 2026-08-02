import { motion } from 'motion/react'
import { CircleCheckBig, Signal, MapPin, Link2, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn, easeOut } from './kit'

const validacoes = [
  { Icon: Signal, label: 'Chip 4G', detalhe: 'é o chip que o cadastro diz que é' },
  { Icon: MapPin, label: 'Posição', detalhe: 'centro, esquerda ou direita, conferida' },
  { Icon: Link2, label: 'Vínculo', detalhe: 'veículo e pessoa corretos antes de concluir' },
]

export default function Slide20InstalacaoAssistida({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Próximo passo 3 de 3'
        title={
          <>
            Instalação assistida <Accent>pela própria Jetson.</Accent>
          </>
        }
        lead='O maior ponto de erro humano da operação deixa de depender de quem preenche o formulário.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_auto_1fr] gap-8 items-center'>
        {/* hoje */}
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-red-500/20 bg-red-500/[0.03] p-9 flex flex-col gap-5 h-full justify-center'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-red-500/55 uppercase'>
            Hoje
          </div>
          <div className='text-[34px] font-bold text-text tracking-[-0.03em] leading-[1.08]'>
            O operador declara a instalação.
          </div>
          <div className='text-[18px] text-text/55 leading-[1.55]'>
            O sistema acredita no que foi digitado. Se o device foi montado no
            veículo errado, com o chip trocado ou na posição errada, a plataforma
            só descobre quando o dado chega estranho — ou não chega.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.55 }}
          className='flex flex-col items-center gap-2'
        >
          <ArrowRight className='size-9 text-purple/45' strokeWidth={1.6} />
        </motion.div>

        {/* amanhã */}
        <motion.div
          {...up(0.45, easeIn)}
          className='border border-purple/30 bg-purple/[0.06] p-9 flex flex-col gap-5 h-full justify-center'
        >
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
            Amanhã
          </div>
          <div className='text-[34px] font-bold text-text tracking-[-0.03em] leading-[1.08]'>
            O hardware confirma a instalação.
          </div>

          <div className='flex flex-col gap-3 mt-1'>
            {validacoes.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.7 + i * 0.12 }}
                className='flex items-center gap-4 border border-purple/15 bg-white/40 px-5 py-3.5'
              >
                <CircleCheckBig
                  className='size-5 text-purple/70 shrink-0'
                  strokeWidth={1.8}
                />
                <v.Icon className='size-5 text-purple/45 shrink-0' strokeWidth={1.7} />
                <span className='text-[19px] font-semibold text-text/85 tracking-[-0.01em]'>
                  {v.label}
                </span>
                <span className='text-[16px] text-text/50 leading-[1.3]'>
                  {v.detalhe}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Punch delay={1.1}>
        A instalação deixa de ser uma declaração{' '}
        <span className='text-purple'>e passa a ser uma verificação.</span>
      </Punch>
    </SlideShell>
  )
}
