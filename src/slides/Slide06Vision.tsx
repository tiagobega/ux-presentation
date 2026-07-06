import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import {
  Medal,
  ChevronRight,
  Image,
  Building2,
  Share2,
  Droplets,
} from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];
const drama: [number, number, number, number] = [0.77, 0, 0.22, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const STEP2 = "A foto atravessa";
const STEP3 = "Onde isso escala";

const layers = [
  {
    color: "#b08d57",
    tier: "Bronze",
    name: "Validação",
    desc: "Qualidade, integridade e metadados da foto.",
    center: "16.67%",
  },
  {
    color: "#9aa4b2",
    tier: "Prata",
    name: "Detecção",
    desc: "O que existe na imagem.",
    center: "50%",
  },
  {
    color: "#d4af37",
    tier: "Ouro",
    name: "Regras de negócio",
    desc: "O que aquilo significa para o contrato e o cliente.",
    center: "83.33%",
  },
];

const expansions = [
  {
    Icon: Building2,
    title: "SABESP",
    desc: "Produção no próximo mês — primeiro cliente real.",
  },
  {
    Icon: Share2,
    title: "On demand",
    desc: "Análise de fotos para qualquer pessoa ou sistema.",
  },
  {
    Icon: Droplets,
    title: "Novas verticais",
    desc: "Saneamento e outros setores além das Jetsons.",
  },
];

export default function Slide06Vision({ action }: SlideProps) {
  const phase = action === STEP3 ? 2 : action === STEP2 ? 1 : 0;
  const activeLayer = Math.min(phase, layers.length - 1);

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.h1
          {...up(0.0)}
          className="text-[40px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
        >
          Intelivision · arquitetura e expansão
        </motion.h1>
        <motion.p
          {...up(0.1)}
          className="mt-3 text-[22px] font-medium text-text/70 leading-[1.4] tracking-[-0.01em]"
        >
          Bronze, Prata e <em className="not-italic text-purple">Ouro.</em>
        </motion.p>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[940px]"
        >
          Pipeline em camadas. Uma foto atravessa o fluxo e, a cada camada,
          ganha mais significado, a mesma arquitetura que agora vira serviço de
          visão da empresa.
        </motion.p>
      </div>

      {/* trilho da foto + camadas: a foto passa bem em cima, revelando o que cada uma faz */}
      <div className="min-h-0 flex flex-col gap-2 pt-20">
        <div className="relative h-9 shrink-0">
          <motion.div
            initial={false}
            animate={{ left: layers[activeLayer].center }}
            transition={{ duration: 1.2, ease: drama }}
            className="absolute bottom-0 -translate-x-1/2 flex items-center gap-2 border border-purple/40 bg-purple/[0.08] px-4 py-2"
          >
            <Image className="size-4 text-purple" strokeWidth={1.75} />
            <span className="text-[13px] font-mono tracking-[0.1em] text-purple/80 uppercase">
              foto
            </span>
          </motion.div>
        </div>
        <div className="flex-1 min-h-0 flex items-center gap-3">
          {layers.map((l, i) => {
            const revealed = i <= activeLayer;
            return (
              <div key={l.tier} className="contents">
                <motion.div
                  {...up(0.3 + i * 0.12, easeIn)}
                  className="flex-1 h-full max-h-[200px] border border-text/10 bg-black/2 overflow-hidden flex flex-col"
                >
                  <div
                    className="h-[6px] w-full"
                    style={{ background: l.color }}
                  />
                  <div className="p-8 flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Medal
                        className="size-8"
                        style={{ color: l.color }}
                        strokeWidth={1.5}
                      />
                      <div
                        className="font-mono text-[13px] tracking-[0.18em] uppercase"
                        style={{ color: l.color }}
                      >
                        {l.tier}
                      </div>
                    </div>
                    <div className="text-[27px] font-bold text-text tracking-[-0.02em] leading-[1.1]">
                      {l.name}
                    </div>
                    <div className="h-px bg-text/8" />
                    {revealed ? (
                      <motion.div
                        key="desc"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: easeOut }}
                        className="text-[18px] text-text/70 leading-[1.45] mt-auto"
                      >
                        {l.desc}
                      </motion.div>
                    ) : (
                      <div className="text-[18px] text-text/20 leading-[1.45] mt-auto">
                        ···
                      </div>
                    )}
                  </div>
                </motion.div>
                {i < layers.length - 1 && (
                  <motion.div {...up(0.4 + i * 0.12)} className="shrink-0">
                    <ChevronRight className="size-8 text-purple/40" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        key="expansao"
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{
          duration: 0.35,
          ease: easeIn,
          delay: phase >= 2 ? 0.2 : 0,
        }}
        style={{ pointerEvents: phase >= 2 ? "auto" : "none" }}
        className="border-t border-text/10 pt-5 flex flex-col gap-4 shrink-0"
      >
        <div className="text-center text-[16px] font-mono tracking-[0.14em] uppercase text-purple/50">
          Arquitetura reutilizavel, pronta para novos clientes e verticais
        </div>
        <div className="grid grid-cols-3 gap-4">
          {expansions.map((e, i) => (
            <motion.div
              key={`${e.title}-${phase >= 2}`}
              {...up(phase >= 2 ? 0.32 + i * 0.1 : 0, easeIn)}
              className="border border-purple/20 bg-purple/[0.04] px-6 py-5 flex items-start gap-3.5"
            >
              <e.Icon
                className="size-6 mt-0.5 text-purple/70 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div className="flex flex-col gap-1">
                <div className="text-[18px] font-bold text-text tracking-[-0.01em]">
                  {e.title}
                </div>
                <div className="text-[15px] text-text/65 leading-[1.35]">
                  {e.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
