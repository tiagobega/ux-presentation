import type { SlideProps } from './config'

const personas = [
  {
    role: 'Cliente · Decisor',
    name: 'Gestor de Cidade',
    context:
      'Está numa reunião de câmara. Precisa justificar um investimento em 3 minutos com dados concretos.',
    pain: '"Eu vejo muitos números mas não sei o que fazer com eles."',
    gain: 'Com UX: dashboards que contam uma história clara, exportáveis, prontos para apresentação.',
  },
  {
    role: 'Interno · Executor',
    name: 'Operador de Campo',
    context: 'Está em campo com um celular instável tentando instalar um dispositivo.',
    pain: '"Eu nunca sei se fiz certo. Tenho que ligar para perguntar."',
    gain: 'Com UX: wizard guiado, feedback imediato, zero ambiguidade em campo.',
  },
  {
    role: 'Externo · Usuário',
    name: 'Motorista',
    context:
      'Quer saber quanto vai receber esse mês e se o dispositivo no carro está funcionando.',
    pain: '"Eu não entendo como funciona o pagamento."',
    gain: 'Com UX: página clara com metas, status e histórico — acessível pelo celular.',
  },
]

const risks = [
  {
    label: 'Risco técnico',
    title: 'Módulos que não conversam',
    body: 'Sem tokens e componentes compartilhados, cada módulo novo cria padrões próprios. Em 12 meses a plataforma tem 3 sistemas visuais diferentes.',
  },
  {
    label: 'Risco comercial',
    title: 'Cidade que não entende não renova',
    body: 'Se o gestor não consegue extrair clareza da plataforma, a percepção de valor cai — independente da qualidade técnica dos dados.',
  },
  {
    label: 'Risco operacional',
    title: 'Operador que trava custa caro',
    body: 'Cada ligação de suporte por dúvida de fluxo é tempo perdido do time. Um wizard bem projetado elimina essa fricção.',
  },
  {
    label: 'Risco de crescimento',
    title: 'Nova cidade que não fecha',
    body: 'A primeira impressão de uma cidade prospect é a demonstração da plataforma. Se a experiência for confusa, o deal trava antes do argumento técnico.',
  },
]

export default function Slide02Desafio({ action }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">O próximo nível</div>
          <h1 className="hero-title">
            Ter os dados
            <br />
            não é <em>suficiente.</em>
          </h1>
          <p className="hero-sub">
            Um gestor que não entende o que está vendo não age. Um operador que trava no fluxo não
            instala. Uma cidade que não visualiza o impacto não renova. Dados parados não valem
            nada.
          </p>
        </div>
      </div>

      <div key={action} className="s-content">
        {action === 'Personas' && (
          <>
            <div className="act-tag">O problema real</div>
            <h2 className="act-title">
              Três pessoas. Três contextos.
              <br />
              Uma plataforma que precisa servir a todos.
            </h2>
            <p className="act-body">
              Cada perfil tem uma relação completamente diferente com os dados. UX é a disciplina
              que garante que a plataforma fale a língua certa com cada um deles.
            </p>
            <div className="persona-grid">
              {personas.map((p) => (
                <div key={p.name} className="persona-card">
                  <div className="persona-role">{p.role}</div>
                  <div className="persona-name">{p.name}</div>
                  <div className="persona-context">{p.context}</div>
                  <div className="persona-pain">{p.pain}</div>
                  <div className="persona-gain">{p.gain}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Riscos' && (
          <>
            <div className="act-tag">O risco de não agir agora</div>
            <h2 className="act-title">
              Crescer sem consistência
              <br />é construir dívida.
            </h2>
            <p className="act-body">
              O Fleets já tem módulos prontos que não conversam entre si. Cada nova feature sem
              design system multiplica a inconsistência — e o custo de corrigir depois é
              exponencialmente maior.
            </p>
            <div className="risk-grid">
              {risks.map((r) => (
                <div key={r.title} className="risk-card">
                  <div className="risk-label">{r.label}</div>
                  <div className="risk-title">{r.title}</div>
                  <div className="risk-body">{r.body}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
