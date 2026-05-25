import { useState, useEffect, useCallback, useRef, type ComponentType } from 'react'
import Background from './Background'
import Nav from './Nav'
import QROverlay from './QROverlay'
import { useRemoteControl } from '../hooks/useRemoteControl'
import Slide01 from '../slides/Slide01Fundamento'
import Slide02 from '../slides/Slide02Desafio'
import Slide03 from '../slides/Slide03Crescimento'
import Slide04 from '../slides/Slide04Branding'
import Slide05 from '../slides/Slide05StackIC'
import Slide06 from '../slides/Slide06Escopo'
import { SLIDE_CONFIG, type SlideProps } from '../slides/config'

const SLIDES: ComponentType<SlideProps>[] = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06]

export default function Presentation() {
  const [slide, setSlide] = useState(0)
  const [step, setStep] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'fwd' | 'bwd'>('fwd')
  const [showQR, setShowQR] = useState(false)
  const total = SLIDES.length

  const slideRef = useRef(slide)
  const stepRef = useRef(step)
  slideRef.current = slide
  stepRef.current = step

  const next = useCallback(() => {
    const s = slideRef.current
    const t = stepRef.current
    const totalSteps = SLIDE_CONFIG[s].stepLabels.length
    if (t < totalSteps - 1) {
      setStep(t + 1)
    } else if (s < total - 1) {
      setSlideDirection('fwd')
      setSlide(s + 1)
      setStep(0)
    }
  }, [total])

  const prev = useCallback(() => {
    const s = slideRef.current
    const t = stepRef.current
    if (t > 0) {
      setStep(t - 1)
    } else if (s > 0) {
      setSlideDirection('bwd')
      const prevSlide = s - 1
      setSlide(prevSlide)
      setStep(SLIDE_CONFIG[prevSlide].stepLabels.length - 1)
    }
  }, [])

  const gotoSlide = useCallback((i: number) => {
    const s = slideRef.current
    setSlideDirection(i > s ? 'fwd' : 'bwd')
    setSlide(i)
    setStep(0)
  }, [])

  const handleRemote = useCallback(
    (action: 'prev' | 'next') => {
      if (action === 'prev') prev()
      else next()
    },
    [prev, next],
  )

  useRemoteControl(handleRemote)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showQR) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, showQR])

  useEffect(() => {
    let startX = 0
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }
    const onEnd = (e: TouchEvent) => {
      if (showQR) return
      const diff = startX - e.changedTouches[0].clientX
      if (diff > 50) next()
      else if (diff < -50) prev()
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [next, prev, showQR])

  // Broadcast presentation state to mobile controller
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const config = SLIDE_CONFIG[slide]
    fetch('/remote-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slide,
        step,
        slideLabel: config.label,
        stepLabel: config.stepLabels[step],
        totalSteps: config.stepLabels.length,
        totalSlides: total,
      }),
    }).catch(() => {})
  }, [slide, step, total])

  const SlideComponent = SLIDES[slide]
  const config = SLIDE_CONFIG[slide]
  const isFirst = slide === 0 && step === 0
  const isLast = slide === total - 1 && step === config.stepLabels.length - 1

  return (
    <div className="presentation">
      <Background />
      <div className="slide-area">
        <div key={slide} className={`slide slide-${slideDirection}`}>
          <div className="slide-inner">
            <SlideComponent step={step} />
          </div>
        </div>
      </div>
      <Nav
        current={slide}
        total={total}
        step={step}
        stepLabel={config.stepLabels[step]}
        totalSteps={config.stepLabels.length}
        isFirst={isFirst}
        isLast={isLast}
        onPrev={prev}
        onNext={next}
        onGoto={gotoSlide}
        onQR={() => setShowQR(true)}
      />
      {showQR && <QROverlay onClose={() => setShowQR(false)} />}
    </div>
  )
}
