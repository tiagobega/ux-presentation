import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import fluxoNovo from '../../assets/fluxo-novo.svg?raw'
import type { SlideProps } from '../config'
import { Frame } from './ui'

/**
 * Estrutura proposta — o fluxograma vem de `src/assets/fluxo-novo.svg`.
 *
 * O export do Figma é **plano**: nenhum grupo, nenhum id, o texto virou path.
 * Por isso este slide não procura seletores — ele **classifica os elementos
 * por geometria** em tempo de execução:
 *
 * - cartão = `rect` com `stroke` e mais de 100x35 (os chips roxos têm 26 de
 *   altura, então ficam de fora);
 * - todo elemento cujo centro cai dentro de um cartão pertence a ele;
 * - do que sobra, `line` é divisória de coluna, path roxo é rótulo de coluna
 *   e path escuro é conector.
 *
 * A vantagem é que **reexportar o SVG não quebra a animação**, ao contrário de
 * anotar o arquivo à mão. Se o desenho mudar de layout, só a função
 * `ordemDoCartao` precisa de atenção.
 */

type CardId = 'fleets' | 'fontes' | 'ilum' | 'vision' | 'yoda' | 'projeto'

/** Ordem no fluxo. Também decide a qual etapa um conector pertence. */
const ORDEM: Record<CardId, number> = {
  fleets: 1,
  fontes: 2,
  ilum: 3,
  vision: 4,
  yoda: 5,
  projeto: 6,
}

interface Etapa {
  /** Rótulo do step, como aparece na nav. */
  key: string
  cards: CardId[]
  /** Ganho esperado. Ausente na visão geral. */
  ganho?: string
  texto: string
  /** Fecha a coluna com a caixa dos padrões compartilhados. */
  padroes?: boolean
}

/** O que precisa estar padronizado para o fluxo funcionar entre projetos. */
const PADROES = [
  'Back-end',
  'Front-end',
  'Banco de dados',
  'Autenticação',
  'Comunicação entre camadas',
]

/**
 * A etapa 0 não escreve nada: o desenho inteiro aparece e a coluna fica vazia,
 * para a fala abrir sem legenda concorrendo com o diagrama.
 */
const ETAPAS: Etapa[] = [
  { key: 'Visão geral', cards: [], texto: '' },
  {
    key: 'Gestão de frota',
    cards: ['fleets'],
    ganho: 'Contrato e frota num lugar só',
    texto: 'O Fleets cuida do contrato de campo, dos veículos e dos colaboradores.',
  },
  {
    // As fontes acendem junto: é delas que o Ilum ingere.
    key: 'Ilum',
    cards: ['fontes', 'ilum'],
    ganho: 'Dado ligado ao contrato',
    texto: 'O Ilum ingere o dado, o relaciona ao contrato e o envia para o processamento.',
  },
  {
    key: 'Processamento',
    cards: ['vision'],
    ganho: 'Processamento isolado',
    texto: 'O Vision devolve o dado processado.',
  },
  {
    key: 'Banco Yoda',
    cards: ['yoda'],
    ganho: 'Carga e acesso controlados',
    texto: 'O Ilum salva o dado no Yoda.',
  },
  {
    key: 'Projetos',
    cards: ['projeto'],
    ganho: 'Cada time no seu projeto',
    texto: 'O Ilum encaminha os dados para os seus respectivos projetos.',
  },
  {
    key: 'Padronização',
    cards: [],
    ganho: 'Integração com padrão comum',
    texto: 'O que precisa estar padronizado para o fluxo funcionar entre times e projetos.',
    padroes: true,
  },
]

export const ACTIONS = ETAPAS.map((e) => e.key)

/** Traço padrão do desenho e o roxo do realce. */
const TRACO = '#1A1225'
const REALCE = '#7C3AED'

interface Cartao {
  id: CardId
  /**
   * `rect`s de contorno — é neles que o realce acontece. São vários quando a
   * camada tem mais de um cartão (Hardwares, WFM e 156 são todos `fontes`).
   */
  contornos: SVGGraphicsElement[]
  /** Tudo que vive dentro do cartão, contornos incluídos. */
  elementos: SVGGraphicsElement[]
  /** União das caixas dos cartões — usada para ligar os conectores. */
  caixa: Caixa
}

