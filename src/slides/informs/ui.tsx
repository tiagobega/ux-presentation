import type { ReactNode } from 'react'
import { List, Map, SquarePlus, User, CloudAlert, ArrowLeft } from 'lucide-react'
import { STATUS_STYLE, type StatusKey } from '../../data/informs'

/**
 * Maquetes do app de campo, reproduzindo o front real (`informs_front`):
 * header #00a5e9 (ou #f97316 quando offline), fundo #f2f0f5, cards brancos,
 * tab bar de Mapa / Criar / Formulários, pílulas de status com contador.
 * O cromo roxo do deck fica fora daqui de propósito: o que aparece dentro do
 * celular é o produto como ele é hoje.
 */

export const APP = {
  primary: '#00a5e9',
  offline: '#f97316',
  bg: '#f2f0f5',
  border: '#e4e4e7',
  muted: '#71717a',
  tabOff: '#9ca3af',
}

/**
 * Wordmark do app: "in" em zinc e "forms" em branco sobre o header colorido,
 * ou em #0EA5E9 sobre fundo claro, como nos dois SVGs do repositório do app.
 */
export function InformsLogo({
  height = 15,
  sobre = 'cor',
}: {
  height?: number
  sobre?: 'cor' | 'claro'
}) {
  const forms = sobre === 'cor' ? 'white' : '#0EA5E9'
  return (
    <svg
      width={(height * 87) / 18}
      height={height}
      viewBox='0 0 87 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 17.7149V0.29703H3.52405V17.7149H0Z' fill='#52525B' />
      <path
        d='M18.3703 17.7149H15.0248V11.2752C15.0248 9.91287 14.9534 9.03366 14.8105 8.63762C14.6677 8.23366 14.4335 7.92079 14.1081 7.69901C13.7906 7.47723 13.4057 7.36634 12.9533 7.36634C12.3739 7.36634 11.854 7.52475 11.3936 7.84158C10.9333 8.15842 10.6158 8.57822 10.4412 9.10099C10.2745 9.62376 10.1912 10.5901 10.1912 12V17.7149H6.84571V5.09703H9.95306V6.9505C11.0563 5.52475 12.4453 4.81188 14.12 4.81188C14.8582 4.81188 15.5328 4.94654 16.144 5.21584C16.7551 5.47723 17.2155 5.81386 17.525 6.22574C17.8425 6.63762 18.0608 7.10495 18.1798 7.62772C18.3068 8.1505 18.3703 8.89901 18.3703 9.87327V17.7149Z'
        fill='#52525B'
      />
      <path
        d='M20.3109 5.09703H22.1682V4.14653C22.1682 3.08515 22.2793 2.29307 22.5015 1.7703C22.7317 1.24752 23.1484 0.823762 23.7516 0.49901C24.3628 0.166337 25.1327 0 26.0613 0C27.0138 0 27.9464 0.142574 28.8591 0.427723L28.4067 2.75644C27.8749 2.6297 27.363 2.56634 26.8709 2.56634C26.3867 2.56634 26.0375 2.68119 25.8232 2.91089C25.6168 3.13267 25.5137 3.56436 25.5137 4.20594V5.09703H28.0138V7.72277H25.5137V17.7149H22.1682V7.72277H20.3109V5.09703Z'
        fill={forms}
      />
      <path
        d='M29.121 11.2277C29.121 10.1188 29.3949 9.04554 29.9425 8.00792C30.4902 6.9703 31.2641 6.17822 32.2641 5.63168C33.2721 5.08515 34.3952 4.81188 35.6334 4.81188C37.5462 4.81188 39.1138 5.43366 40.3361 6.67723C41.5584 7.91287 42.1696 9.47723 42.1696 11.3703C42.1696 13.2792 41.5505 14.8634 40.3123 16.1228C39.0821 17.3743 37.5304 18 35.6572 18C34.4984 18 33.3912 17.7386 32.3356 17.2158C31.2879 16.6931 30.4902 15.9287 29.9425 14.9228C29.3949 13.9089 29.121 12.6772 29.121 11.2277ZM32.5499 11.4059C32.5499 12.6574 32.8475 13.6158 33.4428 14.2812C34.0381 14.9465 34.7722 15.2792 35.6453 15.2792C36.5184 15.2792 37.2486 14.9465 37.8359 14.2812C38.4312 13.6158 38.7289 12.6495 38.7289 11.3822C38.7289 10.1465 38.4312 9.19604 37.8359 8.53069C37.2486 7.86535 36.5184 7.53267 35.6453 7.53267C34.7722 7.53267 34.0381 7.86535 33.4428 8.53069C32.8475 9.19604 32.5499 10.1545 32.5499 11.4059Z'
        fill={forms}
      />
      <path
        d='M48.0033 17.7149H44.6578V5.09703H47.7652V6.89109C48.297 6.04356 48.7732 5.48515 49.1939 5.21584C49.6225 4.94654 50.1066 4.81188 50.6463 4.81188C51.4083 4.81188 52.1425 5.02178 52.8489 5.44158L51.8131 8.35248C51.2496 7.98812 50.7257 7.80594 50.2415 7.80594C49.7733 7.80594 49.3764 7.93663 49.051 8.19802C48.7256 8.45149 48.4676 8.91485 48.2771 9.58812C48.0946 10.2614 48.0033 11.6713 48.0033 13.8178V17.7149Z'
        fill={forms}
      />
      <path
        d='M54.0513 5.09703H57.1349V6.8198C58.2381 5.48119 59.5517 4.81188 61.0756 4.81188C61.8852 4.81188 62.5876 4.97822 63.1829 5.31089C63.7782 5.64356 64.2663 6.14653 64.6473 6.8198C65.2029 6.14653 65.8021 5.64356 66.445 5.31089C67.0879 4.97822 67.7745 4.81188 68.5047 4.81188C69.4333 4.81188 70.2191 5.00198 70.862 5.38218C71.5049 5.75446 71.9851 6.30495 72.3026 7.03366C72.5328 7.57228 72.6479 8.44356 72.6479 9.64752V17.7149H69.3024V10.503C69.3024 9.25148 69.1873 8.44356 68.9571 8.07921C68.6476 7.60396 68.1713 7.36634 67.5285 7.36634C67.0602 7.36634 66.6197 7.50891 66.2069 7.79406C65.7942 8.07921 65.4966 8.49901 65.314 9.05347C65.1315 9.6 65.0402 10.4673 65.0402 11.6554V17.7149H61.6947V10.8C61.6947 9.57228 61.6352 8.7802 61.5161 8.42376C61.3971 8.06733 61.2106 7.80198 60.9566 7.62772C60.7105 7.45347 60.3732 7.36634 59.9446 7.36634C59.4287 7.36634 58.9644 7.50495 58.5516 7.78218C58.1389 8.05941 57.8413 8.45941 57.6587 8.98218C57.4841 9.50495 57.3968 10.3723 57.3968 11.5842V17.7149H54.0513V5.09703Z'
        fill={forms}
      />
      <path
        d='M74.8147 14.1149L78.172 13.604C78.3149 14.2535 78.6046 14.7485 79.0411 15.0891C79.4777 15.4218 80.0888 15.5881 80.8746 15.5881C81.7397 15.5881 82.3906 15.4297 82.8271 15.1129C83.1208 14.8911 83.2676 14.5941 83.2676 14.2218C83.2676 13.9683 83.1882 13.7584 83.0295 13.5921C82.8628 13.4337 82.4898 13.2871 81.9104 13.1525C79.2118 12.5584 77.5014 12.0158 76.7791 11.5248C75.779 10.8436 75.279 9.89703 75.279 8.68515C75.279 7.59208 75.7115 6.67327 76.5767 5.92871C77.4418 5.18416 78.7832 4.81188 80.6008 4.81188C82.3311 4.81188 83.6169 5.09307 84.4582 5.65545C85.2995 6.21782 85.8789 7.0495 86.1964 8.1505L83.0414 8.73267C82.9065 8.24158 82.6485 7.86535 82.2676 7.60396C81.8945 7.34257 81.3588 7.21188 80.6603 7.21188C79.7793 7.21188 79.1483 7.33465 78.7673 7.5802C78.5133 7.75446 78.3863 7.9802 78.3863 8.25743C78.3863 8.49505 78.4975 8.69703 78.7197 8.86337C79.0213 9.08515 80.0611 9.39802 81.839 9.80198C83.6248 10.2059 84.8709 10.701 85.5773 11.2871C86.2758 11.8812 86.625 12.7089 86.625 13.7703C86.625 14.9267 86.1408 15.9208 85.1725 16.7525C84.2042 17.5842 82.7716 18 80.8746 18C79.1523 18 77.7871 17.6515 76.7791 16.9545C75.779 16.2574 75.1242 15.3109 74.8147 14.1149Z'
        fill={forms}
      />
    </svg>
  )
}

