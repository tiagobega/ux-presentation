import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide07DemoCadastros({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 02'
      title='Cadastros base'
      chips={['Usuários', 'Tipos', 'Chips']}
    />
  )
}
