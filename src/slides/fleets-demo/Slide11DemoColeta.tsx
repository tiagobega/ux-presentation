import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

/**
 * Módulo ainda não fechado — o roteiro pede para definir com o time
 * o que mostrar aqui antes da apresentação.
 */
export default function Slide11DemoColeta({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 06 · Coleta em campo'
      tag='A confirmar'
      title={
        <>
          Módulo <Accent>novo.</Accent>
        </>
      }
      note='(fluxo a fechar com o time)'
    />
  )
}
