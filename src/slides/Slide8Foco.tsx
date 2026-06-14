import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import { Truck, Eye, Building2 } from "lucide-react";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const fronts: {
  Icon: LucideIcon;
  color: string;
  name: string;
  sub: string;
  ux: string;
}[] = [
  {
    Icon: Truck,
    color: "#e85151",
    name: "Fleets",
    sub: "operação · dispositivos · OS · controle",
    ux: "Plataforma com experiência validada para os diferentes fluxos e tipos de usuário.",
  },
  {
    Icon: Eye,
    color: "#7c6ef5",
    name: "Vision",
    sub: "análise · detecções · contexto",
    ux: "Demo interativa em apresentações e feiras — retém atenção e desperta curiosidade.",
  },
  {
    Icon: Building2,
    color: "#3a7ce8",
    name: "SABESP",
    sub: "validação real com cliente",
    ux: "Aplicativo direcionado, com dados relevantes e experiência fluida por necessidade.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide8Foco({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-7 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Onde começamos
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          Onde o <em className="not-italic text-purple">UX entra</em> em cada frente.
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
          {fronts.map((f, i) => (
            <motion.div
              key={f.name}
              {...up(0.25 + i * 0.1, easeIn)}
              className="relative border border-text/10 bg-black/2 overflow-hidden flex flex-col"
            >
              <div className="h-[6px] w-full" style={{ background: f.color }} />
              <div className="p-8 flex flex-col gap-5 flex-1">
                <div className="flex items-center gap-4">
                  <f.Icon className="size-9 flex-shrink-0" style={{ color: f.color }} strokeWidth={1.5} />
                  <div className="text-[30px] font-bold text-text tracking-[-0.02em]">{f.name}</div>
                </div>
                <div className="text-[13px] font-light text-text/45 leading-[1.4]">{f.sub}</div>
                <div className="h-px bg-text/8" />
                <div className="font-mono text-[11px] tracking-[0.16em] text-purple/55 uppercase">
                  UX entra como
                </div>
                <div className="text-[20px] font-semibold text-text/90 leading-[1.3] tracking-[-0.01em]">
                  {f.ux}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* foundation bar */}
        <motion.div
          {...up(0.6, easeIn)}
          className="border border-purple/30 bg-purple/[0.07] px-9 py-5"
        >
          <div className="font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase mb-1.5">
            Fundação · UX para a empresa
          </div>
          <div className="text-[22px] font-bold text-text tracking-[-0.02em]">
            Design System e paradigmas de comunicação{" "}
            <span className="text-[17px] font-light text-text/50">
              — a base que conecta as três frentes
            </span>
          </div>
        </motion.div>
      </div>

      {/* thesis */}
      <motion.div {...up(0.8)}>
        <div className="text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.25]">
          O objetivo não é apresentar mais uma ideia.{" "}
          <span className="text-purple">
            É criar um eixo: experiência, comunicação e produto na mesma direção.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
