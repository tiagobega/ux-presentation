import { motion } from "motion/react";
import { SLIDE_PADDING, type SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

const up = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut, delay },
});

const TXT = "#1a1225";
const TXT2 = "rgba(26,18,37,0.55)";
const BORDER = "rgba(26,18,37,0.14)";
const BORDER2 = "rgba(26,18,37,0.10)";
const PURPLE = "#7c3aed";
const VISION = "#7c6ef5";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide7StackIC({ action: _ }: SlideProps) {
  return (
    <div className={`${SLIDE_PADDING} flex-1 flex flex-col gap-5 min-h-0 overflow-hidden`}>
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
          Stack IC: <em className="not-italic text-purple">a árvore do dado.</em>
          <span className="text-[18px] font-light text-text/45 ml-4">
            de onde vem → como é processado → como é exibido
          </span>
        </motion.h1>
      </div>

      <motion.div {...up(0.25)} className="flex-1 min-h-0">
        <svg
          viewBox="0 0 1200 760"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          <defs>
            <marker id="ic-ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill={PURPLE} opacity="0.5" />
            </marker>
            <marker id="ic-ahg" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill={VISION} opacity="0.85" />
            </marker>
          </defs>

          <g transform="translate(1196 14)" textAnchor="end">
            <text fontSize="11" letterSpacing="2" fill={PURPLE} opacity="0.7">PROPOSTA DE BRANDING</text>
            <text y="15" fontSize="10" letterSpacing="1" fill={TXT2}>não é arquitetura técnica oficial</text>
          </g>

          {/* left rail */}
          <g fontFamily="'Space Mono', monospace">
            <g transform="translate(8 92)"><text fontSize="12" letterSpacing="2" fill={PURPLE} opacity="0.85">COPA</text><text y="16" fontSize="10" fill={TXT2}>Exibição</text></g>
            <g transform="translate(8 248)"><text fontSize="12" letterSpacing="2" fill={PURPLE} opacity="0.85">GALHOS</text><text y="16" fontSize="10" fill={TXT2}>Processamento</text></g>
            <g transform="translate(8 430)"><text fontSize="12" letterSpacing="2" fill={PURPLE} opacity="0.6">GATEWAY</text><text y="16" fontSize="10" fill={TXT2}>só hardware</text></g>
            <g transform="translate(8 580)"><text fontSize="12" letterSpacing="2" fill={PURPLE} opacity="0.85">RAÍZES</text><text y="16" fontSize="10" fill={TXT2}>Fontes</text></g>
            <g transform="translate(8 688)"><text fontSize="12" letterSpacing="2" fill={PURPLE} opacity="0.55">SOLO</text><text y="16" fontSize="10" fill={TXT2}>Apoio</text></g>
          </g>

          {/* processing zone */}
          <rect x="178" y="214" width="998" height="96" rx="10" fill={PURPLE} fillOpacity="0.03" stroke={BORDER} strokeDasharray="6 6" opacity="0.7" />

          {/* inbound */}
          <g fill="none" stroke={PURPLE} strokeWidth="1.4">
            <path d="M283 560 L283 470" opacity="0.5" markerEnd="url(#ic-ah)" />
            <path d="M283 400 L300 312" opacity="0.5" markerEnd="url(#ic-ah)" />
            <path d="M283 400 L210 312" opacity="0.28" />
            <path d="M283 400 L460 312" opacity="0.28" />
            <path d="M479 560 L479 312" opacity="0.5" markerEnd="url(#ic-ah)" />
            <path d="M675 560 L675 312" opacity="0.5" markerEnd="url(#ic-ah)" />
            <path d="M871 560 L871 312" opacity="0.5" markerEnd="url(#ic-ah)" />
            <path d="M1067 560 L1067 312" opacity="0.5" markerEnd="url(#ic-ah)" />
          </g>
          {/* processing -> exhibition */}
          <g fill="none" stroke={PURPLE} strokeWidth="1.4" opacity="0.4">
            <path d="M420 214 L675 184" />
            <path d="M675 214 L675 184" />
            <path d="M930 214 L675 184" />
            <path d="M675 184 L515 130" markerEnd="url(#ic-ah)" />
            <path d="M675 184 L835 130" markerEnd="url(#ic-ah)" />
          </g>
          {/* SGC loop */}
          <path d="M194 276 C150 280, 132 308, 168 324" fill="none" stroke={VISION} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ic-ahg)" />
          <path d="M168 336 C130 336, 150 290, 192 286" fill="none" stroke={VISION} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ic-ahg)" />

          {/* COPA */}
          <g>
            <rect x="385" y="66" width="260" height="62" rx="6" fill="#fff" fillOpacity="0.55" stroke={PURPLE} strokeWidth="1.5" />
            <text x="404" y="96" fontSize="18" fontWeight="700" fill={TXT}>IC Face</text>
            <text x="404" y="116" fontSize="12" fill={TXT2}>tudo que o cliente vê</text>
            <rect x="705" y="66" width="260" height="62" rx="6" fill="#fff" fillOpacity="0.55" stroke={PURPLE} strokeWidth="1.5" />
            <text x="724" y="96" fontSize="18" fontWeight="700" fill={TXT}>IC Query</text>
            <text x="724" y="116" fontSize="12" fill={TXT2}>LLM · agentes · MCPs</text>
          </g>

          {/* SGC satellite */}
          <g>
            <rect x="30" y="322" width="150" height="52" rx="6" fill={VISION} fillOpacity="0.08" stroke={VISION} strokeWidth="1.3" strokeDasharray="5 4" />
            <text x="45" y="346" fontSize="14" fontWeight="700" fill={TXT}>↺ IC Classify</text>
            <text x="45" y="363" fontSize="10" fill={TXT2}>SGC · valida p/ treino</text>
          </g>

          {/* GALHOS */}
          <g fontSize="16" fontWeight="700">
            {[
              { x: 194, c: VISION, n: "IC Vision", d: "imagens e stream", stroke: VISION },
              { x: 390, c: "#d4c53a", n: "IC Lumen", d: "luminosidade" },
              { x: 586, c: "#7a9ab8", n: "IC Quality", d: "asfalto · IRI" },
              { x: 782, c: "#e87c3a", n: "IC Gas", d: "vazamento de gás" },
              { x: 978, c: "#2d7a4e", n: "IC Tree", d: "árvores" },
            ].map((m) => (
              <g key={m.n}>
                <rect x={m.x} y="230" width="178" height="64" rx="6" fill="#fff" fillOpacity="0.55" stroke={m.stroke ?? BORDER} strokeWidth={m.stroke ? 1.5 : 1} />
                <circle cx={m.x + 22} cy="256" r="5" fill={m.c} />
                <text x={m.x + 38} y="261" fill={TXT}>{m.n}</text>
                <text x={m.x + 18} y="282" fontSize="11" fontWeight="400" fill={TXT2}>{m.d}</text>
              </g>
            ))}
          </g>

          {/* GATEWAY: Fleets */}
          <g>
            <rect x="183" y="400" width="200" height="70" rx="8" fill={PURPLE} fillOpacity="0.10" stroke={PURPLE} strokeWidth="2" />
            <text x="283" y="432" textAnchor="middle" fontSize="21" fontWeight="800" fill={TXT}>IC Fleets</text>
            <text x="283" y="453" textAnchor="middle" fontSize="11" fill={TXT2}>gateway de hardware</text>
          </g>

          {/* RAÍZES */}
          <g fontSize="14" fontWeight="600">
            {[
              { x: 194, n: "Hardwares", d: "sensores · via Fleets" },
              { x: 390, n: "Denúncias", d: "direto ao processo" },
              { x: 586, n: "WFM", d: "direto ao processo" },
              { x: 782, n: "Salesforce", d: "direto ao processo" },
              { x: 978, n: "Informs", d: "direto ao processo" },
            ].map((r) => (
              <g key={r.n}>
                <rect x={r.x} y="558" width="178" height="56" rx="6" fill="#fff" fillOpacity="0.5" stroke={BORDER2} />
                <text x={r.x + 89} y="584" textAnchor="middle" fill={TXT}>{r.n}</text>
                <text x={r.x + 89} y="602" textAnchor="middle" fontSize="11" fontWeight="400" fill={TXT2}>{r.d}</text>
              </g>
            ))}
          </g>

          {/* SOLO */}
          <line x1="194" y1="646" x2="1156" y2="646" stroke={BORDER} strokeWidth="1" strokeDasharray="4 5" opacity="0.6" />
          <g fontSize="15" fontWeight="700">
            <rect x="375" y="668" width="280" height="54" rx="6" fill="#fff" fillOpacity="0.5" stroke={BORDER} strokeDasharray="5 4" />
            <circle cx="399" cy="694" r="5" fill="#3ad47e" />
            <text x="414" y="692" fill={TXT}>IC News</text>
            <text x="414" y="710" fontSize="11" fontWeight="400" fill={TXT2}>releases · feedback interno</text>
            <rect x="695" y="668" width="280" height="54" rx="6" fill="#fff" fillOpacity="0.5" stroke={BORDER} strokeDasharray="5 4" />
            <circle cx="719" cy="694" r="5" fill="#3a9ed4" />
            <text x="734" y="692" fill={TXT}>IC Labs</text>
            <text x="734" y="710" fontSize="11" fontWeight="400" fill={TXT2}>P&amp;D · brainstorms</text>
          </g>
        </svg>
      </motion.div>

      <motion.div {...up(0.5)} className="border border-purple/20 bg-purple/[0.04] px-10 py-5">
        <div className="text-[26px] font-bold text-text tracking-[-0.02em]">
          A Stack IC não cria novos projetos.{" "}
          <span className="text-purple">Ela dá direção para os que já existem.</span>
        </div>
      </motion.div>
    </div>
  );
}
