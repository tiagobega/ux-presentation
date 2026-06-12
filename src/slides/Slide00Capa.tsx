import { motion } from "motion/react";
import type { SlideProps } from "./config";

const ease: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide00Capa({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <motion.div
        {...up(0.0)}
        className="font-mono text-[10px] tracking-[0.2em] text-purple/45 uppercase"
      >
        Intelicity · Documento Estratégico · 2026
      </motion.div>

      <div>
        <motion.div
          {...up(0.18)}
          className="font-mono text-[10px] tracking-[0.28em] text-purple/50 uppercase mb-5"
        >
          Branding &amp; UX
        </motion.div>
        <motion.h1
          {...up(0.3)}
          className="text-[68px] font-bold leading-[0.96] tracking-[-0.04em] text-text"
        >
          Como o produto
          <br />
          <em className="not-italic text-purple">fala por si.</em>
        </motion.h1>
        <motion.p
          {...up(0.5)}
          className="mt-7 text-[15px] font-light text-text/50 leading-[1.75] max-w-140"
        >
          Uma apresentação sobre UX, branding e estrutura de produto e por que
          essas três coisas determinam se a Intelicity cresce com coerência ou
          com dívida.
        </motion.p>
      </div>

      <motion.div
        {...up(0.7)}
        className="font-mono text-[9px] tracking-[0.18em] text-purple/30 uppercase flex items-center gap-3"
      >
        <span className="w-[18px] h-px bg-purple/20 inline-block" />
        Use as setas para navegar
      </motion.div>
    </div>
  );
}
