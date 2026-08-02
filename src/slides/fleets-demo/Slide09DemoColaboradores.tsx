import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide09DemoColaboradores({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 04 · Colaboradores e Veículos'
      title={
        <>
          A pessoa <Accent>no centro.</Accent>
        </>
      }
      chips={['Card', 'Tabela', 'Mapa']}
    />
  )
}
