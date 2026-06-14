export interface IcProduct {
  id: string
  name: string
  color: string
  layer: string
  desc: string
  longDesc: string
  icon: string // lucide icon name
}

// Products that collect data
export const collectionProducts: IcProduct[] = [
  {
    id: 'fleets',
    name: 'IC Fleets',
    color: '#e85151',
    layer: 'Coleta',
    desc: 'Gestão da frota de dispositivos e agentes. Onde o UX da operação vive.',
    longDesc: 'Plataforma de gestão de dispositivos físicos instalados em campo — veículos, sensores, câmeras. Controla contratos, motoristas, rotas e telemetria em tempo real.',
    icon: 'Truck',
  },
]

// Products that process data
export const processingProducts: IcProduct[] = [
  {
    id: 'vision',
    name: 'IC Vision',
    color: '#7c6ef5',
    layer: 'Processamento de Imagem',
    desc: 'Processamento de imagens e vídeos para geração de validações de qualidade, detecções e contexto.',
    longDesc: 'Motor de visão computacional da Intelicity. Recebe frames e vídeos capturados em campo, aplica modelos de detecção e classificação, e devolve dados estruturados prontos para consumo pelos produtos especializados.',
    icon: 'Eye',
  },
  {
    id: 'lumen',
    name: 'IC Lumen',
    color: '#d4c53a',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados de luminosidade urbana.',
    longDesc: 'Analisa imagens noturnas para detectar luminárias com defeito, calcular cobertura luminosa por setor e gerar relatórios de eficiência energética para gestores municipais.',
    icon: 'Lightbulb',
  },
  {
    id: 'quality',
    name: 'IC Quality',
    color: '#7a9ab8',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados de qualidade de asfalto · IRI.',
    longDesc: 'Processa dados de acelerômetro e imagem para calcular o Índice de Regularidade Internacional (IRI) do pavimento, identificar patologias e priorizar trechos para manutenção.',
    icon: 'Activity',
  },
  {
    id: 'tree',
    name: 'IC Tree',
    color: '#2d7a4e',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados sobre posição e catálogo de árvores na cidade.',
    longDesc: 'Detecta, classifica e geolocaliza árvores a partir de imagens de rua. Gera inventário arbóreo municipal com espécie estimada, estado de saúde e alertas de risco.',
    icon: 'TreePine',
  },
  {
    id: 'margin',
    name: 'IC Margin',
    color: '#c06840',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados sobre encostas.',
    longDesc: 'Monitora encostas e taludes com imagens periódicas. Detecta movimentação de solo, rachaduras e alterações de vegetação para emitir alertas preventivos de risco geológico.',
    icon: 'TrendingDown',
  },
  {
    id: 'gas',
    name: 'IC Gas',
    color: '#e87c3a',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados sobre vazamentos de gás.',
    longDesc: 'Processa dados de sensores e imagens térmicas para detectar e localizar pontos de vazamento em redes de distribuição de gás natural.',
    icon: 'Wind',
  },
  {
    id: 'flood',
    name: 'IC Flood',
    color: '#3a7ce8',
    layer: 'Processamento',
    desc: 'Processamento e cálculo de dados sobre drenagem e enchentes.',
    longDesc: 'Monitora pontos críticos de drenagem urbana com câmeras e sensores de nível. Emite alertas antecipados de alagamento e gera mapas de risco por bacia hidrográfica.',
    icon: 'Droplets',
  },
]

// Quality control
export const qualityProducts: IcProduct[] = [
  {
    id: 'classify',
    name: 'IC Classify',
    color: '#b061e8',
    layer: 'Qualidade',
    desc: 'SGC — validação humana das classificações geradas pela IA. Garante confiabilidade do output.',
    longDesc: 'Sistema de Gestão de Classificação. Interface para revisores humanos validarem, corrigirem ou rejeitarem classificações geradas por IA antes que cheguem ao gestor final.',
    icon: 'Tag',
  },
]

// Access layer
export const accessProducts: IcProduct[] = [
  {
    id: 'query',
    name: 'IC Query',
    color: '#d4a53a',
    layer: 'Acesso',
    desc: 'LLM — interface de linguagem natural para os dados. O gestor pergunta, o sistema responde.',
    longDesc: 'Camada de acesso conversacional. O gestor faz perguntas em linguagem natural ("quantas luminárias com defeito no setor norte?") e recebe respostas estruturadas com dados em tempo real.',
    icon: 'MessageSquare',
  },
]

// Platform services
export const platformProducts: IcProduct[] = [
  {
    id: 'face',
    name: 'IC Face',
    color: '#3ab8d4',
    layer: 'Interface',
    desc: 'Biblioteca de micro front-ends. Tudo que qualquer usuário vê passa pelo Face.',
    longDesc: 'Design system vivo — componentes React compartilhados entre todos os produtos IC. Garante consistência visual e comportamental da plataforma inteira.',
    icon: 'Layers',
  },
  {
    id: 'labs',
    name: 'IC Labs',
    color: '#3a9ed4',
    layer: 'Inovação',
    desc: 'P&D. Onde os próximos produtos da cadeia são testados.',
    longDesc: 'Ambiente de experimentação para novos sensores, modelos de IA e casos de uso urbanos antes de virar produto de linha.',
    icon: 'Zap',
  },
  {
    id: 'news',
    name: 'IC News',
    color: '#3ad47e',
    layer: 'Comunicação',
    desc: 'Canal de releases, novidades e cases.',
    longDesc: 'Hub de comunicação da Intelicity com clientes e parceiros. Releases de produto, cases de sucesso e atualizações de roadmap.',
    icon: 'Rss',
  },
]

// All products that display data (for the "every project shows data" slide)
export const allDataProducts = [
  ...collectionProducts,
  ...processingProducts,
  ...qualityProducts,
  ...accessProducts,
]
