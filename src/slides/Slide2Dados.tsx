import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { ArrowDown } from "lucide-react";
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

const questions = [
  "Como priorizar?",
  "Como justificar orçamento?",
  "Como planejar?",
  "Como prestar contas?",
  "Como comunicar a órgãos públicos?",
];

export default function Slide2Dados({ action }: SlideProps) {
  const showQuestions = action === "Perguntas";

  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          O risco
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[56px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          Mais dados não significam{" "}
          <em className="not-italic text-purple">mais clareza.</em>
        </motion.h1>
      </div>

      {/* duas colunas: escalada do problema (esq) · perguntas (dir) */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-10">
        {/* ESQUERDA — a escalada */}
        <div className="flex flex-col justify-center gap-4">
          <motion.div
            {...up(0.2, easeIn)}
            className="border border-text/10 bg-black/2 px-8 py-6"
          >
            <div className="font-mono text-[12px] tracking-[0.16em] text-text/40 uppercase mb-2">
              Antes
            </div>
            <div className="text-[27px] font-semibold text-text/70 leading-[1.15] tracking-[-0.02em]">
              Um problema que mal conseguia ser administrado.
            </div>
          </motion.div>

          <motion.div
            {...up(0.35)}
            className="flex flex-col items-center gap-1.5"
          >
            <ArrowDown className="size-8 text-purple/50" />
          </motion.div>

          <motion.div
            {...up(0.45, easeIn)}
            className="relative border border-purple/25 bg-purple/[0.05] px-8 py-7 overflow-hidden"
          >
            <div
              className="absolute w-[320px] h-[320px] rounded-full top-[-130px] right-[-70px] pointer-events-none blur-[60px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-[1]">
              <div className="font-mono text-[12px] tracking-[0.16em] text-purple/55 uppercase mb-3">
                Após adquirir nossos dados e sistemas
              </div>
              <div className="flex items-end gap-4">
                <div className="text-[88px] font-bold leading-[0.8] tracking-[-0.04em] text-purple">
                  10×
                </div>
                <div className="text-[27px] font-semibold text-text/90 leading-[1.15] tracking-[-0.02em] pb-2">
                  maior do que se imaginava.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DIREITA — as perguntas */}
        <div className="flex flex-col justify-center gap-4 border-l border-text/8 pl-10">
          <motion.div {...up(0.3)} className="flex items-center gap-3">
            <div className="text-[34px] font-bold text-text tracking-[-0.02em]">
              E agora?
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {questions.map((q, i) => (
              <motion.div
                key={q}
                initial={false}
                animate={{
                  opacity: showQuestions ? 1 : 0,
                  x: showQuestions ? 0 : -10,
                }}
                transition={{
                  duration: 0.4,
                  ease: easeOut,
                  delay: showQuestions ? i * 0.09 : 0,
                }}
                className="border-l-2 border-purple/35 bg-purple/[0.04] px-6 py-4 text-[22px] font-medium text-text/80"
              >
                {q}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* frase centralizada (entra com o step das perguntas) */}
      <motion.div
        initial={false}
        animate={{ opacity: showQuestions ? 1 : 0, y: showQuestions ? 0 : 14 }}
        transition={{
          duration: 0.5,
          ease: easeOut,
          delay: showQuestions ? 0.5 : 0,
        }}
        className="border-t border-text/10 pt-6 text-center"
      >
        <div className="text-[32px] font-bold text-text tracking-[-0.02em]">
          O dado revela o problema.{" "}
          <span className="text-purple">
            A experiência define se ele vira ação.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
