import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Selo, Termo, delay, type Situacao } from './ui'

/**
 * Slide 5 — Entregas em paralelo.
 *
 * O que o time entrega **além** do que o plano do ILUM prevê. Fecha o deck
 * depois do cronograma de propósito: primeiro a diretoria vê o plano, depois
 * vê que ele não é o único compromisso em curso.
 *
 * Cada bloquinho traz o que a coisa é e em que pé ela está. O status envelhece
 * entre a escrita e a reunião, então o rodapé carrega a data do levantamento —
 * é o que permite apresentar situação sem que ela vire promessa.
 *
 * Só o Fleets tem data. As demais frentes não têm data informada, e o cartão
 * diz isso em vez de inventar uma.
 */

interface Entrega {
  nome: string
  descricao: string
  situacao: string
  data?: string
  estado: Situacao
}

const ENTREGAS: Entrega[] = [
  {
    nome: 'Fleets',
    descricao: 'Auxiliar de agendamento e instalação',
    situacao: 'Guia de instalação',
    data: 'SET/26',
    estado: 'agora',
  },
  {
    nome: 'Obras · Planejamento',
    descricao: 'Produto construído com os gerentes de projeto',
    situacao: 'Obras entregue · Planejamento em homologação (POA)',
    estado: 'agora',
  },
  {
    nome: 'Informs',
    descricao: 'Formulários em campo, do template ao envio',
    situacao: 'PWA entregue · painel em evolução',
    estado: 'agora',
  },
  {
    nome: 'ERP',
    descricao: 'Ferramenta de solicitação de reembolso',
    situacao: 'A confirmar',
    estado: 'aSeguir',
  },
  {
    nome: 'Comgas',
    descricao: 'Aplicação de RFID',
    situacao: 'Reestruturação em andamento',
    estado: 'agora',
  },
]

export const ACTIONS = ['As entregas']

export default function Slide05EntregasParalelas({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Entregas em paralelo'>
      <div>
        <Rotulo>ALÉM DO QUE O PLANO DO ILUM PREVÊ</Rotulo>
      </div>

      <div className='grid grid-cols-5 gap-4 max-[900px]:grid-cols-2'>
        {ENTREGAS.map((e, i) => (
          <Cartao
            key={e.nome}
            estado='aceso'
            className='px-5 py-6 flex flex-col animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.12 + i * 0.08)}
          >
            <Termo>{e.nome}</Termo>
            <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.4] mt-2.5 text-[#64566f]'>
              {e.descricao}
            </p>
            <div className='mt-auto pt-4'>
              <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.4] text-[#5a3581] font-[600]'>
                {e.situacao}
              </p>
              {e.data && (
                <span className='inline-block mt-2'>
                  <Selo situacao={e.estado}>{e.data}</Selo>
                </span>
              )}
            </div>
          </Cartao>
        ))}
      </div>

      <div className='text-center'>
        <Rotulo>SITUAÇÃO LEVANTADA EM SET/26 · DATAS A CONFIRMAR COM CADA FRENTE</Rotulo>
      </div>
    </Frame>
  )
}
