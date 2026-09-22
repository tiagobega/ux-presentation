import type { SlideProps } from '../config'
import { Frame } from './ui'

/**
 * Dificuldades, riscos e limites.
 *
 * Três blocos que acendem um por step; o quarto step realça as
 * responsabilidades. O slide mostra **quais responsabilidades a estrutura
 * precisa explicitar**, sem nomear donos ou aprovadores: isso pertence ao
 * organograma conduzido pelo Angelo.
 */

interface Bloco {
  /** Rótulo do step e título do bloco. */
  titulo: string
  itens: string[]
}

const BLOCOS: Bloco[] = [
  {
    titulo: 'Dificuldades',
    itens: [
      'Inventário de rotinas e dependências',
      'Conciliação com os contratos',
      'Adoção de padrões entre equipes',
    ],
  },
  {
    titulo: 'Riscos',
    itens: [
      'Divergência de dados → conciliação',
      'Interrupção de integrações → testes e reversão',
      'Dependências desconhecidas → inventário e monitoramento',
    ],
  },
  {
    titulo: 'Limites',
    itens: [
      'Hardware e aquisição → escopo a confirmar',
      'Backup e restore → escopo a confirmar',
      'Outras frentes → identificar com a equipe',
    ],
  },
]

const RESPONSABILIDADES = [
  'Ingestão e processamento',
  'Integridade dos dados',
  'Plataformas e produtos',
  'Padrões compartilhados',
]

export const ACTIONS = [...BLOCOS.map((b) => b.titulo), 'Responsabilidades']

export default function Slide03RiscosLimites({ action }: SlideProps) {
  return (
    <Frame
      title='Dificuldades, riscos e responsabilidades'
    >
      <div className='grid grid-cols-3 gap-[25px] max-[900px]:grid-cols-2'>
        {BLOCOS.map((b) => (
          <article
            key={b.titulo}
            className={`border-t-[3px] p-[18px] ${
              action === b.titulo ? 'bg-[#eee5fa] border-[#7c3aed]' : 'border-t-[#a580cc]'
            }`}
          >
            <h2 className='text-[clamp(19px,1.8vw,28px)] font-[650] leading-[1.2] mb-3'>
              {b.titulo}
            </h2>
            {b.itens.map((item) => (
              <p key={item} className='border-t border-t-[#dacfe6] py-3.5 text-[19px] leading-[1.5]'>
                {item}
              </p>
            ))}
          </article>
        ))}
      </div>

      <div className='bg-[#ffffff90] border border-[#c8b4dc] rounded-lg p-[22px]'>
        <h2 className='text-[clamp(19px,1.8vw,28px)] font-[650] leading-[1.2] mb-3'>
          Responsabilidades que a estrutura precisa explicitar
        </h2>
        <div className='flex gap-[18px] flex-wrap text-[#6d3d9a] text-[17px] mb-4'>
          {RESPONSABILIDADES.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
        <p className='text-[17px] leading-[1.5] my-2'>
          Atribuição de pessoas, liderança e entrada de demandas: definição no organograma
          conduzido por Angelo.
        </p>
        <p className='text-[17px] leading-[1.5] my-2'>
          As fronteiras permitem que cada equipe trabalhe em seu projeto com padrões e interfaces
          comuns.
        </p>
      </div>
    </Frame>
  )
}
