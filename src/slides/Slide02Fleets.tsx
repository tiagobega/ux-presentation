import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import { UploadCloud, LayoutGrid, Bell } from "lucide-react";
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

const fronts: { Icon: LucideIcon; num: string; name: string; desc: string }[] = [
  {
    Icon: UploadCloud,
    num: "01",
    name: "Ingestão de dados",
    desc: "A porta de entrada de todos os dispositivos de campo.",
  },
  {
    Icon: LayoutGrid,
    num: "02",
    name: "Plataforma",
    desc: "Onde os projetos, veículos e hardwares são gerenciados.",
  },
  {
    Icon: Bell,
    num: "03",
    name: "Alertas",
    desc: "Detectar, avisar e resolver problemas em campo.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide02Fleets({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Intelifleets
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          O <em className="not-italic text-purple">hub</em> que conecta as
          peças.
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[940px]"
        >
          A mesma plataforma que ingere o dado, gerencia os projetos e garante
          que ele chega confiável — organizada em três frentes.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-6 items-center">
        {fronts.map((f, i) => (
          <motion.div
            key={f.name}
            {...up(0.3 + i * 0.1, easeIn)}
            className="border border-text/10 bg-black/2 p-8 flex flex-col gap-5 h-full"
          >
            <div className="flex items-center justify-between">
              <f.Icon
                className="size-9 text-purple/60 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div className="font-mono text-[13px] tracking-[0.16em] text-purple/40">
                {f.num}
              </div>
            </div>
            <div className="text-[24px] font-bold text-text tracking-[-0.02em]">
              {f.name}
            </div>
            <div className="h-px bg-text/8" />
            <div className="text-[18px] text-text/70 leading-[1.45]">
              {f.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
