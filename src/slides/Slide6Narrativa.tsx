import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

// Mesmos projetos, mas propositalmente dispersos e inconsistentes —
// fontes, pesos, rotações e tons diferentes: "não parecem da mesma família".
const projects = [
  { name: "IC Fleets", rot: -5, size: 30, weight: 700, font: "sans", color: "#e85151", op: 0.85 },
  { name: "ic vision", rot: 4, size: 22, weight: 400, font: "mono", color: "#7c6ef5", op: 0.6 },
  { name: "IC LUMEN", rot: -2, size: 26, weight: 800, font: "sans", color: "#b59a1f", op: 0.7 },
  { name: "Quality", rot: 7, size: 20, weight: 500, font: "serif", color: "#5f7a92", op: 0.55 },
  { name: "ic-tree", rot: -8, size: 28, weight: 600, font: "mono", color: "#2d7a4e", op: 0.8 },
  { name: "IC Gas", rot: 3, size: 24, weight: 300, font: "sans", color: "#e87c3a", op: 0.65 },
  { name: "ic FLOOD", rot: -4, size: 27, weight: 700, font: "serif", color: "#3a7ce8", op: 0.75 },
  { name: "Classify", rot: 6, size: 21, weight: 400, font: "mono", color: "#b061e8", op: 0.55 },
  { name: "IC Query", rot: -6, size: 25, weight: 600, font: "sans", color: "#c79a2a", op: 0.7 },
  { name: "ic face", rot: 5, size: 23, weight: 500, font: "serif", color: "#3ab8d4", op: 0.6 },
  { name: "IC NEWS", rot: -3, size: 22, weight: 800, font: "mono", color: "#3ad47e", op: 0.65 },
  { name: "Labs", rot: 8, size: 26, weight: 400, font: "sans", color: "#3a9ed4", op: 0.7 },
];

const fontFamily: Record<string, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  mono: "'Space Mono', ui-monospace, monospace",
  serif: "ui-serif, Georgia, serif",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide6Narrativa({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Branding
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Além da experiência, falta{" "}
          <em className="not-italic text-purple">uma narrativa comum.</em>
        </motion.h1>
      </div>

      {/* projetos dispersos */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <motion.div
          {...up(0.25, easeIn)}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 max-w-[1200px]"
        >
          {projects.map((p, i) => (
            <motion.span
              key={p.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: p.op, scale: 1 }}
              transition={{ duration: 0.4, ease: easeIn, delay: 0.3 + i * 0.06 }}
              style={{
                transform: `rotate(${p.rot}deg)`,
                fontSize: `${p.size}px`,
                fontWeight: p.weight,
                fontFamily: fontFamily[p.font],
                color: p.color,
              }}
              className="whitespace-nowrap"
            >
              {p.name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div {...up(0.9)} className="text-[19px] font-light text-text/55 leading-[1.55] max-w-[1000px]">
        Muitos projetos com potencial — mas eles ainda não se apresentam como
        partes de uma mesma visão.
      </motion.div>

      {/* punch */}
      <motion.div
        {...up(1.0, easeIn)}
        className="border border-purple/20 bg-purple/[0.04] px-10 py-6"
      >
        <div className="text-[30px] font-bold text-text tracking-[-0.02em]">
          UX organiza a experiência.{" "}
          <span className="text-purple">Branding organiza a narrativa.</span>
        </div>
      </motion.div>
    </div>
  );
}
