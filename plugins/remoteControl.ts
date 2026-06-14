import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { networkInterfaces } from 'os'
import { createSocket } from 'dgram'

function getLocalIP(): string {
  try {
    const socket = createSocket('udp4')
    socket.connect(53, '1.1.1.1')
    const { address } = socket.address()
    socket.close()
    if (address && address !== '0.0.0.0') return address
  } catch { /* fall through */ }

  const nets = networkInterfaces()
  let rfc1918 = ''
  for (const iface of Object.values(nets)) {
    for (const net of iface ?? []) {
      if (net.family !== 'IPv4' || net.internal) continue
      if (net.address.startsWith('192.168.')) return net.address
      if (!rfc1918 && (net.address.startsWith('10.') || /^172\.(1[6-9]|2\d|3[01])\./.test(net.address))) {
        rfc1918 = net.address
      }
    }
  }
  return rfc1918 || 'localhost'
}

interface PresentationState {
  slide: number
  slideLabel: string
  action: string
  actionIndex: number
  actions: readonly string[]
  totalSlides: number
}

// Companion content per profile per slide/action
// Mirrors src/data/personas.ts but as plain JS for the plugin
const COMPANION_CONTENT: Record<string, Array<{
  slide: number
  action: string
  title: string
  body: string
  highlight?: string
  metric?: { value: string; label: string }
}>> = {
  ceo: [
    { slide: 0, action: 'Capa', title: 'Por que isso importa para o negócio', body: 'A Intelicity tem tecnologia de ponta. O que está freando o crescimento não é o produto técnico — é a experiência que envolve esse produto. UX bem-feito é o que separa uma empresa que vende por esforço de uma que retém por valor.', highlight: 'Cada cliente que não renova custou mais para adquirir do que para reter.' },
    { slide: 1, action: 'Problemas', title: 'Seis problemas, um custo real', body: 'Cada problema listado tem impacto direto em receita: ciclos de venda longos, onboarding caro, suporte frequente e clientes que não renovam porque "o sistema é difícil".', highlight: 'Produto difícil de usar = menor NPS = menor taxa de renovação = menor LTV.', metric: { value: '3–5×', label: 'custo de aquisição vs. retenção' } },
    { slide: 2, action: 'Cadeia', title: 'A cadeia técnica existe. A de experiência, não.', body: 'Coleta, processamento, qualidade e acesso funcionam. Mas o gestor ainda não consegue agir com os dados sem ajuda. Isso é o gap — e é onde o investimento em UX retorna mais rápido.', highlight: 'Dado que não gera decisão não gera valor.' },
    { slide: 2, action: 'Personas', title: 'Três usuários, três pontos de perda', body: 'Gestor que não entende o dado não renova. Operador que precisa de suporte gera custo. Prospect que sai da demo sem entender o valor não fecha.', highlight: 'UX resolve os três ao mesmo tempo.', metric: { value: '68%', label: 'dos usuários abandonam apps difíceis na 1ª sessão' } },
    { slide: 3, action: 'Dados', title: 'Dívida invisível = custo crescente', body: '10 produtos exibindo dados sem critério documentado. Cada módulo novo aprofunda a inconsistência. Isso é dívida técnica de experiência — e ela tem juros.', highlight: 'Inconsistência de UX gera suporte, treinamento e churno.' },
    { slide: 4, action: 'Custo', title: 'Quanto estamos pagando por não ter UX?', body: 'Ciclos de venda longos, onboarding caro, suporte gerado por usabilidade, renovações que dependem de esforço. Tudo isso já tem custo. UX resolve esses custos.', highlight: 'A pergunta não é quanto custa investir em UX. É quanto custa não ter.' },
    { slide: 5, action: 'Design System', title: 'Design system é investimento de infraestrutura', body: 'Assim como você não reconstrói o banco de dados a cada novo módulo, o design system evita reconstruir a experiência do zero. Cada módulo novo que segue o sistema custa menos.', highlight: 'Empresas com design system maduro entregam features 40% mais rápido.' },
    { slide: 5, action: 'Stack IC', title: 'Cada produto IC é uma oportunidade de receita', body: 'Lumen, Quality, Tree, Margin, Gas, Flood — cada produto é um contrato potencial com uma cidade. A UX torna cada um vendável de forma autônoma.', highlight: 'Produto autoexplicativo fecha mais rápido e renova mais.' },
    { slide: 6, action: 'Fleets', title: 'Fleets é onde a operação acontece', body: 'Esse é o produto que os clientes usam no dia a dia. Inconsistência aqui gera suporte e insatisfação. Cada módulo consistente reduz custo e aumenta satisfação.', highlight: 'Operação eficiente = menos suporte = mais margem.' },
    { slide: 6, action: 'Vision', title: 'Architecture de UX precisa ser definida agora', body: 'Com 7 produtos na camada de processamento, definir o padrão de experiência agora custa 1/10 do que corrigir depois.', highlight: 'Definir padrão agora custa 1/10 do que corrigir depois.' },
    { slide: 6, action: 'SABESP', title: 'SABESP valida o modelo de negócio', body: 'Se a cadeia completa funcionar bem na SABESP, temos um case replicável para qualquer prefeitura.', highlight: 'Um case bem executado vale mais que 10 demos.' },
  ],
  'gestor-cidade': [
    { slide: 0, action: 'Capa', title: 'O que está sendo apresentado aqui', body: 'Esta apresentação fala sobre como a Intelicity vai melhorar a experiência da plataforma que você usa. O objetivo é que os dados que você já tem se tornem mais fáceis de usar — especialmente em reuniões de câmara.', highlight: 'Dados que você já tem, organizados para a decisão que você precisa tomar.' },
    { slide: 1, action: 'Problemas', title: 'Problemas que você provavelmente já sentiu', body: '"Abre o sistema e não sabe por onde começar." Isso é o que acontece quando a plataforma não foi desenhada para o seu contexto — 3 minutos, dados que precisam contar uma história.', highlight: 'A informação existe. O que falta é a experiência que a torna acionável.' },
    { slide: 2, action: 'Cadeia', title: 'Você está no final da cadeia — e é o mais importante', body: 'Toda a coleta, todo o processamento existe para que você possa tomar uma decisão melhor. Se a interface não entrega os dados de forma clara, a cadeia inteira falhou no último metro.', highlight: 'Um dashboard bem desenhado para sua reunião vale toda a tecnologia que o alimenta.' },
    { slide: 2, action: 'Personas', title: 'Você é o Gestor de Cidade', body: 'Reunião de câmara, 3 minutos, investimento para justificar. O sistema precisa te entregar a visualização pronta — não um relatório que você precisa interpretar.', highlight: 'Dados que contam história ≠ dados que exigem interpretação.' },
    { slide: 3, action: 'Dados', title: 'Seus dados não têm critério de exibição', body: 'Todos os produtos que entregam informação para você foram construídos sem documentar por que exibem os dados da forma que exibem. O que você vê é uma decisão arbitrária, não uma decisão de design.', highlight: 'Com UX: cada dado exibido tem um porquê — e esse porquê é você.' },
    { slide: 4, action: 'Custo', title: 'Quanto isso custa para você', body: 'Dados difíceis de interpretar significam mais tempo gasto, mais dependência de consultores para interpretar relatórios, e risco de tomar decisões com informação incompleta.', highlight: 'Sistema que você entende = decisão mais rápida, argumento mais forte.' },
    { slide: 5, action: 'Stack IC', title: 'Cada produto IC resolve um problema da sua cidade', body: 'Lumen para iluminação, Quality para pavimento, Tree para arborização, Margin para encostas, Gas para gás, Flood para enchentes. Com boa UX, você acessa o que precisa quando precisa.', highlight: 'Um painel por problema, não um painel para tudo.' },
    { slide: 6, action: 'SABESP', title: 'SABESP é o piloto — cidades como a sua são o próximo', body: 'O trabalho sendo feito agora para a SABESP é exatamente o modelo que vai ser replicado. Se a sua prefeitura usa a plataforma, essas melhorias chegam até você.', highlight: 'Cada melhoria de UX feita para um cliente beneficia todos os clientes.' },
  ],
  'gerente-ti': [
    { slide: 0, action: 'Capa', title: 'UX é infraestrutura de produto', body: 'Para TI, UX não é "deixar bonito". É documentação de comportamento, padrão de componentes, especificação de estado. Sem isso, cada módulo novo gera suporte para você.', highlight: 'Inconsistência de UX gera bugs de comportamento que chegam no seu ticket.' },
    { slide: 1, action: 'Problemas', title: 'Esses problemas chegam até você como suporte', body: 'Operador de campo que trava = ticket de suporte. Gestor que não entende o dado = chamada para explicar. Módulo sem fluxo guiado = treinamento a cada nova pessoa.', highlight: 'Cada problema de UX não resolvido vira volume de suporte.', metric: { value: '~30%', label: 'do suporte técnico é causado por problemas de usabilidade' } },
    { slide: 2, action: 'Cadeia', title: 'A cadeia técnica funciona. A de experiência não foi documentada.', body: 'Coleta, processamento, qualidade e acesso têm arquitetura documentada. Mas a camada de experiência não tem nenhuma documentação. Isso é dívida técnica de UX.', highlight: 'UX sem documentação = arquitetura sem diagrama.' },
    { slide: 3, action: 'Dados', title: '10 produtos. Nenhum com UX documentado.', body: 'Cada produto que exibe dados tomou decisões de interface sem registro. Quando você precisa fazer onboarding de um novo dev, ele não tem referência. Quando um módulo muda, o comportamento muda imprevisível.', highlight: 'Sem documentação de UX, o onboarding técnico nunca termina.' },
    { slide: 4, action: 'Custo', title: 'O custo de suporte que você absorve', body: 'Cerca de 30% do suporte técnico é causado por problemas de usabilidade — não por bugs. Isso significa que parte do seu time está resolvendo problemas que poderiam não existir.', highlight: 'UX bem feito reduz volume de suporte sem mudar uma linha de infra.', metric: { value: '~30%', label: 'do suporte técnico é usabilidade' } },
    { slide: 5, action: 'Design System', title: 'Design system é para o dev, não só para o designer', body: 'Com o design system, o dev não toma decisões de interface sozinho. Os componentes já existem, os estados estão documentados. Isso reduz revisão, bug e PR que vai e volta.', highlight: 'Dev que não precisa inventar UI entrega feature mais rápido com menos bug.' },
    { slide: 6, action: 'Fleets', title: 'Fleets tem 11 módulos com UX não documentado', body: 'Cada módulo foi construído em momentos diferentes, com critérios diferentes. Sem padrão, cada integração nova exige entender regras invisíveis, não escritas.', highlight: 'Padronização reduz tempo de onboarding técnico de semanas para dias.' },
  ],
  cmo: [
    { slide: 0, action: 'Capa', title: 'O produto precisa se vender', body: 'A demo atual exige que você explique o valor. Um produto bem desenhado demonstra o valor por si — o prospect vê e entende, sem precisar de consultor ao lado.', highlight: 'Produto autoexplicativo vende mais do que produto bem explicado.' },
    { slide: 1, action: 'Problemas', title: 'A demo não converte na primeira reunião', body: '"A demonstração é densa demais para quem vê pela primeira vez." Cada reunião extra para convencer um prospect é um custo de tempo, CAC e pipeline travado.', highlight: 'Demo que não converte na 1ª reunião dobra o custo de aquisição.', metric: { value: '2.3×', label: 'mais reuniões necessárias sem UX otimizado' } },
    { slide: 2, action: 'Personas', title: 'Cada persona é um argumento de venda diferente', body: 'Para o Gestor de Cidade, clareza de dados para a câmara. Para o Operador, eficiência. Para o Operador de Campo, autonomia. Com UX bem feito, o produto comunica cada valor para quem importa.', highlight: 'Produto que se adapta ao contexto de quem vê converte mais.' },
    { slide: 3, action: 'Dados', title: 'Sem critério de exibição, a demo é uma roleta', body: 'Quando os dados são exibidos sem critério de usuário, a demo depende de você selecionar o que mostrar e como explicar. Com UX bem feito, o produto conta a história sozinho.', highlight: 'Demo que conta história sozinha = menos depende de você explicar.' },
    { slide: 4, action: 'Custo', title: 'O custo do ciclo de vendas longo', body: 'Cada reunião extra custa tempo de engenheiro, vendedor e prospect. Uma demo que demonstra valor em minutos encurta o ciclo e libera seu time para mais prospects.', highlight: 'Ciclo mais curto = mais contratos com o mesmo time.', metric: { value: '2.3×', label: 'mais reuniões sem UX otimizado' } },
    { slide: 5, action: 'Stack IC', title: 'O portfólio IC precisa de identidade', body: 'Lumen, Quality, Tree, Margin, Gas, Flood — cada produto tem um cliente em potencial diferente. Sem identidade visual definida, cada pitch começa do zero.', highlight: 'Portfólio com identidade forte permite que parceiros vendam por você.' },
    { slide: 6, action: 'SABESP', title: 'SABESP é o case que você precisa', body: 'Um caso de uso completo com experiência que o cliente usa sem treinamento. Isso é o case para os próximos pitches. Cidades que veem a SABESP usando bem tendem a contratar mais rápido.', highlight: 'Case bem documentado reduz o ciclo de vendas dos próximos contratos.' },
  ],
  'operador-campo': [
    { slide: 0, action: 'Capa', title: 'Esta apresentação fala sobre você', body: 'Uma parte grande do que está sendo discutido é sobre como tornar o seu trabalho mais fácil. Sem precisar ligar para alguém para confirmar se fez certo.', highlight: 'Boa UX = você faz o trabalho certo na primeira tentativa.' },
    { slide: 1, action: 'Problemas', title: '"O operador de campo trava e pede ajuda"', body: 'Esse problema é sobre você. Sem fluxo guiado, cada operação depende de memória ou ligação para o suporte. Um wizard com checklist e confirmação elimina isso.', highlight: 'Cada ligação evitada = mais tempo no campo, menos tempo esperando resposta.' },
    { slide: 2, action: 'Personas', title: 'Você é o Operador de Campo', body: 'Celular na mão, conexão instável, sem tempo para dúvida. O sistema precisa funcionar no seu contexto. Com UX certo: passo a passo claro, confirmação imediata, sem margem para erro.', highlight: 'Sistema que funciona no seu contexto = operação autônoma.' },
    { slide: 3, action: 'Dados', title: 'Você usa sistemas que não foram desenhados para você', body: 'Cada app que você usa em campo foi construído sem documentar o seu contexto de uso. Conectividade instável, tela pequena, operação sob pressão — nada disso foi levado em conta sistematicamente.', highlight: 'Com UX bem feito: cada tela funciona para como você trabalha.' },
    { slide: 6, action: 'Fleets', title: 'O wizard de instalação que você vai usar', body: 'Um dos módulos prioritários do Fleets é o fluxo de instalação e verificação em campo. Você abre o app, segue o passo a passo e tem confirmação de que fez certo — sem precisar ligar para ninguém.', highlight: 'Fluxo guiado com confirmação = autonomia total em campo.' },
    { slide: 6, action: 'SABESP', title: 'SABESP é o teste do wizard de campo', body: 'A plataforma operacional da SABESP vai ter exatamente esse fluxo: instalação, verificação e manutenção com wizard guiado. Se funcionar bem lá, esse padrão vai para todos os produtos com operação em campo.', highlight: 'O que funciona para a SABESP chega para você também.' },
  ],
}

