import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";
import type { LucideIcon } from "lucide-react";
import { Camera, Wrench, ClipboardList } from "lucide-react";

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

interface Caso {
  Icon: LucideIcon;
  label: string;
  scenario: string;
  ux: string;
  impact: string[];
}

const casos: Caso[] = [
  {
    Icon: Camera,
    label: "Câmera mal posicionada",
    scenario:
      "Uma câmera mal posicionada no veículo compromete a captura da imagem, reduz a qualidade da análise e gera dados ruins.",
    ux: "O fleets poderia alertar o motorista quando a câmera não está bem posicionada.",
    impact: ["Coleta", "Dados"],
  },
  {
    Icon: Wrench,
    label: "Instalação com pendência",
    scenario:
      "Um dispositivo mal instalado pode não funcionar corretamente ou não gerar dado algum.",
    ux: "Desenhar fluxos de instalação, validação e confirmação que garantem o equipamento pronto para operar.",
    impact: ["Coleta", "Dados", "Acompanhamento"],
  },
  {
    Icon: ClipboardList,
    label: "Exemplo do Carnaval",
    scenario:
      "Um formulário mal formatado, com fluxo ruim, impede que a informação correta seja registrada.",
    ux: "Conduzir o usuário até a ação principal, formulário compreensível, preenchível e alinhado ao objetivo.",
    impact: ["Coleta", "Informação"],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide4Falhas({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-6 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-red-500/55 mb-3 uppercase"
        >
          Quando a experiência falha
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em]"
        >
          Quando a experiência falha,{" "}
          <em className="not-italic text-purple">a cadeia inteira sente.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className="mt-3 text-[17px] font-light text-text/50 leading-[1.5] max-w-[1050px]"
        >
          UX não atua só na interface final. Ele evita falhas na operação, na
          coleta, na instalação, no uso do equipamento e na forma como a
          informação chega ao usuário.
        </motion.p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 items-center">
        {casos.map((c, i) => (
          <motion.div
            key={c.label}
            {...up(0.3 + i * 0.12, easeIn)}
            className="border border-text/10 bg-black/2 p-7 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <c.Icon
                className="size-8 text-red-500/65 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div className="font-mono text-[12px] tracking-[0.12em] text-red-500/55 uppercase">
                Case {i + 1}
              </div>
            </div>
            <div className="text-[22px] font-bold text-text/90 tracking-[-0.02em] leading-[1.1]">
              {c.label}
            </div>
            <div className="text-[15px] font-light text-text/60 leading-[1.5]">
              {c.scenario}
            </div>

            <div className="border-l-2 border-purple/40 bg-purple/[0.05] px-4 py-3 mt-auto">
              <div className="font-mono text-[10px] tracking-[0.16em] text-purple/55 uppercase mb-1.5">
                Ponto de UX
              </div>
              <div className="text-[14px] text-purple/90 leading-[1.45]">
                {c.ux}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* mensagem final + punch */}
      <motion.div {...up(0.7, easeIn)} className="">
        <div className="text-[25px] font-bold text-center text-text tracking-[-0.02em]">
          Quando a experiência falha no começo,{" "}
          <span className="text-purple">
            o problema aparece no dado, na operação e na decisão.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
