import { motion } from 'motion/react';
import { SLIDE_PADDING, type SlideProps } from './config';
import { criterios, criterios2, resumo, resumo2, osList } from './visionData';
import { Check, Minus, AlertTriangle, MapPin, CheckCircle } from 'lucide-react';

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

const GREEN = '#2d9d63';
const AMBER = '#d59021';
const RED = '#e0524d';

function ResultIcon({ ok }: { ok: boolean | 'medio' }) {
  if (ok === true)
    return (
      <span
        className='w-6 h-6 rounded-full flex items-center justify-center'
        style={{ background: `${GREEN}1a`, color: GREEN }}
      >
        <Check className='size-4' strokeWidth={3} />
      </span>
    );
  if (ok === 'medio')
    return (
      <span
        className='w-6 h-6 rounded-full flex items-center justify-center'
        style={{ background: `${AMBER}1a`, color: AMBER }}
      >
        <AlertTriangle className='size-3.5' strokeWidth={2.5} />
      </span>
    );
  return (
    <span
      className='w-6 h-6 rounded-full flex items-center justify-center'
      style={{ background: 'rgba(26,18,37,0.05)', color: 'rgba(26,18,37,0.3)' }}
    >
      <Minus className='size-4' strokeWidth={2.5} />
    </span>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide4Output({ action: _, selectedOS }: SlideProps) {
  const crit = selectedOS === 1 ? criterios2 : criterios;
  const res = selectedOS === 1 ? resumo2 : resumo;
  const os = osList[selectedOS ?? 0];
  return (
    <div
      className={`${SLIDE_PADDING} flex-1 flex flex-col gap-10 min-h-0 overflow-hidden`}
    >
      {/* Top row: header left + stats right */}
      <div className='flex items-end gap-6'>
        <div className='flex-1'>
          <motion.div
            {...up(0.0)}
            className='font-mono text-sm tracking-[0.2em] text-purple/45 mb-2 uppercase'
          >
            Passo 4 · Output
          </motion.div>
          <motion.h1
            {...up(0.08)}
            className='text-[42px] font-bold leading-[1.04] text-text tracking-[-0.03em]'
          >
            Output da <em className='not-italic text-purple'>análise.</em>
          </motion.h1>
          <motion.p
            {...up(0.16)}
            className='mt-1 text-[16px] font-light text-text/50'
          >
            Critérios preenchidos automaticamente com base nas evidências.
          </motion.p>
        </div>

        {/* Totais – topo direito */}
        <motion.div
          {...up(0.2, easeIn)}
          className='flex-shrink-0 flex gap-2 pt-1'
        >
          <Stat n={res.aceitas} l='Critérios aceitos' color={GREEN} />
          <Stat n={res.medias} l='Critérios parciais' color={AMBER} />
          <Stat n={res.recusadas} l='Critérios recusados' color={RED} />
          <Stat n={res.pendencias} l='Critérios pendentes' color='#64748b' />
          <StatusCard status={res.status} />
        </motion.div>
      </div>

      {/* Tabela de critérios – largura total */}
      <motion.div
        {...up(0.25, easeIn)}
        className='flex-1 min-h-0 flex flex-col'
      >
        <div className='grid grid-cols-2 gap-x-12'>
          <div className='grid grid-cols-[1fr_120px_1fr] gap-4 px-4 pb-2 border-b border-text/10 font-mono text-[11px] tracking-[0.14em] text-purple/45 uppercase'>
            <div>Critério</div>
            <div className='text-center w-16'>Resultado</div>
            <div>Observação</div>
          </div>

          <div className='grid grid-cols-[1fr_120px_1fr] gap-4 px-4 pb-2 border-b border-text/10 font-mono text-[11px] tracking-[0.14em] text-purple/45 uppercase'>
            <div>Critério</div>
            <div className='text-center w-16'>Resultado</div>
            <div>Observação</div>
          </div>
        </div>

        <div className='flex-1 grid grid-cols-2 gap-x-12 justify-between py-1'>
          {crit.map((c, i) => (
            <motion.div
              key={c.label}
              {...up(0.3 + i * 0.028, easeIn)}
              className='grid grid-cols-[1fr_120px_1fr] gap-4 px-4 items-center border-b border-text/[0.05]'
            >
              <div className='text-[15px] font-medium text-text/85'>
                {c.label}
              </div>
              <div className='w-16 flex justify-center'>
                <ResultIcon ok={c.ok} />
              </div>
              <div
                style={{
                  color:
                    c.ok === true
                      ? 'rgba(26,18,37,0.55)'
                      : c.ok === 'medio'
                        ? `${AMBER}cc`
                        : 'rgba(26,18,37,0.35)',
                }}
              >
                {c.obs}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rodapé: alerta material + callout */}
      <div className='flex gap-4'>
        <motion.div
          {...up(0.55, easeIn)}
          className='flex-1 border-l-2 border-[#2d9d63]/50 bg-[#2d9d63]/[0.05] px-5 py-3 flex gap-3 items-center'
        >
          <MapPin className='size-5 flex-shrink-0' style={{ color: GREEN }} />
          <div className='flex-1 min-w-0 gap-1 flex flex-col'>
            <div className='flex items-center gap-4 mb-0.5'>
              <div className=' font-semibold text-text/85'>
                Validação de localização
              </div>
              <span
                className='flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-semibold tracking-wide'
                style={{ background: `${GREEN}1a`, color: GREEN }}
              >
                <CheckCircle className='size-3' strokeWidth={2.5} />
                {res.localizacao.status}
              </span>
            </div>
            <div className='text-sm text-text/50 leading-[1.4]'>
              {os.endereco}
              <span className='mx-2 opacity-40'>·</span>
              <span className='font-mono'>
                {os.lat}°, {os.lng}°
              </span>
              <span className='mx-2 opacity-40'>·</span>
              Metadados EXIF das imagens
            </div>
          </div>
        </motion.div>

        <motion.div
          {...up(0.68, easeIn)}
          className='flex-1 border border-purple/20 bg-purple/[0.04] px-5 py-3 flex items-center'
        >
          <div className='text-[17px] font-bold text-text tracking-[-0.01em] leading-[1.3]'>
            O IC Vision transforma imagens em{' '}
            <span className='text-purple'>output operacional preenchido.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('reprov')) return RED;
  if (s.includes('parcial') || s.includes('pendente')) return AMBER;
  if (s.includes('aprov') || s.includes('válido') || s.includes('valido')) return GREEN;
  return '#8b5cf6';
}

function StatusCard({ status }: { status: string }) {
  const color = statusColor(status);
  return (
    <div
      className='px-4 py-3 flex flex-col justify-center min-w-[100px] border'
      style={{ borderColor: `${color}40`, background: `${color}0d` }}
    >
      <div
        className='font-mono text-[10px] tracking-[0.14em] uppercase mb-1'
        style={{ color: `${color}99` }}
      >
        Status
      </div>
      <div className='text-[14px] font-bold leading-[1.2]' style={{ color }}>
        {status}
      </div>
    </div>
  );
}

function Stat({ n, l, color }: { n: number; l: string; color: string }) {
  return (
    <div className='border border-text/10 bg-black/2 px-4 py-3 min-w-[90px]'>
      <div
        className='text-[32px] font-bold leading-none tracking-[-0.03em]'
        style={{ color }}
      >
        {n}
      </div>
      <div className='text-[11px] text-text/50 mt-1 leading-[1.25]'>{l}</div>
    </div>
  );
}
