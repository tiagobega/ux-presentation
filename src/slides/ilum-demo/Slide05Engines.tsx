import type { SlideProps } from '../config'
import { RESULTADO, fmt } from './dados'
import { COR, Pagina, delay } from './ui'

/**
 * Slide 5 — Duas engines, o mesmo resultado. Terceira prova do Builder: **a
 * fidelidade**.
 *
 * Uma prova só: o Builder carregou o mesmo dado em PostgreSQL e em Oracle, e
 * o resultado saiu idêntico, linha por linha, das recusas (zero) aos pontos
 * do mapa. Tempo não entra aqui: está todo no slide 4, e um segundo total
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

export const ACTIONS = ['A comparação']

const CELULA = 'px-[1.4vw] py-[0.85vw] border-b'

export default function Slide05Engines(_: SlideProps) {
  return (
    <Pagina n={5} eyebrow='Builder' titulo='Duas engines, o mesmo resultado'>
      <div className='mx-auto w-[64vw]'>
        <div className='grid grid-cols-[1.4fr_1fr_1fr] text-[1.4vw] animate-ilum-in motion-reduce:animate-none' style={delay(0.15)}>
          <span className='px-[1.4vw] py-[0.85vw] text-[1.05vw] font-bold tracking-[0.06em] text-white' style={{ backgroundColor: COR.ameixa }}>
            RESULTADO
          </span>
          {['PostgreSQL', 'Oracle'].map((nome) => (
            <span key={nome} className='px-[1.4vw] py-[0.85vw] font-bold text-white' style={{ backgroundColor: COR.ameixa }}>
              {nome}
            </span>
          ))}
          {RESULTADO.map((l, i) => (
            <div key={l.nome} className='contents'>
              <span className={`${CELULA} font-semibold`} style={{ borderColor: COR.borda, backgroundColor: i % 2 ? '#fff' : COR.fundo }}>
                {l.nome}
              </span>
              {[l.pg, l.ora].map((v, j) => (
                <span
                  key={j}
                  className={`${CELULA} font-bold tabular-nums`}
                  style={{ borderColor: COR.borda, backgroundColor: i % 2 ? '#fff' : COR.fundo, color: COR.ameixa }}
                >
                  {fmt(v)}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className='mt-[1vw] block text-[1vw] animate-ilum-in motion-reduce:animate-none' style={{ color: COR.cinza, ...delay(0.6) }}>
          Conferido pelo Ilum: contagem inteira de cada tabela e hash do conteúdo de cada coluna, nas duas engines.
        </span>
      </div>
    </Pagina>
  )
}
