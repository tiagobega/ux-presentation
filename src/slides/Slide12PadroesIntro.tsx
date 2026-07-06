import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide12PadroesIntro({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-24 relative">
      <motion.h1
        {...up(0.0)}
        className="text-[64px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
      >
        Padrões & Inovação
      </motion.h1>

     

      <motion.div
        {...up(0.55)}
        className="mt-8 text-[22px] text-text/80 leading-[1.5] max-w-[940px]"
      >
        IcePanel, Claude corporativo e MCPs
      </motion.div>
    </div>
  );
}
