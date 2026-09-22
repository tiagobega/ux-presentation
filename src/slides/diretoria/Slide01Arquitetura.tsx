import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import fluxoNovo from '../../assets/fluxo-novo.svg?raw'
import type { SlideProps } from '../config'
import { Peca, Rotulo, delay } from './ui'

/**
 * Slide 1 — Arquitetura e vocabulário.
 *
 * Três passos sobre o mesmo palco:
 * 1. a infraestrutura inteira, que é o `fluxo-novo.svg` do deck Ilum;
 * 2. o desenho recua e sobra o cartão do projeto, com os três termos à direita;
 * 3. as peças do cartão se movem para a linha do termo a que pertencem.
 *
 * O terceiro passo é o argumento do slide: plataforma, serviço e produto não
 * são definições abstratas, são o que já está no desenho da arquitetura.
 *
 * **O palco tem tamanho fixo** (`LARGURA`×`ALTURA`) e é escalado para caber no
 * slide. É o que torna o movimento das peças exato: origem e destino são
 * coordenadas que eu escrevo, e a peça anima `left`/`top`/`width` de uma para
 * a outra — sem medir nada do DOM, e sem precisar que as duas tenham o mesmo
 * tamanho, como um FLIP por `transform` exigiria.
 *
 * O SVG é injetado à mão (`host.innerHTML`), não por `dangerouslySetInnerHTML`:
 * o React recria aquele conteúdo a cada render, e a animação de entrada
 * passaria a animar nós que já saíram do documento.
 */

const LARGURA = 1240
const ALTURA = 560

/**
 * Onde uma peça está no cartão e para onde ela vai na linha do termo.
 *
 * Guardo `x/y/w/h` e converto com `caixa()` na hora de aplicar: espalhar este
 * objeto direto no `style` não posiciona nada, porque CSS quer
 * `left/top/width/height` — foi exatamente assim que, na primeira versão,
 * todas as peças empilharam no canto do palco.
 */
interface Lugar {
  x: number
  y: number
  w: number
  h: number
}

const caixa = (l: Lugar) => ({ left: l.x, top: l.y, width: l.w, height: l.h })

interface PecaProjeto {
  nome: string
  origem: Lugar
  destino: Lugar
}

/** Coluna do cartão e coluna dos termos. */
const CARTAO_X = 14
const CARTAO_W = 262
const TERMO_X = 380

const linha = (i: number, y: number, w = 160, h = 28): Lugar => ({
  x: TERMO_X + i * (w + 10),
  y,
  w,
  h,
})

/**
 * Os nomes são os do `fluxo-novo.svg`, não os do esboço: o cartão aqui é um
 * recorte daquele desenho, e divergir faria o passo 3 parecer outra coisa.
 */
const PLATAFORMA: PecaProjeto = {
  nome: 'Projeto (exemplo: Uberlândia)',
  origem: { x: CARTAO_X, y: 54, w: CARTAO_W, h: 34 },
  destino: { x: TERMO_X, y: 116, w: 262, h: 34 },
}

/** SERVIÇOS DEDICADOS, no cartão do projeto. */
const SERVICOS: PecaProjeto[] = [
  { nome: 'Banco', x: CARTAO_X, w: 76 },
  { nome: 'Front-end', x: CARTAO_X + 80, w: 90 },
  { nome: 'Back-end', x: CARTAO_X + 174, w: 88 },
].map((c, i) => ({
  nome: c.nome,
  origem: { x: c.x, y: 120, w: c.w, h: 28 },
  destino: linha(i, 274),
}))

/** PRODUTOS (EXEMPLO), no cartão do projeto. */
const PRODUTOS: PecaProjeto[] = [
  'Obras',
  'Lens (BI)',
  'Planejamento Recape',
  'Query',
  'Mapas',
].map((nome, i) => ({
  nome,
  origem: { x: CARTAO_X, y: 316 + i * 34, w: CARTAO_W, h: 28 },
  destino: linha(i, 432),
}))

/** Fica no cartão: a equipe não é um dos três termos. */
const EQUIPE = ['Eduardo', 'Curci', 'Bio']

interface BlocoTermo {
  termo: string
  descricao: string
  y: number
}

const TERMOS: BlocoTermo[] = [
  { termo: 'Plataforma', descricao: 'base principal', y: 40 },
  {
    termo: 'Serviço',
    descricao: 'código específico da plataforma, representado como módulo',
    y: 198,
  },
  { termo: 'Produto', descricao: 'módulo acoplado a um host', y: 356 },
]

export const ACTIONS = ['Infraestrutura', 'Vocabulário', 'De onde vem cada um']

/** Escala que faz o palco de tamanho fixo caber no espaço disponível. */
function useEscala(alvo: React.RefObject<HTMLDivElement | null>) {
  const [escala, setEscala] = useState(0.7)

  useEffect(() => {
    const el = alvo.current
    if (!el) return
    const medir = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      setEscala(Math.min(width / LARGURA, height / ALTURA))
    }
    medir()
    const observador = new ResizeObserver(medir)
    observador.observe(el)
    return () => observador.disconnect()
  }, [alvo])

  return escala
}

function Secao({ rotulo, y }: { rotulo: string; y: number }) {
  return (
    <div className='absolute left-[14px]' style={{ top: y }}>
      <Rotulo>{rotulo}</Rotulo>
    </div>
  )
}

