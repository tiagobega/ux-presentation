import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { FlaskConical, Apple, Palette, Tablet, Satellite } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn } from '../kit'

const passos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: FlaskConical,
    titulo: 'Testes da aplicação PWA',
    texto:
      'Validar o mesmo produto rodando no navegador, sem instalação, para quem não tem o app.',
  },
  {
    Icon: Apple,
    titulo: 'Publicação na App Store',
    texto: 'Distribuição oficial no iOS, ao lado do que já existe no Android.',
  },
  {
    Icon: Palette,
    titulo: 'Aplicação do rebranding',
    texto: 'A identidade visual nova nas telas do campo e do backoffice.',
  },
  {
    Icon: Tablet,
    titulo: 'Tablet e desktop responsivos',
    texto:
      'O layout hoje é pensado para o celular. Telas maiores precisam aproveitar o espaço.',
  },
  {
    Icon: Satellite,
    titulo: 'Rastreio integrado às plataformas',
    texto:
      'A posição em tempo real consumida direto pelos sistemas de origem.',
  },
]

export default function Slide19ProximosPassos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Próximos passos'
        title={
          <>
            O que está <Accent>na fila do produto.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4'>
        {passos.map((p, i) => (
          <motion.div
            key={p.titulo}
            {...up(0.3 + i * 0.1, easeIn)}
            className='border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-4 justify-center'
          >
            <p.Icon className='size-8 text-purple/55 shrink-0' strokeWidth={1.5} />
            <div className='text-[24px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]'>
              {p.titulo}
            </div>
            <div className='text-[16px] text-text/60 leading-[1.5]'>{p.texto}</div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  )
}
