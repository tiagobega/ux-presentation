import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import { Cable, Plug, Bot } from "lucide-react";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide17MCPs({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Padrões · MCPs em tudo
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          O <em className="not-italic text-purple">USB-C</em> das integrações
          com IA.
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-8 items-center">
        {/* Antes */}
        <motion.div
          {...up(0.3, easeIn)}
          className="border border-text/12 bg-black/2 p-9 flex flex-col gap-4 h-full justify-center"
        >
          <div className="flex items-center gap-3">
            <Cable className="size-8 text-text/45" strokeWidth={1.5} />
            <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-text/45">
              Antes · ponto-a-ponto
            </div>
          </div>
          <div className="text-[30px] font-bold text-text/80 tracking-[-0.02em] leading-[1.15]">
            N × M integrações artesanais
          </div>
          <div className="text-[18px] text-text/60 leading-[1.5]">
            Código específico para cada sistema conversar com cada fonte de
            dados. Cada nova conexão, um trabalho novo.
          </div>
        </motion.div>

        {/* Depois */}
        <motion.div
          {...up(0.45, easeIn)}
          className="relative border border-purple/30 bg-purple/[0.06] p-9 flex flex-col gap-4 h-full justify-center overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <Plug className="size-8 text-purple/70" strokeWidth={1.5} />
            <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-purple/60">
              Depois · protocolo padrão
            </div>
          </div>
          <div className="text-[30px] font-bold text-text tracking-[-0.02em] leading-[1.15]">
            N conectores reutilizáveis
          </div>
          <div className="text-[18px] text-text/70 leading-[1.5]">
            Cada base é exposta uma vez, num protocolo padrão — e qualquer
            LLM, agente ou aplicação consome.
          </div>
        </motion.div>
      </div>

      <motion.div
        {...up(0.7, easeIn)}
        className="border-t border-text/10 pt-5 flex items-center justify-center gap-3 text-center"
      >
        <Bot className="size-6 text-purple/60 flex-shrink-0" strokeWidth={1.5} />
        <div className="text-[20px] font-bold text-text tracking-[-0.02em]">
          Onde estamos: começamos pela LLM;{" "}
          <span className="text-purple">um agente está em integração agora.</span>
        </div>
      </motion.div>
    </div>
  );
}
