import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import fluxoNovo from '../../assets/fluxo-novo.svg?raw'
import type { SlideProps } from '../config'
import { delay } from './ui'

/**
 * Slide 1 — Arquitetura e vocabulário.
 *
 * Três passos sobre **um desenho só**, o `fluxo-novo.svg` do deck Ilum:
 * 1. a infraestrutura inteira;
 * 2. tudo que não é o cartão do projeto some, e o cartão desliza para a
 *    esquerda enquanto os três termos entram à direita;
 * 3. as peças do cartão se movem para a linha do termo a que pertencem.
 *
 * **Nada é substituído por uma réplica.** A versão anterior trocava o SVG por
 * um cartão em HTML no passo 2, e o corte aparecia: dois desenhos parecidos
 * cruzando em fade. Aqui o que se move é o próprio cartão do desenho, e o
 * fade fica só no que sai de foco — é o que mantém a leitura de que o
 * vocabulário sai da arquitetura, e não de um slide novo.
 *
 * O preço é classificar o SVG por geometria em tempo de execução, porque o
 * export do Figma é plano: sem grupos, sem ids, texto virado path. As regras
 * estão em `classificar()` e sobrevivem a um reexport; só as coordenadas de
 * destino dependem do layout.
 */

type Caixa = { x: number; y: number; w: number; h: number }

const caixaDe = (e: SVGGraphicsElement): Caixa => {
  const b = e.getBBox()
  return { x: b.x, y: b.y, w: b.width, h: b.height }
}

const centroDentro = (a: Caixa, b: Caixa) => {
  const cx = a.x + a.w / 2
  const cy = a.y + a.h / 2
  return cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h
}

/** Roxo dos rótulos de seção no export do Figma. */
const ROTULO = '#7C3AED'
/** Roxo do preenchimento das pastilhas. */
const PASTILHA = '#9C59F9'

/** Para onde o cartão do projeto desliza no passo 2. */
const CARTAO_DESTINO = { x: 30, y: 110 }

/**
 * A câmera. No passo 1 o `viewBox` é o do arquivo; a partir do passo 2 ele
 * fecha na área que o cartão e os termos ocupam, o que aumenta o desenho em
 * ~40% sem mexer em nada dentro dele. É a mesma ideia do resto do slide: em
 * vez de trocar o conteúdo, aproximar o que já está lá.
 */
const CAMERA_CHEIA = '0 0 1087 646'
const CAMERA_RECORTE = '10 95 990 465'

/** Coluna dos termos, à direita do cartão. */
const TERMO_X = 390

interface BlocoTermo {
  termo: string
  descricao: string
  nomeY: number
  descY: number
  /** Onde as peças deste termo param. Uma posição por peça do bloco. */
  destinos: { x: number; y: number }[]
}

/**
 * Os destinos respeitam a **largura original de cada pastilha**: nada é
 * reescalado, senão o texto virado path distorceria. Por isso os cinco
 * produtos, que são largos, param em duas colunas em vez de uma fileira.
 */
const TERMOS: BlocoTermo[] = [
  {
    termo: 'Plataforma',
    descricao: '(base principal)',
    nomeY: 165,
    descY: 190,
    destinos: [{ x: TERMO_X, y: 202 }],
  },
  {
    termo: 'Serviço',
    descricao: '(código específico da plataforma, representado como módulo)',
    nomeY: 285,
    descY: 310,
    // As larguras (50 · 79 · 72) vêm do desenho; os vãos são de 16.
    destinos: [
      { x: TERMO_X, y: 322 },
      { x: TERMO_X + 66, y: 322 },
      { x: TERMO_X + 161, y: 322 },
    ],
  },
  {
    termo: 'Produto',
    descricao: '(módulo acoplado a um host)',
    nomeY: 405,
    descY: 430,
    destinos: [
      { x: TERMO_X, y: 442 },
      { x: TERMO_X + 300, y: 442 },
      { x: TERMO_X, y: 476 },
      { x: TERMO_X + 300, y: 476 },
      { x: TERMO_X, y: 510 },
    ],
  },
]

export const ACTIONS = ['Infraestrutura', 'Vocabulário', 'De onde vem cada um']

