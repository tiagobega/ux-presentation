import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { COR } from './ui'

/**
 * Peças de SVG dos diagramas do deck (slides 1, 2 e 8).
 *
 * Os três desenhos falam a mesma língua: cantos retos, contorno lilás,
 * ameixa para o que importa, rótulos pequenos em caixa alta. E seguem as
 * mesmas duas regras de animação:
 *
 * - **o foco do passo anima o grupo, a entrada anima o filho.** São dois `g`
 *   aninhados (`Foco` e `Entra`); as opacidades se multiplicam em SVG e as
 *   duas animações nunca disputam a mesma propriedade;
 * - **nada entra empurrando o vizinho.** O que aparece depois já tem o seu
 *   lugar no desenho desde o primeiro quadro.
 */

export const TINTA = COR.tinta
export const SUAVE = COR.cinza
export const BORDA = COR.borda
export const ROXO = COR.ameixa
export const LILAS = COR.lavanda
export const MALVA = COR.malva

export const TRANSICAO = { duration: 0.75, ease: [0.65, 0, 0.35, 1] as const }

/** Atraso de entrada pela posição: o desenho acende da esquerda para a direita. */
export const entrada = (x: number) => 0.2 + (x / 1200) * 1.1

/** Opacidade do grupo no passo corrente. `op` tem um valor por passo. */
export function Foco({ op, passo, children }: { op: readonly number[]; passo: number; children: ReactNode }) {
  return (
    <motion.g initial={false} animate={{ opacity: op[passo] }} transition={TRANSICAO}>
      {children}
    </motion.g>
  )
}

/** Entrada única, na montagem, com o atraso da varredura. */
export function Entra({ x, children }: { x: number; children: ReactNode }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: entrada(x), ease: 'easeOut' }}
    >
      {children}
    </motion.g>
  )
}

/** Aparece quando `sim`, com atraso; some na hora. */
export const aparece = (sim: boolean, atraso = 0) => ({
  initial: false as const,
  animate: { opacity: sim ? 1 : 0 },
  transition: { duration: 0.45, delay: sim ? atraso : 0 },
})

export type Direcao = 'baixo' | 'cima' | 'esquerda' | 'direita'

/** Ponta de seta como polígono: `marker` ignora o desenho por `pathLength`. */
export function ponta(x: number, y: number, dir: Direcao, s = 7) {
  const l = s * 0.7
  switch (dir) {
    case 'baixo':
      return `${x - l},${y - s} ${x + l},${y - s} ${x},${y}`
    case 'cima':
      return `${x - l},${y + s} ${x + l},${y + s} ${x},${y}`
    case 'direita':
      return `${x - s},${y - l} ${x - s},${y + l} ${x},${y}`
    case 'esquerda':
      return `${x + s},${y - l} ${x + s},${y + l} ${x},${y}`
  }
}

export function Rotulo({ x, y, children, anchor = 'start', cor = SUAVE }: {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
  cor?: string
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={10} letterSpacing={1} fill={cor} fontWeight={700}>
      {children}
    </text>
  )
}

export function Chip({ x, y, w, h = 40, nome, sub }: { x: number; y: number; w: number; h?: number; nome: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill='#fff' stroke={BORDA} />
      <text x={x + 12} y={sub ? y + h / 2 - 3 : y + h / 2 + 5} fontSize={12.5} fontWeight={700} fill={TINTA}>
        {nome}
      </text>
      {sub && (
        <text x={x + 12} y={y + h / 2 + 14} fontSize={10.5} fill={SUAVE}>
          {sub}
        </text>
      )}
    </g>
  )
}

export function Caixa({ x, y, w, h, titulo, sub }: { x: number; y: number; w: number; h: number; titulo: string; sub?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={COR.fundo} stroke={BORDA} />
      <text x={x + 24} y={y + 34} fontSize={15} fontWeight={700} fill={ROXO}>
        {titulo}
      </text>
      {sub && (
        <text x={x + 24} y={y + 56} fontSize={11.5} fill={SUAVE}>
          {sub}
        </text>
      )}
    </g>
  )
}

/**
 * Selo retangular. `cheia` = ameixa com texto branco; `invertida` = branco
 * com texto ameixa (para usar sobre fundo ameixa); senão, contorno malva.
 * `tracejada` marca o que ainda não existe.
 */
export function Pilula({ x, y, texto, cheia, invertida, tracejada }: {
  x: number
  y: number
  texto: string
  cheia?: boolean
  invertida?: boolean
  tracejada?: boolean
}) {
  const w = texto.length * 7.4 + 20
  const fundo = invertida ? '#fff' : cheia ? ROXO : '#fff'
  const tinta = invertida ? ROXO : cheia ? '#fff' : MALVA
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={22}
        fill={fundo}
        stroke={invertida ? '#fff' : cheia ? ROXO : MALVA}
        strokeDasharray={tracejada ? '4 3' : undefined}
      />
      <text x={x + w / 2} y={y + 15} textAnchor='middle' fontSize={10} fontWeight={700} letterSpacing={0.6} fill={tinta}>
        {texto}
      </text>
    </g>
  )
}

/** Retângulo `{x,y,w,h}` como atributos de SVG, para animar com o motion. */
export const caixa = (r: { x: number; y: number; w: number; h: number }) => ({ x: r.x, y: r.y, width: r.w, height: r.h })
