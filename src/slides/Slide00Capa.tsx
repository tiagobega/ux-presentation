import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SLIDE_PADDING, type SlideProps } from "./config";

// Split a string into individually maskable word spans
function splitToWords(text: string, className = "") {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      className="inline-block overflow-hidden"
      style={{ verticalAlign: "bottom" }}
    >
      <span className={`inline-block ${className}`} data-word>
        {word}
        {i < text.split(" ").length - 1 ? " " : ""}
      </span>
    </span>
  ));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide00Capa({ action: _ }: SlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll("[data-word]");
    const meta = el.querySelectorAll("[data-meta]");
    const subtitle = el.querySelector("[data-subtitle]");
    const nav = el.querySelector("[data-nav]");

    gsap.set([words, meta, subtitle, nav], { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Meta line
    tl.to(meta, { opacity: 1, duration: 0.5 }, 0.1);

    // Tag line
    tl.fromTo(
      el.querySelector("[data-tag]"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4 },
      0.2,
    );

    // Title words cascade — line 1 then line 2
    tl.fromTo(
      Array.from(words),
      { y: "110%" },
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
      },
      0.3,
    );

    // Subtitle
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
    gsap.set(subtitle, { y: 14 });

    // Nav hint
    tl.to(nav, { opacity: 1, duration: 0.4 }, 1.1);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`${SLIDE_PADDING} flex-1 flex flex-col justify-between`}>
      <div
        data-meta
        className="font-mono text-[10px] tracking-[0.2em] text-purple/45 uppercase"
      >
        Intelicity · Documento Estratégico · 2026
      </div>

      <div>
        <div
          data-tag
          className="font-mono text-[10px] tracking-[0.28em] text-purple/50 uppercase mb-5"
        >
          Branding &amp; UX
        </div>
        <h1 className="text-[110px] font-bold leading-[0.94] tracking-[-0.04em] text-text">
          <span className="block">{splitToWords("Como o produto")}</span>
          <em className="not-italic text-purple block">
            {splitToWords("fala por si.")}
          </em>
        </h1>
        <p
          data-subtitle
          className="mt-8 text-[22px] font-light text-text/50 leading-[1.6] max-w-[820px]"
        >
          UX, branding e estrutura de produto.
          <br />
          As três coisas que determinam se a Intelicity cresce com coerência ou
          com dívida.
        </p>
      </div>

      <div
        data-nav
        className="font-mono text-[9px] tracking-[0.18em] text-purple/30 uppercase flex items-center gap-3 w-full "
      >
        Use as setas para navegar
      </div>
    </div>
  );
}
