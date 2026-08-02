import { motion } from 'motion/react'
import { Lock, Eye as EyeIcon } from 'lucide-react'
import type { SlideProps } from '../config'
import { PERFIS } from '../../data/fleets'
import { SlideShell, SlideHeader, Accent, up, easeIn } from './kit'

const STEP2 = 'LGPD'

export default function Slide03Perfis({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Perfis de usuário · CASL'
        title={
          <>
            Cinco perfis, <Accent>permissões declarativas.</Accent>
          </>
        }
        lead='As regras do front espelham as do backend. Delete é privilégio de MANAGER e ADMIN; instalar e desinstalar são poderes do OPERATOR.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-2'>
        {/* cabeçalho da tabela */}
        <motion.div
          {...up(0.24, easeIn)}
          className='grid grid-cols-[300px_1fr_260px] gap-6 px-6 pb-2 font-mono text-[11px] tracking-[0.16em] text-purple/45 uppercase'
        >
          <div>Perfil</div>
          <div>Faz o quê</div>
          <motion.div
            animate={{ opacity: phase === 1 ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
          >
            Dados sensíveis · LGPD
          </motion.div>
        </motion.div>

        {PERFIS.map((p, i) => (
          <motion.div
            key={p.key}
            {...up(0.3 + i * 0.08, easeIn)}
            className='grid grid-cols-[300px_1fr_260px] gap-6 items-center border border-text/10 bg-black/2 px-6 py-4'
          >
            <div className='flex items-center gap-3'>
              <p.Icon
                className='size-7 text-purple/55 flex-shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[21px] font-bold text-text tracking-[-0.02em] leading-[1.1]'>
                  {p.key}
                </div>
                <div className='text-[14px] text-text/45 leading-[1.3]'>
                  {p.papel}
                </div>
              </div>
            </div>

            <div>
              <div className='text-[18px] text-text/80 leading-[1.4]'>
                {p.faz}
              </div>
              <div className='font-mono text-[11px] tracking-[0.1em] text-purple/45 mt-1'>
                {p.escopo}
              </div>
            </div>

            <motion.div
              animate={{
                opacity: phase === 1 ? 1 : 0.25,
                x: phase === 1 ? 0 : 8,
              }}
              transition={{ duration: 0.45, ease: easeIn, delay: i * 0.06 }}
              className={`flex items-center gap-2.5 border px-3 py-2 ${
                p.sensiveis
                  ? 'border-purple/30 bg-purple/[0.06]'
                  : 'border-text/12 bg-black/[0.02]'
              }`}
            >
              {p.sensiveis ? (
                <EyeIcon className='size-5 text-purple/70 shrink-0' strokeWidth={1.7} />
              ) : (
                <Lock className='size-5 text-text/35 shrink-0' strokeWidth={1.7} />
              )}
              <span
                className={`text-[16px] font-semibold leading-[1.2] ${
                  p.sensiveis ? 'text-purple/85' : 'text-text/45'
                }`}
              >
                {p.sensiveis ? 'Vê em claro' : 'Mascarado pela API'}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: easeIn, delay: 0.35 }}
        className='text-[22px] font-bold text-center text-text tracking-[-0.02em] leading-[1.25]'
      >
        CPF, RG, telefone, endereço e pagamento saem mascarados da API.{' '}
        <span className='text-purple'>
          A permissão não esconde o campo na tela — ela decide o que o backend
          devolve.
        </span>
      </motion.div>
    </SlideShell>
  )
}
