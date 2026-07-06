import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import { Medal, ChevronRight, Image } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];
const drama: [number, number, number, number] = [0.77, 0, 0.22, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const STEP2 = "A foto atravessa";

const layers = [
  {
    color: "#b08d57",
    tier: "Bronze",
    name: "Validação",
    desc: "Qualidade, integridade e metadados da foto.",
    center: "16%",
  },
  {
    color: "#9aa4b2",
    tier: "Prata",
    name: "Detecção",
    desc: "O que existe na imagem.",
    center: "50%",
  },
  {
    color: "#d4af37",
    tier: "Ouro",
    name: "Regras de negócio",
    desc: "O que aquilo significa para o contrato e o cliente.",
    center: "84%",
  },
];

export default function Slide06VisionArquitetura({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0;

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Intelivision · arquitetura
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Bronze, Prata e{" "}
          <em className="not-italic text-purple">Ouro.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[940px]"
        >
          Pipeline em camadas, estilo medallion. Uma foto atravessa o fluxo e,
          a cada camada, ganha mais significado.
        </motion.p>
      </div>

      {/* trilho da foto */}
      <div className="relative h-11 shrink-0">
        <motion.div
          initial={false}
          animate={{
            left: phase === 1 ? layers[2].center : layers[0].center,
            opacity: 1,
          }}
          transition={{ duration: 1.8, ease: drama, delay: phase === 1 ? 0.2 : 0 }}
          className="absolute top-0 -translate-x-1/2 flex items-center gap-2 border border-purple/40 bg-purple/[0.08] px-4 py-2"
        >
          <Image className="size-4 text-purple" strokeWidth={1.75} />
          <span className="text-[13px] font-mono tracking-[0.1em] text-purple/80 uppercase">
            foto
          </span>
        </motion.div>
      </div>

      {/* camadas */}
      <div className="flex-1 min-h-0 flex items-center gap-3">
        {layers.map((l, i) => (
          <div key={l.tier} className="contents">
            <motion.div
              {...up(0.3 + i * 0.12, easeIn)}
              className="flex-1 h-full max-h-[300px] border border-text/10 bg-black/2 overflow-hidden flex flex-col"
            >
              <div className="h-[6px] w-full" style={{ background: l.color }} />
              <div className="p-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <Medal className="size-8" style={{ color: l.color }} strokeWidth={1.5} />
                  <div
                    className="font-mono text-[13px] tracking-[0.18em] uppercase"
                    style={{ color: l.color }}
                  >
                    {l.tier}
                  </div>
                </div>
                <div className="text-[27px] font-bold text-text tracking-[-0.02em] leading-[1.1]">
                  {l.name}
                </div>
                <div className="h-px bg-text/8" />
                <div className="text-[18px] text-text/70 leading-[1.45] mt-auto">
                  {l.desc}
                </div>
              </div>
            </motion.div>
            {i < layers.length - 1 && (
              <motion.div {...up(0.4 + i * 0.12)} className="shrink-0">
                <ChevronRight className="size-8 text-purple/40" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        {...up(0.7, easeIn)}
        className="border-t border-text/10 pt-5 text-center"
      >
        <div className="text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.35]">
          Escalabilidade por design:{" "}
          <span className="text-purple">
            cada camada evolui de forma independente.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
