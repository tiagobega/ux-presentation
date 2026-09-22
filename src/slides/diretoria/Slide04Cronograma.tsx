import type { SlideProps } from '../config'
import { Cartao, Frame, Rotulo, Selo, Termo, delay, type Situacao } from './ui'

/**
 * Slide 4 — Cronograma.
 *
 * Cinco marcos numa linha que varre da esquerda para a direita, cada um com
 * data e uma linha do que é. As bolinhas vivem na **mesma grade dos cartões**,
 * com o mesmo `gap`: é isso que garante o alinhamento, já que com os cartões
 * numa grade o centro de cada um não cai em 10%, 30%, 50%… por causa dos vãos.
 *
 * **Duas datas são compromisso, três são janela.** 15/10 e FEV/27 vieram do
 * usuário; as outras três são derivadas da ordem dos marcos entre esses dois
 * âncoras. O rodapé diz isso na tela, porque uma janela derivada apresentada
 * como data vira compromisso na cabeça de quem ouve.
 */

interface Marco {
  nome: string
  data: string
  descricao: string
  situacao: Situacao
}

const MARCOS: Marco[] = [
  {
    nome: 'Levantamento',
    data: 'SET/26',
    descricao: 'Rotinas, dependências e riscos mapeados',
    situacao: 'feito',
  },
  {
    nome: 'Criação da base',
    data: 'SET → OUT/26',
    descricao: 'Padrões de dados, de integração e de desenvolvimento',
    situacao: 'agora',
  },
  {
    nome: 'POC · Uberlândia',
    data: '15/10/26',
    descricao: 'A base validada numa plataforma real',
    situacao: 'agora',
  },
  {
    nome: 'Adaptação de novos produtos',
    data: 'OUT/26 → JAN/27',
    descricao: 'Produtos migrados para a base comum',
    situacao: 'aSeguir',
  },
  {
    nome: 'Adaptação de plataformas',
    data: 'a partir de FEV/27',
    descricao: 'As plataformas dos projetos adotam a base',
    situacao: 'aSeguir',
  },
]

/** A bolinha do que já passou e do que está correndo é cheia; a futura, oca. */
const BOLINHA: Record<Situacao, string> = {
  feito: 'bg-[#7c3aed] border-[#7c3aed]',
  agora: 'bg-[#7c3aed] border-[#7c3aed]',
  aSeguir: 'bg-white border-[#c3aadc]',
}

const GRADE = 'grid grid-cols-5 gap-4 max-[900px]:grid-cols-2'

export const ACTIONS = ['Os marcos']

export default function Slide04Cronograma({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Cronograma'>
      <div className='flex flex-col gap-5'>
        <div className='relative max-[900px]:hidden'>
          <div
            className='absolute left-0 right-[9px] top-[7px] h-[2px] bg-[#c3aadc] origin-left animate-ilum-sweep motion-reduce:animate-none'
            style={delay(0.1)}
          />
          <svg
            className='absolute right-0 top-[1px] w-[10px] h-[14px] animate-ilum-fade motion-reduce:animate-none'
            viewBox='0 0 10 14'
            aria-hidden='true'
            style={delay(0.75)}
          >
            <path d='M0 0 L10 7 L0 14 Z' className='fill-[#c3aadc]' />
          </svg>

          <div className={GRADE}>
            {MARCOS.map((m, i) => (
              <div key={m.nome} className='flex justify-center'>
                <span
                  className={`w-4 h-4 rounded-full border-2 ${BOLINHA[m.situacao]} animate-ilum-pop motion-reduce:animate-none`}
                  style={delay(0.45 + i * 0.09)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={GRADE}>
          {MARCOS.map((m, i) => (
            <Cartao
              key={m.nome}
              estado={m.situacao === 'aSeguir' ? 'aceso' : 'atual'}
              className='px-5 py-6 animate-ilum-rise motion-reduce:animate-none'
              style={delay(0.62 + i * 0.09)}
            >
              <Selo situacao={m.situacao}>{m.data}</Selo>
              <span className='block mt-3'>
                <Termo>{m.nome}</Termo>
              </span>
              <p className='text-[clamp(11px,0.95vw,14px)] leading-[1.4] mt-2.5 text-[#64566f]'>
                {m.descricao}
              </p>
            </Cartao>
          ))}
        </div>

        <div className='text-center'>
          <Rotulo>15/10 E FEV/27 CONFIRMADAS · AS DEMAIS SÃO JANELAS DERIVADAS</Rotulo>
        </div>
      </div>
    </Frame>
  )
}
