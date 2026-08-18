import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  Smartphone,
  CloudOff,
  Save,
  LayoutList,
  Camera,
  ShieldCheck,
  Activity,
  Plug,
  History,
  Users,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Accent, up, easeIn } from './kit'

const ganhos: { Icon: LucideIcon; nome: string; detalhe: string }[] = [
  {
    Icon: Smartphone,
    nome: 'PWA pronto',
    detalhe: 'Abre no navegador do celular e instala na tela inicial.',
  },
  {
    Icon: CloudOff,
    nome: 'Preenchimento offline',
    detalhe: 'A rua sem sinal não interrompe o trabalho.',
  },
  {
    Icon: Save,
    nome: 'Rascunho com autosave',
    detalhe: 'Cada resposta fica salva no aparelho na hora.',
  },
  {
    Icon: LayoutList,
    nome: 'Campos dinâmicos',
    detalhe: 'O formulário muda sem release do app.',
  },
  {
    Icon: Camera,
    nome: 'Fotos e anexos',
    detalhe: 'Evidência tirada na hora, enviada quando dá.',
  },
  {
    Icon: ShieldCheck,
    nome: 'Validação no campo',
    detalhe: 'O erro aparece na tela, não na conferência.',
  },
  {
    Icon: Activity,
    nome: 'Status da atividade',
    detalhe: 'Pendente, em andamento, completo, não enviado e cancelado.',
  },
  {
    Icon: Plug,
    nome: 'Integração com a origem',
    detalhe: 'O sistema do projeto cria a demanda e recebe o resultado.',
  },
  {
    Icon: History,
    nome: 'Rastreabilidade',
    detalhe: 'Quem preencheu, quando, onde e com qual justificativa.',
  },
  {
    Icon: Users,
    nome: 'Experiência única',
    detalhe: 'Quem vai a campo aprende um app só, não um por projeto.',
  },
]

export default function Slide02Ganhos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='O que já vem pronto'
        title={
          <>
            Isso o seu projeto <Accent>não precisa construir de novo.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-5 grid-rows-2 gap-4'>
        {ganhos.map((g, i) => (
          <motion.div
            key={g.nome}
            {...up(0.28 + i * 0.06, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-5 flex flex-col gap-3 justify-center'
          >
            <g.Icon className='size-7 text-purple/55 shrink-0' strokeWidth={1.5} />
            <div className='text-[22px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
              {g.nome}
            </div>
            <div className='text-[20px] text-text/55 leading-[1.35]'>{g.detalhe}</div>
          </motion.div>
        ))}
      </div>

      <Bar kicker='O ganho de verdade' delay={1.0}>
        Usar Informs evita criar um novo app de campo para cada projeto.
      </Bar>
    </SlideShell>
  )
}
