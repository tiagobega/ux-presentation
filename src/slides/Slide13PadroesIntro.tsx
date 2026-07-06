import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide13PadroesIntro({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-24 relative">
      <motion.div
        {...up(0.0)}
        className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-6 uppercase"
      >
        Padrões & Inovação · bloco transversal
      </motion.div>

      <motion.div
        {...up(0.2)}
        className="text-[52px] font-bold text-text leading-[1.1] tracking-[-0.03em] max-w-[1100px]"
      >
        Como mudamos o{" "}
        <span className="text-purple">jeito de construir software.</span>
      </motion.div>

      <motion.div
        {...up(0.55)}
        className="mt-8 text-[22px] text-text/50 leading-[1.5] max-w-[940px]"
      >
        IcePanel, Claude corporativo e MCPs: o que explica a velocidade de tudo
        que veio antes.
      </motion.div>
    </div>
  );
}
