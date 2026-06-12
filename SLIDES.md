# UX Presentation — Documentação de Slides

**Tema:** Estratégia de UX & Branding da Intelicity — _"Como o produto fala por si."_

---

## Mapa de Navegação

```
Slide 0 (Capa)          → 1 step:  Capa
Slide 1 (Os Problemas)  → 1 step:  Problemas
Slide 2 (Onde Estamos)  → 2 steps: Cadeia, Personas
Slide 3 (A Solução)     → 2 steps: Design System, Stack IC
Slide 4 (Em Andamento)  → 3 steps: Fleets, Vision, SABESP
```

---

## Slides Ativos

### Slide 0 — Capa

**Steps:** Capa

- Header: "Intelicity · Documento Estratégico · 2026"
- Tag: "Branding & UX"
- Título principal: "Como o produto **fala por si.**"
- Subtítulo: sobre UX, branding e estrutura de produto — e por que determinam se a Intelicity cresce com coerência ou com dívida
- Rodapé: "Use as setas para navegar"

---

### Slide 1 — Os Problemas

**Steps:** Problemas

6 cards em grid 2 colunas. Cada card tem **problema**, **solução** e **impacto**:

| # | Título | Ícone |
|---|--------|-------|
| 1 | Sem padrão visual entre módulos | Layers |
| 2 | O gestor vê dados, não consegue agir | BarChart2 |
| 3 | O operador de campo trava e pede ajuda | Smartphone |
| 4 | A demo não converte na primeira reunião | Monitor |
| 5 | Sem identidade de produto, cada peça começa do zero | FileText |
| 6 | O produto não fala por si | Zap |

---

### Slide 2 — Onde Estamos

**Steps:** Cadeia → Personas

#### Step 1 — Cadeia

Cinco camadas de transformação:

```
Coleta em campo    → Fiscalização
Captura técnica    → Dados
Processamento      → Contexto
Organização        → Informação
Clareza            → Decisão
                   ↓
              Execução precisa
```

> "Os dados existem, o processamento existe, mas falta a experiência que torna tudo legível — para o gestor na câmara, o operador em campo e o prospect na primeira demo."

#### Step 2 — Personas

3 personas em grid:

| Persona | Ícone | Contexto | Dor | Ganho com UX |
|---------|-------|----------|-----|--------------|
| Gestor de Cidade | Briefcase | Reunião na câmara, 3 min para justificar investimento | Abre o sistema e não sabe por onde começar | Visualização já organizada para o argumento que precisa fazer |
| Operador de Sistema | Monitor | Passa a maior parte do dia no sistema | Fluxos inconsistentes que exigem memorização | Sistema que se comporta de forma previsível em todos os módulos |
| Operador de Campo | Smartphone | Celular na mão, conexão instável, sem tempo para dúvida | Precisa ligar para alguém para confirmar que fez certo | Wizard passo a passo com confirmação imediata, sem margem para erro |

---

### Slide 3 — A Solução

**Steps:** Design System → Stack IC

#### Step 1 — Design System

5 entregáveis numerados:

1. **Auditoria** — componentes, padrões e inconsistências mapeados
2. **Tokens** — cores, tipografia, espaçamento, bordas, sombras, grid
3. **Biblioteca de componentes** — botões, inputs, tabelas, cards, modais, filtros, mapas, gráficos
4. **Padrões de interação** — estados, animações, comportamentos documentados
5. **Guia de uso** — exemplos de aplicação correta e incorreta por componente

#### Step 2 — Stack IC

Pipeline vertical de produtos:

| Camada | Produto | Cor | Descrição |
|--------|---------|-----|-----------|
| Coleta | **IC Fleets** | `#e85151` | Gestão da frota de dispositivos e agentes |
| Processamento | **IC Vision** | `#7c6ef5` | Processamento central por IA, distribui para módulos especializados |
| ↳ Sub-produtos | IC Lumen | `#d4c53a` | Luminosidade pública |
| | IC Quality | `#7a9ab8` | Qualidade do asfalto · IRI |
| | IC Grass | `#2d7a4e` | Vegetação urbana |
| | IC Margin | `#c06840` | Encostas · risco |
| | IC Gas | `#e87c3a` | Vazamento de gás |
| | IC Flood | `#3a7ce8` | Alagamento · alertas |
| Qualidade | **IC Classify** | `#b061e8` | SGC — validação humana das classificações geradas pela IA |
| Acesso | **IC Query** | `#d4a53a` | LLM — interface de linguagem natural para os dados |

**Serviços de plataforma:**

| Produto | Cor | Descrição |
|---------|-----|-----------|
| **IC Face** | `#3ab8d4` | Biblioteca de micro front-ends |
| **IC Labs** | `#3a9ed4` | P&D — onde os próximos produtos são testados |
| **IC News** | `#3ad47e` | Canal de releases, novidades e cases |

---

### Slide 4 — Em Andamento

**Steps:** Fleets → Vision → SABESP

#### Step 1 — Fleets

11 módulos com foco UX e status:

