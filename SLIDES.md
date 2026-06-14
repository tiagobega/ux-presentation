# Intelicity · Apresentação Branding & UX — Roteiro de Slides

**Tese central**

> A Intelicity não precisa apenas revelar mais problemas. Precisa ajudar cada público a entender, priorizar e agir sobre eles. **UX transforma dado em ação. Branding transforma projetos em narrativa.** A Stack IC é uma proposta para conectar essas duas frentes e dar direção ao que já estamos construindo.

**Formato:** fullscreen 1920×1080, sem scroll. Títulos como protagonistas, texto mínimo, cada slide fecha com uma punch line.

> Documento-fonte ativo. A versão anterior está em [`archive/SLIDES.md`](archive/SLIDES.md) (depreciada).

---

## Espinha dorsal (lógica narrativa)

1. A falta de UX já gerou **perda real** → *Caso Carnaval*
2. Mesmo quando o dado existe, ele pode gerar **confusão ou medo** → *Cidade com dados demais*
3. UX **atravessa toda a cadeia** — é onde cada case falhou ou poderia ter ajudado
4. UX também ajuda a **vender melhor** → *Mapas vs Ordens de Serviço*
5. Quando a experiência falha, **o custo aparece**
6. **Branding** organiza os projetos numa narrativa comum
7. A **Stack IC** é a proposta que conecta os projetos
8. **Onde começamos:** Fleets, Vision e SABESP

## Os três cases

| Case | O que prova | Onde entra |
|------|-------------|------------|
| **Formulário de Carnaval** | UX ruim quebra a operação antes mesmo do dado existir | Slide 1 (diagnóstico) |
| **Cidade com dados demais** | Dado sem priorização gera medo, não ação | Slide 2 (dado → decisão) |
| **Mapas vs Ordens de Serviço** | UX ajuda a descobrir o verdadeiro valor para o cliente | Slide 4 (produto, demo e venda) |

---

## Mapa de slides

| # | Título | Steps | Case | Arquivo |
|---|--------|-------|------|---------|
| 0 | Como o produto fala por si. | Capa | — | `Slide00Capa.tsx` |
| 1 | O problema não é falta de produto. É falta de coerência. | Diagnóstico · Caso Carnaval | Carnaval | `Slide1Coerencia.tsx` |
| 2 | Mais dados não significam mais clareza. | Dados | Cidade assustada | `Slide2Dados.tsx` |
| 3 | UX atravessa a cadeia inteira. | Cadeia | (amarra os 3) | `Slide3Cadeia.tsx` (SVG/`motion`) |
| 4 | O que vendemos nem sempre é o que gera mais valor. | Valor | Mapas vs OS | `Slide4Valor.tsx` |
| 5 | Quando a experiência falha, o custo aparece. | Custo | — | `Slide5Custo.tsx` |
| 6 | Além da experiência, falta uma narrativa comum. | Narrativa | — | `Slide6Narrativa.tsx` |
| 7 | Stack IC: a árvore do dado. | Stack IC | — | `Slide7StackIC.tsx` |
| 8 | Onde o UX entra. | Foco | — | `Slide8Foco.tsx` |

---

## Slide 0 — Capa
**Steps:** Capa · ✅ mantém como está (GSAP title reveal).

- Título: "Como o produto **fala por si.**"

---

## Slide 1 — Os problemas que enfrentamos hoje
**Steps:** Diagnóstico → Caso Carnaval

### Step "Diagnóstico"
Título: "Os problemas que enfrentamos **hoje.**" (destaque vermelho). Grid 3×2 com as 6 dores — tratadas em **vermelho** (ícone, borda e accent à esquerda), reforçando que são problemas:

1. Produtos com experiências diferentes e confusas.
2. Dados exibidos sem narrativa de decisão.
3. Fluxos importantes com baixa conclusão.
4. Valor do produto demorando para aparecer.
5. Comunicação comercial discrepante com produto.
6. Ecossistema sem uma lógica clara.

**Frase de fechamento (centralizada):** "Temos produtos, dados e iniciativas com muito potencial. O desafio agora é fazer com que nossa evolução seja percebida como uma **experiência clara, consistente e conectada.**" *(o fecho em roxo cria a virada problema → solução)*

### Step "Caso Carnaval" — slide de número-herói
- **Layout:** **90%** gigante (~160px) à esquerda; à direita um mini-diagrama do formulário (botão de registro no topo → usuário não rola → abandono).
- **Como contar:** o botão de registro ficava no topo; ~90% não completaram o formulário. O problema não era falta de interesse — era jornada mal desenhada.
- **Punch:** *"Quando a experiência falha, o dado nem chega a existir."*

---

## Slide 2 — Mais dados não significam mais clareza
**Steps:** Situação → Perguntas · **Layout:** duas colunas (esquerda = escalada do problema · direita = perguntas)

