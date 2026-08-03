import { motion } from 'motion/react'
import { Boxes, Server, Smartphone, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn } from '../kit'

const atores = [
  { Icon: Boxes, nome: 'Sistema de origem', sub: 'GAIA · Porto Alegre · Recife · SABESP' },
  { Icon: Server, nome: 'Informs', sub: 'Template → Formulário' },
  { Icon: Smartphone, nome: 'Moto-verificador', sub: 'app de campo' },
]

const fluxos = [
  { texto: 'Publica o template e gera o formulário' },
  { texto: 'Entrega a demanda pro campo, mesmo offline' },
  { texto: 'Devolve o formulário preenchido' },
]

export default function Slide02Arquitetura({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Arquitetura'
        title={<>Um fluxo só, <Accent>de ponta a ponta.</Accent></>}
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-12'>
        <div className='grid grid-cols-3 gap-6'>
          {atores.map((a, i) => (
            <motion.div
              key={a.nome}
              {...up(0.26 + i * 0.1, easeIn)}
              className={`px-7 py-6 flex items-center gap-4 ${
                i === 1
                  ? 'border border-purple/30 bg-purple/[0.07]'
                  : 'border border-text/12 bg-black/[0.02]'
              }`}
            >
              <a.Icon
                className={`size-9 shrink-0 ${i === 1 ? 'text-purple/65' : 'text-purple/45'}`}
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[23px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
                  {a.nome}
                </div>
                <div className='font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase mt-0.5'>
                  {a.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='grid grid-cols-3 gap-6 px-2'>
          {fluxos.map((f, i) => (
            <motion.div
              key={f.texto}
              {...up(0.65 + i * 0.14, easeIn)}
              className='flex items-center gap-3 pt-3'
            >
              <ArrowRight className='size-5 text-purple/50 shrink-0' strokeWidth={2} />
              <span className='font-mono text-[12px] tracking-[0.08em] text-purple/70 uppercase leading-[1.3]'>
                {f.texto}
              </span>
            </motion.div>
          ))}
        </div>

        <Punch delay={1.1}>
          O sistema de origem decide o quê. O Informs cuida do como chegar ao campo.
        </Punch>
      </div>
    </SlideShell>
  )
}
