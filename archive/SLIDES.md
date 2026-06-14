> ⚠️ **DOCUMENTO DEPRECIADO** (arquivado em 2026-06-13)
>
> Esta versão da documentação de slides foi substituída por um novo `SLIDES.md` na raiz do projeto, com direcionamento atualizado. Mantido aqui apenas como referência histórica do conteúdo anterior. **Não use para orientar mudanças.**

---

# UX Presentation — Documentação de Slides

**Tema:** Estratégia de UX & Branding da Intelicity — _"Como o produto fala por si."_

**Formato:** Apresentação fullscreen otimizada para **1920×1080**. Sem scroll — cada slide usa a tela inteira como canvas. Texto mínimo, fontes grandes, títulos como protagonistas.

> Este documento reflete o conteúdo **efetivamente presente no código** (`src/slides/*`). A ordem de exibição é definida em `src/components/Presentation.tsx`; os steps de cada slide em `src/slides/config.ts`.

---

## Mapa de Navegação

A ordem visual difere dos nomes de arquivo (os arquivos `Slide05*`/`Slide06*` foram reordenados na apresentação):

| # | Slide (label) | Arquivo | Steps |
|---|---------------|---------|-------|
| 0 | Capa | `Slide00Capa.tsx` | Capa |
| 1 | Os Problemas | `Slide01Fundamento.tsx` | Problemas · Design System · Interfaces · Padrões · Demos · Branding · Stack IC |
| 2 | Onde Estamos | `Slide02Desafio.tsx` | Cadeia · Personas |
| 3 | Cada Projeto Exibe Dados | `Slide05DadosTodos.tsx` | Dados |
| 4 | O Custo Real | `Slide06CustoReal.tsx` | Custo |
| 5 | A Solução | `Slide03Crescimento.tsx` | Design System · Stack IC |
| 6 | Em Andamento | `Slide04Branding.tsx` | Fleets · Vision · SABESP |

---

## Slides

### Slide 0 — Capa
**Steps:** Capa · **Animação:** GSAP timeline (`power4.out`) — palavras do título sobem em cascata (mask + stagger 0.06s), meta/tag/subtítulo/nav entram em sequência

- Meta (10px): "Intelicity · Documento Estratégico · 2026"
- Tag (10px): "Branding & UX"
- Título (110px): "Como o produto **fala por si.**"
- Subtítulo (22px): "UX, branding e estrutura de produto — as três coisas que determinam se a Intelicity cresce com coerência ou com dívida."
- Nav hint (9px): "Use as setas para navegar"

---

### Slide 1 — Os Problemas
**Steps:** Problemas → Design System → Interfaces → Padrões → Demos → Branding → Stack IC · **Layout:** grid 3×2

Header (label muda conforme há soluções): "UX & Branding · **Os problemas**" → "· **As respostas**". Título 64px: "O que está travando a Intelicity **agora.**" Hint no canto direito ("Cada problema tem resposta →") aparece a partir da primeira solução.

**Revelação progressiva:** o step "Problemas" mostra os 6 cards em estado de diagnóstico (ícone vermelho, solução invisível com espaço reservado). Cada step seguinte revela a solução de **um** card na ordem — ícone e borda transicionam de vermelho para roxo (700ms), bloco `SOLUÇÃO` entra. Os nomes dos steps servem de índice no controle remoto.

6 cards (ícone 56px · título 27px · solução 18px):

| # | Problema (título) | Solução |
|---|-------------------|---------|
| 1 | Produtos com experiências diferentes | Design system aplicado a todo o ecossistema IC |
| 2 | Dados exibidos sem narrativa de decisão | Interfaces orientadas por contexto, perfil e ação |
| 3 | Cada novo produto aumenta a dívida de experiência | Padrões reutilizáveis para fluxos, telas e componentes |
| 4 | O valor do produto demora para aparecer | Demos e jornadas desenhadas para evidenciar impacto rapidamente |
| 5 | Comunicação comercial começa do zero a cada produto | Branding aplicado em apresentações, nomes, mensagens e modelos |
| 6 | O ecossistema ainda não comunica sua própria lógica | Stack IC com papéis definidos, linguagem comum e visão de conjunto |

