import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Selo, Termo, delay, type Situacao } from './ui'

/**
 * Slide 5 — Entregas em paralelo.
 *
 * O que o time entrega **além** do que o plano do ILUM prevê. Fecha o deck
 * depois do cronograma de propósito: primeiro a diretoria vê o plano, depois
 * vê que ele não é o único compromisso em curso.
 *
 * É uma matriz de frente × item, e não uma lista de frentes: o que a diretoria
 * precisa fazer com esta tela é varrer o status, e para isso cada item tem que
 * carregar o seu. A cor do selo é o eixo de leitura — sólido é o que está
 * perto de entregar, contorno é o que está em execução, apagado é o que ainda
 * não começou. Quem varre as colunas vê onde a régua está sem ler uma palavra.
 *
 * O status envelhece entre a escrita e a reunião, então o rodapé carrega a
 * data do levantamento — é o que permite apresentar situação sem que ela vire
 * promessa. Só dois itens têm data informada; os demais não exibem nenhuma em
 * vez de exibir uma inventada.
 */

interface Item {
  o_que: string
  status: string
  estado: Situacao
}

interface Frente {
  nome: string
  itens: Item[]
}

/** Homologação é o mais perto de entregar, então é o selo mais forte. */
const HOMOLOGACAO: Situacao = 'feito'
const ANDAMENTO: Situacao = 'agora'
const PLANEJAMENTO: Situacao = 'aSeguir'

const FRENTES: Frente[] = [
  {
    nome: 'Fleets',
    itens: [
      {
        o_que: 'Fluxo de instalação de dispositivo assistido',
        status: 'Homologação 25/09',
        estado: HOMOLOGACAO,
      },
      {
        o_que: 'Gerenciador de estoque de hardwares',
        status: 'Em planejamento',
        estado: PLANEJAMENTO,
      },
    ],
  },
  {
    nome: 'Produto Obras',
    itens: [{ o_que: 'Sabesp', status: 'Em homologação', estado: HOMOLOGACAO }],
  },
  {
    nome: 'Produto Planejamento',
    itens: [
      { o_que: 'POA', status: 'Em homologação', estado: HOMOLOGACAO },
      { o_que: 'Recife', status: 'Homologação 25/09', estado: HOMOLOGACAO },
    ],
  },
  {
    nome: 'Informs',
    itens: [
      {
        o_que: 'Rebranding da aplicação',
        status: 'Em homologação no PWA',
        estado: HOMOLOGACAO,
      },
      { o_que: 'PWA', status: 'Em homologação', estado: HOMOLOGACAO },
      {
        o_que: 'Novo escopo para Uberlândia',
        status: 'Em planejamento',
        estado: PLANEJAMENTO,
      },
      {
        o_que: 'Plataforma acoplável para configuração e criação de templates',
        status: 'Em planejamento',
        estado: PLANEJAMENTO,
      },
    ],
  },
  {
    nome: 'ERP',
    itens: [
      {
        o_que: 'Avaliação de UX da ferramenta de propostas',
        status: 'Em andamento',
        estado: ANDAMENTO,
      },
      {
        o_que: 'Ferramenta de solicitação de reembolso',
        status: 'Aguardando documentação',
        estado: PLANEJAMENTO,
      },
    ],
  },
  {
    nome: 'Comgás · RFID',
    itens: [
      {
        o_que: 'Reestruturação completa da plataforma',
        status: 'Em planejamento',
        estado: PLANEJAMENTO,
      },
    ],
  },
]

export const ACTIONS = ['As entregas']

export default function Slide05EntregasParalelas({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Entregas em paralelo'>
      <div className='flex items-baseline justify-between gap-6 flex-wrap'>
        <Rotulo>ALÉM DO QUE O PLANO DO ILUM PREVÊ</Rotulo>
        <div className='flex items-center gap-2'>
          <Selo situacao={HOMOLOGACAO}>HOMOLOGAÇÃO</Selo>
          <Selo situacao={ANDAMENTO}>EM ANDAMENTO</Selo>
          <Selo situacao={PLANEJAMENTO}>PLANEJAMENTO</Selo>
        </div>
      </div>

      {/*
        Três colunas: a linha de baixo abre com o Informs, que tem quatro
        itens, e as duas linhas juntas ficam na altura de seis itens. Numa
        fileira única de seis, a coluna do Informs espremeria o texto em cinco
        linhas.

        `items-start` porque as frentes têm de um a quatro itens: com o esticão
        padrão do grid, a linha inteira ganhava a altura do Informs e o cartão
        do Comgás virava um retângulo com 250px de vazio embaixo. Cada cartão
        para onde o conteúdo dele acaba.
      */}
      <div className='grid grid-cols-3 items-start gap-4 max-[900px]:grid-cols-1'>
        {FRENTES.map((f, i) => (
          <Cartao
            key={f.nome}
            estado='aceso'
            className='px-5 py-4 flex flex-col animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.12 + i * 0.07)}
          >
            <Termo>{f.nome}</Termo>

            <ul className='mt-3 flex flex-col divide-y divide-[#e3d9ee]'>
              {f.itens.map((it) => (
                <li key={it.o_que} className='py-2 first:pt-0 last:pb-0'>
                  <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.35] text-[#4b3b5c]'>
                    {it.o_que}
                  </p>
                  <span className='inline-block mt-1.5'>
                    <Selo situacao={it.estado}>{it.status}</Selo>
                  </span>
                </li>
              ))}
            </ul>
          </Cartao>
        ))}
      </div>

      <div className='text-center'>
        <Rotulo>SITUAÇÃO LEVANTADA EM SET/26 · SÓ DOIS ITENS TÊM DATA INFORMADA</Rotulo>
      </div>
    </Frame>
  )
}
