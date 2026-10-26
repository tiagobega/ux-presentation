import type { SlideProps } from '../config'
import gabriel from '../../assets/equipe/gabriel-godoy.png'
import marco from '../../assets/equipe/marco-coimbra.png'
import rodrigo from '../../assets/equipe/rodrigo-siqueira.png'
import davi from '../../assets/equipe/davi-soares.png'
import tiago from '../../assets/equipe/tiago-bega.png'
import alan from '../../assets/equipe/alan-felix.png'
import { COR, Pagina } from './ui'

export const ACTIONS = ['A equipe']

const EQUIPE = [
  { nome: 'Gabriel Godoy', papel: 'Tech Leader', foto: gabriel },
  { nome: 'Marco Coimbra', papel: 'Desenvolvimento Back-end', foto: marco, posicao: '50% 12%' },
  { nome: 'Rodrigo Siqueira', papel: 'Desenvolvimento Back-end', foto: rodrigo },
  { nome: 'Davi Soares', papel: 'Banco de dados', foto: davi },
  { nome: 'Tiago Bega', papel: 'Desenvolvimento Front-end', foto: tiago },
  { nome: 'Alan Felix', papel: 'Consultoria de arquitetura', foto: alan },
]

/** Abertura: todas as pessoas aparecem juntas, sem hierarquia de senioridade. */
export default function Slide00Equipe(_: SlideProps) {
  return (
    <Pagina n={1} eyebrow='Equipe' titulo='Quem construiu o Ilum'>
      <div className='mx-auto grid w-[80vw] grid-cols-3 gap-x-[3vw] gap-y-[2.2vw]'>
        {EQUIPE.map(({ nome, papel, foto, posicao }) => (
          <article key={nome} className='flex flex-col items-center text-center'>
            <img
              src={foto}
              alt={nome}
              className='size-[10.5vw] object-cover'
              style={{ objectPosition: posicao ?? 'center', backgroundColor: COR.fundo }}
            />
            <h2 className='mt-[0.85vw] text-[1.5vw] font-bold leading-[1.2]' style={{ color: COR.ameixa }}>{nome}</h2>
            <p className='mt-[0.3vw] text-[1.05vw] leading-[1.35]' style={{ color: COR.cinza }}>{papel}</p>
          </article>
        ))}
      </div>
    </Pagina>
  )
}
