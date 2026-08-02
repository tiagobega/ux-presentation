import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide14DemoGestores({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Para gestores · Dashboards'
      title={
        <>
          O dado vira <Accent>indicador.</Accent>
        </>
      }
      sub='Sem montar planilha.'
    />
  )
}
