import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";
// SVG editável da árvore da Stack IC. Edite src/assets/stack-ic.svg — o hot reload aplica.
import treeSvg from "../assets/stack-ic.svg?raw";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide8StackIC({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-5 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase"
        >
          A solução · Stack IC
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-[42px] font-bold leading-[1.0] text-text tracking-[-0.03em]"
        >
          Stack IC:{" "}
          <em className="not-italic text-purple">a árvore do dado.</em>
          <span className="text-[18px] font-light text-text/45 ml-4">
            de onde vem → como é processado → como é exibido
          </span>
        </motion.h1>
      </div>

      {/* Árvore vinda do arquivo SVG editável (src/assets/stack-ic.svg) */}
      <motion.div
        {...up(0.25)}
        className="flex-1 min-h-0 [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: treeSvg }}
      />

      <motion.div {...up(0.5)}>
        <div className="text-[26px] font-bold text-text text-center tracking-[-0.02em]">
          A Stack IC não cria novos projetos.{" "}
          <span className="text-purple">
            Ela dá direção para os que já existem.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
