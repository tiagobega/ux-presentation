# IC Vision — Documentação dos Slides

Apresentação de demonstração do fluxo de análise automatizada de imagens operacionais. Branch: `vision-presentation`.

## Visão geral

5 slides (índices 0–4) com navegação horizontal via Framer Motion. O Slide 3 tem subestados internos (actions) que simulam a progressão das camadas de análise.

## Mapa dos slides

| # | Arquivo | Label (`SLIDE_CONFIG`) | Título / tema |
|---|---------|------------------------|---------------|
| 0 | `Slide0Capa.tsx` | Capa | Cover — "Da Ordem de Serviço ao output inteligente." |
| 1 | `Slide1MenuOS.tsx` | Selecionar OS | Seleção de Ordem de Serviço |
| 2 | `Slide2Criterios.tsx` | Escopo da análise | Critérios e escopo da OS selecionada |
| 3 | `Slide3Processamento.tsx` | Processamento | Processamento em 4 fases (actions) |
| 4 | `Slide4Output.tsx` | Output | Output da análise — tabela de critérios + resumo |

---

## Slide 0 — Capa (`Slide0Capa.tsx`)

**Actions:** `['Capa']` (único estado)

Slide de abertura com animação GSAP de entrada por palavras. Exibe:

- Tag de contexto: `Intelicity · IC Vision · Demonstração`
- Título `IC Vision` (tipografia dupla: Exo 2 + Geist Mono)
- Subtítulo: "Da Ordem de Serviço ao output inteligente."
- Suporte: "Demonstração do fluxo de análise automatizada de imagens operacionais."
- Instrução de navegação no rodapé

**Animação:** GSAP timeline — meta → tag → palavras mascaradas (stagger 0.06s) → subtítulo → suporte → nav.

---

## Slide 1 — Selecionar OS (`Slide1MenuOS.tsx`)

**Actions:** `['Seleção']` (único estado)

Grid 2 colunas com cards das Ordens de Serviço disponíveis (`osList` de `visionData.ts`).

- OS pronta: borda roxa + glow radial + botão "Iniciar análise"
- OS pendente: opacidade reduzida + botão "Em breve"
- Metadados por card: Origem, Imagens vinculadas, Status

**Dados (`osList`):**

| OS | Nome | Origem | Imagens | Status | Pronta |
|----|------|--------|---------|--------|--------|
| 2620577634 | Ligação de água | WFM | 11 | Pronta para análise | ✓ |
| 1049 | Substituição de hidrômetro | WFM | 0 | Aguardando imagens | ✗ |

---

## Slide 2 — Escopo da análise (`Slide2Criterios.tsx`)

**Actions:** `['Escopo']` (único estado)

Layout 2 colunas. Fixa a OS 1 (`osList[0]`) como selecionada.

**Coluna esquerda:**
- Card com dados da OS (nome, número, origem, status)
- Contadores: 11 imagens recebidas, N critérios de avaliação
- Camadas de análise (Bronze → Prata → Ouro)

**Coluna direita:**
- Grid com todos os critérios numerados (lista de `criterios` de `visionData.ts`)

**Camadas de análise (`LAYERS`):**

| Camada | Cor | Descrição |
|--------|-----|-----------|
| Bronze | `#cd7f32` | Qualidade das imagens |
| Prata | `#94a3b8` | Detecção dos elementos |
| Ouro | `#d4af37` | Contexto e interpretação |

**Critérios avaliados (13 total):**

| Critério | Resultado |
|----------|-----------|
| Foto da fachada | Evidência validada |
| Material utilizado | Evidência validada |
| Foto da execução do serviço | Evidência validada |
| Foto da etapa final | Evidência validada |
| Matrícula do hidrômetro | Evidência identificada |
| Sinalização de segurança | Evidência validada |
| Leitura do hidrômetro | Evidência não localizada |
| Uso de EPI/EPC | Evidência não localizada |
| Envoltório de areia | Evidência não localizada |
| Teste de estanqueidade | Evidência não localizada |
| Compactação em camadas | Evidência não localizada |
| Vala requadrada | Evidência não localizada |
| Limpeza | Evidência não localizada |

