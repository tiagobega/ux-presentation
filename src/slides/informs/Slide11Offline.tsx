import { motion } from 'motion/react'
import { CloudAlert, Wifi, CloudUpload, ArrowRight, HardDrive } from 'lucide-react'
import type { SlideProps } from '../config'
import { FILA_OFFLINE } from '../../data/informs'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, FormCard, StatusTab } from './ui'

const STEP2 = 'Sincronização'

const retomada = [
  {
    Icon: Wifi,
    titulo: 'Detecção de rede multicamada',
    texto: 'O app não confia num único sinal para decidir que a conexão voltou.',
  },
  {
    Icon: ArrowRight,
    titulo: 'A fila processa em ordem',
    texto: 'Na sequência em que as ações aconteceram, sem ninguém apertar nada.',
  },
  {
    Icon: CloudUpload,
    titulo: 'As fotos sobem para o S3',
    texto: 'Ficaram em cache local durante a vistoria e viajam na sincronização.',
  },
]

export default function Slide11Offline({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Offline-first'
        title={
          <>
            O app assume <Accent>que a internet vai faltar.</Accent>
          </>
        }
        lead='Iniciar, responder, enviar e cancelar funcionam sem sinal. As ações entram numa fila persistida no aparelho.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[380px_1fr] gap-12 items-center'>
        <motion.div {...up(0.3, easeIn)} className='justify-self-center'>
          <AppScreen offline tab='forms' width='w-[380px]'>
            {/* banner de offline, como no app */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.6 }}
              className='bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-start gap-2.5'
            >
              <CloudAlert className='size-5 text-orange-500 shrink-0' strokeWidth={1.8} />
              <div>
                <div className='text-orange-600 font-semibold text-[13px] mb-0.5'>
                  Você está Offline
                </div>
                <div className='text-orange-600/80 text-[11px] leading-[1.35]'>
                  Não se preocupe, você pode continuar utilizando a aplicação. O
                  seu progresso é salvo e você não perderá nenhuma informação.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.78 }}
              className='flex gap-2 -mx-4 px-4 overflow-hidden'
            >
              <StatusTab status='COMPLETED_NOT_SENT' count={2} active />
              <StatusTab status='IN_PROGRESS' count={3} />
              <StatusTab status='PENDING' count={12} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.92 }}
            >
              <FormCard
                status='COMPLETED_NOT_SENT'
                titulo='Vistoria de poste'
                endereco='R. Domingos de Morais, 2187'
                sistema='GAIA'
                prioridade={{ label: 'Alta Prioridade', cor: 'text-orange-400' }}
                data='02/08/2026'
              />
            </motion.div>
          </AppScreen>
        </motion.div>

        <div className='flex flex-col gap-5'>
          <div>
            <motion.div
              {...up(0.34, easeIn)}
              className='flex items-center gap-3 mb-3'
            >
              <HardDrive className='size-4 text-purple/55' strokeWidth={1.8} />
              <span className='font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase'>
                Fila de mutations persistida em disco
              </span>
              <div className='h-px flex-1 bg-text/10' />
            </motion.div>

            <div className='grid grid-cols-2 gap-4'>
              {FILA_OFFLINE.map((f, i) => (
                <motion.div
                  key={f.nome}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.42 + i * 0.11 }}
                  className='border border-purple/20 bg-purple/[0.04] p-5 flex items-start gap-4'
                >
                  <f.Icon className='size-7 text-purple/55 shrink-0' strokeWidth={1.5} />
                  <div>
                    <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
                      {f.nome}
                    </div>
                    <div className='text-[15px] text-text/55 leading-[1.4] mt-1'>
                      {f.detalhe}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* o que acontece quando a conexão volta */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 18 }}
            transition={{ duration: 0.5, ease: easeIn }}
            className='border border-purple/30 bg-purple/[0.06] px-7 py-5 flex flex-col gap-4'
          >
            <div className='flex items-center gap-4'>
              <span className='font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase'>
                Quando a conexão volta
              </span>
              <div className='h-px flex-1 bg-purple/15' />
              <span className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]'>
                <span className='text-orange-500'>Não enviado</span>
                <ArrowRight className='size-4 text-purple/50' strokeWidth={2} />
                <span className='text-green-500'>Completo</span>
              </span>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              {retomada.map((r, i) => (
                <motion.div
                  key={r.titulo}
                  animate={{
                    opacity: phase === 1 ? 1 : 0,
                    x: phase === 1 ? 0 : 12,
                  }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.2 + i * 0.12 }}
                  className='flex items-start gap-3'
                >
                  <r.Icon
                    className='size-6 text-purple/55 shrink-0 mt-0.5'
                    strokeWidth={1.6}
                  />
                  <div>
                    <div className='text-[17px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                      {r.titulo}
                    </div>
                    <div className='text-[14px] text-text/55 leading-[1.4] mt-1'>
                      {r.texto}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  )
}
