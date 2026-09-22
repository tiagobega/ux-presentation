import type { SlideProps } from '../config'
import { Cartao, Frame, Termo, delay } from './ui'

/**
 * Slide 3 — Como vamos fazer isso acontecer?
 *
 * As oito frentes que sustentam o que os dois slides anteriores mostraram.
 * Uma etapa só: a grade inteira entra escalonada quando a câmera chega, em vez
 * de uma frente por passo — oito passos transformariam a lista numa leitura em
 * voz alta.
 *
 * O parêntese de cada frente é o que ela é, não por que ela importa: continua
 * valendo a regra de não escrever na tela a justificativa, que é a fala.
 */

interface Frente {
  termo: string
  detalhe?: string
}

const FRENTES: Frente[] = [
  { termo: 'Design system' },
  { termo: 'Padrões de front-end', detalhe: 'arquitetura de projeto' },
  { termo: 'Registry', detalhe: 'biblioteca de componentes' },
  { termo: 'Microfront-ends', detalhe: 'produtos' },
  { termo: 'BI', detalhe: 'Lens' },
  { termo: 'Query', detalhe: 'IA assistente da aplicação inteira, não mais só do mapa' },
  { termo: 'Comunicação back e front', detalhe: 'padronizada' },
  { termo: 'Qualidade', detalhe: 'ferramentas de identificação de bugs e testes' },
]

export const ACTIONS = ['As frentes']

export default function Slide03ComoFazer({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Como vamos fazer isso acontecer?'>
      <div className='grid grid-cols-2 gap-4 max-[900px]:grid-cols-1'>
        {FRENTES.map((f, i) => (
          <Cartao
            key={f.termo}
            estado='aceso'
            className='px-6 py-5 flex items-baseline gap-3 flex-wrap animate-ilum-rise motion-reduce:animate-none'
            style={delay(0.1 + i * 0.07)}
          >
            <Termo>{f.termo}</Termo>
            {f.detalhe && (
              <span className='text-[clamp(12px,1.05vw,16px)] leading-[1.35] text-[#64566f]'>
                ({f.detalhe})
              </span>
            )}
          </Cartao>
        ))}
      </div>
    </Frame>
  )
}
