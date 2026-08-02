import { motion } from 'motion/react'
import { Lock, Eye } from 'lucide-react'
import type { SlideProps } from '../config'
import { PERFIS } from '../../data/fleets'
import { SlideShell, SlideHeader, Chip, Accent, up, easeIn } from './kit'

const STEP2 = 'LGPD'

export default function Slide04Usuarios({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-9'>
      <SlideHeader
        eyebrow='Usuários · CASL'
        title={
          <>
            Cinco perfis, <Accent>um menu que muda.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 flex items-center'>
        <div className='grid grid-cols-5 gap-4 w-full'>
        {PERFIS.map((p, i) => (
          <motion.div
            key={p.key}
            {...up(0.28 + i * 0.09, easeIn)}
            className='border border-purple/20 bg-purple/[0.04] p-7 flex flex-col gap-6'
          >
            <p.Icon
              className='size-10 text-purple/55 shrink-0'
              strokeWidth={1.4}
            />
            <div>
              <div className='text-[27px] font-bold text-text tracking-[-0.03em] leading-none'>
                {p.key}
              </div>
              <div className='text-[16px] text-text/50 leading-[1.3] mt-2'>
                {p.papel}
              </div>
            </div>

            {p.key === 'DRIVER' && (
              <motion.div {...up(0.85, easeIn)}>
                <Chip>Futuro app</Chip>
              </motion.div>
            )}

            {/* Máscara de LGPD — só acende no segundo step. */}
            <motion.div
              animate={{
                opacity: phase === 1 ? 1 : 0,
                y: phase === 1 ? 0 : 8,
              }}
              transition={{ duration: 0.4, ease: easeIn, delay: i * 0.07 }}
              className={`mt-auto flex items-center gap-2 border px-2.5 py-2 ${
                p.sensiveis
                  ? 'border-purple/35 bg-purple/[0.09]'
                  : 'border-text/12 bg-black/[0.02]'
              }`}
            >
              {p.sensiveis ? (
                <Eye className='size-4 text-purple/70 shrink-0' strokeWidth={1.8} />
              ) : (
                <Lock className='size-4 text-text/35 shrink-0' strokeWidth={1.8} />
              )}
              <span
                className={`font-mono text-[10px] tracking-[0.1em] uppercase leading-none ${
                  p.sensiveis ? 'text-purple/80' : 'text-text/40'
                }`}
              >
                {p.sensiveis ? 'Vê em claro' : 'Mascarado'}
              </span>
            </motion.div>
          </motion.div>
        ))}
        </div>
      </div>

      <motion.div
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: easeIn, delay: 0.3 }}
        className='text-[26px] font-bold text-center text-text tracking-[-0.02em] leading-[1.25]'
      >
        CPF, RG, telefone, endereço e pagamento:{' '}
        <span className='text-purple'>a própria API mascara.</span>
      </motion.div>
    </SlideShell>
  )
}
