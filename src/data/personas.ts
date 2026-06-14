export type ProfileId = 'ceo' | 'gestor-cidade' | 'gerente-ti' | 'cmo' | 'operador-campo'

export interface Profile {
  id: ProfileId
  name: string
  role: string
  icon: string // lucide icon name
  color: string
  tagline: string
  description: string
}

export interface CompanionContent {
  slide: number
  action: string
  title: string
  body: string
  highlight?: string
  highlightLabel?: string
  metric?: { value: string; label: string }
}

export const profiles: Profile[] = [
  {
    id: 'ceo',
    name: 'CEO',
    role: 'Dono da empresa',
    icon: 'Building2',
    color: '#7c3af5',
    tagline: 'Decisão estratégica',
    description: 'Você toma decisões sobre onde investir. Veja como UX se traduz em receita e retenção.',
  },
  {
    id: 'gestor-cidade',
    name: 'Gestor de Cidade',
    role: 'Prefeitura · Cliente',
    icon: 'Landmark',
    color: '#3a7ce8',
    tagline: 'Gestão urbana',
    description: 'Você usa o sistema para justificar investimentos. Veja como uma boa experiência facilita seu trabalho.',
  },
  {
    id: 'gerente-ti',
    name: 'Gerente de TI',
    role: 'Interno · Tecnologia',
    icon: 'Server',
    color: '#2d7a4e',
    tagline: 'Infraestrutura de produto',
    description: 'Você mantém o sistema no ar e onboard novos usuários. Veja o custo técnico da inconsistência.',
  },
  {
    id: 'cmo',
    name: 'CMO / Marketing',
    role: 'Interno · Vendas & Marketing',
    icon: 'TrendingUp',
    color: '#d4a53a',
    tagline: 'Conversão e posicionamento',
    description: 'Você apresenta o produto para prospects. Veja como UX impacta diretamente na conversão.',
  },
  {
    id: 'operador-campo',
    name: 'Operador de Campo',
    role: 'Interno · Execução',
    icon: 'HardHat',
    color: '#e87c3a',
    tagline: 'Operação no campo',
    description: 'Você usa o sistema na rua, com celular na mão. Veja como uma boa UX elimina erros e chamadas de suporte.',
  },
]