- **Coluna esquerda (escalada, step "Situação"):** card "Antes — um problema que mal conseguia ser administrado" → seta ↓ "ferramenta IC" → card "Depois — **10×** maior do que se imaginava".
- **Coluna direita (step "Perguntas"):** título "E agora?" (visível desde o step 1) e, ao avançar, as perguntas cascateiam: *Como priorizar? · Como justificar orçamento? · Como planejar? · Como prestar contas? · Como comunicar a órgãos públicos?*
- **Frase centralizada (entra com o step "Perguntas"):** *"O dado revela o problema. **A experiência define se ele vira ação.**"*
- ❌ Removida a linha "Privacidade protege o dado" (não fazia sentido no fluxo).

---

## Slide 3 — UX atravessa a cadeia inteira
**Steps:** Coleta → Contexto · Informação → Acompanhamento · **mecânica de esteira (200%)**

- **Sem Three.js** — SVG/CSS + `motion`.
- Subtítulo: "Não é só sobre como a informação aparece na tela. É sobre como cada etapa conduz o usuário até uma ação melhor."
- **Esteira de 200% de largura:** a área visível mostra 3 nós por vez. No **step 1**, a linha (traço + bolinhas) se desenha por Coleta · Dados · Contexto. No **step 2**, toda a esteira desliza para a esquerda (sensação de avançar à direita) e a linha continua por Informação · Decisão · Acompanhamento.
- **6 nós** (cada card: `0N — Label` · afirmação em negrito · linha de UX):

| # | Nó | Afirmação | UX |
|---|-----|-----------|-----|
| 01 | Coleta | O dado nasce na operação. | Garante coleta clara, precisa e alinhada ao objetivo da aplicação. |
| 02 | Dados | A evidência precisa ser confiável. | Define quais dados precisam existir para sustentar clareza, performance e consistência. |
| 03 | Contexto | O dado ganha sentido. | Conecta localização, tempo, impacto e perfil para explicar por que a informação importa. |
| 04 | Informação | O usuário precisa entender rápido. | Transforma volume de dados em leitura clara, priorizada e acionável. |
| 05 | Decisão | A plataforma precisa orientar o próximo passo. | Ajuda o usuário a planejar, priorizar e agir com mais segurança. |
| 06 | Acompanhamento | A ação precisa fechar o ciclo. | Acompanha pendências, acha problemas mal resolvidos e vira melhoria contínua. |

- **Punch (entra ao completar a cadeia, step 2):** *"UX não é a tela final. É a estrutura que faz cada etapa gerar a próxima ação."*
- ❌ Pinos de case (Carnaval/Cidade/Mapas) removidos — os cards agora são autoexplicativos.

---

## Slide 4 — O que vendemos nem sempre é o que gera mais valor
**Steps:** Valor · case Mapas vs Ordens de Serviço

- **Duas colunas:**
  - **MAPA** — "mostra o problema": leitura territorial, comparação temporal (ex.: antes/depois de São Paulo).
  - **ORDEM DE SERVIÇO** — "mostra controle": prioridade, execução, cobrança, resultado. *(peso visual maior / roxo na direita)*
- **Como contar:** em demos o mapa costuma ser a feature principal e é importante; mas para o gestor o valor mais forte pode estar no controle das OS — o que foi identificado, priorizado, está em execução e foi resolvido.
- **Punch:** *"O mapa mostra onde está o problema. A Ordem de Serviço mostra como a cidade assume controle."*

---

## Slide 5 — Quando a experiência falha, o custo aparece
**Steps:** Custo · **qualitativo, sem métricas numéricas** (não temos os dados)

Cards (ícone + título + 1 linha), sem números:

1. Baixa conclusão de fluxos
2. Onboarding repetido
3. Demos longas
4. Suporte por dúvida de uso
5. Vendas que dependem de explicação manual
6. Cliente com dado, mas sem plano

- **Punch:** *"UX reduz o custo de explicar, corrigir e sustentar o produto."*

---

## Slide 6 — Além da experiência, falta uma narrativa comum
**Steps:** Narrativa · entrada do branding (repurpose do slide dos 10 produtos)

- **Layout:** os projetos aparecem **dispersos e inconsistentes** — provando visualmente que ainda não parecem da mesma família.
- **Mensagem:** a Intelicity tem muitos projetos com potencial, mas eles ainda não se apresentam como partes de uma mesma visão.
- **Punch:** *"UX organiza a experiência. Branding organiza a narrativa."*

---

## Slide 7 — Stack IC: a árvore do dado
**Steps:** Stack IC · **nova visualização em árvore/fluxo** (substitui o pipeline linear)

- **Metáfora:** a Stack IC **é** o caminho do dado — de onde ele vem, como é processado, como é exibido. Visualizada como uma **árvore que cresce de baixo para cima**: raízes (fontes) → galhos (processamento) → copa (exibição), nutrida pelo solo (endomarketing/P&D). O **IC Fleets** é o *gateway* por onde entram os dados de **hardware** — as demais fontes vão direto ao processamento.
- **Selo de aviso no topo:** *"Proposta de branding · não é uma arquitetura técnica oficial."*

**Camadas (de baixo para cima, no sentido do fluxo do dado):**

