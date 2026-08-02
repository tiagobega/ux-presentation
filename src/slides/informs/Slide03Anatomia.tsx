import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUp, FileText, LayoutTemplate, SquareStack, Type, Eye, Boxes, Ban } from 'lucide-react'
import type { SlideProps } from '../config'
import { SISTEMAS_ORIGEM } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, Chip, easeIn, easeOut, up } from '../kit'

const STEP2 = 'Template → Formulário'

/** Elo entre duas camadas: a seta e o verbo que liga uma à outra. */
function Elo({ verbo, shown, delay }: { verbo: string; shown: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.3, ease: easeOut, delay }}
      className='flex items-center justify-center gap-3 py-1'
    >
      <ArrowUp className='size-4 text-purple/45' strokeWidth={2} />
      <span className='font-mono text-[11px] tracking-[0.14em] text-purple/45 uppercase'>
        {verbo}
      </span>
    </motion.div>
  )
}

function Camada({
  Icon,
  nome,
  papel,
  detalhe,
  width,
  shown,
  delay,
  forte,
}: {
  Icon: LucideIcon
  nome: string
  papel: string
  detalhe: string
  width: string
  shown: boolean
  delay: number
  forte?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 16 }}
      transition={{ duration: 0.45, ease: easeOut, delay }}
      className={`mx-auto px-8 py-3.5 flex items-center gap-6 ${width} ${
        forte
          ? 'border border-purple/30 bg-purple/[0.07]'
          : 'border border-purple/15 bg-purple/[0.03]'
      }`}
    >
      <Icon className='size-8 text-purple/60 shrink-0' strokeWidth={1.5} />
      <div className='flex-1'>
        <div className='text-[23px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
          {nome}
        </div>
        <div className='text-[15px] text-text/55 leading-[1.4] mt-0.5'>
          {detalhe}
        </div>
      </div>
      <div className='font-mono text-[11px] tracking-[0.14em] text-purple/50 uppercase text-right shrink-0'>
        {papel}
      </div>
    </motion.div>
  )
}

export default function Slide03Anatomia({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-5'>
      <SlideHeader
        eyebrow='Anatomia de um formulário'
        title={
          <>
            De baixo para cima: <Accent>campo, sessão, template, formulário.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center'>
        <Camada
          Icon={FileText}
          nome='Formulário'
          papel='instância no campo'
          detalhe='Localização, prioridade, prazo de expiração e verificador atribuído.'
          width='w-[46%]'
          shown={phase === 1}
          delay={0.3}
          forte
        />
        <Elo verbo='instancia' shown={phase === 1} delay={0.2} />
        <Camada
          Icon={LayoutTemplate}
          nome='Template'
          papel='molde do sistema de origem'
          detalhe='Formulário preparado uma vez e reutilizado em toda demanda igual.'
          width='w-[62%]'
          shown={phase === 1}
          delay={0.1}
        />
        <Elo verbo='é composto por' shown={phase === 1} delay={0.05} />

        <Camada
          Icon={SquareStack}
          nome='Sessões'
          papel='grupos de campos'
          detalhe='Podem ser duplicáveis, com N instâncias independentes na mesma vistoria.'
          width='w-[80%]'
          shown
          delay={0.55}
        />
        <Elo verbo='agrupam' shown delay={0.5} />

        <div className='grid grid-cols-2 gap-4'>
          <motion.div
            {...up(0.32, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] px-8 py-3.5 flex items-center gap-6'
          >
            <Type className='size-8 text-purple/60 shrink-0' strokeWidth={1.5} />
            <div className='flex-1'>
              <div className='text-[23px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
                Campos
              </div>
              <div className='text-[15px] text-text/55 leading-[1.4] mt-0.5'>
                A menor unidade de coleta.
              </div>
            </div>
            <div className='font-mono text-[11px] tracking-[0.14em] text-purple/50 uppercase shrink-0'>
              10 tipos
            </div>
          </motion.div>

          <motion.div
            {...up(0.4, easeIn)}
            className='border border-text/12 bg-black/[0.02] px-8 py-3.5 flex items-center gap-6'
          >
            <Eye className='size-8 text-text/40 shrink-0' strokeWidth={1.5} />
            <div className='flex-1'>
              <div className='text-[23px] font-bold text-text/75 tracking-[-0.025em] leading-[1.1]'>
                Campos informativos
              </div>
              <div className='text-[15px] text-text/50 leading-[1.4] mt-0.5'>
                Conteúdo de leitura que orienta quem preenche.
              </div>
            </div>
            <div className='font-mono text-[11px] tracking-[0.14em] text-text/40 uppercase shrink-0'>
              4 tipos
            </div>
          </motion.div>
        </div>
      </div>

      {/* os dois termos que ficam de fora da pirâmide */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 14 }}
        transition={{ duration: 0.45, ease: easeIn, delay: 0.45 }}
        className='grid grid-cols-2 gap-4 shrink-0'
      >
        <div className='border border-purple/25 bg-purple/[0.05] px-7 py-4 flex items-start gap-5'>
          <Boxes className='size-7 text-purple/60 shrink-0 mt-0.5' strokeWidth={1.6} />
          <div className='flex-1'>
            <div className='text-[19px] font-bold text-text tracking-[-0.02em] leading-[1.15]'>
              Sistema de Origem
            </div>
            <div className='text-[15px] text-text/55 leading-[1.4] mt-0.5'>
              Relaciona o template com o moto-verificador e habilita o
              preenchimento.
            </div>
            <div className='flex flex-wrap gap-2 mt-2.5'>
              {SISTEMAS_ORIGEM.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className='border border-purple/25 bg-purple/[0.05] px-7 py-4 flex items-center gap-5'>
          <Ban className='size-7 text-purple/60 shrink-0' strokeWidth={1.6} />
          <div className='flex-1'>
            <div className='text-[19px] font-bold text-text tracking-[-0.02em] leading-[1.15]'>
              Justificativa
            </div>
            <div className='text-[15px] text-text/55 leading-[1.4] mt-0.5'>
              Motivo estruturado exigido no cancelamento, com texto e foto
              quando o motivo pedir.
            </div>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  )
}
