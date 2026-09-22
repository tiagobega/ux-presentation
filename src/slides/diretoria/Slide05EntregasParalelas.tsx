import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Termo, delay } from './ui'

/**
 * Slide 5 — Entregas em paralelo.
 *
 * O que o time entrega **além** do que o plano do ILUM prevê. Fecha o deck
 * depois do cronograma de propósito: primeiro a diretoria vê o plano, depois
 * vê que ele não é o único compromisso em curso.
 *
 * Os descritores dizem **o que a coisa é**, não em que pé ela está. Status de
 * portfólio envelhece entre a escrita e a reunião, e a tela não tem como
 * mostrar que envelheceu; o que cada produto é, não muda.
 */

interface Entrega {
  nome: string
  descricao: string
}

const ENTREGAS: Entrega[] = [
  { nome: 'Fleets', descricao: 'Auxiliar de agendamento e instalação' },
  { nome: 'Obras · Planejamento', descricao: 'Produto construído com os gerentes de projeto' },
  { nome: 'Informs', descricao: 'Formulários em campo, do template ao envio' },
  { nome: 'ERP', descricao: 'Ferramenta de solicitação de reembolso' },
  { nome: 'Comgas', descricao: 'Aplicação de RFID' },
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
            className='px-6 py-7 animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.12 + i * 0.08)}
          >
            <Termo>{e.nome}</Termo>
            <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.4] mt-3 text-[#64566f]'>
              {e.descricao}
            </p>
          </Cartao>
        ))}
      </div>
    </Frame>
  )
}
