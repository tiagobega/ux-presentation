import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  Layers,
  BarChart2,
  MousePointerClick,
  Clock,
  Megaphone,
  Boxes,
} from "lucide-react";

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

const dores: { Icon: LucideIcon; title: string }[] = [
  { Icon: Layers, title: "Produtos com experiências e fluxos confusos." },
  {
    Icon: BarChart2,
    title: "Dados jogados ao usuário sem narrativa de decisão.",
  },
  { Icon: MousePointerClick, title: "Fluxos importantes com baixa conclusão." },
  { Icon: Clock, title: "Valor do produto demorando para aparecer." },
  { Icon: Megaphone, title: "Comunicação comercial discrepante com produto." },
  { Icon: Boxes, title: "Ecossistema sem uma lógica clara." },
];

export default function Slide1Coerencia({ action }: SlideProps) {
  return (
    <div key={action} className={`${SLIDE_PADDING} flex-1 flex flex-col min-h-0 overflow-hidden`}>
      {action === "Diagnóstico" && (
        <div className="flex-1 flex flex-col gap-7 min-h-0">
          <div>
            <motion.div
              {...up(0.0)}
              className="font-mono text-sm tracking-[0.2em] text-red-500/55 mb-4 uppercase"
            >
              O problema · Diagnóstico
            </motion.div>
            <motion.h1
              {...up(0.1)}
              className="text-[56px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
            >
              Os problemas que enfrentamos{" "}
              <em className="not-italic text-red-600">hoje.</em>
            </motion.h1>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
            {dores.map((d, i) => (
              <motion.div
                key={d.title}
                {...up(0.3 + i * 0.08, easeIn)}
                className="p-8 bg-red-500/[0.03] border border-red-500/15 border-l-[3px] border-l-red-500/45 flex items-center gap-6"
              >
                <d.Icon
                  className="size-11 text-red-500/70 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="text-[24px] font-semibold text-text/90 leading-[1.15] tracking-[-0.02em]">
                  {d.title}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...up(0.85, easeIn)}
            className="text-center text-[23px] font-light text-text/70 leading-[1.5] max-w-[1150px] mx-auto"
          >
            Temos produtos, dados e iniciativas com muito potencial. O desafio
            agora é fazer com que nossa evolução seja percebida como uma{" "}
            <span className="text-purple font-medium">
              experiência clara, consistente e conectada.
            </span>
          </motion.p>
        </div>
      )}

      {action === "Caso Carnaval" && (
        <div className="flex-1 flex flex-col gap-8 min-h-0">
          <motion.div
            {...up(0.0)}
            className="font-mono text-sm tracking-[0.2em] text-purple/45 uppercase"
          >
            Caso real · Formulário de Carnaval
          </motion.div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-10 items-center">
            {/* Hero number */}
            <motion.div {...up(0.15)} className="flex justify-center">
              <div className="w-400px flex flex-col">
                <div className="text-[180px] font-bold leading-[0.85] tracking-[-0.05em] text-red-600/85">
                  ≈90%
                </div>
                <div className="text-[26px] font-semibold text-text/80 mt-3 leading-[1.2]">
                  não completaram o formulário.
                </div>
                <div className="text-[17px] text-text/50 mt-4 leading-[1.6] max-w-[460px]">
                  O botão de registro ficava no topo da tela. O problema não era
                  falta de interesse,{" "}
                  <span className="text-red-600/85">
                    era jornada mal desenhada.
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Form mock */}
            <motion.div {...up(0.3, easeIn)} className="flex justify-center">
              <div className="w-[330px] border border-text/10 bg-white/60 rounded-xl p-6 flex flex-col gap-4 shadow-[0_20px_60px_-30px_rgba(26,18,37,0.4)]">
                <div className="text-[13px] font-mono text-text/40 tracking-[0.1em] uppercase">
                  Formulário
                </div>
                <div className="relative">
                  <div className="w-full py-3 rounded-lg bg-purple text-white text-center text-[16px] font-semibold">
                    Registrar
                  </div>
                </div>
                <div className="h-px bg-text/8 my-1" />
                {["Nome", "E-mail", "Telefone", "Bloco favorito"].map((f) => (
                  <div key={f} className="flex flex-col gap-1.5 opacity-40">
                    <div className="text-[11px] text-text/60">{f}</div>
                    <div className="h-9 rounded-md border border-text/12 bg-black/2" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...up(0.5, easeIn)} className="px-10 py-6">
            <div className="text-[32px] font-bold text-text text-center tracking-[-0.02em]">
              Quando a experiência falha,{" "}
              <span className="text-purple">o dado nem chega a existir.</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
