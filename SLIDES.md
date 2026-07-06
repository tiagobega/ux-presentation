# Intelifleets/Vision · Apresentação Semestral — Roteiro de Slides

**Tese central**

> Nos últimos 6 meses saímos de sistemas isolados para um ecossistema integrado — dados, visão computacional e IA conversando entre si. Consolidamos as fundações (refatorações, produção e padrões); o próximo semestre é sobre expansão e integração.

**Formato:** fullscreen, sem scroll. Uma esteira única de slides ("camera pan"), cada um com eyebrow + título + corpo, a maioria seguindo um template compartilhado (feito/próximo ou lista de bullets).

> Documento-fonte ativo. A versão anterior (pitch de UX/branding, 13 slides) está preservada no histórico do git — este documento a substitui porque o deck mudou de propósito e de conteúdo.

---

## Espinha dorsal (lógica narrativa)

O deck é uma retrospectiva de semestre + roadmap, em 4 blocos:

1. **Tese (0–1):** o ecossistema virou integrado; um mapa visual recorrente amarra todos os produtos a partir do Fleets
2. **Atualização produto a produto (2–11):** cada produto reporta o que foi feito e o que vem a seguir — Fleets (hub) → Plataforma → Ingestão → Alertas → Vision (arquitetura + expansão, num só slide) → Informs → CVAT (decisão de descontinuar o SGC) → Gravata (retomada) → Gestão de Obras (novo produto) → Zeladoria (nova fronteira)
3. **Padrões & Inovação (12–14):** muda de registro — explica _como_ o time entregou tudo isso mais rápido (IcePanel/ADRs, Claude corporativo, dev com IA, MCPs)
4. **Fechamento (15–16):** créditos aos times e roadmap Agora/Próximo/Explorando

Padrão recorrente nos slides de produto: reconhecer o que funcionou, ser honesto sobre o que ainda não pegou (geralmente adoção/pessoas, não tecnologia), e mostrar que cada peça nova já nasce conectada ao ecossistema — reforçando a tese do slide 0.

---

## Mapa de slides

| # | Arquivo | Label | Título / tema | Template |
|---|---------|-------|----------------|----------|
| 0 | `Slide00Abertura.tsx` | Abertura | Saímos de sistemas isolados para um ecossistema integrado. | custom (finale-style) |
| 1 | `Slide01MapaEcossistema.tsx` | Mapa do ecossistema | Um mapa que se repete a apresentação inteira. | custom + `EcosystemMap` |
| 2 | `Slide02Fleets.tsx` | Intelifleets | O hub que conecta as peças. | custom · grid 3 frentes |
| 3 | `Slide03Plataforma.tsx` | Plataforma | Em produção. Agora, a adoção. | `UpdateSlide` |
| 4 | `Slide04Ingestao.tsx` | Ingestão | A fundação que destravou o Vision. | `UpdateSlide` |
| 5 | `Slide05Alertas.tsx` | Alertas | O ciclo detectar → alertar → resolver. | `UpdateSlide` |
| 6 | `Slide06Vision.tsx` | Intelivision | Bronze, Prata e Ouro. | custom · 3 steps |
| 7 | `Slide07Informs.tsx` | Informs | Em campo, iterando com o usuário real. | `UpdateSlide` |
| 8 | `Slide08Cvat.tsx` | CVAT | O melhor código é o que não precisamos escrever. | `BulletSlide` |
| 9 | `Slide09Gravata.tsx` | Gravata | Não volta de onde parou — volta melhor. | `UpdateSlide` (só próximos passos) |
| 10 | `Slide10GestaoObras.tsx` | Gestão de Obras | Um novo produto para gestão e planejamento de obras. | `UpdateSlide` |
| 11 | `Slide11Zeladoria.tsx` | Zeladoria | A próxima fronteira: o cidadão. | `UpdateSlide` (só próximos passos) |
| 12 | `Slide12PadroesIntro.tsx` | Padrões & Inovação | Como mudamos o jeito de construir software. | custom (finale-style) |
| 13 | `Slide13IcePanel.tsx` | IcePanel | Arquitetura que não se perde. | `BulletSlide` |
| 14 | `Slide14Padroes.tsx` | Claude, dev com IA & MCPs | Claude, specs e MCPs — um único fluxo de IA. | custom · pipeline + 2 colunas |
| 15 | `Slide15Creditos.tsx` | Créditos | Nada disso é de uma pessoa só. | custom · grid 3×3 |
| 16 | `Slide16Roadmap.tsx` | Roadmap | Agora, próximo e explorando. | custom · 3 colunas |

