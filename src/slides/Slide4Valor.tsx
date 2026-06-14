import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { Map, ClipboardList } from "lucide-react";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const mapPoints = ["Leitura territorial", "Comparação temporal", "Antes e depois visível"];
const osPoints = ["Prioridade", "Execução", "Cobrança", "Resultado"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide4Valor({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Produto · demo · venda
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          O que vendemos nem sempre é{" "}
          <em className="not-italic text-purple">o que gera mais valor.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6">
        {/* MAPA */}
        <motion.div
          {...up(0.25, easeIn)}
          className="border border-text/10 bg-black/2 p-10 flex flex-col gap-6"
        >
          <Map className="size-12 text-text/35" strokeWidth={1.5} />
          <div>
            <div className="font-mono text-[12px] tracking-[0.16em] text-text/40 uppercase mb-2">
              O que mostramos
            </div>
            <div className="text-[40px] font-bold text-text/85 tracking-[-0.02em] leading-[1.0]">
              Mapa
            </div>
            <div className="text-[19px] font-light text-text/55 mt-2">
              Mostra onde está o problema.
            </div>
          </div>
          <div className="flex flex-col gap-2.5 mt-auto">
            {mapPoints.map((p) => (
              <div key={p} className="text-[16px] text-text/60 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-text/30" />
                {p}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ORDEM DE SERVIÇO (peso visual maior) */}
        <motion.div
          {...up(0.4, easeIn)}
          className="relative border border-purple/30 bg-purple/[0.05] p-10 flex flex-col gap-6 overflow-hidden"
        >
          <div
            className="absolute w-[340px] h-[340px] rounded-full top-[-120px] right-[-80px] pointer-events-none blur-[60px]"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)" }}
          />
          <ClipboardList className="size-12 text-purple relative z-[1]" strokeWidth={1.5} />
          <div className="relative z-[1]">
            <div className="font-mono text-[12px] tracking-[0.16em] text-purple/55 uppercase mb-2">
              O que gera controle
            </div>
            <div className="text-[40px] font-bold text-text tracking-[-0.02em] leading-[1.0]">
              Ordem de Serviço
            </div>
            <div className="text-[19px] font-light text-text/60 mt-2">
              Mostra como a cidade assume o controle.
            </div>
          </div>
          <div className="relative z-[1] grid grid-cols-2 gap-2.5 mt-auto">
            {osPoints.map((p) => (
              <div key={p} className="text-[17px] font-semibold text-purple/85 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple" />
                {p}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* punch */}
      <motion.div
        {...up(0.6, easeIn)}
        className="border border-purple/20 bg-purple/[0.04] px-10 py-6"
      >
        <div className="text-[28px] font-bold text-text tracking-[-0.02em]">
          O mapa mostra onde está o problema.{" "}
          <span className="text-purple">A Ordem de Serviço mostra como a cidade assume controle.</span>
        </div>
      </motion.div>
    </div>
  );
}