> **Código de cores:** vermelho = diagnóstico/dor · roxo = UX respondendo (mesmo contrato visual do slide de Personas). O slide não remonta entre steps — tudo é transição de estado via `animate`.

---

### Slide 2 — Onde Estamos
**Steps:** Cadeia → Personas · Header (ambos): "Intelicity · Onde estamos"

#### Step 1 — Cadeia · narrativa orquestrada (~5s)

Título 54px: "A cadeia existe. Falta transformar **dado em ação.**"
Subtítulo 19px: "A Intelicity já revela problemas complexos. O próximo passo é desenhar como cada usuário entende, prioriza, justifica e age sobre esses dados."

**Sequência animada** (hook `useCadeiaNarrative` em `Slide02Desafio.tsx`):
1. Título e subtítulo entram
2. Canvas Three.js (`DataChain`) — partículas = evidências percorrendo a cadeia; nós acendem da esquerda para a direita (`chainStep` -1→4, 450ms cada)
3. Cards da cadeia acendem em sincronia (opacity 0.12 → 1):

| Nó | Frase |
|----|-------|
| Fiscalização | Coleta o que acontece na cidade |
| Dados | Transforma campo em evidência técnica |
| Contexto | Relaciona localização, tempo e impacto |
| Informação | Organiza o que precisa ser entendido |
| Decisão | Mostra o próximo passo possível |

4. **Camada UX** (`layer 1`, ~3.3s) varre a cadeia (scaleX + glow): "UX atua em toda a cadeia" + chips: Coleta · Validação · Agrupamento · Interpretação · Apresentação · Acompanhamento
5. **Camada Branding** (`layer 2`, ~4.1s, dourada): "Branding traduz valor para cada público" + chips: Gestores · Operadores · Áreas técnicas · Órgãos públicos · Compradores
6. **Conclusão** (`layer 3`, ~4.8s, 30px): "O dado revela o problema. **A experiência define se ele vira ação.**" + apoio: "Sem uma jornada clara, o cliente descobre mais demandas — mas não sabe como priorizar, justificar ou executar."

#### Step 2 — Personas

Título 54px: "Três pessoas. Três contextos. **Uma plataforma.**"

3 cards (ícone 40px · nome 30px · role 11px):

| Role | Persona | Dor (vermelho) | Ganho com UX (roxo) |
|------|---------|----------------|---------------------|
| Cliente · Decisor | Gestor de Cidade | Abre o sistema e não sabe por onde começar | Visualização pronta para o argumento que ele precisa fazer |
| Interno · Gestão | Operador de Sistema | Cada módulo exige memorizar um caminho diferente | Sistema previsível em todos os módulos |
| Interno · Execução | Operador de Campo | Precisa ligar para saber se fez certo | Wizard passo a passo com confirmação imediata |

---

### Slide 3 — Cada Projeto Exibe Dados
**Steps:** Dados · **Layout:** grid 5×2 de produtos

Header: "A dívida invisível". Título 64px: "Cada projeto exibe dados. Nenhum **documenta o porquê.**"

10 produtos em cards (ícone colorido · nome 22px), todos com badge "⚠ sem UX doc":

| Produto | Cor | Produto | Cor |
|---------|-----|---------|-----|
| IC Fleets | `#e85151` | IC Margin | `#c06840` |
| IC Vision | `#7c6ef5` | IC Gas | `#e87c3a` |
| IC Lumen | `#d4c53a` | IC Flood | `#3a7ce8` |
| IC Quality | `#7a9ab8` | IC Classify | `#b061e8` |
| IC Tree | `#2d7a4e` | IC Query | `#d4a53a` |

Punch line (30px, âmbar): "Cada módulo novo que entra **aprofunda a inconsistência.**"

---