interface Conector {
  /** O traço original do desenho, que fica sempre visível em cinza. */
  el: SVGGraphicsElement
  /** Cópia roxa por cima, revelada quando a etapa chega. */
  copia: SVGGraphicsElement
  /** `rect` do clipPath que faz a varredura da cópia. */
  clip: SVGRectElement
  caixa: Caixa
  /**
   * Varre (`true`) ou só acende (`false`). Conector curto não tem percurso
   * para varrer: a varredura viraria um piscar.
   */
  varre: boolean
  /** Etapa a que o conector pertence. */
  card: CardId
}

interface Desenho {
  cartoes: Cartao[]
  divisorias: SVGGraphicsElement[]
  rotulos: SVGGraphicsElement[]
  conectores: Conector[]
}

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

/** Encosta em `b` com uma folga — usado para ligar conector a cartão. */
const encosta = (a: Caixa, b: Caixa, folga = 14) =>
  a.x <= b.x + b.w + folga &&
  a.x + a.w >= b.x - folga &&
  a.y <= b.y + b.h + folga &&
  a.y + a.h >= b.y - folga

/**
 * Qual cartão é qual, pela posição: coluna (x) e depois altura (y). É o único
 * ponto que depende do layout do desenho.
 */
function ordemDoCartao(caixas: Caixa[]): CardId[] {
  const coluna = (c: Caixa) => (c.x < 200 ? 0 : c.x < 566 ? 1 : c.x < 738 ? 2 : 3)
  return caixas.map((c) => {
    const col = coluna(c)
    if (col === 1) return 'ilum'
    if (col === 2) return 'vision'
    if (col === 3) return c.y < 200 ? 'yoda' : 'projeto'
    // Coluna da esquerda: o cartão de cima é o Fleets, o resto é fonte de dados.
    return c.y < 200 ? 'fleets' : 'fontes'
  })
}

const NS = 'http://www.w3.org/2000/svg'

/**
 * Prepara a seta roxa de cada conector.
 *
 * Os conectores do Figma são formas **preenchidas** (o contorno da flecha),
 * não traços — então `stroke-dashoffset`, que é como se desenha uma linha,
 * não serve aqui. A saída é duplicar o conector, pintar a cópia de roxo e
 * revelá-la por um `clipPath` que varre no sentido do fluxo. O traço cinza
 * original continua embaixo, então nada some quando a etapa passa.
 *
 * Todos os conectores longos do desenho correm da esquerda para a direita,
 * então a varredura é sempre nesse sentido; os curtos (as duas trocas com o
 * Vision e o Fleets → Ilum) só acendem.
 */
function prepararSetas(
  svg: SVGSVGElement,
  crus: { el: SVGGraphicsElement; card: CardId; caixa: Caixa }[],
): Conector[] {
  const defs = document.createElementNS(NS, 'defs')
  defs.setAttribute('data-ilum-defs', '')
  svg.insertBefore(defs, svg.firstChild)

  return crus.map((c, i) => {
    const varre = c.caixa.w > 60
    const id = `ilum-seta-${i}`

    const clip = document.createElementNS(NS, 'rect')
    clip.setAttribute('x', String(c.caixa.x - 2))
    clip.setAttribute('y', String(c.caixa.y - 2))
    clip.setAttribute('height', String(c.caixa.h + 4))
    // Quem varre começa fechado; quem só acende já nasce com o clip aberto.
    clip.setAttribute('width', varre ? '0' : String(c.caixa.w + 4))

    const clipPath = document.createElementNS(NS, 'clipPath')
    clipPath.setAttribute('id', id)
    clipPath.appendChild(clip)
    defs.appendChild(clipPath)

    const copia = c.el.cloneNode(true) as SVGGraphicsElement
    copia.setAttribute('fill', REALCE)
    /**
     * O conector original vem com `fill-opacity="0.14"` — é o cinza claro do
     * desenho. A cópia herda esse atributo no `cloneNode`, e sem zerá-lo o
     * roxo é pintado a 14% e praticamente não aparece.
     */
    copia.setAttribute('fill-opacity', '1')
    copia.setAttribute('clip-path', `url(#${id})`)
    copia.setAttribute('data-ilum-seta', c.card)
    if (varre) copia.style.opacity = '1'
    else copia.style.opacity = '0'
    c.el.parentNode?.insertBefore(copia, c.el.nextSibling)

    return { ...c, copia, clip, varre }
  })
}

