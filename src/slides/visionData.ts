// Dados mockados e controlados da demo do IC Vision.

// Imagens OS1 — solte em src/assets/os1/ como OS1_imagem_N.jpg
const imgModules = import.meta.glob('../assets/os1/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export function osImageUrl(id: number): string | undefined {
  const key = Object.keys(imgModules).find((k) =>
    k.endsWith(`OS1_imagem_${id}.jpg`),
  );
  return key ? imgModules[key] : undefined;
}

// Imagens OS2 — solte em src/assets/os2/ como OS2_imagem_N.jpg
const imgModules2 = import.meta.glob('../assets/os2/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export function os2ImageUrl(id: number): string | undefined {
  const key = Object.keys(imgModules2).find((k) =>
    k.endsWith(`OS2_imagem_${id}.jpg`),
  );
  return key ? imgModules2[key] : undefined;
}

export interface OSImage {
  id: number;
  bronze: 'aprovada' | 'reprovada';
  bronzeReason?: string;
  detection?: string;
  ouro?: 'validada' | 'alerta';
  ouroNote?: string;
}

export const osImages: OSImage[] = [
  { id: 1, bronze: 'reprovada', bronzeReason: 'Fora de contexto' },
  { id: 2, bronze: 'reprovada', bronzeReason: 'Fora de contexto' },
  { id: 3, bronze: 'reprovada', bronzeReason: 'Fora de contexto' },
  { id: 4, bronze: 'aprovada', detection: 'Fachada', ouro: 'validada' },
  {
    id: 5,
    bronze: 'aprovada',
    detection: 'Sinalização (segurança)',
    ouro: 'validada',
  },
  {
    id: 6,
    bronze: 'aprovada',
    detection: 'Sinalização (segurança)',
    ouro: 'alerta',
    ouroNote: 'Ângulo incorreto',
  },
  {
    id: 7,
    bronze: 'aprovada',
    detection: 'Materiais utilizados',
    ouro: 'alerta',
    ouroNote: 'Incompletos · falta PEAD do ramal',
  },
  {
    id: 8,
    bronze: 'aprovada',
    detection: 'Matrícula do hidrômetro',
    ouro: 'validada',
  },
  {
    id: 9,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'validada',
  },
  { id: 10, bronze: 'reprovada', bronzeReason: 'Baixa nitidez / borrada' },
  { id: 11, bronze: 'aprovada', detection: 'Etapa final', ouro: 'validada' },
];

export const os2Images: OSImage[] = [
  {
    id: 1,
    bronze: 'aprovada',
    detection: 'Fachada',
    ouro: 'alerta',
    ouroNote: 'Foto insuficiente para análise (ângulo)',
  },
  {
    id: 2,
    bronze: 'aprovada',
    detection: 'Sinalização (segurança)',
    ouro: 'alerta',
    ouroNote: 'Foto insuficiente para análise (ângulo)',
  },
  {
    id: 3,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'validada',
  },
  {
    id: 4,
    bronze: 'aprovada',
    detection: 'Termômetro + temperatura',
    ouro: 'alerta',
    ouroNote: 'Falta evidência para as duas valas',
  },
  {
    id: 5,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'validada',
  },
  {
    id: 6,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'alerta',
    ouroNote: 'Falta evidência para as duas valas',
  },
  {
    id: 7,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'validada',
  },
  {
    id: 8,
    bronze: 'aprovada',
    detection: 'Execução do serviço',
    ouro: 'validada',
  },
  {
    id: 9,
    bronze: 'aprovada',
    detection: 'Nivelamento (régua e trena)',
    ouro: 'alerta',
    ouroNote: 'Falta evidência para as duas valas',
  },
  {
    id: 10,
    bronze: 'aprovada',
    detection: 'Nivelamento (régua e trena)',
    ouro: 'alerta',
    ouroNote: 'Falta evidência para as duas valas',
  },
  {
    id: 11,
    bronze: 'aprovada',
    detection: 'Etapa final',
    ouro: 'alerta',
    ouroNote: 'Geometria da vala 2 incorreta',
  },
];

