import { motion } from 'motion/react'
import { TriangleAlert } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from './kit'

/**
 * O ciclo do formulário, uma fase por step: quem controla o ritmo é a fala, não
 * um timer. Substitui o roteiro de demo passo a passo, porque esta plateia já
 * viu o fluxo em outro workshop.
 *
 * Os rótulos dos steps saem de `CICLO_ACOES`, importado pelo `deck.ts` para os
 * dois lados não saírem de sincronia.
 *
 * As estações são os status reais do produto (`formStatusData` do
 * informs_front, copiados em `src/data/informs.ts`), com os rótulos curtos.
 */

/** Cada estação é um status; a última é o retorno ao sistema de origem. */
const ESTACOES = [
  { nome: 'Pendente', cor: '#facc15', texto: 'text-yellow-600' },
  { nome: 'Em andamento', cor: '#0ea5e9', texto: 'text-sky-600' },
  { nome: 'Não enviado', cor: '#f97316', texto: 'text-orange-600' },
  { nome: 'Completo', cor: '#22c55e', texto: 'text-green-600' },
  { nome: 'Na origem', cor: '#7c3aed', texto: 'text-purple' },
]

const FASES: {
  acao: string
  estacao: number
  titulo: string
  detalhe: string
}[] = [
  {
    estacao: 0,
    acao: 'Chega na fila',
    titulo: 'Chega na fila',
    detalhe:
      'O sistema de origem cria o formulário com endereço, prioridade, prazo e responsável.',
  },
  {
    estacao: 1,
    acao: 'Inicia',
    titulo: 'O verificador inicia',
    detalhe: 'O horário de início fica registrado no formulário.',
  },
  {
    estacao: 1,
    acao: 'Preenche',
    titulo: 'Preenche sessão a sessão',
    detalhe: 'Cada resposta é salva no aparelho na hora, como rascunho.',
  },
  {
    estacao: 1,
    acao: 'Foto e validação',
    titulo: 'Anexa foto e valida',
    detalhe: 'O erro aparece na tela antes do envio, não na conferência.',
  },
  {
    estacao: 2,
    acao: 'Sem sinal',
    titulo: 'Terminou sem sinal',
    detalhe: 'Fica completo e não enviado, guardado no aparelho até dar.',
  },
  {
    estacao: 3,
    acao: 'Conexão volta',
    titulo: 'A conexão volta',
    detalhe: 'Sobe o preenchido com as fotos e o status vira completo.',
  },
  {
    estacao: 4,
    acao: 'Na origem',
    titulo: 'De volta na origem',
    detalhe: 'O sistema do projeto recebe respostas, fotos, horários e autoria.',
  },
]

/** Rótulos dos steps, na ordem das fases. */
export const CICLO_ACOES = FASES.map((f) => f.acao)

/** A trilha vai do centro da primeira estação ao centro da última. */
const INICIO = 100 / ESTACOES.length / 2
const EXTENSAO = 100 - INICIO * 2

export default function Slide05Ciclo({ action }: SlideProps) {
  const indice = FASES.findIndex((f) => f.acao === action)
  const fase = indice < 0 ? 0 : indice
  const atual = FASES[fase]
  const estacao = atual.estacao
  const progresso = (estacao / (ESTACOES.length - 1)) * EXTENSAO

  return (
    <SlideShell className='gap-8'>
      <SlideHeader
        eyebrow='O ciclo'
        title={
          <>
            Do que chega <Accent>ao que volta.</Accent>
          </>
        }
        lead='A mesma atividade, da hora em que aparece na fila até voltar preenchida para o sistema de origem.'
      />

      <div className='flex-1 min-h-0 flex flex-col justify-center gap-12'>
        <div className='relative pt-12'>
          {/* trilha */}
          <div
            className='absolute top-[59px] h-[3px] bg-text/10'
            style={{ left: `${INICIO}%`, width: `${EXTENSAO}%` }}
          />
          <motion.div
            className='absolute top-[59px] h-[3px]'
            style={{ left: `${INICIO}%`, background: ESTACOES[estacao].cor }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.7, ease: easeIn }}
          />

          {/* o formulário andando pela trilha */}
          <motion.div
            className='absolute top-0 -translate-x-1/2 flex flex-col items-center gap-2'
            animate={{ left: `${INICIO + progresso}%` }}
            transition={{ duration: 0.7, ease: easeIn }}
          >
            <span
              className='font-mono text-[20px] tracking-[0.06em] uppercase px-3 py-1 border bg-white whitespace-nowrap'
              style={{
                color: ESTACOES[estacao].cor,
                borderColor: ESTACOES[estacao].cor,
              }}
            >
              formulário
            </span>
            <span
              className='w-0 h-0 border-x-[7px] border-x-transparent border-t-[9px]'
              style={{ borderTopColor: ESTACOES[estacao].cor }}
            />
          </motion.div>

          {/* estações */}
          <div
            className='grid relative'
            style={{ gridTemplateColumns: `repeat(${ESTACOES.length}, minmax(0, 1fr))` }}
          >
            {ESTACOES.map((e, i) => {
              const alcancada = i <= estacao
              const aqui = i === estacao
              return (
                <div key={e.nome} className='flex flex-col items-center gap-4'>
                  <motion.span
                    className='w-[22px] h-[22px] rounded-full border-[3px] bg-white z-10'
                    animate={{
                      borderColor: alcancada ? e.cor : 'rgba(26,18,37,0.15)',
                      background: alcancada ? e.cor : '#ffffff',
                      scale: aqui ? 1.35 : 1,
                      boxShadow: aqui ? `0 0 0 8px ${e.cor}22` : '0 0 0 0px transparent',
                    }}
                    transition={{ duration: 0.4, ease: easeOut }}
                  />
                  <span
                    className={`font-mono text-[20px] tracking-[0.08em] uppercase text-center ${
                      alcancada ? e.texto : 'text-text/25'
                    }`}
                  >
                    {e.nome}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* legenda da fase, com altura fixa para nada pular */}
        <div className='border border-purple/20 bg-purple/[0.04] px-9 py-7 flex items-center gap-8 min-h-[168px]'>
          <span className='font-mono text-[20px] tracking-[0.1em] text-purple/40 shrink-0'>
            {String(fase + 1).padStart(2, '0')} / {FASES.length}
          </span>
          <motion.div key={fase} {...up(0, easeOut)} className='flex-1'>
            <div className='text-[38px] font-bold text-text tracking-[-0.03em] leading-[1.05]'>
              {atual.titulo}
            </div>
            <div className='text-[22px] text-text/60 leading-[1.4] mt-2'>
              {atual.detalhe}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...up(0.9, easeIn)}
        className='border border-purple/25 bg-purple/[0.05] px-8 py-5 flex items-center gap-5'
      >
        <TriangleAlert className='size-7 text-purple/60 shrink-0' strokeWidth={1.6} />
        <div className='flex-1'>
          <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.3]'>
            Ambiente demonstrativo. A URL final do produto será definida pela
            Intelicity.
          </div>
          <div className='font-mono text-[20px] tracking-[0.03em] text-purple/50 mt-1.5'>
            pwa-test.d2woj7njq3qi3q.amplifyapp.com
          </div>
        </div>
      </motion.div>
    </SlideShell>
  )
}
