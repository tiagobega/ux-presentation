import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import { LAYERS, criterios, osList } from "./visionData";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const os = osList[0];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide2Criterios({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-6 min-h-0 overflow-hidden`}>
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          Passo 2 · Escopo
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[44px] font-bold leading-[1.05] text-text tracking-[-0.03em]"
        >
          OS selecionada: <em className="not-italic text-purple">critérios e escopo.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-2 text-[17px] font-light text-text/50 leading-[1.5]"
        >
          Antes de analisar as imagens, o sistema entende o que precisa ser validado.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[1fr_1fr] gap-6">
        {/* ESQUERDA — dados, quantidade, camadas */}
        <div className="flex flex-col gap-4 min-h-0">
          <motion.div {...up(0.3, easeIn)} className="border border-text/10 bg-black/2 p-6">
            <div className="font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase mb-3">
              Dados da OS
            </div>
            <div className="text-[24px] font-bold text-text tracking-[-0.02em] mb-3">
              {os.nome} <span className="text-text/35 font-medium text-[18px]">· OS {os.numero}</span>
            </div>
            <div className="flex gap-8 text-[15px]">
              <span className="text-text/55">Origem <b className="text-text/85 font-semibold">{os.origem}</b></span>
              <span className="text-text/55">Status <b className="text-purple font-semibold">{os.status}</b></span>
            </div>
          </motion.div>

          <motion.div {...up(0.4, easeIn)} className="grid grid-cols-3 gap-3">
            {[
              { n: "11", l: "imagens recebidas" },
              { n: "3", l: "camadas de análise" },
              { n: "11", l: "critérios no output" },
            ].map((q) => (
              <div key={q.l} className="border border-text/10 bg-black/2 px-5 py-5 text-center">
                <div className="text-[44px] font-bold text-purple leading-none tracking-[-0.03em]">
                  {q.n}
                </div>
                <div className="text-[13px] text-text/50 mt-2 leading-[1.3]">{q.l}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...up(0.5, easeIn)} className="flex flex-col gap-2.5 mt-auto">
            <div className="font-mono text-[11px] tracking-[0.16em] text-text/40 uppercase mb-1">
              Camadas de análise
            </div>
            {LAYERS.map((layer) => (
              <div
                key={layer.key}
                className="flex items-center gap-4 border border-text/10 bg-black/2 px-5 py-3"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: layer.color }}
                />
                <span className="text-[19px] font-semibold text-text/85">{layer.name}</span>
                <span className="text-[15px] font-light text-text/45">— {layer.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* DIREITA — critérios avaliados */}
        <motion.div
          {...up(0.45, easeIn)}
          className="border border-text/10 bg-black/2 p-6 flex flex-col min-h-0"
        >
          <div className="font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase mb-4">
            Critérios a serem preenchidos
          </div>
          <div className="grid grid-rows-6 grid-flow-col gap-x-8 gap-y-2.5 flex-1">
            {criterios.map((c, i) => (
              <motion.div
                key={c.label}
                {...up(0.55 + i * 0.04, easeIn)}
                className="flex items-center gap-3 text-[16px] text-text/75"
              >
                <span className="font-mono text-[12px] text-purple/40 w-5">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
