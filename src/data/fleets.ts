import type { LucideIcon } from 'lucide-react'
import {
  ShieldCheck,
  UserCog,
  Wrench,
  Eye,
  Truck,
  LayoutDashboard,
  HardDrive,
  Bell,
  Car,
  ScrollText,
  CircleDollarSign,
  Settings,
  Factory,
  PackageOpen,
  PlugZap,
  MapPin,
} from 'lucide-react'

/* ── PERFIS (CASL) ──
 * Espelham as regras declarativas do front, que por sua vez espelham o backend.
 * `sensiveis: false` = CPF, RG, telefone, endereço e pagamento chegam mascarados da API.
 */
export interface Perfil {
  key: string
  Icon: LucideIcon
  papel: string
  escopo: string
  faz: string
  sensiveis: boolean
}

export const PERFIS: Perfil[] = [
  {
    key: 'ADMIN',
    Icon: ShieldCheck,
    papel: 'Administrador',
    escopo: 'manage all',
    faz: 'Gerencia tudo, inclusive usuários da plataforma e permissões.',
    sensiveis: true,
  },
  {
    key: 'MANAGER',
    Icon: UserCog,
    papel: 'Gestor de operação',
    escopo: 'manage + delete',
    faz: 'Device, Vehicle, Person, Contract, Payment e Configuração.',
    sensiveis: true,
  },
  {
    key: 'OPERATOR',
    Icon: Wrench,
    papel: 'Operador de campo',
    escopo: 'create · update · install',
    faz: 'Cria, edita, instala e desinstala — não deleta.',
    sensiveis: false,
  },
  {
    key: 'VIEWER',
    Icon: Eye,
    papel: 'Consulta',
    escopo: 'read',
    faz: 'Somente leitura de dashboards e listagens.',
    sensiveis: false,
  },
  {
    key: 'DRIVER',
    Icon: Truck,
    papel: 'Motorista',
    escopo: 'read (restrito)',
    faz: 'Lê seu Device, seu Vehicle e seus Pagamentos.',
    sensiveis: false,
  },
]

/* ── MÓDULOS ── itens do menu lateral, na ordem de navegação. */
export interface Modulo {
  Icon: LucideIcon
  nome: string
  resumo: string
  /** Módulo escondido no menu quando o perfil não tem permissão. */
  gated?: boolean
}

export const MODULOS: Modulo[] = [
  {
    Icon: LayoutDashboard,
    nome: 'Dashboard',
    resumo: 'Visão geral e comparação de frota',
  },
  {
    Icon: HardDrive,
    nome: 'Dispositivos',
    resumo: 'Ciclo de vida do hardware',
  },
  {
    Icon: Bell,
    nome: 'Alertas',
    resumo: 'Hardware inoperante e monitoramento',
  },
  {
    Icon: Car,
    nome: 'Colaboradores & Veículos',
    resumo: 'Pessoas e seus veículos',
  },
  {
    Icon: ScrollText,
    nome: 'Contratos',
    resumo: 'Centros de custo e vínculos',
    gated: true,
  },
  {
    Icon: CircleDollarSign,
    nome: 'Pagamentos',
    resumo: 'Pagamento mensal de motoristas',
    gated: true,
  },
  {
    Icon: Settings,
    nome: 'Configuração',
    resumo: 'Tipos, chips, usuários e permissões',
    gated: true,
  },
]

/* ── CICLO DE VIDA DO DEVICE ──
 * `felizes` são os estados do fluxo esperado; os outros continuam rastreados.
 */
export interface EstadoDevice {
  Icon: LucideIcon
  nome: string
  detalhe: string
  feliz: boolean
}

export const CICLO_DEVICE: EstadoDevice[] = [
  {
    Icon: Factory,
    nome: 'Fabricado',
    detalhe: 'Entra no sistema com tipo, versão e firmware.',
    feliz: true,
  },
  {
    Icon: PackageOpen,
    nome: 'A instalar',
    detalhe: 'Disponível em estoque, aguardando alocação.',
    feliz: true,
  },
  {
    Icon: PlugZap,
    nome: 'Instalado',
    detalhe: 'Vinculado a veículo, pessoa e contrato.',
    feliz: true,
  },
  {
    Icon: Wrench,
    nome: 'Em manutenção',
    detalhe: 'Saiu de operação, segue rastreado.',
    feliz: false,
  },
  {
    Icon: MapPin,
    nome: 'Perdido',
    detalhe: 'Fora do fluxo, mas nunca fora do histórico.',
    feliz: false,
  },
]

/** Tipos de DeviceActivity registrados em cada transição. */
export const ATIVIDADES = [
  'Fabricação',
  'Instalação',
  'Manutenção',
  'Inspeção',
  'Desinstalação',
]

/** Eventos gravados no AuditLog. */
export const AUDIT_EVENTS = [
  'CREATE',
  'UPDATE',
  'STATUS_CHANGE',
  'LINK',
  'UNLINK',
]
