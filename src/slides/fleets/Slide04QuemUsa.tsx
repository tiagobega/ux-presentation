import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { SlideProps } from '../config'
import { PERFIS } from '../../data/fleets'
import { SlideShell, SlideHeader, Punch, Accent, Chip, up, easeIn } from './kit'

/** Módulos que cada perfil realmente abre no dia a dia. */
const USO: Record<string, { modulos: string[]; futuro?: string }> = {
  ADMIN: {
    modulos: ['Configuração', 'Usuários', 'Tudo'],
  },
  MANAGER: {
    modulos: ['Dashboard', 'Contratos', 'Pagamentos', 'Colaboradores'],
  },
  OPERATOR: {
    modulos: ['Dispositivos', 'Instalação', 'Alertas'],
  },
  VIEWER: {
    modulos: ['Dashboard', 'Listagens'],
  },
  DRIVER: {
    modulos: ['Leitura restrita'],
    futuro: 'App do motorista',
  },
}

export default function Slide04QuemUsa({ action: _ }: SlideProps) {
  void _
  return (
    <SlideShell className='gap-7'>
      <SlideHeader
        eyebrow='Perfis de usuário · Uso real'
        title={
          <>
            Cada perfil abre <Accent>uma parte diferente</Accent> da plataforma.
          </>
        }
        lead='O menu lateral é montado por permissão: quem não pode gerenciar contrato nem vê o item de contrato.'
      />

      <div className='flex-1 min-h-0 grid grid-cols-5 gap-4 items-center'>
        {PERFIS.map((p, i) => {
          const uso = USO[p.key]
          const isFuturo = Boolean(uso.futuro)
          return (
            <motion.div
              key={p.key}
              {...up(0.28 + i * 0.09, easeIn)}
              className={`p-6 flex flex-col gap-4 h-full ${
                isFuturo
                  ? 'border border-dashed border-purple/40 bg-purple/[0.06]'
                  : 'border border-text/10 bg-black/2'
              }`}
            >
              <p.Icon
                className='size-8 text-purple/55 flex-shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <div className='text-[22px] font-bold text-text tracking-[-0.02em] leading-[1.1]'>
                  {p.papel}
                </div>
                <div className='font-mono text-[11px] tracking-[0.12em] text-purple/50 uppercase mt-1.5'>
                  {p.key}
                </div>
              </div>

              <div className='h-px bg-text/8' />

              <div className='flex flex-wrap gap-2'>
                {uso.modulos.map((m) => (
                  <Chip key={m} tone={isFuturo ? 'muted' : 'purple'}>
                    {m}
                  </Chip>
                ))}
              </div>

              {uso.futuro && (
                <div className='mt-auto pt-2 flex items-center gap-2'>
                  <ArrowRight className='size-4 text-purple/60 shrink-0' strokeWidth={2} />
                  <span className='text-[17px] font-semibold text-purple/85 leading-[1.25]'>
                    {uso.futuro}
                  </span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <Punch delay={0.8}>
        O motorista já existe no modelo de permissão.{' '}
        <span className='text-purple'>O que falta é uma superfície própria.</span>
      </Punch>
    </SlideShell>
  )
}
