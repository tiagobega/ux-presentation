import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { SLIDE_PADDING } from "../config";

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

export interface BulletItem {
  Icon: LucideIcon;
  text: string;
}

export interface BulletSlideProps {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  titleTrail?: string;
  paragraph?: string;
  bullets: BulletItem[];
  bulletCols?: 1 | 2;
  image?: { src: string; alt: string };
  transitionLine?: {
    lead?: string;
    highlight: string;
  };
  accentColor?: string;
}

export default function BulletSlide({
  eyebrow,
  titleLead,
  titleHighlight,
  titleTrail,
  paragraph,
  bullets,
  bulletCols = 1,
  image,
  transitionLine,
  accentColor,
}: BulletSlideProps) {
  const iconColor = accentColor ?? "var(--color-purple)";

  const bulletList = bullets.map((b, i) => (
    <motion.div
      key={b.text}
      {...up(0.3 + i * 0.08, easeIn)}
      className="border border-purple/15 bg-purple/[0.03] px-7 py-5 flex items-center gap-5"
    >
      <b.Icon
        className="size-10 flex-shrink-0"
        style={{ color: iconColor }}
        strokeWidth={1.5}
      />
      <div className="text-[24px] font-medium text-text/85 leading-[1.35] tracking-[-0.01em]">
        {b.text}
      </div>
    </motion.div>
  ));

  const compactBulletList = bullets.map((b, i) => (
    <motion.div
      key={b.text}
      {...up(0.3 + i * 0.08, easeIn)}
      className="border border-purple/15 bg-purple/[0.03] px-4 py-4 flex items-center gap-4"
    >
      <b.Icon
        className="size-8 flex-shrink-0"
        style={{ color: iconColor }}
        strokeWidth={1.5}
      />
      <div className="text-[18px] font-medium text-text/85 leading-[1.3] tracking-[-0.01em]">
        {b.text}
      </div>
    </motion.div>
  ));

  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.h1
          {...up(0.0)}
          className="text-[40px] font-bold uppercase tracking-[0.02em] text-purple leading-[1.15]"
        >
          {eyebrow}
        </motion.h1>
        <motion.p
          {...up(0.1)}
          className="mt-3 text-[22px] font-medium text-text/70 leading-[1.4] tracking-[-0.01em]"
        >
          {titleLead ? `${titleLead} ` : ""}
          <em className="not-italic text-purple">{titleHighlight}</em>
          {titleTrail ? ` ${titleTrail}` : ""}
        </motion.p>
        {paragraph && (
          <motion.p
            {...up(0.18)}
            className="mt-4 text-[18px] text-text/50 leading-[1.6] max-w-[1050px]"
          >
            {paragraph}
          </motion.p>
        )}
      </div>

      {image ? (
        <div className="flex-1 min-h-0 flex flex-col gap-6">
          <div
            className="grid gap-4 shrink-0"
            style={{
              gridTemplateColumns: `repeat(${bullets.length}, minmax(0, 1fr))`,
            }}
          >
            {compactBulletList}
          </div>
          <motion.div
            {...up(0.3 + bullets.length * 0.08, easeIn)}
            className="flex-1 min-h-0 flex items-center justify-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </div>
      ) : (
        <div
          className={`flex-1 min-h-0 grid gap-6 items-center content-center ${
            bulletCols === 2 ? "grid-cols-2" : "grid-cols-1 max-w-[900px]"
          }`}
        >
          {bulletList}
        </div>
      )}

      {transitionLine && (
        <motion.div
          {...up(0.3 + bullets.length * 0.08 + 0.15, easeIn)}
          className="border-t border-text/10 pt-6 text-center"
        >
          <div className="text-[24px] font-bold text-text tracking-[-0.02em]">
            {transitionLine.lead ? `${transitionLine.lead} ` : ""}
            <span className="text-purple">{transitionLine.highlight}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
