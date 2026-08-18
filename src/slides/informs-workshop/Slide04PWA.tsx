import { motion } from 'motion/react'
import { Store, Globe, Tablet } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from './kit'

/** Uma linha da comparação: o mesmo assunto visto na loja e na web. */
const comparacao: { assunto: string; loja: string; pwa: string }[] = [
  {
    assunto: 'Colocar em campo',
    loja: 'Publicar na loja e esperar aprovação',
    pwa: 'Mandar um link',
  },
  {
    assunto: 'Como chega no aparelho',
    loja: 'Busca na loja, baixa e instala',
    pwa: 'Abre o link e instala na tela inicial',
  },
  {
    assunto: 'Na tela do aparelho',
    loja: 'Ícone e tela cheia',
    pwa: 'Ícone e tela cheia, igual',
  },
  {
    assunto: 'Quem libera a versão',
    loja: 'Apple e Google, com fila de revisão',
    pwa: 'Nós, no deploy',
  },
  {
    assunto: 'Correção do dia',
    loja: 'Depende de revisão e do usuário atualizar',
    pwa: 'Chega no mesmo dia, já atualizado ao abrir',
  },
  {
    assunto: 'Sem internet',
    loja: 'Funciona',
    pwa: 'Funciona igual, com os dados no aparelho',
  },
]

export default function Slide04PWA({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Antes da demo'
        title={
          <>
            PWA é <Accent>o site que vira app.</Accent>
          </>
        }
        lead='Mesmo produto, mesmo login, mesmo formulário. Muda como ele chega no aparelho de quem vai a campo.'
      />

      <motion.div
        {...up(0.3, easeIn)}
        className='flex-1 min-h-0 border border-text/10 bg-black/[0.02] px-10 py-6 flex flex-col justify-center'
      >
        <div className='grid grid-cols-[1fr_1.2fr_1.25fr] gap-6 pb-3 border-b border-text/10'>
          <span />
          <span className='font-mono text-[20px] tracking-[0.1em] text-text/40 uppercase flex items-center gap-2'>
            <Store className='size-6 shrink-0' strokeWidth={1.6} />
            App da loja
          </span>
          <span className='font-mono text-[20px] tracking-[0.1em] text-purple/65 uppercase flex items-center gap-2'>
            <Globe className='size-6 shrink-0' strokeWidth={1.6} />
            PWA
          </span>
        </div>

        {comparacao.map((c, i) => (
          <motion.div
            key={c.assunto}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: easeOut, delay: 0.5 + i * 0.1 }}
            className='grid grid-cols-[1fr_1.2fr_1.25fr] gap-6 py-4 border-b border-text/[0.07] last:border-b-0 items-start'
          >
            <span className='text-[20px] font-bold text-text/85 leading-[1.3]'>
              {c.assunto}
            </span>
            <span className='text-[20px] text-text/50 leading-[1.3]'>{c.loja}</span>
            <span className='text-[20px] text-purple/85 leading-[1.3]'>{c.pwa}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        {...up(1.15, easeIn)}
        className='border border-purple/30 bg-purple/[0.07] px-9 py-5 flex items-center gap-6'
      >
        <Tablet className='size-8 text-purple/65 shrink-0' strokeWidth={1.6} />
        <div className='flex-1'>
          <div className='font-mono text-[20px] tracking-[0.12em] text-purple/60 uppercase mb-1'>
            No tablet, agora
          </div>
          <div className='text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.25]'>
            O app instalado e o PWA lado a lado. Descubram qual é qual.
          </div>
        </div>
        <span className='flex items-center gap-2 border border-purple/30 px-3 py-1.5 shrink-0'>
          <span className='w-2 h-2 rounded-full bg-purple animate-pulse' />
          <span className='font-mono text-[20px] tracking-[0.1em] text-purple/70 uppercase'>
            ao vivo
          </span>
        </span>
      </motion.div>
    </SlideShell>
  )
}
