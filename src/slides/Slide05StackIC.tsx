import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import { Layers, Eye, Building2 } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

interface FocusArea {
  color: string;
  Icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
}

const focusAreas: FocusArea[] = [
  {
    color: "#e85151",
    Icon: Layers,
    tag: "IC Fleets",
    title: "Finalizar a plataforma",
    body: "A plataforma de gestão tem módulos prontos, módulos parciais e módulos que ainda não existem. O trabalho de UX começa pelo design system — sem ele, cada módulo novo aprofunda a inconsistência. Depois, módulo por módulo, até o produto estar completo e coerente.",
  },
  {
    color: "#7c6ef5",
    Icon: Eye,
    tag: "IC Vision",
    title: "Estruturar o processamento",
    body: "Com os produtos de processamento crescendo — Lumen, Quality, Grass, Margin, Gas, Flood — a camada de Vision precisa de uma arquitetura de informação que sustente essa expansão. O UX define como cada produto especializado se apresenta, como os dados são exibidos e como o gestor navega entre eles.",
  },
  {
    color: "#3a7ce8",
    Icon: Building2,
    tag: "SABESP",
    title: "Primeiro caso de uso externo",
    body: "O contrato com a SABESP é a oportunidade de validar a cadeia completa com um cliente real. Significa ter a coleta, o processamento, a qualidade e o acesso funcionando de ponta a ponta — com uma experiência que o cliente consiga usar sem treinamento extenso.",
  },
];

const reasons = [
  {
    label: "IC Fleets",
    body: "Organiza a operação. É onde o time passa mais tempo e onde o cliente passa a maior parte da experiência com a plataforma.",
  },
  {
    label: "IC Vision",
    body: "Estrutura o produto. Com vários módulos especializados crescendo, a arquitetura de informação precisa ser definida agora.",
  },
  {
    label: "SABESP",
    body: "Valida a cadeia no mundo real. Com os três funcionando bem, o caminho para novos clientes e novos produtos fica muito mais claro.",
  },
];

export default function Slide05StackIC({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Plano de ação
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          O que estamos
          <br />entregando <em className="not-italic text-purple">agora.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          Não dá para fazer tudo ao mesmo tempo. O foco atual está em três frentes que formam a
          base de tudo que vem depois.
        </motion.p>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto pb-4">
        {action === "Foco" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Três frentes de trabalho
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-5"
            >
              Cada frente tem um papel
              <br />claro no núcleo do produto.
            </motion.h2>
            <div className="flex flex-col gap-2">
              {focusAreas.map((f, i) => (
                <motion.div
                  key={f.tag}
                  {...up(0.25 + i * 0.1, easeIn)}
                  className="group flex items-stretch border border-black/8 overflow-hidden"
                >
                  <div className="w-1 flex-shrink-0" style={{ background: f.color }} />
                  <div className="px-5 py-4 flex-1 relative">
                    <div
                      className="absolute inset-0 opacity-[0.04] transition-opacity group-hover:opacity-[0.07]"
                      style={{ background: f.color }}
                    />
                    <div className="relative z-[1]">
                      <div className="flex items-center gap-2 mb-[5px]">
                        <f.Icon className="size-3" style={{ color: f.color }} />
                        <div
                          className="font-mono text-[9px] tracking-[0.16em] uppercase"
                          style={{ color: f.color }}
                        >
                          {f.tag}
                        </div>
                      </div>
                      <div className="text-[16px] font-semibold text-text mb-[6px]">{f.title}</div>
                      <div className="text-xs font-light text-gray-950 leading-[1.65]">{f.body}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {action === "Razão" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Por que esse foco
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-4"
            >
              Esses três entregam o núcleo.
            </motion.h2>
            <motion.p {...up(0.25)} className="text-gray-950 leading-[1.75] max-w-[560px] mb-6">
              Com os três funcionando bem, o caminho para novos clientes e novos produtos fica
              muito mais claro. Cada frente cumpre um papel diferente na construção do todo.
            </motion.p>
            <div className="flex flex-col gap-[2px]">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.label}
                  {...up(0.35 + i * 0.1, easeIn)}
                  className="flex gap-6 py-4 px-5 border border-text/8 bg-black/2 items-start"
                >
                  <div className="font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase whitespace-nowrap pt-px min-w-[80px]">
                    {r.label}
                  </div>
                  <div className="text-xs font-light text-gray-950 leading-[1.65]">{r.body}</div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
