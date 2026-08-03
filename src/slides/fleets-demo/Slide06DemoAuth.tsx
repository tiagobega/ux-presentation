import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide06DemoAuth({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 01'
      title='Autenticação'
      chips={['Login', 'Perfil', 'Menu por permissão']}
    />
  )
}