---

## Slide 0 — Saímos de sistemas isolados para um ecossistema integrado

**Steps:** single-step (finale-style, centralizado)

Função narrativa: dar o tom do semestre antes de qualquer detalhe — trailer da tese.

- Eyebrow: "Últimos 6 meses · Visão de futuro"
- Título 46px: "Saímos de sistemas isolados para um **ecossistema integrado** — dados, visão computacional e IA conversando entre si."
- Corpo: "Nos últimos 6 meses consolidamos as fundações: refatorações, produção e padrões."
- **Punch:** "O próximo semestre é sobre **expansão e integração.**"

---

## Slide 1 — Um mapa que se repete a apresentação inteira

**Steps:** single-step

Função narrativa: instalar o diagrama de referência que vai ancorar visualmente todos os slides de produto seguintes.

- Eyebrow: "O mapa do ecossistema"
- Título: "Um mapa que se repete a **apresentação inteira.**"
- Corpo: "IC Fleets no centro; IC Vision, Informs, Gravata e os novos produtos se plugam nele. Cada projeto a seguir reforça essa mesma tese."
- Corpo visual: `EcosystemMap` (variant `"intro"`)

---

## Slide 2 — O hub que conecta as peças (Intelifleets)

**Steps:** single-step · grid de 3 cards

Função narrativa: apresentar o Fleets como plataforma guarda-chuva antes de detalhar cada frente nos slides seguintes.

- Título: "O **hub** que conecta as peças."
- Corpo: "A mesma plataforma que ingere o dado, gerencia os projetos e garante que ele chega confiável — organizada em três frentes."
- **3 frentes (ícone + número + descrição):**

| # | Frente | Descrição |
|---|--------|-----------|
| 01 | Ingestão de dados | A porta de entrada de todos os dispositivos de campo. |
| 02 | Plataforma | Onde os projetos, veículos e hardwares são gerenciados. |
| 03 | Alertas | Detectar, avisar e resolver problemas em campo. |

---

## Slide 3 — Plataforma: em produção, agora a adoção

**Steps:** single-step (`UpdateSlide`)

Contada **antes** da Ingestão — a plataforma é o que o time vê e usa no dia a dia; a fundação técnica vem em seguida.

- Título: "Em produção. Agora, a **adoção.**"
- Corpo: "Entregue em produção no último mês, substituindo a planilha e o report antigo — e já bem mais do que isso."
- **Feito:** plataforma em produção (no lugar da planilha) · cadastro centralizado de projetos, contratos e veículos · gestão de hardwares e dispositivos por contrato · papéis e permissões por time · novo report do Fleets, focado em projetos · ponto de honestidade: adoção ainda é baixa
- **Próximo:** workshop do Fleets para todos · driblar a barreira com capacitação, não com feature nova
- **Nota:** "A tecnologia está pronta; o próximo passo são as pessoas."

---

## Slide 4 — Ingestão: a fundação que destravou o Vision

**Steps:** single-step (`UpdateSlide`)

- Eyebrow: "Intelifleets · Ingestão de dados"
- Título: "A fundação que **destravou o Vision.**"
- Corpo: "Refatoração completa da ingestão de dados das Jetsons — fotos e metadados num pipeline confiável."
- **Feito:** nova arquitetura de ingestão (fotos + metadados) · mais confiabilidade/observabilidade/manutenibilidade · desbloqueio estratégico (sem ela, Vision não existiria)
- **Próximo:** trazer Geobox e N100 (vídeos) para dentro do Fleets · integração com streaming
- **Nota:** "Não foi refatoração por estética — foi a fundação que permitiu lançar o Intelivision."

---

