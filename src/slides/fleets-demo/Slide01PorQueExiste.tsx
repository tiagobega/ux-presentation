import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Table2, Unplug, TriangleAlert } from "lucide-react";
import type { SlideProps } from "../config";
import { SlideShell, Reveal, easeIn } from "./kit";

interface Dor {
  Icon: LucideIcon;
  texto: string;
  detalhe: string;
}

// Uma dor por step, já com a descrição: a fala apresenta uma, depois a próxima.
const dores: Dor[] = [
  {
    Icon: Table2,
    texto: "Não escala a gestão de campo",
    detalhe: "Suscetível a erros, retrabalho e perda de tempo.",
  },
  {
    Icon: Unplug,
    texto: "Não conversa com sistema",
    detalhe: "Integração cara e demorada em qualquer sistema.",
  },
  {
    Icon: TriangleAlert,
    texto: "Sem regra de negócio",
    detalhe: "Dados inconsistentes, sensíveis e inseguros.",
  },
];

/**
 * 1 a pergunta sozinha · 2 a resposta · 3 a 5 uma dor cada.
 * A linha das dores abre por `max-height` no step 3 (e o primeiro card entra
 * em fade depois disso); os outros dois só acendem, porque a linha já existe.
 */
const STEPS = [
  "A pergunta",
  "A resposta",
  "Não escala",
  "Não conversa",
  "Sem regra",
];

/** O título abre grande, recua com a resposta e assenta quando as dores entram. */
const ESCALA_TITULO = [1.28, 1.12, 1, 1, 1];

/** Espera a abertura da linha terminar antes de acender o primeiro card. */
const ATRASO_1O_CARD = 0.45;

export default function Slide01PorQueExiste({ action }: SlideProps) {
  const step = Math.max(0, STEPS.indexOf(action)); // 0..4

  return (
    <SlideShell className="justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: ESCALA_TITULO[0] }}
        animate={{ opacity: 1, y: 0, scale: ESCALA_TITULO[step] }}
        transition={{ duration: 0.55, ease: easeIn }}
        className="text-[64px] font-bold leading-[1.02] text-text tracking-[-0.03em] text-center origin-center"
      >
        Por que o Fleets <em className="not-italic text-purple">existe?</em>
      </motion.h1>

      {/* step 2 — a resposta */}
      <Reveal shown={step >= 1} max={190} className="w-full">
        <p className="pt-10 text-[22px] font-medium text-text/70 leading-[1.5] text-center max-w-[980px] mx-auto">
          Antes, tudo isso era gerenciado por planilha: <br />
          <span className="font-bold text-text">
            mais de 500 dispositivos, 300 colaboradores/veículos e 20 contratos.
          </span>
        </p>
      </Reveal>

      {/* step 3 — a linha abre por altura; os cards acendem por cima dela */}
      <Reveal shown={step >= 2} max={350} fade={false} className="w-full">
        <div className="pt-14 grid grid-cols-3 gap-6 w-full">
          {dores.map((d, i) => {
            const aceso = step >= i + 2;
            return (
              <motion.div
                key={d.texto}
                initial={false}
                animate={{ opacity: aceso ? 1 : 0 }}
                transition={{
                  duration: 0.45,
                  ease: easeIn,
                  delay: aceso && i === 0 ? ATRASO_1O_CARD : 0,
                }}
                className="border border-text/10 bg-black/[0.02] p-10 flex flex-col items-center text-center gap-8"
              >
                <d.Icon
                  className="size-11 text-text/25 shrink-0"
                  strokeWidth={1.4}
                />
                <div className="text-[34px] font-bold text-text/75 tracking-[-0.03em] leading-[1.05]">
                  {d.texto}
                </div>
                <div className="text-[19px] text-text/60 leading-[1.4]">
                  {d.detalhe}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </SlideShell>
  );
}
