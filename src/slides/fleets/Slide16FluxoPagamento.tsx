import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, FlowSteps, Bar, Accent } from './kit'

const STEP2 = 'Fechamento'

const steps = [
  {
    label: 'Contrato',
    detail: 'Cria-se o centro de custo: cidade, valor mensal, tipo e status.',
  },
  {
    label: 'Vínculos',
    detail: 'Colaboradores entram com meta de KM e valor acordado.',
  },
  {
    label: 'Frota',
    detail: 'Veículos e dispositivos passam a responder àquele contrato.',
  },
  {
    label: 'Fechamento',
    detail: 'No fim do mês, o wizard em lote calcula estimado versus pago.',
  },
  {
    label: 'Exportação',
    detail: 'O mês fechado sai para o financeiro e para auditoria.',
  },
]

export default function Slide16FluxoPagamento({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo 2 · A jornada do dinheiro e das pessoas'
        title={
          <>
            Do contrato ao pagamento, <Accent>com a meta no meio.</Accent>
          </>
        }
      />

      <FlowSteps steps={steps} phase={phase} split={3} />

      <Bar kicker='O que este fluxo amarra' delay={0.2}>
        Contratos + Colaboradores + Pagamentos.{' '}
        <span className='text-purple'>
          A meta definida no vínculo é o que torna o fechamento conferível.
        </span>
      </Bar>
    </SlideShell>
  )
}
