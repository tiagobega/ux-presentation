import type { Deck } from '../config'
import Slide01Compromisso, { ACTIONS as A01 } from './Slide01Compromisso'
import Slide02Arquitetura, { ACTIONS as A02 } from './Slide02Arquitetura'
import Slide05Apex, { ACTIONS as A05 } from './Slide05Apex'
import Slide06Demandas, { ACTIONS as A06 } from './Slide06Demandas'
import Slide07Portfolio, { ACTIONS as A07 } from './Slide07Portfolio'
import Slide08Incorporacao, { ACTIONS as A08 } from './Slide08Incorporacao'
import Slide09Frentes, { ACTIONS as A09 } from './Slide09Frentes'
import Slide10Poc, { ACTIONS as A10 } from './Slide10Poc'
import Slide11SeisMeses, { ACTIONS as A11 } from './Slide11SeisMeses'
import Slide12Criterios, { ACTIONS as A12 } from './Slide12Criterios'
import Slide13Conducao, { ACTIONS as A13 } from './Slide13Conducao'
import Slide14Formalizacao, { ACTIONS as A14 } from './Slide14Formalizacao'
import Slide15CidadeX, { ACTIONS as A15 } from './Slide15CidadeX'
import SlideAnexoQuery, { ACTIONS as ANEXO } from './SlideAnexoQuery'

/**
 * Deck ILUM · diretoria — 13 slides principais e um anexo, sem capa.
 *
 * A fonte é `plano-ilum-diretoria.md`: a fala, a montagem e as notas de
 * preparação de cada slide estão lá, e os números dos arquivos seguem os
 * números do plano (`Slide01` é o slide 1 do plano), para não haver conversão
 * mental ao comparar os dois. Daí o salto de 02 para 05: o slide 2 absorveu
 * os antigos 3 e 4, e renumerar o resto só produziria divergência com o plano.
 *
 * Os steps de cada slide vêm do próprio slide (`ACTIONS`), que copia os
 * "Passos" do plano — a nav e o slide não saem de sincronia quando uma etapa
 * é acrescentada.
 */
export const DIRETORIA_DECK: Deck = {
  id: 'diretoria',
  brand: 'INTELICITY · ILUM',
  title: 'ILUM · Plano de execução',
  slides: [
    Slide01Compromisso,
    Slide02Arquitetura,
    Slide05Apex,
    Slide06Demandas,
    Slide07Portfolio,
    Slide08Incorporacao,
    Slide09Frentes,
    Slide10Poc,
    Slide11SeisMeses,
    Slide12Criterios,
    Slide13Conducao,
    Slide14Formalizacao,
    Slide15CidadeX,
    SlideAnexoQuery,
  ],
  config: [
    { label: 'O compromisso', actions: A01 },
    { label: 'Arquitetura', actions: A02 },
    { label: 'APEX', actions: A05 },
    { label: 'Demandas', actions: A06 },
    { label: 'Portfólio', actions: A07 },
    { label: 'Incorporação', actions: A08 },
    { label: 'Frentes', actions: A09 },
    { label: 'POC · 15/10', actions: A10 },
    { label: 'Seis meses', actions: A11 },
    { label: 'Critérios', actions: A12 },
    { label: 'Condução', actions: A13 },
    { label: 'Formalização', actions: A14 },
    { label: 'Cidade X', actions: A15 },
    { label: 'Anexo · Query', actions: ANEXO },
  ],
}
