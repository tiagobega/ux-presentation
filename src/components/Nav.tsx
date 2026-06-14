import { SLIDE_CONFIG } from "../slides/config";

const SLIDE_LABELS = SLIDE_CONFIG.map((s) => s.label);

interface NavProps {
  current: number;
  total: number;
  action: string;
  actionIndex: number;
  totalActions: number;
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (i: number) => void;
  onQR: () => void;
}

const btnBase =
  "w-[30px] h-[30px] rounded-lg border border-black/[0.08] bg-black/[0.03] text-text/55 cursor-pointer text-[13px] flex items-center justify-center transition-all leading-none disabled:opacity-20 disabled:cursor-default enabled:hover:border-purple/30 enabled:hover:text-text enabled:hover:bg-purple/[0.06]";

export default function Nav({
  current,
  total,
  action,
  actionIndex,
  totalActions,
  isFirst,
  isLast,
  onPrev,
  onNext,
  onGoto,
  onQR,
}: NavProps) {
  const slideProgress = current / total;
  const actionProgress = (actionIndex + 1) / totalActions / total;
  const progress = (slideProgress + actionProgress) * 100;

  return (
    <nav className="relative z-[100] bg-white/[0.94] backdrop-blur-md border-t border-black/[0.08] px-8 py-[13px] grid grid-cols-3 gap-4 flex-shrink-0 items-center">
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#6d28d9] to-[#a78bfa] transition-[width] duration-400"
        style={{ width: `${progress}%` }}
      />

      <div className="font-mono text-[11px] font-bold tracking-[0.12em] text-purple/[0.45] whitespace-nowrap hidden sm:block">
        INTELICITY · BRANDING &amp; UX
      </div>

      <div className="flex gap-[6px] items-center justify-center">
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full border p-0 cursor-pointer transition-all flex-shrink-0 ${
              i === current
                ? "bg-purple border-purple shadow-[0_0_8px_rgba(124,58,237,0.35)] scale-[1.2]"
                : "border-purple/30 bg-transparent hover:border-purple/60 hover:bg-purple/[0.12]"
            }`}
            onClick={() => onGoto(i)}
            aria-label={label}
            title={label}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 justify-end">
        <button
          className={btnBase}
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Anterior"
        >
          ←
        </button>
        <span className="font-mono text-xs tracking-[0.08em] min-w-[80px] text-center whitespace-nowrap">
          {action} · {actionIndex + 1}/{totalActions}
        </span>
        <button
          className={btnBase}
          onClick={onNext}
          disabled={isLast}
          aria-label="Próximo"
        >
          →
        </button>
        <button
          className="font-mono text-[9px] tracking-[0.08em] h-[30px] px-[10px] rounded-lg border border-purple/20 text-purple/65 cursor-pointer flex items-center justify-center transition-all hover:border-purple/50 hover:text-purple bg-black/[0.03]"
          onClick={onQR}
          aria-label="Controle remoto"
        >
          QR
        </button>
      </div>
    </nav>
  );
}
