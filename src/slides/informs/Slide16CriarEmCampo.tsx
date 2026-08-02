import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { LayoutTemplate, MapPin, Zap, Check } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, AppCard, AppButton, APP } from './ui'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: LayoutTemplate,
    titulo: 'Escolhe um template existente',
    texto:
      'A lista de moldes ativos do sistema de origem já está no aparelho.',
  },
  {
    Icon: MapPin,
    titulo: 'Informa endereço e localização',
    texto:
      'O ponto vem do GPS ou de um toque no mapa. O formulário nasce georreferenciado.',
  },
  {
    Icon: Zap,
    titulo: 'Cria o formulário ali mesmo',
    texto:
      'Serve para a demanda que apareceu na hora: um ponto extra na esquina, um caso que ninguém previu.',
  },
]

const templates = [
  { nome: 'Vistoria de poste', sistema: 'GAIA' },
  { nome: 'Conferência de hidrômetro', sistema: 'SABESP' },
  { nome: 'Levantamento de fachada', sistema: 'Recife' },
]

export default function Slide16CriarEmCampo({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Criação de formulário · Em campo'
        title={
          <>
            Nem toda demanda nasce <Accent>no sistema de origem.</Accent>
          </>
        }
        lead='Em campo, o verificador pega um template existente e gera o formulário no local.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_400px] gap-12 items-center'>
        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.3 + i * 0.12, easeIn)}
              className='border border-purple/15 bg-purple/[0.03] p-7 flex items-start gap-5'
            >
              <p.Icon
                className='size-8 text-purple/55 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                  {p.titulo}
                </div>
                <div className='text-[17px] text-text/60 leading-[1.5] mt-2'>
                  {p.texto}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...up(0.4, easeIn)} className='justify-self-center'>
          <AppScreen tab='create' width='w-[380px]'>
            <div
              className='text-[11px] font-semibold uppercase tracking-wide'
              style={{ color: APP.muted }}
            >
              Escolha o template
            </div>

            {templates.map((t, i) => (
              <motion.div
                key={t.nome}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.7 + i * 0.1 }}
              >
                <AppCard
                  className={`px-3 py-2.5 flex items-center justify-between gap-3 ${
                    i === 0 ? 'border-2 border-sky-500' : ''
                  }`}
                >
                  <div>
                    <div className='text-[14px] font-semibold text-[#09090b] leading-[1.2]'>
                      {t.nome}
                    </div>
                    <div className='text-[11px] mt-0.5' style={{ color: APP.muted }}>
                      {t.sistema}
                    </div>
                  </div>
                  {i === 0 && (
                    <Check className='size-4 text-sky-500 shrink-0' strokeWidth={2.5} />
                  )}
                </AppCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 1.05 }}
            >
              <AppCard className='px-3 py-2.5 flex items-center gap-3'>
                <MapPin className='size-4 text-sky-500 shrink-0' strokeWidth={2} />
                <div>
                  <div className='text-[13px] text-[#09090b] leading-[1.2]'>
                    R. Silva Bueno, 940
                  </div>
                  <div className='text-[11px] mt-0.5' style={{ color: APP.muted }}>
                    -23.5936, -46.6013
                  </div>
                </div>
              </AppCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 1.2 }}
            >
              <AppButton>Criar formulário</AppButton>
            </motion.div>
          </AppScreen>
        </motion.div>
      </div>
    </SlideShell>
  )
}
