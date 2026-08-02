import { motion } from 'motion/react'
import { Car, Users, MapPin } from 'lucide-react'
import type { SlideProps } from '../config'
import { SlideShell, SlideHeader, Punch, Accent, Chip, up, easeIn, easeOut } from './kit'

const pessoas = [
  { nome: 'José Marinho', placa: 'FLE-2B31', veiculo: 'Fiorino · 2021' },
  { nome: 'Ana Ribeiro', placa: 'FLE-7C09', veiculo: 'Saveiro · 2022' },
  { nome: 'Carlos Duarte', placa: 'FLE-4A88', veiculo: 'Strada · 2020' },
]

/** Pontos fictícios do person-map-view, em % do container. */
const pins = [
  { x: 22, y: 30 },
  { x: 48, y: 18 },
  { x: 66, y: 52 },
  { x: 35, y: 62 },
  { x: 78, y: 34 },
  { x: 55, y: 74 },
]

export default function Slide11Colaboradores({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-6'>
      <SlideHeader
        eyebrow='Módulo · Colaboradores & Veículos'
        title={
          <>
            A pessoa vem primeiro,{' '}
            <Accent>o veículo vem em seguida.</Accent>
          </>
        }
        lead='O dado nasce no veículo, mas ninguém na operação procura por placa. A hierarquia visual da tela obedece a quem usa.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-2 gap-10 items-center'>
        {/* antes e depois da hierarquia */}
        <div className='grid grid-cols-2 gap-4'>
          <motion.div
            {...up(0.3, easeIn)}
            className='border border-text/10 bg-black/2 flex flex-col'
          >
            <div className='px-5 py-3.5 border-b border-text/8 flex items-center gap-2.5'>
              <Car className='size-4 text-text/35' strokeWidth={1.8} />
              <span className='font-mono text-[10px] tracking-[0.14em] text-text/40 uppercase'>
                Como o dado nasce
              </span>
            </div>
            <div className='flex flex-col'>
              {pessoas.map((p) => (
                <div
                  key={p.placa}
                  className='px-5 py-4 border-b border-text/[0.06] last:border-0'
                >
                  <div className='font-mono text-[19px] font-bold text-text/70 tracking-[0.02em]'>
                    {p.placa}
                  </div>
                  <div className='text-[14px] text-text/35 mt-0.5'>{p.nome}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...up(0.42, easeIn)}
            className='border border-purple/30 bg-purple/[0.05] flex flex-col'
          >
            <div className='px-5 py-3.5 border-b border-purple/15 flex items-center gap-2.5'>
              <Users className='size-4 text-purple/60' strokeWidth={1.8} />
              <span className='font-mono text-[10px] tracking-[0.14em] text-purple/60 uppercase'>
                Como a operação procura
              </span>
            </div>
            <div className='flex flex-col'>
              {pessoas.map((p) => (
                <div
                  key={p.nome}
                  className='px-5 py-4 border-b border-purple/[0.1] last:border-0'
                >
                  <div className='text-[20px] font-bold text-text tracking-[-0.02em] leading-[1.15]'>
                    {p.nome}
                  </div>
                  <div className='font-mono text-[12px] text-purple/50 mt-1'>
                    {p.placa} · {p.veiculo}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* mapa de pessoas + status */}
        <div className='flex flex-col gap-4'>
          <motion.div
            {...up(0.55, easeIn)}
            className='border border-text/10 bg-white/50 p-6 flex flex-col gap-4'
          >
            <div className='flex items-center gap-3'>
              <MapPin className='size-5 text-purple/60' strokeWidth={1.7} />
              <span className='text-[20px] font-bold text-text tracking-[-0.02em]'>
                Mapa de pessoas
              </span>
              <span className='font-mono text-[11px] text-purple/45 ml-auto'>
                person-map-view
              </span>
            </div>
            <div className='relative h-[230px] border border-purple/10 bg-purple/[0.02] overflow-hidden'>
              {pins.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: easeOut,
                    delay: 0.75 + i * 0.08,
                  }}
                  className='absolute size-3 rounded-full bg-purple/70 -translate-x-1/2 -translate-y-1/2'
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    boxShadow: '0 0 0 6px rgba(124,58,237,0.1)',
                  }}
                />
              ))}
            </div>
            <div className='text-[16px] text-text/55 leading-[1.5]'>
              Onde está cada colaborador — a visão geográfica da frota sem passar
              pelo veículo.
            </div>
          </motion.div>

          <motion.div
            {...up(0.68, easeIn)}
            className='border border-text/10 bg-black/2 p-6 flex flex-col gap-3.5'
          >
            <div className='font-mono text-[11px] tracking-[0.16em] text-purple/50 uppercase'>
              Status do colaborador
            </div>
            <div className='flex gap-2.5'>
              <Chip>Ativo</Chip>
              <Chip tone='muted'>Inativo</Chip>
              <Chip tone='alert'>Demitido</Chip>
            </div>
          </motion.div>
        </div>
      </div>

      <Punch delay={0.9}>
        É a tela onde a operação{' '}
        <span className='text-purple'>acha o fulano.</span>
      </Punch>
    </SlideShell>
  )
}
