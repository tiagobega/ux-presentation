import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  Boxes,
  SquareStack,
  Layers,
  Image as ImageIcon,
  MapPin,
  Users,
  Car,
  BadgeCheck,
} from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Accent, Bar, up, easeIn, easeOut } from './kit'

const pontos: { Icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    Icon: Boxes,
    titulo: 'Catálogo por tipo e versão',
    texto:
      'Jetson e GeoBox organizados por versão, com flag visual quando a versão exige atenção.',
  },
  {
    Icon: SquareStack,
    titulo: 'Cards específicos por tipo',
    texto:
      'O layout de uma Jetson não é o de uma GeoBox — cada hardware mostra o que só ele tem.',
  },
  {
    Icon: Layers,
    titulo: 'Mapa e camadas',
    texto:
      'Imagens da Jetson, GPS da GeoBox, cada fonte em uma camada que se liga e desliga.',
  },
]

const camadas = [
  { Icon: ImageIcon, label: 'Imagens · Jetson', on: true },
  { Icon: MapPin, label: 'GPS · GeoBox', on: true },
  { Icon: Layers, label: 'Rota do dia', on: false },
]

export default function Slide07Dispositivos({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Dispositivos'
        title={
          <>
            O <Accent>coração operacional</Accent> da plataforma.
          </>
        }
      />

      <div className='flex-1 min-h-0 grid grid-cols-[1fr_600px] gap-10 items-center'>
        <div className='flex flex-col gap-4'>
          {pontos.map((p, i) => (
            <motion.div
              key={p.titulo}
              {...up(0.28 + i * 0.1, easeIn)}
              className='border border-text/10 bg-black/2 p-6 flex items-start gap-5'
            >
              <p.Icon
                className='size-8 text-purple/55 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[22px] font-bold text-text/90 tracking-[-0.02em] leading-[1.15]'>
                  {p.titulo}
                </div>
                <div className='text-[16px] text-text/55 leading-[1.5] mt-1.5'>
                  {p.texto}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* maquete do painel de preview do device */}
        <motion.div
          {...up(0.45, easeIn)}
          className='border border-text/10 bg-white/50 flex flex-col'
        >
          <div className='px-7 py-5 border-b border-text/8 flex items-center justify-between'>
            <div>
              <div className='font-mono text-[11px] tracking-[0.12em] text-purple/50'>
                JETSON_000001
              </div>
              <div className='text-[24px] font-bold text-text tracking-[-0.02em] leading-[1.15] mt-1'>
                Jetson · v2.4
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.75 }}
              className='flex items-center gap-2 border border-purple/30 bg-purple/[0.08] px-3.5 py-2'
            >
              <span className='size-2.5 rounded-full bg-purple' />
              <span className='font-mono text-[11px] tracking-[0.12em] text-purple/80 uppercase'>
                Operante
              </span>
            </motion.div>
          </div>

          <div className='px-7 py-5 flex flex-col gap-3 border-b border-text/8'>
            <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase'>
              Camadas do mapa
            </div>
            {camadas.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.85 + i * 0.1 }}
                className='flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  <c.Icon
                    className={`size-5 ${c.on ? 'text-purple/60' : 'text-text/25'}`}
                    strokeWidth={1.7}
                  />
                  <span
                    className={`text-[16px] ${c.on ? 'text-text/80' : 'text-text/35'}`}
                  >
                    {c.label}
                  </span>
                </div>
                <div
                  className={`w-9 h-5 rounded-full flex items-center px-0.5 ${
                    c.on ? 'bg-purple/70 justify-end' : 'bg-text/15 justify-start'
                  }`}
                >
                  <span className='size-4 rounded-full bg-white' />
                </div>
              </motion.div>
            ))}
          </div>

          <div className='px-7 py-5'>
            <div className='font-mono text-[10px] tracking-[0.14em] text-purple/45 uppercase mb-3'>
              Contexto de instalação
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2.5'>
                <Users className='size-5 text-purple/60' strokeWidth={1.7} />
                <span className='text-[18px] font-semibold text-text/85'>
                  José Marinho
                </span>
              </div>
              <span className='text-purple/35'>→</span>
              <div className='flex items-center gap-2.5'>
                <Car className='size-5 text-purple/60' strokeWidth={1.7} />
                <span className='font-mono text-[16px] text-text/70'>
                  FLE-2B31
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Bar kicker='Decisão de design' delay={0.9}>
        <span className='flex items-center gap-3'>
          <BadgeCheck className='size-6 text-purple/70 shrink-0' strokeWidth={1.7} />
          Um único componente de condição — a mesma cor em tabela, formulário,
          filtro e diálogo de desinstalação.
        </span>
      </Bar>
    </SlideShell>
  )
}
