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

type RoadmapItem = { text: string; vision?: boolean };

const columns: { title: string; accent: string; items: RoadmapItem[] }[] = [
  {
    title: "Agora",
    accent: "#e85151",
    items: [
      { text: "Vision em produção na SABESP", vision: true },
      { text: "Workshop do Fleets para todos" },
      { text: "Informs: feedback e correções em campo" },
      { text: "Retomada do Gravata integrado ao Fleets" },
    ],
  },
  {
    title: "Próximo",
    accent: "#7c6ef5",
    items: [
      { text: "Camada Ouro do Vision: regras de negócio", vision: true },
      { text: "Geobox + N100 no Fleets" },
      { text: "Informs na App Store" },
      { text: "Gestão de Obras de prateleira" },
      { text: "Agente com MCP" },
    ],
  },
  {
    title: "Explorando",
    accent: "#3a7ce8",
    items: [
      { text: "Vision on demand para todos", vision: true },
      { text: "Informs ↔ Vision em tempo real", vision: true },
      { text: "Zeladoria para munícipes" },
      { text: "MCPs em tudo" },
    ],
  },
];

export default function Slide15Roadmap({ action }: SlideProps) {
  const showMap = action === STEP_TODAY || action === STEP_GOAL;
  const revealed = action === STEP_GOAL;

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.h1
          {...up(0.0)}
          className="text-[40px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
        >
          Roadmap · próximo semestre
        </motion.h1>
        <motion.p
          {...up(0.1)}
          className="mt-3 text-[22px] font-medium text-text/70 leading-[1.4] tracking-[-0.01em]"
        >
          Agora, próximo e explorando — com o{" "}
          <em className="not-italic text-purple">Vision no centro.</em>
        </motion.p>
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
        <div key="colunas" className="flex-1 min-h-0 grid grid-cols-3 gap-5">
          {columns.map((col, ci) => (
            <motion.div
              key={col.title}
              {...up(0.25 + ci * 0.12, easeIn)}
              className="border border-text/10 bg-black/2 flex flex-col overflow-hidden"
            >
              <div
                className="h-[6px] w-full"
                style={{ background: col.accent }}
              />
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
                      key={it.text}
                      {...up(0.4 + ci * 0.12 + ii * 0.07, easeIn)}
                      className={`border-l-2 px-4 py-3 text-[17px] leading-[1.3] ${
                        it.vision
                          ? "font-bold text-text"
                          : "font-medium text-text/85"
                      }`}
                      style={{
                        borderColor: it.vision ? "#7c3aed" : col.accent,
                        background: it.vision
                          ? "rgba(124,58,237,0.07)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      {it.vision && <span className="text-purple mr-2">✦</span>}
                      {it.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
