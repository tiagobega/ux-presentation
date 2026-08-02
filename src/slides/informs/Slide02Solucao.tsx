import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutTemplate,
  Boxes,
  CloudOff,
  Satellite,
  Route,
  ArrowRight,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn } from '../kit'

const STEP2 = 'Como resolvemos'

const pares: {
  dor: string
  Icon: LucideIcon
  solucao: string
  detalhe: string
}[] = [
  {
    dor: 'Formulários rígidos',
    Icon: LayoutTemplate,
    solucao: 'Templates dinâmicos',
    detalhe: 'O sistema de origem monta o formulário sem depender de release.',
  },
  {
    dor: 'Um app por sistema',
    Icon: Boxes,
    solucao: 'Sistema de Origem',
    detalhe: 'GAIA, Porto Alegre, Recife e SABESP como conceito de primeira classe.',
  },
  {
    dor: 'Perda de dados offline',
    Icon: CloudOff,
    solucao: 'Arquitetura offline-first',
    detalhe: 'Fila de sincronização, cache e upload adiado.',
  },
  {
    dor: 'Sem visibilidade',
    Icon: Satellite,
    solucao: 'Rastreio de rota',
    detalhe: 'GPS em background e WebSocket em tempo real.',
  },
  {
    dor: 'Deslocamento ineficiente',
    Icon: Route,
    solucao: 'Roteirização',
    detalhe: 'As visitas ordenadas pela menor distância.',
  },
]

export default function Slide02Solucao({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='A resposta'
        title={
          <>
            O que se pergunta e como se preenche{' '}
            <Accent>são coisas separadas.</Accent>
          </>
        }
        lead='O template é do sistema de origem. O preenchimento é do app, offline, no bolso do verificador.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-2'>
        <motion.div
          {...up(0.24, easeIn)}
          className='grid grid-cols-[300px_40px_1fr] gap-6 px-6 pb-1 font-mono text-[11px] tracking-[0.16em] text-purple/45 uppercase'
        >
          <div>A dor</div>
          <div />
          <motion.div
            animate={{ opacity: phase === 1 ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          >
            Como o Informs resolve
          </motion.div>
        </motion.div>

        {pares.map((p, i) => (
          <motion.div
            key={p.dor}
            {...up(0.3 + i * 0.08, easeIn)}
            className='grid grid-cols-[300px_40px_1fr] gap-6 items-center border border-text/10 bg-black/2 px-6 py-3.5'
          >
            <div className='text-[20px] font-bold text-text/60 tracking-[-0.02em] leading-[1.15]'>
              {p.dor}
            </div>

            <motion.div
              animate={{ opacity: phase === 1 ? 1 : 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className='flex justify-center'
            >
              <ArrowRight className='size-5 text-purple/50' strokeWidth={2} />
            </motion.div>

            <motion.div
              animate={{
                opacity: phase === 1 ? 1 : 0.22,
                x: phase === 1 ? 0 : 10,
              }}
              transition={{ duration: 0.45, ease: easeIn, delay: i * 0.06 }}
              className='flex items-center gap-4 border border-purple/25 bg-purple/[0.05] px-5 py-2.5'
            >
              <p.Icon
                className='size-7 text-purple/60 shrink-0'
                strokeWidth={1.6}
              />
              <div>
                <div className='text-[20px] font-bold text-text tracking-[-0.02em] leading-[1.15]'>
                  {p.solucao}
                </div>
                <div className='text-[15px] text-text/55 leading-[1.35]'>
                  {p.detalhe}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