| Módulo | Foco UX | Status |
|--------|---------|--------|
| Config · CRUDs | 5 telas de configuração; revisar consistência | ✅ Pronto · revisar |
| Users & Roles | Perfil de motorista precisa de fluxo específico | ✅ Pronto · revisar |
| Person | Busca por nome/CPF/placa, filtros, dispositivos, custo, histórico, metas | 🟡 Parcial · completar |
| Vehicles | Mapa com pins de veículos, camadas de dispositivos, heartbeat, gráficos de saúde | 🟡 Mapa pendente |
| Devices · Listagem | Geolux, GeoGuard, Camera precisam de fluxos de criação específicos | 🟡 Parcial |
| Devices · Detalhes | Histórico do dispositivo, chip 5G, streaming GeoGuard, notificações | 🟡 Parcial |
| Contratos | Filtros por tipo, status, cidade | ✅ Pronto · expandir |
| Pagamentos | Histórico filtrável, extrato, exportação Excel & PDF | 🟡 Parcial · completar |
| Dashboards e Reports | Gráficos temporais, TV 55'', controle remoto QR e microfone | 🔴 Alta prioridade |
| Motorista | Landing, wizard de cadastro, agendamento, contrato digital, área logada | 🔴 Do zero · produto novo |
| Funcionalidades Gerais | Wizard de instalação, QR code, alertas de desvio, cookies, LGPD | 🔴 Do zero · transversais |

#### Step 2 — Vision

> "Com os produtos crescendo, a arquitetura precisa ser definida agora."

Vision é o processador central — recebe dados brutos e distribui para módulos especializados. O trabalho de UX define como cada produto se apresenta, como os dados são exibidos e como o gestor navega sem se perder.

6 módulos especializados: **IC Lumen · IC Quality · IC Grass · IC Margin · IC Gas · IC Flood**

#### Step 3 — SABESP

> "Validar a cadeia completa com um cliente real."

O contrato SABESP é a oportunidade de provar que a cadeia funciona (coleta, processamento, qualidade, acesso) com uma experiência que o cliente usa sem treinamento extenso.

3 frentes de UX em paralelo:

| Frente | Ícone | Descrição |
|--------|-------|-----------|
| Plataforma operacional | Layers | Wizard de instalação, verificação e manutenção; fluxo guiado, sem margem para erro |
| Dashboard de gestão | Eye | Painel do gestor SABESP: visualização por área, status de dispositivos, alertas, exportação |
| Onboarding e demo | Building2 | Fluxo de primeira experiência; projetado para reunião de validação sem consultor presente |

**Por que importa:** Fleets organiza a operação. Vision estrutura o produto. SABESP valida a cadeia no mundo real. Juntos formam a base para qualquer oferta de cidade.

---

## Slides Inativos

> Existem no código mas não estão importados em `Presentation.tsx`.

### Slide 5 — Plano de Ação _(inativo)_

**Steps:** Foco → Razão

#### Step 1 — Foco

3 frentes de trabalho com descrição e justificativa:

- **IC Fleets** — completar a plataforma (design system primeiro, depois módulo a módulo)
- **IC Vision** — estruturar o processamento (arquitetura que suporte expansão)
- **SABESP** — primeiro caso de uso externo (valida a cadeia com cliente real)

#### Step 2 — Razão

- **IC Fleets:** onde a equipe mais passa tempo e onde o cliente mais experimenta a plataforma
- **IC Vision:** múltiplos módulos especializados crescendo; arquitetura da informação precisa ser definida agora
- **SABESP:** com os três funcionando bem, o caminho para novos clientes e produtos fica mais claro

---

### Slide 6 — IC Fleets · Detalhe _(inativo)_

**Steps:** Design System → Módulos → Entrega

#### Step 1 — Design System

Mesmo conteúdo do Slide 3 Step 1 (5 entregáveis).

#### Step 2 — Módulos

Mesma tabela de 11 módulos do Slide 4 Step 1.

#### Step 3 — Entrega

3 entregáveis por módulo:

1. **Protótipo Figma navegável** _(por módulo)_ — telas completas com todos os fluxos, estados e variantes; navegável para validação interna e apresentação ao cliente antes de qualquer código
2. **Especificações para dev — handoff** _(por módulo)_ — anotações com medidas, estados, variantes e comportamentos; dev abre e executa sem reunião de alinhamento
3. **Descoberta por módulo quando necessário** _(módulos novos e complexos)_ — para Motorista, Dashboards e campo: entrevistas com perfis reais antes de projetar; persona & journey map documentados

> **Próximo passo:** Design system primeiro. Sem a base, cada novo módulo aprofunda a inconsistência. Com ela, o produto cresce sem perder coerência.

---

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| React 18 + TypeScript | Framework principal |
| Vite | Build |
| Tailwind CSS | Utilitários de estilo |
| Framer Motion (`motion/react`) | Animações |
| Lucide React | Ícones |

**Fontes:** DM Sans (principal) · Space Mono (labels/tags)

**Animações:** slide upward com stagger (0.05s–0.7s), easing `[0, 0, 0.2, 1]`, duração 400–550ms
