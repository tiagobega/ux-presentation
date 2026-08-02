import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide07DemoCadastros({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 02 · Populando a aplicação'
      title={
        <>
          Antes de operar, <Accent>alguém semeia.</Accent>
        </>
      }
      sub='Cadastros base'
      chips={['Usuários', 'Tipos', 'Chips']}
    />
  )
}
