import type { SlideProps } from './config'

const modules = [
  { name: 'Design System', focus: 'Tokens, componentes, padrões de interação — a fundação de tudo', badge: 'sn', status: 'Crítico · primeiro' },
  { name: 'Config · CRUDs', focus: 'Revisar consistência com design system', badge: 'sd', status: 'Pronto · revisar' },
  { name: 'Users & Roles', focus: 'Fluxo completo do Motorista ainda não projetado', badge: 'sp', status: 'Parcial' },
  { name: 'Person', focus: 'Dispositivos, centro de custo, histórico de pagamentos, metas', badge: 'sp', status: 'Parcial' },
  { name: 'Vehicles', focus: 'Mapa com camadas por dispositivo, heartbeat, pins', badge: 'sn', status: 'Mapa pendente' },
  { name: 'Devices', focus: 'Fichas específicas Geolux, GeoGuard, Camera · chip 5G · streaming', badge: 'sp', status: 'Parcial' },
  { name: 'Contratos', focus: 'Filtros por tipo, status e cidade', badge: 'sn', status: 'Pendente' },
  { name: 'Pagamentos', focus: 'Histórico, exportação Excel e PDF', badge: 'sn', status: 'Pendente' },
  { name: 'Dashboards', focus: "Gráficos temporais, TV 55'', controle remoto, microfone", badge: 'sn', status: 'Alta prioridade' },
  { name: 'Motorista', focus: 'Produto end-to-end: landing, onboarding, área logada', badge: 'sn', status: 'Do zero' },
  { name: 'Funcionalidades Gerais', focus: 'Wizard de instalação, QR code, alertas, LGPD', badge: 'sn', status: 'Pendente' },
]

const timeline = [
  {
    step: '1',
    title: 'Design System',
    tag: 'fase 0 · fundação',
    body: 'Auditoria do que existe, tokens de cor e tipografia, biblioteca de componentes, padrões de interação. Sem isso, tudo que vier depois será inconsistente.',
  },
  {
    step: '2',
    title: 'Descoberta e Pesquisa',
    tag: 'paralelo',
    body: 'Entrevistas com Admin, Gerente, Operador e Motorista. Personas e journey maps que informam cada decisão de design ao longo do projeto.',
  },
  {
    step: '3',
    title: 'Protótipo Figma navegável',
    tag: 'entrega contínua',
    body: 'Telas completas por módulo com navegação entre fluxos. Base para validação com o cliente e alinhamento interno antes de desenvolver.',
  },
  {
    step: '4',
    title: 'Handoff para dev',
    tag: 'por módulo',
    body: 'Especificações com medidas, estados, variantes e comportamentos. Elimina ambiguidade e reduz ciclos de revisão entre design e desenvolvimento.',
  },
]

export default function Slide06Escopo({ step }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">Plano de ação</div>
          <h1 className="hero-title">
            O que fazer.
            <br />
            <em>Agora.</em>
          </h1>
          <p className="hero-sub">
            O Fleets está em um ponto de inflexão. A base existe — mas crescer sem design system e
            sem UX estruturado transforma cada módulo novo em dívida. O investimento agora é
            preventivo e estratégico.
          </p>
        </div>
      </div>

      <div key={step} className="s-content">
        {step === 0 && (
          <>
            <div className="act-tag">Situação atual por módulo</div>
            <table className="scope-table">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Foco UX</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.focus}</td>
                    <td>
                      <span className={`sb ${m.badge}`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {step === 1 && (
          <>
            <div className="act-tag">Como entregar</div>
            <h2 className="act-title">Sequência de entrega.</h2>
            <div className="timeline">
              {timeline.map((item) => (
                <div key={item.step} className="tl-item">
                  <div className="tl-marker">{item.step}</div>
                  <div>
                    <div className="tl-title">
                      {item.title}
                      <span className="phase-tag">{item.tag}</span>
                    </div>
                    <div className="tl-body">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="cta">
            <div className="cta-tag">Próximo passo</div>
            <div className="cta-title">Contratar o especialista UX.</div>
            <div className="cta-body">
              Não para deixar a plataforma bonita. Para garantir que os dados que a Intelicity
              captura com tanto esforço cheguem às pessoas certas, no formato certo — e que novas
              cidades consigam entender, confiar e fechar mais rápido.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
