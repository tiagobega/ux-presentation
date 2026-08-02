import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Gauge, ChartColumnBig, Table2, TrendingUp } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, up, easeIn, easeOut } from './kit'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: Gauge,
    titulo: 'KPIs da operação',
    texto: 'Cards com o número que importa antes de qualquer clique.',
  },
  {
    Icon: ChartColumnBig,
    titulo: 'Gráficos por tipo de dispositivo',
    texto: 'Quanto de Jetson, quanto de GeoBox, em que condição.',
  },
  {
    Icon: Table2,
    titulo: 'Comparação de frota',
    texto: 'Contratos e centros de custo lado a lado, na mesma régua.',
  },
  {
    Icon: TrendingUp,
    titulo: 'Evolução e metas',
    texto: 'Progresso diário de dispositivos e avanço das metas.',
  },
]

const kpis = [
  { label: 'Instalados', valor: '412' },
  { label: 'A instalar', valor: '86' },
  { label: 'Manutenção', valor: '19' },
  { label: 'Alertas open', valor: '7' },
]

const barras = [62, 84, 48, 71, 93, 57, 78]

export default function Slide06Dashboard({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Módulo · Dashboard'
        title={
          <>
            A tela de <Accent>abertura de dia</Accent> do gestor.
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[440px_1fr] gap-10 items-center'>
        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.28 + i * 0.1, easeIn)}
              className='border-l-2 border-purple/40 bg-purple/[0.04] px-5 py-4 flex items-start gap-4'
            >
              <p.Icon
                className='size-6 text-purple/55 shrink-0 mt-1'
                strokeWidth={1.6}
              />
              <div>
                <div className='text-[20px] font-bold text-text/90 tracking-[-0.02em] leading-[1.2]'>
                  {p.titulo}
                </div>
                <div className='text-[15px] text-text/55 leading-[1.45] mt-1'>
                  {p.texto}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* maquete da tela */}
        <motion.div
          {...up(0.4, easeIn)}
          className='border border-text/10 bg-white/50 p-8 flex flex-col gap-6'
        >
          <div className='grid grid-cols-4 gap-4'>
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.6 + i * 0.09 }}
                className='border border-purple/15 bg-purple/[0.03] px-5 py-4'
              >
                <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
                  {k.label}
                </div>
                <div className='text-[38px] font-bold text-text tracking-[-0.03em] leading-[1.1] mt-1'>
                  {k.valor}
                </div>
              </motion.div>
            ))}
          </div>

          <div className='grid grid-cols-[1fr_320px] gap-6 items-end'>
            {/* barras por tipo */}
            <div className='border border-text/8 bg-black/[0.015] p-5'>
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase mb-4'>
                Dispositivos por tipo
              </div>
              <div className='h-[132px] flex items-end gap-3'>
                {barras.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${b}%` }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: 0.95 + i * 0.07,
                    }}
                    className='flex-1 bg-gradient-to-t from-purple/45 to-purple/15'
                  />
                ))}
              </div>
            </div>

            {/* comparação de frota */}
            <div className='border border-text/8 bg-black/[0.015] p-5 flex flex-col gap-3'>
              <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
                Comparação de frota
              </div>
              {[88, 64, 41].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.12 }}
                  className='flex items-center gap-3'
                >
                  <div className='h-2.5 w-[70px] bg-text/10 shrink-0' />
                  <div className='h-2.5 flex-1 bg-text/[0.06]'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{
                        duration: 0.7,
                        ease: easeOut,
                        delay: 1.3 + i * 0.12,
                      }}
                      className='h-full bg-purple/40'
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  )
}
