import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide10DemoDispositivos({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 05'
      title='Dispositivos'
      chips={['Mapa', 'Tabela', 'Instalação', 'Lote']}
    />
  )
}
