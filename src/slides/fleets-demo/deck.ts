import type { Deck } from '../config'
import Slide00Capa from './Slide00Capa'
import Slide01PorQueExiste from './Slide01PorQueExiste'
import Slide02OQueResolvemos from './Slide02OQueResolvemos'
import Slide03Ecossistema from './Slide03Ecossistema'
import Slide04Usuarios from './Slide04Usuarios'
import Slide05Glossario from './Slide05Glossario'
import Slide06DemoAuth from './Slide06DemoAuth'
import Slide07DemoCadastros from './Slide07DemoCadastros'
import Slide08DemoContrato from './Slide08DemoContrato'
import Slide09DemoColaboradores from './Slide09DemoColaboradores'
import Slide10DemoDispositivos from './Slide10DemoDispositivos'
import Slide11DemoColeta from './Slide11DemoColeta'
import Slide12DemoPagamentos from './Slide12DemoPagamentos'
import Slide13DemoAlertas from './Slide13DemoAlertas'
import Slide14DemoGestores from './Slide14DemoGestores'
import Slide15ProximosPassos from './Slide15ProximosPassos'
import Slide16Perguntas from './Slide16Perguntas'

/**
 * Deck Fleets com demo ao vivo, 17 slides. Espelha `fleets-slides.md`; a fala
 * está em `fleets-roteiro.md`. Slides 6–14 são `[DEMO]`: o slide é pano de
 * fundo e a aplicação roda no monitor 2, por isso têm um único step.
 */
export const FLEETS_DEMO_DECK: Deck = {
  id: 'fleets-demo',
  brand: 'INTELICITY · FLEETS',
  title: 'Intelicity · Fleets',
  slides: [
    Slide00Capa,
    Slide01PorQueExiste,
    Slide02OQueResolvemos,
    Slide03Ecossistema,
    Slide04Usuarios,
    Slide05Glossario,
    Slide06DemoAuth,
    Slide07DemoCadastros,
    Slide08DemoContrato,
    Slide09DemoColaboradores,
    Slide10DemoDispositivos,
    Slide11DemoColeta,
    Slide12DemoPagamentos,
    Slide13DemoAlertas,
    Slide14DemoGestores,
    Slide15ProximosPassos,
    Slide16Perguntas,
  ],
  config: [
    { label: 'Capa', actions: ['Capa'] },
    { label: 'Por que existe', actions: ['A planilha'] },
    { label: 'O que resolvemos', actions: ['Fonte única'] },
    { label: 'Ecossistema', actions: ['Fluxo do dado', 'Auth & permissão'] },
    { label: 'Usuários', actions: ['5 perfis', 'LGPD'] },
    { label: 'Glossário', actions: ['Vocabulário', 'Frase de ouro'] },
    { label: 'Demo · Autenticação', actions: ['Autenticação'] },
    { label: 'Demo · Cadastros base', actions: ['Cadastros'] },
    { label: 'Demo · Contrato', actions: ['Contrato'] },
    { label: 'Demo · Colaboradores', actions: ['Pessoas'] },
    { label: 'Demo · Dispositivos', actions: ['Hardware'] },
    { label: 'Demo · Coleta em campo', actions: ['Coleta'] },
    { label: 'Demo · Pagamentos', actions: ['Pagamentos'] },
    { label: 'Demo · Alertas', actions: ['Alertas'] },
    { label: 'Demo · Para gestores', actions: ['Indicadores'] },
    { label: 'Próximos passos', actions: ['Sete frentes', 'Amarração'] },
    { label: 'Perguntas', actions: ['Obrigado'] },
  ],
}
