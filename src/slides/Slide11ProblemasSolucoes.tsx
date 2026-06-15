import { motion } from 'motion/react';
import { SLIDE_PADDING, type SlideProps } from './config';
import type { LucideIcon } from 'lucide-react';
import {
  Layers,
  BarChart2,
  MousePointerClick,
  Clock,
  Megaphone,
  Boxes,
  ArrowDown,
} from 'lucide-react';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (
  delay: number,
  ease: [number, number, number, number] = easeOut,
) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const cards: { Icon: LucideIcon; problema: string; solucao: string }[] = [
  {
    Icon: Layers,
    problema: 'Produtos com experiências diferentes e confusas.',
    solucao:
      'Design System, padrões de interface e diretrizes comuns de experiência.',
  },
  {
    Icon: BarChart2,
    problema: 'Dados exibidos sem narrativa de decisão.',
    solucao: 'Interfaces orientadas por contexto, prioridade e ação.',
  },
  {
    Icon: MousePointerClick,
    problema: 'Fluxos importantes com baixa conclusão.',
    solucao: 'Jornadas guiadas, validações claras e testes de uso.',
  },
  {
    Icon: Clock,
    problema: 'Valor do produto demorando para aparecer.',
    solucao:
      'Demos, onboarding e experiências focadas em percepção rápida de valor.',
  },
  {
    Icon: Megaphone,
    problema: 'Comunicação comercial discrepante com produto.',
    solucao:
      'Narrativa de produto alinhada entre marketing, comercial e aplicação.',
  },
  {
    Icon: Boxes,
    problema: 'Ecossistema sem uma lógica clara.',
    solucao:
      'Stack IC como proposta de branding para conectar projetos, produtos e comunicação.',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide11ProblemasSolucoes({ action: _ }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-12 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className='font-mono text-sm tracking-[0.2em] text-purple/45 mb-4 uppercase'
        >
          UX e Branding · Respostas
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className='text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]'
        >
          Problemas atuais.{' '}
          <em className='not-italic text-purple'>Respostas possíveis.</em>
        </motion.h1>
      </div>
      <div className='flex flex-1 items-center'>
        <div className='min-h-0 grid grid-cols-3 gap-8 items-center'>
          {cards.map((c, i) => (
            <motion.div
              key={c.problema}
              {...up(0.25 + i * 0.08, easeIn)}
              className='border border-text/8 bg-black/2 p-5 flex flex-col gap-2.5'
            >
              <div className='flex items-center gap-2.5'>
                <c.Icon
                  className='size-7 text-red-500/60 flex-shrink-0'
                  strokeWidth={1.5}
                />
                <div className='text-[20px] font-semibold leading-[1.35] text-red-500/70 tracking-[-0.01em]'>
                  {c.problema}
                </div>
              </div>
              <div className='flex items-center gap-2 py-1'>
                <div className='flex-1 h-px bg-purple/20' />
                <ArrowDown className='size-3 text-purple/40 flex-shrink-0' />
                <div className='flex-1 h-px bg-purple/20' />
              </div>

              <div className=' text-2xl leading-[1.5]'>{c.solucao}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div {...up(0.85, easeIn)} className=' text-center'>
        <div className='text-[26px] font-bold text-text tracking-[-0.02em]'>
          Os problemas não são isolados.{' '}
          <span className='text-purple'>As soluções também não podem ser.</span>
        </div>
      </motion.div>
    </div>
  );
}
