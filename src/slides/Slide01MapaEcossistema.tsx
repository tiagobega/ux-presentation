import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide01MapaEcossistema({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-6 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="inline-block font-mono text-sm font-bold tracking-[0.2em] text-purple mb-3 uppercase bg-purple/10 border border-purple/25 px-3 py-1.5"
        >
          O mapa do ecossistema
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[46px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Um mapa que se repete a{" "}
          <em className="not-italic text-purple">apresentação inteira.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[940px]"
        >
          IC Fleets no centro; IC Vision, Informs, Gravata e os novos produtos
          se plugam nele. Cada projeto a seguir reforça essa mesma tese.
        </motion.p>
      </div>

      <motion.div
        {...up(0.3)}
        className="flex-1 min-h-0 flex items-center justify-center"
      >
        <img
          src="/diagrama-atual.svg"
          alt="Diagrama do ecossistema atual"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
