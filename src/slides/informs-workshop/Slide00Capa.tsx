import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SLIDE_PADDING, type SlideProps } from '../config'

/**
 * Capa do workshop. Mesma mecânica da capa do deck completo (o nome sobe
 * sozinho, a tagline vem palavra a palavra), com o recorte novo: aqui o
 * assunto não é o que o Informs é, e sim onde ele entra nos projetos.
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

    tl.fromTo(nome, { y: '110%' }, { y: '0%', opacity: 1, duration: 0.85 }, 0.25)

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
        className='font-mono text-[20px] tracking-[0.16em] text-purple/45 uppercase'
      >
        Intelicity · Workshop interno
      </div>

      <div>
        <h1
          className='text-[132px] font-bold leading-[0.9] tracking-[-0.055em] text-text'
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          <span
            className='inline-block overflow-hidden'
            style={{ verticalAlign: 'bottom' }}
          >
            <span className='inline-block' data-nome>
              in<em className='not-italic text-purple'>forms</em>
            </span>
          </span>
        </h1>

        <div className='mt-5 text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-text/75'>
          {splitToWords('para gestores.')}
        </div>

        <p
          data-subtitle
          className='mt-6 text-[22px] text-text/50 leading-[1.6] max-w-[940px]'
        >
          Quando usar, como integrar e onde termina o produto.
        </p>
      </div>

      <div
        data-nav
        className='font-mono text-[20px] tracking-[0.14em] text-purple/30 uppercase flex items-center justify-end w-full'
      >
        <span>Agosto 2026 · Godoy · Arquitetura &amp; Produto</span>
      </div>
    </div>
  )
}
