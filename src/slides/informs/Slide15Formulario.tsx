import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  MapPin,
  TriangleAlert,
  CalendarClock,
  IdCard,
  ArrowRight,
  LayoutTemplate,
  FileText,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'
import { StatusLine } from './ui'

const atributos: { Icon: LucideIcon; rotulo: string; valor: string; nota: string }[] = [
  {
    Icon: MapPin,
    rotulo: 'Localização',
    valor: 'R. Domingos de Morais, 2187',
    nota: 'O endereço vira ponto no mapa do verificador.',
  },
  {
    Icon: TriangleAlert,
    rotulo: 'Prioridade',
    valor: 'Crítica · 3',
    nota: 'Baixa, Média, Alta ou Crítica. Ordena a fila do dia.',
  },
  {
    Icon: CalendarClock,
    rotulo: 'Prazo de expiração',
    valor: '12/08/2026',
    nota: 'Define até quando aquela demanda faz sentido.',
  },
  {
    Icon: IdCard,
    rotulo: 'Verificador',
    valor: 'Marcos Vieira',
    nota: 'A demanda ganha dono, não fica num balaio comum.',
  },
]

export default function Slide15Formulario({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do sistema de origem · Criação de formulário'
        title={
          <>
            O template ganha <Accent>endereço e dono.</Accent>
          </>
        }
        lead='Com o molde pronto, o sistema de origem gera os formulários pela API. O mesmo template vira dezenas de demandas distintas.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-8'>
        <motion.div
          {...up(0.28, easeIn)}
          className='flex items-center justify-center gap-8'
        >
          <div className='border border-text/12 bg-black/[0.02] px-8 py-5 flex items-center gap-4'>
            <LayoutTemplate className='size-8 text-purple/50' strokeWidth={1.5} />
            <div>
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
                Molde
              </div>
              <div className='text-[24px] font-bold text-text/80 tracking-[-0.025em] leading-[1.1]'>
                Vistoria de poste
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.5 }}
          >
            <ArrowRight className='size-8 text-purple/45' strokeWidth={1.6} />
          </motion.div>

          <div className='border border-purple/30 bg-purple/[0.07] px-8 py-5 flex items-center gap-5'>
            <FileText className='size-8 text-purple/65' strokeWidth={1.5} />
            <div>
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/55 uppercase'>
                Instância
              </div>
              <div className='text-[24px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
                Formulário #40218
              </div>
            </div>
            <StatusLine status='PENDING' />
          </div>
        </motion.div>

        <div className='grid grid-cols-4 gap-4'>
          {atributos.map((a, i) => (
            <motion.div
              key={a.rotulo}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.6 + i * 0.12 }}
              className='border border-purple/15 bg-purple/[0.03] p-6 flex flex-col gap-3'
            >
              <a.Icon className='size-7 text-purple/55' strokeWidth={1.5} />
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase'>
                {a.rotulo}
              </div>
              <div className='text-[20px] font-bold text-text/90 tracking-[-0.02em] leading-[1.12]'>
                {a.valor}
              </div>
              <div className='text-[15px] text-text/55 leading-[1.4] mt-auto'>
                {a.nota}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
