import type { SlideProps } from './config'

const presenceCards = [
  {
    label: 'Documentos',
    body: 'Propostas, relatórios, contratos. A identidade visual comunica profissionalismo antes de qualquer argumento.',
    highlight: false,
  },
  {
    label: 'Comunicação externa',
    body: 'Sites, banners, redes sociais. A primeira impressão que uma cidade tem da Intelicity.',
    highlight: false,
  },
  {
    label: 'Aplicações',
    body: 'O principal ponto de contato no nosso caso. Onde o cliente passa horas. Onde ele forma opinião sobre quem somos de verdade.',
    highlight: true,
  },
]

export default function Slide04Branding({ step }: SlideProps) {
  return (
    <div className="s-frame">
      <div className="s-hero">
        <div className="hero">
          <div className="hero-eyebrow">Branding · Presença</div>
          <h1 className="hero-title">
            Branding não
            <br />é logo. É <em>presença.</em>
          </h1>
          <p className="hero-sub">
            Branding está em todo lugar que a Intelicity aparece — documentos, banners, sites,
            propostas comerciais. Mas no nosso caso, o principal ponto de contato com o cliente é
            a aplicação. É onde ele passa horas. É onde ele julga se a empresa é confiável,
            inovadora, capaz.
          </p>
        </div>
      </div>

      <div key={step} className="s-content">
        {step === 0 && (
          <>
            <div className="act-tag">O ponto cego</div>
            <h2 className="act-title">
              Não adianta ter uma comunicação
              <br />
              externa impecável...
            </h2>
            <p className="act-body">
              ...se o gestor abre o Fleets e vê uma interface que não reflete isso. A aplicação
              precisa falar por nós — com a mesma linguagem, o mesmo cuidado, a mesma sensação de
              qualidade que queremos transmitir lá fora.
            </p>
            <div className="brand-presence-grid">
              {presenceCards.map((card) => (
                <div
                  key={card.label}
                  className={`bp-card${card.highlight ? ' bp-card-highlight' : ''}`}
                >
                  <div
                    className="bp-icon"
                    style={card.highlight ? { color: '#a78bfa' } : undefined}
                  >
                    ✦
                  </div>
                  <div
                    className="bp-label"
                    style={card.highlight ? { color: '#c4b5fd' } : undefined}
                  >
                    {card.label}
                  </div>
                  <div className="bp-body">{card.body}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="act-tag">A coerência como estratégia</div>
            <h2 className="act-title">
              Cada tela é um ponto
              <br />
              de contato com o cliente.
            </h2>
            <p className="act-body">
              Cada fluxo mal resolvido é uma mensagem silenciosa de que a empresa ainda não chegou
              lá. E cada experiência fluida e coerente reforça exatamente o oposto: que a
              Intelicity é tão boa por dentro quanto promete ser por fora.
            </p>
            <div className="brand-statement">
              <div className="bs-line">O branding interno da stack IC não é vaidade.</div>
              <div className="bs-highlight">É coerência.</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