export const LAYERS = [
  {
    key: 'bronze',
    name: 'Bronze',
    color: '#cd7f32',
    desc: 'qualidade das imagens',
  },
  {
    key: 'prata',
    name: 'Prata',
    color: '#94a3b8',
    desc: 'detecção dos elementos',
  },
  {
    key: 'ouro',
    name: 'Ouro',
    color: '#d4af37',
    desc: 'contexto e interpretação',
  },
] as const;

export interface Criterio {
  label: string;
  ok: boolean | 'medio';
  obs: string;
}

export const criterios: Criterio[] = [
  { label: 'Foto da fachada', ok: true, obs: 'Evidência validada' },
  {
    label: 'Material utilizado',
    ok: 'medio',
    obs: 'Material incompleto · falta PEAD do ramal',
  },
  {
    label: 'Foto da execução do serviço',
    ok: 'medio',
    obs: 'Evidência parcial – apenas 1 foto',
  },

  { label: 'Foto da etapa final', ok: true, obs: 'Evidência validada' },
  { label: 'Matrícula do hidrômetro', ok: true, obs: 'Evidência identificada' },
  {
    label: 'Sinalização de segurança',
    ok: 'medio',
    obs: 'Ângulo incorreto em 1 foto',
  },
  {
    label: 'Leitura do hidrômetro',
    ok: false,
    obs: 'Evidência não localizada',
  },
  { label: 'Uso de EPI/EPC', ok: false, obs: 'Evidência não localizada' },
  { label: 'Envoltório de areia', ok: false, obs: 'Evidência não localizada' },
  {
    label: 'Teste de estanqueidade',
    ok: false,
    obs: 'Evidência não localizada',
  },
  {
    label: 'Compactação em camadas',
    ok: false,
    obs: 'Evidência não localizada',
  },
  { label: 'Vala requadrada', ok: false, obs: 'Evidência não localizada' },
  { label: 'Limpeza', ok: false, obs: 'Evidência não localizada' },
];

export const criterios2: Criterio[] = [
  { label: 'Foto da fachada', ok: true, obs: 'Evidência validada' },
  {
    label: 'Sinalização de segurança',
    ok: 'medio',
    obs: 'Foto insuficiente para análise (ângulo)',
  },
  {
    label: 'Foto da execução do serviço',
    ok: 'medio',
    obs: 'Quantidade insuficiente de fotos',
  },
  { label: 'Foto do termômetro', ok: true, obs: 'Evidência validada' },
  { label: 'Temperatura adequada', ok: true, obs: 'Evidência validada' },
  { label: 'Retirada de entulho', ok: true, obs: 'Evidência validada' },
  { label: 'Limpeza', ok: true, obs: 'Evidência validada' },
  { label: 'Etapa final', ok: true, obs: 'Evidência validada' },
  {
    label: 'Recomposição nivelada',
    ok: 'medio',
    obs: 'Segunda vala não possui evidência',
  },
  {
    label: 'Aspecto anterior da vala',
    ok: 'medio',
    obs: 'Segunda vala não atende',
  },
];

export const resumo2 = {
  aceitas: 6,
  medias: 4,
  recusadas: 0,
  pendencias: 0,
  status: 'Reprovado',
  localizacao: {
    status: 'Válido',
  },
};

export const resumo = {
  aceitas: 3,
  medias: 3,
  recusadas: 4,
  pendencias: 7,
  status: 'Reprovado',
  localizacao: {
    status: 'Válido',
  },
};

export interface OS {
  numero: string;
  nome: string;
  origem: string;
  imagens: number;
  status: string;
  fluxo: string;
  pronta: boolean;
  endereco?: string;
  lat?: number;
  lng?: number;
}

export const osList: OS[] = [
  {
    numero: '2622500xxx',
    nome: 'Ligação de água',
    origem: 'WFM',
    imagens: 11,
    status: 'Pronta para análise',
    fluxo: 'Fiscalização remota',
    pronta: true,
    endereco: 'Rua quindim, 412 - Guirilandia, Taubaté',
    lat: -23.00405667,
    lng: -45.53103167,
  },
  {
    numero: '2620577xxx',
    nome: 'Reposição de asfalto',
    origem: 'WFM',
    imagens: 11,
    status: 'Pronta para análise',
    fluxo: 'Fiscalização remota',
    pronta: true,
    endereco: 'Travessa João Luso, 71 (C/2) – Vl. Santista, SP',
    lat: -23.49402,
    lng: -46.67034167,
  },
];