const NS = 'http://www.w3.org/2000/svg'

interface Peca {
  /** Grupo que se move. */
  g: SVGGElement
  /** Cópia apagada que fica no cartão, para ele não esvaziar. */
  fantasma: SVGGElement
  dx: number
  dy: number
}

interface Desenho {
  svg: SVGSVGElement
  /** Tudo que não é o cartão do projeto: some no passo 2. */
  fora: SVGGraphicsElement[]
  cartao: SVGGElement
  /** Deslocamento do cartão até a coluna da esquerda. */
  cartaoDx: number
  cartaoDy: number
  pecas: Peca[]
  termos: SVGGElement[]
  /** Elementos folha, para a animação de entrada. */
  folhas: SVGGraphicsElement[]
}

/** Move `els` para dentro de um `<g>` novo, preservando a ordem. */
function agrupar(pai: SVGElement, els: Element[], marca: string): SVGGElement {
  const g = document.createElementNS(NS, 'g')
  g.setAttribute('data-arq', marca)
  pai.appendChild(g)
  els.forEach((el) => g.appendChild(el))
  return g
}

function texto(conteudo: string, x: number, y: number, tamanho: number, peso: string, cor: string) {
  const t = document.createElementNS(NS, 'text')
  t.setAttribute('x', String(x))
  t.setAttribute('y', String(y))
  t.setAttribute('font-size', String(tamanho))
  t.setAttribute('font-weight', peso)
  t.setAttribute('fill', cor)
  t.textContent = conteudo
  return t
}

