import { Fragment } from 'react'
import type { SlideProps } from './config'

const layers = [
  {
    accent: 'rgba(237, 233, 246, 0.28)',
    label: 'Fundamento técnico',
    title: 'Dados',
    desc: 'Capturados por dispositivos embarcados em campo. Brutos, contínuos, volumosos. Esse é o nosso diferencial — e não é trivial.',
  },
  {
    accent: 'rgba(237, 233, 246, 0.45)',
    label: 'Inteligência',
    title: 'Contexto',
    desc: 'Dados processados por IA e validados por humanos. Padrões reconhecidos, anomalias identificadas, qualidade garantida.',
  },
  {
    accent: 'rgba(237, 233, 246, 0.62)',
    label: 'Entrega',
    title: 'Informação',
    desc: 'Contexto organizado e entregue ao perfil certo, no formato certo. O dado vira resposta para uma pergunta real.',
  },
  {
    accent: 'rgba(237, 233, 246, 0.82)',
    label: 'Clareza',
    title: 'Decisão',
    desc: 'Informação apresentada com clareza suficiente para gerar ação. Gestores entendem, justificam e comunicam.',
  },
]

export default function Slide01Fundamento({ action }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">Intelicity · Documento Estratégico · 2026</div>
          <h1 className="hero-title">
            Capturar dados
            <br />é o <em>começo.</em>
          </h1>
          <p className="hero-sub">
            A maioria das cidades não tem dados de qualidade sobre o que acontece no seu
            território. A Intelicity resolveu esse problema. Agora o desafio é o próximo: fazer
            esses dados chegarem às pessoas certas, no formato certo, no momento certo.
          </p>
        </div>
      </div>

      <div className="s-content">
        <div className="act-tag">O que construímos</div>
        <h2 className="act-title">
          Uma cadeia completa,
          <br />
          da captura à execução.
        </h2>

        <div className="layers has-active">
          {layers.map((layer) => (
            <Fragment key={layer.title}>
              <div className={`layer${action === layer.title ? ' active' : ''}`}>
                <div className="layer-accent" style={{ background: layer.accent }} />
                <div className="layer-body">
                  <div className="layer-label">{layer.label}</div>
                  <div className="layer-title">{layer.title}</div>
                  <div className="layer-desc">{layer.desc}</div>
                </div>
              </div>
              <div className="conn">
                <span>↓</span>
              </div>
            </Fragment>
          ))}
          <div className={`layer conclusion${action === 'Execução' ? ' active' : ''}`}>
            <div className="layer-accent" />
            <div className="layer-body">
              <div className="layer-label">Destino</div>
              <div className="layer-title">Execução.</div>
              <div className="layer-desc">
                O objetivo final de qualquer dado coletado. Cidades têm problemas que não podem
                ignorar — a Intelicity garante que elas tenham o que precisam para resolvê-los.
              </div>
            </div>
          </div>
        </div>

        <div className="ic-operates">
          <div className="ic-dot" />
          INTELICITY OPERA EM TODAS AS CAMADAS
        </div>
      </div>
    </div>
  )
}
