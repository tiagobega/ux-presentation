/**
 * Glossário do Fleets — fonte única, lida por dois lugares:
 *  - `src/slides/fleets-demo/Slide05Glossario.tsx` — o slide com o QR code;
 *  - `plugins/remoteControl.ts` — a página que abre no celular da plateia.
 *
 * Por isso este arquivo **não importa nada**: o plugin do Vite roda fora do
 * app (sem React, sem lucide, sem DOM). Conteúdo de `fleets-documentacao.md § 3`.
 */

export const GRUPOS = [
  'Contratos & pagamento',
  'Pessoas & frota',
  'Hardware',
  'Operação',
] as const

export type Grupo = (typeof GRUPOS)[number]

export interface Termo {
  id: string
  nome: string
  /** Uma linha (~12 palavras): o que a palavra significa DENTRO da aplicação. */
  resumo: string
  /** O texto completo — só na folha de todos os termos, no celular. */
  detalhe: string
  grupo: Grupo
  /** Valores canônicos e nomes técnicos; viram chips na folha. */
  tokens?: string[]
  /** Termos vizinhos, por id — a navegação lateral do glossário. */
  veja?: string[]
  /** Os dois contratos: a distinção que o slide isola. */
  ouro?: boolean
  /** Ainda não existe na aplicação; aparece marcado como planejado. */
  planejado?: boolean
}