function classificar(svg: SVGSVGElement): Desenho | null {
  /**
   * Limpa o que uma classificação anterior tenha criado. Sem isto, rodar de
   * novo (o React chama o efeito duas vezes em dev, e há a repetição por
   * quadro) duplicaria as setas — e pior: na segunda passagem as cópias
   * roxas entrariam na conta como rótulos de coluna, porque a regra de
   * rótulo é justamente "path roxo solto".
   */
  svg.querySelectorAll('[data-ilum-seta]').forEach((e) => e.remove())
  svg.querySelector('defs[data-ilum-defs]')?.remove()

  const filhos = [...svg.children] as SVGGraphicsElement[]
  if (filhos.length === 0) return null

  let caixas: Caixa[]
  try {
    caixas = filhos.map(caixaDe)
  } catch {
    // getBBox falha se o SVG ainda não foi renderizado.
    return null
  }

  const indiceCartoes = filhos
    .map((_, i) => i)
    .filter(
      (i) =>
        filhos[i].tagName === 'rect' &&
        !!filhos[i].getAttribute('stroke') &&
        caixas[i].w > 100 &&
        caixas[i].h > 35,
    )
  if (indiceCartoes.length === 0) return null

  const ids = ordemDoCartao(indiceCartoes.map((i) => caixas[i]))
  const porId = new Map<CardId, Cartao>()
  indiceCartoes.forEach((i, n) => {
    const id = ids[n]
    const c = caixas[i]
    const existente = porId.get(id)
    if (existente) {
      existente.contornos.push(filhos[i])
      existente.elementos.push(filhos[i])
      const x = Math.min(existente.caixa.x, c.x)
      const y = Math.min(existente.caixa.y, c.y)
      existente.caixa = {
        x,
        y,
        w: Math.max(existente.caixa.x + existente.caixa.w, c.x + c.w) - x,
        h: Math.max(existente.caixa.y + existente.caixa.h, c.y + c.h) - y,
      }
    } else {
      porId.set(id, { id, contornos: [filhos[i]], elementos: [filhos[i]], caixa: { ...c } })
    }
  })

  const donoDe = (i: number): CardId | null => {
    for (let n = 0; n < indiceCartoes.length; n++) {
      if (centroDentro(caixas[i], caixas[indiceCartoes[n]])) return ids[n]
    }
    return null
  }

  const divisorias: SVGGraphicsElement[] = []
  const rotulos: SVGGraphicsElement[] = []
  const soltos: number[] = []

  filhos.forEach((el, i) => {
    if (indiceCartoes.includes(i)) return
    const dono = donoDe(i)
    if (dono) {
      porId.get(dono)!.elementos.push(el)
      return
    }
    if (el.tagName === 'line') divisorias.push(el)
    else if (el.getAttribute('fill') === REALCE) rotulos.push(el)
    else soltos.push(i)
  })

  // Conector pertence à etapa do cartão mais avançado no fluxo que ele toca.
  const crus = soltos.map((i) => {
    let card: CardId = 'ilum'
    let melhor = -1
    porId.forEach((c, id) => {
      if (encosta(caixas[i], c.caixa) && ORDEM[id] > melhor) {
        melhor = ORDEM[id]
        card = id
      }
    })
    return { el: filhos[i], card, caixa: caixas[i] }
  })
  const conectores = prepararSetas(svg, crus)

  const cartoes = [...porId.values()].sort((a, b) => ORDEM[a.id] - ORDEM[b.id])
  // Marca a camada no próprio nó: ajuda a inspecionar o desenho no DevTools.
  cartoes.forEach((c) => c.contornos.forEach((el) => el.setAttribute('data-ilum', c.id)))
  return { cartoes, divisorias, rotulos, conectores }
}

