# IC Vision — Demonstração (deck)

**Tema:** Demo do fluxo do **IC Vision** — da Ordem de Serviço ao output inteligente.
**Formato:** fullscreen 1920×1080, sem scroll. Reaproveita a infra do deck anterior (esteira/câmera, Nav, Background, QR/remoto, `up()`, `SLIDE_PADDING`, tokens, fontes).

> Esta branch substitui a apresentação de Branding & UX (preservada em `archive/SLIDES.md` e em outra branch). Depois pode virar um hub de apresentações.

---

## Narrativa (demo previsível)
Entramos no produto → escolhemos uma OS → entendemos o que será analisado → assistimos ao processamento em 3 camadas → recebemos o output preenchido. Deixa de ser "sobre" o IC Vision e passa a **demonstrar o fluxo**.

## Mapa de slides

| # | Slide | Steps | Arquivo |
|---|-------|-------|---------|
| 0 | Capa — IC Vision | Capa | `Slide0Capa.tsx` (GSAP reveal, título em Exo 2) |
| 1 | Selecionar OS | Seleção | `Slide1MenuOS.tsx` |
| 2 | Escopo da análise | Escopo | `Slide2Criterios.tsx` |
| 3 | Processamento | **Imagens · Bronze · Prata · Ouro** | `Slide3Processamento.tsx` |
| 4 | Output | Output | `Slide4Output.tsx` |

Dados centralizados em **`src/slides/visionData.ts`** (OS, critérios, 11 imagens com estado por camada, resumo).

---

## Slide 0 — Capa
"IC **Vision**" (Exo 2). Subtítulo "Da Ordem de Serviço ao output inteligente." + apoio "Demonstração do fluxo de análise automatizada de imagens operacionais."

## Slide 1 — Selecionar OS
2 cards: **OS 1048 · Ligação de água S/V** (WFM · 11 imagens · pronta · fiscalização remota · botão "Iniciar análise") e **OS 1049 · Substituição de hidrômetro C/V** (0 imagens · aguardando · "Em breve", desabilitado). A demo segue com a 1048.

## Slide 2 — Escopo da análise
- **Dados da OS** (nome, origem, status).
- **Quantidade:** 11 imagens · 3 camadas · 11 critérios.
- **Camadas:** Bronze (qualidade) · Prata (detecção) · Ouro (contexto).
- **Critérios (11):** lista que será preenchida no output.

## Slide 3 — Processamento *(action-driven, 4 steps)*
`phase = action` → grid de 11 cards. Indicador de camadas no topo (Imagens → Bronze → Prata → Ouro) destaca a atual; contador "7 aprovadas · 4 reprovadas" a partir do Bronze.

| Step | Comportamento dos cards |
|------|--------------------------|
| **Imagens** | thumbnail + "aguardando análise" + shimmer (delay pseudo-aleatório por id) |
| **Bronze** | reprovadas (01,02,03 dedo · 10 borrada) → grayscale + X vermelho + motivo; aprovadas → check verde |
| **Prata** | aprovadas → chip de detecção + moldura prata; reprovadas esmaecem |
| **Ouro** | aprovadas → Validada (verde) ou Alerta (âmbar): 06 ângulo incorreto, 07 falta PEAD do ramal |

## Slide 4 — Output
Tabela dos 11 critérios (Critério · Resultado ✓/– · Observação) + resumo: **aceitas 6 · recusadas 4 · pendências 6 · Parcial/pendente**. Observação: "Material incompleto. Faltando PEAD do ramal." Fecha com "O IC Vision transforma imagens em output operacional preenchido."

---

## Imagens da OS (a fornecer)
- Solte os arquivos em **`src/assets/os1/`** nomeados `OS1_imagem_1.jpg` … `OS1_imagem_11.jpg`.
- Carregamento automático via `import.meta.glob` em `visionData.ts` (`osImageUrl(id)`). Enquanto faltarem, o card mostra **placeholder numerado** — o build não quebra.

## Stack técnica (reuso)
React 19 · Vite 6 · Tailwind 4 · Motion · GSAP (capa) · OGL (background) · Lucide. Fontes: DM Sans · Space Mono · **Exo 2** (IC) · **Geist Mono**. Esteira/câmera, lazy-mount + `actionMemory`, teclado/touch/QR — todos herdados sem alteração de `Presentation.tsx`.
