import { motion } from 'motion/react'
import { MessageSquare, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, FlowSteps, Accent, easeIn } from './kit'

const caminho = [
  {
    label: 'Gestor do projeto',
    detail: 'Leva a demanda para o ponto de entrada único de triagem.',
  },
  {
    label: 'Triagem',
    detail: 'Avalia aderência: Informs, Informs com evolução ou app próprio.',
  },
  {
    label: 'Time do projeto',
    detail: 'Define a origem dos dados e o consumo dos resultados.',
  },
  {
    label: 'Time Informs',
    detail: 'Apoia template, capacidades, contrato e implantação.',
  },
  {
    label: 'Gates',
    detail: 'Apoia autenticação, usuários e papéis.',
  },
]

export default function Slide10QuemProcurar({ action }: SlideProps) {
  const fase: 0 | 1 = action === 'Quem começa' ? 0 : 1

  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Quem procurar'
        title={
          <>
            Tenho um projeto. <Accent>Quem eu procuro?</Accent>
          </>
        }
      />

      <FlowSteps steps={caminho} phase={fase} split={2} />

      <motion.div
        initial={false}
        animate={{ opacity: fase === 1 ? 1 : 0, y: fase === 1 ? 0 : 10 }}
        transition={{ duration: 0.45, ease: easeIn, delay: fase === 1 ? 0.9 : 0 }}
        className='border border-purple/30 bg-purple/[0.07] px-9 py-6 flex items-center gap-6'
      >
        <MessageSquare className='size-8 text-purple/65 shrink-0' strokeWidth={1.6} />
        <div>
          <div className='font-mono text-[20px] tracking-[0.12em] text-purple/60 uppercase mb-1'>
            A entrada precisa ser única
          </div>
          <div className='text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.25] flex items-center gap-3'>
            O gestor não sai procurando quem fez cada pedaço
            <ArrowRight className='size-6 text-purple/60 shrink-0' strokeWidth={2} />
            <span className='text-purple'>Godoy · Arquitetura &amp; Produto.</span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  )
}
