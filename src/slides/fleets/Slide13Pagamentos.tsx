import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ListChecks, Download, Users } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, up, easeIn, easeOut } from './kit'

interface Linha {
  motorista: string
  estimado: string
  pago: string
  status: 'PAID' | 'CANCELED' | 'ABERTO'
  divergente?: boolean
}

const linhas: Linha[] = [
  { motorista: 'José Marinho', estimado: 'R$ 2.320', pago: 'R$ 2.320', status: 'PAID' },
  { motorista: 'Ana Ribeiro', estimado: 'R$ 2.320', pago: 'R$ 1.980', status: 'PAID', divergente: true },
  { motorista: 'Carlos Duarte', estimado: 'R$ 2.100', pago: 'R$ 2.100', status: 'PAID' },
  { motorista: 'Marta Alves', estimado: 'R$ 2.320', pago: '—', status: 'ABERTO' },
]

const recursos: { Icon: LucideIcon; titulo: string; texto: string; tag?: string }[] = [
  {
    Icon: ListChecks,
    titulo: 'Fechamento em lote',
    texto: 'Um wizard fecha o mês de dezenas de motoristas de uma vez.',
    tag: 'payment-batch-wizard',
  },
  {
    Icon: Download,
    titulo: 'Exportação',
    texto: 'O mês fechado sai pronto para o financeiro e para auditoria.',
  },
  {
    Icon: Users,
    titulo: 'Dois lugares, um dado',
    texto: 'O mesmo pagamento aparece na ficha da pessoa e na ficha do contrato.',
  },
]

const statusTone: Record<Linha['status'], string> = {
  PAID: 'border-purple/30 bg-purple/[0.08] text-purple/80',
  CANCELED: 'border-red-500/30 bg-red-500/[0.06] text-red-500/70',
  ABERTO: 'border-text/12 bg-black/[0.02] text-text/45',
}

export default function Slide13Pagamentos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Pagamentos'
        title={
          <>
            O que foi combinado <Accent>versus o que saiu.</Accent>
          </>
        }
        lead='Pagamento mensal por motorista: o estimado vem da meta do vínculo, o pago vem do fechamento.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_460px] gap-10 items-center'>
        {/* maquete da tabela de pagamentos */}
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-text/10 bg-white/50'
        >
          <div className='grid grid-cols-[1fr_150px_150px_130px] gap-4 px-7 py-4 border-b border-text/8 font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
            <div>Motorista · Julho 2026</div>
            <div className='text-right'>Estimado</div>
            <div className='text-right'>Pago</div>
            <div className='text-right'>Status</div>
          </div>

          {linhas.map((l, i) => (
            <motion.div
              key={l.motorista}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.6 + i * 0.1 }}
              className={`grid grid-cols-[1fr_150px_150px_130px] gap-4 px-7 py-4 items-center border-b border-text/[0.06] last:border-0 ${
                l.divergente ? 'bg-red-500/[0.03]' : ''
              }`}
            >
              <div className='text-[19px] font-semibold text-text/85 tracking-[-0.01em]'>
                {l.motorista}
              </div>
              <div className='font-mono text-[17px] text-text/50 text-right'>
                {l.estimado}
              </div>
              <div
                className={`font-mono text-[17px] text-right ${
                  l.divergente ? 'text-red-500/75 font-bold' : 'text-text/80'
                }`}
              >
                {l.pago}
              </div>
              <div className='flex justify-end'>
                <span
                  className={`font-mono text-[10px] tracking-[0.12em] uppercase border px-2.5 py-1 ${statusTone[l.status]}`}
                >
                  {l.status.toLowerCase()}
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className='px-7 py-4 border-t border-purple/15 bg-purple/[0.03] flex items-center gap-3'
          >
            <span className='font-mono text-[10px] tracking-[0.14em] text-purple/55 uppercase'>
              Diferença
            </span>
            <span className='text-[17px] text-text/65'>
              toda divergência entre estimado e pago vira pergunta de auditoria.
            </span>
          </motion.div>
        </motion.div>

        <div className='flex flex-col gap-4'>
          {recursos.map((r, i) => (
            <motion.div
              key={r.titulo}
              {...up(0.45 + i * 0.1, easeIn)}
              className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-2.5'
            >
              <div className='flex items-center gap-3.5'>
                <r.Icon className='size-6 text-purple/55 shrink-0' strokeWidth={1.6} />
                <div className='text-[21px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                  {r.titulo}
                </div>
              </div>
              <div className='text-[16px] text-text/55 leading-[1.5]'>
                {r.texto}
              </div>
              {r.tag && (
                <div className='font-mono text-[11px] tracking-[0.08em] text-purple/45'>
                  {r.tag}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Punch delay={0.9}>
        O fechamento mensal não é digitação.{' '}
        <span className='text-purple'>É conferência.</span>
      </Punch>
    </SlideShell>
  )
}
