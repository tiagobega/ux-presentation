import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide00Abertura({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col justify-between px-24 py-20 relative">
      {/* Eyebrow */}
      <motion.div {...up(0)} className="flex items-center gap-4">
        <span className="w-3 h-3 bg-purple" />
        <span className="font-mono text-[15px] uppercase tracking-[0.28em] text-text/60">
          Engenharia de Software · Apresentação de semestre
        </span>
      </motion.div>

      {/* Title block */}
      <div className="max-w-[1200px]">
        <motion.h1
          {...up(0.15)}
          className="text-[84px] font-bold leading-[1.02] tracking-[-0.03em] text-text"
        >
          Últimos 6 meses.
          <br />
          <span className="text-purple">Próximos 6 meses.</span>
        </motion.h1>

        <motion.p
          {...up(0.45)}
          className="mt-8 text-[24px] text-text/60 leading-[1.5] max-w-[860px] tracking-[-0.01em]"
        >
          De sistemas isolados a um{" "}
          <span className="text-text font-medium">ecossistema integrado</span> —
          o balanço do que construímos e o plano do que vem pela frente.
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        {...up(0.7)}
        className="border-t border-text/10 pt-6 flex items-end justify-between"
      >
        <div className="font-mono text-[15px] uppercase tracking-[0.2em] text-text/50">
          Intelicity · Time de Engenharia de Software
        </div>
        <div className="font-mono text-[15px] uppercase tracking-[0.2em] text-purple">
          Julho · 2026
        </div>
      </motion.div>
    </div>
  );
}
