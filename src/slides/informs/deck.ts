import type { Deck } from '../config'
import Slide00Capa from './Slide00Capa'
import Slide01Problema from './Slide01Problema'
import Slide02Solucao from './Slide02Solucao'
import Slide03Anatomia from './Slide03Anatomia'
import Slide04Campos from './Slide04Campos'
import Slide05Autenticacao from './Slide05Autenticacao'
import Slide06Listagem from './Slide06Listagem'
import Slide07Status from './Slide07Status'
import Slide08Preencher from './Slide08Preencher'
import Slide09Duplicacao from './Slide09Duplicacao'
import Slide10Cancelamento from './Slide10Cancelamento'
import Slide11Offline from './Slide11Offline'
import Slide12Roteirizacao from './Slide12Roteirizacao'
import Slide13Rastreio from './Slide13Rastreio'
import Slide14Template from './Slide14Template'
import Slide15Formulario from './Slide15Formulario'
import Slide16CriarEmCampo from './Slide16CriarEmCampo'
import Slide17Integracao from './Slide17Integracao'
import Slide18Implantacao from './Slide18Implantacao'
import Slide19ProximosPassos from './Slide19ProximosPassos'
import Slide20Encerramento from './Slide20Encerramento'

// 0 Capa · 1 O problema · 2 A resposta · 3 Anatomia · 4 Tipos de campo
// 5-13 Fluxo do app · 14-18 Fluxo do sistema de origem (a criação em campo
// fecha o bloco, logo depois da criação de formulário pela API)
// 19 Próximos passos · 20 Encerramento
export const INFORMS_DECK: Deck = {
  id: 'informs',
  brand: 'INTELICITY · INFORMS',
  title: 'Intelicity · Informs',
  slides: [
    Slide00Capa,
    Slide01Problema,
    Slide02Solucao,
    Slide03Anatomia,
    Slide04Campos,
    Slide05Autenticacao,
    Slide06Listagem,
    Slide07Status,
    Slide08Preencher,
    Slide09Duplicacao,
    Slide10Cancelamento,
    Slide11Offline,
    Slide12Roteirizacao,
    Slide13Rastreio,
    Slide14Template,
    Slide15Formulario,
    Slide16CriarEmCampo,
    Slide17Integracao,
    Slide18Implantacao,
    Slide19ProximosPassos,
    Slide20Encerramento,
  ],
  config: [
    { label: 'Capa', actions: ['Capa'] },
    { label: 'O problema', actions: ['A cena'] },
    { label: 'A resposta', actions: ['Dores', 'Como resolvemos'] },
    { label: 'Anatomia', actions: ['Campos → Sessões', 'Template → Formulário'] },
    { label: 'Tipos de campo', actions: ['Campos'] },
    { label: 'Autenticação', actions: ['Gates'] },
    { label: 'Listagem', actions: ['Fila do dia'] },
    { label: 'Status', actions: ['Cinco status', 'O laranja'] },
    { label: 'Preenchimento', actions: ['Preencher'] },
    { label: 'Duplicação', actions: ['Sessão duplicável'] },
    { label: 'Cancelamento', actions: ['Justificativa'] },
    { label: 'Offline-first', actions: ['Fila offline', 'Sincronização'] },
    { label: 'Roteirização', actions: ['Rota'] },
    { label: 'Rastreio', actions: ['Tempo real'] },
    { label: 'Template', actions: ['Molde'] },
    { label: 'Formulário', actions: ['Demanda'] },
    { label: 'Criar em campo', actions: ['Criação'] },
    { label: 'Integração', actions: ['Publicação', 'Retorno'] },
    { label: 'Implantação', actions: ['Duas frentes'] },
    { label: 'Próximos passos', actions: ['Fila do produto'] },
    { label: 'Encerramento', actions: ['Fim'] },
  ],
}
