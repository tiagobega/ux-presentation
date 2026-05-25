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

export default function Slide05StackIC({ action }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">Branding interno</div>
          <h1 className="hero-title">
            A stack como
            <br />
            <em>linguagem.</em>
          </h1>
          <p className="hero-sub">
            Nomear e colorir cada frente de trabalho cria uma linguagem compartilhada.
            Internamente, alinha o time. Externamente, demonstra que a Intelicity não é um produto
            — é um ecossistema.
          </p>
        </div>
      </div>

      <div key={action} className="s-content">
        {action === 'Pipeline' && (
          <>
            <div className="act-tag">O fluxo de valor</div>
            <h2 className="act-title">
              Cada produto IC é
              <br />
              uma camada da cadeia.
            </h2>
            <div className="stack-flow">
              {mainStack.map((node, i) => (
                <Fragment key={node.name}>
                  <div className="sf-node">
                    <div className="sf-bg" style={{ background: node.gradient }} />
                    <div className="sf-stripe" style={{ background: node.color }} />
                    <div className="sf-inner">
                      <div className="sf-label">
                        <span className="sf-dot" style={{ background: node.color }} />
                        {node.layer}
                      </div>
                      <div className="sf-name">{node.name}</div>
                      <div className="sf-desc">{node.desc}</div>
                    </div>
                  </div>
                  {i < mainStack.length - 1 && <div className="sf-arrow">↓</div>}
                </Fragment>
              ))}
            </div>
          </>
        )}

        {action === 'Produtos' && (
          <>
            <div className="act-tag">Produtos transversais</div>
            <h2 className="act-title">
              Além do pipeline,
              <br />a camada que o usuário vê.
            </h2>
            <div className="two-col">
              {sideStack.map((node) => (
                <div key={node.name} className="sf-node">
                  <div className="sf-bg" style={{ background: node.gradient }} />
                  <div className="sf-stripe" style={{ background: node.color }} />
                  <div className="sf-inner">
                    <div className="sf-label">
                      <span className="sf-dot" style={{ background: node.color }} />
                      {node.layer}
                    </div>
                    <div className="sf-name">{node.name}</div>
                    <div className="sf-desc">{node.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sf-node" style={{ marginTop: 2 }}>
              <div
                className="sf-bg"
                style={{ background: 'linear-gradient(135deg, #3ad47e, #1aa85a)' }}
              />
              <div className="sf-stripe" style={{ background: '#3ad47e' }} />
              <div className="sf-inner">
                <div className="sf-label">
                  <span className="sf-dot" style={{ background: '#3ad47e' }} />
                  Comunicação
                </div>
                <div className="sf-name">IC News</div>
                <div className="sf-desc">
                  Comunicação interna sobre releases, novos projetos, feedback e novidades. A voz
                  da stack.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
