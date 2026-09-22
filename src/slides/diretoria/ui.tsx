import type { CSSProperties, ReactNode } from 'react'

/**
 * Vocabulário do deck ILUM · diretoria.
 *
 * O deck segue os critérios editoriais de `plano-ilum-diretoria.md`: na tela
 * entram apenas títulos, termos, dados e status. Nada de punchline, subtítulo
 * explicativo ou descrição dentro do cartão — a explicação é a fala do
 * apresentador, e por isso o `Frame` daqui não tem rodapé de nota, ao
 * contrário do `Frame` do deck Ilum.
 *
 * Cada slide do plano declara um arquétipo. Os arquétipos moram aqui, e é o
 * que mantém o deck legível: o mesmo tipo de conteúdo tem sempre a mesma
 * forma, e a única variação forte é o destaque da etapa corrente.
 */

export function Frame({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className='flex flex-1 min-h-0 flex-col overflow-hidden font-ilum text-[#251a34] px-[52px] pt-9 pb-9 max-[900px]:p-5'>
      <h1 className='shrink-0 text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-8'>
        {title}
      </h1>
      <div className='flex flex-1 min-h-0 flex-col justify-center gap-6'>{children}</div>
    </section>
  )
}

/**
 * Atraso de entrada de um elemento, em segundos. Vai direto no `style` porque
 * é um valor por elemento — escalonar uma grade com uma classe por instante
 * geraria uma utility para cada atraso.
 */
export const delay = (s: number): CSSProperties => ({ animationDelay: `${s.toFixed(2)}s` })

/**
 * Os três estados de qualquer superfície do deck. Uma classe por propriedade:
 * empilhar duas `bg-*` de condições diferentes deixaria o vencedor por conta
 * da ordem na folha gerada, que não é garantida.
 */
export type Estado = 'apagado' | 'aceso' | 'atual'

const SUPERFICIE: Record<Estado, string> = {
  apagado: 'border-[#e0d7ea] bg-[#ffffff55]',
  aceso: 'border-[#c3aadc] bg-[#ffffff9e]',
  atual: 'border-[#6d28d9] bg-[#f3ebff]',
}

const TEXTO: Record<Estado, string> = {
  apagado: 'text-[#a595b4]',
  aceso: 'text-[#3d2b52]',
  atual: 'text-[#3d2b52]',
}

/**
 * Estado de um item numa sequência que acumula: o item da etapa corrente fica
 * `atual`, os anteriores `aceso`, os que ainda não chegaram `apagado`.
 */
export function estadoDe(indice: number, passo: number): Estado {
  if (indice === passo) return 'atual'
  return indice < passo ? 'aceso' : 'apagado'
}

export function Cartao({
  estado,
  className = '',
  style,
  children,
}: {
  estado: Estado
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <div
      className={`rounded-xl border transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none ${SUPERFICIE[estado]} ${TEXTO[estado]} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

/** Rótulo pequeno em caixa alta que abre um bloco. Nunca é uma frase. */
export function Rotulo({ children }: { children: ReactNode }) {
  return <span className='block text-[11px] tracking-[1.3px] text-[#77618e]'>{children}</span>
}

/** O termo, que é o que a tela tem para dizer. */
export function Termo({ children, grande }: { children: ReactNode; grande?: boolean }) {
  return (
    <span
      className={`block font-[700] tracking-[-0.6px] leading-[1.12] ${
        grande ? 'text-[clamp(22px,2.5vw,42px)]' : 'text-[clamp(17px,1.7vw,27px)]'
      }`}
    >
      {children}
    </span>
  )
}

/**
 * Arquétipo **título+grade**: termos de mesmo peso, lado a lado. Uma etapa só —
 * a grade inteira entra escalonada quando a câmera chega.
 */
export function Grade({ itens, colunas }: { itens: ReactNode[]; colunas: number }) {
  return (
    <div
      className='grid gap-5 max-[900px]:grid-cols-1'
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {itens.map((item, i) => (
        <Cartao
          key={i}
          estado='aceso'
          className='px-6 py-8 animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.12 + i * 0.08)}
        >
          {item}
        </Cartao>
      ))}
    </div>
  )
}

/**
 * Arquétipo **matriz / tabela**: duas colunas, uma linha por item, filetes
 * horizontais. Sem cartão por linha — a tabela é a forma, e cartões
 * acrescentariam peso que o conteúdo não tem.
 */
export function Matriz({
  cabecalho,
  linhas,
}: {
  cabecalho: [string, string]
  linhas: [ReactNode, ReactNode][]
}) {
  return (
    // A largura é limitada de propósito: numa tela larga, duas colunas soltas
    // afastam tanto o par que a linha deixa de se ler como uma dupla.
    <div className='w-full max-w-[1020px] mx-auto animate-ilum-fade motion-reduce:animate-none' style={delay(0.1)}>
      <div className='grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-x-10 pb-3 border-b border-b-[#c3aadc]'>
        <Rotulo>{cabecalho[0].toUpperCase()}</Rotulo>
        <Rotulo>{cabecalho[1].toUpperCase()}</Rotulo>
      </div>
      {linhas.map(([esquerda, direita], i) => (
        <div
          key={i}
          className='grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-x-10 border-b border-b-[#dacfe6] py-4 animate-ilum-rise motion-reduce:animate-none max-[900px]:grid-cols-1 max-[900px]:gap-y-1'
          style={delay(0.2 + i * 0.07)}
        >
          <span className='text-[clamp(14px,1.25vw,20px)] leading-[1.35] text-[#3d2b52]'>
            {esquerda}
          </span>
          <span className='text-[clamp(14px,1.25vw,20px)] leading-[1.35] font-[600] text-[#5a3581]'>
            {direita}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * Arquétipo **comparação / frentes numeradas**: uma fileira de etapas com o
 * número à frente. Usado na transição do APEX e nas seis frentes de execução.
 */
export function Numerados({ itens, colunas }: { itens: string[]; colunas: number }) {
  return (
    <div
      className='grid gap-4 max-[900px]:grid-cols-2'
      style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
    >
      {itens.map((item, i) => (
        <Cartao
          key={item}
          estado='aceso'
          className='px-5 py-6 animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.12 + i * 0.07)}
        >
          <span className='block text-[12px] font-[700] tracking-[0.1em] text-[#7c3aed] mb-3 [font-family:ui-monospace,monospace]'>
            {String(i + 1).padStart(2, '0')}
          </span>
          <Termo>{item}</Termo>
        </Cartao>
      ))}
    </div>
  )
}
