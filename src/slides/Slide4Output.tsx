import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import { criterios, resumo } from "./visionData";
import { Check, Minus, AlertTriangle } from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const GREEN = "#2d9d63";
const AMBER = "#d59021";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide4Output({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-5 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-2 uppercase"
        >
          Passo 4 · Output
        </motion.div>
        <motion.h1
          {...up(0.08)}
          className="text-[42px] font-bold leading-[1.04] text-text tracking-[-0.03em]"
        >
          Output da <em className="not-italic text-purple">análise.</em>
        </motion.h1>
        <motion.p {...up(0.16)} className="mt-1 text-[16px] font-light text-text/50">
          Critérios preenchidos automaticamente com base nas evidências.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[1.55fr_1fr] gap-6">
        {/* tabela de critérios */}
        <motion.div {...up(0.25, easeIn)} className="flex flex-col min-h-0">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-4 pb-2 border-b border-text/10 font-mono text-[11px] tracking-[0.14em] text-purple/45 uppercase">
            <div>Critério</div>
            <div className="text-center w-16">Resultado</div>
            <div>Observação</div>
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            {criterios.map((c, i) => (
              <motion.div
                key={c.label}
                {...up(0.3 + i * 0.035, easeIn)}
                className="grid grid-cols-[1fr_auto_1fr] gap-4 px-4 py-[7px] items-center border-b border-text/[0.05]"
              >
                <div className="text-[16px] font-medium text-text/85">{c.label}</div>
                <div className="w-16 flex justify-center">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: c.ok ? `${GREEN}1a` : "rgba(26,18,37,0.05)",
                      color: c.ok ? GREEN : "rgba(26,18,37,0.3)",
                    }}
                  >
                    {c.ok ? <Check className="size-4" strokeWidth={3} /> : <Minus className="size-4" strokeWidth={2.5} />}
                  </span>
                </div>
                <div
                  className="text-[14px] font-light"
                  style={{ color: c.ok ? "rgba(26,18,37,0.55)" : "rgba(26,18,37,0.35)" }}
                >
                  {c.obs}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* resumo */}
        <div className="flex flex-col gap-4 min-h-0">
          <motion.div {...up(0.4, easeIn)} className="grid grid-cols-2 gap-3">
            <Stat n={resumo.aceitas} l="Evidências aceitas" color={GREEN} />
            <Stat n={resumo.recusadas} l="Evidências recusadas" color="#e0524d" />
            <Stat n={resumo.pendencias} l="Pendências críticas" color={AMBER} />
            <div className="border border-purple/25 bg-purple/[0.05] px-5 py-4 flex flex-col justify-center">
              <div className="font-mono text-[10px] tracking-[0.14em] text-purple/50 uppercase mb-1">
                Status geral
              </div>
              <div className="text-[20px] font-bold text-purple leading-[1.05]">
                {resumo.status}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...up(0.55, easeIn)}
            className="border-l-2 border-[#d59021]/50 bg-[#d59021]/[0.06] px-5 py-4 flex gap-3"
          >
            <AlertTriangle className="size-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
            <div>
              <div className="text-[15px] font-semibold text-text/85">
                Material aplicado: {resumo.materialAplicado}
              </div>
              <div className="text-[14px] font-light text-text/55 leading-[1.4] mt-0.5">
                {resumo.materialObs}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...up(0.68, easeIn)}
            className="mt-auto border border-purple/20 bg-purple/[0.04] px-6 py-5"
          >
            <div className="text-[19px] font-bold text-text tracking-[-0.01em] leading-[1.3]">
              O IC Vision transforma imagens em{" "}
              <span className="text-purple">output operacional preenchido.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, l, color }: { n: number; l: string; color: string }) {
  return (
    <div className="border border-text/10 bg-black/2 px-5 py-4">
      <div className="text-[40px] font-bold leading-none tracking-[-0.03em]" style={{ color }}>
        {n}
      </div>
      <div className="text-[13px] text-text/50 mt-1.5 leading-[1.25]">{l}</div>
    </div>
  );
}
