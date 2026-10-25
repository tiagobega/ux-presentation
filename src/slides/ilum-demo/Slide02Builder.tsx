import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '../config'
import { BORDA, LILAS, MALVA, Pilula, ROXO, Rotulo, SUAVE, TINTA, TRANSICAO, aparece, caixa, ponta } from './diagrama'
import { Pagina, SaidaDaTela } from './ui'

/**
 * Slide 2 — O Builder monta o projeto. Abre a parte 1 do deck.
 *
 * **Entra por corte, de dentro do Builder.** O slide 1 termina com a tela
 * inteira em ameixa (`TelaParte`); este abre sobre o mesmo quadro e o
 * encolhe até o bloco do Builder, à esquerda do projeto. Para isso o deck
 * marca este slide com `corte` (sem pan) e o alvo do encolhimento é medido
 * no DOM: é o retângulo do bloco no SVG, onde quer que a câmera o ponha.
 *
 * Parte do mesmo cartão fechado com que o slide 1 termina (Uberlândia, com
 * Banco · Back · Front) e o faz crescer, uma peça por passo:
 *
 * 1. o projeto, fechado, com o Builder ao lado;
 * 2. **o banco**: a câmera abre, o cartão cresce e o Banco vira o Grogu, com
 *    as três classes subindo da origem ao mapa, uma frase curta cada;
 * 3. **o back**: saem os três serviços que o Builder gerou (dois jobs e a
 *    API), cada job ligado à classe que ele monta;
 * 4. **o front**: o código base já sai do Builder; subir o front sozinho é o
 *    que vem em breve, por isso a caixa é tracejada.
 *
 * Depois deste slide o apresentador mostra o Airflow com as DAGs que já
 * rodaram: isso é fala e tela à parte, nada aqui anuncia.
 *
 * As pastilhas crescem até virar as caixas — nada é trocado por réplica. O
 * Back e o Front esperam no topo da sua coluna, pequenos, até a vez deles:
 * assim nenhuma peça cresce por cima de outra.
 */

export const ACTIONS = ['O projeto', 'O banco', 'O back', 'O front']

/** A câmera: fechada no projeto no passo 1, o quadro inteiro depois. */
const CAMERA = ['0 150 760 240', '0 0 1200 560']

const CARTAO = {
  fechado: { x: 220, y: 210, w: 480, h: 112 },
  aberto: { x: 220, y: 20, w: 960, h: 520 },
}

type Retangulo = { x: number; y: number; w: number; h: number }

/**
 * As três peças e os seus três estados: fechada (no cartão pequeno),
 * esperando (no topo da sua coluna) e aberta. `abre` é o passo em que ela
 * cresce.
 */
const PECAS: { nome: string; abre: number; fechado: Retangulo; esperando: Retangulo; aberto: Retangulo; sub: string }[] = [
  {
    nome: 'Banco',
    abre: 1,
    fechado: { x: 244, y: 272, w: 136, h: 36 },
    esperando: { x: 244, y: 104, w: 136, h: 36 },
    aberto: { x: 244, y: 104, w: 360, h: 400 },
    sub: 'Grogu',
  },
  {
    nome: 'Back',
    abre: 2,
    fechado: { x: 394, y: 272, w: 136, h: 36 },
    esperando: { x: 630, y: 104, w: 136, h: 36 },
    aberto: { x: 630, y: 104, w: 320, h: 400 },
    sub: 'gerado pela Backend Factory',
  },
  {
    nome: 'Front',
    abre: 3,
    fechado: { x: 544, y: 272, w: 136, h: 36 },
    esperando: { x: 976, y: 104, w: 136, h: 36 },
    aberto: { x: 976, y: 104, w: 180, h: 400 },
    sub: 'Frontend Factory',
  },
]

/**
 * As classes do Grogu, de baixo para cima: o dado sobe da origem ao mapa.
 * Uma frase curta cada; a definição técnica (ADR-0043) é fala, se perguntarem.
 */
const CLASSES = [
  { nome: 'Bronze', frase: 'pronto para a apresentação ao cliente', y: 170, fundo: '#f6e3d4', traco: '#c98a5a' },
  { nome: 'Prata', frase: 'o dado agrupado', y: 250, fundo: '#eef0f4', traco: '#9aa3b2' },
  { nome: 'Ouro', frase: 'o dado como veio', y: 330, fundo: '#fbf0cf', traco: '#caa233' },
]

