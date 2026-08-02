import type { SlideProps } from '../config'
import { DemoSlide } from './kit'

export default function Slide08DemoContrato({ action: _ }: SlideProps) {
  void _
  return (
    <DemoSlide
      eyebrow='Fluxo 03 · Contrato'
      titleSize='text-[62px]'
      title={
        <>
          Contrato <span className='text-purple'>=</span> dispositivos{' '}
          <span className='text-purple'>+</span> colaboradores{' '}
          <span className='text-purple'>+</span> pagamentos
        </>
      }
    />
  )
}
