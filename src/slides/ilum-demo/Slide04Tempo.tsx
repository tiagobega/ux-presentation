import { Hourglass } from 'lucide-react'
import type { SlideProps } from '../config'
import { BANCO_TOTAL, LEITURA_DO_YODA, RECORTE, TEMPO, duracao, fmt } from './dados'
import { COR, Pagina, Rotulo, delay } from './ui'

/**
 * Slide 4 — Do zero ao projeto no ar. Segunda prova do Builder: **o tempo**.
 * É o único lugar do deck com tempo: o slide 5 trata só do resultado.
 *
 * **As duas engines com o mesmo peso:** dois totais do mesmo tamanho e duas
 * barras na mesma escala, uma por engine, cada uma com as etapas **dela**
 * (o relatório dá o tempo de cada etapa por engine). O banco das duas roda no
 * mesmo run e fecha junto, depois da validação entre elas; por isso a barra
 * do PostgreSQL tem um trecho tracejado de **espera**: ele termina antes e
 * aguarda o Oracle. Esse trecho fica fora da legenda: listrado e com uma
 * ampulheta, ele se explica sozinho. A chave "Banco · 41,1 min" cobre o mesmo comprimento nas
 * duas barras.
 *
 * Cada barra é **proporcional ao tempo**: a migração dos dados domina, e isso
 * é o dado. Trechos curtos (17 s) ganham uma largura mínima, e a legenda diz o
 * tamanho real. Os rótulos ficam numa legenda de colunas, ligada pela cor.
 *
 * A nota de baixo carrega as ressalvas: o recorte, os jobs fora da rede do
 * banco (pior caso) e a leitura do Yoda como próxima melhoria.
 */

export const ACTIONS = ['O tempo']

/** Largura mínima de um trecho não vazio, em % da barra mais longa. */
const MINIMO = 2.2

type Etapa = (typeof TEMPO)[number]

/** A migração (o que domina) em ameixa; o resto do banco num tom acima; depois, malva; a espera, tracejada. */
function pintura(t: Etapa, i: number) {
  if (t.espera)
    return {
      backgroundColor: '#ffffff',
      backgroundImage: `repeating-linear-gradient(135deg, ${COR.lavanda} 0 6px, transparent 6px 12px)`,
      borderColor: COR.malva,
      borderStyle: 'dashed' as const,
    }
  const cor = i === 1 ? COR.ameixa : t.banco ? '#7A3A82' : '#B48DB9'
  return { backgroundColor: cor, borderColor: cor }
}

const ENGINES = [
  { nome: 'PostgreSQL', tempo: (t: Etapa) => t.pg },
  { nome: 'Oracle', tempo: (t: Etapa) => t.ora },
]