export const TERMOS: Termo[] = [
  /* ── Contratos & pagamento ── */
  {
    id: 'contrato-dados',
    nome: 'Contrato de dados',
    resumo: 'Para onde o dispositivo manda dado.',
    detalhe:
      'Diz para onde o dispositivo manda dado. Um dispositivo pode ter vários, é opcional (bancada e teste não têm) e não carrega valor financeiro nenhum. É o vínculo que a aba Dispositivos do contrato mostra.',
    grupo: 'Contratos & pagamento',
    tokens: ['vários por device', 'opcional', 'sem valor financeiro'],
    veja: ['centro-custo', 'dispositivo', 'tipo-contrato'],
    ouro: true,
  },
  {
    id: 'centro-custo',
    nome: 'Centro de custo',
    resumo: 'De onde sai o pagamento da pessoa.',
    detalhe:
      'É o contrato pagador de uma pessoa: carrega o valor mensal e as metas. Só um pode estar ativo por pessoa — o backend recusa um segundo. Editar não sobrescreve: encerra o período atual e abre um novo, então o histórico nunca se perde.',
    grupo: 'Contratos & pagamento',
    tokens: ['um ativo por pessoa', 'valor mensal', 'mantém histórico'],
    veja: ['contrato-dados', 'meta', 'pagamento', 'colaborador'],
    ouro: true,
  },
  {
    id: 'meta',
    nome: 'Meta',
    resumo: 'O objetivo do mês, por tipo de dispositivo.',
    detalhe:
      'Km na GeoBox, imagens na Jetson. Mora dentro do centro de custo e é a régua do pagamento: a barra do mês compara a telemetria real com a meta do vínculo ativo.',
    grupo: 'Contratos & pagamento',
    tokens: ['km', 'imagens', 'no mês'],
    veja: ['centro-custo', 'telemetria', 'pagamento'],
  },
  {
    id: 'pagamento',
    nome: 'Pagamento',
    resumo: 'O fechamento do mês de um motorista.',
    detalhe:
      'A tela cruza os centros de custo ativos com os pagamentos do mês para achar quem está pendente. Dá para pagar individualmente, pagar em lote (fechar o mês de vários de uma vez) e exportar para o financeiro.',
    grupo: 'Contratos & pagamento',
    tokens: ['individual', 'lote', 'exportar'],
    veja: ['centro-custo', 'meta'],
  },
  {
    id: 'tipo-contrato',
    nome: 'Veículo e Fixo',
    resumo: 'Os dois tipos de contrato, como aparecem na tela.',
    detalhe:
      'Por baixo são MOBILE e FIXED; na interface aparecem como Veículo e Fixo. Veículo é o contrato que anda junto com o veículo; Fixo é o ponto que não muda de lugar.',
    grupo: 'Contratos & pagamento',
    tokens: ['MOBILE', 'FIXED'],
    veja: ['contrato-dados'],
  },

  /* ── Pessoas & frota ── */
  {
    id: 'colaborador',
    nome: 'Colaborador',
    resumo: 'A pessoa — e o jeito que a operação procura.',
    detalhe:
      'Motorista ou colaborador. É o identificador primário da experiência: a operação procura “o equipamento do fulano”, não “o veículo X”. É dono de veículos, tem um centro de custo ativo, tem status (ativo, inativo, demitido) e dados pessoais protegidos por LGPD.',
    grupo: 'Pessoas & frota',
    tokens: ['dono do veículo', 'status', 'LGPD'],
    veja: ['veiculo', 'centro-custo', 'dado-sensivel'],
  },
  {
    id: 'veiculo',
    nome: 'Veículo',
    resumo: 'Placa, modelo e tipo; pertence a uma pessoa.',
    detalhe:
      'É o elo físico entre o hardware e a pessoa: pertence a um colaborador e é onde o dispositivo é instalado.',
    grupo: 'Pessoas & frota',
    veja: ['colaborador', 'instalacao'],
  },
  {
    id: 'perfil',
    nome: 'Perfil',
    resumo: 'O papel do usuário — define o que ele vê e faz.',
    detalhe:
      'Cinco papéis: Administrador, Gestor de operação, Operador de campo, Consulta e Motorista. O papel vem no login e vira regra declarativa aplicada em toda a aplicação: módulo sem permissão não aparece no menu.',
    grupo: 'Pessoas & frota',
    tokens: ['ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER', 'DRIVER'],
    veja: ['dado-sensivel'],
  },
  {
    id: 'dado-sensivel',
    nome: 'Dado sensível',
    resumo: 'CPF, RG, telefone, endereço e pagamento.',
    detalhe:
      'Quem não tem permissão não recebe esses campos escondidos na tela — recebe mascarados já da API. A regra é do backend, não do front: não tem como contornar pela interface.',
    grupo: 'Pessoas & frota',
    veja: ['perfil', 'colaborador'],
  },

  /* ── Hardware ── */
  {
    id: 'dispositivo',
    nome: 'Dispositivo',
    resumo: 'O hardware: serial único, tipo, versão e chip.',
    detalhe:
      'O equipamento IoT que fica no veículo, com serial único (ex.: JETSON_000001), tipo, versão, firmware e chip. Carrega uma condição própria, que diz em que estado ele está — e não onde ele está.',
    grupo: 'Hardware',
    tokens: ['serial', 'tipo', 'versão', 'firmware'],
    veja: ['tipo-dispositivo', 'condicao', 'instalacao'],
  },
  {
    id: 'tipo-dispositivo',
    nome: 'Jetson e GeoBox',
    resumo: 'Os dois tipos de hardware que estão em campo.',
    detalhe:
      'A GeoBox entrega posição, então a meta dela é km. A Jetson entrega imagem, então a meta dela é captura — e ela precisa de chip 4G. O tipo define qual meta se aplica e o que aparece no mapa. O cadastro de tipos já está pronto para receber os próximos (N100, câmeras).',
    grupo: 'Hardware',
    tokens: ['JETSON', 'GEOBOX'],
    veja: ['dispositivo', 'meta', 'chip'],
  },
  {
    id: 'versao',
    nome: 'Versão',
    resumo: 'Variação de hardware abaixo do tipo.',
    detalhe:
      'Jetson v1, v2. É gerenciada por tipo e pode receber uma marca de alerta visual, para destacar na operação as versões que dão problema.',
    grupo: 'Hardware',
    veja: ['dispositivo', 'tipo-dispositivo'],
  },
  {
    id: 'chip',
    nome: 'Chip',
    resumo: 'O chip 4G que dá conectividade à Jetson.',
    detalhe:
      'A “linha” do equipamento. É cadastrada em Configuração e depois vinculada ao dispositivo.',
    grupo: 'Hardware',
    veja: ['dispositivo', 'tipo-dispositivo'],
  },
  {
    id: 'condicao',
    nome: 'Condição',
    resumo: 'Em que estado o dispositivo está — não onde está.',
    detalhe:
      'Só Disponível e Em teste permitem instalar. Perdido e Baixado são terminais: aplicá-los encerra a instalação e os vínculos ativos. A condição é ortogonal à instalação — um device pode estar Em manutenção e ainda ter histórico de onde estava.',
    grupo: 'Hardware',
    tokens: [
      'Disponível',
      'Em teste',
      'Em manutenção',
      'Com defeito',
      'Perdido',
      'Baixado',
    ],
    veja: ['dispositivo', 'instalacao'],
  },
  {
    id: 'heartbeat',
    nome: 'Heartbeat',
    resumo: 'Sinal de vida contínuo do hardware.',
    detalhe:
      'Hoje a ausência de dado precisa ser interpretada por alguém. Com heartbeat, disponibilidade passa a ser medida — é a base para alerta confiável.',
    grupo: 'Hardware',
    veja: ['alerta', 'telemetria'],
    planejado: true,
  },

  /* ── Operação ── */
  {
    id: 'instalacao',
    nome: 'Instalação',
    resumo: 'Amarra o dispositivo ao veículo — e à pessoa.',
    detalhe:
      'Instalar cria o vínculo dispositivo↔veículo com data de início, e pode já amarrar contratos de dados. Desinstalar fecha a data e mantém o histórico. Só um dispositivo instalado num veículo que pertence a uma pessoa gera dado atribuível: é isso que alimenta o mapa, a meta e o pagamento. Instalação errada = dado órfão.',
    grupo: 'Operação',
    tokens: ['início', 'fim', 'histórico'],
    veja: ['dispositivo', 'veiculo', 'telemetria', 'lote'],
  },
  {
    id: 'lote',
    nome: 'Instalação em lote',
    resumo: 'Vários dispositivos num veículo, de uma vez.',
    detalhe:
      'Atalho para o caso comum da operação: o veículo que recebe GeoBox e Jetson na mesma visita, sem repetir o fluxo duas vezes.',
    grupo: 'Operação',
    veja: ['instalacao'],
  },
  {
    id: 'telemetria',
    nome: 'Telemetria',
    resumo: 'O dado que o hardware manda do campo.',
    detalhe:
      'Posição da GeoBox e capturas da Jetson. É a matéria-prima de tudo: mapa, metas, indicadores e alertas saem dela. E só é atribuível a uma pessoa se a instalação estiver correta.',
    grupo: 'Operação',
    veja: ['instalacao', 'meta', 'alerta'],
  },
  {
    id: 'alerta',
    nome: 'Alerta',
    resumo: 'Hardware pedindo atenção, vindo da telemetria.',
    detalhe:
      'Fica aberto até alguém resolver, e o menu mostra a contagem no badge. Ainda em beta: a fonte e as regras estão amadurecendo. É a semente do monitoramento proativo e do push no app do motorista.',
    grupo: 'Operação',
    tokens: ['aberto', 'resolvido', 'beta'],
    veja: ['telemetria', 'condicao', 'heartbeat'],
  },
  {
    id: 'atividade',
    nome: 'Atividade',
    resumo: 'O que aconteceu com um dispositivo, em ordem.',
    detalhe:
      'Fabricação, instalação, manutenção, inspeção, desinstalação. Cada transição do hardware fica registrada, então a vida do dispositivo é lida de ponta a ponta.',
    grupo: 'Operação',
    veja: ['dispositivo', 'auditoria'],
  },
  {
    id: 'auditoria',
    nome: 'Auditoria',
    resumo: 'Quem mudou o quê, e quando.',
    detalhe:
      'Criação, edição, mudança de status, vínculo e desvínculo ficam no log. É o que responde “por que esse pagamento ficou assim?” meses depois, sem depender da memória de ninguém.',
    grupo: 'Operação',
    tokens: ['criou', 'editou', 'vinculou', 'desvinculou'],
    veja: ['atividade', 'pagamento'],
  },
  {
    id: 'coleta',
    nome: 'Coleta em campo',
    resumo: 'Módulo novo de registro em campo.',
    detalhe:
      'Ainda sendo fechado com o time: quem usa, se é mobile, o que exatamente é coletado e se conversa direto com a Jetson.',
    grupo: 'Operação',
    veja: ['atividade', 'instalacao'],
    planejado: true,
  },
]

