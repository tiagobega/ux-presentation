import { motion } from 'motion/react'
import { CircleCheckBig, CircleX } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, up, easeIn } from './kit'

const lados = [
  {
    Icon: CircleCheckBig,
    kicker: 'Se cabe no modelo do produto',
    frase: 'Reutilizamos.',
    detalhe: 'Template novo, campos novos, mesmo app, mesma implantação.',
    borda: 'border-emerald-500/35',
    fundo: 'bg-emerald-500/[0.05]',
    texto: 'text-emerald-600',
  },
  {
    Icon: CircleX,
    kicker: 'Se exige transformar o produto por um projeto só',
    frase: 'Construímos outra coisa.',
    detalhe: 'E aí a conversa é de escopo, prazo e time, não de parametrização.',
    borda: 'border-red-500/35',
    fundo: 'bg-red-500/[0.05]',
    texto: 'text-red-600',
  },
]

export default function Slide11Encerramento({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-9 justify-center'>
      <motion.div
        {...up(0.0)}
        className='font-mono text-[20px] tracking-[0.16em] text-purple/45 uppercase text-center'
      >
        Encerramento
      </motion.div>

      <motion.h1
        {...up(0.12)}
        className='text-[56px] font-bold leading-[1.05] text-text tracking-[-0.03em] text-center'
      >
        Antes de criar outro app de campo,{' '}
        <em className='not-italic text-purple'>avalie Informs.</em>
      </motion.h1>

      <div className='grid grid-cols-2 gap-6'>
        {lados.map((l, i) => (
          <motion.div
            key={l.kicker}
            {...up(0.34 + i * 0.14, easeIn)}
            className={`border ${l.borda} ${l.fundo} p-9 flex flex-col gap-3`}
          >
            <l.Icon className={`size-8 ${l.texto} shrink-0`} strokeWidth={1.6} />
            <div className='font-mono text-[20px] tracking-[0.1em] text-text/45 uppercase leading-[1.35]'>
              {l.kicker}
            </div>
            <div className='text-[34px] font-bold text-text tracking-[-0.03em] leading-[1.05]'>
              {l.frase}
            </div>
            <div className='text-[20px] text-text/55 leading-[1.4]'>{l.detalhe}</div>
          </motion.div>
        ))}
      </div>

      <motion.div {...up(0.75, easeIn)} className='flex flex-col items-center gap-4'>
        <div className='w-12 h-px bg-purple/30' />
        <div className='text-[22px] text-text/55 leading-[1.5] text-center max-w-[900px]'>
          Agora vamos olhar para os projetos de vocês e ver onde o Informs reduz
          desenvolvimento, padroniza o campo e acelera implantação.
        </div>
        <div className='text-[40px] font-bold text-purple tracking-[-0.03em] mt-2'>
          Perguntas?
        </div>
      </motion.div>
    </SlideShell>
  )
}
