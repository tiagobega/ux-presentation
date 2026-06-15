# Intelicity · Apresentação Branding & UX — Roteiro de Slides

**Tese central**

> A Intelicity não precisa apenas revelar mais problemas. Precisa ajudar cada público a entender, priorizar e agir sobre eles. **UX transforma dado em ação. Branding transforma projetos em narrativa.** A Stack IC é uma proposta para conectar essas duas frentes e dar direção ao que já estamos construindo.

**Formato:** fullscreen 1920×1080, sem scroll. Títulos como protagonistas, texto mínimo, cada slide fecha com uma punch line.

> Documento-fonte ativo. A versão anterior está em [`archive/SLIDES.md`](archive/SLIDES.md) (depreciada).

---

## Espinha dorsal (lógica narrativa)

1. **Nivelamento:** UX já faz parte da entrega da Intelicity — só não é chamado assim
2. **O risco:** mais dados sem contexto geram confusão, não ação
3. **O que UX decide:** qual elemento ocupa o centro da experiência (mapa vs. OS)
4. **As falhas reais:** quando a experiência falha no começo, a cadeia inteira sente
5. **O argumento de negócio:** quando a experiência falha, o custo aparece
6. **A estrutura:** UX atravessa toda a cadeia — Coleta → Acompanhamento
7. **O problema de narrativa:** além da experiência, falta uma identidade comum
8. **A proposta:** Stack IC como branding e organização dos projetos
9. **Identidade por produto:** cada projeto ganha um lugar na narrativa
10. **Onde começa:** Fleets, Vision, SABESP e Design System
11. **O fechamento prático:** problemas conhecidos têm respostas possíveis
12. **A tese final:** começar pela experiência, trabalhar de trás para frente

---

## Mapa de slides

| # | Arquivo | Label | Título / tema | Steps |
|---|---------|-------|---------------|-------|
| 0 | `Slide00Capa.tsx` | Capa | Como o produto fala por si. | Capa |
| 1 | `Slide01UxExistente.tsx` | UX hoje | Nós já utilizamos UX, mesmo quando não chamamos assim. | Reconhecimento |
| 2 | `Slide02Dados.tsx` | Mais dados | Mais dados não significam mais clareza. | Situação · Perguntas |
| 3 | `Slide03Mapa.tsx` | O protagonista | O mapa nem sempre precisa ser o protagonista. | Valor |
| 4 | `Slide04Falhas.tsx` | Falhas na cadeia | Quando a experiência falha, a cadeia inteira sente. | Casos |
| 5 | `Slide05Custo.tsx` | O custo | Quando a experiência falha, o custo aparece. | Custo |
| 6 | `Slide06Cadeia.tsx` | A cadeia | UX atravessa a cadeia inteira. | Coleta → Contexto · Informação → Acompanhamento |
| 7 | `Slide07Narrativa.tsx` | Narrativa | Além da experiência, falta uma narrativa comum. | Narrativa |
| 8 | `Slide08StackIC.tsx` | Stack IC | Stack IC: a árvore do dado. | Stack IC |
| 9 | `Slide09Branding.tsx` | Branding dos produtos | Uma identidade para cada produto. | Marcas |
| 10 | `Slide10Foco.tsx` | Onde o UX entra | Onde o UX entra. | Foco |
| 11 | `Slide11ProblemasSolucoes.tsx` | Respostas | Problemas atuais. Respostas possíveis. | Respostas |
| 12 | `Slide12Citacao.tsx` | Citação | Citação de encerramento (Steve Jobs). | Fim |

---

## Slide 0 — Capa
**Steps:** Capa · ✅ mantém como está (GSAP title reveal).

- Título: "Como o produto **fala por si.**"

---

## Slide 1 — Nós já utilizamos UX, mesmo quando não chamamos assim
**Steps:** Reconhecimento (single-step)

Função narrativa: nivelar o entendimento de que UX já faz parte da entrega antes de propor qualquer mudança.

Eyebrow: "Ponto de partida". Título 52px: "Nós já utilizamos UX, mesmo quando **não chamamos assim.**"

Parágrafo de apoio: "A Intelicity vende dados, mas o cliente geralmente acessa, interpreta e utiliza esses dados por meio de plataformas que nós construímos."

**Grid 3×2** — 6 artefatos entregues com ícone + label + nota "já cria uma experiência":

| Artefato | Ícone |
|----------|-------|
| Dashboard | BarChart2 |
| Mapa | Map |
| Formulário e Relatório | FileText |
| Filtro | Filter |
| Ordem de Serviço | ClipboardList |
| Fluxo operacional | GitBranch |

