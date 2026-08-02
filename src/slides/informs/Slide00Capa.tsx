import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SLIDE_PADDING, type SlideProps } from '../config'

/**
 * Quebra a frase em palavras mascaráveis individualmente. O espaço entre elas
 * vive na margem do wrapper: dentro do span com `overflow-hidden` ele seria
 * colapsado e as palavras sairiam grudadas.
 */
function splitToWords(text: string) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span
      key={i}
      className={`inline-block overflow-hidden ${i < words.length - 1 ? 'mr-[0.26em]' : ''}`}
      style={{ verticalAlign: 'bottom' }}
    >
      <span className='inline-block' data-word>
        {word}
      </span>
    </span>
  ))
}

export default function Slide00Capa({ action: _ }: SlideProps) {
  void _
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const nome = el.querySelector('[data-nome]')
    const words = el.querySelectorAll('[data-word]')
    const meta = el.querySelectorAll('[data-meta]')
    const subtitle = el.querySelector('[data-subtitle]')
    const nav = el.querySelector('[data-nav]')

    gsap.set([nome, words, meta, subtitle, nav], { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.to(meta, { opacity: 1, duration: 0.5 }, 0.1)

    // O nome sobe primeiro e sozinho; a tagline vem atrás, palavra a palavra.
    tl.fromTo(
      nome,
      { y: '110%' },
      { y: '0%', opacity: 1, duration: 0.85 },
      0.25,
    )

    tl.fromTo(
      Array.from(words),
      { y: '110%' },
      { y: '0%', opacity: 1, duration: 0.6, stagger: 0.05 },
      0.75,
    )

    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5 }, 1.15)
    gsap.set(subtitle, { y: 14 })

    tl.to(nav, { opacity: 1, duration: 0.4 }, 1.4)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${SLIDE_PADDING} flex-1 flex flex-col justify-between`}
    >
      <div
        data-meta
        className='font-mono text-[10px] tracking-[0.2em] text-purple/45 uppercase'
      >
        Intelicity · Produto &amp; Tech · 2026
      </div>

      <div>
        {/* O nome carrega o corte do wordmark do app: "in" escuro, "forms" em cor. */}
        <h1 className='text-[172px] font-bold leading-[0.88] tracking-[-0.055em] text-text'>
          <span
            className='inline-block overflow-hidden'
            style={{ verticalAlign: 'bottom' }}
          >
            <span className='inline-block' data-nome>
              in<em className='not-italic text-purple'>forms</em>
            </span>
          </span>
        </h1>

        <div className='mt-6 text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text/75'>
          {splitToWords('Formulários de campo, do template ao envio.')}
        </div>

        <p
          data-subtitle
          className='mt-6 text-[21px] text-text/50 leading-[1.6] max-w-[900px]'
        >
          Templates montados pelo sistema de origem, preenchimento offline no
          campo e rastreio da rota em tempo real.
        </p>
      </div>

      <div
        data-nav
        className='font-mono text-[9px] tracking-[0.18em] text-purple/30 uppercase flex items-center justify-between gap-3 w-full'
      >
        <span>Use as setas para navegar</span>
        <span>Agosto 2026 · v1 · Godoy</span>
      </div>
    </div>
  )
}
