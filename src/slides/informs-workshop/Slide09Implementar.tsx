import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  PencilRuler,
  KeyRound,
  Plug,
  FlaskConical,
  Rocket,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Chip, Accent, up, easeIn } from './kit'

const passos: {
  Icon: LucideIcon
  titulo: string
  texto: string
  saidas?: string[]
}[] = [
  {
    Icon: Compass,
    titulo: 'Fit',
    texto:
      'O gestor traz a operação, quem vai a campo, de onde vêm as demandas, quais dados voltam e exemplos de formulário.',
    saidas: ['Cabe', 'Cabe com evolução', 'É outro app'],
  },
  {
    Icon: PencilRuler,
    titulo: 'Desenho',
    texto:
      'Templates, sessões, campos, validações, campos repetíveis e informativos. Cancelamento, prioridade, localização e responsável.',
  },
  {
    Icon: KeyRound,
    titulo: 'Gates',
    texto:
      'Autenticação, papéis, usuários e permissões, com o vínculo entre o verificador e o sistema de origem.',
  },
  {
    Icon: Plug,
    titulo: 'Integração',
    texto:
      'Como a origem cria os formulários com localização, prioridade, prazo e responsável, e como recebe resultados, fotos e status.',
  },
  {
    Icon: FlaskConical,
    titulo: 'Piloto',
    texto:
      'Usuários reais, campo real, conectividade ruim, câmera, GPS, sincronização e qualidade do dado que chega.',
  },
  {
    Icon: Rocket,
    titulo: 'Produção',
    texto:
      'URL oficial, usuários finais, suporte, monitoramento, governança e evolução do produto.',
  },
]

export default function Slide09Implementar({ action }: SlideProps) {
  const conjunta = action !== 'Seis passos'

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Como implementar'
        title={
          <>
            Do primeiro papo <Accent>até a produção, em seis passos.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-5'>
        {passos.map((p, i) => (
          <motion.div
            key={p.titulo}
            {...up(0.28 + i * 0.09, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-3 justify-center'
          >
            <div className='flex items-center justify-between'>
              <p.Icon className='size-8 text-purple/55 shrink-0' strokeWidth={1.5} />
              <span className='font-mono text-[20px] tracking-[0.08em] text-purple/40'>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className='text-[28px] font-bold text-text/90 tracking-[-0.025em] leading-[1.05]'>
              {p.titulo}
            </div>
            <div className='text-[20px] text-text/60 leading-[1.35]'>{p.texto}</div>
            {p.saidas && (
              <div className='flex flex-wrap gap-2 mt-1'>
                {p.saidas.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: conjunta ? 1 : 0, y: conjunta ? 0 : 10 }}
        transition={{ duration: 0.45, ease: easeIn }}
      >
        <Bar kicker='De quem é o trabalho' delay={0}>
          Não é o time do Informs integrando o seu sistema sozinho. É uma
          implantação conjunta do time do projeto, do time do Informs e do Gates.
        </Bar>
      </motion.div>
    </SlideShell>
  )
}
