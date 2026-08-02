import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { KeyRound, AppWindow, IdCard } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, AppButton, InformsLogo, APP } from './ui'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: KeyRound,
    titulo: 'Identidade via Gates',
    texto:
      'Cognito com fluxo PKCE. A sessão se renova sozinha, sem novo login no meio da rota.',
  },
  {
    Icon: AppWindow,
    titulo: 'WebView embutida',
    texto:
      'A tela de senha abre dentro do próprio app. O verificador não é jogado para o navegador do sistema e depois de volta.',
  },
  {
    Icon: IdCard,
    titulo: 'Perfil carregado no login',
    texto:
      'Nome, e-mail, papel e placa do veículo chegam logo após autenticar. O papel define o que o app libera.',
  },
]

export default function Slide05Autenticacao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do app · Autenticação'
        title={
          <>
            Login <Accent>sem sair do app.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[400px_1fr] gap-12 items-center'>
        <motion.div {...up(0.3, easeIn)} className='justify-self-center'>
          <AppScreen bare width='w-[360px]'>
            {/* topo da tela de login: a arte de fundo do app */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className='-mx-4 -mt-3 h-[240px]'
              style={{
                background: `linear-gradient(160deg, ${APP.primary} 0%, #0284c7 55%, #0f172a 100%)`,
              }}
            />

            <div className='bg-white -mx-4 -mb-3 px-6 pt-8 pb-10 flex flex-col items-center gap-7'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.72 }}
              >
                <InformsLogo height={24} sobre='claro' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.88 }}
                className='w-full'
              >
                <AppButton>Entrar com Gates</AppButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.05 }}
                className='text-[11px] text-[#71717a] text-center leading-[1.4]'
              >
                A senha é digitada na WebView do Gates,
                <br />
                dentro do próprio aplicativo.
              </motion.div>
            </div>
          </AppScreen>
        </motion.div>

        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.42 + i * 0.12, easeIn)}
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
      </div>
    </SlideShell>
  )
}
