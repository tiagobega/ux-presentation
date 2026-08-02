import { motion } from 'motion/react'
import { KeyRound, Plug, Square, MessageSquare, ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'

const frentes = [
  {
    Icon: KeyRound,
    titulo: 'Integração com o Gates',
    resumo: 'Identidade e autenticação dos verificadores.',
    itens: [
      'Cadastrar a aplicação e o fluxo PKCE',
      'Mapear os papéis, incluindo quem é INSPECTOR',
      'Provisionar os usuários do sistema de origem',
    ],
  },
  {
    Icon: Plug,
    titulo: 'Integração com o Informs',
    resumo: 'O contrato de dados entre o sistema de origem e a plataforma.',
    itens: [
      'Criação das APIs e contratos de template',
      'Geração de formulários pela API',
      'Consumo dos resultados preenchidos',
    ],
  },
]

export default function Slide18Implantacao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Implantação'
        title={
          <>
            Duas frentes <Accent>para colocar o Informs em pé.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-2 gap-6 items-center'>
        {frentes.map((f, i) => (
          <motion.div
            key={f.titulo}
            {...up(0.3 + i * 0.14, easeIn)}
            className='border border-purple/20 bg-purple/[0.04] p-9 flex flex-col gap-5 h-full justify-center'
          >
            <div className='flex items-center justify-between'>
              <f.Icon className='size-9 text-purple/60' strokeWidth={1.5} />
              <span className='font-mono text-[12px] tracking-[0.12em] text-purple/40'>
                0{i + 1}
              </span>
            </div>
            <div>
              <div className='text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.05]'>
                {f.titulo}
              </div>
              <div className='text-[17px] text-text/55 leading-[1.45] mt-2'>
                {f.resumo}
              </div>
            </div>
            <div className='flex flex-col gap-3 mt-1'>
              {f.itens.map((item, j) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: easeOut,
                    delay: 0.6 + i * 0.14 + j * 0.1,
                  }}
                  className='flex items-start gap-3'
                >
                  <Square
                    className='size-5 text-purple/40 shrink-0 mt-1'
                    strokeWidth={1.8}
                  />
                  <span className='text-[18px] text-text/70 leading-[1.4]'>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...up(1.05, easeIn)}
        className='border border-purple/30 bg-purple/[0.07] px-9 py-6 flex items-center gap-6'
      >
        <MessageSquare className='size-8 text-purple/65 shrink-0' strokeWidth={1.6} />
        <div>
          <div className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase mb-1'>
            Próxima conversa
          </div>
          <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.25] flex items-center gap-3'>
            O desenho das APIs e o cronograma
            <ArrowRight className='size-6 text-purple/60 shrink-0' strokeWidth={2} />
            <span className='text-purple'>Godoy.</span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  )
}
