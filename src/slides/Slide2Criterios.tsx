import { motion } from 'motion/react';
import { Filter, ScanSearch, Lightbulb } from 'lucide-react';
import { SLIDE_PADDING, type SlideProps } from './config';
import { LAYERS, criterios, criterios2, osList } from './visionData';
import type { ElementType } from 'react';

const LAYER_META: Record<
  string,
  { icon: ElementType; bg: string; border: string }
> = {
  bronze: {
    icon: Filter,
    bg: 'rgba(205,127,50,0.08)',
    border: 'rgba(205,127,50,0.30)',
  },
  prata: {
    icon: ScanSearch,
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.30)',
  },
  ouro: {
    icon: Lightbulb,
    bg: 'rgba(212,175,55,0.08)',
    border: 'rgba(212,175,55,0.30)',
  },
};

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide2Criterios({ action: _, selectedOS }: SlideProps) {
  const os = osList[selectedOS ?? 0];
  const crit = selectedOS === 1 ? criterios2 : criterios;
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-6 min-h-0 overflow-hidden justify-between`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className='font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase'
        >
          Passo 2 · Escopo
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className='text-[52px] font-bold leading-[1.05] text-text tracking-[-0.03em]'
        >
          OS selecionada:{' '}
          <em className='not-italic text-purple'>
            {os.nome} · {os.numero}
          </em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className='mt-3 text-[18px] font-light text-text leading-[1.5]'
        >
          Antes de analisar as imagens, o sistema entende o que precisa ser
          validado.
        </motion.p>
      </div>

      {/*  critérios avaliados */}
      <motion.div
        {...up(0.45, easeIn)}
        className='border border-text/10 bg-black/2 p-6 flex flex-col min-h-0'
      >
        <div className='font-mono text-md tracking-[0.16em] text-purple/70 uppercase mb-4'>
          Critérios de avaliação
        </div>

        <div className='grid grid-cols-5 gap-4'>
          {crit.map((c, i) => (
            <motion.div
              key={c.label}
              {...up(0.55 + i * 0.04, easeIn)}
              className='flex relative items-center gap-3 text-lg p-2 px-3 text-text/75 border border-purple/10 rounded-md '
            >
              <span className='font-mono text-purple/80'>
                {String(i + 1).padStart(2, '0')} |
              </span>
              {c.label}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className='flex w-full gap-8'>
        {/* camadas */}
        <motion.div {...up(0.5, easeIn)} className='flex flex-col gap-5 flex-1'>
          <div className='w-full flex gap-4 items-center'>
            <div className='flex-1 h-0.5 bg-text/20' />
            <div className='font-mono text-xl tracking-[0.16em] text-text/40 uppercase'>
              Camadas de análise
            </div>
            <div className='flex-1 h-0.5 bg-text/20' />
          </div>

          <div className='flex w-full gap-4 h-full'>
            {LAYERS.map((layer) => {
              const meta = LAYER_META[layer.key];
              const Icon = meta.icon;
              return (
                <div
                  key={layer.key}
                  className='flex flex-col flex-1 items-center gap-3 px-5 py-4 border h-full'
                  style={{ background: meta.bg, borderColor: meta.border }}
                >
                  <div
                    className='size-10 rounded-full flex items-center justify-center'
                    style={{ background: `${layer.color}22` }}
                  >
                    <Icon
                      className='size-5'
                      style={{ color: layer.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <span
                    className='text-[18px] font-bold tracking-[-0.01em]'
                    style={{ color: layer.color }}
                  >
                    {layer.name}
                  </span>
                  <span className='text-mds text-text/70 text-center leading-[1.4]'>
                    {layer.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className='h-full w-px bg-text/5'></div>

        {/* totais */}
        <motion.div {...up(0.5, easeIn)} className='flex flex-col gap-5'>
          <div className='w-full flex gap-4 items-center'>
            <div className='flex-1 h-0.5 bg-text/20' />
            <div className='font-mono text-xl tracking-[0.16em] text-text/40 uppercase'>
              Total
            </div>
            <div className='flex-1 h-0.5 bg-text/20' />
          </div>

          <motion.div
            {...up(0.4, easeIn)}
            className='grid grid-cols-2 gap-3 h-full'
          >
            {[
              { n: os.imagens, l: 'imagens recebidas' },
              { n: crit.length, l: 'critérios de avaliação' },
            ].map((q) => (
              <div
                key={q.l}
                className='border border-text/10 bg-black/2 px-5 py-5 text-center justify-center flex flex-col'
              >
                <div className='text-[44px] font-bold text-purple leading-none tracking-[-0.03em]'>
                  {q.n}
                </div>
                <div className='text-xl text-text/50 mt-2 leading-[1.3]'>
                  {q.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