**Punch line:** "Se o cliente usa uma aplicação para entender o dado, então **UX já faz parte do produto.**"

---

## Slide 2 — Mais dados não significam mais clareza
**Steps:** Situação → Perguntas · conceitual (sem exemplos específicos) · duas colunas

- **Coluna esquerda (step "Situação"):** card "A descoberta — A Intelicity revela problemas que antes eram invisíveis" (exemplo: 300 → 3.000 buracos) → seta ↓ → card "A nova responsabilidade — cada problema revelado precisa ser entendido, priorizado e resolvido."
- **Coluna direita (step "Perguntas"):** título "E agora?" e as perguntas em cascata: *Como priorizar? · Como justificar orçamento? · Como planejar? · Como prestar contas? · Como comunicar a órgãos públicos?*
- **Frase centralizada (entra com "Perguntas"):** *"O dado revela o problema. **A experiência define se ele vira ação.**"*

---

## Slide 3 — O mapa nem sempre precisa ser o protagonista
**Steps:** Valor · reflexão de produto (não confronto) — vendemos os dois

Função narrativa: mostrar que UX ajuda a definir o que deve ocupar o centro da experiência conforme o público e o objetivo.

- Tom reflexivo, não agressivo: entregamos o mapa **e** o controle de ordens de serviço.
- **Duas colunas com peso visual igual**, diferenciadas pelo accent:
  - **Mapa** *(azul)* — "Para ver e entender": leitura territorial · comparação temporal · antes e depois.
  - **Ordem de Serviço** *(roxo)* — "Para agir e controlar": prioridade · execução · cobrança · resultado.
- **Punch:** *"O mapa mostra onde está o problema. A ordem de serviço mostra o que fazer com ele. **UX decide qual merece o centro da tela.**"*

---

## Slide 4 — Quando a experiência falha, a cadeia inteira sente
**Steps:** Casos · 3 cases reais de falha que quebram a cadeia antes do dado virar decisão

Função narrativa: mostrar como UX opera antes da interface final — na operação, coleta, instalação e fluxos.

Subtítulo: "UX não atua só na interface final. Ele evita falhas na operação, na coleta, na instalação, no uso do equipamento e na forma como a informação chega ao usuário."

3 cards (ícone vermelho · cenário da falha · **Ponto de UX** em roxo):

| Case | Cenário | Ponto de UX | Impacto na cadeia |
|------|---------|-------------|-------------------|
| **Câmera mal posicionada** | Câmera no veículo compromete a captura, reduz qualidade e gera dados ruins | Alertar o motorista quando a câmera não está bem posicionada | Coleta → Dados |
| **Instalação com pendência** | Dispositivo mal instalado pode não funcionar ou não gerar dado | Fluxos de instalação, validação e confirmação | Coleta → Dados → Acompanhamento |
| **Exemplo do Carnaval** | Formulário mal formatado impede registrar a informação correta | Conduzir o usuário até a ação principal | Coleta → Informação |

**Punch:** *"Quando a experiência falha no começo, o problema aparece no dado, na operação e na decisão."*

---

## Slide 5 — Quando a experiência falha, o custo aparece
**Steps:** Custo · qualitativo, sem métricas numéricas

Função narrativa: transformar a discussão de UX em argumento de negócio.

Eyebrow: "O argumento de negócio". Grid 3×2 de cards (ícone + título + 1 linha de descrição):

1. Baixa conclusão de fluxos — o usuário desiste no meio do caminho
2. Onboarding repetido — cada cliente recomeça do zero
3. Demos longas — o valor demora a aparecer
4. Suporte por dúvida de uso — atendimento que era pra ser tela
5. Vendas que dependem de explicação — o produto não comunica a sua finalidade
6. Cliente com dado, mas sem plano — informação sem próximo passo, risco de perder o cliente

**Punch:** *"UX reduz o custo de explicar, corrigir e sustentar o produto."*

---

## Slide 6 — UX atravessa a cadeia inteira
**Steps:** Coleta → Contexto · Informação → Acompanhamento · mecânica de esteira (200%)

Função narrativa: mostrar de forma estruturada como UX atua em cada etapa — da coleta até o acompanhamento.

- Subtítulo: "Não é só sobre como a informação aparece na tela. É sobre como cada etapa conduz o usuário até uma ação melhor."
- **Esteira de 200% de largura:** step 1 exibe Coleta · Dados · Contexto; step 2 desliza a esteira e revela Informação · Decisão · Acompanhamento.

