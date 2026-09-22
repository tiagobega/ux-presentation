import type { SlideProps } from '../config'
import { Frame, Rotulo, delay } from './ui'

/**
 * O problema e o que muda.
 *
 * Dois painéis lado a lado desde o primeiro quadro: "hoje" já cheio, "com a
 * base comum" apagado. A segunda etapa só acende o segundo painel — nada se
 * move, e a comparação fica entre os dois desenhos, não entre dois slides.
 *
 * O desenho é o argumento: à esquerda os mesmos seis fundamentos aparecem três
 * vezes, uma por serviço; à direita eles aparecem uma vez só, embaixo dos três.
 */

const FUNDAMENTOS = [
  'Autenticação',
  'Componentes',
  'Formulários',
  'Tabelas',
  'Navegação',
  'Observabilidade',
]

const SERVICOS = ['Uberlândia', 'SABESP', 'Recape']

export const ACTIONS = ['Hoje', 'Com a base comum']

/** Bloco do diferencial: a única parte que é mesmo de cada serviço. */
function Diferencial({ nome, alto, aceso }: { nome: string; alto?: boolean; aceso: boolean }) {
  return (
    <div
      className={`rounded-md text-center text-[clamp(10px,0.9vw,13px)] font-semibold px-2 ${
        alto ? 'py-5' : 'py-2'
      } ${aceso ? 'bg-[#7c3aed] text-white' : 'bg-[#c9b6de] text-white'}`}
    >
      {nome}
    </div>
  )
}

export default function Slide01BaseComum({ action }: SlideProps) {
  const depois = action === ACTIONS[1]

  return (
    <Frame
      title='Cada serviço reconstrói o mesmo front-end'
      note='Três impactos: mais tempo e custo por produto, experiência e arquitetura inconsistentes entre soluções e dependência de engenharia para demos e customizações.'
    >
      <div className='grid grid-cols-2 gap-7 items-stretch max-[900px]:grid-cols-1'>
        {/* HOJE */}
        <section
          className='rounded-xl border border-[#c3aadc] bg-[#ffffff90] p-5 animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.1)}
        >
          <Rotulo>HOJE · UM FRONT-END POR SERVIÇO</Rotulo>
          <div className='grid grid-cols-3 gap-3'>
            {SERVICOS.map((s) => (
              <div key={s} className='flex flex-col gap-1.5'>
                <Diferencial nome={s} aceso />
                {FUNDAMENTOS.map((f) => (
                  <div
                    key={f}
                    className='rounded-md bg-[#f2e9fb] text-[#7a6689] text-center text-[clamp(9px,0.8vw,12px)] leading-none px-1 py-2'
                  >
                    {f}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.45] text-[#64566f] mt-4'>
            Os mesmos fundamentos reconstruídos a cada projeto.
          </p>
        </section>

        {/* COM A BASE COMUM */}
        <section
          className={`rounded-xl border p-5 transition-[opacity,background-color,border-color] duration-500 motion-reduce:transition-none ${
            depois ? 'opacity-100 border-[#7c3aed] bg-[#f3ebff]' : 'opacity-30 border-[#d9cfe2] bg-[#ffffff70]'
          }`}
        >
          <Rotulo>COM A BASE COMUM</Rotulo>
          <div className='grid grid-cols-3 gap-3'>
            {SERVICOS.map((s) => (
              <Diferencial key={s} nome={s} alto aceso={depois} />
            ))}
          </div>

          <p className='text-center text-[11px] tracking-[0.06em] text-[#7c3aed] py-2'>
            ↓ tudo que não é diferencial vem daqui
          </p>

          <div className='rounded-lg border border-[#7c3aed] bg-[#ffffffcc] p-3'>
            <span className='block text-[11px] tracking-[1.1px] text-[#5a3581] mb-2'>
              PLATAFORMA · BASE COMPARTILHADA
            </span>
            <div className='grid grid-cols-3 gap-1.5'>
              {FUNDAMENTOS.map((f) => (
                <div
                  key={f}
                  className='rounded-md bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(9px,0.8vw,12px)] leading-none px-1 py-2'
                >
                  {f}
                </div>
              ))}
            </div>
          </div>

          <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.45] text-[#5a3581] mt-4'>
            Um novo serviço passa a ser composição, não reconstrução.
          </p>
        </section>
      </div>

      <p
        className={`rounded-lg bg-[#e7dbf7] text-[#5a3581] text-center text-[clamp(13px,1.1vw,16px)] py-4 px-4 transition-opacity duration-500 motion-reduce:transition-none ${
          depois ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Engenharia deixa de reconstruir o básico e concentra esforço no diferencial de cada produto.
      </p>
    </Frame>
  )
}
