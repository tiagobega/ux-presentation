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
    <div className="flex-1 flex flex-col items-center justify-center text-center px-24 relative">
      <motion.h1
        {...up(0.0)}
        className="text-[44px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
      >
        Últimos 6 meses · Visão de futuro
      </motion.h1>

      <motion.div
        {...up(0.2)}
        className="mt-5 text-[26px] font-medium text-text/70 leading-[1.4] tracking-[-0.01em] max-w-[1150px]"
      >
        Saímos de sistemas isolados para um{" "}
        <span className="text-purple">ecossistema integrado</span> — dados,
        visão computacional e IA conversando entre si.
      </motion.div>

      <motion.div
        {...up(0.55)}
        className="mt-10 text-[22px] text-text/50 leading-[1.5] max-w-[980px]"
      >
        Nos últimos 6 meses consolidamos as fundações: refatorações, produção e
        padrões.
      </motion.div>

      <motion.div
        {...up(0.78)}
        className="mt-5 text-[26px] font-bold text-text tracking-[-0.02em]"
      >
        O próximo semestre é sobre{" "}
        <span className="text-purple">expansão e integração.</span>
      </motion.div>
    </div>
  );
}
