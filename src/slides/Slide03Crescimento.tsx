import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Eye,
  Lightbulb,
  Activity,
  Leaf,
  TrendingDown,
  Wind,
  Droplets,
  Tag,
  MessageSquare,
  Layers,
  Zap,
  Rss,
  ArrowDown,
} from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const dsDeliverables = [
  "Auditoria do que existe hoje — componentes, padrões e inconsistências mapeados",
  "Tokens de design — cores, tipografia, espaçamentos, bordas, sombras e grid",
  "Biblioteca de componentes — botões, inputs, tabelas, cards, modais, filtros, mapas, gráficos",
  "Padrões de interação — estados, animações e comportamentos documentados",
  "Guia de uso — exemplos de aplicação correta e incorreta por componente",
];

interface Sub {
  color: string;
  Icon: LucideIcon;
  name: string;
  desc: string;
}

interface PipelineItem {
  color: string;
  Icon: LucideIcon;
  layer: string;
  name: string;
  desc: string;
  subs: Sub[];
}

const pipeline: PipelineItem[] = [
  {
    color: "#e85151",
    Icon: Truck,
    layer: "Coleta",
    name: "IC Fleets",
    desc: "Gestão da frota de dispositivos e agentes. Onde o UX da operação vive.",
    subs: [],
  },
  {
    color: "#7c6ef5",
    Icon: Eye,
    layer: "Processamento",
    name: "IC Vision",
    desc: "Processamento central por IA. Distribui para módulos especializados de acordo com a finalidade.",
    subs: [
      { color: "#d4c53a", Icon: Lightbulb, name: "IC Lumen", desc: "Luminosidade pública" },
      { color: "#7a9ab8", Icon: Activity, name: "IC Quality", desc: "Qualidade do asfalto · IRI" },
      { color: "#2d7a4e", Icon: Leaf, name: "IC Grass", desc: "Vegetação urbana" },
      { color: "#c06840", Icon: TrendingDown, name: "IC Margin", desc: "Encostas · risco" },
      { color: "#e87c3a", Icon: Wind, name: "IC Gas", desc: "Vazamento de gás" },
      { color: "#3a7ce8", Icon: Droplets, name: "IC Flood", desc: "Alagamento · alertas" },
    ],
  },
  {
    color: "#b061e8",
    Icon: Tag,
    layer: "Qualidade",
    name: "IC Classify",
    desc: "SGC — validação humana das classificações geradas pela IA. Garante confiabilidade do output.",
    subs: [],
  },
  {
    color: "#d4a53a",
    Icon: MessageSquare,
    layer: "Acesso",
    name: "IC Query",
    desc: "LLM — interface de linguagem natural para os dados. O gestor pergunta, o sistema responde.",
    subs: [],
  },
];

interface PlatformItem {
  color: string;
  Icon: LucideIcon;
  layer: string;
  name: string;
  desc: string;
}

const platformItems: PlatformItem[] = [
  { color: "#3ab8d4", Icon: Layers, layer: "Interface", name: "IC Face", desc: "Biblioteca de micro front-ends. Tudo que qualquer usuário vê passa pelo Face." },
  { color: "#3a9ed4", Icon: Zap, layer: "Inovação", name: "IC Labs", desc: "P&D. Onde os próximos produtos da cadeia são testados." },
  { color: "#3ad47e", Icon: Rss, layer: "Comunicação", name: "IC News", desc: "Canal de releases, novidades e cases." },
];

