import type { SlideProps } from '../config'
import { Frame, Selo, delay, type Situacao } from './ui'

/**
 * Entregáveis.
 *
 * Três etapas, uma por situação, e os cartões acendem acumulando: primeiro o
 * que já existe, depois o que está em execução, por último o que vem a
 * seguir. A grade é a mesma nas três — os cartões que ainda não entraram
 * ficam apagados no lugar, em vez de aparecer e empurrar os vizinhos.
 */

interface Entregavel {
  nome: string
  descricao: string
  situacao: Situacao
  /** Texto da pílula. Varia dentro de uma mesma situação ("Em entrega", "Em andamento"). */
  selo: string
}

const ENTREGAVEIS: Entregavel[] = [
  {
    nome: 'Informs',
    descricao:
      'Primeiro produto nosso entregue como produto: marca, apresentação e distribuição próprias.',
    situacao: 'entregue',
    selo: 'Entregue',
  },
  {
    nome: 'Bibliotecas do Gates',
    descricao: 'A identidade já estruturada em biblioteca e em uso pelos produtos.',
    situacao: 'entregue',
    selo: 'Entregue',
  },
  {
    nome: 'Arquitetura de front-end',
    descricao:
      'Biblioteca de micro front-ends, registry e base de replicação. Entrega prevista para 27 de novembro.',
    situacao: 'execucao',
    selo: 'Em execução',
  },
  {
    nome: 'Design System',
    descricao: 'Componentes, tokens e tema aplicados a partir de um lugar só.',
    situacao: 'execucao',
    selo: 'Em execução',
  },
  {
    nome: 'Obras / Planejamento',
    descricao:
      'Primeiro produto construído sobre a nova base, junto com os gerentes de projeto.',
    situacao: 'execucao',
    selo: 'Em entrega',
  },
  {
    nome: 'Fleets',
    descricao:
      'Fluxo de instalação padronizado, para o dado nascer confiável já na origem.',
    situacao: 'execucao',
    selo: 'Em andamento',
  },
  {
    nome: 'Gates para Segurança e Infra',
    descricao:
      'A plataforma sai do escopo de front-end e passa para onde pertence.',
    situacao: 'transicao',
    selo: 'Em transição',
  },
  {
    nome: 'Observabilidade no front',
    descricao:
      'Baseline de uso, erro e adoção dos componentes compartilhados.',
    situacao: 'aSeguir',
    selo: 'A seguir',
  },
  {
    nome: 'Demonstração e catálogo',
    descricao:
      'Tematização por cliente, ambiente permanente de demo e catálogo de módulos para o Comercial.',
    situacao: 'aSeguir',
    selo: 'A seguir',
  },
]

/** Em que etapa cada situação acende. */
const GRUPO: Record<Situacao, number> = {
  entregue: 0,
  execucao: 1,
  transicao: 1,
  aSeguir: 2,
}

export const ACTIONS = ['Feito', 'Em execução', 'A seguir']

export default function Slide05Entregaveis({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))

  return (
    <Frame
      title='Entregáveis'
      note='Situação em setembro de 2026. Datas e escopos seguem o plano de arquitetura de front-end.'
    >
      <div className='grid grid-cols-3 gap-4 max-[900px]:grid-cols-1'>
        {ENTREGAVEIS.map((e, i) => {
          const aceso = GRUPO[e.situacao] <= step
          const atual = GRUPO[e.situacao] === step
          const caixa = atual
            ? 'border-[#6d28d9] bg-[#f3ebff]'
            : aceso
              ? 'border-[#c3aadc] bg-[#ffffffb0]'
              : 'border-[#e0d7ea] bg-[#ffffff60]'

          return (
            <article
              key={e.nome}
              className={`rounded-lg border p-5 transition-[background-color,border-color,opacity] duration-300 motion-reduce:transition-none animate-ilum-rise motion-reduce:animate-none ${caixa} ${
                aceso ? 'opacity-100' : 'opacity-40'
              }`}
              style={delay(0.1 + i * 0.05)}
            >
              <h2 className='text-[clamp(15px,1.35vw,21px)] font-[650] leading-[1.2] text-[#3d2b52]'>
                {e.nome}
              </h2>
              <div className='mt-2.5'>
                <Selo situacao={e.situacao}>{e.selo}</Selo>
              </div>
              <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.45] mt-2.5 text-[#64566f]'>
                {e.descricao}
              </p>
            </article>
          )
        })}
      </div>
    </Frame>
  )
}
