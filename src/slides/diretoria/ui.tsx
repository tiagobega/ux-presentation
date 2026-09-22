import type { CSSProperties, ReactNode } from 'react'

/**
 * Vocabulário do deck ILUM · diretoria.
 *
 * Quatro slides, e a regra que os mantém legíveis é a mesma: na tela entram
 * títulos, termos, dados e status; a explicação longa é a fala. O `Frame`
 * daqui não tem rodapé de nota por isso, ao contrário do `Frame` do deck Ilum.
 *
 * As definições curtas do slide 1 (plataforma, serviço, produto) são a
 * exceção combinada: são vocabulário, e sem elas a diretoria não acompanha o
 * resto da conversa.
 */

export function Frame({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className='flex flex-1 min-h-0 flex-col overflow-hidden font-ilum text-[#251a34] px-[52px] pt-9 pb-9 max-[900px]:p-5'>
      <h1 className='shrink-0 text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-7'>
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

/** Situação de um marco do cronograma. Só define a pintura. */
export type Situacao = 'feito' | 'agora' | 'aSeguir'

const PINTURA: Record<Situacao, string> = {
  feito: 'bg-[#7c3aed] text-white',
  agora: 'bg-[#e7dbf7] text-[#5a3581] ring-1 ring-[#7c3aed]',
  aSeguir: 'bg-[#e4dced] text-[#6b597b] ring-1 ring-[#cfc2dd]',
}

/** Pílula de situação. O texto vem de fora porque varia ("OK", "15/10", "FEV/27"). */
export function Selo({ situacao, children }: { situacao: Situacao; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-[999px] text-[11px] font-semibold tracking-[0.04em] px-2.5 py-1 ${PINTURA[situacao]}`}
    >
      {children}
    </span>
  )
}

/**
 * Peça do slide 1: a mesma forma no cartão do projeto e na linha do termo, o
 * que faz a cópia que voa casar com a origem sem ajuste.
 */
export function Peca({ children, forte }: { children: ReactNode; forte?: boolean }) {
  return (
    <div
      className={`w-full h-full rounded-md border flex items-center px-3 text-[13px] leading-none truncate transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none ${
        forte ? 'border-[#7c3aed] bg-[#f3ebff] text-[#3d2b52]' : 'border-[#d9cfe2] bg-white text-[#4b3b5c]'
      }`}
    >
      {children}
    </div>
  )
}
