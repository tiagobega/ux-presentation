import type { SlideProps } from '../config'
import { Frame, Selo, delay, type Situacao } from './ui'

/**
 * Duas etapas.
 *
 * Fundação e Escala lado a lado, uma etapa por painel. A primeira estabelece
 * a base e entrega um produto sobre ela; a segunda transforma essa base em
 * capacidade comercial. Só os itens de front-end e de integração entram aqui.
 */

interface Etapa {
  nome: string
  quando: string
  situacao: Situacao
  selo: string
  itens: string[]
}

const ETAPAS: Etapa[] = [
  {
    nome: 'Fundação',
    quando: 'Até o fim de 2026',
    situacao: 'execucao',
    selo: 'Em execução',
    itens: [
      'Entregar a arquitetura de front-end',
      'Consolidar o Design System',
      'Padronizar a autenticação',
      'Entregar Obras / Planejamento sobre a nova base',
      'Padronizar o fluxo de instalação do Fleets',
      'Criar o baseline de métricas do front',
    ],
  },
  {
    nome: 'Escala',
    quando: 'Jan — Fev · 2027',
    situacao: 'aSeguir',
    selo: 'A seguir',
    itens: [
      'Migrar novos produtos para a arquitetura comum',
      'Ambiente permanente de demonstração',
      'Customização visual sem desenvolvimento',
      'Catálogo de módulos para o Comercial',
      'Dados de uso por cliente',
    ],
  },
]

export const ACTIONS = ETAPAS.map((e) => e.nome)

export default function Slide06Etapas({ action }: SlideProps) {
  const atual = Math.max(0, ACTIONS.indexOf(action))

  return (
    <Frame
      title='Duas etapas'
      note='Produtos e contratos continuam sendo atendidos durante a implementação.'
    >
      <div className='grid grid-cols-2 gap-7 items-start max-[900px]:grid-cols-1'>
        {ETAPAS.map((e, i) => (
          <section
            key={e.nome}
            className={`rounded-xl border p-6 transition-[background-color,border-color] duration-300 motion-reduce:transition-none animate-ilum-rise motion-reduce:animate-none ${
              i === atual ? 'border-[#7c3aed] bg-[#f3ebff]' : 'border-[#c3aadc] bg-[#ffffff90]'
            }`}
            style={delay(0.1 + i * 0.08)}
          >
            <div className='flex items-baseline justify-between gap-4 flex-wrap mb-4'>
              <h2 className='text-[clamp(19px,1.9vw,30px)] font-[700] tracking-[-0.6px] leading-[1.1] text-[#3d2b52]'>
                {e.nome}
              </h2>
              <span className='text-[11px] tracking-[1.1px] text-[#77618e]'>
                {e.quando.toUpperCase()}
              </span>
            </div>
            <Selo situacao={e.situacao}>{e.selo}</Selo>
            <div className='mt-4'>
              {e.itens.map((item) => (
                <p
                  key={item}
                  className='border-t border-t-[#dacfe6] py-3 text-[clamp(13px,1.1vw,16px)] leading-[1.45] text-[#3d2b52]'
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Frame>
  )
}
