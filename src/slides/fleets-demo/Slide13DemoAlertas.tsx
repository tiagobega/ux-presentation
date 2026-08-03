import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide13DemoAlertas({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 08'
      tag='Beta'
      title='Alertas'
      chips={['Lista', 'Detalhe', 'Resolver']}
    />
  )
}
