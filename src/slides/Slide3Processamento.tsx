import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import { osImages, osImageUrl, type OSImage } from "./visionData";
import { Check, X, AlertTriangle } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

const ACTIONS = ["Imagens", "Bronze", "Prata", "Ouro"];
const STEPS = [
  { name: "Imagens", color: "#7c3aed", sub: "recebidas" },
  { name: "Bronze", color: "#cd7f32", sub: "qualidade" },
  { name: "Prata", color: "#94a3b8", sub: "detecção" },
  { name: "Ouro", color: "#d4af37", sub: "contexto" },
];

const GREEN = "#2d9d63";
const RED = "#e0524d";
const AMBER = "#d59021";

const aprovadas = osImages.filter((i) => i.bronze === "aprovada").length;
const reprovadas = osImages.length - aprovadas;

export default function Slide3Processamento({ action }: SlideProps) {
  const phase = Math.max(ACTIONS.indexOf(action), 0); // 0..3

  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-5 min-h-0 overflow-hidden`}>
      <div className="flex items-end justify-between gap-8">
        <div>
          <motion.div
            {...up(0.0)}
            className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-2 uppercase"
          >
            Passo 3 · Processamento
          </motion.div>
          <motion.h1
            {...up(0.08)}
            className="text-[40px] font-bold leading-[1.05] text-text tracking-[-0.03em]"
          >
            Processamento das imagens
          </motion.h1>
          <motion.p {...up(0.14)} className="mt-1 text-[16px] font-light text-text/50">
            Do recebimento ao entendimento do contexto.
          </motion.p>
        </div>

        {/* indicador de camadas / step atual */}
        <motion.div {...up(0.16)} className="flex items-center gap-2 pb-1">
          {STEPS.map((s, i) => {
            const on = i === phase;
            const done = i < phase;
            return (
              <div key={s.name} className="flex items-center gap-2">
                <div
                  className="px-3.5 py-2 border rounded-md transition-all duration-300"
                  style={{
                    borderColor: on ? s.color : "rgba(26,18,37,0.12)",
                    background: on ? `${s.color}14` : "transparent",
                    opacity: done ? 0.5 : 1,
                  }}
                >
                  <div
                    className="font-mono text-[12px] tracking-[0.1em] uppercase font-bold"
                    style={{ color: on ? s.color : "rgba(26,18,37,0.4)" }}
                  >
                    {s.name}
                  </div>
                </div>
                {i < STEPS.length - 1 && <span className="text-text/20">→</span>}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* contador */}
      <motion.div
        initial={false}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-5 text-[14px] font-mono"
      >
        <span className="flex items-center gap-1.5" style={{ color: GREEN }}>
          <Check className="size-4" /> {aprovadas} aprovadas
        </span>
        <span className="flex items-center gap-1.5" style={{ color: RED }}>
          <X className="size-4" /> {reprovadas} reprovadas
        </span>
      </motion.div>

      {/* grid das 11 imagens */}
      <div className="flex-1 min-h-0 grid grid-cols-6 grid-rows-2 gap-3">
        {osImages.map((img, i) => (
          <Card key={img.id} img={img} phase={phase} index={i} />
        ))}
      </div>
    </div>
  );
}

function Card({ img, phase, index }: { img: OSImage; phase: number; index: number }) {
  const url = osImageUrl(img.id);
  const rejected = img.bronze === "reprovada";
  const num = String(img.id).padStart(2, "0");

  // estado visual por fase
  const showResult = phase >= 1;
  const showDetection = phase >= 2 && !rejected;
  const showOuro = phase >= 3 && !rejected;
  const alerta = showOuro && img.ouro === "alerta";

  let borderColor = "rgba(26,18,37,0.10)";
  if (showResult && rejected) borderColor = `${RED}66`;
  else if (showResult && !rejected) borderColor = `${GREEN}55`;
  if (showDetection) borderColor = "#94a3b8aa";
  if (showOuro) borderColor = alerta ? `${AMBER}` : `${GREEN}`;

  const dim = rejected && phase >= 2;

  // footer
  let footer: { text: string; color: string };
  if (!showResult) footer = { text: "Aguardando análise", color: "rgba(26,18,37,0.4)" };
  else if (rejected) footer = { text: img.bronzeReason ?? "Reprovada", color: RED };
  else if (showOuro)
    footer =
      img.ouro === "validada"
        ? { text: "Validada", color: GREEN }
        : { text: img.ouroNote ?? "Alerta", color: AMBER };
  else if (showDetection) footer = { text: img.detection ?? "", color: "#5b6b7c" };
  else footer = { text: "Aprovada", color: GREEN };

  return (
    <motion.div
      {...up(0.25 + index * 0.04)}
      className="flex flex-col gap-1.5 min-h-0"
      animate={{ opacity: dim ? 0.45 : 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div
        className="relative flex-1 min-h-0 overflow-hidden rounded-md border-2 transition-all duration-500"
        style={{ borderColor }}
      >
        {/* thumbnail */}
        {url ? (
          <img
            src={url}
            alt={`Imagem ${num}`}
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: rejected && showResult ? "grayscale(1) brightness(0.85)" : "none",
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/[0.06] to-black/[0.02] transition-all duration-500"
            style={{ filter: rejected && showResult ? "grayscale(1)" : "none" }}
          >
            <span className="text-[44px] font-bold text-text/15 font-mono">{num}</span>
          </div>
        )}

        {/* shimmer fase 0 */}
        {phase === 0 && (
          <div
            className="absolute inset-0 bg-purple/[0.06] animate-pulse"
            style={{ animationDelay: `${(img.id * 173) % 900}ms` }}
          />
        )}

        {/* número */}
        <div className="absolute top-1.5 left-1.5 font-mono text-[11px] font-bold text-white bg-black/45 rounded px-1.5 py-0.5">
          {num}
        </div>

        {/* badge de status */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white"
            style={{ background: rejected ? RED : alerta ? AMBER : GREEN }}
          >
            {rejected ? (
              <X className="size-4" strokeWidth={3} />
            ) : alerta ? (
              <AlertTriangle className="size-3.5" strokeWidth={2.5} />
            ) : (
              <Check className="size-4" strokeWidth={3} />
            )}
          </motion.div>
        )}

        {/* chip de detecção (prata+) */}
        {showDetection && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-1.5 left-1.5 right-1.5 font-mono text-[11px] font-semibold text-white bg-black/55 backdrop-blur-sm rounded px-2 py-1 truncate"
          >
            {img.detection}
          </motion.div>
        )}
      </div>

      {/* footer */}
      <motion.div
        key={`${img.id}-${footer.text}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-[12px] font-medium leading-[1.2] px-0.5 truncate"
        style={{ color: footer.color }}
      >
        {footer.text}
      </motion.div>
    </motion.div>
  );
}
