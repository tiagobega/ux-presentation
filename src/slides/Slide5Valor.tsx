import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { Map, ClipboardList } from "lucide-react";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const MAP_COLOR = "#3a7ce8";
const PURPLE = "#7c3aed";

const mapPoints = [
  "Leitura territorial",
  "Comparação temporal",
  "Antes e depois",
];
const osPoints = ["Prioridade", "Execução", "Cobrança", "Resultado"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide5Valor({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-6 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          Produto · uma reflexão
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[50px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          O mapa nem sempre precisa ser o{" "}
          <em className="not-italic text-purple">protagonista.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] font-light text-text/50 leading-[1.5] max-w-[1050px]"
        >
          Entregamos os dois, o mapa e o controle de ordens de serviço. A
          pergunta de UX é qual deve ocupar o centro da experiência, conforme o
          público e o objetivo.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 items-center">
        {/* MAPA — para ver e entender */}
        <motion.div
          {...up(0.3, easeIn)}
          className="border border-text/10 bg-black/2 p-9 flex flex-col gap-5"
        >
          <Map
            className="size-11"
            style={{ color: MAP_COLOR }}
            strokeWidth={1.5}
          />
          <div>
            <div
              className="font-mono text-[12px] tracking-[0.16em] uppercase mb-2"
              style={{ color: `${MAP_COLOR}99` }}
            >
              Para ver e entender
            </div>
            <div className="text-[38px] font-bold text-text/90 tracking-[-0.02em] leading-[1.0]">
              Mapa
            </div>
            <div className="text-[18px] font-light text-text/55 mt-2">
              Mostra onde está o problema, no território e no tempo.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-auto">
            {mapPoints.map((p) => (
              <div
                key={p}
                className="text-[16px] text-text/65 flex items-center gap-3"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: MAP_COLOR }}
                />
                {p}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ORDEM DE SERVIÇO — para agir e controlar */}
        <motion.div
          {...up(0.42, easeIn)}
          className="border border-text/10 bg-black/2 p-9 flex flex-col gap-5"
        >
          <ClipboardList
            className="size-11"
            style={{ color: PURPLE }}
            strokeWidth={1.5}
          />
          <div>
            <div
              className="font-mono text-[12px] tracking-[0.16em] uppercase mb-2"
              style={{ color: `${PURPLE}99` }}
            >
              Para agir e controlar
            </div>
            <div className="text-[38px] font-bold text-text/90 tracking-[-0.02em] leading-[1.0]">
              Ordem de Serviço
            </div>
            <div className="text-[18px] font-light text-text/55 mt-2">
              Mostra o que fazer — e como a cidade assume o controle.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-auto">
            {osPoints.map((p) => (
              <div
                key={p}
                className="text-[16px] text-text/65 flex items-center gap-3"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: PURPLE }}
                />
                {p}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* punch — reflexão, não confronto */}
      <motion.div {...up(0.6, easeIn)}>
        <div className="text-[26px] font-bold text-text text-center tracking-[-0.02em]">
          O mapa mostra onde está o problema. A ordem de serviço mostra o que
          fazer com ele.{" "}
          <span className="text-purple">
            UX decide qual merece o centro da tela.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
