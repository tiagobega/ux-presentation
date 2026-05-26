import type { SlideProps } from './config'

const growthCards = [
  {
    accent: 'from-[#e85151]',
    num: '01 · AQUISIÇÃO',
    title: 'A cidade fecha mais rápido',
    body: 'A demonstração da plataforma é a primeira experiência real que uma cidade prospect tem com a Intelicity. Se for clara e confiante, o ciclo de vendas encurta. Se for confusa, o deal trava.',
  },
  {
    accent: 'from-[#7c6ef5]',
    num: '02 · RETENÇÃO',
    title: 'A cidade que entende, renova',
    body: 'Gestor que extrai clareza dos dados percebe valor e renova. Operador que não trava no fluxo não reclama. Motorista que entende o pagamento não abandona o programa.',
  },
  {
    accent: 'from-[#3ad47e]',
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

const actTag = "font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]"
const actTitle = 'text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3'

export default function Slide03Crescimento({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            UX como estratégia
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            UX não é estética.
            <br />É <em className="not-italic text-purple">crescimento.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            A experiência do usuário não serve apenas para organizar a plataforma. Ela é a
            principal ferramenta de aquisição, retenção e expansão de cidades. É o que o cliente
            vê — antes, durante e depois de contratar.
          </p>
        </div>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        {action === 'Modelo UX' && (
          <>
            <div className={actTag}>Como UX move o negócio</div>
            <h2 className={actTitle}>
              Três momentos onde
              <br />a experiência decide.
            </h2>
            <div className="grid grid-cols-3 gap-[2px] mt-7">
              {growthCards.map((c) => (
                <div
                  key={c.num}
                  className="relative p-6 px-[22px] bg-black/[0.02] border border-text/[0.08] overflow-hidden transition-colors hover:border-purple/[0.2]"
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.accent} to-transparent`} />
                  <div className="text-[10px] font-mono text-text/[0.32] mb-[14px] tracking-[0.1em]">
                    {c.num}
                  </div>
                  <div className="text-[16px] font-bold text-text mb-[9px]">{c.title}</div>
                  <div className="text-[13px] font-light text-text/55 leading-[1.7]">{c.body}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Comparativo' && (
          <>
            <div className={actTag}>Antes e depois</div>
            <h2 className={actTitle}>
              A mesma plataforma.
              <br />
              Uma experiência diferente.
            </h2>
            <div className="grid grid-cols-2 gap-[2px] mt-7">
              <div className="p-6 bg-red-500/[0.04] border border-red-400/[0.14]">
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase mb-[14px] text-red-700/60">
                  Sem UX estruturado
                </div>
                {beforeItems.map((item) => (
                  <div key={item} className="text-[13px] font-light text-text/55 leading-[1.65] py-[7px] border-b border-text/[0.05] last:border-0 flex gap-[10px] items-start">
                    <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[6px] bg-red-400/60" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-purple/[0.04] border border-purple/[0.14]">
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase mb-[14px] text-purple/60">
                  Com UX estratégico
                </div>
                {afterItems.map((item) => (
                  <div key={item} className="text-[13px] font-light text-text/55 leading-[1.65] py-[7px] border-b border-text/[0.05] last:border-0 flex gap-[10px] items-start">
                    <div className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[6px] bg-purple/60" />
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
