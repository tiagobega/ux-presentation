import { SLIDE_CONFIG } from '../slides/config'

const SLIDE_LABELS = SLIDE_CONFIG.map((s) => s.label)

interface NavProps {
  current: number
  total: number
  action: string
  actionIndex: number
  totalActions: number
  isFirst: boolean
  isLast: boolean
  onPrev: () => void
  onNext: () => void
  onGoto: (i: number) => void
  onQR: () => void
}

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
  const slideProgress = current / total
  const actionProgress = (actionIndex + 1) / totalActions / total
  const progress = (slideProgress + actionProgress) * 100

  return (
    <nav className="pres-nav">
      <div className="pres-progress" style={{ width: `${progress}%` }} />

      <div className="ic-wordmark">INTELICITY · BRANDING &amp; UX</div>

      <div className="pres-dots">
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={i}
            className={`pres-dot${i === current ? ' active' : ''}`}
            onClick={() => onGoto(i)}
            aria-label={label}
            title={label}
          />
        ))}
      </div>

      <div className="pres-controls">
        <button className="pres-btn" onClick={onPrev} disabled={isFirst} aria-label="Anterior">
          ←
        </button>
        <span className="pres-counter">
          {action} · {actionIndex + 1}/{totalActions}
        </span>
        <button className="pres-btn" onClick={onNext} disabled={isLast} aria-label="Próximo">
          →
        </button>
        <button className="pres-btn pres-btn-qr" onClick={onQR} aria-label="Controle remoto">
          QR
        </button>
      </div>
    </nav>
  )
}