---

## Slide 3 — Processamento (`Slide3Processamento.tsx`)

**Actions:** `['Imagens', 'Bronze', 'Prata', 'Ouro']`

Grid 6×2 com cards das 11 imagens da OS. O estado visual de cada card evolui conforme a `action` atual (fase 0–3).

**Fases de progressão:**

| Fase | Action | O que aparece |
|------|--------|---------------|
| 0 | Imagens | Cards com shimmer roxo pulsante — "Aguardando análise" |
| 1 | Bronze | Resultado de qualidade (aprovada/reprovada), contador geral, bordas verde/vermelho |
| 2 | Prata | Chip de detecção nas aprovadas, cards reprovados ficam dimmer |
| 3 | Ouro | Badge final (✓ validada / ⚠ alerta), borda dourada ou âmbar |

**Cores de estado:**

| Estado | Cor |
|--------|-----|
| Aprovada | `#2d9d63` (verde) |
| Reprovada | `#e0524d` (vermelho) |
| Alerta | `#d59021` (âmbar) |

**Dados das imagens (`osImages`):**

| ID | Bronze | Motivo rejeição | Detecção (Prata) | Ouro |
|----|--------|-----------------|-----------------|------|
| 01 | Reprovada | Fora de contexto | — | — |
| 02 | Reprovada | Fora de contexto | — | — |
| 03 | Reprovada | Fora de contexto | — | — |
| 04 | Aprovada | — | Fachada | Validada |
| 05 | Aprovada | — | Sinalização (segurança) | Validada |
| 06 | Aprovada | — | Sinalização (segurança) | Alerta: Ângulo incorreto |
| 07 | Aprovada | — | Materiais utilizados | Alerta: Incompletos · falta PEAD do ramal |
| 08 | Aprovada | — | Matrícula do hidrômetro | Validada |
| 09 | Aprovada | — | Execução do serviço | Validada |
| 10 | Reprovada | Baixa nitidez / borrada | — | — |
| 11 | Aprovada | — | Etapa final | Validada |

**Imagens locais:** `src/assets/os1/OS1_imagem_1.jpg` … `OS1_imagem_11.jpg`. Se ausentes, o card renderiza um placeholder com o número da imagem.

---

## Slide 4 — Output (`Slide4Output.tsx`)

**Actions:** `['Output']` (único estado)

Layout 2 colunas (proporção 1.55 : 1).

**Coluna esquerda — tabela de critérios:**
- Colunas: Critério / Resultado (ícone) / Observação
- ✓ verde para os 6 critérios com evidência; `—` cinza para os 7 sem evidência

**Coluna direita — resumo (`resumo`):**

| Stat | Valor |
|------|-------|
| Evidências aceitas | 6 |
| Evidências recusadas | 4 |
| Pendências críticas | 6 |
| Status geral | Parcial / pendente |
| Material aplicado | 0 |
| Obs. material | "Material incompleto. Faltando PEAD do ramal." |

- Alerta âmbar sobre material
- Card de encerramento: "O IC Vision transforma imagens em **output operacional preenchido**."

---

## Dados centrais — `visionData.ts`

Fonte única de verdade para todos os slides. Exporta:

| Export | Tipo | Uso |
|--------|------|-----|
| `osImageUrl(id)` | `function` | URL da imagem local via `import.meta.glob` |
| `osImages` | `OSImage[]` | 11 imagens com resultado por camada |
| `LAYERS` | `const` | Definição das 3 camadas (Bronze/Prata/Ouro) |
| `criterios` | `Criterio[]` | 13 critérios com `ok` e `obs` |
| `resumo` | `object` | Contadores e status final |
| `osList` | `OS[]` | 2 Ordens de Serviço disponíveis |

---

## Config — `config.ts`

```ts
SLIDE_CONFIG   // label + actions de cada slide (fonte do nav e dot-nav)
SLIDE_PADDING  // 'px-16 pt-10 pb-8' — aplicado dentro de cada slide
SlideIndex     // 0 | 1 | 2 | 3 | 4
SlideProps     // { action: string }
```