export default function Slide04Tempo(_: SlideProps) {
  const totais = ENGINES.map((e) => TEMPO.reduce((s, t) => s + e.tempo(t), 0))
  const maior = Math.max(...totais)

  // Larguras em % da barra mais longa, com mínimo para o que não é zero. Os
  // 97% deixam lugar para os vãos entre os trechos: sem isso o flex encolhe
  // os da barra cheia e as etapas desalinham.
  const brutas = ENGINES.map((e) => TEMPO.map((t) => (e.tempo(t) === 0 ? 0 : Math.max(MINIMO, (e.tempo(t) / maior) * 100))))
  const fator = 97 / Math.max(...brutas.map((b) => b.reduce((a, c) => a + c, 0)))
  const larguras = brutas.map((b) => b.map((w) => w * fator))
  // A chave do banco: o maior dos dois (as duas barras fecham o banco juntas).
  const larguraBanco = Math.max(...larguras.map((l) => TEMPO.reduce((s, t, i) => s + (t.banco ? l[i] : 0), 0)))

  return (
    <Pagina n={6} eyebrow='Builder' titulo='Do zero ao projeto no ar'>
      <div className='flex items-end justify-between animate-ilum-in motion-reduce:animate-none' style={delay(0.1)}>
        <div className='flex gap-[4vw]'>
          {ENGINES.map((e, i) => (
            <div key={e.nome}>
              <Rotulo>Tempo total · {e.nome}</Rotulo>
              <span className='block text-[3.4vw] font-bold leading-[1.05] tracking-[-0.02em] tabular-nums' style={{ color: COR.ameixa }}>
                ~{duracao(totais[i])}
              </span>
            </div>
          ))}
        </div>
        <span className='pb-[0.5vw] text-[1.2vw]' style={{ color: COR.cinza }}>
          {RECORTE.cidade} · {RECORTE.dias} dias · {fmt(RECORTE.imagens)} imagens
        </span>
      </div>

      <div className='flex flex-col gap-[0.6vw]'>
        <div className='flex'>
          <span className='w-[8vw] shrink-0' />
          <div className='flex-1'>
            <div
              className='flex items-end justify-between border-b-2 pb-[0.3vw] animate-ilum-in motion-reduce:animate-none'
              style={{ width: `${larguraBanco}%`, borderColor: COR.ameixa, ...delay(0.2) }}
            >
              <span className='text-[1vw] font-bold tracking-[0.06em]' style={{ color: COR.ameixa }}>
                BANCO · AS DUAS NO MESMO RUN
              </span>
              <span className='text-[1.2vw] font-bold tabular-nums' style={{ color: COR.ameixa }}>
                {duracao(BANCO_TOTAL)}
              </span>
            </div>
          </div>
        </div>

        {ENGINES.map((e, j) => (
          <div key={e.nome} className='flex items-center'>
            <span className='w-[8vw] shrink-0 text-[1.2vw] font-bold'>{e.nome}</span>
            <div className='flex flex-1 gap-[0.25vw]'>
              {TEMPO.map((t, i) =>
                larguras[j][i] === 0 ? null : (
                  <div
                    key={t.etapa}
                    className='flex h-[2.6vw] shrink-0 items-center justify-center border animate-ilum-sweep origin-left motion-reduce:animate-none'
                    style={{ width: `${larguras[j][i]}%`, ...pintura(t, i), ...delay(0.25 + i * 0.08 + j * 0.05) }}
                  >
                    {/* A espera não tem legenda: a ampulheta diz o que ela é. */}
                    {t.espera && <Hourglass className='size-[1.4vw]' strokeWidth={1.8} style={{ color: COR.malva }} aria-label='espera' />}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-[1vw] pl-[8vw]'>
        {TEMPO.map((t, i) => {
          if (t.espera) return null
          const iguais = t.pg === t.ora
          return (
            <div key={t.etapa} className='flex gap-[0.45vw] animate-ilum-in motion-reduce:animate-none' style={delay(0.55 + i * 0.06)}>
              <span className='mt-[0.25vw] size-[0.8vw] shrink-0 border' style={pintura(t, i)} />
              <div className='min-w-0'>
                <span className='block text-[0.95vw] font-bold leading-[1.2]'>{t.etapa}</span>
                {iguais ? (
                  <span className='block whitespace-nowrap text-[1.25vw] font-bold tabular-nums' style={{ color: COR.ameixa }}>
                    {t.aproximado ? '~' : ''}
                    {duracao(t.pg)}
                  </span>
                ) : (
                  // A etapa que difere: uma linha por engine, com o mesmo peso.
                  ENGINES.map((e) => (
                    <span key={e.nome} className='block text-[1vw] font-bold leading-[1.3] tabular-nums' style={{ color: COR.ameixa }}>
                      {t.aproximado ? '~' : ''}
                      {duracao(e.tempo(t))}{' '}
                      <span className='font-semibold' style={{ color: COR.cinza }}>
                        {e.nome}
                      </span>
                    </span>
                  ))
                )}
                <span className='block text-[0.8vw] leading-[1.35]' style={{ color: COR.cinza }}>
                  {t.detalhe}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <span className='text-[1vw] animate-ilum-in motion-reduce:animate-none' style={{ color: COR.cinza, ...delay(1) }}>
        Recorte de uma cidade e {RECORTE.dias} dias: mais dados, mais tempo. Os jobs rodaram fora da rede do banco, então
        esse é o pior caso. A leitura do Yoda ({duracao(LEITURA_DO_YODA)}) é a próxima melhoria.
      </span>
    </Pagina>
  )
}