| # | Nó | Afirmação | UX |
|---|----|-----------|----|
| 01 | Coleta | O dado nasce na operação. | Garante coleta clara, precisa e alinhada ao objetivo da aplicação. |
| 02 | Dados | A evidência precisa ser confiável. | Define quais dados precisam existir para sustentar clareza, performance e consistência. |
| 03 | Contexto | O dado ganha sentido. | Conecta localização, tempo, impacto e perfil para explicar por que a informação importa. |
| 04 | Informação | O usuário precisa entender rápido. | Transforma volume de dados em leitura clara, priorizada e acionável. |
| 05 | Decisão | A plataforma precisa orientar o próximo passo. | Ajuda o usuário a planejar, priorizar e agir com mais segurança. |
| 06 | Acompanhamento | A ação precisa fechar o ciclo. | Acompanha pendências, acha problemas mal resolvidos e vira melhoria contínua. |

> ⚠️ Slide 6 **congelado** a pedido — não alterar conteúdo nem estrutura.

---

## Slide 7 — Além da experiência, falta uma narrativa comum
**Steps:** Narrativa · entrada do branding

Função narrativa: introduzir a falha de narrativa interna e externa — o rebranding não pode viver só na comunicação externa.

- **Layout:** os projetos aparecem **dispersos e inconsistentes** (fontes, pesos, rotações e tons diferentes), provando visualmente que não parecem da mesma família.
- **Insight em destaque (borda roxa):** "Precisamos de algo que mostre **quem a Intelicity é** através dos produtos. Tivemos um rebranding visual para a comunicação externa — mas não trabalhamos o **maior ponto de contato com o consumidor: as nossas aplicações.**"
- **Punch:** *"UX organiza a experiência. Branding organiza a narrativa."*

---

## Slide 8 — Stack IC: a árvore do dado
**Steps:** Stack IC · nova visualização em árvore/fluxo

Função narrativa: apresentar a Stack IC como proposta de branding, organização e comunicação dos projetos.

- **Metáfora:** a Stack IC é o caminho do dado — fontes (raízes) → processamento (galhos) → exibição (copa), nutrida pelo solo (endomarketing/P&D).
- **Selo de aviso no topo:** *"Proposta de branding · não é uma arquitetura técnica oficial."*

**Camadas (de baixo para cima):**

1. **Fontes / Ingestão** — Hardwares e sensores · Canais de denúncia · Plataformas externas (WFM, Salesforce, Informs…)
2. **Coleta de campo** — **IC Fleets** (gateway de hardware). Demais fontes entram direto no processamento.
3. **Processamento** — IC Vision · IC Lumen · IC Quality · IC Gas · IC Tree *(IC Classify / SGC como loop de qualidade do Vision)*
4. **Exibição** — IC Face (biblioteca de front-end) · IC Query (LLM e agentes)
5. **Apoio transversal** — IC News (divulgação interna) · IC Labs (P&D)

**Punch:** *"A Stack IC não cria novos projetos. Ela dá direção para os projetos que já existem."*

---

## Slide 9 — Uma identidade para cada produto
**Steps:** Marcas · carrossel vertical automático

Função narrativa: mostrar como os produtos ganham identidade dentro de uma lógica comum de marca.

- **Esquerda — lockup `IC ●` + carrossel:** "IC" fixo + bolinha que troca de cor; carrossel vertical infinito dos nomes dos produtos (~2s cada). Produto ativo: centralizado, colorido, maior. Demais: esmaecidos.
- **Direita — sincronizado:** camada (Coleta / Processamento / Qualidade / …) na cor do produto + nome completo + funcionalidade em 1 linha.
- **12 produtos:** Fleets · Vision · Lumen · Quality · Tree · Gas · Flood · Classify · Query · Face · News · Labs.
- Loop infinito real. Calibração: `STEP_MS` (2000ms) e `ITEM_H` (espaçamento).

---

## Slide 10 — Onde o UX entra
**Steps:** Foco · fechamento prático + tese final

Função narrativa: mostrar onde UX e Design System entram de forma concreta nas frentes atuais.

**3 colunas** + **barra de fundação** transversal:

- **Fleets** → plataforma com experiência validada para os diferentes fluxos e tipos de usuário.
- **Vision** → experiência interativa (demo) em apresentações e feiras — retém atenção e desperta curiosidade.
- **SABESP** → aplicativo direcionado, com dados relevantes e experiência fluida conforme a necessidade do usuário.

**Barra de fundação:** UX para a empresa → construção de **Design System** e paradigmas de comunicação.

**Frase de fechamento:** *"O objetivo não é apresentar mais uma ideia. É criar um eixo para transformar experiência, comunicação e produto em uma mesma direção."*