const TABS = [
  { nome: 'Mapa', Icon: Map, id: 'map' },
  { nome: 'Criar', Icon: SquarePlus, id: 'create' },
  { nome: 'Formulários', Icon: List, id: 'forms' },
] as const

export type AppTab = (typeof TABS)[number]['id']

/** Moldura do celular com o cromo do app: header, conteúdo e tab bar. */
export function AppScreen({
  children,
  offline = false,
  tab = 'forms',
  voltar = false,
  width = 'w-[380px]',
  bare = false,
}: {
  children: ReactNode
  offline?: boolean
  tab?: AppTab | null
  /**
   * Telas de dentro do formulário usam o BackHeader do app: mesma barra
   * colorida, com "Voltar" à esquerda e o wordmark à direita, e sem tab bar.
   */
  voltar?: boolean
  width?: string
  /** Tela sem cromo do app, como o login. */
  bare?: boolean
}) {
  const topo = offline ? APP.offline : APP.primary

  return (
    <div
      className={`border-[10px] border-text/85 rounded-[38px] overflow-hidden ${width}`}
      style={{ background: APP.bg }}
    >
      {!bare && (
        <div
          className='rounded-b-2xl px-5 h-12 flex items-center justify-between'
          style={{ background: topo }}
        >
          {voltar ? (
            <>
              <span className='flex items-center gap-2'>
                <ArrowLeft className='size-5 text-white' strokeWidth={2} />
                <span className='text-white text-[14px]'>Voltar</span>
              </span>
              <span className='flex items-center gap-2'>
                <InformsLogo />
                {offline && (
                  <CloudAlert className='size-[18px] text-white' strokeWidth={1.8} />
                )}
              </span>
            </>
          ) : (
            <>
              <div className='flex items-center gap-2'>
                <InformsLogo />
                {offline && (
                  <CloudAlert className='size-[18px] text-white' strokeWidth={1.8} />
                )}
              </div>
              <div className='bg-white rounded-xl p-1.5'>
                <User className='size-3.5' strokeWidth={2} style={{ color: topo }} />
              </div>
            </>
          )}
        </div>
      )}

      <div className='px-4 py-3 flex flex-col gap-3'>{children}</div>

      {tab && !bare && !voltar && (
        <div className='bg-white border-t border-[#e4e4e7] px-2 pt-2 pb-3 flex items-center justify-around'>
          {TABS.map((t) => {
            const ativa = t.id === tab
            return (
              <div key={t.id} className='flex flex-col items-center gap-1'>
                <t.Icon
                  className='size-5'
                  strokeWidth={1.8}
                  style={{ color: ativa ? APP.primary : APP.tabOff }}
                />
                <span
                  className='text-[10px] font-medium'
                  style={{ color: ativa ? APP.primary : APP.tabOff }}
                >
                  {t.nome}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Card branco do app. */
export function AppCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(9,9,11,0.08)' }}
    >
      {children}
    </div>
  )
}

/** Botão primário do app. */
export function AppButton({
  children,
  tone = 'primary',
}: {
  children: ReactNode
  tone?: 'primary' | 'sky' | 'outline' | 'danger'
}) {
  const tones = {
    primary: 'bg-[#18181b] text-white',
    sky: 'bg-[#00a5e9] text-white',
    outline: 'bg-white text-[#09090b] border border-[#e4e4e7]',
    danger: 'bg-[#ef4444] text-white',
  }
  return (
    <div
      className={`rounded-md h-10 flex items-center justify-center gap-2 text-[14px] font-medium ${tones[tone]}`}
    >
      {children}
    </div>
  )
}

/** Pílula de status usada nas abas da listagem. */
export function StatusTab({
  status,
  count,
  active = false,
}: {
  status: StatusKey
  count: number
  active?: boolean
}) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className={`rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-[#e4e4e7] whitespace-nowrap shrink-0 ${
        active ? s.solid : 'bg-white'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${active ? 'bg-white' : s.dot}`} />
      <span
        className={`text-[11px] font-medium ${active ? 'text-white' : 'text-gray-700'}`}
      >
        {s.curto}
      </span>
      <span
        className={`rounded-full px-1.5 text-[10px] font-bold ${
          active ? 'bg-white/30 text-white' : 'bg-black/5 text-gray-500'
        }`}
      >
        {count}
      </span>
    </span>
  )
}

/** Linha de status usada no topo do card de formulário. */
export function StatusLine({ status }: { status: StatusKey }) {
  const s = STATUS_STYLE[status]
  return (
    <span className='flex items-center gap-2'>
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      <span className={`text-[12px] font-semibold ${s.text}`}>{s.label}</span>
    </span>
  )
}

/** Card de formulário da listagem, como no app. */
export function FormCard({
  status,
  titulo,
  endereco,
  sistema,
  prioridade,
  data,
}: {
  status: StatusKey
  titulo: string
  endereco: string
  sistema: string
  prioridade: { label: string; cor: string }
  data: string
}) {
  return (
    <AppCard className='p-3'>
      <div className='flex items-start justify-between gap-2'>
        <div className='flex-1 min-w-0'>
          <StatusLine status={status} />
          <div className='text-[11px] text-[#71717a] mt-1'>
            {sistema}
            <span className={`font-semibold ${prioridade.cor}`}>
              {' '}
              • {prioridade.label}
            </span>{' '}
            • {data}
          </div>
        </div>
        <div className='bg-[#0ea5e9] rounded p-1.5 shrink-0'>
          <Map className='size-3.5 text-white' strokeWidth={2} />
        </div>
      </div>

      <div className='text-[14px] font-semibold text-[#09090b] mt-2 leading-[1.2]'>
        {titulo}
      </div>
      <div className='text-[11px] text-[#71717a] mt-1 leading-[1.3] truncate'>
        <span className='font-semibold'>Logradouro: </span>
        {endereco}
      </div>
    </AppCard>
  )
}