/**
 * Estado de repouso de uma etapa. O realce é só cor e espessura do contorno:
 * mexer em `y` ou `opacity` dos cartões brigaria com a animação de entrada,
 * que anima essas mesmas propriedades.
 */
function aplicarEtapa(desenho: Desenho, step: number, instantaneo: boolean) {
  const ateAgora = new Set<CardId>()
  ETAPAS.slice(0, step + 1).forEach((e) => e.cards.forEach((c) => ateAgora.add(c)))
  const atuais = ETAPAS[step].cards

  /**
   * Chamado como método: `const m = gsap.set` perderia o `this` e lança.
   *
   * `overwrite: 'auto'` não é opcional aqui. A varredura de abertura dura
   * mais que o fechamento, então navegando rápido um tween de abertura ainda
   * em curso terminava depois do fechamento e reabria a seta — dava para ver
   * voltando quatro etapas de uma vez.
   */
  const mexer = (alvo: gsap.TweenTarget, vars: gsap.TweenVars, duracao = 0.3) =>
    instantaneo
      ? gsap.set(alvo, vars)
      : gsap.to(alvo, { ...vars, duration: duracao, ease: 'power2.out', overwrite: 'auto' })

  desenho.cartoes.forEach((c) => {
    const aceso = ateAgora.has(c.id)
    mexer(c.contornos, {
      stroke: aceso ? REALCE : TRACO,
      'stroke-opacity': aceso ? 1 : 0.6,
      strokeWidth: atuais.includes(c.id) ? 2 : aceso ? 1.6 : 1,
    })
  })
  desenho.conectores.forEach(({ copia, clip, caixa, varre, card }) => {
    const on = ateAgora.has(card)
    if (varre) {
      // A varredura é mais lenta que o realce do cartão: é ela que lê como
      // "o dado percorreu este caminho".
      mexer(clip, { attr: { width: on ? caixa.w + 4 : 0 } }, on ? 0.75 : 0.3)
    } else {
      mexer(copia, { opacity: on ? 1 : 0 })
    }
  })
}

