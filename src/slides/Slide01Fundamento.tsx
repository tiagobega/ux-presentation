import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import { Layers, BarChart2, Smartphone, Monitor, FileText, Zap } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

interface Problem {
  Icon: LucideIcon;
  title: string;
  body: string;
  solution: string;
  impact: string;
}

const problems: Problem[] = [
  {
    Icon: Layers,
    title: "Sem padrão visual entre módulos",
    body: "Cada parte da plataforma foi construída em momentos diferentes. A experiência é fragmentada — mesmo que o produto técnico seja sólido.",
    solution: "Design system com tokens, componentes e padrões documentados e versionados.",
    impact: "Produto percebido como maduro em qualquer tela que o cliente abrir.",
  },
  {
    Icon: BarChart2,
    title: "O gestor vê dados, não consegue agir",
    body: "Informação sem contexto de decisão é ruído. O gestor que não entende o que está vendo não renova, não expande, não indica.",
    solution: "Dashboards por perfil com hierarquia visual clara e exportação pronta para apresentação.",
    impact: "Gestor que entende o dado vira defensor do produto na câmara.",
  },
  {
    Icon: Smartphone,
    title: "O operador de campo trava e pede ajuda",
    body: "Sem fluxo guiado, cada operação depende de memória ou ligação para o suporte. Isso não escala.",
    solution: "Wizard por tipo de operação — instalação, verificação, manutenção — com checklist e confirmação.",
    impact: "Operação autônoma que não depende de suporte para funcionar.",
  },
  {
    Icon: Monitor,
    title: "A demo não converte na primeira reunião",
    body: "A demonstração é densa demais para quem vê pela primeira vez. O ciclo de vendas se alonga porque o prospect precisa de mais reuniões para entender o valor.",
    solution: "Fluxo de onboarding e demo desenhado para mostrar valor em minutos, não horas.",
    impact: "Reunião de vendas que já demonstra valor antes do contrato.",
  },
  {
    Icon: FileText,
    title: "Sem identidade de produto, cada peça começa do zero",
    body: "Sem linguagem visual e vocabulário de produto definidos, agências e parceiros não trabalham com autonomia. Cada peça é lenta, cara e inconsistente.",
    solution: "Stack IC com nomenclatura, cores e papéis definidos por produto.",
    impact: "Comunicação produzida com velocidade e coerência por qualquer parceiro.",
  },
  {
    Icon: Zap,
    title: "O produto não fala por si",
    body: "Quando alguém vê a plataforma pela primeira vez, precisa de alguém para explicar. Um produto maduro comunica valor sem mediação.",
    solution: "UX e branding trabalhando juntos para que o produto seja autoexplicativo.",
    impact: "Ciclo de venda mais curto e menor custo de onboarding.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide01Fundamento({ action: _ }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          UX &amp; Branding · Os problemas
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          O que está travando
          <br />a Intelicity <em className="not-italic text-purple">agora.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          Seis problemas que têm resposta — mas ainda não foram resolvidos. Cada um tem um custo
          concreto hoje e uma solução clara quando UX e branding trabalham juntos.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pb-4">
        <div className="grid grid-cols-2 gap-2">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              {...up(0.32 + i * 0.08, easeIn)}
              className="p-5 bg-black/2 border border-text/8 flex flex-col gap-3"
            >
              <p.Icon className="size-4 text-purple/40" />
              <div className="text-[13px] font-semibold text-text/85">{p.title}</div>
              <div className="text-xs font-light text-gray-950 leading-[1.65]">{p.body}</div>
              <div className="border-l-2 border-purple/30 bg-purple/6 px-3 py-2 text-xs text-purple/85 leading-[1.6] mt-auto">
                {p.solution}
              </div>
              <div className="border-l-2 border-emerald-500/40 bg-emerald-500/[0.05] px-3 py-2 text-xs text-emerald-700/80 leading-[1.6]">
                {p.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
