import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  BookOpen,
  Boxes,
  Plug,
  Code2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Database,
  MessageSquare,
  Cable,
  Bot,
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

const steps: { Icon: LucideIcon; label: string }[] = [
  { Icon: FileText, label: "Specs" },
  { Icon: BookOpen, label: "Docs" },
  { Icon: Boxes, label: "IcePanel" },
  { Icon: Plug, label: "MCPs" },
  { Icon: Code2, label: "Código" },
];

const claudeBullets: { Icon: LucideIcon; text: string }[] = [
  { Icon: Sparkles, text: "Diferencial claro no projeto SABESP" },
  { Icon: TrendingUp, text: "Times que adotaram performam visivelmente melhor" },
  { Icon: Database, text: "Integração com nossos bancos via MCP" },
  { Icon: MessageSquare, text: "Uma pergunta em linguagem natural vira uma query" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide14Padroes({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="inline-block font-mono text-sm font-bold tracking-[0.2em] text-purple mb-4 uppercase bg-purple/10 border border-purple/25 px-3 py-1.5"
        >
          Padrões · Claude, dev com IA e MCPs
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[44px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Claude, specs e MCPs —{" "}
          <em className="not-italic text-purple">um único fluxo de IA.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[17px] text-text/50 leading-[1.5] max-w-[1000px]"
        >
          A IA não é autocomplete — é parte do processo, do Claude
          corporativo ao contexto que os MCPs entregam a cada etapa.
        </motion.p>
      </div>

      {/* pipeline compacto */}
      <div className="flex items-center justify-center gap-2 shrink-0">
        {steps.map((s, i) => (
          <div key={s.label} className="contents">
            <motion.div
              {...up(0.25 + i * 0.08, easeIn)}
              className="w-[128px] border border-purple/20 bg-purple/[0.04] px-4 py-4 flex flex-col items-center gap-2"
            >
              <s.Icon className="size-6 text-purple/65" strokeWidth={1.5} />
              <div className="text-[16px] font-bold text-text tracking-[-0.01em]">
                {s.label}
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div {...up(0.32 + i * 0.08)} className="shrink-0">
                <ChevronRight className="size-6 text-purple/40" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* duas colunas: Claude corporativo · MCPs */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-8">
        {/* Claude */}
        <motion.div
          {...up(0.55, easeIn)}
          className="border border-text/10 bg-black/2 p-7 flex flex-col gap-4"
        >
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-purple/55">
            Claude corporativo — para todo o time
          </div>
          <div className="flex flex-col gap-3">
            {claudeBullets.map((b) => (
              <div key={b.text} className="flex items-start gap-3">
                <b.Icon
                  className="size-5 mt-0.5 text-purple/60 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="text-[16px] text-text/80 leading-[1.35]">
                  {b.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MCPs */}
        <motion.div
          {...up(0.65, easeIn)}
          className="border border-text/10 bg-black/2 p-7 flex flex-col gap-4"
        >
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-purple/55">
            MCPs — o USB-C das integrações com IA
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="border border-text/12 bg-black/2 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Cable className="size-5 text-text/45" strokeWidth={1.5} />
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-text/45">
                  Antes
                </div>
              </div>
              <div className="text-[16px] font-bold text-text/80 leading-[1.2]">
                N × M integrações artesanais
              </div>
            </div>
            <div className="border border-purple/25 bg-purple/[0.05] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Plug className="size-5 text-purple/70" strokeWidth={1.5} />
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-purple/60">
                  Depois
                </div>
              </div>
              <div className="text-[16px] font-bold text-text leading-[1.2]">
                N conectores reutilizáveis
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[15px] text-text/70">
            <Bot className="size-5 text-purple/60 flex-shrink-0" strokeWidth={1.5} />
            Onde estamos: começamos pela LLM; um agente está em integração agora.
          </div>
        </motion.div>
      </div>

      <motion.div
        {...up(0.9, easeIn)}
        className="border-t border-text/10 pt-5 text-center"
      >
        <div className="text-[20px] font-bold text-text tracking-[-0.02em]">
          Um novo workflow de engenharia,{" "}
          <span className="text-purple">alimentado com o contexto certo.</span>
        </div>
      </motion.div>
    </div>
  );
}