## Slide 5 — Alertas: o ciclo detectar → alertar → resolver

**Steps:** single-step (`UpdateSlide`)

- Título: "O ciclo **detectar → alertar → resolver.**"
- Corpo: "Jetsons com possíveis problemas geram alertas que chegam na plataforma, permitindo resolução em campo."
- **Feito:** alertas funcionando no fluxo do Vision · problemas em campo viram ação resolvível · ciclo fechado · **saúde dos dispositivos via heartbeat (Jetson)**
- **Próximo:** mesma pauta de adoção da Plataforma · conectar o uso com o workshop do Fleets
- **Nota:** "Funciona. Agora precisa ser usado."

---

## Slide 6 — Intelivision: Bronze, Prata e Ouro

**Steps:** 3 steps — "As três camadas" → "A foto atravessa" (foto anima até a camada Ouro) → "Onde isso escala" (troca a nota de fechamento por um grid de expansão)

Função narrativa: explicar a arquitetura medallion do Vision e, na sequência, mostrar como a mesma arquitetura já comunica com clientes/verticais novas — arquitetura e expansão num único slide.

- Título: "**Bronze, Prata e Ouro.**"
- Corpo: "Pipeline em camadas, estilo medallion. Uma foto atravessa o fluxo e, a cada camada, ganha mais significado — a mesma arquitetura que agora vira serviço de visão da empresa."

| Camada | Nome | Descrição |
|--------|------|-----------|
| Bronze | Validação | Qualidade, integridade e metadados da foto. |
| Prata | Detecção | O que existe na imagem. |
| Ouro | Regras de negócio | O que aquilo significa para o contrato e o cliente. |

- **Steps 1–2 (fechamento):** "Escalabilidade por design: **cada camada evolui de forma independente.**"
- **Step 3 (fechamento vira grid de expansão):** "A mesma arquitetura, pronta para novos clientes e verticais" — SABESP (produção no próximo mês, primeiro cliente real) · On demand (análise de fotos para qualquer pessoa ou sistema) · Novas verticais (saneamento e outros setores)

---

## Slide 7 — Informs: em campo, iterando com o usuário real

**Steps:** single-step (`UpdateSlide`)

- Título: "Em campo, iterando com o **usuário real.**"
- Corpo: "Em produção desde o último semestre; motoverificadores já usando no dia a dia."
- **Feito:** produção com motoverificadores em campo · ciclo ativo de feedback e correção de bugs
- **Próximo:** deploy na App Store (Apple) — acessibilidade e alcance · entender e priorizar novas features a partir do feedback de campo · expansão para novos projetos e contratos · plano de sustentação de longo prazo · visão de futuro — foto passa em tempo real pelo Vision, que valida na hora se é a foto ideal
- **Nota:** "Um produto alimentando o outro — o melhor exemplo da tese do ecossistema integrado."

---

## Slide 8 — CVAT: o melhor código é o que não precisamos escrever

**Steps:** single-step (`BulletSlide`)

Função narrativa: mostrar maturidade de produto — descontinuar é também uma decisão de engenharia válida.

- Eyebrow: "SGC → CVAT · decisão de produto"
- Título: "**O melhor código** é o que não precisamos escrever."
- Corpo: "Descontinuamos o desenvolvimento interno do SGC ao encontrar o CVAT (Computer Vision Annotation Tool) — uma alternativa open source, madura e validada."
- **Bullets:** desenvolvimento interno do SGC descontinuado · CVAT identificado como alternativa open source · time de IA estudou e validou a adoção · meses de trabalho economizados · time liberado para o que só a empresa pode construir (Vision e Fleets)

---

## Slide 9 — Gravata: não volta de onde parou, volta melhor

**Steps:** single-step (`UpdateSlide`, sem coluna "feito" — só próximos passos)

- Eyebrow: "Streaming · Gravata"
- Título: "Não volta de onde parou — **volta melhor.**"
- Corpo: "O desenvolvimento da versão nova foi pausado nos últimos 6 meses por decisão de foco. Agora retoma com novo hardware para sustentação e uma arquitetura repensada."
- **Próximos passos (única coluna):** retomada com novo hardware, focado em sustentação · nova arquitetura com blur automático (privacidade) · streaming via HLS — padrão de mercado, compatível com qualquer player · integração nativa ao Fleets (coleta e dispositivos por contrato)
- **Nota:** "O Gravata renasce dentro do ecossistema — não como um sistema à parte."

