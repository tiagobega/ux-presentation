import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide13DemoAlertas({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 08 · Alertas'
      tag='Beta'
      title={
        <>
          Hardware <Accent>pedindo atenção.</Accent>
        </>
      }
      note='(fonte e regras ainda amadurecendo)'
    />
  )
}
