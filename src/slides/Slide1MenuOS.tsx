import { motion, AnimatePresence } from 'motion/react';
import { SLIDE_PADDING, type SlideProps } from './config';
import { osList } from './visionData';
import { Images, ImageOff, ArrowRight } from 'lucide-react';

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

export default function Slide1MenuOS({ selectedOS, onSelectOS, navBlocked }: SlideProps) {
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-8 min-h-0 overflow-hidden`}
    >
      <div>
        <motion.div
          {...up(0.0)}
          className='font-mono text-sm tracking-[0.2em] text-purple/45 mb-3 uppercase'
        >
          Passo 1 · Seleção
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className='text-[52px] font-bold leading-[1.02] text-text tracking-[-0.03em]'
        >
          Selecione uma{' '}
          <em className='not-italic text-purple'>Ordem de Serviço.</em>
        </motion.h1>
        <motion.p
          {...up(0.18)}
          className='mt-3 text-[18px] font-light text-text leading-[1.5]'
        >
          Escolha uma OS para iniciar a demonstração.
        </motion.p>
      </div>

      <div className='flex-1 min-h-0 grid grid-cols-2 gap-6 items-center'>
        {osList.map((os, i) => {
          const isSelected = selectedOS === i;
          return (
            <motion.div
              key={os.numero + i}
              {...up(0.3 + i * 0.12, easeIn)}
              className={`relative border p-9 flex flex-col gap-6 transition-all duration-300 ${
                os.pronta
                  ? isSelected
                    ? 'border-purple bg-purple/[0.08]'
                    : 'border-purple/30 bg-purple/[0.04]'
                  : 'border-text/10 bg-black/2 opacity-70'
              }`}
            >
              {os.pronta && (
                <div
                  className='absolute w-[320px] h-[320px] rounded-full top-[-130px] right-[-80px] pointer-events-none blur-[60px]'
                  style={{
                    background: isSelected
                      ? 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
                  }}
                />
              )}

              {/* badge "Selecionada" */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className='absolute top-4 right-4 font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-purple text-white'
                  >
                    Selecionada
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='relative z-[1] flex items-start justify-between gap-4'>
                <div>
                  <div className='font-mono text-[15px] tracking-[0.18em] text-text/40 uppercase mb-1'>
                    OS {os.numero}
                  </div>
                  <div className='text-[40px] font-bold text-text tracking-[-0.02em] leading-[1.05]'>
                    {os.nome}
                  </div>
                </div>
                {os.pronta ? (
                  <Images
                    className='size-10 flex-shrink-0'
                    style={{ color: isSelected ? 'rgba(139,92,246,0.8)' : 'rgba(139,92,246,0.5)' }}
                    strokeWidth={1.5}
                  />
                ) : (
                  <ImageOff
                    className='size-10 text-text/25 flex-shrink-0'
                    strokeWidth={1.5}
                  />
                )}
              </div>

              <div className='relative z-[1] grid grid-cols-2 gap-x-6 gap-y-3 text-[17px]'>
                <Info label='Origem' value={os.origem} />
                <Info label='Imagens vinculadas' value={String(os.imagens)} />
                <Info label='Status' value={os.status} accent={os.pronta} />
              </div>

              <div className='relative z-[1] mt-auto pt-2'>
                {os.pronta ? (
                  <button
                    onClick={() => onSelectOS(i)}
                    className='inline-flex items-center gap-2.5 bg-purple text-white px-7 py-3.5 rounded-lg text-[18px] font-semibold hover:bg-purple/90 transition-colors cursor-pointer'
                  >
                    Iniciar análise
                    <ArrowRight className='size-5' />
                  </button>
                ) : (
                  <div className='inline-flex items-center gap-2 border border-text/15 text-text/40 px-7 py-3.5 rounded-lg text-[18px] font-medium'>
                    Em breve
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Aviso ao tentar prosseguir sem selecionar */}
      <AnimatePresence>
        {navBlocked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className='absolute bottom-20 left-1/2 -translate-x-1/2 bg-text/90 text-white text-[14px] font-medium px-5 py-2.5 rounded-full pointer-events-none'
          >
            Selecione uma OS para continuar
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className='font-mono text-[12px] tracking-[0.12em] text-text/35 uppercase mb-0.5'>
        {label}
      </div>
      <div
        className={`text-[19px] font-semibold ${accent ? 'text-purple' : 'text-text/80'}`}
      >
        {value}
      </div>
    </div>
  );
}
