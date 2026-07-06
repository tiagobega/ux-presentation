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

const mcps: { name: string; desc: string }[] = [
  { name: "detecções", desc: "Defeitos viários vistos pela IA" },
  { name: "pavimento", desc: "Qualidade de pavimento (IRI)" },
  { name: "recape", desc: "Obras de recapeamento" },
  { name: "geoinfra", desc: "Intervenções na via (GAIA)" },
  { name: "sabesp", desc: "Multas contra a SABESP" },
  { name: "geo", desc: "Vias e regiões de SP" },
];

const claudeBullets: { Icon: LucideIcon; text: string }[] = [
  { Icon: Sparkles, text: "Diferencial claro no projeto SABESP" },
  {
    Icon: TrendingUp,
    text: "Times que adotaram performam visivelmente melhor",
  },
  { Icon: Database, text: "Integração com nossos bancos via MCP" },
  {
    Icon: MessageSquare,
    text: "Uma pergunta em linguagem natural vira uma query",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide14Padroes({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.h1
          {...up(0.0)}
          className="text-[34px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
        >
          Padrões · Claude, dev com IA e MCPs
        </motion.h1>
        <motion.p
          {...up(0.1)}
          className="mt-2 text-[19px] font-medium text-text/70 leading-[1.35] tracking-[-0.01em]"
        >
          Claude, specs e MCPs —{" "}
          <em className="not-italic text-purple">um único fluxo de IA.</em>
        </motion.p>
        <motion.p
          {...up(0.18)}
          className="mt-2 text-[17px] text-text/65 leading-[1.5] max-w-[1000px]"
        >
          A IA não é autocomplete — é parte do processo, do Claude corporativo
          ao contexto que os MCPs entregam a cada etapa.
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
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-8 items-center">
        {/* Claude */}
        <motion.div
          {...up(0.55, easeIn)}
          className="border border-text/10 bg-black/2 p-7 flex flex-col gap-8 h-[400px]"
        >
          <div className="font-mono text-[24px] tracking-[0.18em] uppercase text-purple/85">
            Claude corporativo
          </div>
          <div className="flex flex-col gap-6">
            {claudeBullets.map((b) => (
              <div key={b.text} className="flex items-start gap-4">
                <b.Icon
                  className="size-8 mt-0.5 text-purple/60 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="text-[17px] text-text/85 leading-[1.35]">
                  {b.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MCPs */}
        <motion.div
          {...up(0.65, easeIn)}
          className="border border-text/10 bg-black/2 p-7 flex flex-col gap-4 h-[400px]"
        >
          <div className="font-mono text-[24px] tracking-[0.18em] uppercase text-purple/85">
            MCPs
          </div>
          <div className="text-[16px] text-text/75 leading-[1.4]">
            6 servidores que construímos + o MCP nativo da Oracle — o mesmo
            conector serve qualquer LLM ou agente.
          </div>
          <div className="grid grid-cols-3 gap-2.5 flex-1">
            {mcps.map((m) => (
              <div
                key={m.name}
                className="border border-purple/30 bg-purple/[0.06] p-3 flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <div className="font-mono text-[15px] tracking-[0.1em] uppercase text-purple">
                  {m.name}
                </div>
                <div className="text-[14px] text-text/75 leading-[1.25]">
                  {m.desc}
                </div>
              </div>
            ))}
            <div className="col-span-3 border border-purple/45 bg-purple/[0.09] p-3 flex items-center justify-center gap-3">
              <div className="font-mono text-[15px] tracking-[0.1em] uppercase text-purple shrink-0">
                oracle · nativo
              </div>
              <div className="text-[14px] text-text/80 leading-[1.25]">
                relatório de gastos e uso da nuvem — conclusões em minutos
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
