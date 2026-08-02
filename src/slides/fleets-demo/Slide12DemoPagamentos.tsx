import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide12DemoPagamentos({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 07 · Pagamentos'
      title={
        <>
          Fechar <Accent>o mês.</Accent>
        </>
      }
      chips={['Individual', 'Lote', 'Exportar']}
    />
  )
}
