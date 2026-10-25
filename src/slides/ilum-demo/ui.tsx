import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { motion } from 'motion/react'
import logo from '../../assets/intelicity-logo.png'
import simboloBranco from '../../assets/intelicity-simbolo-branco.png'

/**
 * Vocabulário do deck Ilum · demo.
 *
 * A base de design é a das propostas executivas da Intelicity (o pptx
 * "Proposta Containers Java"): fundo branco, Montserrat, cantos retos,
 * contornos finos lilás, ameixa como cor de marca. A anatomia de cada página
 * é a do layout de conteúdo de lá: logo e assunto no topo, eyebrow em caixa
 * alta, título que afirma, corpo, e o número da página no rodapé (a data do
 * pptx saiu por decisão do apresentador). O título
 * fica menor que os 28 pt do pptx: no tamanho original ele pesava mais que o
 * conteúdo das páginas.
 *
 * As medidas estão em `vw` porque o pptx é 960 × 540 pt: 1 pt do arquivo
 * vale 100vw / 960, e assim a proporção entre título, eyebrow e corpo é a
 * mesma do original em qualquer tela.
 */

/** A paleta do tema do pptx, com os nomes do arquivo. */
export const COR = {
  tinta: '#1C1A1D', // dk1
  ameixa: '#58185F', // accent1 · dk2
  malva: '#8C5A92', // accent2: eyebrow, conectores
  lavanda: '#F5ECF7', // accent3: zonas
  cinza: '#5E5860', // accent4: texto de apoio
  borda: '#E3D3E6', // accent5: contornos
  fundo: '#F8F5F9', // lt2: cartões
  profundo: '#3A0F40', // accent6: cartões sobre a ameixa
} as const

/**
 * Atraso de entrada de um elemento, em segundos. Vai no `style` porque é um
 * valor por elemento.
 */
export const delay = (s: number): CSSProperties => ({ animationDelay: `${s.toFixed(2)}s` })

const ASSUNTO = 'Ilum  ·  Demonstração'

/**
 * A página de conteúdo. Pinta o próprio fundo branco: o deck corre sobre o
 * fundo animado da apresentação, e a base de design é chapada.
 */
export function Pagina({
  n,
  eyebrow,
  titulo,
  lead,
  children,
  corpo = 'justify-center',
}: {
  n: number
  eyebrow: string
  titulo: ReactNode
  lead?: ReactNode
  children: ReactNode
  /** Alinhamento vertical do corpo; o diagrama do slide 1 ocupa tudo. */
  corpo?: string
}) {
  return (
    <section
      className='relative flex flex-1 min-h-0 flex-col overflow-hidden bg-white font-intelicity px-[4.5vw] pt-[2.4vw] pb-[1.3vw]'
      style={{ color: COR.tinta }}
    >
      <header className='flex shrink-0 items-center justify-between'>
        <img src={logo} alt='Intelicity' className='h-[2.1vw] w-auto' />
        <span className='text-[0.95vw]' style={{ color: COR.cinza }}>
          {ASSUNTO}
        </span>
      </header>

      <div className='shrink-0 mt-[1.6vw] animate-ilum-in motion-reduce:animate-none' style={delay(0.05)}>
        <span className='block text-[0.9vw] font-bold tracking-[0.08em] uppercase' style={{ color: COR.malva }}>
          {eyebrow}
        </span>
        <h1 className='mt-[0.3vw] text-[2vw] font-bold leading-[1.2] tracking-[-0.01em]'>{titulo}</h1>
        {lead && (
          <p className='mt-[0.9vw] max-w-[84vw] text-[1.6vw] leading-[1.4]' style={{ color: COR.cinza }}>
            {lead}
          </p>
        )}
      </div>

      <div className={`flex flex-1 min-h-0 flex-col gap-[1.6vw] mt-[1.4vw] ${corpo}`}>{children}</div>

      <footer className='flex shrink-0 items-end justify-end pt-[0.8vw] text-[0.85vw]' style={{ color: COR.cinza }}>
        <span>{n}</span>
      </footer>
    </section>
  )
}

/**
 * Os três estados de uma superfície. No pptx o destaque é o bloco chapado em
 * ameixa com texto branco; o normal é o cartão claro com contorno lilás.
 */
export type Estado = 'apagado' | 'aceso' | 'atual'

const SUPERFICIE: Record<Estado, CSSProperties> = {
  apagado: { backgroundColor: '#ffffff', borderColor: COR.borda, color: '#b3a9b5' },
  aceso: { backgroundColor: COR.fundo, borderColor: COR.borda, color: COR.tinta },
  atual: { backgroundColor: COR.ameixa, borderColor: COR.ameixa, color: '#ffffff' },
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
      className={`border transition-[background-color,border-color,color] duration-500 motion-reduce:transition-none ${className}`}
      style={{ ...SUPERFICIE[estado], ...style }}
    >
      {children}
    </div>
  )
}

/** Rótulo pequeno em caixa alta, o "Escopo / Status / Público" da capa do pptx. */
export function Rotulo({ children, cor = COR.cinza }: { children: ReactNode; cor?: string }) {
  return (
    <span className='block text-[0.95vw] font-semibold tracking-[0.06em] uppercase' style={{ color: cor }}>
      {children}
    </span>
  )
}