export default function Slide01Arquitetura({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  const palco = useRef<HTMLDivElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const escala = useEscala(palco)

  const recorte = step >= 1
  const voou = step >= 2

  // Entrada do desenho: os elementos do SVG sobem escalonados quando a câmera chega.
  useLayoutEffect(() => {
    const el = host.current
    if (!el) return
    if (!el.firstElementChild) el.innerHTML = fluxoNovo
    const svg = el.querySelector('svg')
    if (!svg) return

    const filhos = [...svg.children]

    /**
     * `fromTo`, não `from`, e com `clearProps` no fim.
     *
     * O StrictMode roda este efeito duas vezes em desenvolvimento: monta,
     * limpa, monta de novo. A limpeza mata o tween no meio e deixa
     * `opacity` inline em algum valor parcial — e um `from` anima *até o
     * valor atual do elemento*, que passa a ser esse parcial. O desenho
     * congelava em 40% e a animação nunca terminava.
     *
     * Com os dois extremos escritos, repetir o efeito sempre termina em
     * opacidade 1, e o `clearProps` devolve os elementos ao estado natural
     * para a passagem seguinte começar limpa.
     */
    const tl = gsap.fromTo(
      filhos,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.008,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      },
    )

    /**
     * Rede de segurança: o GSAP anda por `requestAnimationFrame`, que o
     * navegador congela em aba oculta. Sem isto, chegar no slide com a janela
     * atrás de outra deixaria o desenho parado em invisível.
     */
    if (document.hidden) tl.progress(1)
    const guarda = window.setTimeout(() => {
      if (tl.progress() < 1) tl.progress(1)
    }, 4000)

    return () => {
      window.clearTimeout(guarda)
      tl.kill()
      // Sem isto, a segunda passagem do StrictMode começaria do valor parcial
      // em que o tween morreu.
      gsap.set(filhos, { clearProps: 'opacity,transform' })
    }
  }, [])

  const voando = [PLATAFORMA, ...SERVICOS, ...PRODUTOS]

  return (
    <section className='flex flex-1 min-h-0 flex-col font-ilum text-[#251a34] px-[52px] pt-8 pb-8 max-[900px]:p-5'>
      <h1
        className='shrink-0 text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] mb-5 animate-ilum-rise motion-reduce:animate-none'
        style={delay(0.1)}
      >
        Arquitetura
      </h1>

      <div ref={palco} className='relative flex-1 min-h-0'>
        <div
          className='absolute left-1/2 top-1/2 origin-center'
          style={{
            width: LARGURA,
            height: ALTURA,
            transform: `translate(-50%, -50%) scale(${escala})`,
          }}
        >
          {/* ── Passo 1: a infraestrutura ── */}
          <div
            ref={host}
            className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 motion-reduce:transition-none [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:max-h-full ${
              recorte ? 'opacity-0 scale-[0.96]' : 'opacity-100 scale-100'
            }`}
            role='img'
            aria-label='Fluxo da arquitetura: gestão de frota e fontes de dados alimentam o Ilum, que troca com o Vision, salva no Banco Yoda e roteia para a plataforma do projeto'
          />

          {/* ── Passos 2 e 3: o cartão do projeto e os três termos ── */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
              recorte ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!recorte}
          >
            {/* O cartão, recortado do desenho */}
            <div className='absolute left-0 top-[40px] w-[290px] h-[480px] rounded-xl border border-[#c3aadc] bg-[#ffffff9e]' />

            <Secao rotulo='SERVIÇOS DEDICADOS' y={100} />
            <Secao rotulo='EQUIPE DEDICADA (EXEMPLO)' y={164} />
            <Secao rotulo='PRODUTOS (EXEMPLO)' y={296} />

            {EQUIPE.map((nome, i) => (
              <div
                key={nome}
                className='absolute'
                style={{ left: CARTAO_X, top: 184 + i * 34, width: CARTAO_W, height: 28 }}
              >
                <Peca>{nome}</Peca>
              </div>
            ))}

            {/* As peças que continuam no cartão, esmaecidas quando a cópia parte. */}
            {voando.map((p) => (
              <div
                key={`origem-${p.nome}`}
                className='absolute transition-opacity duration-500 motion-reduce:transition-none'
                style={{ ...caixa(p.origem), opacity: voou ? 0.25 : 1 }}
              >
                <Peca>{p.nome}</Peca>
              </div>
            ))}

            {/* A seta some quando as peças partem: quem indica o caminho passa a ser o movimento. */}
            <svg
              className={`absolute left-[298px] top-[268px] w-[70px] h-[24px] transition-opacity duration-300 motion-reduce:transition-none ${
                voou ? 'opacity-0' : 'opacity-100'
              }`}
              viewBox='0 0 70 24'
              aria-hidden='true'
            >
              <path
                d='M0 12 L58 12 M52 6 L58 12 L52 18'
                fill='none'
                className='stroke-[#8e73ad] [stroke-width:2]'
              />
            </svg>

            {TERMOS.map((t, i) => (
              <div
                key={t.termo}
                className='absolute animate-ilum-rise motion-reduce:animate-none'
                style={{ left: TERMO_X, top: t.y, width: LARGURA - TERMO_X, ...delay(0.1 + i * 0.1) }}
              >
                <span className='block text-[34px] font-[750] tracking-[-1px] leading-[1.05] text-[#3d2b52]'>
                  {t.termo}
                </span>
                <span className='block text-[14px] leading-[1.35] text-[#64566f] mt-1.5'>
                  ({t.descricao})
                </span>
              </div>
            ))}

            {/* As cópias que se movem: origem e destino são coordenadas escritas. */}
            {voando.map((p, i) => (
              <div
                key={`voo-${p.nome}`}
                className='absolute transition-[left,top,width,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
                style={{
                  ...caixa(voou ? p.destino : p.origem),
                  opacity: voou ? 1 : 0,
                  transitionDelay: `${(voou ? i * 0.07 : 0).toFixed(2)}s`,
                }}
              >
                <Peca forte>{p.nome}</Peca>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
