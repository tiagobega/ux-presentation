import { motion } from 'motion/react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Accent, up, easeIn } from './kit'

const STEP2 = 'Frase de ouro'

interface Termo {
  nome: string
  /** Os dois contratos: o que a frase de ouro separa. */
  ouro?: boolean
}

// Agrupamento igual ao de `fleets-slides.md`: contratação · quem e o quê · operação.
const linhas: Termo[][] = [
  [
    { nome: 'Contrato de dados', ouro: true },
    { nome: 'Centro de custo', ouro: true },
    { nome: 'Meta' },
  ],
  [
    { nome: 'Colaborador' },
    { nome: 'Veículo' },
    { nome: 'Dispositivo' },
    { nome: 'Versão' },
  ],
  [{ nome: 'Instalação' }, { nome: 'Chip' }, { nome: 'Alerta' }],
]

export default function Slide05Glossario({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0
  let ordem = -1

  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='Glossário'
        title={
          <>
            O vocabulário <Accent>do Fleets.</Accent>
          </>
        }
        lead='Dez palavras. Sem elas, nenhum fluxo daqui pra frente faz sentido.'
      />

      <div className='flex-1 min-h-0 flex flex-col items-center justify-center gap-5'>
        {linhas.map((linha, li) => (
          <div key={li} className='flex items-center justify-center gap-5'>
            {linha.map((t) => {
              ordem += 1
              const apagado = phase === 1 && !t.ouro
              return (
                <motion.div
                  key={t.nome}
                  {...up(0.28 + ordem * 0.07, easeIn)}
                >
                  <motion.div
                    animate={{
                      opacity: apagado ? 0.22 : 1,
                      scale: phase === 1 && t.ouro ? 1.04 : 1,
                    }}
                    transition={{ duration: 0.45, ease: easeIn }}
                    className={`border px-9 py-8 ${
                      phase === 1 && t.ouro
                        ? 'border-purple/45 bg-purple/[0.1]'
                        : 'border-purple/15 bg-purple/[0.03]'
                    }`}
                  >
                    <span
                      className={`text-[34px] font-bold tracking-[-0.03em] leading-none whitespace-nowrap ${
                        phase === 1 && t.ouro ? 'text-purple' : 'text-text/85'
                      }`}
                    >
                      {t.nome}
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        ))}

        <motion.div
          animate={{ opacity: phase === 1 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className='font-mono text-[12px] tracking-[0.14em] text-text/30 uppercase mt-3'
        >
          Definições na fala · detalhe na documentação
        </motion.div>
      </div>

      <Bar kicker='Frase de ouro' visible={phase === 1} delay={0.15}>
        <span className='text-purple'>Contrato de dados</span> é para onde o
        device manda dado.{' '}
        <span className='text-purple'>Centro de custo</span> é de onde sai o
        pagamento da pessoa.
      </Bar>
    </SlideShell>
  )
}