### Slide 4 — O Custo Real
**Steps:** Custo · **Layout:** 4 cards com métricas grandes (52px)

Header: "O argumento de negócio". Título 64px: "UX não é custo. É **retenção de receita.**"

| Métrica | Label | Título |
|---------|-------|--------|
| 3–5× | reuniões para converter | Ciclo de vendas longo |
| 40–60% | do onboarding é retrabalho | Onboarding caro e repetido |
| ~30% | do suporte é usabilidade | Suporte gerado por UX ruim |
| baixa | renovação autônoma | Renovação que depende de esforço |

Punch line (34px): "A pergunta não é _'quanto custa investir em UX?'_ É **'quanto estamos pagando por não ter?'**"

---

### Slide 5 — A Solução
**Steps:** Design System → Stack IC · Header: "A solução" · Título 56px: "Uma resposta para todos os **problemas.**"

#### Step 1 — Design System

Subtítulo 36px: "O design system não é um entregável paralelo. **É a fundação.**"

5 cards numerados (título 22px):

1. **Auditoria** — Componentes e inconsistências mapeados
2. **Tokens** — Cores, tipografia, espaçamentos, grid
3. **Biblioteca** — Componentes prontos para qualquer módulo
4. **Padrões** — Estados e comportamentos documentados
5. **Guia de uso** — Aplicação correta por componente

Punch line (26px): "Quando o dev abre o Figma, **não tem dúvida.**"

#### Step 2 — Stack IC

Subtítulo 30px: "Da coleta à decisão. **Cada produto é uma camada.**"

Pipeline vertical (nome 24px):

| Camada | Produto | Descrição |
|--------|---------|-----------|
| Coleta | **IC Fleets** | Gestão da frota de dispositivos e agentes |
| Processamento | **Processamento Especializado** | 7 chips inline (ver abaixo) |
| Qualidade | **IC Classify** | SGC — validação humana das classificações da IA |
| Acesso | **IC Query** | LLM — o gestor pergunta, o sistema responde |

Chips da camada de processamento: IC Vision (Imagens e vídeos) · IC Lumen (Luminosidade) · IC Quality (Asfalto·IRI) · IC Tree (Árvores) · IC Margin (Encostas) · IC Gas (Vazamento de gás) · IC Flood (Drenagem)

Rodapé 3 colunas: **IC Face** (Interface) · **IC Labs** (Inovação) · **IC News** (Comunicação)

> ⚠️ **Arquitetura:** os 7 produtos de processamento são **independentes**. IC Vision processa imagens e vídeos para validações de qualidade, detecções e contexto.

---

### Slide 6 — Em Andamento
**Steps:** Fleets → Vision → SABESP · Header: "Em andamento" · Título 52px: "O foco atual — Fleets, Vision e **SABESP.**"

#### Step 1 — Fleets

Sublabel: "IC Fleets · Situação atual por módulo". Tabela full-height (Módulo · Foco UX · Status):

| Módulo | Foco UX | Status |
|--------|---------|--------|
| Config · CRUDs | Revisar consistência com o design system | 🟢 Pronto · revisar |
| Users & Roles | Perfil Motorista precisa ser desenhado do zero | 🟢 Pronto · revisar |
| Person | Busca, filtros, dispositivos, custo, histórico | 🟡 Parcial |
| Vehicles | Mapa com pins, heartbeat, gráficos de saúde | 🟡 Mapa pendente |
| Devices · Listagem | Fluxo específico de criação por dispositivo | 🟡 Parcial |
| Devices · Detalhes | Histórico, chip 5G, streaming, alertas | 🟡 Parcial |
| Contratos | Filtros por tipo, status e cidade | 🟢 Pronto · expandir |
| Pagamentos | Extrato, exportação Excel e PDF | 🟡 Parcial |
| Dashboards e Reports | TV 55'', controle remoto via QR e microfone | 🔴 Alta prioridade |
| Motorista | Landing, wizard, contrato digital, área logada | 🔴 Do zero |
| Funcionalidades Gerais | Wizard de instalação, QR, alertas, LGPD | 🔴 Do zero |