function classificar(svg: SVGSVGElement): Desenho | null {
  /**
   * Limpa o que uma passagem anterior criou — o StrictMode roda o efeito duas
   * vezes. São duas limpezas diferentes, e confundi-las quebra tudo:
   *
   * - `data-arq` são grupos de elementos **do desenho**, então são
   *   desembrulhados: os elementos voltam a ser filhos do `svg`.
   * - `data-arq-extra` é o que foi **criado** aqui (os fantasmas e os textos
   *   dos termos), então é removido inteiro.
   *
   * Desembrulhar um fantasma em vez de removê-lo devolvia os clones ao `svg`,
   * e na passagem seguinte eles entravam na conta como pastilhas: o número de
   * peças deixava de bater com o de destinos e a classificação abortava.
   */
  svg.querySelectorAll('[data-arq]').forEach((g) => {
    while (g.firstChild) g.parentNode?.insertBefore(g.firstChild, g)
    g.remove()
  })
  svg.querySelectorAll('[data-arq-extra]').forEach((e) => e.remove())

  const filhos = [...svg.children] as SVGGraphicsElement[]
  if (filhos.length === 0) return null

  let caixas: Caixa[]
  try {
    caixas = filhos.map(caixaDe)
  } catch {
    return null // getBBox falha antes do SVG ser renderizado.
  }
  if (caixas.every((c) => c.w === 0)) return null

  /** O cartão do projeto é o único `rect` com contorno mais alto que 300. */
  const iCartao = filhos.findIndex(
    (el, i) => el.tagName === 'rect' && !!el.getAttribute('stroke') && caixas[i].h > 300,
  )
  if (iCartao < 0) return null
  const areaCartao = caixas[iCartao]

  const dentro: number[] = []
  const fora: SVGGraphicsElement[] = []
  filhos.forEach((el, i) => {
    if (centroDentro(caixas[i], areaCartao)) dentro.push(i)
    else fora.push(el)
  })

  /**
   * Os rótulos de seção (paths roxos) separam os blocos de pastilhas: uma
   * pastilha pertence ao último rótulo acima dela. É mais robusto que contar
   * posições, que quebraria se um item fosse acrescentado ao cartão.
   */
  const rotulos = dentro
    .filter((i) => filhos[i].tagName === 'path' && filhos[i].getAttribute('fill') === ROTULO)
    .sort((a, b) => caixas[a].y - caixas[b].y)

  const pastilhas = dentro
    .filter((i) => filhos[i].tagName === 'rect' && filhos[i].getAttribute('fill') === PASTILHA)
    .sort((a, b) => caixas[a].y - caixas[b].y || caixas[a].x - caixas[b].x)

  const blocoDe = (i: number) => {
    let bloco = -1
    rotulos.forEach((r, n) => {
      if (caixas[r].y < caixas[i].y) bloco = n
    })
    return bloco
  }

  /** O título do projeto é o que está no cartão acima do primeiro rótulo. */
  const iTitulo = dentro.find(
    (i) =>
      filhos[i].tagName === 'path' &&
      filhos[i].getAttribute('fill') !== ROTULO &&
      rotulos.length > 0 &&
      caixas[i].y < caixas[rotulos[0]].y,
  )
  if (iTitulo === undefined) return null

  /** Índices de cada peça que se move: título, bloco 0 (serviços) e bloco 2 (produtos). */
  const grupos: number[][] = [[iTitulo]]
  ;[0, 2].forEach((bloco) => {
    pastilhas
      .filter((i) => blocoDe(i) === bloco)
      .forEach((i) => {
        // A pastilha leva junto o contorno e o texto que vivem dentro dela.
        const membros = dentro.filter((j) => j === i || centroDentro(caixas[j], caixas[i]))
        grupos.push(membros)
      })
  })

  const usados = new Set(grupos.flat())
  const cartao = agrupar(
    svg,
    dentro.filter((i) => !usados.has(i)).map((i) => filhos[i]),
    'cartao',
  )

  const destinos = TERMOS.flatMap((t) => t.destinos)
  if (destinos.length !== grupos.length) return null

  const pecas: Peca[] = grupos.map((membros, n) => {
    const orig = membros.reduce<Caixa>(
      (acc, i) => {
        const c = caixas[i]
        const x = Math.min(acc.x, c.x)
        const y = Math.min(acc.y, c.y)
        return {
          x,
          y,
          w: Math.max(acc.x + acc.w, c.x + c.w) - x,
          h: Math.max(acc.y + acc.h, c.y + c.h) - y,
        }
      },
      { ...caixas[membros[0]] },
    )

    const els = membros.map((i) => filhos[i])
    const fantasma = agrupar(cartao, els.map((e) => e.cloneNode(true) as Element), 'fantasma')
    // Marcado como "extra" porque é criado aqui: some inteiro na limpeza.
    fantasma.removeAttribute('data-arq')
    fantasma.setAttribute('data-arq-extra', 'fantasma')
    fantasma.style.opacity = '0'
    const g = agrupar(cartao, els, 'peca')

    const destino = destinos[n]
    return {
      g,
      fantasma,
      // O grupo vive dentro do cartão, que já está deslocado: o delta desconta isso.
      dx: destino.x - (orig.x + CARTAO_DESTINO.x - areaCartao.x),
      dy: destino.y - (orig.y + CARTAO_DESTINO.y - areaCartao.y),
    }
  })

  const termos = TERMOS.map((t) => {
    const g = document.createElementNS(NS, 'g')
    g.setAttribute('data-arq-extra', 'termo')
    g.style.opacity = '0'
    g.appendChild(texto(t.termo, TERMO_X, t.nomeY, 30, '700', '#3d2b52'))
    g.appendChild(texto(t.descricao, TERMO_X, t.descY, 14, '400', '#64566f'))
    svg.appendChild(g)
    return g
  })

  return {
    svg,
    fora,
    cartao,
    cartaoDx: CARTAO_DESTINO.x - areaCartao.x,
    cartaoDy: CARTAO_DESTINO.y - areaCartao.y,
    pecas,
    termos,
    folhas: filhos,
  }
}

/**
 * Estado de repouso de um passo. O cartão e as peças andam por `x`/`y`; o que
 * sai de foco anda só por `opacity`. Nada é remontado entre passos.
 */
