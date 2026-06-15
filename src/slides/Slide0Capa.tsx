import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SLIDE_PADDING, type SlideProps } from './config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide0Capa({ action: _ }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('[data-word]');
    const meta = el.querySelectorAll('[data-meta]');
    const subtitle = el.querySelector('[data-subtitle]');
    const support = el.querySelector('[data-support]');
    const nav = el.querySelector('[data-nav]');

    gsap.set([words, meta, subtitle, support, nav], { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to(meta, { opacity: 1, duration: 0.5 }, 0.1);
    tl.fromTo(
      el.querySelector('[data-tag]'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4 },
      0.2,
    );
    tl.fromTo(
      Array.from(words),
      { y: '110%' },
      { y: '0%', opacity: 1, duration: 0.7, stagger: 0.06 },
      0.3,
    );
    gsap.set(subtitle, { y: 14 });
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
    gsap.set(support, { y: 12 });
    tl.to(support, { opacity: 1, y: 0, duration: 0.5 }, 1.05);
    tl.to(nav, { opacity: 1, duration: 0.4 }, 1.3);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${SLIDE_PADDING} flex-1 flex flex-col justify-between`}
    >
      <div
        data-meta
        className='font-mono text-sm tracking-[0.2em] text-purple/45 uppercase'
      >
        Intelicity · IC Vision · Demonstração
      </div>

      <div>
        <div className=''>
          <div className='flex items-center gap-8'>
            <h1
              className='text-[120px] font-bold h-48 tracking-[-0.04em] text-text'
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              IC
            </h1>
            <div className='size-8 bg-blue-700/80 rounded-full' />
            <h1
              className='text-[120px] not-italic text-blue-700/80 font-bol tracking-[-0.04em]'
              style={{ fontFamily: "'Geist mono', sans-serif" }}
            >
              Vision
            </h1>
          </div>
          <p data-subtitle className='text-4xl text-text/60'>
            Da Ordem de Serviço ao output inteligente.
          </p>
          <p data-support className='mt-3 text-2xl text-text/45 leading-[1.6]'>
            Demonstração do fluxo de análise automatizada de imagens
            operacionais.
          </p>
        </div>
      </div>

      <div
        data-nav
        className='font-mono text-[9px] tracking-[0.18em] text-purple/30 uppercase flex items-center gap-3'
      >
        <span className='w-[18px] h-px bg-purple/20 inline-block' />
        Use as setas para navegar
      </div>
    </div>
  );
}
