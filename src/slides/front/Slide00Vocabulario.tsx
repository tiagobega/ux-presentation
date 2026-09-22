import type { SlideProps } from '../config'
import { Chip, Frame, delay } from './ui'

/**
 * Plataforma, produto e serviço.
 *
 * Quatro etapas sobre a mesma pilha, que nunca se reposiciona: uma camada
 * acende por etapa, de baixo para cima, e as anteriores continuam acesas. A
 * última etapa desenha as ligações entre elas e abre a regra do rodapé.
 *
 * A faixa da regra fica sempre no DOM, só invisível — se ela entrasse na
 * última etapa, a pilha inteira subiria um degrau no meio da fala.
 */

interface Camada {
  /** Rótulo da etapa na nav e título da camada. */
  nome: string
  resumo: string
  itens: string[]
}

/** Na ordem em que acendem: a base primeiro. Na tela a pilha aparece invertida. */
const CAMADAS: Camada[] = [
  {
    nome: 'Plataforma',
    resumo: 'A base da aplicação, onde conseguimos acoplar tanto módulos quanto serviços.',
    itens: ['Base de micro front-ends', 'Design System', 'Autenticação'],
  },
  {
    nome: 'Produto',
    resumo:
      'Módulos construídos a partir da necessidade de um usuário, de forma que possam ser usados em qualquer plataforma.',
    itens: ['Query', 'Informs', 'Gates', 'Obras / Planejamento'],
  },
  {
    nome: 'Serviço',
    resumo: 'Nossas aplicações específicas para cidades e clientes.',
    itens: ['Uberlândia', 'SABESP', 'Recape'],
  },
]

/** Como cada camada se prende na de baixo. Entra junto com a regra, na última etapa. */
const LIGACOES = [
  'um serviço é a composição de produtos',
  'um produto se encaixa pelos contratos da plataforma',
]

export const ACTIONS = [...CAMADAS.map((c) => c.nome), 'Como se combinam']

export default function Slide00Vocabulario({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  /** Quantas camadas já estão acesas: 1 na primeira etapa, 3 no fecho. */
  const acesas = Math.min(step + 1, CAMADAS.length)
  const fecho = step === ACTIONS.length - 1

  /** De cima para baixo: serviço, produto, plataforma. */
  const pilha = [...CAMADAS].reverse()

  return (
    <Frame
      title='Plataforma, produto e serviço'
      note='Hoje chamamos tudo de produto. Sem essas três palavras não existe catálogo: não há como vender um módulo se não há nome para módulo.'
    >
      <div className='flex flex-col gap-2'>
        {pilha.map((c, i) => {
          const ordem = CAMADAS.indexOf(c)
          const aceso = ordem < acesas
          const atual = ordem === step
          const caixa = atual
            ? 'border-[#6d28d9] bg-[#f3ebff] shadow-[0_0_0_4px_rgba(124,58,237,0.12)]'
            : aceso
              ? 'border-[#c3aadc] bg-[#f6f0fe]'
              : 'border-[#e0d7ea] bg-[#ffffff70]'

          return (
            <div key={c.nome}>
              <article
                className={`rounded-xl border p-5 grid grid-cols-[minmax(150px,0.8fr)_minmax(0,1.6fr)_minmax(0,1.3fr)] gap-6 items-center transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none max-[900px]:grid-cols-1 max-[900px]:gap-3 animate-ilum-rise motion-reduce:animate-none ${caixa}`}
                style={delay(0.1 + i * 0.08)}
              >
                <h2
                  className={`text-[clamp(20px,2.1vw,34px)] font-[700] tracking-[-0.6px] leading-[1.1] ${
                    aceso ? 'text-[#3d2b52]' : 'text-[#a595b4]'
                  }`}
                >
                  {c.nome}
                </h2>
                <p
                  className={`text-[clamp(12px,1.05vw,16px)] leading-[1.45] ${
                    aceso ? 'text-[#5b4b6c]' : 'text-[#b3a6bf]'
                  }`}
                >
                  {c.resumo}
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {c.itens.map((item) => (
                    <Chip key={item} aceso={aceso}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </article>

              {/* Ligação com a camada de baixo. Ocupa o lugar desde sempre. */}
              {i < pilha.length - 1 && (
                <p
                  className={`text-center text-[11px] tracking-[0.06em] text-[#7c3aed] py-1.5 transition-opacity duration-300 motion-reduce:transition-none ${
                    fecho ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  ↑ {LIGACOES[i]}
                </p>
              )}
            </div>
          )
        })}

        <p
          className={`rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-4 mt-2 transition-opacity duration-300 motion-reduce:transition-none ${
            fecho ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Uma plataforma, um produto reutilizável e um serviço sob medida não têm o mesmo custo,
          nem o mesmo preço.
        </p>
      </div>
    </Frame>
  )
}
