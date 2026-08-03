import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Eye, History } from "lucide-react";
import type { SlideProps } from "../config";
import { SlideShell, Reveal, easeIn } from "./kit";

interface Ganho {
  Icon: LucideIcon;
  texto: string;
  detalhe: string;
}

// Espelha, na mesma ordem, as três dores da abertura (`Slide01PorQueExiste`).
const ganhos: Ganho[] = [
  {
    Icon: ShieldCheck,
    texto: "Regra de negócio no lugar certo",
    detalhe: "Com regras expansíveis para o futuro.",
  },
  {
    Icon: Eye,
    texto: "Visibilidade em tempo “real”",
    detalhe: "Posição e verificação do hardware a cada 15 segundos.",
  },
  {
    Icon: History,
    texto: "Rastreabilidade e auditoria",
    detalhe: "Logs de atividade e métricas por dispositivo e colaborador.",
  },
];

/**
 * Mesma mecânica da abertura: 1 a pergunta sozinha · 2 a resposta · 3 a 5 um
 * ganho cada · 6 o fechamento.
 * A linha dos ganhos abre por `max-height` no step 3 (e o primeiro card entra
 * em fade depois disso); os outros dois só acendem, porque a linha já existe.
 */
const STEPS = [
  "A pergunta",
  "A resposta",
  "Regra de negócio",
  "Visibilidade",
  "Rastreabilidade",
  "O foco",
];

/** O título abre grande, recua com a resposta e assenta quando os ganhos entram. */
const ESCALA_TITULO = [1.22, 1.1, 1, 1, 1, 1];

/** Espera a abertura da linha terminar antes de acender o primeiro card. */
const ATRASO_1O_CARD = 0.45;

export default function Slide04OQueResolvemos({ action }: SlideProps) {
  const step = Math.max(0, STEPS.indexOf(action)); // 0..5

  return (
    <SlideShell className="justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: ESCALA_TITULO[0] }}
        animate={{ opacity: 1, y: 0, scale: ESCALA_TITULO[step] }}
        transition={{ duration: 0.55, ease: easeIn }}
        className="text-[58px] font-bold leading-[1.05] text-text tracking-[-0.03em] text-center origin-center max-w-[1100px]"
      >
        O que resolvemos com{" "}
        <em className="not-italic text-purple">essa arquitetura?</em>
      </motion.h1>

      {/* step 2 — a resposta */}
      <Reveal shown={step >= 1} max={200} className="w-full">
        <p className="pt-10 text-[22px] font-medium text-text/70 leading-[1.5] text-center max-w-[980px] mx-auto">
          Temos uma{" "}
          <span className="font-bold text-text">única fonte da verdade</span>{" "}
          <br />e um{" "}
          <span className="font-bold text-text">caminho documentado</span> para
          os nossos dados.
        </p>
      </Reveal>

      {/* step 3 — a linha abre por altura; os cards acendem por cima dela */}
      <Reveal shown={step >= 2} max={370} fade={false} className="w-full">
        <div className="pt-12 grid grid-cols-3 gap-6 w-full">
          {ganhos.map((g, i) => {
            const aceso = step >= i + 2;
            return (
              <motion.div
                key={g.texto}
                initial={false}
                animate={{ opacity: aceso ? 1 : 0 }}
                transition={{
                  duration: 0.45,
                  ease: easeIn,
                  delay: aceso && i === 0 ? ATRASO_1O_CARD : 0,
                }}
                className="border border-purple/25 bg-purple/[0.05] p-10 flex flex-col items-center text-center gap-8"
              >
                <g.Icon
                  className="size-11 text-purple/55 shrink-0"
                  strokeWidth={1.4}
                />
                <div className="text-[32px] font-bold text-text tracking-[-0.03em] leading-[1.05]">
                  {g.texto}
                </div>
                <div className="text-[19px] font-medium text-text/80 leading-[1.4]">
                  {g.detalhe}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {/* step 6 — o fechamento */}
      <Reveal shown={step >= 5} max={200} className="w-full">
        <p className="pt-12 text-[26px] font-bold text-text tracking-[-0.02em] leading-[1.3] text-center max-w-[1080px] mx-auto">
          Nosso foco é uma aplicação que dê à empresa{" "}
          <span className="text-purple">visibilidade para tomar decisões.</span>
          <br />
          Isso é o Fleets.
        </p>
      </Reveal>
    </SlideShell>
  );
}
