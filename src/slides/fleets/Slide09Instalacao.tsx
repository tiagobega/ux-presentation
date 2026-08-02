import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { PlugZap, ListChecks, History, Unplug, TriangleAlert } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, Chip, up, easeIn } from './kit'

interface Fluxo {
  Icon: LucideIcon
  titulo: string
  texto: string
  chips: string[]
}

const fluxos: Fluxo[] = [
  {
    Icon: PlugZap,
    titulo: 'Instalação individual',
    texto:
      'Vincula o dispositivo ao veículo e registra onde ele foi montado, com qual chip e em que data.',
    chips: ['Centro', 'Esquerda', 'Direita', 'Chip 4G', 'Data'],
  },
  {
    Icon: ListChecks,
    titulo: 'Instalação em lote',
    texto:
      'Wizard que instala vários dispositivos de uma vez, sem repetir o mesmo formulário dezenas de vezes.',
    chips: ['install-batch-wizard'],
  },
  {
    Icon: History,
    titulo: 'Editar e auditar',
    texto:
      'Corrigir uma instalação errada e ver o histórico completo de instalação de cada device.',
    chips: ['Editar instalação', 'Histórico'],
  },
  {
    Icon: Unplug,
    titulo: 'Desinstalação',
    texto:
      'Individual ou em lote, sempre registrando em que condição o hardware voltou do campo.',
    chips: ['Condição de retorno', 'Lote'],
  },
]

export default function Slide09Instalacao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Instalação'
        title={
          <>
            Do formulário único ao{' '}
            <Accent>lote de dezenas de veículos.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4'>
        {fluxos.map((f, i) => (
          <motion.div
            key={f.titulo}
            {...up(0.28 + i * 0.1, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-3.5 justify-center'
          >
            <div className='flex items-center gap-4'>
              <f.Icon
                className='size-8 text-purple/55 shrink-0'
                strokeWidth={1.5}
              />
              <div className='text-[26px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
                {f.titulo}
              </div>
            </div>
            <div className='text-[17px] text-text/60 leading-[1.5]'>
              {f.texto}
            </div>
            <div className='flex flex-wrap gap-2 mt-1'>
              {f.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* o risco que mora aqui */}
      <motion.div
        {...up(0.75, easeIn)}
        className='border border-red-500/25 bg-red-500/[0.04] px-9 py-5 flex items-start gap-5'
      >
        <TriangleAlert
          className='size-7 text-red-500/60 shrink-0 mt-0.5'
          strokeWidth={1.6}
        />
        <div>
          <div className='font-mono text-[11px] tracking-[0.16em] text-red-500/55 uppercase mb-1.5'>
            Onde mora o erro humano
          </div>
          <div className='text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.25]'>
            Device errado no veículo errado, chip trocado, posição divergente.{' '}
            <span className='text-purple'>
              Hoje o operador declara a instalação — ninguém confere.
            </span>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  )
}