Legenda de cor do badge: verde = pronto/revisar · amarelo = parcial · vermelho = do zero/alta prioridade.

#### Step 2 — Vision

Título 38px: "Com os produtos crescendo, a arquitetura precisa ser definida **agora.**"
Apoio 19px: "Sete produtos independentes de processamento — cada um com seus próprios dados e interface. O trabalho de UX define como cada um se apresenta."

Grid 4 colunas (nome 22px · desc 14px):
IC Vision (Imagens e vídeos · detecções) · IC Lumen (Luminosidade urbana) · IC Quality (Qualidade do asfalto · IRI) · IC Tree (Catálogo de árvores) · IC Margin (Encostas · risco) · IC Gas (Vazamento de gás) · IC Flood (Drenagem e enchentes)

#### Step 3 — SABESP

Título 38px: "Validar a cadeia completa com um **cliente real.**"

3 cards (título 24px):
- **Plataforma operacional** — Wizard guiado de instalação, verificação e manutenção — sem margem para erro.
- **Dashboard de gestão** — Visualização por área, status de dispositivos, alertas e exportação.
- **Onboarding e demo** — Primeira experiência que demonstra valor em minutos, sem consultor ao lado.

Punch line (28px): "Fleets organiza a operação. Vision estrutura o produto. **SABESP valida a cadeia no mundo real.**"

---

## Companion Mobile (via QR)

Ao escanear o QR na apresentação, o usuário seleciona um perfil e vê conteúdo complementar sincronizado em tempo real com o slide do telão (SSE).

### 5 perfis:

| Perfil | Cor | Ângulo |
|--------|-----|--------|
| CEO / Dono da empresa | `#7c3af5` | Impacto financeiro + estratégia |
| Gestor de Cidade | `#3a7ce8` | Experiência do usuário gestor |
| Gerente de TI | `#2d7a4e` | Custo técnico + onboarding |
| CMO / Marketing | `#d4a53a` | Conversão + ciclo de vendas |
| Operador de Campo | `#e87c3a` | Autonomia em campo |

### URLs:
- `/remote` → seleção de perfil (QR mostrado na apresentação)
- `/companion?profile=<id>` → companion por perfil, sincronizado via SSE `/slide-state`
- `/presenter-remote` → controle remoto do apresentador

---

## Decisões de Design (apresentação)

- **Resolução alvo:** 1920×1080 fullscreen
- **Sem scroll:** todos os slides usam `overflow-hidden`; conteúdo dimensionado para caber
- **Canvas full-width:** container `w-full px-16` (sem max-width)
- **Hierarquia tipográfica:** H1 52–64px (capa 110px) · H2 30–38px · cards 22–30px · punch lines 26–34px
- **Texto mínimo:** títulos carregam a mensagem; parágrafos de apoio só quando essenciais
- **Punch lines:** vários slides terminam com uma frase de impacto em destaque (borda roxa/âmbar)
- **Cena 3D no Slide 2** (`DataChain`) ativa; `src/scenes/StackIC3D.tsx` existe mas não está em uso

---

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| React 19 + TypeScript | Framework principal |
| Vite 6 | Build |
| Tailwind CSS 4 | Utilitários de estilo |
| GSAP | Title reveal em cascata (Capa) + helpers em `src/transitions/gsap.ts` |
| Three.js | `DataChain` — partículas da cadeia (Slide 2). `StackIC3D` existe mas não está em uso |
| Motion (`motion/react`) | Micro-animações e revelações dentro dos slides |
| OGL | Background WebGL |
| Lucide React | Ícones |

**Fontes:** DM Sans (principal) · Space Mono (labels/tags)

**Conteúdo complementar:** o detalhe longo por perfil vive em `src/data/personas.ts` (companion) e `src/data/products.ts`. A apresentação principal usa versões curtas; o companion mobile entrega o aprofundamento.
