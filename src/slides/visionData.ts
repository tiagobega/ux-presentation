// Dados mockados e controlados da demo do IC Vision (OS 1048).

// Carregamento resiliente das imagens. Solte os arquivos em src/assets/os1/
// como OS1_imagem_1.jpg ... OS1_imagem_11.jpg. Enquanto não existirem, o
// lookup retorna undefined e o card usa um placeholder numerado.
const imgModules = import.meta.glob('../assets/os1/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

export function osImageUrl(id: number): string | undefined {
  const key = Object.keys(imgModules).find((k) =>
    k.endsWith(`OS1_imagem_${id}.jpg`),
  )
  return key ? imgModules[key] : undefined
}

export interface OSImage {
  id: number
  bronze: 'aprovada' | 'reprovada'
  bronzeReason?: string
  detection?: string
  ouro?: 'validada' | 'alerta'
  ouroNote?: string
}

export const osImages: OSImage[] = [
  { id: 1, bronze: 'reprovada', bronzeReason: 'Obstruída por dedo' },
  { id: 2, bronze: 'reprovada', bronzeReason: 'Obstruída por dedo' },
  { id: 3, bronze: 'reprovada', bronzeReason: 'Obstruída por dedo' },
  { id: 4, bronze: 'aprovada', detection: 'Fachada', ouro: 'validada' },
  { id: 5, bronze: 'aprovada', detection: 'Sinalização', ouro: 'validada' },
  {
    id: 6,
    bronze: 'aprovada',
    detection: 'Sinalização',
    ouro: 'alerta',
    ouroNote: 'Ângulo incorreto',
  },
  {
    id: 7,
    bronze: 'aprovada',
    detection: 'Materiais',
    ouro: 'alerta',
    ouroNote: 'Incompletos · falta PEAD do ramal',
  },
  { id: 8, bronze: 'aprovada', detection: 'Matrícula do hidrômetro', ouro: 'validada' },
  { id: 9, bronze: 'aprovada', detection: 'Execução do serviço', ouro: 'validada' },
  { id: 10, bronze: 'reprovada', bronzeReason: 'Baixa nitidez / borrada' },
  { id: 11, bronze: 'aprovada', detection: 'Etapa final', ouro: 'validada' },
]

export const LAYERS = [
  { key: 'bronze', name: 'Bronze', color: '#cd7f32', desc: 'qualidade da imagem' },
  { key: 'prata', name: 'Prata', color: '#94a3b8', desc: 'detecção dos elementos' },
  { key: 'ouro', name: 'Ouro', color: '#d4af37', desc: 'interpretação do contexto' },
] as const

export interface Criterio {
  label: string
  ok: boolean
  obs: string
}

export const criterios: Criterio[] = [
  { label: 'Foto da fachada', ok: true, obs: 'Evidência validada' },
  { label: 'Foto da execução do serviço', ok: true, obs: 'Evidência validada' },
  { label: 'Foto da etapa final', ok: true, obs: 'Evidência validada' },
  { label: 'Matrícula do hidrômetro', ok: true, obs: 'Evidência identificada' },
  { label: 'Sinalização de segurança', ok: true, obs: 'Evidência validada' },
  { label: 'Leitura do hidrômetro', ok: false, obs: 'Evidência não localizada' },
  { label: 'Uso de EPI/EPC', ok: false, obs: 'Evidência não localizada' },
  { label: 'Envoltório de areia', ok: false, obs: 'Evidência não localizada' },
  { label: 'Teste de estanqueidade', ok: false, obs: 'Evidência não localizada' },
  { label: 'Compactação em camadas', ok: false, obs: 'Evidência não localizada' },
  { label: 'Vala requadrada', ok: false, obs: 'Evidência não localizada' },
]

export const resumo = {
  aceitas: 6,
  recusadas: 4,
  pendencias: 6,
  status: 'Parcial / pendente',
  materialAplicado: 0,
  materialObs: 'Material incompleto. Faltando PEAD do ramal.',
}

export interface OS {
  numero: string
  nome: string
  origem: string
  imagens: number
  status: string
  fluxo: string
  pronta: boolean
}

export const osList: OS[] = [
  {
    numero: '1048',
    nome: 'Ligação de água S/V',
    origem: 'WFM',
    imagens: 11,
    status: 'Pronta para análise',
    fluxo: 'Fiscalização remota',
    pronta: true,
  },
  {
    numero: '1049',
    nome: 'Substituição de hidrômetro C/V',
    origem: 'WFM',
    imagens: 0,
    status: 'Aguardando imagens',
    fluxo: 'Pendente',
    pronta: false,
  },
]
