import type { SlideProps } from '../config'
import { Frame, delay } from './ui'

/**
 * Cronograma macro.
 *
 * Etapa única: tudo entra de uma vez quando a câmera chega no slide — a linha
 * do tempo varre da esquerda para a direita, as bolinhas marcam o centro de
 * cada fase e os cartões sobem em seguida.
 *
 * As bolinhas vivem num grid de 4 colunas **igual ao dos cartões**, com o
 * mesmo `gap`. É isso que garante o alinhamento: com os cartões numa grade,
 * o centro de cada um não cai em 12,5% / 37,5% / … por causa dos vãos, então
 * posicionar por porcentagem sairia torto.
 */

type Situacao = 'feito' | 'agora' | 'aSeguir'

interface Fase {
  nome: string
  situacao: Situacao
  descricao: string
  /** Pulsa para puxar o olho — a POC é o marco que a fala defende. */
  destaque?: boolean
}

const FASES: Fase[] = [
  {
    nome: 'Inventário',
    situacao: 'feito',
    descricao: 'Rotinas, dependências e riscos levantados.',
  },
  {
    nome: 'Fundação',
    situacao: 'agora',
    descricao: 'Padrões de dados, integração e desenvolvimento.',
  },
  {
    nome: 'POC',
    situacao: 'aSeguir',
    descricao: 'A base validada em uma plataforma real: Uberlândia.',
    destaque: true,
  },
  {
    nome: 'Equalização',
    situacao: 'aSeguir',
    descricao: 'Time alinhado aos padrões.',
  },
  {
    nome: 'Rollout',
    situacao: 'aSeguir',
    descricao: 'Adoção pelas equipes dos projetos.',
  },
]

/** Rótulo e pintura de cada situação. Só uma classe por propriedade. */
const SELO: Record<Situacao, { texto: string; classe: string }> = {
  feito: { texto: 'Já está feito', classe: 'bg-[#7c3aed] text-white' },
  agora: { texto: 'Em execução', classe: 'bg-[#e7dbf7] text-[#5a3581] ring-1 ring-[#7c3aed]' },
  aSeguir: { texto: 'A seguir', classe: 'bg-[#f3ebff] text-[#7a6689]' },
}

/** A bolinha da fase corrente é cheia; as futuras ficam ocas. */
const BOLINHA: Record<Situacao, string> = {
  feito: 'bg-[#7c3aed] border-[#7c3aed]',
  agora: 'bg-[#7c3aed] border-[#7c3aed]',
  aSeguir: 'bg-white border-[#c3aadc]',
}

/**
 * Grade compartilhada pela régua das bolinhas e pela fileira de cartões — é
 * o que mantém cada bolinha exatamente no centro do seu cartão.
 */
const GRADE = 'grid grid-cols-5 gap-5 max-[900px]:grid-cols-2'

/** Quem coordena a iniciativa. Não é o organograma — esse é do Angelo. */
const COORDENACAO = ['Fortes', 'Godoy', 'Lima', 'Bega']

export const ACTIONS = ['Marcos']

export default function Slide02Planejamento({ action: _ }: SlideProps) {
  void _

  return (
    <Frame
      title='Cronograma macro'
    >
      <div className='flex flex-col gap-6'>
        {/* Linha do tempo: traço que varre, ponta e bolinhas por fase. */}
        <div className='relative max-[900px]:hidden'>
          <div
            className='absolute left-0 right-[9px] top-[7px] h-[2px] bg-[#c3aadc] origin-left animate-ilum-sweep motion-reduce:animate-none'
            style={delay(0.1)}
          />
          <svg
            className='absolute right-0 top-[1px] w-[10px] h-[14px] animate-ilum-fade motion-reduce:animate-none'
            viewBox='0 0 10 14'
            aria-hidden='true'
            style={delay(0.75)}
          >
            <path d='M0 0 L10 7 L0 14 Z' className='fill-[#c3aadc]' />
          </svg>

          <div className={GRADE}>
            {FASES.map((f, i) => (
              <div key={f.nome} className='flex justify-center'>
                <span
                  className={`w-4 h-4 rounded-full border-2 ${BOLINHA[f.situacao]} animate-ilum-pop motion-reduce:animate-none`}
                  style={delay(0.45 + i * 0.09)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={GRADE}>
          {FASES.map((f, i) => {
            const entrada = 0.62 + i * 0.09
            return (
            <article
              key={f.nome}
              className={`rounded-lg p-6 motion-reduce:animate-none ${
                f.destaque
                  ? 'border-2 border-[#7c3aed] bg-[#f3ebff] animate-ilum-destaque'
                  : 'border border-[#c3aadc] bg-[#ffffffb0] animate-ilum-rise'
              }`}
              // Dois atrasos quando há duas animações: entrada e, depois dela, o pulso.
              style={
                f.destaque
                  ? { animationDelay: `${entrada.toFixed(2)}s, ${(entrada + 1).toFixed(2)}s` }
                  : delay(entrada)
              }
            >
              <h2 className='text-[clamp(17px,1.55vw,24px)] font-[650] leading-[1.2]'>{f.nome}</h2>
              <span
                className={`inline-block rounded-[999px] text-[11px] font-semibold tracking-[0.04em] px-2.5 py-1 mt-2.5 ${SELO[f.situacao].classe}`}
              >
                {SELO[f.situacao].texto}
              </span>
              <p className='text-[clamp(12px,1vw,15px)] leading-[1.45] mt-2.5 text-[#64566f]'>
                {f.descricao}
              </p>
            </article>
            )
          })}
        </div>

        <p
          className='rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-4 animate-ilum-in motion-reduce:animate-none'
          style={delay(1.05)}
        >
          Produtos e contratos continuam sendo atendidos durante a implementação.
        </p>

        <p
          className='text-center text-[clamp(12px,1vw,15px)] text-[#64566f] animate-ilum-in motion-reduce:animate-none'
          style={delay(1.2)}
        >
          <span className='font-semibold text-[#5a3581]'>Coordenação:</span> {COORDENACAO.join(' · ')}
        </p>
      </div>
    </Frame>
  )
}
