import type { SlideProps } from '../config'
import { RECORTE, fmt } from './dados'
import { COR, Cartao, Numero, Pagina, Rotulo, delay } from './ui'

/**
 * Slide 3 — O recorte. Primeira das três provas do Builder: **o tamanho do
 * que foi provado**.
 *
 * Junta o que antes eram dois slides (o projeto e o funil) num quadro só:
 * uma cidade, trinta dias e os quatro totais que o banco recebeu. A ressalva
 * de que mais dados levam mais tempo fica na nota do slide 4, junto do tempo.
 *
 * Números do run de 25/10 (`dados.ts`).
 */

export const ACTIONS = ['O recorte']

const TOTAIS = [
  { rotulo: 'Dispositivos', valor: fmt(RECORTE.aparelhos), detalhe: 'do contrato, com imagem no mês' },
  { rotulo: 'Imagens', valor: fmt(RECORTE.imagens), detalhe: 'capturadas em campo' },
  { rotulo: 'Detecções', valor: fmt(RECORTE.deteccoes), detalhe: 'o que o Vision encontrou nelas' },
  { rotulo: 'Trechos de via', valor: fmt(RECORTE.trechos10m), detalhe: 'de 10 m, a malha da cidade' },
]

export default function Slide03Recorte(_: SlideProps) {
  return (
    <Pagina n={5} eyebrow='Builder' titulo={`${RECORTE.cidade}: uma cidade, ${RECORTE.dias} dias`}>
      <div className='flex items-baseline gap-[1.2vw] animate-ilum-in motion-reduce:animate-none' style={delay(0.1)}>
        <Rotulo>Período</Rotulo>
        <span className='text-[1.5vw] font-bold'>{RECORTE.periodo}</span>
        <span className='text-[1.1vw]' style={{ color: COR.cinza }}>
          IBGE {RECORTE.ibge}
        </span>
      </div>

      <div className='grid grid-cols-4 gap-[1.4vw]'>
        {TOTAIS.map((t, i) => (
          <Cartao
            key={t.rotulo}
            estado='aceso'
            className='px-[1.6vw] py-[1.6vw] animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.2 + i * 0.08)}
          >
            <Rotulo>{t.rotulo}</Rotulo>
            <span className='block mt-[0.4vw]'>
              <Numero>{t.valor}</Numero>
            </span>
            <span className='block mt-[0.5vw] text-[1.15vw]' style={{ color: COR.cinza }}>
              {t.detalhe}
            </span>
          </Cartao>
        ))}
      </div>

    </Pagina>
  )
}