---

## Slide 10 — Gestão de Obras: um novo produto

**Steps:** single-step (`UpdateSlide`)

Função narrativa: o produto em si é a manchete — a demo de 1 semana é evidência de suporte, não o ponto principal.

- Eyebrow: "Novo produto · Gestão e Planejamento de Obras"
- Título: "Um novo produto para **gestão e planejamento de obras.**"
- Corpo: "Nasceu como demo para a SABESP — construída em apenas 1 semana, graças aos novos padrões de dev com IA — e agora vira um produto próprio do ecossistema."
- **Feito:** demo funcional entregue à SABESP em 1 semana · necessidade simples e universal de gestão de obras
- **Próximo:** evoluir de demo para produto de prateleira · baixa complexidade, alta recorrência (SABESP, Porto Alegre, SP, Bia)
- **Nota:** "Demanda universal + baixa complexidade = produto ideal para padronizar e vender."

---

## Slide 11 — Zeladoria: a próxima fronteira, o cidadão

**Steps:** single-step (`UpdateSlide`, sem coluna de status — só próximos passos)

Função narrativa: primeiro produto do deck voltado ao cidadão, não ao operador — mostra que o ecossistema já nasce se conectando (Vision).

- Eyebrow: "Novo app · Zeladoria Urbana"
- Título: "A próxima fronteira: o **cidadão.**"
- Corpo: "Demanda recém-recebida, entrando no roadmap agora. Pela primeira vez, um produto voltado ao munícipe — não só ao operador."
- **Próximos passos (única coluna):** report de zeladoria urbana para munícipes · nasce com integração ao Vision (foto do munícipe passa pelo pipeline)
- **Nota:** "Cada produto novo já nasce conectado ao ecossistema."

---

## Slide 12 — Como mudamos o jeito de construir software

**Steps:** single-step (finale-style, centralizado)

Função narrativa: transição de bloco — vira a chave de "o que entregamos" para "como conseguimos entregar tão rápido".

- Eyebrow: "Padrões & Inovação · bloco transversal"
- Título 52px: "Como mudamos o **jeito de construir software.**"
- Corpo: "IcePanel, Claude corporativo e MCPs: o que explica a velocidade de tudo que veio antes."

---

## Slide 13 — IcePanel: arquitetura que não se perde

**Steps:** single-step (`BulletSlide`)

- Eyebrow: "Padrões · IcePanel + ADRs"
- Título: "**Arquitetura** que não se perde."
- Corpo: "Um padrão único de arquitetura e documentação — o porquê das decisões fica registrado."
- **Bullets:** ferramenta única e padronizada de arquitetura · ADRs (memória das decisões, o "porquê" preservado) · onboarding mais rápido · MCP do IcePanel (IA acessa o contexto arquitetural — usado na SABESP)

---

## Slide 14 — Claude, dev com IA & MCPs: um único fluxo de IA

**Steps:** single-step · custom (pipeline compacto + 2 colunas)

Função narrativa: slide único que reúne os três pilares de "como mudamos o jeito de construir software" — antes eram 3 slides separados (Claude corporativo, Dev com IA, MCPs).

- Título: "Claude, specs e MCPs — **um único fluxo de IA.**"
- Corpo: "A IA não é autocomplete — é parte do processo, do Claude corporativo ao contexto que os MCPs entregam a cada etapa."
- **Pipeline compacto:** Specs → Docs → IcePanel → MCPs → Código
- **Coluna esquerda — Claude corporativo:** diferencial claro no projeto SABESP · times que adotaram performam visivelmente melhor · integração com bancos via MCP · uma pergunta em linguagem natural vira uma query
- **Coluna direita — MCPs, o USB-C das integrações:** antes (N × M integrações artesanais) vs. depois (N conectores reutilizáveis) · onde estamos: começamos pela LLM, um agente está em integração agora
- **Punch:** "Um novo workflow de engenharia, **alimentado com o contexto certo.**"