/** O número grande dos cartões de resumo do pptx (36 pt, ameixa). */
export function Numero({ children, cor = COR.ameixa }: { children: ReactNode; cor?: string }) {
  return (
    <span className='block text-[3.4vw] font-bold leading-[1.1] tracking-[-0.02em] tabular-nums' style={{ color: cor }}>
      {children}
    </span>
  )
}

/** A faixa chapada em ameixa que fecha uma página ("Em uma frase: …"). */
export function Faixa({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className='px-[3vw] py-[1.5vw] text-[1.6vw] font-bold text-white animate-ilum-in motion-reduce:animate-none'
      style={{ backgroundColor: COR.ameixa, ...style }}
    >
      {children}
    </div>
  )
}

/** As duas partes do Ilum, com a frase que as define. */
const PARTES = {
  Builder: 'Cria cada projeto, uma vez',
  Router: 'A esteira de dados, sempre',
} as const

export type Parte = keyof typeof PARTES

/**
 * A tela inteira em ameixa com o nome de uma parte do Ilum. É a porta de
 * entrada de cada parte do deck: o último quadro do slide 1 e o primeiro do
 * slide 2 (o Builder, que entra por corte), e o primeiro do slide do Router.
 * Quem encolhe esta tela até o bloco da parte no desenho é a `SaidaDaTela`.
 *
 * Fica absoluta sobre a `Pagina` inteira, cabeçalho incluído.
 */
export function TelaParte({ parte, texto = true }: { parte: Parte; texto?: boolean }) {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center overflow-hidden' style={{ backgroundColor: COR.ameixa }}>
      <img
        src={simboloBranco}
        alt=''
        aria-hidden
        className='pointer-events-none absolute right-[-3vw] top-[-6vw] w-[39vw] opacity-[0.08]'
      />
      <div
        className='relative flex flex-col items-center text-white transition-opacity duration-300'
        style={{ opacity: texto ? 1 : 0 }}
      >
        <span className='text-[1.1vw] font-bold tracking-[0.12em] text-white/60'>ILUM</span>
        <span className='text-[7vw] font-bold leading-[1] tracking-[-0.03em]'>{parte}</span>
        <span className='mt-[1vw] text-[1.6vw] text-white/75'>{PARTES[parte]}</span>
      </div>
    </div>
  )
}

type Caixa = { top: number; left: number; width: number; height: number }

/**
 * A saída de dentro de uma parte: a tela ameixa encolhe até o bloco da parte
 * no desenho (`bloco`, um `rect` do SVG) e some sobre ele. Mede o bloco e a
 * página na montagem; até medir, cobre a página inteira.
 *
 * `segura` é quanto tempo, em segundos, o nome fica na tela antes de sair: no
 * Builder quase nada (o slide 1 já o mostrou), no Router o tempo de ler.
 */
export function SaidaDaTela({ bloco, parte, segura = 0 }: {
  bloco: RefObject<SVGRectElement | null>
  parte: Parte
  segura?: number
}) {
  const tela = useRef<HTMLDivElement>(null)
  const [medida, setMedida] = useState<{ de: Caixa; para: Caixa } | null>(null)
  const [fim, setFim] = useState(false)
  // O texto começa aceso e esmaece antes de a tela encolher (a transição de
  // opacidade é da própria `TelaParte`): no tamanho do bloco ele estouraria,
  // e o bloco já tem o seu.
  const [texto, setTexto] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setTexto(false), 80 + segura * 1000)
    return () => window.clearTimeout(t)
  }, [segura])

  useLayoutEffect(() => {
    // A página é o `offsetParent`: a tela é absoluta sobre ela, não sobre o corpo.
    const pagina = (tela.current?.offsetParent as HTMLElement | null)?.getBoundingClientRect()
    const alvo = bloco.current?.getBoundingClientRect()
    if (!pagina || !alvo || !alvo.width) return
    setMedida({
      de: { top: 0, left: 0, width: pagina.width, height: pagina.height },
      para: { top: alvo.top - pagina.top, left: alvo.left - pagina.left, width: alvo.width, height: alvo.height },
    })
  }, [bloco])

  if (fim) return null
  const espera = 0.45 + segura
  return (
    <motion.div
      // Remonta ao medir: o `initial` só vale na montagem.
      key={medida ? 'medida' : 'cheia'}
      ref={tela}
      className='pointer-events-none absolute z-20 overflow-hidden'
      style={medida ? undefined : { inset: 0 }}
      initial={medida ? { ...medida.de, opacity: 1 } : false}
      animate={medida ? { ...medida.para, opacity: [1, 1, 0] } : undefined}
      transition={{ duration: 1.1, delay: espera, ease: [0.65, 0, 0.35, 1], opacity: { duration: 1.4, delay: espera, times: [0, 0.8, 1] } }}
      onAnimationComplete={() => medida && setFim(true)}
      aria-hidden
    >
      <TelaParte parte={parte} texto={texto} />
    </motion.div>
  )
}