/**
 * Os três serviços que o Builder gera no build do back. Cada job fica na
 * altura da classe que ele monta, e a seta diz isso sem legenda.
 */
const SERVICOS = [
  { nome: 'Camada', frase: 'rotina agendada · gera o Bronze', y: 170, liga: 'classe' },
  { nome: 'Agrupamento', frase: 'rotina agendada · gera a Prata', y: 250, liga: 'classe' },
  { nome: 'API', frase: 'entrega os dados ao front', y: 330, liga: 'front' },
] as const

const ALTURA = 64

/** Pontos do mapa ilustrativo do front; a posição não é dado real. */
const PONTOS_MAPA: [number, number][] = [
  ...Array.from({ length: 9 }, (_, i) => [1004 + i * 14, 184 + i * 14] as [number, number]),
  ...Array.from({ length: 8 }, (_, i) => [1124 - i * 13, 180 + i * 17] as [number, number]),
]

function Peca({ p, passo }: { p: (typeof PECAS)[number]; passo: number }) {
  const estado = passo === 0 ? p.fechado : passo >= p.abre ? p.aberto : p.esperando
  const aberta = passo >= p.abre
  const front = p.nome === 'Front'
  return (
    <g>
      <motion.rect
        initial={false}
        animate={{
          ...caixa(estado),
          fill: aberta && !front ? LILAS : '#fff',
          stroke: aberta ? (front ? MALVA : '#c3aadc') : BORDA,
        }}
        strokeDasharray={front && aberta ? '6 5' : undefined}
        transition={TRANSICAO}
      />
      <motion.text
        fontWeight={aberta ? 800 : 700}
        fill={aberta && !front ? ROXO : TINTA}
        initial={false}
        animate={{
          x: estado.x + (aberta ? 20 : 14),
          y: estado.y + (aberta ? 34 : 23),
          fontSize: aberta ? 20 : 13,
        }}
        transition={TRANSICAO}
      >
        {p.nome}
      </motion.text>
      <motion.text x={p.aberto.x + 20} y={p.aberto.y + 56} fontSize={12.5} fill={SUAVE} {...aparece(aberta, 0.4)}>
        {p.sub}
      </motion.text>
    </g>
  )
}

