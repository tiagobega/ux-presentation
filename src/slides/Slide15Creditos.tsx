import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

// Preencher com os nomes reais de cada time.
const credits: { project: string; people: string }[] = [
  { project: "Intelifleets · Plataforma", people: "— a preencher —" },
  { project: "Intelifleets · Ingestão", people: "— a preencher —" },
  { project: "Intelifleets · Alertas", people: "— a preencher —" },
  { project: "Intelivision", people: "— a preencher —" },
  { project: "Informs", people: "— a preencher —" },
  { project: "CVAT · avaliação open source", people: "Time de IA — a preencher" },
  { project: "Gravata", people: "— a preencher —" },
  { project: "Gestão e Planejamento de Obras", people: "— a preencher —" },
  { project: "Padrões · IcePanel · Claude · MCPs", people: "— a preencher —" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide15Creditos({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="inline-block font-mono text-sm font-bold tracking-[0.2em] text-purple mb-4 uppercase bg-purple/10 border border-purple/25 px-3 py-1.5"
        >
          Créditos
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Nada disso é de{" "}
          <em className="not-italic text-purple">uma pessoa só.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-3 gap-4">
        {credits.map((c, i) => (
          <motion.div
            key={c.project}
            {...up(0.25 + i * 0.05, easeIn)}
            className="border border-text/10 bg-black/2 px-6 py-5 flex flex-col justify-center gap-2"
          >
            <div className="text-[19px] font-bold text-text tracking-[-0.01em] leading-[1.2]">
              {c.project}
            </div>
            <div className="font-mono text-[13px] tracking-[0.06em] text-purple/55">
              {c.people}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
