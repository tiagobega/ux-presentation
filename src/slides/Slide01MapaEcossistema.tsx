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
      className={`${SLIDE_PADDING} flex-1 flex items-center gap-12 min-h-0 overflow-hidden`}
    >
      <div className="flex-1 min-w-0">
        <motion.h1
          {...up(0.0)}
          className="text-[40px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
        >
          O foco dos últimos 6 meses
        </motion.h1>
        <motion.p
          {...up(0.1)}
          className="mt-3 text-[22px] font-medium text-text/70 leading-[1.4] tracking-[-0.01em]"
        >
          Não foi tudo o que fizemos — mas foi{" "}
          <em className="not-italic text-purple">
            onde concentramos a energia:
          </em>{" "}
          construir, refatorar e integrar as peças deste mapa.
        </motion.p>
        <motion.p
          {...up(0.2)}
          className="mt-5 text-[18px] text-text/50 leading-[1.5]"
        >
          É ele que vamos percorrer agora, peça a peça.
        </motion.p>
      </div>

      <motion.div
        {...up(0.3)}
        className="flex-1 min-h-0 h-full flex items-center justify-center"
      >
        <img
          src="/diagrama-atual-simplificado.svg"
          alt="Diagrama do ecossistema atual, simplificado"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </div>
  );
}