// Companion content per profile, per slide+action
// slide index matches SLIDE_CONFIG order
export const companionContent: Record<ProfileId, CompanionContent[]> = {
  ceo: [
    {
      slide: 0,
      action: 'Capa',
      title: 'Por que isso importa para o negócio',
      body: 'A Intelicity tem tecnologia de ponta. O que está freando o crescimento não é o produto técnico — é a experiência que envolve esse produto. UX bem-feito é o que separa uma empresa que vende por esforço de uma que retém por valor.',
      highlight: 'Cada cliente que não renova custou mais para adquirir do que para reter.',
      highlightLabel: 'Contexto estratégico',
    },
    {
      slide: 1,
      action: 'Problemas',
      title: 'Seis problemas, um custo real',
      body: 'Cada problema listado tem impacto direto em receita: ciclos de venda longos, onboarding caro, suporte frequente e clientes que não renovam porque "o sistema é difícil". Isso não é percepção — é dado.',
      highlight: 'Produto difícil de usar = menor NPS = menor taxa de renovação = menor LTV.',
      highlightLabel: 'Impacto financeiro',
      metric: { value: '3-5×', label: 'custo de aquisição vs. retenção' },
    },
    {
      slide: 2,
      action: 'Cadeia',
      title: 'A cadeia técnica existe. A cadeia de experiência, não.',
      body: 'Coleta, processamento, qualidade e acesso funcionam. Mas o gestor que recebe os dados ainda não consegue agir com eles sem ajuda. Isso é o gap — e é onde o investimento em UX retorna mais rápido.',
      highlight: 'Dado que não gera decisão não gera valor — e não justifica renovação.',
      highlightLabel: 'Gap estratégico',
    },
    {
      slide: 2,
      action: 'Personas',
      title: 'Três usuários, três pontos de perda',
      body: 'Gestor que não entende o dado não renova. Operador que precisa de suporte gera custo. Prospect que sai da demo sem entender o valor não fecha. Cada persona mal servida é uma vazamento de receita.',
      highlight: 'UX resolve os três ao mesmo tempo.',
      highlightLabel: 'Visão de negócio',
      metric: { value: '68%', label: 'dos usuários abandonam apps difíceis na 1ª sessão' },
    },
    {
      slide: 3,
      action: 'Design System',
      title: 'Design system é investimento de infraestrutura',
      body: 'Assim como você não reconstrói o banco de dados a cada novo módulo, o design system evita reconstruir a experiência do zero. Cada módulo novo que segue o sistema custa menos e entrega mais rápido.',
      highlight: 'Empresas com design system maduro entregam features 40% mais rápido.',
      highlightLabel: 'ROI de infraestrutura',
    },
    {
      slide: 3,
      action: 'Stack IC',
      title: 'Cada produto IC é uma oportunidade de receita',
      body: 'Lumen, Quality, Tree, Margin, Gas, Flood — cada produto é um contrato potencial com uma cidade diferente. A UX é o que torna cada um desses produtos vendáveis de forma autônoma, sem precisar de um consultor para demonstrar valor.',
      highlight: 'Produto autoexplicativo fecha mais rápido e renova mais.',
      highlightLabel: 'Expansão de portfólio',
    },
    {
      slide: 4,
      action: 'Fleets',
      title: 'Fleets é onde a operação acontece',
      body: 'Esse é o produto que os clientes usam no dia a dia. Inconsistência aqui gera suporte, gera treinamento, gera insatisfação. Cada módulo com UX consistente reduz custo de operação e aumenta satisfação.',
      highlight: 'Operação eficiente = menos suporte = mais margem.',
      highlightLabel: 'Eficiência operacional',
    },
    {
      slide: 4,
      action: 'Vision',
      title: 'Vision processa. Os outros produtos decidem.',
      body: 'A arquitetura de UX dos produtos especializados precisa ser definida agora, enquanto o portfólio ainda é gerenciável. Cada produto sem padrão de experiência definido vai exigir retrabalho caro no futuro.',
      highlight: 'Definir padrão agora custa 1/10 do que corrigir depois.',
      highlightLabel: 'Decisão de timing',
    },
    {
      slide: 4,
      action: 'SABESP',
      title: 'SABESP valida o modelo de negócio',
      body: 'Se a cadeia completa funcionar bem na SABESP — coleta, processamento, validação e acesso com boa experiência — temos um caso replicável para qualquer prefeitura do Brasil.',
      highlight: 'Um case bem executado vale mais que 10 demos.',
      highlightLabel: 'Case de validação',
    },
  ],

  'gestor-cidade': [
    {
      slide: 0,
      action: 'Capa',
      title: 'O que está sendo apresentado aqui',
      body: 'Esta apresentação fala sobre como a Intelicity vai melhorar a experiência da plataforma que você usa. O objetivo é que os dados que você já tem se tornem mais fáceis de entender e usar — especialmente nas situações de pressão, como uma reunião de câmara.',
      highlight: 'Dados que você já tem, organizados para a decisão que você precisa tomar.',
      highlightLabel: 'Para você',
    },
    {
      slide: 1,
      action: 'Problemas',
      title: 'Problemas que você provavelmente já sentiu',
      body: '"Abre o sistema e não sabe por onde começar." Isso é exatamente o que acontece quando a plataforma não foi desenhada para o seu contexto — uma reunião com 3 minutos, dados que precisam contar uma história, não exibir tabelas.',
      highlight: 'A informação existe. O que falta é a experiência que a torna acionável.',
      highlightLabel: 'Seu contexto',
    },
    {
      slide: 2,
      action: 'Cadeia',
      title: 'Você está no final da cadeia — e é o mais importante',
      body: 'Toda a coleta, todo o processamento, toda a validação existe para que você possa tomar uma decisão melhor. Se a interface não entrega os dados de forma clara, a cadeia inteira falhou no último metro.',
      highlight: 'Um dashboard bem desenhado para sua reunião vale toda a tecnologia que o alimenta.',
      highlightLabel: 'Seu papel na cadeia',
    },
    {
      slide: 2,
      action: 'Personas',
      title: 'Você é o Gestor de Cidade',
      body: 'Reunião de câmara, 3 minutos, investimento para justificar. O sistema precisa te entregar a visualização pronta — não um relatório que você precisa interpretar. Com UX bem feito, você abre o sistema e a resposta já está organizada para o argumento que você precisa fazer.',
      highlight: 'Dados que contam história ≠ dados que exigem interpretação.',
      highlightLabel: 'Sua dor, nossa solução',
    },
    {
      slide: 3,
      action: 'Design System',
      title: 'Consistência visual = menor curva de aprendizado',
      body: 'Quando cada módulo se comporta diferente, você precisa reaprender onde fica cada coisa. Um design system garante que o padrão seja sempre o mesmo — você aprende uma vez, usa em qualquer módulo.',
      highlight: 'Sistema previsível = menos tempo aprendendo, mais tempo decidindo.',
      highlightLabel: 'Impacto direto no seu dia',
    },
    {
      slide: 3,
      action: 'Stack IC',
      title: 'Cada produto IC resolve um problema da sua cidade',
      body: 'Lumen para iluminação, Quality para pavimento, Tree para arborização, Margin para encostas, Gas para gás, Flood para enchentes. Cada um tem dados específicos sobre a sua cidade. Com boa UX, você acessa exatamente o que precisa, quando precisa.',
      highlight: 'Um painel por problema, não um painel para tudo.',
      highlightLabel: 'Especialização por domínio',
    },
    {
      slide: 4,
      action: 'SABESP',
      title: 'SABESP é o piloto — cidades como a sua podem ser o próximo',
      body: 'O trabalho sendo feito agora para a SABESP — wizard de campo, dashboard de gestão, onboarding claro — é exatamente o modelo que vai ser replicado para novas cidades. Se a sua prefeitura usa a plataforma, essas melhorias chegam até você.',
      highlight: 'Cada melhoria de UX feita para um cliente beneficia todos os clientes.',
      highlightLabel: 'Expansão do modelo',
    },
  ],

  'gerente-ti': [
    {
      slide: 0,
      action: 'Capa',
      title: 'UX é infraestrutura de produto',
      body: 'Para TI, UX não é "deixar bonito". É documentação de comportamento, padrão de componentes, especificação de estado. Sem isso, cada módulo novo que o dev implementa toma decisões diferentes — e você herda o suporte disso.',
      highlight: 'Inconsistência de UX gera bugs de comportamento que chegam no seu ticket.',
      highlightLabel: 'Perspectiva técnica',
    },
    {
      slide: 1,
      action: 'Problemas',
      title: 'Esses problemas chegam até você como suporte',
      body: 'Operador de campo que trava e pede ajuda = ticket de suporte. Gestor que não entende o dado = chamada para explicar. Módulo sem fluxo guiado = treinamento a cada nova pessoa. Tudo isso é custo de TI.',
      highlight: 'Cada problema de UX não resolvido vira volume de suporte.',
      highlightLabel: 'Custo técnico',
      metric: { value: '~30%', label: 'do suporte técnico é causado por problemas de usabilidade' },
    },
    {
      slide: 2,
      action: 'Cadeia',
      title: 'A cadeia técnica funciona. A cadeia de experiência não foi documentada.',
      body: 'Coleta, processamento, qualidade e acesso — cada camada tem arquitetura documentada. Mas a camada de experiência não tem nenhuma documentação de por que os dados são exibidos da forma que são. Isso é dívida técnica de UX.',
      highlight: 'UX sem documentação = arquitetura sem diagrama.',
      highlightLabel: 'Dívida técnica',
    },
    {
      slide: 3,
      action: 'Design System',
      title: 'Design system é para o dev, não só para o designer',
      body: 'Com o design system, o dev não toma decisões de interface sozinho. Os componentes já existem, os estados já estão documentados, os comportamentos já foram validados. Isso reduz revisão, reduz bug, reduz PR que vai e volta.',
      highlight: 'Dev que não precisa inventar UI entrega feature mais rápido e com menos bug.',
      highlightLabel: 'Impacto no desenvolvimento',
    },
    {
      slide: 4,
      action: 'Fleets',
      title: 'Fleets tem 11 módulos. Cada um com decisões de UX não documentadas.',
      body: 'Config, Users, Person, Vehicles, Devices — cada módulo foi construído em momentos diferentes, por pessoas diferentes, com critérios diferentes. Sem padrão, cada integração nova que você faz exige entender um conjunto diferente de regras.',
      highlight: 'Padronização reduz tempo de onboarding técnico de semanas para dias.',
      highlightLabel: 'Manutenibilidade',
    },
    {
      slide: 4,
      action: 'Vision',
      title: 'Vision + 6 produtos = 7 conjuntos de UX diferentes',
      body: 'Lumen, Quality, Tree, Margin, Gas, Flood — cada um exibe dados de forma diferente hoje. Sem uma arquitetura de UX definida agora, cada novo produto especializado vai multiplicar essa inconsistência.',
      highlight: 'Arquitetura de UX definida agora = escala sem retrabalho.',
      highlightLabel: 'Arquitetura de produto',
    },
  ],

  cmo: [
    {
      slide: 0,
      action: 'Capa',
      title: 'O produto precisa se vender',
      body: 'A demo atual exige que você explique o valor. Um produto bem desenhado demonstra o valor por si — o prospect vê e entende, sem precisar de um consultor ao lado. Isso encurta o ciclo de vendas e aumenta a taxa de conversão.',
      highlight: 'Produto autoexplicativo vende mais do que produto bem explicado.',
      highlightLabel: 'Perspectiva de vendas',
    },
    {
      slide: 1,
      action: 'Problemas',
      title: 'A demo não converte na primeira reunião',
      body: '"A demonstração é densa demais para quem vê pela primeira vez." Isso é o que está alongando o seu ciclo de vendas. Cada reunião extra para convencer um prospect é um custo — de tempo, de CAC, de pipeline travado.',
      highlight: 'Demo que não converte na 1ª reunião dobra o custo de aquisição.',
      highlightLabel: 'Custo de vendas',
      metric: { value: '2.3×', label: 'mais reuniões necessárias sem UX otimizado' },
    },
    {
      slide: 2,
      action: 'Personas',
      title: 'Cada persona é um argumento de venda diferente',
      body: 'Para o Gestor de Cidade, o argumento é clareza de dados para a câmara. Para o Operador de Sistema, é eficiência. Para o Operador de Campo, é autonomia. Com UX bem feito, o produto comunica cada um desses valores para quem importa.',
      highlight: 'Produto que se adapta ao contexto de quem vê converte mais.',
      highlightLabel: 'Personalização de argumento',
    },
    {
      slide: 3,
      action: 'Stack IC',
      title: 'O portfólio IC precisa de identidade',
      body: 'Lumen, Quality, Tree, Margin, Gas, Flood — cada produto tem um cliente em potencial diferente. Mas sem identidade visual e de produto definidas, cada pitch começa do zero. Um portfólio com branding coerente é vendável de forma autônoma.',
      highlight: 'Portfólio com identidade forte permite que parceiros vendam por você.',
      highlightLabel: 'Identidade de portfólio',
    },
    {
      slide: 4,
      action: 'SABESP',
      title: 'SABESP é o case que você precisa',
      body: 'Um caso de uso completo — coleta, processamento, validação, acesso — com experiência que o cliente usa sem treinamento. Isso é o case para os próximos pitches. Cidades que veem a SABESP usando bem tendem a contratar mais rápido.',
      highlight: 'Case bem documentado reduz o ciclo de vendas dos próximos contratos.',
      highlightLabel: 'Social proof',
    },
  ],

  'operador-campo': [
    {
      slide: 0,
      action: 'Capa',
      title: 'Esta apresentação fala sobre você',
      body: 'Uma parte grande do que está sendo discutido aqui é sobre como tornar o seu trabalho mais fácil. Sem precisar ligar para alguém para confirmar se fez certo. Sem precisar lembrar de fluxos diferentes para cada tipo de operação.',
      highlight: 'Boa UX = você faz o trabalho certo na primeira tentativa.',
      highlightLabel: 'Para você',
    },
    {
      slide: 1,
      action: 'Problemas',
      title: '"O operador de campo trava e pede ajuda"',
      body: 'Esse problema é sobre você. Sem fluxo guiado, cada operação — instalação, verificação, manutenção — depende de memória ou ligação para o suporte. Um wizard com checklist e confirmação elimina isso.',
      highlight: 'Cada ligação evitada = mais tempo no campo, menos tempo esperando resposta.',
      highlightLabel: 'Sua dor',
    },
    {
      slide: 2,
      action: 'Personas',
      title: 'Você é o Operador de Campo',
      body: 'Celular na mão, conexão instável, sem tempo para dúvida. O sistema precisa funcionar no seu contexto — não no contexto de quem ficou no escritório. Com UX certo: passo a passo claro, confirmação imediata, sem margem para erro.',
      highlight: 'Sistema que funciona no seu contexto = operação autônoma.',
      highlightLabel: 'Seu perfil',
    },
    {
      slide: 4,
      action: 'Fleets',
      title: 'O wizard de instalação que você vai usar',
      body: 'Um dos módulos prioritários do Fleets é exatamente o fluxo de instalação e verificação em campo. A ideia é que você abra o app, siga o passo a passo e tenha confirmação de que fez certo — sem precisar ligar para ninguém.',
      highlight: 'Fluxo guiado com confirmação = autonomia total em campo.',
      highlightLabel: 'O que está sendo construído',
    },
    {
      slide: 4,
      action: 'SABESP',
      title: 'SABESP é o teste do wizard de campo',
      body: 'A plataforma operacional da SABESP vai ter exatamente esse fluxo: instalação, verificação e manutenção com wizard guiado. Se funcionar bem lá, esse mesmo padrão vai para todos os produtos que têm operação em campo.',
      highlight: 'O que funciona para a SABESP chega para você também.',
      highlightLabel: 'O piloto',
    },
  ],
}
