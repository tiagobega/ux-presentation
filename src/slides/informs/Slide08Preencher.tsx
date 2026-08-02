import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { SquareStack, ShieldCheck, Save, Eye, CircleAlert, Camera } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { AppScreen, AppCard, AppButton, APP } from './ui'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: SquareStack,
    titulo: 'Sessão por sessão',
    texto:
      'O verificador avança em etapas, não numa lista infinita. Cada sessão é um assunto.',
  },
  {
    Icon: ShieldCheck,
    titulo: 'Validação na hora',
    texto:
      'Obrigatoriedade, tamanho de texto, faixa numérica e quantidade de fotos. O react-hook-form devolve o erro no campo, não no envio.',
  },
  {
    Icon: Save,
    titulo: 'Autosave do rascunho',
    texto:
      'Tudo o que se digita é salvo no aparelho com debounce. Fechou o app ou acabou a bateria, nada se perde.',
  },
  {
    Icon: Eye,
    titulo: 'Campos informativos orientam',
    texto:
      'Texto, imagem, mapa e URL aparecem no meio do formulário, no ponto em que a dúvida aparece.',
  },
]

export default function Slide08Preencher({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo do app · Preenchimento'
        title={
          <>
            Rascunho local, <Accent>validado campo a campo.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_400px] gap-12 items-center'>
        <div className='grid grid-cols-2 gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.28 + i * 0.1, easeIn)}
              className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3 h-full'
            >
              <p.Icon
                className='size-7 text-purple/55 shrink-0'
                strokeWidth={1.5}
              />
              <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                {p.titulo}
              </div>
              <div className='text-[16px] text-text/60 leading-[1.45]'>
                {p.texto}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...up(0.42, easeIn)} className='justify-self-center'>
          <AppScreen voltar width='w-[380px]'>
            {/* cabeçalho de etapa, como no fill-form */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.68 }}
            >
              <AppCard className='p-3'>
                <div className='text-[14px] font-semibold text-[#09090b]'>
                  Vistoria de poste
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <span className='text-[12px] font-medium text-[#09090b]'>Etapa</span>
                  <span className='text-[12px]' style={{ color: APP.muted }}>
                    2/4
                  </span>
                </div>
                <div className='h-1 bg-gray-200 rounded-full mt-2'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.85 }}
                    className='h-full bg-sky-500 rounded-full'
                  />
                </div>
              </AppCard>
            </motion.div>

            {/* campo informativo */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.9 }}
              className='flex items-start gap-2.5 px-1'
            >
              <Eye className='size-4 text-sky-500 shrink-0 mt-0.5' strokeWidth={1.8} />
              <span className='text-[12px] leading-[1.4]' style={{ color: APP.muted }}>
                Fotografe a base do poste com a numeração visível.
              </span>
            </motion.div>

            {/* campo com erro de validação */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 1.02 }}
            >
              <div className='text-[13px] font-medium text-[#09090b] mb-1'>
                Altura em metros <span className='text-red-500'>*</span>
              </div>
              <div className='text-[11px] mb-1.5' style={{ color: '#a1a1aa' }}>
                Obrigatório. Valor entre 6 e 15.
              </div>
              <div className='h-9 rounded-md bg-white border-2 border-red-500' />
              <div className='flex items-start gap-1.5 mt-1.5'>
                <CircleAlert className='size-3.5 text-red-500 shrink-0 mt-px' strokeWidth={2} />
                <span className='text-[11px] text-red-500 leading-[1.3]'>
                  Informe um valor entre 6 e 15
                </span>
              </div>
            </motion.div>

            {/* campo de arquivo */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 1.14 }}
            >
              <div className='text-[13px] font-medium text-[#09090b] mb-1.5'>
                Fotos <span className='text-red-500'>*</span>
              </div>
              <div className='rounded-md border border-dashed border-sky-500/50 bg-sky-500/[0.05] py-3 flex items-center justify-center gap-2'>
                <Camera className='size-4 text-sky-500' strokeWidth={1.8} />
                <span className='text-[12px] text-sky-600 font-medium'>
                  2 de 2 fotos em cache
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className='flex gap-2'
            >
              <div className='flex-1'>
                <AppButton tone='outline'>Voltar</AppButton>
              </div>
              <div className='flex-1'>
                <AppButton>Próxima etapa</AppButton>
              </div>
            </motion.div>
          </AppScreen>
        </motion.div>
      </div>
    </SlideShell>
  )
}
