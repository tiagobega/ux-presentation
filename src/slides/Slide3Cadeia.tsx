import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const drama: [number, number, number, number] = [0.77, 0, 0.22, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const STEP2 = "Informação → Acompanhamento";

const nodes = [
  {
    label: "Coleta",
    statement: "O dado nasce na operação.",
    ux: "UX garante que a coleta seja clara, precisa e alinhada ao objetivo da aplicação.",
  },
  {
    label: "Dados",
    statement: "A evidência precisa ser confiável.",
    ux: "UX ajuda a definir quais dados precisam existir para sustentar clareza, performance e consistência.",
  },
  {
    label: "Contexto",
    statement: "O dado ganha sentido.",
    ux: "UX conecta localização, tempo, impacto e perfil de usuário para explicar por que aquela informação importa.",
  },
  {
    label: "Informação",
    statement: "O usuário precisa entender rápido.",
    ux: "UX transforma volume de dados em leitura clara, priorizada e acionável.",
  },
  {
    label: "Decisão",
    statement: "A plataforma precisa orientar o próximo passo.",
    ux: "UX ajuda o usuário a planejar, priorizar e agir com mais segurança.",
  },
  {
    label: "Acompanhamento",
    statement: "A ação precisa fechar o ciclo.",
    ux: "UX permite acompanhar pendências, encontrar problemas mal resolvidos e transformar retorno em melhoria contínua.",
  },
];

export default function Slide3Cadeia({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0;

  const dotShown = (i: number) => phase === 1 || i <= 2;
  const dotDelay = (i: number) =>
    i <= 2
      ? phase === 0
        ? 0.35 + i * 0.28
        : 0
      : phase === 1
        ? 0.3 + (i - 3) * 0.28
        : 0;
  const cardDelay = (i: number) => (i <= 2 ? 0.4 + i * 0.28 : 0);

  return (
    <div className={`flex-1 flex flex-col gap-6 min-h-0 overflow-hidden`}>
      <div className="px-16 pt-10">
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          A solução · A cadeia
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[52px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          UX atravessa a{" "}
          <em className="not-italic text-purple">cadeia inteira.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[18px] font-light text-text/50 leading-[1.55] max-w-[900px]"
        >
          Não é só sobre como a informação aparece na tela. É sobre como cada
          etapa conduz o usuário até uma ação melhor.
        </motion.p>
      </div>

      {/* esteira 200% — desliza para a esquerda no step 2 */}
      <div className="min-h-0 relative overflow-hidden pt-2 flex-1 items-center flex w-[200%]">
        <motion.div
          initial={false}
          animate={{ x: phase === 1 ? "-50%" : "0%" }}
          transition={{ duration: 1.5, ease: drama }}
          className="flex flex-col w-full px-16 gap-6"
        >
          {/* timeline: linha contínua em fluxo normal (não-absoluta) */}
          <div className="h-[24px] px-[7.6%] flex items-center shrink-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === 1 ? 1 : 0.5 }}
              transition={
                phase === 1
                  ? { duration: 1.1, ease: drama, delay: 0.2 }
                  : { duration: 0.7, ease: drama, delay: 0.35 }
              }
              className="h-[2px] w-full bg-purple/30"
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* cards — a bolinha pertence a cada card (absoluta, sobre a linha) */}
          <div className="grid grid-cols-6 gap-16 flex-1 min-h-0">
            {nodes.map((n, i) => (
              <div key={n.label} className={`flex relative`}>
                {/* bolinha do nó — sobreposta à linha */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: dotShown(i) ? 1 : 0,
                    opacity: dotShown(i) ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: easeOut,
                    delay: dotDelay(i),
                  }}
                  className="absolute left-1/2 -top-11 -translate-x-1/2 z-10 w-[16px] h-[16px] rounded-full border-2 border-purple bg-white"
                  style={{ boxShadow: "0 0 0 5px rgba(124,58,237,0.08)" }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    i <= 2
                      ? { opacity: 1, y: 0 }
                      : { opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 14 }
                  }
                  transition={{
                    duration: i <= 2 ? 0.45 : 0.5,
                    ease: easeOut,
                    delay:
                      i <= 2
                        ? cardDelay(i)
                        : phase === 1
                          ? 0.25 + (i - 3) * 0.15
                          : 0,
                  }}
                  className="relative w-full border border-purple/15 bg-purple/[0.03] p-8 flex flex-col gap-4"
                >
                  <div className="font-mono text-[14px] tracking-[0.12em] text-purple/55 uppercase">
                    0{i + 1} — {n.label}
                  </div>
                  <div className="text-[26px] font-bold text-text/90 leading-[1.12] tracking-[-0.02em]">
                    {n.statement}
                  </div>
                  <div className="text-[16px] text-text leading-[1.55] mt-auto">
                    {n.ux}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* rodapé: punch entra ao completar a cadeia (step 2) */}
      <div className="min-h-[84px] flex items-center px-16 pb-10">
        <motion.div
          initial={false}
          animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 12 }}
          transition={{
            duration: 0.5,
            ease: easeOut,
            delay: phase === 1 ? 0.5 : 0,
          }}
          className="w-full border border-purple/20 bg-purple/[0.04] px-10 py-6"
        >
          <div className="text-[28px] font-bold text-text tracking-[-0.02em]">
            UX não é a tela final.{" "}
            <span className="text-purple">
              É a estrutura que faz cada etapa gerar a próxima ação.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
