import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { SlideProps } from '../config'
import { BORDA, MALVA, ROXO, Rotulo, SUAVE, TINTA, TRANSICAO, ponta, type Direcao } from './diagrama'
import { COR, Pagina, SaidaDaTela } from './ui'

export const ACTIONS = ['O Builder', 'O pedido', 'O banco', 'A conferência', 'A aplicação']

const LEGENDAS = [
  'O Builder prepara os dados e o código base de cada projeto.',
  'O projeto define o contrato, o território, o período, os bancos e os serviços.',
  'O Builder prepara os bancos e carrega o histórico escolhido, lendo o Yoda uma vez.',
  'A carga é conferida; com os destinos validados, a publicação dos serviços é liberada.',
  'A Factory gera o código e o Ilum publica no GitHub. Automatizar o deploy é o próximo passo do Builder.',
]

function Foco({ passo, desde, children }: { passo: number; desde: number; children: ReactNode }) {
  return <motion.g initial={false} animate={{ opacity: passo >= desde ? 1 : 0.22 }} transition={TRANSICAO}>{children}</motion.g>
}

function Seta({ d, x, y, direcao = 'direita', desde, passo, tracejada = false }: {
  d: string; x: number; y: number; direcao?: Direcao; desde: number; passo: number; tracejada?: boolean
}) {
  const reduzido = useReducedMotion()
  const acesa = passo >= desde
  return (
    <g>
      <motion.path d={d} fill='none' strokeDasharray={tracejada ? '5 5' : undefined} initial={false}
        animate={{ stroke: acesa ? MALVA : BORDA, strokeWidth: acesa ? 2.2 : 1.5 }} transition={TRANSICAO} />
      <motion.polygon points={ponta(x, y, direcao)} initial={false} animate={{ fill: acesa ? MALVA : BORDA }} transition={TRANSICAO} />
      {passo === desde && !tracejada && !reduzido && [0, 0.5].map(fase => (
        <circle key={fase} r={3.5} fill={ROXO}><animateMotion dur='2s' begin={`-${fase * 2}s`} repeatCount='indefinite' path={d} /></circle>
      ))}
    </g>
  )
}

function Etapa({ x, y, w = 200, h = 110, numero, titulo, linhas }: {
  x: number; y: number; w?: number; h?: number; numero?: string; titulo: string; linhas: string[]
}) {
  return <g>
    <rect x={x} y={y} width={w} height={h} fill='#fff' stroke={BORDA} />
    {numero && <Rotulo x={x + 16} y={y + 24} cor={MALVA}>{numero}</Rotulo>}
    <text x={x + 16} y={y + (numero ? 48 : 30)} fontSize={16} fontWeight={750} fill={ROXO}>{titulo}</text>
    {linhas.map((linha, i) => <text key={linha} x={x + 16} y={y + (numero ? 70 : 54) + i * 18} fontSize={12} fill={SUAVE}>{linha}</text>)}
  </g>
}

