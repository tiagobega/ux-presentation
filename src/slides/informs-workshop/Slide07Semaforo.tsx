import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { CircleCheckBig, CircleHelp, CircleX } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, easeIn, easeOut } from './kit'

/**
 * O slide de decisão do workshop: verde, amarelo e vermelho, um por step.
 * As classes de cor vão escritas por extenso porque o Tailwind só gera o que
 * encontra no código.
 */
const luzes: {
  Icon: LucideIcon
  luz: string
  kicker: string
  titulo: string
  borda: string
  fundo: string
  texto: string
  ponto: string
  itens: string[]
  frase: string
}[] = [
  {
    Icon: CircleCheckBig,
    luz: 'bg-emerald-500',
    kicker: 'Verde',
    titulo: 'Informs é a primeira opção',
    borda: 'border-emerald-500/35',
    fundo: 'bg-emerald-500/[0.05]',
    texto: 'text-emerald-600',
    ponto: 'bg-emerald-500/60',
    itens: [
      'Existe atividade, vistoria ou serviço em campo',
      'O usuário recebe uma demanda e devolve um resultado',
      'O trabalho é preencher dados, registrar evidência e concluir ou cancelar',
      'Localização, prioridade ou responsável fazem parte da demanda',
      'Operar offline é importante',
      'O layout padrão do Informs atende',
      'O projeto cria demandas e consome resultados por integração',
    ],
    frase:
      'Se o problema é levar regra de negócio para o campo, comece por Informs.',
  },
  {
    Icon: CircleHelp,
    luz: 'bg-amber-500',
    kicker: 'Amarelo',
    titulo: 'Precisa de avaliação de produto',
    borda: 'border-amber-500/35',
    fundo: 'bg-amber-500/[0.05]',
    texto: 'text-amber-600',
    ponto: 'bg-amber-500/60',
    itens: [
      'Há regra específica de status',
      'Existe geofencing específico',
      'Há fluxo especial de aprovação ou cancelamento',
      'O projeto precisa consumir o rastreamento',
      'A integração é mais complexa que criar e receber',
      'A necessidade ainda não existe no Informs, mas serve a outros projetos',
      'Há dúvida se aquilo deve virar capacidade do produto',
    ],
    frase:
      'Entra no Informs o que melhora o produto, não o que atende um cliente só.',
  },
  {
    Icon: CircleX,
    luz: 'bg-red-500',
    kicker: 'Vermelho',
    titulo: 'Provavelmente é outro aplicativo',
    borda: 'border-red-500/35',
    fundo: 'bg-red-500/[0.05]',
    texto: 'text-red-600',
    ponto: 'bg-red-500/60',
    itens: [
      'O layout específico é requisito do projeto',
      'O cliente exige identidade visual própria ou white-label',
      'A URL e o domínio precisam ser próprios por cliente',
      'Há várias telas próprias de domínio',
      'O mapa é a interface principal do produto',
      'Filtros, cards e navegação são muito específicos',
      'O fluxo deixa de ser receber, executar e devolver',
    ],
    frase: 'Informs é um produto, não um template infinito de aplicativos.',
  },
]

export default function Slide07Semaforo({ action }: SlideProps) {
  const passo = luzes.findIndex((l) => l.kicker === action)
  const atual = passo < 0 ? 0 : passo

  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='A decisão'
        title={
          <>
            Usar, avaliar <Accent>ou construir outra coisa.</Accent>
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-3 gap-5'>
        {luzes.map((l, i) => {
          const visivel = i <= atual
          return (
            <motion.div
              key={l.kicker}
              initial={false}
              animate={{ opacity: visivel ? 1 : 0, y: visivel ? 0 : 14 }}
              transition={{ duration: 0.45, ease: easeIn }}
              className={`border ${l.borda} ${l.fundo} p-6 flex flex-col gap-3.5`}
            >
              <div className='flex items-center gap-3'>
                <span className='flex flex-col gap-1.5'>
                  {luzes.map((o, k) => (
                    <span
                      key={o.kicker}
                      className={`w-2 h-2 rounded-full ${
                        k === i ? o.luz : 'bg-text/12'
                      }`}
                    />
                  ))}
                </span>
                <l.Icon className={`size-7 ${l.texto} shrink-0`} strokeWidth={1.6} />
                <span
                  className={`font-mono text-[20px] tracking-[0.12em] uppercase ${l.texto}`}
                >
                  {l.kicker}
                </span>
              </div>

              <div className='text-[26px] font-bold text-text tracking-[-0.025em] leading-[1.05]'>
                {l.titulo}
              </div>

              <div className='flex flex-col gap-2'>
                {l.itens.map((item, j) => (
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
                      className={`w-1.5 h-1.5 rounded-full ${l.ponto} shrink-0 mt-2`}
                    />
                    <span className='text-[20px] text-text/70 leading-[1.3]'>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div
                className={`mt-auto pt-4 border-t ${l.borda} text-[20px] font-bold text-text/85 leading-[1.25] tracking-[-0.01em]`}
              >
                {l.frase}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: atual === 2 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: easeIn, delay: atual === 2 ? 0.5 : 0 }}
        className='border border-purple/25 bg-purple/[0.05] px-8 py-4'
      >
        <div className='font-mono text-[20px] tracking-[0.12em] text-purple/60 uppercase mb-1'>
          O limite
        </div>
        <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.3]'>
          Personalizar o formulário é esperado. Personalizar produto, layout e
          navegação é outro escopo.
        </div>
      </motion.div>
    </SlideShell>
  )
}