const PROFILES = [
  { id: 'ceo', name: 'CEO', role: 'Dono da empresa', color: '#7c3af5' },
  { id: 'gestor-cidade', name: 'Gestor de Cidade', role: 'Prefeitura · Cliente', color: '#3a7ce8' },
  { id: 'gerente-ti', name: 'Gerente de TI', role: 'Interno · Tecnologia', color: '#2d7a4e' },
  { id: 'cmo', name: 'CMO / Marketing', role: 'Interno · Vendas & Marketing', color: '#d4a53a' },
  { id: 'operador-campo', name: 'Operador de Campo', role: 'Interno · Execução', color: '#e87c3a' },
]

export function remoteControlPlugin(): Plugin {
  const sseClients = new Set<ServerResponse>()       // presenter remote desktop subscribers
  const companionClients = new Set<ServerResponse>() // companion mobile subscribers (read-only)
  let actualPort = 5173
  let presentationState: PresentationState = {
    slide: 0, slideLabel: '', action: '', actionIndex: 0, actions: [], totalSlides: 7,
  }

  return {
    name: 'remote-control',

    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const addr = server.httpServer?.address()
        if (addr && typeof addr === 'object') actualPort = addr.port
      })

      // Desktop subscribes here to receive commands from presenter remote
      server.middlewares.use('/remote-events', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.write('data: {"type":"connected"}\n\n')
        sseClients.add(res)
        req.on('close', () => sseClients.delete(res))
      })

      // Companion clients subscribe here for read-only slide state (no legacy mobile-events)
      server.middlewares.use('/slide-state', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(`data: ${JSON.stringify(presentationState)}\n\n`)
        companionClients.add(res)
        req.on('close', () => companionClients.delete(res))
      })

      // Legacy /mobile-events kept for backwards compat
      server.middlewares.use('/mobile-events', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.write(`data: ${JSON.stringify(presentationState)}\n\n`)
        companionClients.add(res)
        req.on('close', () => companionClients.delete(res))
      })

      // Presenter remote POSTs commands here
      server.middlewares.use('/remote-command', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const { action } = JSON.parse(body) as { action: string }
            if (action && action !== 'ping') {
              const msg = `data: ${JSON.stringify({ action })}\n\n`
              sseClients.forEach((client) => {
                try { client.write(msg) } catch { sseClients.delete(client) }
              })
            }
          } catch { /* ignore malformed JSON */ }
          res.writeHead(200)
          res.end('ok')
        })
      })

      // Desktop POSTs presentation state here on every slide/action change
      server.middlewares.use('/remote-update', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            presentationState = { ...presentationState, ...JSON.parse(body) }
            const msg = `data: ${JSON.stringify(presentationState)}\n\n`
            companionClients.forEach((client) => {
              try { client.write(msg) } catch { companionClients.delete(client) }
            })
          } catch { /* ignore malformed JSON */ }
          res.writeHead(200)
          res.end('ok')
        })
      })

      // React app fetches this to build the QR code URL — now points to profile selection
      server.middlewares.use('/remote-info', (_req: IncomingMessage, res: ServerResponse) => {
        const ip = getLocalIP()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ remoteUrl: `http://${ip}:${actualPort}/remote` }))
      })

      // /remote → profile selection landing page
      server.middlewares.use('/remote', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url ?? ''
        if (url !== '/' && url !== '') { next(); return }
        const host = req.headers.host ?? `localhost:${actualPort}`
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(buildProfileSelectionHTML(host))
      })

      // /companion?profile=X → companion page for a specific profile
      server.middlewares.use('/companion', (req: IncomingMessage, res: ServerResponse) => {
        const host = req.headers.host ?? `localhost:${actualPort}`
        const profileParam = (req.url ?? '').split('profile=')[1]?.split('&')[0] ?? ''
        const profile = PROFILES.find(p => p.id === profileParam) ?? PROFILES[0]
        const content = COMPANION_CONTENT[profile.id] ?? []
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(buildCompanionHTML(host, profile, content))
      })

      // /presenter-remote → original presenter control UI
      server.middlewares.use('/presenter-remote', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url ?? ''
        if (url !== '/' && url !== '') { next(); return }
        const host = req.headers.host ?? `localhost:${actualPort}`
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(buildPresenterRemoteHTML(host))
      })
    },
  }
}

