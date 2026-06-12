import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Briefcase, Monitor, Smartphone } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const chain = [
  { accent: "rgba(124,58,237,0.18)", label: "Coleta em campo", title: "Fiscalização" },
  { accent: "rgba(124,58,237,0.34)", label: "Captura técnica", title: "Dados" },
  { accent: "rgba(124,58,237,0.52)", label: "Processamento", title: "Contexto" },
  { accent: "rgba(124,58,237,0.70)", label: "Organização", title: "Informação" },
  { accent: "rgba(124,58,237,0.90)", label: "Clareza", title: "Decisão" },
];

interface Persona {
  Icon: LucideIcon;
  role: string;
  name: string;
  context: string;
  pain: string;
  gain: string;
}

const personas: Persona[] = [
  {
    Icon: Briefcase,
    role: "Cliente · Decisor",
    name: "Gestor de Cidade",
    context:
      "Numa reunião de câmara com 3 minutos para justificar um investimento. Precisa de dados claros que contem uma história, não de dashboards que exigem interpretação.",
    pain: "Abre o sistema e não sabe por onde começar.",
    gain: "Com UX: visualização que já chega organizada para o argumento que ele precisa fazer.",
  },
  {
    Icon: Monitor,
    role: "Interno · Gestão",
    name: "Operador de Sistema",
    context:
      "Passa a maior parte do dia dentro do sistema. Configura, monitora, extrai relatórios. Qualquer atrito no fluxo vira perda de tempo multiplicada por horas.",
    pain: "Fluxos inconsistentes que exigem memorização de caminhos diferentes por módulo.",
    gain: "Com UX: sistema que se comporta de forma previsível em todos os módulos.",
  },
  {
    Icon: Smartphone,
    role: "Interno · Execução",
    name: "Operador de Campo",
    context:
      "Celular na mão, conexão instável, sem tempo para dúvida. Pode ser instalador, moto verificador ou outro perfil em campo.",
    pain: "Precisa ligar para alguém para saber se fez certo.",
    gain: "Com UX: wizard passo a passo com confirmação imediata, sem margem para erro.",
  },
];

export default function Slide02Desafio({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Intelicity · Contexto
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          O que a Intelicity faz —
          <br />e onde está o <em className="not-italic text-purple">déficit.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          A Intelicity coleta dados de cidades, processa com IA e entrega informação para gestores
          decidirem com precisão. A cadeia existe. O problema é que a experiência que a envolve
          ainda não acompanha a maturidade técnica do produto.
        </motion.p>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto pb-4">
        {action === "Cadeia" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Da coleta à decisão
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-5"
            >
              Cinco camadas que transformam
              <br />território em decisão.
            </motion.h2>
            <div className="flex items-stretch gap-1 mb-3">
              {chain.map((c, i) => (
                <div key={c.title} className="flex items-center gap-1 flex-1">
                  <motion.div
                    {...up(0.25 + i * 0.08, easeIn)}
                    className="flex-1 border border-text/8 bg-black/2 overflow-hidden"
                  >
                    <div className="h-[3px]" style={{ background: c.accent }} />
                    <div className="px-4 py-3">
                      <div className="font-mono text-[9px] tracking-[0.14em] text-purple/40 uppercase mb-1">
                        {c.label}
                      </div>
                      <div className="text-[15px] font-semibold text-text/80">{c.title}</div>
                    </div>
                  </motion.div>
                  {i < chain.length - 1 && (
                    <motion.div {...up(0.25 + i * 0.08 + 0.04, easeIn)}>
                      <ArrowRight className="size-3 text-purple/25 flex-shrink-0" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <motion.div
              {...up(0.7, easeIn)}
              className="border border-purple/20 bg-purple/[0.04] p-5 flex gap-5 items-start"
            >
              <div className="w-1 self-stretch bg-purple/60 flex-shrink-0 rounded-full" />
              <div>
                <div className="font-mono text-[9px] tracking-[0.14em] text-purple/55 uppercase mb-1">
                  Destino da cadeia
                </div>
                <div className="text-[18px] font-bold text-text tracking-[-0.02em] mb-2">
                  Execução precisa.
                </div>
                <div className="text-xs font-light text-gray-950 leading-[1.75]">
                  Os dados existem. O processamento existe. O que ainda falta é a experiência que
                  torna tudo isso legível — para o gestor na câmara, para o operador no campo, e
                  para o prospect na primeira demo.
                </div>
              </div>
            </motion.div>
          </>
        )}

        {action === "Personas" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Quem usa e o que precisa
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-5"
            >
              Três pessoas. Três contextos.
              <br />Uma plataforma que precisa servir a todos.
            </motion.h2>
            <div className="grid grid-cols-3 gap-2">
              {personas.map((p, i) => (
                <motion.div
                  key={p.name}
                  {...up(0.25 + i * 0.1, easeIn)}
                  className="p-5 bg-black/2 border border-text/8 flex flex-col gap-3"
                >
                  <p.Icon className="size-5 text-purple/40" />
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.18em] text-purple/45 uppercase mb-1">
                      {p.role}
                    </div>
                    <div className="text-[15px] font-semibold text-text">{p.name}</div>
                  </div>
                  <div className="text-xs font-light text-gray-950 leading-[1.65]">{p.context}</div>
                  <div className="border-l-2 border-red-400/40 bg-red-500/5 px-3 py-2 text-xs text-red-700/80 leading-[1.6]">
                    {p.pain}
                  </div>
                  <div className="border-l-2 border-purple/30 bg-purple/6 px-3 py-2 text-xs text-purple/85 leading-[1.6]">
                    {p.gain}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