export default function Slide03Crescimento({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          A solução
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          Uma resposta para
          <br />todos os <em className="not-italic text-purple">problemas.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          O design system resolve a inconsistência da plataforma. A Stack IC nomeia e organiza o
          ecossistema de produtos. Juntos, criam a base para que o produto cresça com coerência.
        </motion.p>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto pb-4">
        {action === "Design System" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Fase 0 · antes de qualquer tela nova
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-4"
            >
              O design system não é
              <br />um entregável paralelo. É a fundação.
            </motion.h2>
            <motion.p {...up(0.25)} className="text-gray-950 leading-[1.75] max-w-[580px] mb-5">
              Tokens de cor, tipografia, espaçamento, componentes, estados, padrões de interação —
              tudo documentado e versionado. Quando o dev abre o Figma, não tem dúvida. Quando um
              módulo novo entra, ele segue o mesmo sistema.
            </motion.p>
            <div className="flex flex-col gap-[2px]">
              {dsDeliverables.map((d, i) => (
                <motion.div
                  key={i}
                  {...up(0.35 + i * 0.08, easeIn)}
                  className="flex gap-4 px-5 py-[13px] border border-text/8 bg-black/2 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-purple/8 border border-purple/20 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-purple/55">
                    {i + 1}
                  </div>
                  <div className="text-xs font-light text-gray-950 leading-[1.65] pt-[3px]">{d}</div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {action === "Stack IC" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              O ecossistema completo
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-5"
            >
              Da coleta à decisão.
              <br />Cada produto IC é uma camada da cadeia.
            </motion.h2>
            <div className="flex flex-col gap-[2px]">
              {pipeline.map((node, i) => (
                <div key={node.name}>
                  <motion.div
                    {...up(0.25 + i * 0.1, easeIn)}
                    className="group flex items-stretch border border-black/8 overflow-hidden"
                  >
                    <div className="w-1 flex-shrink-0" style={{ background: node.color }} />
                    <div className="px-5 py-[11px] flex-1 relative">
                      <div className="absolute inset-0 opacity-[0.04]" style={{ background: node.color }} />
                      <div className="relative z-[1]">
                        <div className="flex items-center gap-2 mb-[3px]">
                          <node.Icon className="size-3" style={{ color: node.color }} />
                          <div className="font-mono text-[9px] tracking-[0.14em] text-black/38 uppercase">
                            {node.layer}
                          </div>
                        </div>
                        <div className="text-[15px] font-semibold text-black/85 mb-[3px]">{node.name}</div>
                        <div className="text-xs font-light text-black/48 leading-[1.6]">{node.desc}</div>
                        {node.subs.length > 0 && (
                          <div className="flex flex-wrap gap-[5px] mt-[8px]">
                            {node.subs.map((s) => (
                              <div
                                key={s.name}
                                className="flex items-center gap-[5px] px-[8px] py-[3px] border border-black/8 bg-black/2"
                              >
                                <s.Icon className="size-[9px]" style={{ color: s.color }} />
                                <span className="font-mono text-[9px] text-black/55 tracking-[0.08em]">
                                  {s.name}
                                </span>
                                <span className="text-[9px] text-black/30 font-light">· {s.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  {i < pipeline.length - 1 && (
                    <motion.div
                      {...up(0.25 + i * 0.1 + 0.06, easeIn)}
                      className="flex justify-start pl-[22px] py-[2px]"
                    >
                      <ArrowDown className="size-3 text-purple/25" />
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.div {...up(0.75, easeIn)} className="grid grid-cols-3 gap-[2px] mt-[2px]">
                {platformItems.map((p) => (
                  <div key={p.name} className="flex items-stretch border border-black/8 overflow-hidden">
                    <div className="w-1 flex-shrink-0" style={{ background: p.color }} />
                    <div className="px-4 py-[10px] flex-1 relative">
                      <div className="absolute inset-0 opacity-[0.04]" style={{ background: p.color }} />
                      <div className="relative z-[1]">
                        <div className="flex items-center gap-2 mb-[3px]">
                          <p.Icon className="size-3" style={{ color: p.color }} />
                          <div className="font-mono text-[9px] tracking-[0.14em] text-black/38 uppercase">
                            {p.layer}
                          </div>
                        </div>
                        <div className="text-[13px] font-semibold text-black/85 mb-[2px]">{p.name}</div>
                        <div className="text-xs font-light text-black/48 leading-[1.6]">{p.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