export default function Slide02Builder({ action }: SlideProps) {
  const passo = Math.max(0, ACTIONS.indexOf(action))
  const reduzido = useReducedMotion()
  const bloco = useRef<SVGRectElement>(null)
  const aberto = passo >= 1
  const c = aberto ? CARTAO.aberto : CARTAO.fechado

  return (
    <Pagina n={2} eyebrow='Builder' titulo='O que o Builder monta' corpo=''>

      <motion.svg
        className='flex-1 min-h-0 w-full h-full'
        initial={false}
        animate={{ viewBox: CAMERA[aberto ? 1 : 0] }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        viewBox={CAMERA[0]}
        preserveAspectRatio='xMidYMid meet'
        role='img'
        aria-label='O Builder monta o projeto de Uberlândia: o banco Grogu, com as classes Ouro (o dado como veio), Prata (o dado agrupado) e Bronze (pronto para a apresentação ao cliente); o back, com os jobs de agrupamento e de camada e a API; e o front, cujo código base o Builder já gera e que ele vai subir sozinho em breve.'
        style={{ fontFamily: 'inherit', overflow: 'hidden' }}
      >
        {/* O Builder, de onde tudo sai. */}
        <g>
          <rect ref={bloco} x={20} y={200} width={150} height={130} fill={ROXO} />
          <Rotulo x={40} y={236} cor='#ffffffb0'>
            ILUM
          </Rotulo>
          <text x={40} y={266} fontSize={24} fontWeight={800} letterSpacing={-0.4} fill='#fff'>
            Builder
          </text>
          <line x1={170} y1={265} x2={212} y2={265} stroke={ROXO} strokeWidth={2.4} />
          <polygon points={ponta(219, 265, 'direita', 8)} fill={ROXO} />
          {!reduzido && (
            <circle r={4} fill={ROXO}>
              <animateMotion dur='1.4s' repeatCount='indefinite' path='M172 265 H214' />
            </circle>
          )}
        </g>

        {/* O cartão do projeto. */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.1 }}>
          <motion.rect fill='#fff' initial={false} animate={{ ...caixa(c), stroke: aberto ? ROXO : BORDA }} transition={TRANSICAO} />
          <motion.g initial={false} animate={{ y: aberto ? -186 : 0 }} transition={TRANSICAO}>
            <Rotulo x={244} y={238} cor={ROXO}>
              PROJETO DA DEMO
            </Rotulo>
            <text x={244} y={262} fontSize={18} fontWeight={750} letterSpacing={-0.5} fill={TINTA}>
              Uberlândia · agosto de 2026
            </text>
          </motion.g>
          {PECAS.map((p) => (
            <Peca key={p.nome} p={p} passo={passo} />
          ))}
        </motion.g>

        {/* O banco: as classes sobem da origem ao mapa, uma por vez. */}
        {CLASSES.map((k, i) => (
          <motion.g key={k.nome} {...aparece(passo >= 1, 0.9 + (CLASSES.length - 1 - i) * 0.22)}>
            <rect x={284} y={k.y} width={296} height={ALTURA} fill={k.fundo} stroke={k.traco} />
            <text x={304} y={k.y + 28} fontSize={16} fontWeight={750} fill={TINTA}>
              {k.nome}
            </text>
            <text x={304} y={k.y + 48} fontSize={13} fill={SUAVE}>
              {k.frase}
            </text>
          </motion.g>
        ))}
        <motion.g {...aparece(passo >= 1, 1.5)}>
          <line x1={262} y1={390} x2={262} y2={180} stroke='#b9a3d6' strokeWidth={1.6} />
          <polygon points={ponta(262, 172, 'cima', 6)} fill='#b9a3d6' />
          <Rotulo x={268} y={436}>
            POSTGRESQL · ORACLE
          </Rotulo>
          <Pilula x={268} y={460} texto='FEITO PELO BUILDER' cheia />
        </motion.g>

        {/* O back: os três serviços, e cada job ligado à classe que monta. */}
        {SERVICOS.map((s, i) => (
          <motion.g key={s.nome} {...aparece(passo >= 2, 0.6 + i * 0.2)}>
            <rect x={654} y={s.y} width={272} height={ALTURA} fill='#fff' stroke='#c3aadc' />
            <text x={674} y={s.y + 28} fontSize={16} fontWeight={750} fill={ROXO}>
              {s.nome}
            </text>
            <text x={674} y={s.y + 48} fontSize={12.5} fill={SUAVE}>
              {s.frase}
            </text>
            {s.liga === 'classe' && (
              <>
                <line x1={652} y1={s.y + 32} x2={590} y2={s.y + 32} stroke={ROXO} strokeWidth={1.8} />
                <polygon points={ponta(583, s.y + 32, 'esquerda', 7)} fill={ROXO} />
              </>
            )}
          </motion.g>
        ))}
        <motion.g {...aparece(passo >= 2, 1.3)}>
          <Pilula x={654} y={460} texto='FEITO PELO BUILDER' cheia />
        </motion.g>

        {/* O front: a vaga que o Builder também vai preencher. */}
        <motion.g {...aparece(passo >= 3, 0.5)}>
          <line x1={928} y1={362} x2={968} y2={362} stroke={MALVA} strokeWidth={1.6} strokeDasharray='4 3' />
          <polygon points={ponta(975, 362, 'direita', 6)} fill={MALVA} />
          <rect x={996} y={172} width={140} height={140} fill={LILAS} opacity={0.6} />
          {PONTOS_MAPA.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={2.6} fill={ROXO} opacity={0.18 + (i % 3) * 0.12} />
          ))}
          <Pilula x={996} y={334} texto='EM BREVE' tracejada />
          <text x={996} y={384} fontSize={13} fill={TINTA}>
            Código base gerado;
          </text>
          <text x={996} y={402} fontSize={13} fill={TINTA}>
            o Builder vai subir
          </text>
          <text x={996} y={420} fontSize={13} fill={TINTA}>
            o front sozinho
          </text>
        </motion.g>

      </motion.svg>

      {!reduzido && <SaidaDaTela bloco={bloco} parte='Builder' />}
    </Pagina>
  )
}
