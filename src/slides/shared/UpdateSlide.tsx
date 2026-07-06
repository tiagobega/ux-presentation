import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Check, ArrowRight } from "lucide-react";
import { SLIDE_PADDING } from "../config";
import type { BulletItem } from "./BulletSlide";

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

export interface UpdateColumn {
  label?: string;
  items: BulletItem[];
}

export interface UpdateSlideProps {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  titleTrail?: string;
  paragraph?: string;
  done?: UpdateColumn;
  next: UpdateColumn;
  note?: {
    lead?: string;
    highlight: string;
  };
}

function Column({
  header,
  Marker,
  markerClass,
  items,
  delayBase,
}: {
  header: string;
  Marker: LucideIcon;
  markerClass: string;
  items: BulletItem[];
  delayBase: number;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-2.5">
        <Marker className={`size-12 ${markerClass}`} strokeWidth={3} />
        <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-text/45">
          {header}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {items.map((b, i) => (
          <motion.div
            key={b.text}
            {...up(delayBase + i * 0.07, easeIn)}
            className="flex items-start gap-3.5"
          >
            <b.Icon
              className={`size-8 mt-0.5 flex-shrink-0 ${markerClass}`}
              strokeWidth={1.5}
            />
            <div className="text-[24px] text-text/85 leading-[1.35]">
              {b.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function UpdateSlide({
  eyebrow,
  titleLead,
  titleHighlight,
  titleTrail,
  paragraph,
  done,
  next,
  note,
}: UpdateSlideProps) {
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
            className="mt-3 text-[18px] text-text/50 leading-[1.55] max-w-[1000px]"
          >
            {paragraph}
          </motion.p>
        )}
      </div>

      <div
        className={`flex-1 min-h-0 grid gap-10 content-center ${
          done ? "grid-cols-2" : "grid-cols-1 max-w-[720px]"
        }`}
      >
        {done && (
          <div className="border-l-2 border-text/15 pl-8">
            <Column
              header={done.label ?? "O que fizemos"}
              Marker={Check}
              markerClass="text-text/55"
              items={done.items}
              delayBase={0.3}
            />
          </div>
        )}
        <div className="border-l-2 border-purple/40 pl-8">
          <Column
            header={next.label ?? "Próximos passos"}
            Marker={ArrowRight}
            markerClass="text-purple/70"
            items={next.items}
            delayBase={0.42}
          />
        </div>
      </div>

      {note && (
        <motion.div
          {...up(0.7, easeIn)}
          className="border-t border-text/10 pt-5 text-center"
        >
          <div className="text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.35]">
            {note.lead ? `${note.lead} ` : ""}
            <span className="text-purple">{note.highlight}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
