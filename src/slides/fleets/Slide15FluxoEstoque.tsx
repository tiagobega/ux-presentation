import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, FlowSteps, Bar, Accent } from './kit'

const STEP2 = 'Operação → Fim'

const steps = [
  {
    label: 'Fabricado',
    detail: 'O hardware entra no sistema com tipo, versão e firmware.',
  },
  {
    label: 'A instalar',
    detail: 'Fica em estoque, disponível para a próxima alocação.',
  },
  {
    label: 'Instalado',
    detail: 'O técnico instala no veículo e o device passa a ter pessoa e contrato.',
  },
  {
    label: 'Monitorado',
    detail: 'Opera em campo sob os olhos do módulo de Alertas.',
  },
  {
    label: 'Encerrado',
    detail: 'Falhou, vai para manutenção. Fim de vínculo, é desinstalado.',
  },
]

export default function Slide15FluxoEstoque({ action }: SlideProps) {
  const phase = action === STEP2 ? 1 : 0

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Fluxo 1 · A jornada do hardware'
        title={
          <>
            Do estoque à operação, <Accent>sem sair do registro.</Accent>
          </>
        }
      />

      <FlowSteps steps={steps} phase={phase} split={3} />

      <Bar kicker='O que este fluxo amarra' delay={0.2}>
        Dispositivos + Instalação + Alertas.{' '}
        <span className='text-purple'>
          Cada passo é uma DeviceActivity, cada mudança é uma linha no AuditLog.
        </span>
      </Bar>
    </SlideShell>
  )
}
