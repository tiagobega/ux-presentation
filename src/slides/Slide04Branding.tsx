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

const actTag = "font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]"
const actTitle = 'text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3'
const actBody = 'text-[15px] font-light text-text/55 leading-[1.8] max-w-[600px]'

export default function Slide04Branding({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            Branding · Presença
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            Branding não
            <br />é logo. É <em className="not-italic text-purple">presença.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            Branding está em todo lugar que a Intelicity aparece — documentos, banners, sites,
            propostas comerciais. Mas no nosso caso, o principal ponto de contato com o cliente é
            a aplicação. É onde ele passa horas. É onde ele julga se a empresa é confiável,
            inovadora, capaz.
          </p>
        </div>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        {action === 'Presença' && (
          <>
            <div className={actTag}>O ponto cego</div>
            <h2 className={actTitle}>
              Não adianta ter uma comunicação
              <br />
              externa impecável...
            </h2>
            <p className={actBody}>
              ...se o gestor abre o Fleets e vê uma interface que não reflete isso. A aplicação
              precisa falar por nós — com a mesma linguagem, o mesmo cuidado, a mesma sensação de
              qualidade que queremos transmitir lá fora.
            </p>
            <div className="grid grid-cols-3 gap-[2px] mt-9">
              {presenceCards.map((card) => (
                <div
                  key={card.label}
                  className={`p-6 px-[22px] border transition-colors ${
                    card.highlight
                      ? 'bg-purple/[0.05] border-purple/[0.18] hover:border-purple/[0.36] hover:bg-purple/[0.08]'
                      : 'bg-black/[0.02] border-text/[0.08] hover:border-purple/[0.18] hover:bg-purple/[0.03]'
                  }`}
                >
                  <div
                    className="text-[17px] mb-3"
                    style={{ color: card.highlight ? '#7c3aed' : 'rgba(26,18,37,0.22)' }}
                  >
                    ✦
                  </div>
                  <div
                    className="font-mono text-[10px] tracking-[0.16em] uppercase mb-[9px]"
                    style={{ color: card.highlight ? '#7c3aed' : 'rgba(26,18,37,0.42)' }}
                  >
                    {card.label}
                  </div>
                  <div className="text-[13px] font-light text-text/55 leading-[1.65]">
                    {card.body}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Declaração' && (
          <>
            <div className={actTag}>A coerência como estratégia</div>
            <h2 className={actTitle}>
              Cada tela é um ponto
              <br />
              de contato com o cliente.
            </h2>
            <p className={actBody}>
              Cada fluxo mal resolvido é uma mensagem silenciosa de que a empresa ainda não chegou
              lá. E cada experiência fluida e coerente reforça exatamente o oposto: que a
              Intelicity é tão boa por dentro quanto promete ser por fora.
            </p>
            <div className="mt-11 px-9 py-8 border-t border-purple/[0.12] border-b">
              <div className="text-[19px] font-light text-text/45 tracking-[-0.01em] leading-[1.4]">
                O branding interno da stack IC não é vaidade.
              </div>
              <div className="text-[44px] font-bold text-text tracking-[-0.03em] mt-2">
                É coerência.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