const SHARED_FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com" /><link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,600&display=swap" rel="stylesheet" />`

const BASE_CSS = `* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
html, body { height: 100%; background: #13111a; color: #ede9f6; font-family: 'DM Sans', sans-serif; }
body { background-image: linear-gradient(rgba(167,139,250,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.025) 1px, transparent 1px); background-size: 48px 48px; }`

function buildProfileSelectionHTML(host: string): string {
  const profiles = PROFILES.map(p =>
    `<a class="profile-card" href="http://${host}/companion?profile=${p.id}" style="--c:${p.color}">
      <div class="profile-color-bar" style="background:${p.color}"></div>
      <div class="profile-name">${p.name}</div>
      <div class="profile-role">${p.role}</div>
    </a>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Intelicity · Quem é você?</title>
  ${SHARED_FONTS}
  <style>
    ${BASE_CSS}
    body { overflow-y: auto; touch-action: pan-y; }
    .layout { min-height: 100%; display: flex; flex-direction: column; align-items: center; padding: 36px 20px 48px; }
    .wordmark { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .18em; color: rgba(167,139,250,.3); margin-bottom: 36px; }
    .headline { font-size: 22px; font-weight: 600; color: #ede9f6; text-align: center; margin-bottom: 8px; letter-spacing: -.02em; }
    .subline { font-size: 13px; font-weight: 300; color: rgba(237,233,246,.4); text-align: center; margin-bottom: 32px; line-height: 1.6; max-width: 280px; }
    .profiles { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 380px; }
    .profile-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); text-decoration: none; color: inherit; transition: all .15s; border-radius: 2px; }
    .profile-card:active { background: rgba(255,255,255,.08); transform: scale(.98); }
    .profile-color-bar { width: 3px; height: 38px; border-radius: 2px; flex-shrink: 0; }
    .profile-name { font-size: 15px; font-weight: 600; color: rgba(237,233,246,.9); }
    .profile-role { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .14em; color: rgba(237,233,246,.3); text-transform: uppercase; margin-top: 3px; }
    .note { margin-top: 32px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .12em; color: rgba(167,139,250,.25); text-align: center; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="wordmark">INTELICITY &middot; COMPANION</div>
    <div class="headline">Quem é você?</div>
    <div class="subline">Selecione seu perfil para ver informações complementares à apresentação.</div>
    <div class="profiles">${profiles}</div>
    <div class="note">O conteúdo muda conforme o slide atual.</div>
  </div>
</body>
</html>`
}

function buildCompanionHTML(
  host: string,
  profile: { id: string; name: string; role: string; color: string },
  content: Array<{ slide: number; action: string; title: string; body: string; highlight?: string; metric?: { value: string; label: string } }>
): string {
  const slideStateUrl = `http://${host}/slide-state`
  const contentJson = JSON.stringify(content)
  const profileJson = JSON.stringify(profile)

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Intelicity · ${profile.name}</title>
  ${SHARED_FONTS}
  <style>
    ${BASE_CSS}
    body { overflow-y: auto; touch-action: pan-y; }
    .layout { min-height: 100%; display: flex; flex-direction: column; align-items: stretch; padding: 28px 20px 48px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .wordmark { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .18em; color: rgba(167,139,250,.3); }
    .profile-chip { display: flex; align-items: center; gap: 8px; }
    .chip-dot { width: 8px; height: 8px; border-radius: 50%; }
    .chip-name { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .12em; color: rgba(237,233,246,.45); }

    .slide-context { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .18em; color: rgba(167,139,250,.4); text-transform: uppercase; margin-bottom: 20px; min-height: 12px; }

    .card { border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); padding: 22px; margin-bottom: 12px; transition: opacity .3s; }
    .card.loading { opacity: .4; }
    .card-title { font-size: 17px; font-weight: 600; color: rgba(237,233,246,.92); letter-spacing: -.02em; margin-bottom: 10px; line-height: 1.3; }
    .card-body { font-size: 13px; font-weight: 300; color: rgba(237,233,246,.5); line-height: 1.75; }
    .highlight { margin-top: 14px; padding: 12px 14px; border-left: 2px solid; font-size: 12px; font-weight: 400; line-height: 1.6; }
    .metric { margin-top: 14px; display: flex; align-items: baseline; gap: 10px; }
    .metric-value { font-size: 26px; font-weight: 700; letter-spacing: -.03em; }
    .metric-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .1em; color: rgba(237,233,246,.35); text-transform: uppercase; line-height: 1.4; max-width: 160px; }

    .empty { text-align: center; padding: 48px 0; color: rgba(237,233,246,.2); font-size: 13px; font-weight: 300; }

    .status-bar { display: flex; align-items: center; gap: 8px; margin-top: 32px; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(167,139,250,.3); transition: background .4s, box-shadow .4s; flex-shrink: 0; }
    .dot.on { background: #3ad47e; box-shadow: 0 0 8px rgba(58,212,126,.5); }
    .status-text { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .1em; color: rgba(237,233,246,.2); }

    .back { margin-top: 24px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .1em; color: rgba(167,139,250,.3); text-decoration: none; display: block; text-align: center; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="header">
      <div class="wordmark">INTELICITY &middot; COMPANION</div>
      <div class="profile-chip">
        <div class="chip-dot" style="background:${profile.color}"></div>
        <div class="chip-name" id="profile-name">${profile.name.toUpperCase()}</div>
      </div>
    </div>

    <div class="slide-context" id="slide-context">AGUARDANDO APRESENTAÇÃO...</div>

    <div id="content-area">
      <div class="empty">Aguardando o próximo slide...</div>
    </div>

    <div class="status-bar">
      <div class="dot" id="dot"></div>
      <div class="status-text" id="status-text">CONECTANDO...</div>
    </div>

    <a href="http://${host}/remote" class="back">← Trocar perfil</a>
  </div>

  <script>
    const profile = ${profileJson};
    const allContent = ${contentJson};
    const slideStateUrl = '${slideStateUrl}';

    function findContent(slide, action) {
      return allContent.find(c => c.slide === slide && c.action === action)
        || allContent.find(c => c.slide === slide)
        || null;
    }

    function render(state) {
      const ctx = document.getElementById('slide-context');
      ctx.textContent = (state.slideLabel || '').toUpperCase() + (state.action ? ' · ' + state.action.toUpperCase() : '');

      const area = document.getElementById('content-area');
      const content = findContent(state.slide, state.action);

      if (!content) {
        area.innerHTML = '<div class="empty">Conteúdo específico não disponível para este slide.</div>';
        return;
      }

      let html = '<div class="card">';
      html += '<div class="card-title">' + escHtml(content.title) + '</div>';
      html += '<div class="card-body">' + escHtml(content.body) + '</div>';

      if (content.metric) {
        html += '<div class="metric">';
        html += '<div class="metric-value" style="color:' + profile.color + '">' + escHtml(content.metric.value) + '</div>';
        html += '<div class="metric-label">' + escHtml(content.metric.label) + '</div>';
        html += '</div>';
      }

      if (content.highlight) {
        html += '<div class="highlight" style="border-color:' + profile.color + '40;background:' + profile.color + '08;color:' + profile.color + 'cc">' + escHtml(content.highlight) + '</div>';
      }

      html += '</div>';
      area.innerHTML = html;
    }

    function escHtml(str) {
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // SSE connection
    let es;
    function connect() {
      es = new EventSource(slideStateUrl);
      es.onopen = () => {
        document.getElementById('dot').classList.add('on');
        document.getElementById('status-text').textContent = 'AO VIVO';
      };
      es.onmessage = (e) => {
        try {
          const state = JSON.parse(e.data);
          if ('slide' in state) render(state);
        } catch {}
      };
      es.onerror = () => {
        document.getElementById('dot').classList.remove('on');
        document.getElementById('status-text').textContent = 'RECONECTANDO...';
        es.close();
        setTimeout(connect, 3000);
      };
    }
    connect();
  </script>
</body>
</html>`
}

function buildPresenterRemoteHTML(host: string): string {
  const commandUrl = `http://${host}/remote-command`
  const eventsUrl = `http://${host}/mobile-events`
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Intelicity · Presenter Remote</title>
  ${SHARED_FONTS}
  <style>
    ${BASE_CSS}
    * { touch-action: none; overflow: hidden; }
    .layout { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 20px; gap: 0; }
    .wordmark { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .18em; color: rgba(167,139,250,.3); margin-bottom: 16px; }
    .status { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .12em; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(167,139,250,.3); transition: background .4s, box-shadow .4s; flex-shrink: 0; }
    .dot.on { background: #3ad47e; box-shadow: 0 0 8px rgba(58,212,126,.5); }
    .status-text { color: rgba(237,233,246,.38); }
    .slide-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .18em; color: rgba(167,139,250,.7); margin-bottom: 16px; min-height: 14px; }
    .action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 8px; width: 100%; max-width: 380px; margin-bottom: 20px; }
    .action-btn { padding: 16px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); color: rgba(237,233,246,.55); font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; transition: all .15s; user-select: none; -webkit-user-select: none; line-height: 1.3; text-align: center; }
    .action-btn.sel { background: rgba(167,139,250,.14); border-color: rgba(167,139,250,.45); color: #c4b5fd; box-shadow: 0 0 10px rgba(167,139,250,.1); }
    .action-btn:active { transform: scale(.92); }
    .slide-nav { display: flex; align-items: center; gap: 10px; width: 100%; max-width: 380px; }
    .nav-btn { flex: 1; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.02); color: rgba(237,233,246,.38); font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .12em; cursor: pointer; transition: all .15s; user-select: none; -webkit-user-select: none; }
    .nav-btn:active { background: rgba(255,255,255,.06); color: rgba(237,233,246,.7); transform: scale(.96); }
    .slide-pos { font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(237,233,246,.2); letter-spacing: .08em; white-space: nowrap; }
    .feedback { margin-top: 16px; font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(167,139,250,.45); letter-spacing: .1em; min-height: 14px; opacity: 0; transition: opacity .3s; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="wordmark">INTELICITY &middot; PRESENTER REMOTE</div>
    <div class="status">
      <div class="dot" id="dot"></div>
      <span class="status-text" id="st">CONECTANDO...</span>
    </div>
    <div class="slide-label" id="slide-label">&mdash;</div>
    <div class="action-grid" id="action-grid"></div>
    <div class="slide-nav">
      <button class="nav-btn" id="bp">&larr; SLIDE</button>
      <span class="slide-pos" id="spos">1/7</span>
      <button class="nav-btn" id="bn">SLIDE &rarr;</button>
    </div>
    <div class="feedback" id="fb"></div>
  </div>
  <script>
    const dot = document.getElementById('dot');
    const st  = document.getElementById('st');
    const fb  = document.getElementById('fb');
    const slideLabel = document.getElementById('slide-label');
    const actionGrid = document.getElementById('action-grid');
    const spos = document.getElementById('spos');
    let fbTimer;
    let currentAction = '';

    function showFeedback(msg) {
      clearTimeout(fbTimer);
      fb.textContent = msg;
      fb.style.opacity = '1';
      fbTimer = setTimeout(() => { fb.style.opacity = '0'; }, 800);
    }

    async function send(action) {
      try {
        await fetch('${commandUrl}', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
      } catch { showFeedback('sem conexão'); }
    }

    function renderActions(state) {
      currentAction = state.action;
      slideLabel.textContent = (state.slideLabel || '—').toUpperCase();
      spos.textContent = (state.slide + 1) + '/' + state.totalSlides;
      const actions = state.actions || [];
      actionGrid.innerHTML = '';
      actions.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'action-btn' + (name === currentAction ? ' sel' : '');
        btn.textContent = name.toUpperCase();
        const go = () => { send(name); showFeedback(name.toUpperCase()); };
        btn.addEventListener('touchstart', e => { e.preventDefault(); go(); }, { passive: false });
        btn.addEventListener('click', go);
        actionGrid.appendChild(btn);
      });
    }

    const mobileEs = new EventSource('${eventsUrl}');
    mobileEs.onmessage = e => {
      try {
        const state = JSON.parse(e.data);
        if ('actions' in state) renderActions(state);
      } catch {}
    };

    async function ping() {
      try {
        await fetch('${commandUrl}', { method: 'POST', headers: {'Content-Type':'application/json'}, body: '{"action":"ping"}' });
        dot.classList.add('on');
        st.textContent = 'CONECTADO';
      } catch {
        dot.classList.remove('on');
        st.textContent = 'SEM CONEXÃO';
      }
      setTimeout(ping, 5000);
    }

    function addNavBtn(id, action, label) {
      const el = document.getElementById(id);
      const go = () => { send(action); showFeedback(label); };
      el.addEventListener('touchstart', e => { e.preventDefault(); go(); }, { passive: false });
      el.addEventListener('click', go);
    }
    addNavBtn('bp', 'prev', '← SLIDE');
    addNavBtn('bn', 'next', 'SLIDE →');
    ping();
  </script>
</body>
</html>`
}