1. **Fontes / Ingestão** *(raízes)* — Hardwares e sensores · Canais de denúncia · Plataformas externas (WFM, Salesforce, Informs…)
2. **Coleta de campo** *(gateway de hardware, não tronco universal)* — **IC Fleets** recebe os dados de **hardwares e dispositivos** (operação, agentes). ⚠️ As demais fontes — denúncias, WFM, Salesforce, Informs — entram **direto no processamento**, sem passar pelo Fleets.
3. **Processamento** *(galhos)* — módulos especializados, cada um calcula uma especialidade urbana:
   - **IC Vision** — imagens e stream
     - ↺ **IC Classify (SGC)** — loop de qualidade preso ao Vision: validação humana das detecções de imagem para treinar os modelos. Visualmente, um satélite conectado ao Vision (não um nó entre galhos e copa).
   - **IC Lumen** — luminosidade
   - **IC Quality** — qualidade do asfalto · IRI
   - **IC Gas** — vazamento de gás
   - **IC Tree** — árvores
   - *Fora desta versão (roadmap):* IC Margin (encostas), IC Flood (drenagem/enchentes)
4. **Exibição** *(copa)* — como comunicamos o dado, independente da aplicação:
   - **IC Face** — biblioteca de front-end (tudo que o cliente vê)
   - **IC Query** — LLM, agentes e MCPs para comunicação rápida
5. **Apoio / Endomarketing** *(solo que nutre a árvore, transversal)*:
   - **IC News** — divulgação de tendências, releases e feedback interno
   - **IC Labs** — P&D: brainstorms, comunicação entre equipes, achar problemas e soluções

- **Implementação:** nova cena (SVG animado com GSAP draw nas conexões, ou Three.js) — raízes convergindo no Fleets, Fleets ramificando no processamento, processamento convergindo na exibição; News/Labs como base.
- **Punch:** *"A Stack IC não cria novos projetos. Ela dá direção para os projetos que já existem."*

---

## Slide 8 — Onde o UX entra
**Steps:** Foco · fechamento prático + tese final

Em vez de só nomear as frentes, cada uma mostra **onde o UX entra**, de forma concreta. Layout: **3 colunas** + **barra de fundação** transversal embaixo.

- **3 colunas (frente → onde o UX entra):**
  - **Fleets** *(operação, dispositivos, OS e controle)*
    → **UX entra como:** plataforma com experiência validada para os diferentes fluxos e tipos de usuário.
  - **Vision** *(análise, detecções e contexto)*
    → **UX entra como:** experiência interativa (demo) em apresentações e feiras — retém atenção e desperta curiosidade do público.
  - **SABESP** *(validação real com cliente)*
    → **UX entra como:** aplicativo direcionado, com dados relevantes e experiência fluida conforme a necessidade do usuário.
- **Barra de fundação (transversal, sustenta as três):**
  **UX para a empresa** → construção de **Design System** e paradigmas de comunicação. *(É aqui que o Design System vive — não como slide próprio, mas como a base que conecta tudo.)*
- **Fechamento / tese final:** *"O objetivo não é apresentar mais uma ideia. É criar um eixo para transformar experiência, comunicação e produto em uma mesma direção."*

---

## Notas de implementação

**Status:** ✅ implementado — 9 slides (`Slide0Capa`…`Slide8Foco`), build passando. Arquivos renomeados para bater com a ordem 0–8.

**Padding / full-bleed**
- O container em `Presentation.tsx` **não** aplica padding. Cada slide aplica `SLIDE_PADDING` (`px-16 pt-10 pb-8`, exportado de `config.ts`) no seu próprio root.
- Para um slide **full-bleed** (sem padding, conteúdo até a borda da tela), basta **omitir** `SLIDE_PADDING` no root daquele slide.

**Removido na reestruturação**
- ⏸️ **Companion mobile por perfil** (via QR) — pausado. O controle remoto do apresentador continua.
- ❌ **Slide de Personas** — removido.
- ❌ **Slide de Design System** dedicado — removido (vive como fundação no Slide 8).
- ❌ **Three.js** — removido. `DataChain`/`StackIC3D` apagados, pasta `scenes/` removida, dependências `three` e `@types/three` retiradas do `package.json`.
- ❌ Arquivos legados apagados: `Slide01Fundamento`, `Slide02Desafio`, `Slide03Crescimento`, `Slide04Branding`, `Slide05DadosTodos`, `Slide06CustoReal`, `Slide05StackIC`, `Slide06Escopo`.

**Pendências de polimento (próxima rodada)**
- Conferir cada slide em 1920×1080 (sem scroll) — o Slide 3 (cadeia) tem timing de revelação longo; ajustar se necessário.
- Slide 7: a árvore (SVG) centraliza com margens laterais; avaliar se quer preencher mais a largura.
- Animação de entrada/saída entre slides ainda usa o CSS `slide-fwd/bwd`; GSAP nas transições é opcional.

---

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| React 19 + TypeScript · Vite 6 · Tailwind 4 | Base |
| GSAP | Title reveal (Capa) + transições |
| Motion (`motion/react`) | Micro-animações, revelações e a cadeia do Slide 3 (SVG/CSS) |
| OGL | Background WebGL |
| Lucide React | Ícones |

**Fontes:** DM Sans (principal) · Space Mono (labels/tags)
