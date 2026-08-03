import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide08DemoContrato({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 03'
      title='Contrato'
      // As três abas do detalhe do contrato.
      chips={['Dispositivos', 'Colaboradores', 'Pagamentos']}
    />
  )
}
