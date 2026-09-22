import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Termo, delay } from './ui'

/**
 * Slide 5 do plano — Continuidade do APEX. Arquétipo comparação.
 *
 * Quatro etapas na horizontal e, embaixo, a faixa que mostra até onde o APEX
 * segue operando. A faixa ocupa exatamente as três primeiras colunas da mesma
 * grade — é isso que faz ela terminar na homologação sem cálculo de
 * porcentagem.
 *
 * A quarta etapa tem borda tracejada: é condicionada à viabilidade, e a tela
 * não pode sugerir que a desativação já está decidida.
 */

const ETAPAS = ['Operação atual', 'Reconstrução em paralelo', 'Homologação', 'Substituição condicionada']

export const ACTIONS = ['A transição']

export default function Slide05Apex({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='APEX · Transição'>
      <div className='grid grid-cols-4 gap-4 max-[900px]:grid-cols-2'>
        {ETAPAS.map((e, i) => {
          const condicionada = i === ETAPAS.length - 1
          return (
            <Cartao
              key={e}
              estado='aceso'
              className={`px-5 py-7 animate-ilum-rise motion-reduce:animate-none ${
                condicionada ? 'border-dashed' : ''
              }`}
              style={delay(0.12 + i * 0.08)}
            >
              <span className='block text-[12px] font-[700] tracking-[0.1em] text-[#7c3aed] mb-3 [font-family:ui-monospace,monospace]'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <Termo>{e}</Termo>
            </Cartao>
          )
        })}

        {/* Na mesma grade das etapas: a faixa termina onde a homologação termina. */}
        <div
          className='col-span-3 rounded-lg bg-[#e7dbf7] px-6 py-4 animate-ilum-rise motion-reduce:animate-none max-[900px]:col-span-2'
          style={delay(0.46)}
        >
          <Rotulo>APEX EM OPERAÇÃO</Rotulo>
        </div>
      </div>
    </Frame>
  )
}
