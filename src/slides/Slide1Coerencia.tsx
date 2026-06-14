import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  Layers,
  BarChart2,
  MousePointerClick,
  Clock,
  Megaphone,
  Boxes,
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

const dores: { Icon: LucideIcon; title: string }[] = [
  { Icon: Layers, title: "Produtos com experiências e fluxos confusos." },
  {
    Icon: BarChart2,
    title: "Dados jogados ao usuário sem narrativa de decisão.",
  },
  { Icon: MousePointerClick, title: "Fluxos importantes com baixa conclusão." },
  { Icon: Clock, title: "Valor do produto demorando para aparecer." },
  { Icon: Megaphone, title: "Comunicação comercial discrepante com produto." },
  { Icon: Boxes, title: "Ecossistema sem uma lógica clara." },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide1Coerencia({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-20 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-red-500/55 mb-4 uppercase"
        >
          O problema · Diagnóstico
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[56px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          Os problemas que enfrentamos{" "}
          <em className="not-italic text-red-600">hoje.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-8">
        {dores.map((d, i) => (
          <motion.div
            key={d.title}
            {...up(0.3 + i * 0.08, easeIn)}
            className="p-8 bg-red-500/[0.03] border border-red-500/15 border-l-[3px] border-l-red-500/45 flex items-center gap-6"
          >
            <d.Icon
              className="size-11 text-red-500/70 flex-shrink-0"
              strokeWidth={1.5}
            />
            <div className="text-[24px] font-semibold text-text/90 leading-[1.15] tracking-[-0.02em]">
              {d.title}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...up(0.85, easeIn)}
        className="text-center text-[23px] font-light text-text/70 leading-[1.5] max-w-[1150px] mx-auto"
      >
        Temos produtos, dados e iniciativas com muito potencial. O desafio
        agora é fazer com que nossa evolução seja percebida como uma{" "}
        <span className="text-purple font-medium">
          experiência clara, consistente e conectada.
        </span>
      </motion.p>
    </div>
  );
}
