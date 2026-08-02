import type { LucideIcon } from 'lucide-react'
import {
  Type,
  Hash,
  ChevronDown,
  Search,
  CircleDot,
  Calendar,
  SquareCheck,
  ListChecks,
  ToggleRight,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Link,
  Map as MapIcon,
  Clock,
  SquarePen,
  CloudOff,
  CircleCheckBig,
  CircleX,
  Play,
  Send,
  Save,
} from 'lucide-react'

/** Sistemas que originam as demandas e consomem os resultados. */
export const SISTEMAS_ORIGEM = ['GAIA', 'Porto Alegre', 'Recife', 'SABESP'] as const

export type StatusKey =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED_NOT_SENT'
  | 'COMPLETED'
  | 'CANCELLED'

/**
 * Cores e rótulos copiados de `formStatusData` do informs_front, para a
 * maquete bater com o app. Cada chave traz o conjunto completo de classes:
 * o Tailwind só gera o que encontra escrito por extenso.
 */
export const STATUS_STYLE: Record<
  StatusKey,
  {
    label: string
    curto: string
    dot: string
    solid: string
    text: string
    border: string
    bg: string
    icon: string
  }
> = {
  PENDING: {
    label: 'Pendente',
    curto: 'Pendente',
    dot: 'bg-yellow-400',
    solid: 'bg-yellow-400',
    text: 'text-yellow-500',
    border: 'border-yellow-400/45',
    bg: 'bg-yellow-400/[0.09]',
    icon: 'text-yellow-500',
  },
  IN_PROGRESS: {
    label: 'Em andamento',
    curto: 'Em andamento',
    dot: 'bg-sky-500',
    solid: 'bg-sky-500',
    text: 'text-sky-500',
    border: 'border-sky-500/40',
    bg: 'bg-sky-500/[0.07]',
    icon: 'text-sky-500',
  },
  COMPLETED_NOT_SENT: {
    label: 'Completo e não enviado',
    curto: 'Não enviado',
    dot: 'bg-orange-400',
    solid: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-400/55',
    bg: 'bg-orange-400/[0.12]',
    icon: 'text-orange-500',
  },
  COMPLETED: {
    label: 'Completo',
    curto: 'Completo',
    dot: 'bg-green-400',
    solid: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-400/45',
    bg: 'bg-green-400/[0.09]',
    icon: 'text-green-500',
  },
  CANCELLED: {
    label: 'Cancelado',
    curto: 'Cancelado',
    dot: 'bg-red-400',
    solid: 'bg-red-500',
    text: 'text-red-400',
    border: 'border-red-400/45',
    bg: 'bg-red-400/[0.08]',
    icon: 'text-red-400',
  },
}

export interface StatusForm {
  key: StatusKey
  detalhe: string
  Icon: LucideIcon
  /** Status que nasce no aparelho e nunca existiu no servidor. */
  soApp?: boolean
  qtd: number
}

export const STATUS_FORM: StatusForm[] = [
  {
    key: 'PENDING',
    detalhe: 'Atribuído ao verificador, ainda não iniciado.',
    Icon: Clock,
    qtd: 12,
  },
  {
    key: 'IN_PROGRESS',
    detalhe: 'O preenchimento começou e o horário de início ficou registrado.',
    Icon: SquarePen,
    qtd: 3,
  },
  {
    key: 'COMPLETED_NOT_SENT',
    detalhe: 'Preenchido no aparelho, esperando conexão para subir.',
    Icon: CloudOff,
    soApp: true,
    qtd: 2,
  },
  {
    key: 'COMPLETED',
    detalhe: 'Enviado ao servidor, com horário de conclusão e fotos no S3.',
    Icon: CircleCheckBig,
    qtd: 47,
  },
  {
    key: 'CANCELLED',
    detalhe: 'Encerrado com justificativa estruturada.',
    Icon: CircleX,
    qtd: 4,
  },
]

/** Prioridades e as cores que o app usa em cada uma. */
export const PRIORIDADES = [
  { nome: 'Baixa', valor: 0, cor: 'text-green-400' },
  { nome: 'Média', valor: 1, cor: 'text-blue-400' },
  { nome: 'Alta', valor: 2, cor: 'text-orange-400' },
  { nome: 'Crítica', valor: 3, cor: 'text-red-400' },
] as const

/** Os 10 tipos de campo de coleta. */
export const TIPOS_CAMPO: { nome: string; Icon: LucideIcon }[] = [
  { nome: 'Texto', Icon: Type },
  { nome: 'Numérico', Icon: Hash },
  { nome: 'Dropdown', Icon: ChevronDown },
  { nome: 'Typeahead', Icon: Search },
  { nome: 'Radio', Icon: CircleDot },
  { nome: 'Data', Icon: Calendar },
  { nome: 'Checkbox', Icon: SquareCheck },
  { nome: 'Grupo de Checkbox', Icon: ListChecks },
  { nome: 'Switch', Icon: ToggleRight },
  { nome: 'Arquivo', Icon: Paperclip },
]

/** Os 4 campos informativos, só leitura. */
export const CAMPOS_INFO: { nome: string; Icon: LucideIcon; detalhe: string }[] = [
  { nome: 'Texto', Icon: FileText, detalhe: 'Instrução escrita no meio do formulário.' },
  { nome: 'Imagem', Icon: ImageIcon, detalhe: 'Referência visual do que procurar.' },
  { nome: 'URL / mídia', Icon: Link, detalhe: 'Link ou vídeo de apoio à vistoria.' },
  { nome: 'Mapa', Icon: MapIcon, detalhe: 'O ponto exato, plotado no contexto.' },
]

/** As quatro mutations que a fila offline persiste em disco. */
export const FILA_OFFLINE: { nome: string; Icon: LucideIcon; detalhe: string }[] = [
  { nome: 'Iniciar', Icon: Play, detalhe: 'Pendente vira Em andamento, com horário de início.' },
  { nome: 'Responder', Icon: Save, detalhe: 'Cada resposta de campo, salva como rascunho.' },
  { nome: 'Enviar', Icon: Send, detalhe: 'Fecha o formulário e sobe as fotos para o S3.' },
  { nome: 'Cancelar', Icon: CircleX, detalhe: 'Encerra com a justificativa escolhida.' },
]
