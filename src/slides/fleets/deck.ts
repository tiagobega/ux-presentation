import type { Deck } from '../config'
import Slide00Capa from './Slide00Capa'
import Slide01Problema from './Slide01Problema'
import Slide02Dominio from './Slide02Dominio'
import Slide03Perfis from './Slide03Perfis'
import Slide04QuemUsa from './Slide04QuemUsa'
import Slide05Mapa from './Slide05Mapa'
import Slide06Dashboard from './Slide06Dashboard'
import Slide07Dispositivos from './Slide07Dispositivos'
import Slide08CicloVida from './Slide08CicloVida'
import Slide09Instalacao from './Slide09Instalacao'
import Slide10Alertas from './Slide10Alertas'
import Slide11Colaboradores from './Slide11Colaboradores'
import Slide12Contratos from './Slide12Contratos'
import Slide13Pagamentos from './Slide13Pagamentos'
import Slide14Configuracao from './Slide14Configuracao'
import Slide15FluxoEstoque from './Slide15FluxoEstoque'
import Slide16FluxoPagamento from './Slide16FluxoPagamento'
import Slide17Roadmap from './Slide17Roadmap'
import Slide18Estoque from './Slide18Estoque'
import Slide19AppMotorista from './Slide19AppMotorista'
import Slide20InstalacaoAssistida from './Slide20InstalacaoAssistida'
import Slide21Encerramento from './Slide21Encerramento'

export const FLEETS_DECK: Deck = {
  id: 'fleets',
  brand: 'INTELICITY · FLEETS',
  title: 'Intelicity · Fleets',
  slides: [
    Slide00Capa,
    Slide01Problema,
    Slide02Dominio,
    Slide03Perfis,
    Slide04QuemUsa,
    Slide05Mapa,
    Slide06Dashboard,
    Slide07Dispositivos,
    Slide08CicloVida,
    Slide09Instalacao,
    Slide10Alertas,
    Slide11Colaboradores,
    Slide12Contratos,
    Slide13Pagamentos,
    Slide14Configuracao,
    Slide15FluxoEstoque,
    Slide16FluxoPagamento,
    Slide17Roadmap,
    Slide18Estoque,
    Slide19AppMotorista,
    Slide20InstalacaoAssistida,
    Slide21Encerramento,
  ],
  config: [
    { label: 'Capa', actions: ['Capa'] },
    { label: 'O problema', actions: ['Problema'] },
    { label: 'Domínio', actions: ['Entidades', 'Regra de ouro'] },
    { label: 'Perfis', actions: ['Perfis', 'LGPD'] },
    { label: 'Quem usa', actions: ['Quem usa'] },
    { label: 'Módulos', actions: ['Módulos'] },
    { label: 'Dashboard', actions: ['Dashboard'] },
    { label: 'Dispositivos', actions: ['Dispositivos'] },
    { label: 'Ciclo de vida', actions: ['Estados', 'Rastro'] },
    { label: 'Instalação', actions: ['Instalação'] },
    { label: 'Alertas', actions: ['Alertas'] },
    { label: 'Colaboradores', actions: ['Pessoas'] },
    { label: 'Contratos', actions: ['Contratos'] },
    { label: 'Pagamentos', actions: ['Pagamentos'] },
    { label: 'Governança', actions: ['Governança'] },
    { label: 'Fluxo 1 · Hardware', actions: ['Estoque → Campo', 'Operação → Fim'] },
    { label: 'Fluxo 2 · Contrato', actions: ['Contrato → Vínculo', 'Fechamento'] },
    { label: 'Roadmap', actions: ['Três frentes'] },
    { label: 'Estoque', actions: ['Estoque'] },
    { label: 'App do motorista', actions: ['App'] },
    { label: 'Instalação assistida', actions: ['Ciclo fechado'] },
    { label: 'Encerramento', actions: ['Fim'] },
  ],
}
