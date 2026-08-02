import { motion } from 'motion/react'
import { Boxes, Server, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from '../kit'

const STEP2 = 'Retorno'

const atores = [
  { Icon: Boxes, nome: 'Sistema de origem', sub: 'GAIA · Porto Alegre · Recife · SABESP' },
  { Icon: Server, nome: 'Informs', sub: 'API' },
  { Icon: Smartphone, nome: 'App de campo', sub: 'moto-verificador' },
]

/** `de` e `para` são índices de coluna; a seta ocupa o vão entre as duas. */
const mensagens = [
  { n: 1, de: 0, para: 1, texto: 'cria e atualiza Template', fase: 0 },
  { n: 2, de: 0, para: 1, texto: 'gera Formulários (demandas)', fase: 0 },
  { n: 3, de: 2, para: 1, texto: 'lista e baixa formulários', fase: 0 },
  { n: 4, de: 2, para: 1, texto: 'inicia · preenche · envia', fase: 1 },
  { n: 5, de: 2, para: 1, texto: 'rastreio por WebSocket', fase: 1 },
  { n: 6, de: 1, para: 0, texto: 'consome os resultados', fase: 1 },
] as const

export default function Slide17Integracao({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Fluxo do sistema de origem · Integração'
        title={
          <>
            O contrato entre os três{' '}
            <Accent>é a peça a padronizar na implantação.</Accent>
          </>
        }
        lead='O sistema de origem publica templates, gera formulários e consome os resultados preenchidos. O app é o elo de campo.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-5'>
        <div className='grid grid-cols-3 gap-6'>
          {atores.map((a, i) => (
            <motion.div
              key={a.nome}
              {...up(0.26 + i * 0.1, easeIn)}
              className={`px-7 py-5 flex items-center gap-4 ${
                i === 1
                  ? 'border border-purple/30 bg-purple/[0.07]'
                  : 'border border-text/12 bg-black/[0.02]'
              }`}
            >
              <a.Icon
                className={`size-8 shrink-0 ${
                  i === 1 ? 'text-purple/65' : 'text-purple/45'
                }`}
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[22px] font-bold text-text tracking-[-0.025em] leading-[1.1]'>
                  {a.nome}
                </div>
                <div className='font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase mt-0.5'>
                  {a.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='relative flex flex-col gap-3'>
          <div className='absolute inset-0 grid grid-cols-3 pointer-events-none'>
            {atores.map((a) => (
              <motion.div
                key={a.nome}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
                className='w-px h-full bg-purple/15 justify-self-center origin-top'
              />
            ))}
          </div>

          {mensagens.map((m, i) => {
            const shown = m.fase === 0 || phase === 1
            const esquerda = Math.min(m.de, m.para)
            const paraDireita = m.para > m.de
            const posicao =
              esquerda === 0 ? 'col-start-1 col-span-2' : 'col-start-2 col-span-2'
            const delay =
              m.fase === 0 ? 0.6 + i * 0.14 : phase === 1 ? 0.15 + (i - 3) * 0.14 : 0
            return (
              <div key={m.n} className='grid grid-cols-3 gap-0'>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 10 }}
                  transition={{ duration: 0.4, ease: easeOut, delay }}
                  className={`${posicao} flex items-center gap-3 px-[6%]`}
                >
                  {!paraDireita && (
                    <ArrowLeft className='size-5 text-purple/55 shrink-0' strokeWidth={2} />
                  )}
                  <div className='flex-1 flex items-center gap-3'>
                    <div className='h-px flex-1 bg-purple/25' />
                    <span className='font-mono text-[12px] tracking-[0.1em] text-purple/70 uppercase whitespace-nowrap'>
                      <span className='text-purple/40'>0{m.n}</span> {m.texto}
                    </span>
                    <div className='h-px flex-1 bg-purple/25' />
                  </div>
                  {paraDireita && (
                    <ArrowRight className='size-5 text-purple/55 shrink-0' strokeWidth={2} />
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
