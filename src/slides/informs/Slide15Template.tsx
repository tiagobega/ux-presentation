import { motion } from 'motion/react'
import { LayoutTemplate, ToggleRight, Plus, GripVertical } from 'lucide-react'
import type { SlideProps } from '../config'
import { SISTEMAS_ORIGEM } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, Chip, up, easeIn, easeOut } from '../kit'

const sessoes = [
  { nome: 'Identificação', campos: '4 campos · 1 informativo' },
  { nome: 'Estrutura', campos: '6 campos · 2 informativos' },
  { nome: 'Equipamento', campos: '3 campos', duplicavel: true },
  { nome: 'Conclusão', campos: '2 campos' },
]

const define = [
  { rotulo: 'Nome', valor: 'Vistoria de poste' },
  { rotulo: 'Sistema de origem', valor: 'GAIA' },
  { rotulo: 'Ativo', valor: 'Sim' },
]

export default function Slide15Template({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do sistema de origem · Criação de template'
        title={
          <>
            A regra de negócio vira formulário{' '}
            <Accent>sem release do app.</Accent>
          </>
        }
        lead='Um template define nome, Sistema de Origem, se está ativo, e as sessões e campos que o compõem.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[380px_1fr] gap-10 items-center'>
        <div className='flex flex-col gap-4'>
          <motion.div
            {...up(0.3, easeIn)}
            className='border border-purple/25 bg-purple/[0.05] p-7 flex flex-col gap-4'
          >
            <LayoutTemplate className='size-8 text-purple/60' strokeWidth={1.5} />
            {define.map((d, i) => (
              <motion.div
                key={d.rotulo}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: easeOut, delay: 0.5 + i * 0.1 }}
              >
                <div className='font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase'>
                  {d.rotulo}
                </div>
                <div className='text-[21px] font-bold text-text tracking-[-0.02em] leading-[1.15] mt-0.5'>
                  {d.valor}
                </div>
              </motion.div>
            ))}
            <div className='flex flex-wrap gap-2 pt-1'>
              {SISTEMAS_ORIGEM.map((s) => (
                <Chip key={s} tone={s === 'GAIA' ? 'purple' : 'muted'}>
                  {s}
                </Chip>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...up(0.62, easeIn)}
            className='border border-text/10 bg-black/2 px-6 py-4 flex items-center gap-3.5'
          >
            <ToggleRight className='size-6 text-purple/55 shrink-0' strokeWidth={1.6} />
            <span className='text-[16px] text-text/60 leading-[1.4]'>
              Template inativo sai da lista do campo sem apagar o histórico.
            </span>
          </motion.div>
        </div>

        <motion.div {...up(0.42, easeIn)} className='border border-text/10 bg-white/50'>
          <div className='px-7 py-4 border-b border-text/8 flex items-center justify-between'>
            <span className='text-[18px] font-bold text-text tracking-[-0.02em]'>
              Sessões do template
            </span>
            <span className='flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-purple/60 uppercase border border-purple/25 px-2.5 py-1'>
              <Plus className='size-3.5' strokeWidth={2.5} />
              Nova sessão
            </span>
          </div>

          {sessoes.map((s, i) => (
            <motion.div
              key={s.nome}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.7 + i * 0.11 }}
              className='px-7 py-4 border-b border-text/[0.06] last:border-0 flex items-center gap-5'
            >
              <GripVertical className='size-5 text-text/20 shrink-0' strokeWidth={1.8} />
              <div className='flex-1'>
                <div className='text-[19px] font-bold text-text/85 tracking-[-0.02em] leading-[1.2]'>
                  {s.nome}
                </div>
                <div className='font-mono text-[11px] tracking-[0.08em] text-purple/45 mt-1'>
                  {s.campos}
                </div>
              </div>
              {s.duplicavel && <Chip>duplicável</Chip>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideShell>
  )
}