/** As etapas reais de provision_project e publish_services, sem sugerir deploy pelo Ilum. */
export default function Slide02FluxoBuilder({ action, active = true }: SlideProps) {
  const passo = Math.max(0, ACTIONS.indexOf(action))
  const bloco = useRef<SVGRectElement>(null)
  const reduzido = useReducedMotion()
  return (
    <Pagina n={3} eyebrow='Builder' titulo='Como o Builder prepara cada projeto' corpo=''>
      <svg viewBox='0 0 1280 580' preserveAspectRatio='xMidYMid meet' className='flex-1 min-h-0 w-full h-full'
        role='img' aria-label='Configuração do projeto, Builder com preparo da estrutura, carga do Yoda nos Grogus PostgreSQL e Oracle, conferência e publicação do código gerado pela Backend Factory no GitHub. Automatizar o deploy é o próximo passo do Builder.'
        style={{ fontFamily: 'inherit', overflow: 'hidden' }}>
        {/* As dependências ficam fora da fronteira do Builder. */}
        <rect x={265} y={35} width={770} height={465} fill={COR.fundo} stroke={BORDA} />
        <rect ref={bloco} x={265} y={35} width={770} height={80} fill={ROXO} />
        <Rotulo x={290} y={64} cor='#ffffffb0'>ILUM</Rotulo>
        <text x={290} y={96} fontSize={28} fontWeight={800} fill='#fff'>Builder</text>
        <text x={1008} y={84} textAnchor='end' fontSize={12} fill='#ffffffb0'>Execução · Airflow</text>

        <Seta d='M235 235 H292' x={292} y={235} desde={1} passo={passo} />
        <Seta d='M235 90 H245 V150 H635 V177' x={635} y={177} direcao='baixo' desde={2} passo={passo} />
        <Seta d='M480 235 H532' x={532} y={235} desde={2} passo={passo} />
        <Seta d='M635 290 V312' x={635} y={312} direcao='baixo' desde={2} passo={passo} />
        <Seta d='M735 370 H768 V235 H797' x={797} y={235} desde={3} passo={passo} />
        <Seta d='M900 290 V347' x={900} y={347} direcao='baixo' desde={4} passo={passo} />
        <Seta d='M235 470 H900 V453' x={900} y={453} direcao='cima' desde={4} passo={passo} />
        <Seta d='M1000 402 H1057' x={1057} y={402} desde={4} passo={passo} />
        <Seta d='M1160 450 V492' x={1160} y={492} direcao='baixo' desde={4} passo={passo} tracejada />

        <Foco passo={passo} desde={1}>
          <Etapa x={20} y={185} w={215} h={180} titulo='O projeto escolhe' linhas={['Contrato e frota', 'Território e período', 'PostgreSQL / Oracle', 'Módulos e serviços']} />
          <Rotulo x={20} y={397}>CONFIGURAÇÃO DO PROJETO</Rotulo>
        </Foco>
        <Foco passo={passo} desde={2}>
          <Etapa x={20} y={40} w={215} h={100} titulo='Banco Yoda' linhas={['Nosso banco de dados · Ouro', 'Histórico do recorte']} />
          <Etapa x={295} y={180} w={185} numero='01 · ESTRUTURA' titulo='Preparar o banco' linhas={['Tabelas e índices', 'Catálogo de classes']} />
          <Etapa x={535} y={180} numero='02 · HISTÓRICO' titulo='Carregar os dados' linhas={['Malha e contexto', 'Imagens e detecções']} />
          <Etapa x={535} y={315} h={110} titulo='Grogu do projeto' linhas={['PostgreSQL', 'Oracle']} />
        </Foco>
        <Foco passo={passo} desde={3}>
          <Etapa x={800} y={180} numero='03 · CONFERÊNCIA' titulo='Validar os destinos' linhas={['Carga recebida', 'Equivalência entre engines']} />
          <Rotulo x={912} y={324} cor={ROXO}>VALIDADOS</Rotulo>
        </Foco>
        <Foco passo={passo} desde={4}>
          <Etapa x={20} y={420} w={215} h={105} titulo='Backend Factory' linhas={['Código padrão dos serviços', 'Jobs e API']} />
          <Etapa x={800} y={350} h={100} numero='04 · APLICAÇÃO' titulo='Publicar o código' linhas={['Serviços escolhidos']} />
          <Etapa x={1060} y={350} h={100} titulo='GitHub' linhas={['Repositório do projeto', 'Código base do Back']} />
          <rect x={1060} y={495} width={200} height={60} fill='#fff' stroke={MALVA} strokeDasharray='5 5' />
          <text x={1076} y={520} fontSize={15} fontWeight={700} fill={TINTA}>Deploy</text>
          <text x={1076} y={541} fontSize={12} fill={SUAVE}>Próximo passo do Builder</text>
        </Foco>
      </svg>
      <p key={passo} className='shrink-0 text-center text-[1.25vw] font-semibold' style={{ color: COR.tinta }}>{LEGENDAS[passo]}</p>
      {!reduzido && active && <SaidaDaTela bloco={bloco} parte='Builder' />}
    </Pagina>
  )
}
