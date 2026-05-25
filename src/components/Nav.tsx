import { SLIDE_CONFIG } from '../slides/config'

const SLIDE_LABELS = SLIDE_CONFIG.map((s) => s.label)

interface NavProps {
  current: number
  total: number
  step: number
  stepLabel: string
  totalSteps: number
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
  step,
  stepLabel,
  totalSteps,
  isFirst,
  isLast,
  onPrev,
  onNext,
  onGoto,
  onQR,
}: NavProps) {
  const slideProgress = current / total
  const stepProgress = (step + 1) / totalSteps / total
  const progress = (slideProgress + stepProgress) * 100

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
          {stepLabel} · {step + 1}/{totalSteps}
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
