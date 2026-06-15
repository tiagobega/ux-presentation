import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import { osList } from "./visionData";
import { Images, ImageOff, ArrowRight } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide1MenuOS({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          Passo 1 · Seleção
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Selecione uma <em className="not-italic text-purple">Ordem de Serviço.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] font-light text-text/50 leading-[1.5]"
        >
          Escolha uma OS para iniciar a demonstração.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-6 items-center">
        {osList.map((os, i) => (
          <motion.div
            key={os.numero}
            {...up(0.3 + i * 0.12, easeIn)}
            className={`relative border p-9 flex flex-col gap-6 ${
              os.pronta
                ? "border-purple/30 bg-purple/[0.04]"
                : "border-text/10 bg-black/2 opacity-70"
            }`}
          >
            {os.pronta && (
              <div
                className="absolute w-[320px] h-[320px] rounded-full top-[-130px] right-[-80px] pointer-events-none blur-[60px]"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }}
              />
            )}
            <div className="relative z-[1] flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[13px] tracking-[0.18em] text-text/40 uppercase mb-1">
                  OS {os.numero}
                </div>
                <div className="text-[34px] font-bold text-text tracking-[-0.02em] leading-[1.05]">
                  {os.nome}
                </div>
              </div>
              {os.pronta ? (
                <Images className="size-10 text-purple/50 flex-shrink-0" strokeWidth={1.5} />
              ) : (
                <ImageOff className="size-10 text-text/25 flex-shrink-0" strokeWidth={1.5} />
              )}
            </div>

            <div className="relative z-[1] grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              <Info label="Origem" value={os.origem} />
              <Info label="Imagens vinculadas" value={String(os.imagens)} />
              <Info label="Status" value={os.status} accent={os.pronta} />
              <Info label="Tipo de fluxo" value={os.fluxo} />
            </div>

            <div className="relative z-[1] mt-auto pt-2">
              {os.pronta ? (
                <div className="inline-flex items-center gap-2.5 bg-purple text-white px-6 py-3 rounded-lg text-[16px] font-semibold">
                  Iniciar análise
                  <ArrowRight className="size-[18px]" />
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 border border-text/15 text-text/40 px-6 py-3 rounded-lg text-[16px] font-medium">
                  Em breve
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.12em] text-text/35 uppercase mb-0.5">
        {label}
      </div>
      <div
        className={`text-[17px] font-semibold ${accent ? "text-purple" : "text-text/80"}`}
      >
        {value}
      </div>
    </div>
  );
}
