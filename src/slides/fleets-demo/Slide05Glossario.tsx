import { motion } from 'motion/react'
import QRCode from 'react-qr-code'
import type { SlideProps } from '../config'
import { GRUPOS, OURO, TERMOS } from '../../data/glossario'
import { useGlossarioUrl } from '../../hooks/useGlossarioUrl'
import { SlideShell, SlideHeader, Punch, up, easeIn } from './kit'

/**
 * O slide não descreve o vocabulário — ele entrega o QR e mostra a extensão
 * dele. A definição de cada palavra vive no celular da plateia
 * (`plugins/remoteControl.ts` → `/glossario`), que acompanha o slide atual.
 * Só os dois contratos ficam na tela: é a distinção que a fala precisa fazer.
 */
const PAREDE = GRUPOS.map((grupo) => ({
  grupo,
  termos: TERMOS.filter((t) => t.grupo === grupo && !t.ouro),
}))

export default function Slide05Glossario({ action: _ }: SlideProps) {
  void _
  const url = useGlossarioUrl()

  return (
    <SlideShell className='gap-7'>
      <SlideHeader eyebrow='Vocabulário da plataforma' title='Glossário' />

      <div className='flex-1 min-h-0 flex items-center gap-14'>
        <motion.div
          {...up(0.22)}
          className='shrink-0 flex flex-col items-center gap-5'
        >
          {/* Fundo claro e sólido: o QR é lido de longe, no celular da plateia. */}
          <div className='bg-white border border-purple/20 p-5'>
            {url ? (
              <QRCode
                value={url}
                size={300}
                bgColor='#ffffff'
                fgColor='#1a1225'
              />
            ) : (
              <div className='size-[300px] flex items-center justify-center font-mono text-[22px] text-text/25'>
                …
              </div>
            )}
          </div>

          <div className='text-center max-w-[280px]'>
            <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-none'>
              Aponte a câmera
            </div>
            <div className='mt-2 text-[16px] text-text/50 leading-[1.45]'>
              O glossário abre no seu celular e acompanha o que estamos vendo.
            </div>
          </div>
        </motion.div>

        <div className='flex-1 min-w-0 flex flex-col gap-9'>
          <div className='grid grid-cols-2 gap-5'>
            {OURO.map((t, i) => (
              <motion.div
                key={t.id}
                {...up(0.34 + i * 0.08, easeIn)}
                className='border border-purple/45 bg-purple/[0.1] px-7 py-6 flex flex-col gap-2'
              >
                <div className='text-[30px] font-bold text-purple tracking-[-0.03em] leading-none'>
                  {t.nome}
                </div>
                <div className='text-[18px] text-text/55 leading-[1.4]'>
                  {t.resumo}
                </div>
              </motion.div>
            ))}
          </div>

          <div className='flex flex-col gap-5'>
            <motion.div
              {...up(0.5, easeIn)}
              className='font-mono text-[12px] tracking-[0.16em] text-purple/50 uppercase'
            >
              + outros {TERMOS.length - OURO.length} termos no seu celular
            </motion.div>

            <div className='grid grid-cols-4 gap-x-7'>
              {PAREDE.map((col, ci) => (
                <motion.div
                  key={col.grupo}
                  {...up(0.58 + ci * 0.07, easeIn)}
                  className='flex flex-col gap-2.5'
                >
                  <div className='font-mono text-[11px] tracking-[0.16em] text-text/30 uppercase pb-1.5 border-b border-text/10'>
                    {col.grupo}
                  </div>
                  {col.termos.map((t) => (
                    <div
                      key={t.id}
                      className='text-[19px] text-text/65 leading-[1.25]'
                    >
                      {t.nome}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Punch delay={0.9}>
        Contrato de dados é para onde o device manda dado.{' '}
        <span className='text-purple'>
          Centro de custo é de onde sai o pagamento da pessoa.
        </span>
      </Punch>
    </SlideShell>
  )
}
