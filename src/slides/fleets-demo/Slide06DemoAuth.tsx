import type { SlideProps } from '../config'
import { DemoSlide, Accent } from './kit'

export default function Slide06DemoAuth({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 01 · Autenticação'
      title={
        <>
          Quem você é decide <Accent>o que você vê.</Accent>
        </>
      }
    />
  )
}