---

## Slide 15 — Créditos: nada disso é de uma pessoa só

**Steps:** single-step · grid 3×3

- Título: "Nada disso é de **uma pessoa só.**"
- **Grid de 9 projetos** (Plataforma, Ingestão, Alertas, Intelivision, Informs, CVAT, Gravata, Gestão e Planejamento de Obras, Padrões · IcePanel · Claude · MCPs) com nome do time — atualmente todos com placeholder `"— a preencher —"`.

> ⚠️ **Pendência:** os nomes reais dos times/pessoas ainda não foram preenchidos em `credits` (`Slide15Creditos.tsx`).

---

## Slide 16 — Roadmap: agora, próximo e explorando

**Steps:** single-step · 3 colunas

- Título: "Agora, próximo e **explorando.**"
- **Agora (vermelho):** Vision em produção na SABESP · Workshop do Fleets · Correções do Informs · Retomada do Gravata integrado
- **Próximo (roxo):** Geobox + N100 no Fleets · Informs na App Store · Gestão de Obras de prateleira · Agente com MCP
- **Explorando (azul):** Vision on demand para todos · Informs ↔ Vision em tempo real · App de Zeladoria para munícipes · MCPs em tudo
- **Punch de encerramento:** "Semestre passado construímos as fundações. **Semestre que vem, conectamos tudo.**"

---

## Notas de implementação

**Status:** ✅ implementado — 17 slides (`Slide00Abertura`…`Slide16Roadmap`), build passando.

**Templates compartilhados (`src/slides/shared/`)**
- `UpdateSlide.tsx` — eyebrow + título (lead/highlight) + parágrafo + coluna "feito" (opcional) + coluna "próximo" + nota de fechamento. Quando `done` é omitido, renderiza como coluna única de próximos passos (Gravata, Zeladoria).
- `BulletSlide.tsx` — eyebrow + título + parágrafo + lista única de bullets (ou 2 colunas via `bulletCols`). Usado em slides de decisão/resumo (CVAT, IcePanel).
- `EcosystemMap.tsx` — diagrama recorrente do ecossistema (Fleets no centro), reaproveitado via prop `variant`.

**Padding / full-bleed**
- O container em `Presentation.tsx` **não** aplica padding. Cada slide aplica `SLIDE_PADDING` (`px-16 pt-10 pb-8`, exportado de `config.ts`) no seu próprio root.
- Slides puramente centralizados (0, 12) omitem o padding lateral e usam `px-24` próprio.

**Esteira global (camera pan)**
- A apresentação inteira é **uma esteira**: os 17 slides ficam numa trilha (`Presentation.tsx`), e a "câmera" (translate `x`) desliza até o slide atual com easing dramático (`[0.76,0,0.24,1]`, 0.85s).
- **Montagem preguiçosa + congelamento:** um slide só **monta na 1ª vez que é visitado** (`activated` Set). Depois fica montado e **congelado no estado completo** — não remonta ao sair.
- **Memória de step (`actionMemory`):** slides inativos ficam no último step visto.
- Único slide multi-step é o 6 (Intelivision), com 3 ações: camadas → foto atravessa → expansão.

**Histórico de reestruturação (a partir do briefing original de 20 slides):**
- Plataforma passou a ser contada antes de Ingestão.
- Vision · arquitetura e Vision · expansão viraram um único slide (6), com um 3º step de expansão.
- SGC foi renomeado para CVAT (Computer Vision Annotation Tool), a alternativa open source real.
- Gravata e Zeladoria perderam a coluna "feito"/status — só próximos passos.
- Claude corporativo, Dev com IA e MCPs viraram um único slide (14).

---

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| React 19 + TypeScript · Vite 6 · Tailwind 4 | Base |
| GSAP | Transições (`src/transitions/gsap.ts`) |
| Motion (`motion/react`) | Micro-animações e revelações em praticamente todos os slides |
| OGL | Background WebGL (`Background.tsx`) |
| Lucide React | Ícones |

**Fontes:** DM Sans (principal) · Space Mono (labels/tags)
