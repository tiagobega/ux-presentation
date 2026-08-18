import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutTemplate,
  Layers,
  ListChecks,
  ShieldCheck,
  MapPin,
  CircleX,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Bar, Accent, up, easeIn, easeOut } from './kit'

/**
 * O painel de controle do projeto e o caminho de entrada de um sistema novo.
 * O caminho é o que o GAIA já faz hoje (ADR-0010 do informs-back): o sistema
 * de origem publica template e formulários pela API e recebe o preenchido de
 * volta por POST em lote, com checkpoint por sistema e retry automático.
 */

const controles: { Icon: LucideIcon; nome: string; detalhe: string }[] = [
  {
    Icon: LayoutTemplate,
    nome: 'Template',
    detalhe: 'Nome, sistema, sessões, e ativar ou desativar sem apagar o histórico.',
  },
  {
    Icon: Layers,
    nome: 'Sessões',
    detalhe: 'A ordem delas e quais podem ser duplicadas pelo verificador no campo.',
  },
  {
    Icon: ListChecks,
    nome: 'Campos',
    detalhe: '10 tipos de coleta e 4 informativos: texto, imagem, mapa e link.',
  },
  {
    Icon: ShieldCheck,
    nome: 'Validação',
    detalhe: 'Obrigatório, formato, mínimo e máximo, opções da lista, quantidade de fotos.',
  },
  {
    Icon: MapPin,
    nome: 'Cada formulário',
    detalhe: 'Localização, prioridade, prazo e quem vai executar.',
  },
  {
    Icon: CircleX,
    nome: 'Cancelamento',
    detalhe: 'Os motivos aceitos e o que cada um exige de texto ou de foto.',
  },
]

const entrada = [
  {
    nome: 'Entra na lista de sistemas',
    detalhe: 'GAIA, Porto Alegre, Recife e SABESP já estão lá. O seu vira mais um.',
  },
  {
    nome: 'Publica o template pela API',
    detalhe: 'Sessões e campos por payload. Sem release e sem app novo.',
  },
  {
    nome: 'Cria os formulários',
    detalhe: 'Uma chamada por demanda, com endereço, prioridade, prazo e responsável.',
  },
  {
    nome: 'Recebe o preenchido',
    detalhe:
      'O Informs faz POST no endpoint do seu sistema, em lote, com checkpoint e retry.',
  },
]

export default function Slide03Controle({ action }: SlideProps) {
  const comoEntra = action !== 'O que vocês controlam'

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='O que fica na sua mão'
        title={
          <>
            Vocês desenham o formulário. <Accent>O Informs executa.</Accent>
          </>
        }
        lead='Nada aqui depende do time do Informs. É o sistema de origem que decide, pela API, e muda quando quiser.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1.15fr_1fr] gap-6'>
        <motion.div
          {...up(0.3, easeIn)}
          className='border border-purple/20 bg-purple/[0.04] p-7 flex flex-col gap-4'
        >
          <div className='font-mono text-[20px] tracking-[0.12em] text-purple/60 uppercase'>
            Vocês controlam
          </div>
          {controles.map((c, i) => (
            <motion.div
              key={c.nome}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: easeOut, delay: 0.5 + i * 0.09 }}
              className='flex items-start gap-4'
            >
              <c.Icon
                className='size-7 text-purple/55 shrink-0 mt-0.5'
                strokeWidth={1.6}
              />
              <div>
                <span className='text-[22px] font-bold text-text/90 tracking-[-0.02em]'>
                  {c.nome}
                </span>
                <div className='text-[20px] text-text/60 leading-[1.3] mt-0.5'>
                  {c.detalhe}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: comoEntra ? 1 : 0, y: comoEntra ? 0 : 14 }}
          transition={{ duration: 0.45, ease: easeIn }}
          className='border border-text/10 bg-black/[0.02] p-7 flex flex-col gap-4'
        >
          <div className='font-mono text-[20px] tracking-[0.12em] text-text/40 uppercase'>
            Como um projeto novo entra
          </div>
          {entrada.map((e, i) => (
            <motion.div
              key={e.nome}
              initial={false}
              animate={{ opacity: comoEntra ? 1 : 0, x: comoEntra ? 0 : 8 }}
              transition={{
                duration: 0.35,
                ease: easeOut,
                delay: comoEntra ? 0.25 + i * 0.12 : 0,
              }}
              className='flex items-start gap-4'
            >
              <span className='font-mono text-[20px] text-purple/45 shrink-0 mt-1'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className='text-[22px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                  {e.nome}
                </div>
                <div className='text-[20px] text-text/60 leading-[1.3] mt-1'>
                  {e.detalhe}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: comoEntra ? 1 : 0, y: comoEntra ? 0 : 10 }}
        transition={{ duration: 0.45, ease: easeIn, delay: comoEntra ? 0.7 : 0 }}
      >
        <Bar kicker='Já tem precedente' delay={0}>
          É o mesmo caminho que o GAIA faz hoje com o Apex. Sistema novo é
          configuração e contrato, não aplicativo novo.
        </Bar>
      </motion.div>
    </SlideShell>
  )
}
