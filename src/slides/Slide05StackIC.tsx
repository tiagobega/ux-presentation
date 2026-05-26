import { Fragment } from 'react'
import type { SlideProps } from './config'

const mainStack = [
  {
    color: '#e85151',
    gradient: 'linear-gradient(135deg, #e85151, #c0392b)',
    layer: 'Ingestão · Camada 1',
    name: 'IC Fleets',
    desc: 'Plataforma e gestão de frota de dispositivos. Ponto de entrada de todos os dados — e onde o UX do Fleets vive.',
  },
  {
    color: '#7c6ef5',
    gradient: 'linear-gradient(135deg, #7c6ef5, #5b4fd4)',
    layer: 'Processamento · Camada 2',
    name: 'IC Vision',
    desc: 'Processamento por IA com camadas e níveis de acordo com a finalidade dos dados.',
  },
  {
    color: '#b061e8',
    gradient: 'linear-gradient(135deg, #b061e8, #8b3fc0)',
    layer: 'Qualidade · Camada 3',
    name: 'IC Classify',
    desc: 'SGC — Garantia de qualidade humana nas classificações. O humano no loop.',
  },
  {
    color: '#d4a53a',
    gradient: 'linear-gradient(135deg, #d4a53a, #b8872a)',
    layer: 'Acesso · Camada 4',
    name: 'IC Query',
    desc: 'LLM — dados humanizados via chat com renderização em mapa. O dado vira conversa.',
  },
]

const sideStack = [
  {
    color: '#3ab8d4',
    gradient: 'linear-gradient(135deg, #3ab8d4, #1a8fa8)',
    layer: 'Interface',
    name: 'IC Face',
    desc: 'Biblioteca de micro front-ends. Tudo que o usuário vê é Face.',
  },
  {
    color: '#3a9ed4',
    gradient: 'linear-gradient(135deg, #3a9ed4, #1a76a8)',
    layer: 'Inovação',
    name: 'IC Labs',
    desc: 'Time criativo de P&D. Onde as próximas camadas nascem.',
  },
]

const actTag = "font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]"
const actTitle = 'text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3'

function StackNode({ node }: { node: typeof mainStack[0] }) {
  return (
    <div className="group relative px-5 py-4 border border-black/[0.07] overflow-hidden cursor-default transition-transform hover:translate-x-1">
      <div
        className="absolute inset-0 opacity-[0.06] transition-opacity group-hover:opacity-[0.12]"
        style={{ background: node.gradient }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: node.color }} />
      <div className="relative z-[1]">
        <div className="font-mono text-[9px] tracking-[0.14em] text-black/[0.38] mb-[3px] uppercase flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full inline-block flex-shrink-0" style={{ background: node.color }} />
          {node.layer}
        </div>
        <div className="text-[16px] font-semibold text-black/85 mb-[3px]">{node.name}</div>
        <div className="text-[12px] font-light text-black/48 leading-[1.65]">{node.desc}</div>
      </div>
    </div>
  )
}

export default function Slide05StackIC({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            Branding interno
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            A stack como
            <br />
            <em className="not-italic text-purple">linguagem.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            Nomear e colorir cada frente de trabalho cria uma linguagem compartilhada.
            Internamente, alinha o time. Externamente, demonstra que a Intelicity não é um produto
            — é um ecossistema.
          </p>
        </div>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        {action === 'Pipeline' && (
          <>
            <div className={actTag}>O fluxo de valor</div>
            <h2 className={actTitle}>
              Cada produto IC é
              <br />
              uma camada da cadeia.
            </h2>
            <div className="flex flex-col gap-[2px] mt-7">
              {mainStack.map((node, i) => (
                <Fragment key={node.name}>
                  <StackNode node={node} />
                  {i < mainStack.length - 1 && (
                    <div className="font-mono text-[11px] text-purple/[0.22] py-[2px] pl-6">↓</div>
                  )}
                </Fragment>
              ))}
            </div>
          </>
        )}

        {action === 'Produtos' && (
          <>
            <div className={actTag}>Produtos transversais</div>
            <h2 className={actTitle}>
              Além do pipeline,
              <br />a camada que o usuário vê.
            </h2>
            <div className="grid grid-cols-2 gap-[2px] mt-[2px]">
              {sideStack.map((node) => (
                <StackNode key={node.name} node={node} />
              ))}
            </div>
            <div className="mt-[2px]">
              <StackNode
                node={{
                  color: '#3ad47e',
                  gradient: 'linear-gradient(135deg, #3ad47e, #1aa85a)',
                  layer: 'Comunicação',
                  name: 'IC News',
                  desc: 'Comunicação interna sobre releases, novos projetos, feedback e novidades. A voz da stack.',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
