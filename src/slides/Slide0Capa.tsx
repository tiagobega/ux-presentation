import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SLIDE_PADDING, type SlideProps } from "./config";

// Divide um texto em palavras mascaráveis individualmente
function splitToWords(text: string, className = "") {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
      <span className={`inline-block ${className}`} data-word>
        {word}
        {i < words.length - 1 ? " " : ""}
      </span>
    </span>
  ));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide0Capa({ action: _ }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll("[data-word]");
    const meta = el.querySelectorAll("[data-meta]");
    const subtitle = el.querySelector("[data-subtitle]");
    const support = el.querySelector("[data-support]");
    const nav = el.querySelector("[data-nav]");

    gsap.set([words, meta, subtitle, support, nav], { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(meta, { opacity: 1, duration: 0.5 }, 0.1);
    tl.fromTo(
      el.querySelector("[data-tag]"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4 },
      0.2,
    );
    tl.fromTo(
      Array.from(words),
      { y: "110%" },
      { y: "0%", opacity: 1, duration: 0.7, stagger: 0.06 },
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
        className="font-mono text-[10px] tracking-[0.2em] text-purple/45 uppercase"
      >
        Intelicity · IC Vision · Demonstração
      </div>

      <div>
        <div
          data-tag
          className="font-mono text-[10px] tracking-[0.28em] text-purple/50 uppercase mb-5"
        >
          Fluxo de análise · OS → Output
        </div>
        <h1
          className="text-[120px] font-bold leading-[0.94] tracking-[-0.04em] text-text"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          <span className="block">{splitToWords("IC")}</span>
          <em className="not-italic text-purple block">{splitToWords("Vision")}</em>
        </h1>
        <p
          data-subtitle
          className="mt-8 text-[24px] font-light text-text/60 leading-[1.5] max-w-[840px]"
        >
          Da Ordem de Serviço ao output inteligente.
        </p>
        <p
          data-support
          className="mt-3 text-[17px] font-light text-text/45 leading-[1.6] max-w-[760px]"
        >
          Demonstração do fluxo de análise automatizada de imagens operacionais.
        </p>
      </div>

      <div
        data-nav
        className="font-mono text-[9px] tracking-[0.18em] text-purple/30 uppercase flex items-center gap-3"
      >
        <span className="w-[18px] h-px bg-purple/20 inline-block" />
        Use as setas para navegar
      </div>
    </div>
  );
}
