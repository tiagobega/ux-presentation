import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { SlideProps } from '../config'
import { Rotulo, delay } from './ui'

/**
 * Slide 2 — Composição de uma aplicação (Cidade X).
 *
 * Um cenário só: prompt e catálogo à esquerda, prévia da aplicação à direita. A prévia ocupa o seu espaço desde o primeiro quadro,
 * para a animação nunca reposicionar o conteúdo, e o título, a indicação de
 * visão futura e o prompt ficam no mesmo lugar do começo ao fim.
 *
 * **O palco tem tamanho fixo** (`LARGURA`×`ALTURA`) e é escalado para caber no
 * slide. É o que torna o voo dos módulos exato: cada cópia é posicionada no
 * destino (a entrada do menu) e começa deslocada pelo delta até a peça no
 * catálogo — um FLIP sem medir nada do DOM. Medir filhos daria a mesma
 * animação com muito mais chance de sair torta numa tela diferente.
 *
 * **O clique no botão dispara a montagem.** Antes a digitação terminava, o
 * botão acendia, o clique acontecia — e nada mais, até o apresentador avançar.
 * Um clique simulado que não causa nada lê como animação quebrada. Agora a
 * cadeia corre sozinha a partir dele: plataforma, depois os módulos voando
 * para o menu. Sobra um único avanço, o que preenche a aplicação, para o
 * apresentador não ficar apertando seta sem que nada mude na tela.
 *
 * A fase desenhada sai do `step` ou da cadeia automática, então voltar para a
 * primeira etapa reinicia a digitação e toda a sequência.
 *
 * Cuidado de conteúdo: isto é uma simulação da experiência desejada. Não
 * demonstra geração, publicação ou provisionamento já implementados, e a
 * criação por prompt não entra nos compromissos da POC nem dos seis meses.
 */

const LARGURA = 1180
const ALTURA = 520

const PROMPT =
  'Preciso criar uma aplicação para a Cidade X, adicionar os módulos de Obras, Informs e Mapas e utilizar o Lens para ver a qualidade do pavimento.'

interface Peca {
  nome: string
  /** Posição no catálogo, em unidades do palco. */
  x: number
  y: number
  /** Entrada do menu que a peça ocupa. Ausente = fica no catálogo. */
  menuY?: number
}

const LARGURA_PECA = 196
const ALTURA_PECA = 44
const MENU_X = 522

/** Os sete módulos do catálogo. Os quatro primeiros entram na Cidade X. */
const CATALOGO: Peca[] = [
  { nome: 'Obras', x: 16, y: 268, menuY: 72 },
  { nome: 'Informs', x: 226, y: 268, menuY: 124 },
  { nome: 'Mapas', x: 16, y: 324, menuY: 176 },
  { nome: 'Lens · BI', x: 226, y: 324, menuY: 228 },
  { nome: 'Planejamento', x: 16, y: 380 },
  { nome: 'Módulo X', x: 226, y: 380 },
  { nome: 'Módulo Y', x: 16, y: 436 },
]

/** Trechos de pavimento da maquete do Mapas, com a categoria do Lens. */
const TRECHOS: { largura: number; cor: string }[] = [
  { largura: 0.92, cor: '#4f9d69' },
  { largura: 0.64, cor: '#d8a33a' },
  { largura: 0.81, cor: '#4f9d69' },
  { largura: 0.45, cor: '#c4573f' },
  { largura: 0.72, cor: '#d8a33a' },
]

const CATEGORIAS: { nome: string; valor: number; cor: string }[] = [
  { nome: 'Bom', valor: 0.58, cor: '#4f9d69' },
  { nome: 'Regular', valor: 0.29, cor: '#d8a33a' },
  { nome: 'Ruim', valor: 0.13, cor: '#c4573f' },
]

export const ACTIONS = ['Composição', 'Aplicação']

