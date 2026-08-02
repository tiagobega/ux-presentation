import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Layers, Signal, KeyRound, ShieldCheck } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, Chip, up, easeIn } from './kit'

interface Bloco {
  Icon: LucideIcon
  titulo: string
  texto: string
  chips: string[]
}

const blocos: Bloco[] = [
  {
    Icon: Layers,
    titulo: 'Tipos',
    texto:
      'O vocabulário da plataforma: o que pode ser cadastrado e com que nome.',
    chips: ['Veículo', 'Contrato', 'Status de contrato', 'Tipo de pessoa'],
  },
  {
    Icon: Signal,
    titulo: 'Chips 4G',
    texto:
      'Gestão dos chips que dão conectividade às Jetsons instaladas em campo.',
    chips: ['Operadora', 'Linha', 'Device vinculado'],
  },
  {
    Icon: KeyRound,
    titulo: 'Usuários da plataforma',
    texto:
      'Quem entra no Fleets e com qual papel — a porta de entrada de todo o resto.',
    chips: ['Convite', 'Papel', 'Desativação'],
  },
  {
    Icon: ShieldCheck,
    titulo: 'Permissões e LGPD',
    texto:
      'Regras CASL no front espelhando o backend, com máscara de dado sensível na API.',
    chips: ['CASL', 'Máscara', 'AuditLog'],
  },
]

export default function Slide14Configuracao({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Módulo · Configuração & Governança'
        title={
          <>
            A tela onde se define <Accent>quem é o quê.</Accent>
          </>
        }
        lead='Território de ADMIN. É aqui que os perfis do começo desta apresentação ganham nome e escopo.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4'>
        {blocos.map((b, i) => (
          <motion.div
            key={b.titulo}
            {...up(0.28 + i * 0.1, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-3.5 justify-center'
          >
            <div className='flex items-center gap-4'>
              <b.Icon className='size-8 text-purple/55 shrink-0' strokeWidth={1.5} />
              <div className='text-[26px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
                {b.titulo}
              </div>
            </div>
            <div className='text-[17px] text-text/60 leading-[1.5]'>
              {b.texto}
            </div>
            <div className='flex flex-wrap gap-2 mt-1'>
              {b.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <Punch delay={0.75}>
        Governança não é uma tela a mais.{' '}
        <span className='text-purple'>
          É o que faz cada uma das outras se comportar diferente por perfil.
        </span>
      </Punch>
    </SlideShell>
  )
}
