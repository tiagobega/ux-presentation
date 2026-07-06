import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Truck, Eye, Video, ClipboardList, Boxes } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const drama: [number, number, number, number] = [0.77, 0, 0.22, 1];

interface Satellite {
  Icon: LucideIcon;
  name: string;
  intro: string;
  recap: string;
  // posição do centro do card, em % do container
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  // orientação do conector até o hub
  connector: "top" | "bottom" | "left" | "right";
}

const satellites: Satellite[] = [
  {
    Icon: Eye,
    name: "IC Vision",
    intro: "visão computacional",
    recap: "fotos viram inteligência",
    pos: { left: "50%", top: "9%" },
    connector: "top",
  },
  {
    Icon: ClipboardList,
    name: "Informs",
    intro: "coleta em campo",
    recap: "coleta em campo, integra com Vision",
    pos: { left: "12%", top: "50%" },
    connector: "left",
  },
  {
    Icon: Video,
    name: "Gravata",
    intro: "streaming",
    recap: "streaming nativo no Fleets",
    pos: { right: "12%", top: "50%" },
    connector: "right",
  },
  {
    Icon: Boxes,
    name: "Novos produtos",
    intro: "de prateleira",
    recap: "Gestão de Obras · Zeladoria",
    pos: { left: "50%", bottom: "9%" },
    connector: "bottom",
  },
];

// linhas conectoras (barras finas) — origem no hub, crescem para fora
const connectors: {
  key: string;
  className: string;
  axis: "x" | "y";
  origin: string;
}[] = [
  {
    key: "top",
    className: "left-1/2 -translate-x-1/2 top-[20%] h-[19%] w-[2px]",
    axis: "y",
    origin: "bottom",
  },
  {
    key: "bottom",
    className: "left-1/2 -translate-x-1/2 top-[61%] h-[19%] w-[2px]",
    axis: "y",
    origin: "top",
  },
  {
    key: "left",
    className: "top-1/2 -translate-y-1/2 left-[21%] w-[18%] h-[2px]",
    axis: "x",
    origin: "right",
  },
  {
    key: "right",
    className: "top-1/2 -translate-y-1/2 left-[61%] w-[18%] h-[2px]",
    axis: "x",
    origin: "left",
  },
];

export default function EcosystemMap({
  variant = "intro",
}: {
  variant?: "intro" | "recap";
}) {
  const isRecap = variant === "recap";

  return (
    <div className="relative flex-1 min-h-0 w-full max-w-[1120px] mx-auto">
      {/* conectores */}
      {connectors.map((c, i) => (
        <motion.div
          key={c.key}
          className={`absolute bg-purple/30 ${c.className}`}
          style={{ transformOrigin: c.origin }}
          initial={{ scaleX: c.axis === "x" ? 0 : 1, scaleY: c.axis === "y" ? 0 : 1 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.6, ease: drama, delay: 0.5 + i * 0.08 }}
        />
      ))}

      {/* hub central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.25 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-purple/40 bg-purple/[0.08] px-9 py-6 flex flex-col items-center gap-2 min-w-[230px]"
        style={{ boxShadow: "0 0 0 6px rgba(124,58,237,0.05)" }}
      >
        <Truck className="size-9 text-purple" strokeWidth={1.5} />
        <div className="text-[26px] font-bold text-text tracking-[-0.02em]">
          IC Fleets
        </div>
        <div className="font-mono text-[11px] tracking-[0.16em] text-purple/60 uppercase">
          o hub que conecta
        </div>
      </motion.div>

      {/* satélites */}
      {satellites.map((s, i) => {
        const translate =
          s.connector === "top" || s.connector === "bottom"
            ? "-translate-x-1/2"
            : s.connector === "left"
              ? "-translate-y-1/2"
              : "-translate-y-1/2";
        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.9 + i * 0.12 }}
            className={`absolute z-10 ${translate} border border-text/12 bg-black/[0.03] px-6 py-4 flex flex-col items-center gap-1.5 w-[210px]`}
            style={s.pos}
          >
            <s.Icon className="size-7 text-purple/65" strokeWidth={1.5} />
            <div className="text-[20px] font-bold text-text tracking-[-0.01em]">
              {s.name}
            </div>
            <div className="text-[13px] text-text/55 leading-[1.3] text-center">
              {isRecap ? s.recap : s.intro}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
