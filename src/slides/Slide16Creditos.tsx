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

const people = ["Fortes", "Bega", "Rodrigo", "Davi", "Marco", "Time de IA"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide16Creditos({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col items-center justify-center gap-10 min-h-0 overflow-hidden text-center`}
    >
      <motion.h1
        {...up(0.1)}
        className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em] max-w-[900px]"
      >
        O que construímos aqui é incrível e{" "}
        <em className="not-italic text-purple">
          nada incrível é construído sozinho.
        </em>
      </motion.h1>

      <motion.p {...up(0.22)} className="text-[19px] text-text/50 leading-[1.5]">
        Um obrigado especial a quem pensou comigo em cada etapa:
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4">
        {people.map((name, i) => (
          <motion.div
            key={name}
            {...up(0.32 + i * 0.06, easeIn)}
            className="border border-purple/25 bg-purple/5 px-7 py-4"
          >
            <span className="text-[26px] font-bold text-text tracking-[-0.01em]">
              {name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...up(0.75)}
        className="text-[18px] text-text/50 leading-[1.55] max-w-[760px]"
      >
        E também à empresa como um todo — todo mundo teve participação em
        alguma parte desta apresentação.
      </motion.p>

      <motion.div
        {...up(0.9, easeIn)}
        className="border-t border-text/10 pt-5 max-w-[760px] w-full"
      >
        <div className="text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.35]">
          Vamos continuar com{" "}
          <span className="text-purple">nossa dedicação e bom trabalho.</span>
        </div>
      </motion.div>
    </div>
  );
}
