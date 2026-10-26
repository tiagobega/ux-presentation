import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '../config'
import { RESULTADO, fmt } from './dados'
import { COR, Pagina, TelaParte, delay } from './ui'

/**
 * Slide 5 — Duas engines, o mesmo resultado. Terceira prova do Builder: **a
 * fidelidade**.
 *
 * Uma prova só: o Builder carregou o mesmo dado em PostgreSQL e em Oracle, e
 * as contagens extraídas do Yoda batem com os dois Grogus. Grupos e pontos
 * são derivados no projeto, por isso não têm contagem de origem. A validação
 * de conteúdo entre engines usa hashes por amostra. Tempo não entra aqui:
 * está todo no slide 4, e um segundo total
 * neste slide só confundia.
 *
 * A legenda embaixo diz como a igualdade foi conferida (ADR-0036), sem frase
 * de efeito.
 *
 * Os nomes das engines vão sem fornecedor de hospedagem: para a plateia,
 * "PostgreSQL" e "Oracle" bastam.
 *
 * Fonte: seções 3 e 4 do relatório do run de 25/10 e a rodada dos jobs
 * (`dados.ts`).
 */

export const ACTIONS = ['A comparação', 'Dentro do Router']

const CELULA = 'px-[1.4vw] py-[0.85vw] border-b'

export default function Slide05Engines({ action }: SlideProps) {
  const dentro = action === 'Dentro do Router'
  const reduzido = useReducedMotion()
  return (
    <Pagina n={7} eyebrow='Builder' titulo='Duas engines, o mesmo resultado'>
      <div className='mx-auto w-[82vw]'>
        <div className='grid grid-cols-[1.4fr_1fr_1fr_1fr] text-[1.4vw] animate-ilum-in motion-reduce:animate-none' style={delay(0.15)}>
          <span className='px-[1.4vw] py-[0.85vw] text-[1.05vw] font-bold tracking-[0.06em] text-white' style={{ backgroundColor: COR.ameixa }}>
            RESULTADO
          </span>
          {[
            { nome: 'Banco Yoda', detalhe: 'recorte extraído' },
            { nome: 'PostgreSQL', detalhe: 'Grogu do projeto' },
            { nome: 'Oracle', detalhe: 'Grogu do projeto' },
          ].map(({ nome, detalhe }) => (
            <span key={nome} className='px-[1.4vw] py-[0.85vw] font-bold text-white' style={{ backgroundColor: COR.ameixa }}>
              {nome}
              <span className='block mt-[0.2vw] text-[0.9vw] font-medium text-white/75'>{detalhe}</span>
            </span>
          ))}
          {RESULTADO.map((l, i) => (
            <div key={l.nome} className='contents'>
              <span className={`${CELULA} font-semibold`} style={{ borderColor: COR.borda, backgroundColor: i % 2 ? '#fff' : COR.fundo }}>
                {l.nome}
              </span>
              {[l.yoda, l.pg, l.ora].map((v, j) => (
                <span
                  key={j}
                  className={`${CELULA} font-bold tabular-nums`}
                  style={{ borderColor: COR.borda, backgroundColor: i % 2 ? '#fff' : COR.fundo, color: COR.ameixa }}
                >
                  {v === null ? '—' : fmt(v)}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className='mt-[1vw] block text-[1vw] animate-ilum-in motion-reduce:animate-none' style={{ color: COR.cinza, ...delay(0.6) }}>
          As contagens extraídas do Yoda conferem nos dois Grogus. Entre engines: contagem inteira e hash do conteúdo por amostra.
        </span>
      </div>
      {/* Mesmo quadro que abre o slide 6, como na passagem do Builder. */}
      <motion.div
        className='pointer-events-none absolute inset-0 z-20'
        initial={false}
        animate={{
          opacity: dentro ? 1 : 0,
          clipPath: dentro || reduzido ? 'inset(0% 0%)' : 'inset(42% 38%)',
        }}
        transition={{ duration: reduzido ? 0 : 0.85, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden={!dentro}
      >
        <TelaParte parte='Router' />
      </motion.div>
    </Pagina>
  )
}
