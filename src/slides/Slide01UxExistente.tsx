import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  Map,
  FileText,
  Filter,
  ClipboardList,
  GitBranch,
} from "lucide-react";

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

const artifacts: { Icon: LucideIcon; label: string }[] = [
  { Icon: BarChart2, label: "Dashboard" },
  { Icon: Map, label: "Mapa" },
  { Icon: FileText, label: "Formulário e Relatório" },
  { Icon: Filter, label: "Filtro" },
  { Icon: ClipboardList, label: "Ordem de Serviço" },
  { Icon: GitBranch, label: "Fluxo operacional" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide01UxExistente({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Ponto de partida
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Nós já utilizamos UX, mesmo quando{" "}
          <em className="not-italic text-purple">não chamamos assim.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-4 text-[18px] font-light  leading-[1.6] max-w-[1050px]"
        >
          A Intelicity vende dados, mas o cliente geralmente acessa, interpreta
          e utiliza esses dados por meio de plataformas que nós construímos.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-5">
        {artifacts.map((a, i) => (
          <motion.div
            key={a.label}
            {...up(0.3 + i * 0.08, easeIn)}
            className="border border-purple/15 bg-purple/[0.03] p-7 flex flex-col gap-4 justify-center"
          >
            <a.Icon
              className="size-9 text-purple/55 flex-shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[22px] font-semibold text-text/85 tracking-[-0.01em] leading-[1.2]">
              {a.label}
            </div>
            <div className="font-mono text-[11px] tracking-[0.12em] text-purple/40 uppercase">
              já cria uma experiência
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        {...up(0.82, easeIn)}
        className="border-t border-text/10 pt-6 text-center"
      >
        <div className="text-[28px] font-bold text-text tracking-[-0.02em]">
          Se o cliente usa uma aplicação para entender o dado,{" "}
          <span className="text-purple">
            então UX já faz parte do produto.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
