import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Satellite, Bell, Database, LockKeyhole, Navigation } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, AppCard, AppButton, APP } from './ui'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: Satellite,
    titulo: 'Posição em tempo real via WebSocket',
    texto:
      'Durante o percurso o app transmite a localização, e quem acompanha a operação deixa de perguntar onde o verificador está.',
  },
  {
    Icon: Bell,
    titulo: 'GPS em segundo plano, à vista',
    texto:
      'No Android, uma notificação fixa avisa que o rastreamento está ativo enquanto a rota corre.',
  },
  {
    Icon: Database,
    titulo: 'Buffer quando o sinal cai',
    texto:
      'Os pontos ficam guardados no aparelho e são enviados assim que a conexão volta.',
  },
  {
    Icon: LockKeyhole,
    titulo: 'Só o papel INSPECTOR inicia',
    texto:
      'O percurso é uma permissão do perfil, não uma configuração de tela.',
  },
]

export default function Slide13Rastreio({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Rastreio de rota'
        title={
          <>
            A operação em campo <Accent>deixa de ser uma caixa preta.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[380px_1fr] gap-12 items-center'>
        <motion.div {...up(0.3, easeIn)} className='justify-self-center'>
          <AppScreen tab='map' width='w-[380px]'>
            {/* notificação fixa do Android */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.6 }}
            >
              <AppCard className='px-3 py-2.5 flex items-start gap-2.5'>
                <Navigation className='size-4 text-sky-500 shrink-0 mt-0.5' strokeWidth={2} />
                <div>
                  <div
                    className='text-[10px] font-semibold uppercase tracking-wide'
                    style={{ color: APP.muted }}
                  >
                    Notificação fixa · Android
                  </div>
                  <div className='text-[13px] text-[#09090b] leading-[1.25] mt-0.5'>
                    Rastreamento ativo
                  </div>
                </div>
              </AppCard>
            </motion.div>

            {/* overlay de navegação da rota */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.78 }}
              className='rounded-2xl bg-white border border-[#e4e4e7] p-4 flex flex-col gap-2.5'
              style={{ boxShadow: '0 4px 14px rgba(9,9,11,0.08)' }}
            >
              <div
                className='text-[10px] uppercase tracking-wide'
                style={{ color: APP.muted }}
              >
                Parada 2 de 5
              </div>
              <div className='text-[16px] font-bold text-[#09090b] leading-[1.15]'>
                Conferência de hidrômetro
              </div>
              <div className='text-[12px]' style={{ color: APP.muted }}>
                R. Vergueiro, 3185, São Paulo
              </div>
              <AppButton>
                <Navigation className='size-4' strokeWidth={2} />
                Abrir navegação
              </AppButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
              className='flex items-center justify-between px-1'
            >
              <span className='flex items-center gap-2'>
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className='w-2 h-2 rounded-full bg-green-500'
                />
                <span className='text-[11px] font-medium text-green-600'>
                  WebSocket conectado
                </span>
              </span>
              <span className='text-[11px]' style={{ color: APP.muted }}>
                1.284 pontos · 17 em buffer
              </span>
            </motion.div>
          </AppScreen>
        </motion.div>

        <div className='grid grid-cols-2 gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.42 + i * 0.1, easeIn)}
              className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3 h-full'
            >
              <p.Icon className='size-7 text-purple/55 shrink-0' strokeWidth={1.5} />
              <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                {p.titulo}
              </div>
              <div className='text-[16px] text-text/60 leading-[1.45]'>
                {p.texto}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
