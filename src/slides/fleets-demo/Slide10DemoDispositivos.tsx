import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide10DemoDispositivos({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 05 · Dispositivos'
      title={
        <>
          Ciclo <Accent>do hardware.</Accent>
        </>
      }
      chips={['Mapa', 'Tabela', 'Instalação', 'Lote']}
    />
  )
}
