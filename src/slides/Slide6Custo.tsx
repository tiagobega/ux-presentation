import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  TrendingDown,
  Repeat,
  Clock,
  LifeBuoy,
  MessageCircle,
  Compass,
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

const costs: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: TrendingDown,
    title: "Baixa conclusão de fluxos",
    desc: "o usuário desiste no meio do caminho",
  },
  {
    Icon: Repeat,
    title: "Onboarding repetido",
    desc: "cada cliente recomeça do zero",
  },
  { Icon: Clock, title: "Demos longas", desc: "o valor demora a aparecer" },
  {
    Icon: LifeBuoy,
    title: "Suporte por dúvida de uso",
    desc: "atendimento que era pra ser tela",
  },
  {
    Icon: MessageCircle,
    title: "Vendas que dependem de explicação",
    desc: "o produto não comunica a sua finalidade",
  },
  {
    Icon: Compass,
    title: "Cliente com dado, mas sem plano",
    desc: "informação sem próximo passo, risco de perder o cliente",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide5Custo({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-20 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          O argumento de negócio
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[56px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          Quando a experiência falha,{" "}
          <em className="not-italic text-purple">o custo aparece.</em>
        </motion.h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-8">
        {costs.map((c, i) => (
          <motion.div
            key={c.title}
            {...up(0.3 + i * 0.08, easeIn)}
            className="p-8 bg-black/2 border border-text/8 flex flex-col gap-4 justify-center"
          >
            <c.Icon className="size-9 text-purple/45" strokeWidth={1.5} />
            <div className="text-[24px] font-semibold text-text/90 leading-[1.15] tracking-[-0.02em]">
              {c.title}
            </div>
            <div className="text-[15px]  text-text/50 leading-[1.45]">
              {c.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...up(0.85, easeIn)} className="">
        <div className="text-[30px] font-bold text-text text-center tracking-[-0.02em]">
          UX reduz o custo de{" "}
          <span className="text-purple">explicar, corrigir e sustentar</span> o
          produto.
        </div>
      </motion.div>
    </div>
  );
}
