import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

interface Product {
  name: string;
  color: string;
  layer: string;
  func: string;
}

const products: Product[] = [
  {
    name: "Fleets",
    color: "#e85151",
    layer: "Coleta",
    func: "Gestão da frota de dispositivos e motoristas em campo.",
  },
  {
    name: "Vision",
    color: "#7c6ef5",
    layer: "Processamento",
    func: "Processa imagens e vídeos — detecções, qualidade e contexto.",
  },
  {
    name: "Lumen",
    color: "#d4c53a",
    layer: "Processamento",
    func: "Mede e calcula a luminosidade pública da cidade.",
  },
  {
    name: "Quality",
    color: "#7a9ab8",
    layer: "Processamento",
    func: "Avalia a qualidade do asfalto pelo índice IRI.",
  },
  {
    name: "Tree",
    color: "#2d7a4e",
    layer: "Processamento",
    func: "Cataloga posição e estado das árvores urbanas.",
  },
  {
    name: "Gas",
    color: "#e87c3a",
    layer: "Processamento",
    func: "Detecta vazamentos de gás na malha urbana.",
  },
  {
    name: "Flood",
    color: "#3a7ce8",
    layer: "Processamento",
    func: "Monitora drenagem e risco de alagamento.",
  },
  {
    name: "Classify",
    color: "#b061e8",
    layer: "Qualidade",
    func: "Validação humana das detecções para treinar os modelos.",
  },
  {
    name: "Query",
    color: "#d4a53a",
    layer: "Acesso",
    func: "Linguagem natural sobre os dados — você pergunta, ele responde.",
  },
  {
    name: "Face",
    color: "#3ab8d4",
    layer: "Interface",
    func: "Biblioteca de front-end: tudo que o cliente vê.",
  },
  {
    name: "News",
    color: "#3ad47e",
    layer: "Comunicação",
    func: "Releases, tendências e feedback interno.",
  },
  {
    name: "Labs",
    color: "#3a9ed4",
    layer: "P&D",
    func: "Onde os próximos produtos da cadeia são testados.",
  },
];

const N = products.length;
const ITEM_H = 120; // altura de cada linha do carrossel
const STEP_MS = 4000; // tempo em cada produto

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide9Branding({ action: _ }: SlideProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = products[active];

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden items-center`}
    >
      <div className="w-full">
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          Branding · Stack IC
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Uma identidade,{" "}
          <em className="not-italic text-purple">varios produtos.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 flex items-center">
        {/* ESQUERDA — lockup IC ● + carrossel vertical */}
        <motion.div {...up(0.25)} className="flex items-center gap-7 shrink-0">
          <div
            className="text-[88px] font-semibold leading-none text-text  tracking-[-0.04em] h-24"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            IC
          </div>
          <motion.div
            className="w-6 h-6 rounded-full flex-shrink-0"
            animate={{ backgroundColor: current.color }}
            transition={{ duration: 0.4 }}
          />
          <div
            className="relative overflow-hidden"
            style={{
              height: ITEM_H * 5,
              width: 500,
              maskImage:
                "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 26%, #000 74%, transparent)",
            }}
          >
            {products.map((p, i) => {
              let rel = i - active;
              if (rel > N / 2) rel -= N;
              if (rel < -N / 2) rel += N;
              const isActive = rel === 0;
              const op =
                Math.abs(rel) === 0
                  ? 1
                  : Math.abs(rel) === 1
                    ? 0.3
                    : Math.abs(rel) === 2
                      ? 0.1
                      : 0;
              return (
                <motion.div
                  key={p.name}
                  className="absolute left-0 flex items-center font-regular whitespace-nowrap"
                  style={{
                    height: ITEM_H,
                    fontSize: 88,
                    transformOrigin: "left center",
                    fontFamily: "'Geist Mono', monospace",
                  }}
                  animate={{
                    y: ITEM_H * (2 + rel),
                    opacity: op,
                    scale: isActive ? 1.12 : 1,
                    color: isActive ? p.color : "#1a1225",
                  }}
                  transition={{ duration: 0.5, ease: easeOut }}
                >
                  {p.name}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div
          className="h-full w-0.5"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent, #00000080 50%, transparent)",
          }}
        ></div>
        {/* DIREITA — camada + funcionalidade do produto em foco */}
        <motion.div
          {...up(0.35)}
          className="flex-1 min-h-0  pl-14 flex flex-col justify-center w-[650px] h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="flex flex-col gap-4"
            >
              <div
                className="font-mono text-xl tracking-[0.2em] uppercase"
                style={{ color: current.color }}
              >
                {current.layer}
              </div>
              <div className="text-4xl font-light text-text/60 leading-[1.5] w-full">
                {current.func}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