---

## Slide 11 — Problemas atuais. Respostas possíveis.
**Steps:** Respostas (single-step)

Função narrativa: fechar o argumento mostrando que os problemas identificados já têm respostas concretas — nenhuma delas isolada.

Eyebrow: "UX e Branding · Respostas". Título 52px: "Problemas atuais. **Respostas possíveis.**"

**Grid 3×2** — 6 cards, cada um com problema (vermelho) + seta ↓ + resposta (roxo):

| # | Problema | Resposta |
|---|----------|----------|
| 1 | Produtos com experiências diferentes e confusas. | Design System, padrões de interface e diretrizes comuns de experiência. |
| 2 | Dados exibidos sem narrativa de decisão. | Interfaces orientadas por contexto, prioridade e ação. |
| 3 | Fluxos importantes com baixa conclusão. | Jornadas guiadas, validações claras e testes de uso. |
| 4 | Valor do produto demorando para aparecer. | Demos, onboarding e experiências focadas em percepção rápida de valor. |
| 5 | Comunicação comercial discrepante com produto. | Narrativa de produto alinhada entre marketing, comercial e aplicação. |
| 6 | Ecossistema sem uma lógica clara. | Stack IC como proposta de branding para conectar projetos, produtos e comunicação. |

**Punch:** *"Os problemas não são isolados. As soluções também não podem ser."*

---

## Slide 12 — Citação de encerramento
**Steps:** Fim · slide centralizado (finale)

Função narrativa: encerrar reforçando a tese de começar pela experiência e trabalhar de trás para frente até a tecnologia.

> "Você precisa começar pela **experiência do cliente** e trabalhar de trás para frente até a tecnologia. Não dá para começar pela tecnologia e depois tentar descobrir para onde você vai vendê-la."
> — **Steve Jobs** · WWDC · 1997

- Layout centralizado. Aspa grande em roxo, 1ª frase (46px) com "experiência do cliente" em roxo, 2ª frase menor, atribuição com filete + nome + "WWDC · 1997".

---

## Notas de implementação

**Status:** ✅ implementado — 13 slides (`Slide00Capa`…`Slide12Citacao`), build passando. Arquivos nomeados com dois dígitos para coincidir com a posição na esteira (00–12).

**Padding / full-bleed**
- O container em `Presentation.tsx` **não** aplica padding. Cada slide aplica `SLIDE_PADDING` (`px-16 pt-10 pb-8`, exportado de `config.ts`) no seu próprio root.
- Para um slide **full-bleed**, basta **omitir** `SLIDE_PADDING` no root daquele slide.

**Removido na reestruturação**
- ⏸️ **Companion mobile por perfil** (via QR) — pausado. O controle remoto do apresentador continua.
- ❌ **Slide de Personas** — removido.
- ❌ **Slide de Design System** dedicado — removido (vive como fundação no Slide 10).
- ❌ **Three.js** — removido. `DataChain`/`StackIC3D` apagados, `scenes/` removida, dependências `three` e `@types/three` retiradas do `package.json`.
- ❌ Arquivos legados apagados: `Slide01Fundamento`, `Slide02Desafio`, `Slide03Crescimento`, `Slide04Branding`, `Slide05DadosTodos`, `Slide06CustoReal`, `Slide05StackIC`, `Slide06Escopo`, `Slide1Coerencia`, `Slide2Dados`, `Slide3Cadeia`, `Slide4Falhas`, `Slide5Valor`, `Slide6Custo`, `Slide7Narrativa`, `Slide8StackIC`, `Slide9Branding`, `Slide11Citacao`.

**Esteira global (camera pan)**
- A apresentação inteira é **uma esteira**: os 13 slides ficam numa trilha (`Presentation.tsx`), e a "câmera" (translate `x`) desliza até o slide atual com easing dramático (`[0.76,0,0.24,1]`, 0.85s).
- **Montagem preguiçosa + congelamento:** um slide só **monta na 1ª vez que é visitado** (`activated` Set). Depois fica montado e **congelado no estado completo** — não remonta ao sair.
- **Memória de step (`actionMemory`):** slides inativos ficam no último step visto.

---

## Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| React 19 + TypeScript · Vite 6 · Tailwind 4 | Base |
| GSAP | Title reveal (Capa) + transições |
| Motion (`motion/react`) | Micro-animações, revelações e a cadeia do Slide 6 (SVG/CSS) |
| OGL | Background WebGL |
| Lucide React | Ícones |

**Fontes:** DM Sans (principal) · Space Mono (labels/tags)
