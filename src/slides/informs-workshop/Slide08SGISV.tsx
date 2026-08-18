import { motion } from 'motion/react'
import { CircleCheckBig, CircleX } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, easeIn, easeOut } from './kit'

/**
 * O caso concreto que separa parametrizar de construir. Fonte: documentação
 * técnica e projeto de telas do app de campo Tapa-Buraco (SGISV, Uberlândia).
 */
const cabe = [
  'Executar o serviço com horário de início e término',
  'Cancelar com motivo estruturado',
  'Justificativa em texto e foto de evidência',
  'Fotos de antes, de depois e extras, com limite',
  'Dimensões do buraco em linhas repetíveis',
  'Salvar a execução sem concluir',
  'Informar o serviço como concluído',
  'Trabalhar offline em bairro sem sinal',
  'Subir tudo em pacote quando a conexão volta',
]

const passa = [
  'Home própria orientada por mapa',
  'O mapa como interface principal do produto',
  'Pins coloridos por status, com posição e heading',
  'Busca por logradouro e camadas de mapa e satélite',
  'Ação disparada direto no pin',
  'Filtros e cards próprios de ordem de serviço',
  'Criar OS com pin arrastável, no padrão do Uber',
  'Cerca de 5.000 OS abertas, com pico de 10.000 pontos',
  'Clustering, viewport ou camadas vetoriais no mapa',
]

const colunas = [
  {
    Icon: CircleCheckBig,
    kicker: 'Caberia bem no Informs',
    resumo: 'É receber a demanda, executar em campo e devolver o resultado.',
    borda: 'border-emerald-500/35',
    fundo: 'bg-emerald-500/[0.05]',
    texto: 'text-emerald-600',
    ponto: 'bg-emerald-500/60',
    itens: cabe,
  },
  {
    Icon: CircleX,
    kicker: 'Passaria do limite',
    resumo: 'É um produto com telas, navegação e desempenho próprios.',
    borda: 'border-red-500/35',
    fundo: 'bg-red-500/[0.05]',
    texto: 'text-red-600',
    ponto: 'bg-red-500/60',
    itens: passa,
  },
]

export default function Slide08SGISV({ action }: SlideProps) {
  const limite = action !== 'O que caberia'

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Estudo de caso · SGISV Tapa-Buraco'
        title={
          <>
            O que caberia no Informs{' '}
            <Accent>e o que passaria do limite.</Accent>
          </>
        }
        lead='App de campo de zeladoria de pavimento em Uberlândia, PWA Android-first, integrado ao Apex.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-2 gap-6'>
        {colunas.map((c, i) => {
          const visivel = i === 0 || limite
          return (
            <motion.div
              key={c.kicker}
              initial={false}
              animate={{ opacity: visivel ? 1 : 0, y: visivel ? 0 : 14 }}
              transition={{ duration: 0.45, ease: easeIn }}
              className={`border ${c.borda} ${c.fundo} p-8 flex flex-col gap-4`}
            >
              <div className='flex items-center gap-3'>
                <c.Icon className={`size-7 ${c.texto} shrink-0`} strokeWidth={1.6} />
                <span className='text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.05]'>
                  {c.kicker}
                </span>
              </div>
              <div className='text-[20px] text-text/55 leading-[1.35] -mt-1'>
                {c.resumo}
              </div>

              <div className='flex flex-col gap-2.5 mt-1'>
                {c.itens.map((item, j) => (
                  <motion.div
                    key={item}
                    initial={false}
                    animate={{ opacity: visivel ? 1 : 0, x: visivel ? 0 : 8 }}
                    transition={{
                      duration: 0.32,
                      ease: easeOut,
                      delay: visivel ? 0.2 + j * 0.06 : 0,
                    }}
                    className='flex items-start gap-3'
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${c.ponto} shrink-0 mt-2`}
                    />
                    <span className='text-[20px] text-text/70 leading-[1.35]'>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: limite ? 1 : 0, y: limite ? 0 : 10 }}
        transition={{ duration: 0.45, ease: easeIn, delay: limite ? 0.6 : 0 }}
      >
        <Punch delay={0}>
          A execução de campo do SGISV o Informs resolve. Essa home, esse mapa e
          esses filtros já são outro produto.
        </Punch>
      </motion.div>
    </SlideShell>
  )
}
