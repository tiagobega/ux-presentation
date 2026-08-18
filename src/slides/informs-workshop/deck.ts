import type { Deck } from '../config'
import Slide00Capa from './Slide00Capa'
import Slide01Papel from './Slide01Papel'
import Slide02Ganhos from './Slide02Ganhos'
import Slide03Controle from './Slide03Controle'
import Slide04PWA from './Slide04PWA'
import Slide05Ciclo, { CICLO_ACOES } from './Slide05Ciclo'
import Slide06Rastreio from './Slide06Rastreio'
import Slide07Semaforo from './Slide07Semaforo'
import Slide08SGISV from './Slide08SGISV'
import Slide09Implementar from './Slide09Implementar'
import Slide10QuemProcurar from './Slide10QuemProcurar'
import Slide11Encerramento from './Slide11Encerramento'

/**
 * "Informs para gestores": workshop de adoção, para quem já sabe em alto nível
 * o que o produto é. Poucos slides porque a maior parte do tempo é
 * demonstração, e não slide: o 4 explica o que é PWA com o tablet na mão, o 5
 * anda uma fase por step, e só o 6 anima sozinho.
 *
 * 0-3 Modelo mental e controle · 4-6 PWA, ciclo e rastreio (o bloco mais longo,
 * com o site novo ao lado) · 7-8 Decisão e limite · 9-11 Implantação e fecho.
 */
export const INFORMS_WORKSHOP_DECK: Deck = {
  id: 'informs-workshop',
  brand: 'INTELICITY · INFORMS PARA GESTORES',
  title: 'Informs para gestores',
  slides: [
    Slide00Capa,
    Slide01Papel,
    Slide02Ganhos,
    Slide03Controle,
    Slide04PWA,
    Slide05Ciclo,
    Slide06Rastreio,
    Slide07Semaforo,
    Slide08SGISV,
    Slide09Implementar,
    Slide10QuemProcurar,
    Slide11Encerramento,
  ],
  config: [
    { label: 'Capa', actions: ['Capa'] },
    { label: 'O papel', actions: ['O modelo', 'Quem faz o quê'] },
    { label: 'O que vem pronto', actions: ['Já pronto'] },
    {
      label: 'O que vocês controlam',
      actions: ['O que vocês controlam', 'Como um projeto entra'],
    },
    { label: 'O que é PWA', actions: ['Site que vira app'] },
    { label: 'O ciclo', actions: CICLO_ACOES },
    { label: 'Rastreio', actions: ['Ping a ping'] },
    { label: 'A decisão', actions: ['Verde', 'Amarelo', 'Vermelho'] },
    { label: 'SGISV', actions: ['O que caberia', 'O que passa do limite'] },
    { label: 'Implementar', actions: ['Seis passos', 'De quem é o trabalho'] },
    { label: 'Quem procurar', actions: ['Quem começa', 'Quem apoia'] },
    { label: 'Encerramento', actions: ['Fim'] },
  ],
}