function aplicarFase(d: Desenho, fase: number, instantaneo: boolean) {
  const mexer = (alvo: gsap.TweenTarget, vars: gsap.TweenVars, duracao = 0.65) =>
    instantaneo
      ? gsap.set(alvo, vars)
      : gsap.to(alvo, { ...vars, duration: duracao, ease: 'power2.inOut', overwrite: 'auto' })

  const recorte = fase >= 1
  const voou = fase >= 2

  mexer(d.svg, { attr: { viewBox: recorte ? CAMERA_RECORTE : CAMERA_CHEIA } })
  mexer(d.fora, { opacity: recorte ? 0 : 1 }, 0.45)
  mexer(d.cartao, { x: recorte ? d.cartaoDx : 0, y: recorte ? d.cartaoDy : 0 })
  d.termos.forEach((t) => mexer(t, { opacity: recorte ? 1 : 0 }, 0.45))
  d.pecas.forEach((p) => {
    mexer(p.g, { x: voou ? p.dx : 0, y: voou ? p.dy : 0 })
    mexer(p.fantasma, { opacity: voou ? 0.25 : 0 }, 0.45)
  })
}

export default function Slide01Arquitetura({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  const host = useRef<HTMLDivElement>(null)
  const [desenho, setDesenho] = useState<Desenho | null>(null)

  const stepRef = useRef(step)
  stepRef.current = step

  /**
   * O SVG é injetado à mão, não por `dangerouslySetInnerHTML`: o React
   * recriaria esse conteúdo a cada render e a classificação passaria a
   * guardar nós fora do documento.
   *
   * A classificação tenta por alguns quadros porque `getBBox` devolve zeros
   * enquanto o SVG não foi renderizado.
   */
  useLayoutEffect(() => {
    const el = host.current
    if (!el) return
    if (!el.firstElementChild) el.innerHTML = fluxoNovo

    let raf = 0
    let tentativas = 0
    const tentar = () => {
      const svg = el.querySelector('svg') as SVGSVGElement | null
      const d = svg && classificar(svg)
      if (d) setDesenho(d)
      else if (tentativas++ < 60) raf = requestAnimationFrame(tentar)
    }
    tentar()
    return () => cancelAnimationFrame(raf)
  }, [])

  // Entrada: roda uma vez, assim que o desenho fica classificado.
  useLayoutEffect(() => {
    if (!desenho) return
    aplicarFase(desenho, stepRef.current, true)

    /**
     * `fromTo`, não `from`, e com `clearProps` no fim. O StrictMode roda o
     * efeito duas vezes: a limpeza mata o tween no meio e deixa `opacity`
     * inline num valor parcial, e um `from` animaria *até* esse parcial — o
     * desenho congelava em 40%.
     */
    const tl = gsap.fromTo(
      desenho.folhas,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.008,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        onComplete: () => aplicarFase(desenho, stepRef.current, true),
      },
    )

    /** Rede de segurança: `requestAnimationFrame` congela em aba oculta. */
    if (document.hidden) tl.progress(1)
    const guarda = window.setTimeout(() => {
      if (tl.progress() < 1) tl.progress(1)
    }, 4000)

    return () => {
      window.clearTimeout(guarda)
      tl.kill()
      gsap.set(desenho.folhas, { clearProps: 'opacity,transform' })
    }
  }, [desenho])

  useEffect(() => {
    if (desenho) aplicarFase(desenho, step, false)
  }, [desenho, step])

  return (
    <section className='flex flex-1 min-h-0 flex-col font-ilum text-[#251a34] px-[52px] pt-8 pb-8 max-[900px]:p-5'>
      <h1
        className='shrink-0 text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-4 animate-ilum-rise motion-reduce:animate-none'
        style={delay(0.1)}
      >
        Arquitetura
      </h1>

      <div
        ref={host}
        // `w-full h-full` no SVG, não `max-*`: com a largura intrínseca do
        // arquivo (1087) a caixa do elemento continuava com a proporção antiga
        // e limitava o zoom da câmera a 10%. Deixando o CSS governar a caixa,
        // o `preserveAspectRatio` ajusta o desenho ao `viewBox` corrente.
        className='flex-1 min-h-0 [&_svg]:w-full [&_svg]:h-full'
        role='img'
        aria-label='Fluxo da arquitetura: gestão de frota e fontes de dados alimentam o Ilum, que troca com o Vision, salva no Banco Yoda e roteia para a plataforma do projeto; dela saem os termos plataforma, serviço e produto'
      />
    </section>
  )
}
