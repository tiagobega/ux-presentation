import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide14DemoGestores({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 09 · Para gestores'
      title='Dashboards'
      chips={['KPIs', 'Metas × realizado', 'Comparação de frota']}
    />
  )
}
