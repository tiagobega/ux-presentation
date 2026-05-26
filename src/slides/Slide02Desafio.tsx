import type { SlideProps } from './config'

const personas = [
  {
    role: 'Cliente · Decisor',
    name: 'Gestor de Cidade',
    context: 'Está numa reunião de câmara. Precisa justificar um investimento em 3 minutos com dados concretos.',
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
    context: 'Quer saber quanto vai receber esse mês e se o dispositivo no carro está funcionando.',
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

const actTag = "font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]"
const actTitle = 'text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3'
const actBody = 'text-[15px] font-light text-text/55 leading-[1.8] max-w-[600px]'

export default function Slide02Desafio({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            O próximo nível
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            Ter os dados
            <br />não é <em className="not-italic text-purple">suficiente.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            Um gestor que não entende o que está vendo não age. Um operador que trava no fluxo não
            instala. Uma cidade que não visualiza o impacto não renova. Dados parados não valem
            nada.
          </p>
        </div>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        {action === 'Personas' && (
          <>
            <div className={actTag}>O problema real</div>
            <h2 className={actTitle}>
              Três pessoas. Três contextos.
              <br />
              Uma plataforma que precisa servir a todos.
            </h2>
            <p className={actBody}>
              Cada perfil tem uma relação completamente diferente com os dados. UX é a disciplina
              que garante que a plataforma fale a língua certa com cada um deles.
            </p>
            <div className="grid grid-cols-3 gap-[2px] mt-7">
              {personas.map((p) => (
                <div key={p.name} className="p-[22px] bg-black/[0.02] border border-text/[0.08]">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-purple/[0.45] mb-[7px] uppercase">
                    {p.role}
                  </div>
                  <div className="text-[15px] font-semibold text-text mb-[6px]">{p.name}</div>
                  <div className="text-[12px] font-light text-text/55 leading-[1.6] mb-3">
                    {p.context}
                  </div>
                  <div className="text-[12px] italic font-normal text-red-700/75 leading-[1.6] px-[11px] py-[9px] bg-red-500/[0.06] border-l-2 border-red-400/30 mb-2">
                    {p.pain}
                  </div>
                  <div className="text-[12px] italic font-normal text-purple/85 leading-[1.6] px-[11px] py-[9px] bg-purple/[0.06] border-l-2 border-purple/[0.28]">
                    {p.gain}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {action === 'Riscos' && (
          <>
            <div className={actTag}>O risco de não agir agora</div>
            <h2 className={actTitle}>
              Crescer sem consistência
              <br />é construir dívida.
            </h2>
            <p className={actBody}>
              O Fleets já tem módulos prontos que não conversam entre si. Cada nova feature sem
              design system multiplica a inconsistência — e o custo de corrigir depois é
              exponencialmente maior.
            </p>
            <div className="grid grid-cols-2 gap-[2px] mt-7">
              {risks.map((r) => (
                <div key={r.title} className="p-[22px] bg-red-500/[0.04] border border-red-400/[0.12]">
                  <div className="font-mono text-[9px] tracking-[0.16em] text-red-700/55 uppercase mb-[9px]">
                    {r.label}
                  </div>
                  <div className="text-[14px] font-semibold text-text/85 mb-[7px]">{r.title}</div>
                  <div className="text-[13px] font-light text-text/55 leading-[1.65]">{r.body}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