/**
 * O que é relevante em cada ponto da apresentação.
 *
 * O celular da plateia recebe o slide atual pelo SSE (`/slide-state`) e usa
 * esta tabela para trocar os termos em destaque. `action` é opcional: sem ela,
 * a entrada vale para todos os steps do slide.
 */
export interface Foco {
  slide: number
  action?: string
  /** Uma frase: o que observar agora. */
  nota: string
  /** Ids de `TERMOS`, na ordem em que a fala os usa. */
  termos: string[]
}

export const FOCO: Foco[] = [
  {
    slide: 2,
    nota: 'O caminho do dado: sai do hardware no veículo e chega na plataforma.',
    termos: ['dispositivo', 'tipo-dispositivo', 'telemetria', 'chip'],
  },
  {
    slide: 3,
    nota: 'O papel do usuário decide o menu, a ação e até o campo que ele lê.',
    termos: ['perfil', 'dado-sensivel'],
  },
  {
    slide: 4,
    nota: 'Os três ganhos vêm destes conceitos.',
    termos: ['centro-custo', 'meta', 'instalacao', 'auditoria'],
  },
  {
    slide: 5,
    nota: 'Estas são as duas palavras que mais confundem. Guarde a diferença.',
    termos: ['contrato-dados', 'centro-custo'],
  },
  {
    slide: 6,
    nota: 'O login carrega o papel, e o papel monta o menu.',
    termos: ['perfil', 'dado-sensivel'],
  },
  {
    slide: 7,
    nota: 'Antes de operar, a aplicação precisa dos cadastros base.',
    termos: ['tipo-dispositivo', 'versao', 'chip', 'tipo-contrato', 'perfil'],
  },
  {
    slide: 8,
    nota: 'As três abas do contrato são exatamente estes três conceitos.',
    termos: ['contrato-dados', 'centro-custo', 'meta', 'pagamento'],
  },
  {
    slide: 9,
    nota: 'A busca começa pela pessoa; o veículo vem depois dela.',
    termos: ['colaborador', 'veiculo', 'centro-custo', 'instalacao'],
  },
  {
    slide: 10,
    nota: 'Condição diz o estado; instalação diz o lugar. São coisas separadas.',
    termos: ['dispositivo', 'condicao', 'instalacao', 'lote', 'versao'],
  },
  {
    slide: 11,
    nota: 'Módulo novo — o fluxo ainda está sendo fechado com o time.',
    termos: ['coleta', 'atividade', 'dispositivo'],
  },
  {
    slide: 12,
    nota: 'O valor pago sai da meta, e a meta sai da telemetria.',
    termos: ['pagamento', 'meta', 'centro-custo', 'telemetria'],
  },
  {
    slide: 13,
    nota: 'O alerta nasce do dado que chega — ou do dado que parou de chegar.',
    termos: ['alerta', 'telemetria', 'condicao'],
  },
  {
    slide: 14,
    nota: 'Nenhum número desta tela foi digitado por alguém.',
    termos: ['meta', 'telemetria', 'dispositivo', 'centro-custo'],
  },
  {
    slide: 15,
    nota: 'O que vem depois ataca justamente o que ainda depende de gente.',
    termos: ['heartbeat', 'coleta', 'alerta', 'condicao'],
  },
]

/** A entrada mais específica que casa com o momento atual (slide + step). */
export function focoDe(slide: number, action?: string): Foco | undefined {
  return (
    FOCO.find((f) => f.slide === slide && f.action === action) ??
    FOCO.find((f) => f.slide === slide && !f.action)
  )
}

export function termoPorId(id: string): Termo | undefined {
  return TERMOS.find((t) => t.id === id)
}

/** Os dois contratos, na ordem em que o slide os apresenta. */
export const OURO: Termo[] = TERMOS.filter((t) => t.ouro)
