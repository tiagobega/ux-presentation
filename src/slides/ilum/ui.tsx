import type { CSSProperties, ReactNode } from 'react'

/**
 * Vocabulário compartilhado do deck Ilum.
 *
 * Os quatro slides são densos e administrativos: cada um é um título, um corpo
 * centrado e uma nota de rodapé com as ressalvas. Tudo isso vive no `Frame`.
 *
 * O deck é escrito em utilities do Tailwind, como o resto do repositório. As
 * cores aparecem como valor arbitrário porque quase toda a paleta é de uso
 * único; só a fonte e os keyframes das animações ficam no `@theme` de
 * `src/index.css`, que é o que utility não consegue expressar.
 */
export function Frame({
  title,
  children,
  note,
}: {
  title: string
  children: ReactNode
  /** Ressalva do rodapé: o que ainda não está confirmado naquele slide. */
  note?: string
}) {
  return (
    <section className='flex flex-1 min-h-0 flex-col overflow-auto font-ilum text-[#251a34] px-[42px] pt-7 pb-4 max-[900px]:p-5'>
      <h1 className='text-[clamp(28px,3.4vw,52px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-6'>
        {title}
      </h1>
      <div className='flex flex-1 min-h-0 flex-col justify-center gap-5 max-[900px]:min-h-auto'>
        {children}
      </div>
      {note && (
        <footer className='text-[13px] text-[#706379] border-t border-t-[#d9cfe2] pt-[9px] mt-4 max-[900px]:shrink-0'>
          {note}
        </footer>
      )}
    </section>
  )
}

/**
 * Atraso de entrada de um elemento, em segundos. Vai direto no `style` porque
 * é um valor por elemento — escalonar a montagem de um desenho com uma classe
 * por instante geraria uma utility para cada atraso.
 */
export const delay = (s: number): CSSProperties => ({ animationDelay: `${s.toFixed(2)}s` })
