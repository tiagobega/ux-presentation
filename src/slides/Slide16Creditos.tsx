import { motion } from "motion/react";
import type { SlideProps } from "./config";
import { SLIDE_PADDING } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

interface Balloon {
  name: string;
  photo: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
}

const people: Balloon[] = [
  { name: "Caio", photo: "/caio.avif", top: "12%", left: "9%", size: 108, rotate: -8 },
  { name: "Bega", photo: "/bega.avif", top: "8%", left: "32%", size: 92, rotate: 6 },
  { name: "Alan", photo: "/alan.avif", top: "6%", left: "50%", size: 90, rotate: 5 },
  { name: "Davi", photo: "/davi.avif", top: "13%", left: "68%", size: 100, rotate: -5 },
  { name: "Digão", photo: "/digao.avif", top: "10%", left: "91%", size: 96, rotate: 9 },
  { name: "Marcos", photo: "/marcos.jpg", top: "25%", left: "15%", size: 100, rotate: 6 },
  { name: "Bruno", photo: "/bruno.png", top: "28%", left: "85%", size: 98, rotate: -6 },
  { name: "Fortes", photo: "/fortes.avif", top: "50%", left: "5%", size: 100, rotate: 10 },
  { name: "Mansur", photo: "/mansur.avif", top: "45%", left: "25%", size: 94, rotate: -7 },
  { name: "Tiago", photo: "/tiago.avif", top: "52%", left: "75%", size: 90, rotate: 8 },
  { name: "Godoy", photo: "/godoy.avif", top: "48%", left: "95%", size: 104, rotate: -10 },
  { name: "Onishi", photo: "/onish.avif", top: "85%", left: "12%", size: 96, rotate: 7 },
  { name: "Marins", photo: "/marins.png", top: "68%", left: "30%", size: 94, rotate: 5 },
  { name: "Lima", photo: "/lima.avif", top: "90%", left: "50%", size: 88, rotate: -6 },
  { name: "Cesar", photo: "/cesar.avif", top: "88%", left: "70%", size: 92, rotate: -5 },
  { name: "Otávio", photo: "/otavio.avif", top: "85%", left: "88%", size: 96, rotate: -9 },
];

function BalloonField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {people.map((p, i) => (
        <motion.div
          key={p.name}
          className="absolute flex flex-col items-center gap-2"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.65,
            scale: 1,
            y: [0, -14, 0],
            rotate: [p.rotate - 6, p.rotate + 6, p.rotate - 6],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 + i * 0.08 },
            scale: { duration: 0.6, delay: 0.2 + i * 0.08 },
            y: {
              duration: 3.2 + (i % 4) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            },
            rotate: {
              duration: 3.6 + (i % 3) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            },
          }}
        >
          <div
            className="rounded-full overflow-hidden border-4 border-white shadow-lg"
            style={{ width: p.size, height: p.size }}
          >
            <img
              src={p.photo}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[15px] font-bold uppercase tracking-[0.08em] text-text/70">
            {p.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide16Creditos({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 relative flex flex-col items-center justify-center gap-10 min-h-0 overflow-hidden text-center`}
    >
      <BalloonField />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <motion.h1
          {...up(0.1)}
          className="text-[48px] font-bold leading-[1.02] text-text tracking-[-0.03em] max-w-[900px]"
        >
          Tudo o que vocês viram aqui{" "}
          <em className="not-italic text-purple">
            foi construído por essas pessoas.
          </em>
        </motion.h1>
      </div>
    </div>
  );
}