export default function Slide01EstruturaProposta({ action }: SlideProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [desenho, setDesenho] = useState<Desenho | null>(null)

  const step = Math.max(0, ACTIONS.indexOf(action))
  /** A entrada termina depois; precisa ler a etapa corrente, não a da estreia. */
  const stepRef = useRef(step)
  stepRef.current = step

  /**
   * O SVG é injetado à mão, não por `dangerouslySetInnerHTML`: o React
   * recriava esse conteúdo a cada re-render, e a classificação passava a
   * guardar nós que já não estavam no documento — o realce era aplicado em
   * elementos órfãos e nada aparecia.
   *
   * A classificação ainda tenta por alguns quadros porque o slide monta antes
   * da câmera chegar nele, e aí `getBBox` pode devolver zeros.
   */
  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (!host.firstElementChild) host.innerHTML = fluxoNovo

    let raf = 0
    let tentativas = 0
    const tentar = () => {
      const svg = host.querySelector('svg') as SVGSVGElement | null
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
    // O repouso vem antes, para a entrada animar a partir do estado certo.
    aplicarEtapa(desenho, stepRef.current, true)

    const cartoes = desenho.cartoes.flatMap((c) => c.elementos)
    const tl = gsap
      .timeline({
        defaults: { ease: 'power2.out' },
        // A entrada mexe em `opacity` dos mesmos elementos que o realce pinta;
        // reafirmar o repouso no fim garante que a etapa corrente prevaleça.
        onComplete: () => aplicarEtapa(desenho, stepRef.current, true),
      })
      .from(desenho.divisorias, { opacity: 0, duration: 0.4 })
      .from(desenho.rotulos, { opacity: 0, y: -6, duration: 0.4, stagger: 0.05 }, '-=0.2')
      .from(cartoes, { opacity: 0, y: 10, duration: 0.45, stagger: 0.012 }, '-=0.15')
      .from(
        desenho.conectores.map((c) => c.el),
        { opacity: 0, duration: 0.5, stagger: 0.07 },
        '-=0.35',
      )

    /**
     * Rede de segurança. A entrada é `.from(opacity: 0)`, e o GSAP anda por
     * `requestAnimationFrame` — que o navegador congela em aba oculta ou em
     * segundo plano. Sem isto, chegar no slide com a janela atrás de outra
     * deixaria o desenho parado em invisível. `setTimeout` continua correndo,
     * então serve de guarda: passado o tempo da animação, o desenho aparece
     * de qualquer jeito.
     */
    if (document.hidden) tl.progress(1)
    const guarda = window.setTimeout(() => {
      if (tl.progress() < 1) tl.progress(1)
    }, 4000)

    // `kill` em vez de `gsap.context().revert()`: o revert desfazia também o
    // realce da etapa, porque ele pinta elementos que a entrada animou.
    return () => {
      window.clearTimeout(guarda)
      tl.kill()
    }
  }, [desenho])

  // Realce por etapa: acende e permanece aceso, sem apagar nada.
  useEffect(() => {
    if (desenho) aplicarEtapa(desenho, step, false)
  }, [desenho, step])

  return (
    <Frame
      title='Novo Fluxo (em execução)'
    >
      {/* Mesma anatomia do slide 1: desenho à esquerda, pilha de camadas à direita. */}
      <div className='grid grid-cols-[minmax(0,3fr)_minmax(250px,1fr)] gap-7 items-center max-[900px]:grid-cols-1'>
        <div
          ref={hostRef}
          className='flex items-center justify-center [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:max-h-[62vh] max-[900px]:[&_svg]:max-h-none'
          role='img'
          aria-label='Fluxo proposto: gestão de frota e fontes de dados alimentam o Ilum, que troca com o Vision, salva no Banco Yoda e roteia para a plataforma do projeto'
        />

        <aside className='border-l-[3px] border-l-[#7c3aed] pl-[23px]' aria-live='polite'>
          {step > 0 && (
            <>
              <span className='block text-[12px] [line-height:normal] [font-family:monospace] text-[#7c3aed] mb-[18px]'>
                {`CAMADA ${String(step).padStart(2, '0')} / 0${ETAPAS.length - 1}`}
              </span>

              {/* Acende e permanece aceso: só a camada corrente mostra a descrição. */}
              <ol className='list-none m-0 p-0 flex flex-col gap-[11px]'>
                {ETAPAS.slice(1, step + 1).map((e, i) => {
                  const atual = i === step - 1
                  return (
                    <li
                      key={e.key}
                      className={`flex gap-[10px] items-start transition-opacity duration-300 motion-reduce:transition-none animate-ilum-in motion-reduce:animate-none ${
                        atual ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-[22px] h-[22px] rounded-[999px] text-center text-[11px] font-semibold leading-[22px] [font-family:ui-monospace,monospace] transition-colors duration-300 motion-reduce:transition-none ${
                          atual ? 'bg-[#7c3aed] text-white' : 'bg-[#e7dbf7] text-[#5a3581]'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <b className='block font-[650] leading-[1.25] text-[#312140] text-[clamp(12px,1vw,15px)]'>
                          {e.key}
                        </b>
                        {atual && (
                          <>
                            {e.ganho && (
                              <span className='inline-block rounded-[999px] bg-[#7c3aed] text-white text-[10px] font-semibold tracking-[0.04em] px-2.5 py-1 mt-2'>
                                {e.ganho}
                              </span>
                            )}
                            <p className='text-[clamp(12px,.95vw,15px)] leading-[1.4] mt-2 text-[#64566f]'>
                              {e.texto}
                            </p>
                            {e.padroes && (
                              <div className='mt-2.5 rounded-lg border border-[#c3aadc] bg-[#ffffffb0] p-3'>
                                <b className='block text-[10px] tracking-[0.1em] uppercase text-[#7c3aed] mb-2'>
                                  Padrões compartilhados
                                </b>
                                <div className='flex flex-wrap gap-1.5'>
                                  {PADROES.map((p) => (
                                    <span
                                      key={p}
                                      className='rounded-[5px] bg-[#e7dbf7] text-[#5a3581] text-[11px] font-semibold px-2 py-1'
                                    >
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </>
          )}
        </aside>
      </div>
    </Frame>
  )
}
