import type { ReactNode } from 'react'
import type { Deck, SlideProps } from '../config'
import './ilum.css'

const problems = [
  ['Visão geral', 'Ambientes e integrações', 'Aplicações, bancos e serviços distribuídos. O desenho reúne os caminhos relatados; não é um inventário exaustivo.'],
  ['Ingestão', '01 · Ingestão e processamento', 'Node-RED, triggers e cron-jobs sem padrão comum de versionamento, documentação e monitoramento. Manutenção dependente de conhecimento localizado.'],
  ['Ambientes', '02 · Armazenamento em dois ambientes', 'MinIO interno e S3 atendem a mesma solução. Duas estruturas para configurar e manter, com finalidade e responsabilidades a esclarecer.'],
  ['Dados', '03 · Carga sobre a base central', 'Rotinas e consumidores externos acessam o Yoda. A carga por consumidor e o impacto sobre a infraestrutura não estão claros.'],
  ['Aplicações', '04 · Aplicações e identidade', 'APEX condiciona o uso do Oracle. Gates, APEX e mecanismos próprios exigem adaptações para integrar produtos às plataformas.'],
  ['LLM', '05 · Integração do LLM', 'Movimentações entre Yoda e Supabase, alterações de estrutura e processamento sem uma esteira comum de publicação e rastreabilidade.'],
] as const

function Frame({ title, children, note }: { title: string; children: ReactNode; note?: string }) {
  return <section className="ilum-slide"><h1>{title}</h1><div className="ilum-body">{children}</div>{note && <footer>{note}</footer>}</section>
}
function Box({ x, y, w = 175, title, sub, active = true }: { x: number; y: number; w?: number; title: string; sub?: string; active?: boolean }) {
  return <g className={active ? 'diagram-node active' : 'diagram-node'}><rect x={x} y={y} width={w} height={65} rx={8}/><text x={x + 12} y={y + 26}>{title}</text>{sub && <text className="sub" x={x + 12} y={y + 47}>{sub}</text>}</g>
}
function Current({ action }: SlideProps) {
  const step = Math.max(0, problems.findIndex(p => p[0] === action))
  const focus = (...s: number[]) => step === 0 || s.includes(step)
  return <Frame title="Arquitetura atual e problemas" note="Cenário relatado pela equipe · conexões esquemáticas · R$ 150 mil/ano de Oracle: custo informado, sem projeção de economia.">
    <div className="ilum-split"><svg viewBox="0 0 850 510" role="img" aria-label="Ambientes e conexões atuais: ingestão, bancos, aplicações, armazenamento e LLM">
      <defs><marker id="ilum-current-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#8b789d"/></marker></defs>
      <g className="zones"><rect x="5" y="5" width="600" height="112"/><rect x="5" y="139" width="600" height="254"/><rect x="624" y="5" width="220" height="388"/><text x="17" y="24">APLICAÇÕES E CLIENTES</text><text x="17" y="159">PROCESSAMENTO E BANCOS</text><text x="636" y="24">OUTROS AMBIENTES</text></g>
      <g className="connections" markerEnd="url(#ilum-current-arrow)"><path d="M95 108 L320 284"/><path d="M290 108 L505 284"/><path d="M500 108 L500 284"/><path d="M500 108 L315 284"/><path d="M95 242 L95 282"/><path d="M182 316 L232 316"/><path d="M182 330 C200 380 445 395 490 348"/><path d="M590 327 C625 327 625 339 645 339"/><path d="M730 307 C825 190 670 140 588 86"/><path d="M727 111 L727 177"/></g>
      <Box x={20} y={42} title="React · APEX / OCI" sub="APIs no APEX" active={focus(4)}/><Box x={215} y={42} title="Power BI · Flutter" sub="Servidor interno" active={focus(3,4)}/><Box x={410} y={42} title="Ambiente cliente" sub="APIs · bancos · cloud" active={focus(3,4)}/>
      <Box x={20} y={177} title="Hardware" sub="Geração de dados" active={focus(1)}/><Box x={20} y={282} title="Node-RED · triggers" sub="Cron-jobs · APIs" active={focus(1,3)}/><Box x={235} y={282} title="OracleDB" sub="Cidades e ambientes" active={focus(4)}/><Box x={425} y={282} title="PostgreSQL · Yoda" sub="Base central" active={focus(1,3,5)}/>
      <Box x={645} y={42} title="MinIO" sub="On-premises" active={focus(2)}/><Box x={645} y={177} title="S3" sub="AWS · imagens" active={focus(2)}/><Box x={645} y={307} title="Supabase · LLM" sub="Dados e processamento" active={focus(5)}/>
      <g className="identity"><rect x="10" y="420" width="830" height="70" rx="8"/><text x="26" y="447">IDENTIDADE</text><text x="26" y="473">Gates / Cognito · login APEX · mecanismos próprios — sem padrão comum de integração</text></g>
    </svg><aside className="ilum-aside" aria-live="polite"><span className="step-number">{String(step).padStart(2, '0')} / 05</span><h2>{problems[step][1]}</h2><p>{problems[step][2]}</p><div className="consequence"><b>Consequências</b><p>Manutenção complexa<br/>Dependência de conhecimento<br/>Controle de acesso e carga<br/>Custo de operação</p></div></aside></div>
  </Frame>
}
const changes = [
  ['Dados e operação', 'Processos versionados e monitorados', 'Mais controle da execução e manutenção'],
  ['Integração', 'Contratos e identidade compartilhados', 'Produtos integrados de forma previsível'],
  ['Plataformas', 'Contexto e estrutura por projeto', 'Equipes evoluem seus projetos dentro dos padrões'],
] as const
function Proposed({ action }: SlideProps) {
  const selected = changes.findIndex(c => c[0] === action)
  return <Frame title="Estrutura proposta — Ilum" note="Iniciativa que reúne os trabalhos do último ano · arquitetura proposta · interfaces e estado de cada componente ainda serão detalhados.">
    <div className="proposal-flow"><div><h2>Fontes</h2><article>Hardware<small>via Fleets</small></article><article>WFM · 156<small>Fontes externas</small></article></div><span className="flow-arrow">→</span><div><h2>Processamento</h2><article>Vision e processadores<small>Capacidades especializadas</small></article><article>Orquestração<small>Coordenação e distribuição</small></article></div><span className="flow-arrow">→</span><div><h2>Dados</h2><article>Yoda<small>Base central protegida</small></article><article>Distribuição controlada<small>Regras de acesso e integridade</small></article></div><span className="flow-arrow">→</span><div><h2>Plataformas</h2><article>Uberlândia · POC<small>Banco · backend · frontend</small></article><article>Outros projetos<small>Estrutura dedicada por contexto</small></article></div></div>
    <div className="shared-band">Identidade e permissões · Monitoramento · Desenvolvimento · Publicação</div>
    <div className="ilum-bottom"><div><h2>Composição das plataformas</h2><p><b>Produtos:</b> capacidades reutilizáveis.</p><p><b>Serviços:</b> funcionalidades específicas da plataforma.</p><p><b>Lens · mapas · APIs:</b> posição e interfaces a detalhar.</p></div><div className="change-list">{changes.map(([label,change,gain],i)=><div key={label} className={selected===i?'selected':''}><b>{change}</b><span>{gain}</span></div>)}</div></div>
  </Frame>
}
const phases = [
 ['1','Diagnóstico','Inventário, riscos e responsabilidades','Núcleo inicial'],
 ['2','Fundação','Padrões de dados, integração e desenvolvimento','Núcleo + especialistas'],
 ['3–4','Validação','POC, integração e operação','Frentes técnicas'],
 ['5','Reutilização','Aplicação em outro contexto','Equipes participantes'],
 ['6','Consolidação','Revisão dos padrões e expansão','Equipes dos projetos'],
]
function Plan({action}:SlideProps){return <Frame title="Planejamento macro de execução" note="Atividades conduzidas em paralelo aos contratos · horizonte proposto de seis meses · datas e capacidade ainda a validar.">
 <div className="plan-status"><div><b>Início real</b><span>A definir com a equipe</span></div><div><b>Situação atual</b><span>Iniciativa em andamento; entregas a registrar</span></div><div><b>Término estimado</b><span>A definir com a equipe</span></div></div>
 <div className="timeline">{phases.map(([month,name,delivery,team])=><article key={month}><span className="month">MÊS {month}</span><h2>{name}</h2><p>{delivery}</p><small>{action==='Equipes'?team:'Critério de conclusão: a detalhar'}</small></article>)}</div>
 <div className="plan-notes"><div><h2>POC em Uberlândia</h2><p>Validar a base em uma plataforma real e comprovar reutilização em outro contexto.</p></div><div><h2>Equalização e rollout</h2><p>Preparar o time para os padrões e ampliar a adoção gradualmente. Participação e alinhamento a confirmar.</p></div></div>
 </Frame>}
