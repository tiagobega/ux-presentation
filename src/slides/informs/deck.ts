import type { Deck } from '../config'
import Slide00Capa from './Slide00Capa'
import Slide01PorQueExiste from './Slide01PorQueExiste'
import Slide02Arquitetura from './Slide02Arquitetura'
import Slide03Consequencias from './Slide03Consequencias'
import Slide04Anatomia from './Slide04Anatomia'
import Slide05Campos from './Slide05Campos'
import Slide06Autenticacao from './Slide06Autenticacao'
import Slide07Listagem from './Slide07Listagem'
import Slide08Status from './Slide08Status'
import Slide09Preencher from './Slide09Preencher'
import Slide10Duplicacao from './Slide10Duplicacao'
import Slide11Cancelamento from './Slide11Cancelamento'
import Slide12Offline from './Slide12Offline'
import Slide13Roteirizacao from './Slide13Roteirizacao'
import Slide14Rastreio from './Slide14Rastreio'
import Slide15Template from './Slide15Template'
import Slide16Formulario from './Slide16Formulario'
import Slide17CriarEmCampo from './Slide17CriarEmCampo'
import Slide18Implantacao from './Slide18Implantacao'
import Slide19ProximosPassos from './Slide19ProximosPassos'
import Slide20Encerramento from './Slide20Encerramento'

// 0 Capa · 1 Por que existe · 2 Arquitetura · 3 Consequências (pergunta →
// resposta → uma dor/ganho por step, mesma mecânica nos slides 1 e 3) ·
// 4 Anatomia · 5 Tipos de campo · 6-14 Fluxo do app · 15-17 Fluxo do sistema
// de origem (a criação em campo fecha o bloco, logo depois da criação de
// formulário pela API — o contrato de integração já foi coberto na
// Arquitetura, no slide 2) · 18 Próximos passos · 19 Encerramento
export const INFORMS_DECK: Deck = {
  id: 'informs',
  brand: 'INTELICITY · INFORMS',
  title: 'Intelicity · Informs',
  slides: [
    Slide00Capa,
    Slide01PorQueExiste,
    Slide02Arquitetura,
    Slide03Consequencias,
    Slide04Anatomia,
    Slide05Campos,
    Slide06Autenticacao,
    Slide07Listagem,
    Slide08Status,
    Slide09Preencher,
    Slide10Duplicacao,
    Slide11Cancelamento,
    Slide12Offline,
    Slide13Roteirizacao,
    Slide14Rastreio,
    Slide15Template,
    Slide16Formulario,
    Slide17CriarEmCampo,
    Slide18Implantacao,
    Slide19ProximosPassos,
    Slide20Encerramento,
  ],
  config: [
    { label: 'Capa', actions: ['Capa'] },
    {
      label: 'Por que existe',
      actions: [
        'A pergunta',
        'A resposta',
        'Formulários rígidos',
        'Campo sem conectividade',
        'Zero visibilidade',
        'Mudança vira projeto',
      ],
    },
    { label: 'Arquitetura', actions: ['Fluxo'] },
    {
      label: 'Consequências',
      actions: [
        'A pergunta',
        'A resposta',
        'Templates dinâmicos',
        'Offline-first',
        'Rastreio em tempo real',
        'Publicação instantânea',
        'O foco',
      ],
    },
    { label: 'Anatomia', actions: ['Anatomia'] },
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
    { label: 'Implantação', actions: ['Duas frentes'] },
    { label: 'Próximos passos', actions: ['Fila do produto'] },
    { label: 'Encerramento', actions: ['Fim'] },
  ],
}
