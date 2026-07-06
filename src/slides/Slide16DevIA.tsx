import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import type { LucideIcon } from "lucide-react";
import { FileText, BookOpen, Boxes, Plug, Code2, ChevronRight } from "lucide-react";

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

const steps: { Icon: LucideIcon; label: string }[] = [
  { Icon: FileText, label: "Specs" },
  { Icon: BookOpen, label: "Docs" },
  { Icon: Boxes, label: "IcePanel" },
  { Icon: Plug, label: "MCPs" },
  { Icon: Code2, label: "Código" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide16DevIA({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-10 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Padrões · dev com IA
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          A IA não é autocomplete —{" "}
          <em className="not-italic text-purple">é parte do processo.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s.label} className="contents">
              <motion.div
                {...up(0.3 + i * 0.12, easeIn)}
                className="w-[170px] border border-purple/20 bg-purple/[0.04] px-6 py-7 flex flex-col items-center gap-3"
              >
                <s.Icon className="size-8 text-purple/65" strokeWidth={1.5} />
                <div className="text-[22px] font-bold text-text tracking-[-0.01em]">
                  {s.label}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div {...up(0.4 + i * 0.12)} className="shrink-0">
                  <ChevronRight className="size-7 text-purple/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        {...up(0.95, easeIn)}
        className="border-t border-text/10 pt-6 text-center"
      >
        <div className="text-[22px] font-bold text-text tracking-[-0.02em]">
          Um novo workflow de engenharia,{" "}
          <span className="text-purple">alimentado com o contexto certo.</span>
        </div>
      </motion.div>
    </div>
  );
}
