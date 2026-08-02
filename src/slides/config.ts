/**
 * Deck Fleets (apresentação com demo ao vivo) — 17 slides.
 * Espelha `fleets-slides.md`; a fala de cada slide está em `fleets-roteiro.md`.
 * Slides 7–15 do roteiro são `[DEMO]`: o slide é pano de fundo, a aplicação
 * roda no monitor 2 — por isso têm um único step.
 */
export const SLIDE_CONFIG = [
  {
    label: 'Capa',
    actions: ['Capa'],
  },
  {
    label: 'Por que existe',
    actions: ['A planilha'],
  },
  {
    label: 'O que resolvemos',
    actions: ['Fonte única'],
  },
  {
    label: 'Ecossistema',
    actions: ['Fluxo do dado', 'Auth & permissão'],
  },
  {
    label: 'Usuários',
    actions: ['5 perfis', 'LGPD'],
  },
  {
    label: 'Glossário',
    actions: ['Vocabulário', 'Frase de ouro'],
  },
  {
    label: 'Demo · Autenticação',
    actions: ['Autenticação'],
  },
  {
    label: 'Demo · Cadastros base',
    actions: ['Cadastros'],
  },
  {
    label: 'Demo · Contrato',
    actions: ['Contrato'],
  },
  {
    label: 'Demo · Colaboradores',
    actions: ['Pessoas'],
  },
  {
    label: 'Demo · Dispositivos',
    actions: ['Hardware'],
  },
  {
    label: 'Demo · Coleta em campo',
    actions: ['Coleta'],
  },
  {
    label: 'Demo · Pagamentos',
    actions: ['Pagamentos'],
  },
  {
    label: 'Demo · Alertas',
    actions: ['Alertas'],
  },
  {
    label: 'Demo · Para gestores',
    actions: ['Indicadores'],
  },
  {
    label: 'Próximos passos',
    actions: ['Sete frentes', 'Amarração'],
  },
  {
    label: 'Perguntas',
    actions: ['Obrigado'],
  },
] as const

/**
 * Padding padrão dos slides. Aplicado DENTRO de cada slide (não no container),
 * para permitir slides full-bleed: basta omitir esta constante no slide.
 */
export const SLIDE_PADDING = 'px-16 pt-10 pb-8'

export interface SlideProps {
  action: string
}