/** Escala que faz o palco de tamanho fixo caber no espaço disponível. */
function useEscala(alvo: RefObject<HTMLDivElement | null>) {
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

/**
 * Digita o prompt enquanto a etapa for a primeira.
 *
 * A conta é por **tempo decorrido**, num `requestAnimationFrame`, e não um
 * caractere por tique de `setInterval`: cada caractere provoca um render do
 * palco inteiro, e com intervalo fixo o tique atrasava — a frase levava o
 * dobro do previsto e o apresentador ficava esperando. Por tempo decorrido a
 * digitação dura o mesmo em qualquer máquina; o que varia é a suavidade.
 */
const DURACAO_DIGITACAO = 2600

function useDigitacao(ativo: boolean) {
  const [texto, setTexto] = useState('')
  const [pronto, setPronto] = useState(false)
  const [clicado, setClicado] = useState(false)

  useEffect(() => {
    if (!ativo) {
      // Nas etapas seguintes o prompt fica inteiro na tela, sem redigitar.
      setTexto(PROMPT)
      setPronto(true)
      setClicado(true)
      return
    }

    setTexto('')
    setPronto(false)
    setClicado(false)

    const comeco = performance.now()
    let raf = 0
    const timers: number[] = []

    const concluir = () => {
      setTexto(PROMPT)
      setPronto(true)
      timers.push(window.setTimeout(() => setClicado(true), 620))
    }

    const passo = () => {
      const fracao = (performance.now() - comeco) / DURACAO_DIGITACAO
      if (fracao >= 1) {
        concluir()
        return
      }
      setTexto(PROMPT.slice(0, Math.ceil(fracao * PROMPT.length)))
      raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)

    /**
     * Rede de segurança: `requestAnimationFrame` congela em aba oculta, e sem
     * isto chegar no slide com a janela atrás de outra deixaria o prompt
     * parado pela metade. `setTimeout` continua correndo.
     */
    const guarda = window.setTimeout(() => {
      cancelAnimationFrame(raf)
      concluir()
    }, DURACAO_DIGITACAO + 400)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(guarda)
      timers.forEach(window.clearTimeout)
    }
  }, [ativo])

  return { texto, pronto, clicado }
}

/**
 * A cadeia automática que o clique dispara: plataforma e, depois, os módulos.
 * A última fase (o conteúdo da aplicação) fica com o apresentador.
 */
