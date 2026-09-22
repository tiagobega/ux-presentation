import type { SlideProps } from '../config'
import { Frame, Rotulo, delay } from './ui'

/**
 * A fronteira entre plataforma e produto.
 *
 * Duas colunas fixas; cada etapa acende uma delas e a terceira abre a regra.
 * O slide existe para responder a pergunta que o desenho anterior levanta:
 * se todo módulo sobe no mesmo shell, o que exatamente ele é obrigado a
 * seguir — e o que continua sendo decisão de quem constrói o produto.
 */

const PLATAFORMA = [
  'Autenticação e sessão',
  'Componentes e tokens do Design System',
  'Cliente de dados: tipos, erro e repetição',
  'Rotas, eventos e permissões entre camadas',
  'Tema e configuração por cliente',
  'Telemetria de uso e erro',
]

const PRODUTO = [
  'A regra de negócio do seu domínio',
  'As telas e o fluxo do seu usuário',
  'O contrato da sua API',
  'O ritmo da sua entrega',
]

export const ACTIONS = ['A plataforma garante', 'O produto decide', 'A regra']

function Coluna({
  rotulo,
  itens,
  aceso,
  atraso,
}: {
  rotulo: string
  itens: string[]
  aceso: boolean
  atraso: number
}) {
  return (
    <section
      className={`rounded-xl border p-6 transition-[background-color,border-color] duration-300 motion-reduce:transition-none animate-ilum-rise motion-reduce:animate-none ${
        aceso ? 'border-[#7c3aed] bg-[#f3ebff]' : 'border-[#c3aadc] bg-[#ffffff90]'
      }`}
      style={delay(atraso)}
    >
      <Rotulo>{rotulo}</Rotulo>
      {itens.map((item) => (
        <p
          key={item}
          className='border-t border-t-[#dacfe6] py-3.5 text-[clamp(13px,1.15vw,17px)] leading-[1.45] text-[#3d2b52]'
        >
          {item}
        </p>
      ))}
    </section>
  )
}

export default function Slide04Contratos({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))

  return (
    <Frame
      title='O que a plataforma garante e o que o produto decide'
      note='A fronteira é o que permite cobrar de forma diferente por plataforma, produto e serviço: cada um tem um custo e uma natureza.'
    >
      <div className='grid grid-cols-2 gap-7 items-start max-[900px]:grid-cols-1'>
        <Coluna rotulo='A PLATAFORMA GARANTE' itens={PLATAFORMA} aceso={step === 0} atraso={0.1} />
        <Coluna rotulo='O PRODUTO DECIDE' itens={PRODUTO} aceso={step === 1} atraso={0.18} />
      </div>

      <p
        className={`rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-6 transition-opacity duration-300 motion-reduce:transition-none ${
          step === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Um módulo que respeita os contratos roda em qualquer serviço nosso sem alteração de código.
      </p>
    </Frame>
  )
}
