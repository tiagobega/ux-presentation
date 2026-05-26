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

const badgeStyle: Record<string, string> = {
  sd: 'bg-green-800/[0.07] text-green-700 border border-green-700/[0.2]',
  sp: 'bg-yellow-700/[0.07] text-yellow-700 border border-yellow-700/[0.2]',
  sn: 'bg-red-700/[0.07] text-red-700 border border-red-700/[0.2]',
}

const actTag = "font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]"
const actTitle = 'text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3'

const thCls = 'font-mono text-[9px] tracking-[0.14em] text-purple/[0.45] text-left px-[13px] py-[9px] border-b border-text/[0.08] uppercase'
const tdBase = 'px-[13px] py-[9px] border-b border-text/[0.05] align-top font-light text-[13px]'

export default function Slide06Escopo({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            Plano de ação
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            O que fazer.
            <br />
            <em className="not-italic text-purple">Agora.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            O Fleets está em um ponto de inflexão. A base existe — mas crescer sem design system e
            sem UX estruturado transforma cada módulo novo em dívida. O investimento agora é
            preventivo e estratégico.
          </p>
        </div>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        {action === 'Módulos' && (
          <>
            <div className={actTag}>Situação atual por módulo</div>
            <table className="w-full border-collapse my-5 text-[13px]">
              <thead>
                <tr>
                  <th className={thCls}>Módulo</th>
                  <th className={thCls}>Foco UX</th>
                  <th className={thCls}>Status</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((m) => (
                  <tr key={m.name}>
                    <td className={`${tdBase} text-text/82 font-medium`}>{m.name}</td>
                    <td className={`${tdBase} text-text/55`}>{m.focus}</td>
                    <td className={tdBase}>
                      <span className={`font-mono text-[10px] px-2 py-[3px] rounded-full whitespace-nowrap ${badgeStyle[m.badge]}`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {action === 'Entrega' && (
          <>
            <div className={actTag}>Como entregar</div>
            <h2 className={actTitle}>Sequência de entrega.</h2>
            <div className="my-5">
              {timeline.map((item) => (
                <div key={item.step} className="flex gap-[18px] py-[14px] border-b border-text/[0.05]">
                  <div className="w-7 h-7 rounded-full bg-purple/[0.08] border border-purple/[0.2] flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-purple/60">
                    {item.step}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-text mb-1">
                      {item.title}
                      <span className="font-mono text-[9px] px-[7px] py-[2px] rounded-full border border-purple/[0.2] text-purple/45 ml-[7px]">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[13px] font-light text-text/55 leading-[1.65]">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Próximo Passo' && (
          <div className="relative mt-9 p-[30px] border border-purple/[0.2] bg-purple/[0.04] overflow-hidden">
            <div
              className="absolute w-[280px] h-[280px] rounded-full top-[-80px] right-[-60px] pointer-events-none blur-[48px]"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
            />
            <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[11px] uppercase relative z-[1]">
              Próximo passo
            </div>
            <div className="text-[23px] font-bold text-text mb-[9px] tracking-[-0.02em] relative z-[1]">
              Contratar o especialista UX.
            </div>
            <div className="text-[14px] font-light text-text/55 leading-[1.75] max-w-[520px] relative z-[1]">
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
