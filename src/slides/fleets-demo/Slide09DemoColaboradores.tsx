import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide09DemoColaboradores({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 04'
      title='Colaboradores e Veículos'
      titleSize='text-[68px]'
      chips={['Card', 'Tabela', 'Mapa']}
    />
  )
}
