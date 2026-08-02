import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { LayoutList, MapPin, ListFilter, Search, Plus } from 'lucide-react'
import type { SlideProps } from '../config'
import { STATUS_FORM, PRIORIDADES } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, FormCard, StatusTab, APP } from './ui'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: LayoutList,
    titulo: 'Uma aba por status',
    texto:
      'O app conta quantos formulários há em cada estado, mais uma aba Todos com o total.',
  },
  {
    Icon: MapPin,
    titulo: 'Visão em mapa',
    texto:
      'Os formulários plotados por localização. O verificador vê na hora o que está perto dele.',
  },
  {
    Icon: ListFilter,
    titulo: 'Visão em lista',
    texto:
      'A mesma informação com busca, filtro por sistema e data, prioridade e prazo à vista.',
  },
]

const cards = [
  {
    status: 'PENDING' as const,
    titulo: 'Vistoria de poste',
    endereco: 'R. Domingos de Morais, 2187, Vila Mariana',
    sistema: 'GAIA',
    prioridade: { label: 'Alta Prioridade', cor: 'text-orange-400' },
    data: '02/08/2026',
  },
  {
    status: 'COMPLETED_NOT_SENT' as const,
    titulo: 'Conferência de hidrômetro',
    endereco: 'R. Vergueiro, 3185, Vila Mariana',
    sistema: 'SABESP',
    prioridade: { label: 'Média Prioridade', cor: 'text-blue-400' },
    data: '02/08/2026',
  },
]

export default function Slide06Listagem({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Listagem'
        title={
          <>
            A tela principal <Accent>é a fila do dia.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_400px] gap-12 items-center'>
        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.28 + i * 0.1, easeIn)}
              className='border-l-2 border-purple/40 bg-purple/[0.04] px-6 py-5'
            >
              <div className='flex items-center gap-3.5'>
                <p.Icon
                  className='size-6 text-purple/55 shrink-0'
                  strokeWidth={1.6}
                />
                <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                  {p.titulo}
                </div>
              </div>
              <div className='text-[16px] text-text/55 leading-[1.5] mt-2'>
                {p.texto}
              </div>
            </motion.div>
          ))}

          <motion.div
            {...up(0.62, easeIn)}
            className='border border-text/10 bg-black/2 px-6 py-4 flex items-center gap-8'
          >
            <div className='font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase shrink-0'>
              Prioridades
            </div>
            <div className='flex items-center gap-8 flex-1'>
              {PRIORIDADES.map((p) => (
                <span
                  key={p.nome}
                  className='text-[17px] font-semibold text-text/70 tracking-[-0.01em] flex items-center gap-2'
                >
                  <span className={`w-2 h-2 rounded-full bg-current ${p.cor}`} />
                  {p.nome}
                  <span className='font-mono text-[12px] text-text/35'>
                    {p.valor}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...up(0.4, easeIn)} className='justify-self-center'>
          <AppScreen tab='forms' width='w-[380px]'>
            {/* busca e ações, como na tela de formulários */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.65 }}
              className='flex items-center gap-2'
            >
              <div className='flex-1 bg-white rounded-md h-9 px-3 flex items-center gap-2 border border-[#e4e4e7]'>
                <Search className='size-4' style={{ color: APP.muted }} strokeWidth={2} />
                <span className='text-[12px]' style={{ color: APP.muted }}>
                  Buscar formulário
                </span>
              </div>
              <div className='bg-white rounded-md h-9 w-9 flex items-center justify-center border border-[#e4e4e7]'>
                <ListFilter className='size-4' style={{ color: APP.muted }} strokeWidth={2} />
              </div>
              <div className='rounded-md h-9 w-9 flex items-center justify-center' style={{ background: APP.primary }}>
                <Plus className='size-4 text-white' strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* abas de status com contador */}
            <div className='flex gap-2 -mx-4 px-4 overflow-hidden'>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOut, delay: 0.78 }}
                className='rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-[#e4e4e7] bg-sky-500 whitespace-nowrap shrink-0'
              >
                <span className='text-[11px] font-medium text-white'>Todos</span>
                <span className='rounded-full px-1.5 text-[10px] font-bold bg-white/30 text-white'>
                  68
                </span>
              </motion.span>

              {STATUS_FORM.map((s, i) => (
                <motion.span
                  key={s.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOut, delay: 0.85 + i * 0.07 }}
                >
                  <StatusTab status={s.key} count={s.qtd} />
                </motion.span>
              ))}
            </div>

            {cards.map((c, i) => (
              <motion.div
                key={c.titulo}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 1.2 + i * 0.14 }}
              >
                <FormCard {...c} />
              </motion.div>
            ))}
          </AppScreen>
        </motion.div>
      </div>
    </SlideShell>
  )
}
