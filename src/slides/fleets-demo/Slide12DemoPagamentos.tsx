import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide12DemoPagamentos({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 07'
      title='Pagamentos'
      chips={['Individual', 'Lote', 'Exportar']}
    />
  )
}
