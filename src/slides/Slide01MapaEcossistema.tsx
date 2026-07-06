import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import EcosystemMap from "./shared/EcosystemMap";

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
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
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

      <EcosystemMap variant="intro" />
    </div>
  );
}
