import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide11Citacao({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-24 relative">
      {/* aspa */}
      <motion.div
        {...up(0.1)}
        className="text-purple/25 leading-none select-none mb-[-30px]"
        style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: 180 }}
      >
        &ldquo;
      </motion.div>

      <motion.div
        {...up(0.35)}
        className="text-[46px] font-medium text-text leading-[1.32] tracking-[-0.02em] max-w-[1150px]"
      >
        Você precisa começar pela{" "}
        <span className="text-purple">experiência do cliente</span> e trabalhar
        de trás para frente até a tecnologia.
      </motion.div>

      <motion.div
        {...up(0.65)}
        className="mt-7 text-[28px] font-light text-text/50 leading-[1.4] max-w-[980px]"
      >
        Não dá para começar pela tecnologia e depois tentar descobrir para onde
        você vai vendê-la.
      </motion.div>

      {/* atribuição */}
      <motion.div {...up(0.95)} className="mt-16 flex flex-col items-center gap-3">
        <div className="w-12 h-px bg-purple/30" />
        <div className="text-[22px] font-semibold text-text tracking-[-0.01em]">
          Steve Jobs
        </div>
        <div className="font-mono text-[12px] tracking-[0.22em] text-text/40 uppercase">
          WWDC · 1997
        </div>
      </motion.div>
    </div>
  );
}
