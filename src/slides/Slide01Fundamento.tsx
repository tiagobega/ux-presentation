import { Fragment } from 'react'
import type { SlideProps } from './config'

const layers = [
  {
    accent: 'rgba(26,18,37,0.28)',
    label: 'Fundamento técnico',
    title: 'Dados',
    desc: 'Capturados por dispositivos embarcados em campo. Brutos, contínuos, volumosos. Esse é o nosso diferencial — e não é trivial.',
  },
  {
    accent: 'rgba(26,18,37,0.45)',
    label: 'Inteligência',
    title: 'Contexto',
    desc: 'Dados processados por IA e validados por humanos. Padrões reconhecidos, anomalias identificadas, qualidade garantida.',
  },
  {
    accent: 'rgba(26,18,37,0.62)',
    label: 'Entrega',
    title: 'Informação',
    desc: 'Contexto organizado e entregue ao perfil certo, no formato certo. O dado vira resposta para uma pergunta real.',
  },
  {
    accent: 'rgba(26,18,37,0.82)',
    label: 'Clareza',
    title: 'Decisão',
    desc: 'Informação apresentada com clareza suficiente para gerar ação. Gestores entendem, justificam e comunicam.',
  },
]

export default function Slide01Fundamento({ action }: SlideProps) {
  const hasActive = true

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <div className="pt-0 pb-4 border-b border-text/[0.08]">
          <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] mb-[18px] uppercase">
            Intelicity · Documento Estratégico · 2026
          </div>
          <h1 className="text-[36px] font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3">
            Capturar dados
            <br />é o <em className="not-italic text-purple">começo.</em>
          </h1>
          <p className="text-[13px] font-light text-text/55 leading-[1.65] max-w-[540px]">
            A maioria das cidades não tem dados de qualidade sobre o que acontece no seu
            território. A Intelicity resolveu esse problema. Agora o desafio é o próximo: fazer
            esses dados chegarem às pessoas certas, no formato certo, no momento certo.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-5 step-reveal">
        <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mt-9 mb-3 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-text/[0.08]">
          O que construímos
        </div>
        <h2 className="text-[30px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-3">
          Uma cadeia completa,
          <br />
          da captura à execução.
        </h2>

        <div className="flex flex-col gap-[2px] mt-7">
          {layers.map((layer) => {
            const isActive = action === layer.title
            return (
              <Fragment key={layer.title}>
                <div
                  className={`group layer-item flex items-stretch border overflow-hidden transition-all duration-300 cursor-default
                    ${isActive ? 'bg-purple/[0.06] border-purple/[0.22]' : 'bg-black/[0.02] border-text/[0.08] hover:bg-purple/[0.05] hover:border-purple/[0.18]'}
                    ${!isActive && hasActive ? 'opacity-[0.32]' : ''}`}
                >
                  <div className="w-1 flex-shrink-0 z-[1]" style={{ background: layer.accent }} />
                  <div className="px-6 py-4 flex-1 z-[1] relative">
                    <div className={`font-mono text-[9px] tracking-[0.16em] uppercase mb-[3px] transition-colors duration-300
                      ${isActive ? 'text-purple/55' : 'text-text/[0.32] group-hover:text-purple/50'}`}>
                      {layer.label}
                    </div>
                    <div className={`text-[20px] font-semibold tracking-[-0.015em] mb-1 transition-colors duration-300
                      ${isActive ? 'text-text' : 'text-text/[0.62] group-hover:text-text'}`}>
                      {layer.title}
                    </div>
                    <div className="text-[13px] font-light text-text/55 leading-[1.65] transition-colors duration-300 group-hover:text-text/[0.62]">
                      {layer.desc}
                    </div>
                  </div>
                </div>
                <div className="h-4 flex items-center pl-8">
                  <span className="font-mono text-[11px] text-purple/[0.28]">↓</span>
                </div>
              </Fragment>
            )
          })}

          <div
            className={`layer-conclusion layer-item flex items-stretch border overflow-hidden transition-all duration-300 mt-1 cursor-default
              ${action === 'Execução' ? 'bg-purple/[0.08] border-purple/[0.28]' : 'bg-purple/[0.05] border-purple/[0.18] hover:bg-purple/[0.08] hover:border-purple/[0.28]'}`}
          >
            <div className="w-1 flex-shrink-0 z-[1] bg-purple shadow-[0_0_14px_rgba(124,58,237,0.35)]" />
            <div className="px-6 py-4 flex-1 z-[1] relative">
              <div className="font-mono text-[9px] tracking-[0.16em] text-text/[0.32] uppercase mb-[3px]">
                Destino
              </div>
              <div className="text-[32px] font-bold text-text tracking-[-0.03em]">Execução.</div>
              <div className="text-[14px] font-light text-text/52 mt-[5px] leading-[1.65]">
                O objetivo final de qualquer dado coletado. Cidades têm problemas que não podem
                ignorar — a Intelicity garante que elas tenham o que precisam para resolvê-los.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[22px] pt-4 border-t border-text/[0.08] font-mono text-[10px] text-purple/[0.32] tracking-[0.12em] flex items-center gap-[10px]">
          <div className="w-[6px] h-[6px] rounded-full bg-purple/[0.45] shadow-[0_0_6px_rgba(124,58,237,0.25)] flex-shrink-0" />
          INTELICITY OPERA EM TODAS AS CAMADAS
        </div>
      </div>
    </div>
  )
}
