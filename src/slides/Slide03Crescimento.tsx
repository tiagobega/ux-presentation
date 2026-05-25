import type { SlideProps } from './config'

const growthCards = [
  {
    cls: 'acq',
    num: '01 · AQUISIÇÃO',
    title: 'A cidade fecha mais rápido',
    body: 'A demonstração da plataforma é a primeira experiência real que uma cidade prospect tem com a Intelicity. Se for clara e confiante, o ciclo de vendas encurta. Se for confusa, o deal trava.',
  },
  {
    cls: 'ret',
    num: '02 · RETENÇÃO',
    title: 'A cidade que entende, renova',
    body: 'Gestor que extrai clareza dos dados percebe valor e renova. Operador que não trava no fluxo não reclama. Motorista que entende o pagamento não abandona o programa.',
  },
  {
    cls: 'exp',
    num: '03 · EXPANSÃO',
    title: 'A cidade vira advogada',
    body: 'Quando o gestor apresenta os dados da Intelicity numa reunião de câmara com clareza e impacto, ele vira um vendedor interno. Isso abre novos contratos dentro da mesma cidade.',
  },
]

const beforeItems = [
  'Gestor abre o dashboard e não sabe por onde começar',
  'Operador liga para suporte porque não sabe se instalou certo',
  'Cidade prospect sai da demo sem entender o valor',
  'Motorista não entende como funciona o pagamento',
  'Cada módulo novo tem padrões visuais diferentes',
  'Dev recebe especificações ambíguas e faz revisões',
]

const afterItems = [
  'Dashboard conta uma história clara para o perfil certo',
  'Wizard guia o operador passo a passo com feedback imediato',
  'Demo clara e confiante — o ciclo de vendas encurta',
  'Motorista acessa metas e histórico direto pelo celular',
  'Design system garante consistência em todos os módulos',
  'Handoff claro elimina ambiguidade e reduz revisões',
]

export default function Slide03Crescimento({ action }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">UX como estratégia</div>
          <h1 className="hero-title">
            UX não é estética.
            <br />É <em>crescimento.</em>
          </h1>
          <p className="hero-sub">
            A experiência do usuário não serve apenas para organizar a plataforma. Ela é a
            principal ferramenta de aquisição, retenção e expansão de cidades. É o que o cliente
            vê — antes, durante e depois de contratar.
          </p>
        </div>
      </div>

      <div key={action} className="s-content">
        {action === 'Modelo UX' && (
          <>
            <div className="act-tag">Como UX move o negócio</div>
            <h2 className="act-title">
              Três momentos onde
              <br />a experiência decide.
            </h2>
            <div className="growth-grid">
              {growthCards.map((c) => (
                <div key={c.num} className={`growth-card ${c.cls}`}>
                  <div className="growth-num">{c.num}</div>
                  <div className="growth-title">{c.title}</div>
                  <div className="growth-body">{c.body}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Comparativo' && (
          <>
            <div className="act-tag">Antes e depois</div>
            <h2 className="act-title">
              A mesma plataforma.
              <br />
              Uma experiência diferente.
            </h2>
            <div className="ba-grid">
              <div className="ba-card before">
                <div className="ba-tag">Sem UX estruturado</div>
                {beforeItems.map((item) => (
                  <div key={item} className="ba-item">
                    <div className="ba-dot" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <div className="ba-card after">
                <div className="ba-tag">Com UX estratégico</div>
                {afterItems.map((item) => (
                  <div key={item} className="ba-item">
                    <div className="ba-dot" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
