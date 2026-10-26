import { Cpu, MapPinned, Rocket, Ruler } from 'lucide-react'
import type { SlideProps } from '../config'
import { COR, Cartao, Pagina, Rotulo, delay } from './ui'

/**
 * Slide 9 — Próximos passos: Vision como próximo passo concreto; expansão
 * condicionada ao alinhamento de prioridades e capacidade da empresa.
 * Ainda não há projeto real operando pelo Ilum. Sem datas assumidas.
 */

export const ACTIONS = ['Os próximos passos']

const EXPANSAO = [
  { termo: 'Primeiros projetos', detalhe: 'Levar o Ilum à operação real', Icone: MapPinned },
  { termo: 'Deploy automático', detalhe: 'O Builder colocando os serviços no ar', Icone: Rocket },
  { termo: 'IRI', detalhe: 'Integrar o próximo processador', Icone: Ruler },
  { termo: 'Novos hardwares', detalhe: 'Conectar novas fontes de dados', Icone: Cpu },
]

export default function Slide08ASeguir(_: SlideProps) {
  return (
    <Pagina n={10} eyebrow='A seguir' titulo='Próximos passos'>
      <div className='grid grid-cols-[0.85fr_1.35fr] gap-[1.6vw]'>
        <Cartao
          estado='atual'
          className='px-[2.2vw] py-[2.2vw] flex flex-col justify-center gap-[1vw] animate-ilum-rise motion-reduce:animate-none'
          style={delay(0.15)}
        >
          <Rotulo cor='#ffffffb0'>01 · Roteamento</Rotulo>
          <span className='text-[2.2vw] font-bold leading-[1.15]'>Ligar o Vision e rotear os dados</span>
          <span className='text-[1.3vw] font-semibold text-white'>SABESP já está aguardando.</span>
          <span className='text-[1.15vw] leading-[1.5] text-white/80'>Validar o fluxo e as regras no primeiro projeto real.</span>
        </Cartao>

        <Cartao estado='aceso' className='px-[2.2vw] py-[2.2vw] flex flex-col gap-[1vw] animate-ilum-rise motion-reduce:animate-none' style={delay(0.2)}>
          <Rotulo cor={COR.malva}>02 · Expansão</Rotulo>
          <span className='text-[2vw] font-bold leading-[1.2]'>Alinhar a expansão ao planejamento da empresa</span>
          <p
            className='border-l-[0.3vw] px-[1.1vw] py-[0.9vw] text-[1.3vw] font-medium leading-[1.4]'
            style={{ borderColor: COR.ameixa, backgroundColor: COR.lavanda, color: COR.ameixa }}
          >
            O próximo passo exige <strong className='font-bold'>toda a empresa</strong> trabalhando na mesma direção.
          </p>
          <span className='text-[1.15vw] leading-[1.5]' style={{ color: COR.cinza }}>Definir prioridades e capacidade das equipes para avançar em:</span>
          <div className='mt-[0.5vw] grid grid-cols-2 gap-[0.8vw]'>
            {EXPANSAO.map(({ termo, detalhe, Icone }) => (
              <div key={termo} className='flex items-start gap-[0.9vw] border bg-white px-[1.1vw] py-[1.2vw]' style={{ borderColor: COR.borda }}>
                <Icone className='size-[1.8vw] shrink-0 mt-[0.1vw]' strokeWidth={1.5} style={{ color: COR.malva }} aria-hidden />
                <div>
                <span className='block text-[1.25vw] font-bold leading-[1.25]' style={{ color: COR.ameixa }}>{termo}</span>
                <span className='block mt-[0.5vw] text-[1vw] leading-[1.4]' style={{ color: COR.cinza }}>{detalhe}</span>
                </div>
              </div>
            ))}
          </div>
        </Cartao>
      </div>
    </Pagina>
  )
}
