import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import { ArrowRight } from "lucide-react";
import EcosystemGoalMap from "./shared/EcosystemGoalMap";

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

const STEP_TODAY = "Hoje";
const STEP_GOAL = "Objetivo";

const columns: { title: string; accent: string; items: string[] }[] = [
  {
    title: "Agora",
    accent: "#e85151",
    items: [
      "Vision em produção na SABESP",
      "Workshop do Fleets",
      "Correções do Informs",
      "Retomada do Gravata integrado",
    ],
  },
  {
    title: "Próximo",
    accent: "#7c6ef5",
    items: [
      "Geobox + N100 no Fleets",
      "Informs na App Store",
      "Gestão de Obras de prateleira",
      "Agente com MCP",
    ],
  },
  {
    title: "Explorando",
    accent: "#3a7ce8",
    items: [
      "Vision on demand para todos",
      "Informs ↔ Vision em tempo real",
      "App de Zeladoria para munícipes",
      "MCPs em tudo",
    ],
  },
];

export default function Slide16Roadmap({ action }: SlideProps) {
  const showMap = action === STEP_TODAY || action === STEP_GOAL;
  const revealed = action === STEP_GOAL;

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="inline-block font-mono text-sm font-bold tracking-[0.2em] text-purple mb-4 uppercase bg-purple/10 border border-purple/25 px-3 py-1.5"
        >
          Roadmap · próximo semestre
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Agora, próximo e{" "}
          <em className="not-italic text-purple">explorando.</em>
        </motion.h1>
      </div>

      {showMap ? (
        <div
          key="objetivo"
          className="flex-1 min-h-0 flex flex-col items-center justify-center gap-5"
        >
          <div className="relative w-full max-w-[760px] flex-1 min-h-0 flex items-center justify-center">
            <EcosystemGoalMap revealed={revealed} />
          </div>
          <motion.div
            {...up(0.3)}
            className="flex items-center gap-3 font-mono text-[13px] tracking-[0.18em] uppercase"
          >
            <span className={revealed ? "text-text/40" : "text-purple"}>
              Hoje
            </span>
            <ArrowRight className="size-4 text-purple/50" />
            <span className={revealed ? "text-purple" : "text-text/40"}>
              Objetivo
            </span>
          </motion.div>
        </div>
      ) : (
        <div
          key="colunas"
          className="flex-1 min-h-0 grid grid-cols-3 gap-5"
        >
          {columns.map((col, ci) => (
            <motion.div
              key={col.title}
              {...up(0.25 + ci * 0.12, easeIn)}
              className="border border-text/10 bg-black/2 flex flex-col overflow-hidden"
            >
              <div className="h-[6px] w-full" style={{ background: col.accent }} />
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div
                  className="font-mono text-[13px] tracking-[0.18em] uppercase"
                  style={{ color: col.accent }}
                >
                  {col.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.items.map((it, ii) => (
                    <motion.div
                      key={it}
                      {...up(0.4 + ci * 0.12 + ii * 0.07, easeIn)}
                      className="border-l-2 px-4 py-3 text-[17px] font-medium text-text/85 leading-[1.3]"
                      style={{
                        borderColor: col.accent,
                        background: "rgba(0,0,0,0.02)",
                      }}
                    >
                      {it}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        {...up(0.9, easeIn)}
        className="border-t border-text/10 pt-5 text-center"
      >
        <div className="text-[26px] font-bold text-text tracking-[-0.02em]">
          Semestre passado construímos as fundações.{" "}
          <span className="text-purple">Semestre que vem, conectamos tudo.</span>
        </div>
      </motion.div>
    </div>
  );
}
