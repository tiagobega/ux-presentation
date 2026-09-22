import type { ReactNode } from 'react'

/**
 * Vocabulário do deck Front-end.
 *
 * O `Frame` (título + corpo centrado + nota de rodapé) e o helper `delay` são
 * os mesmos do deck Ilum — este deck é a continuação daquela conversa, e
 * reaproveitar evita duas molduras que divergem com o tempo. As animações de
 * entrada também são as do Ilum (`animate-ilum-*`, em `src/index.css`).
 */
export { Frame, delay } from '../ilum/ui'

/** Situação de um entregável ou de uma camada. Só define a pintura. */
export type Situacao = 'entregue' | 'execucao' | 'transicao' | 'aSeguir'

/**
 * Uma classe por propriedade: empilhar `bg-*` de duas condições deixaria o
 * vencedor por conta da ordem na folha gerada, que não é garantida.
 */
const PINTURA: Record<Situacao, string> = {
  entregue: 'bg-[#7c3aed] text-white',
  execucao: 'bg-[#e7dbf7] text-[#5a3581] ring-1 ring-[#7c3aed]',
  transicao: 'bg-[#ffffff] text-[#5a3581] ring-1 ring-[#c3aadc]',
  aSeguir: 'bg-[#e4dced] text-[#6b597b] ring-1 ring-[#cfc2dd]',
}

/** Pílula de situação. O texto vem de fora porque varia ("Em entrega", "Em andamento"). */
export function Selo({ situacao, children }: { situacao: Situacao; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-[999px] text-[11px] font-semibold tracking-[0.04em] px-2.5 py-1 ${PINTURA[situacao]}`}
    >
      {children}
    </span>
  )
}

/** Pílula neutra usada nas listas de exemplo (produtos, serviços, fundamentos). */
export function Chip({ aceso, children }: { aceso: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-md text-[clamp(11px,0.95vw,14px)] leading-none px-2.5 py-2 ${
        aceso ? 'bg-[#ffffffcc] text-[#3d2b52]' : 'bg-[#ffffff70] text-[#8d7f9b]'
      }`}
    >
      {children}
    </span>
  )
}

/** Rótulo pequeno em caixa alta que abre um bloco. */
export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <span className='block text-[11px] tracking-[1.1px] text-[#77618e] mb-3'>{children}</span>
  )
}
