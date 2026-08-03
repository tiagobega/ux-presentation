import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

/**
 * Módulo ainda não fechado — o roteiro pede para definir com o time
 * o que mostrar aqui antes da apresentação.
 */
export default function Slide11DemoColeta({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 06'
      tag='A confirmar'
      title='Coleta em campo'
      note='(fluxo a fechar com o time)'
    />
  )
}
