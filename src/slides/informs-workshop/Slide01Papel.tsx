import { motion } from 'motion/react'
import { Boxes, Server, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn, easeOut } from './kit'

const atores = [
  {
    Icon: Boxes,
    nome: 'Sistema de origem',
    sub: 'GAIA · Porto Alegre · Recife · SABESP',
  },
  { Icon: Server, nome: 'Informs', sub: 'Template → Formulário' },
  { Icon: Smartphone, nome: 'Campo', sub: 'app instalado no bolso' },
]

/** O contrato de ida e volta: input desce para o campo, output volta. */
const contrato = [
  {
    rotulo: 'Input',
    Seta: ArrowRight,
    itens: ['demanda', 'template', 'localização', 'prioridade', 'prazo', 'responsável'],
    borda: 'border-purple/25',
    fundo: 'bg-purple/[0.05]',
    cor: 'text-purple/70',
    chip: 'border-purple/25 bg-white/60 text-purple/85',
  },
  {
    rotulo: 'Output',
    Seta: ArrowLeft,
    itens: ['respostas', 'fotos', 'horários', 'autoria', 'status'],
    borda: 'border-text/12',
    fundo: 'bg-black/[0.02]',
    cor: 'text-text/45',
    chip: 'border-text/12 bg-white/60 text-text/65',
  },
]

const colunas = [
  {
    titulo: 'O sistema de origem decide o quê',
    itens: [
      'Cria a demanda e sabe por que ela existe',
      'Define o template e os campos que precisa',
      'Recebe o resultado de volta',
      'Continua dono da regra de negócio',
    ],
  },
  {
    titulo: 'O Informs resolve o como',
    itens: [
      'Entrega a atividade para quem está na rua',
      'Coleta respostas, fotos e localização',
      'Funciona com a internet caindo',
      'Devolve o preenchido com horário e autoria',
    ],
  },
]

export default function Slide01Papel({ action }: SlideProps) {
  const detalhe = action !== 'O modelo'

  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='O papel do Informs'
        title={
          <>
            O sistema de origem decide o quê.{' '}
            <Accent>O Informs resolve o como.</Accent>
          </>
        }
      />

      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-3 gap-6'>
          {atores.map((a, i) => (
            <motion.div
              key={a.nome}
              {...up(0.26 + i * 0.1, easeIn)}
              className={`px-7 py-5 flex items-center gap-4 ${
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
                <div className='text-[26px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
                  {a.nome}
                </div>
                <div className='font-mono text-[20px] tracking-[0.1em] text-purple/50 uppercase mt-1'>
                  {a.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* O contrato, em duas faixas: o que desce e o que volta. */}
        <div className='flex flex-col gap-3'>
          {contrato.map((c, i) => (
            <motion.div
              key={c.rotulo}
              {...up(0.62 + i * 0.12, easeIn)}
              className={`px-6 py-4 flex items-center gap-5 border ${c.borda} ${c.fundo}`}
            >
              <span
                className={`font-mono text-[20px] tracking-[0.14em] uppercase shrink-0 w-[110px] ${c.cor}`}
              >
                {c.rotulo}
              </span>
              <c.Seta className={`size-7 shrink-0 ${c.cor}`} strokeWidth={2} />
              <div className='flex flex-wrap gap-2.5'>
                {c.itens.map((item) => (
                  <span
                    key={item}
                    className={`text-[20px] leading-none px-3.5 py-2 border ${c.chip}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-2 gap-6 w-full'>
          {colunas.map((c, i) => (
            <motion.div
              key={c.titulo}
              initial={false}
              animate={{ opacity: detalhe ? 1 : 0, y: detalhe ? 0 : 12 }}
              transition={{ duration: 0.45, ease: easeIn, delay: detalhe ? i * 0.12 : 0 }}
              className='border border-text/10 bg-black/[0.02] p-7 flex flex-col gap-4'
            >
              <div className='text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.1]'>
                {c.titulo}
              </div>
              {c.itens.map((item, j) => (
                <motion.div
                  key={item}
                  initial={false}
                  animate={{ opacity: detalhe ? 1 : 0, x: detalhe ? 0 : 8 }}
                  transition={{
                    duration: 0.35,
                    ease: easeOut,
                    delay: detalhe ? 0.2 + i * 0.12 + j * 0.07 : 0,
                  }}
                  className='flex items-start gap-3'
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-purple/45 shrink-0 mt-2.5' />
                  <span className='text-[20px] text-text/70 leading-[1.4]'>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <Punch delay={0.95}>
        O Informs não substitui o sistema do projeto. Ele resolve a operação de campo.
      </Punch>
    </SlideShell>
  )
}