function useCadeia(noPrompt: boolean, clicado: boolean) {
  const [fase, setFase] = useState(0)

  // Reentrar na primeira etapa recomeça a sequência do zero.
  useEffect(() => {
    if (noPrompt) setFase(0)
  }, [noPrompt])

  useEffect(() => {
    if (!noPrompt || !clicado) return
    const timers = [
      window.setTimeout(() => setFase(1), 320),
      window.setTimeout(() => setFase(2), 1400),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [noPrompt, clicado])

  return fase
}

function PecaVisual({ nome, marcada }: { nome: string; marcada: boolean }) {
  return (
    <div
      className={`w-full h-full rounded-lg border flex items-center gap-2.5 px-3.5 text-[15px] transition-[background-color,border-color] duration-300 motion-reduce:transition-none ${
        marcada ? 'border-[#7c3aed] bg-[#f3ebff] text-[#3d2b52]' : 'border-[#d9cfe2] bg-white text-[#4b3b5c]'
      }`}
    >
      <span
        className={`w-4 h-4 rounded-[4px] shrink-0 flex items-center justify-center text-[10px] font-bold transition-colors duration-300 motion-reduce:transition-none ${
          // Sem marca a caixa some: o plano pede que os módulos não escolhidos
          // pareçam disponíveis, não desabilitados. O espaço fica, para o nome
          // não deslocar quando a marca chega.
          marcada ? 'bg-[#7c3aed] text-white' : 'bg-transparent text-transparent'
        }`}
      >
        ✓
      </span>
      {nome}
    </div>
  )
}

export default function Slide15CidadeX({ action }: SlideProps) {
  const step = Math.max(0, ACTIONS.indexOf(action))
  const palco = useRef<HTMLDivElement>(null)
  const escala = useEscala(palco)
  const noPrompt = step === 0
  const { texto, pronto, clicado } = useDigitacao(noPrompt)
  const faseAuto = useCadeia(noPrompt, clicado)
  /** 0 prompt · 1 plataforma · 2 módulos · 3 aplicação preenchida. */
  const fase = noPrompt ? faseAuto : 3

  const temPlataforma = fase >= 1
  const temProdutos = fase >= 2
  const temConteudo = fase >= 3

  return (
    <section className='flex flex-1 min-h-0 flex-col font-ilum text-[#251a34] px-[52px] pt-8 pb-8 max-[900px]:p-5'>
      <header className='shrink-0 mb-5'>
        <h1
          className='text-[clamp(25px,3vw,46px)] font-[750] tracking-[-1.4px] leading-[1.15] animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.1)}
        >
          Cidade X
        </h1>
        <div className='mt-2'>
          <Rotulo>VISÃO FUTURA · COMPOSIÇÃO POR PROMPT</Rotulo>
        </div>
      </header>

      <div ref={palco} className='relative flex-1 min-h-0'>
        <div
          className='absolute left-1/2 top-1/2 origin-center'
          style={{ width: LARGURA, height: ALTURA, transform: `translate(-50%, -50%) scale(${escala})` }}
        >
          {/* ── Coluna esquerda: prompt e catálogo ── */}
          <div className='absolute left-0 top-0 w-[450px] h-[200px] rounded-xl border border-[#c3aadc] bg-[#ffffff9e] p-4'>
            <Rotulo>PROMPT</Rotulo>
            <div className='mt-2.5 h-[92px] rounded-lg border border-[#d9cfe2] bg-white px-3.5 py-2.5 text-[15px] leading-[1.45] text-[#3d2b52]'>
              {texto}
              {noPrompt && !pronto && (
                <span className='inline-block w-[2px] h-[16px] translate-y-[3px] bg-[#7c3aed] animate-dir-caret motion-reduce:animate-none' />
              )}
            </div>
            <div
              className={`mt-3 h-[38px] rounded-lg flex items-center justify-center text-[14px] font-semibold transition-[background-color,color,transform] duration-200 motion-reduce:transition-none ${
                pronto ? 'bg-[#7c3aed] text-white' : 'bg-[#ece5f4] text-[#a595b4]'
              } ${clicado ? 'scale-[0.97]' : 'scale-100'}`}
            >
              Montar aplicação
            </div>
          </div>

          <div className='absolute left-0 top-[224px] w-[450px] h-[296px] rounded-xl border border-[#c3aadc] bg-[#ffffff9e] p-4'>
            <Rotulo>CATÁLOGO</Rotulo>
          </div>

          {CATALOGO.map((p) => (
            <div
              key={p.nome}
              className='absolute'
              style={{ left: p.x, top: p.y, width: LARGURA_PECA, height: ALTURA_PECA }}
            >
              <PecaVisual nome={p.nome} marcada={temProdutos && p.menuY !== undefined} />
            </div>
          ))}

          {/* ── Coluna direita: a prévia da aplicação ── */}
          <div
            className={`absolute left-[510px] top-0 w-[670px] h-[470px] rounded-xl transition-[background-color,border-color] duration-500 motion-reduce:transition-none ${
              temPlataforma
                ? 'border border-[#c3aadc] bg-white'
                : 'border border-dashed border-[#d9cfe2] bg-[#ffffff55]'
            }`}
          />

          {temPlataforma && (
            <>
              <div className='absolute left-[510px] top-0 w-[670px] h-[48px] rounded-t-xl bg-[#f3ebff] border-b border-b-[#e0d7ea] flex items-center px-5 animate-ilum-fade motion-reduce:animate-none'>
                <span className='text-[15px] font-[700] text-[#3d2b52]'>Cidade X</span>
              </div>
              <div className='absolute left-[510px] top-[48px] w-[220px] h-[422px] border-r border-r-[#efe9f5]' />
            </>
          )}

          {/* As cópias que voam: posicionadas no destino, deslocadas até a origem. */}
          {CATALOGO.filter((p) => p.menuY !== undefined).map((p, i) => (
            <div
              key={`voo-${p.nome}`}
              className='absolute transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
              style={{
                left: MENU_X,
                top: p.menuY,
                width: LARGURA_PECA,
                height: ALTURA_PECA,
                opacity: temProdutos ? 1 : 0,
                transform: temProdutos ? 'none' : `translate(${p.x - MENU_X}px, ${p.y - (p.menuY ?? 0)}px)`,
                transitionDelay: `${(temProdutos ? i * 0.22 : 0).toFixed(2)}s`,
              }}
            >
              <PecaVisual nome={p.nome} marcada />
            </div>
          ))}

          {/* Conteúdo da aplicação: Mapas e o painel do Lens. */}
          {temConteudo && (
            <>
              <div
                className='absolute left-[746px] top-[64px] w-[418px] h-[196px] rounded-lg border border-[#e0d7ea] bg-[#fbf9fd] p-4 animate-ilum-rise motion-reduce:animate-none'
                style={delay(0.1)}
              >
                <Rotulo>MAPAS</Rotulo>
                <div className='mt-4 flex flex-col gap-3'>
                  {TRECHOS.map((t, i) => (
                    <div key={i} className='h-[14px] rounded-full bg-[#efe9f5]'>
                      <div
                        className='h-full rounded-full'
                        style={{ width: `${t.largura * 100}%`, background: t.cor }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className='absolute left-[746px] top-[276px] w-[418px] h-[178px] rounded-lg border border-[#e0d7ea] bg-[#fbf9fd] p-4 animate-ilum-rise motion-reduce:animate-none'
                style={delay(0.22)}
              >
                <Rotulo>LENS · BI</Rotulo>
                <span className='block text-[15px] font-[700] text-[#3d2b52] mt-1.5'>
                  Qualidade do pavimento
                </span>
                <div className='mt-3 flex flex-col gap-2'>
                  {CATEGORIAS.map((c) => (
                    <div key={c.nome} className='flex items-center gap-3'>
                      <span className='w-[54px] shrink-0 text-[12px] text-[#6b597b]'>{c.nome}</span>
                      <div className='flex-1 h-[10px] rounded-full bg-[#efe9f5]'>
                        <div
                          className='h-full rounded-full'
                          style={{ width: `${c.valor * 100}%`, background: c.cor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <span className='block text-[10px] text-[#9a89a9] mt-2.5'>Dados ilustrativos</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