function Limits({action}:SlideProps){const blocks=[['Dificuldades','Inventário de rotinas e dependências','Conciliação com os contratos','Adoção de padrões entre equipes'],['Riscos','Divergência de dados → conciliação','Interrupção de integrações → testes e reversão','Dependências desconhecidas → inventário e monitoramento'],['Limites','Hardware e aquisição → escopo a confirmar','Backup e restore → escopo a confirmar','Outras frentes → identificar com a equipe']];return <Frame title="Dificuldades, riscos e responsabilidades" note="Tratamentos propostos para discussão · escopo e responsáveis ainda serão confirmados."><div className="risk-grid">{blocks.map(([title,...items])=><article key={title} className={action===title?'selected':''}><h2>{title}</h2>{items.map(item=><p key={item}>{item}</p>)}</article>)}</div><div className="responsibilities"><h2>Responsabilidades que a estrutura precisa explicitar</h2><div><span>Ingestão e processamento</span><span>Integridade dos dados</span><span>Plataformas e produtos</span><span>Padrões compartilhados</span></div><p>Atribuição de pessoas, liderança e entrada de demandas: definição no organograma conduzido por Angelo.</p><p>As fronteiras permitem que cada equipe trabalhe em seu projeto com padrões e interfaces comuns.</p></div></Frame>}
export const ILUM_DECK: Deck = {id:'ilum',brand:'INTELICITY · ILUM',title:'Intelicity · Ilum',slides:[Current,Proposed,Plan,Limits],config:[{label:'Estrutura atual',actions:problems.map(p=>p[0])},{label:'Estrutura proposta',actions:['Visão geral',...changes.map(c=>c[0])]},{label:'Planejamento',actions:['Marcos','Equipes']},{label:'Riscos e limites',actions:['Dificuldades','Riscos','Limites','Responsabilidades']}]}
