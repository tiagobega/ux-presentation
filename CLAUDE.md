# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # tsc type-check + vite production build
npm run preview  # preview production build locally
```

## Architecture

React + Vite + TypeScript fullscreen slide presentation. The original static HTML (`intelicity_branding_ux.html`) is kept as a reference.

**Slide flow** — `src/components/Presentation.tsx` holds the navigation state (`slide` index + `action` step). All slides are rendered side-by-side in one horizontal track ("esteira"); a Framer Motion `x` translate pans the "camera" to `-slide` viewport widths. A slide only mounts when it is first reached (`activated` set, after `ENTER_DELAY_MS`), so its entrance animation (motion/GSAP) fires as the camera lands on it; from then on it stays mounted. The active slide gets the current `action`; slides left behind freeze on the last step they showed (`actionMemory`). Keyboard (←→↑↓), swipe (touch), QR remote, and dot/button clicks all funnel through `prev()` / `next()` / `gotoSlide()`.

**Decks** — a deck is `{ id, brand, title, slides, config }` (type in `src/slides/config.ts`), declared in `<deck>/deck.ts`. `src/slides/decks.ts` picks the active one: **Informs** by default, `?deck=fleets-demo` and `?deck=fleets` for the others. `Presentation.tsx` and `Nav.tsx` read `SLIDES` / `SLIDE_CONFIG` / `DECK` from there and know nothing about which deck is loaded. `config.ts` deliberately imports no deck — the slides import `SLIDE_PADDING` from it, so importing a deck back would close a cycle.

**Adding a slide** — create `src/slides/<deck>/SlideNN.tsx`, import it in `<deck>/deck.ts`, append to `slides`, and add the matching entry (label + actions) to `config` at the same index (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `../config`) on its own root for the standard padding; omit it for a full-bleed slide. `src/slides/kit.tsx` holds the vocabulary shared by every deck (`SlideShell`, `SlideHeader`, `Punch`, `Bar`, `Chip`, `Accent`, `FlowSteps`, the `up()` motion helper and the easings) — prefer it over re-declaring the same boilerplate. `src/slides/fleets/kit.tsx` is just a re-export of it. The demo deck has its own `src/slides/fleets-demo/kit.tsx` with the extra `LiveBadge` and `DemoSlide`, and Informs has `src/slides/informs/ui.tsx` with the phone mockups.

**Cards that fill a row** — a `flex-1 min-h-0 grid` stretches its cards to the full row height, which leaves dead space inside them. Wrap the grid in `flex-1 min-h-0 flex items-center` and give the inner `grid` a plain `w-full`: cards then hug their content, stay equal-height (grid stretch) and sit centered in the free area.

**CSS** — Tailwind v4 utility classes written inline in the components. `src/index.css` only holds the `@theme` tokens (`--color-text`, `--color-purple`, mono font) plus the keyframes and pseudo-element effects that utilities can't express (nebula background, layer glows, entrance animations). No CSS modules.

## Slide maps

Four decks live in this repo. **Informs** (`src/slides/informs/`) is the active one; **Fleets · demo ao vivo** (`src/slides/fleets-demo/`) and the self-contained **Fleets** deck (`src/slides/fleets/`) are one URL param away; the **Branding & UX** deck (`src/slides/Slide00`–`Slide12`) stays as reference and renders nowhere until wrapped in a `deck.ts` and registered in `decks.ts`.

### Informs — 21 slides (`src/slides/informs/`)

Order is governed by `INFORMS_DECK` in `src/slides/informs/deck.ts`. Full script and speaker notes: [`informs-roteiro.md`](informs-roteiro.md).

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | O nome como elemento principal, com a tagline "do template ao envio" |
| 1 | `Slide01Problema.tsx` | O problema | A cena do moto-verificador e as 4 dores |
| 2 | `Slide02Solucao.tsx` | A resposta | Tabela dor → solução; step 2 acende a coluna da direita |
| 3 | `Slide03Anatomia.tsx` | Anatomia | Pirâmide campo → sessão → template → formulário; step 2 fecha o topo e traz Sistema de Origem e Justificativa |
| 4 | `Slide04Campos.tsx` | Tipos de campo | Os 10 campos de coleta e os 4 informativos |
| 5 | `Slide05Autenticacao.tsx` | Autenticação | Gates (Cognito + PKCE), WebView embutida, perfil carregado no login |
| 6 | `Slide06Listagem.tsx` | Listagem | Abas por status com contador, busca e filtro, prioridades |
| 7 | `Slide07Status.tsx` | Status | Os 5 status na linha do tempo; step 2 isola "Completo e não enviado" |
| 8 | `Slide08Preencher.tsx` | Preenchimento | Sessão a sessão, validação na hora, autosave do rascunho |
| 9 | `Slide09Duplicacao.tsx` | Duplicação | Uma sessão duplicável virando N instâncias independentes |
| 10 | `Slide10Cancelamento.tsx` | Cancelamento | Justificativas e o que cada motivo exige (texto/foto) |
| 11 | `Slide11Offline.tsx` | Offline-first | Fila de mutations persistida; step 2 mostra a sincronização |
| 12 | `Slide12Roteirizacao.tsx` | Roteirização | Modos da rota e maquete de mapa com paradas ordenadas |
| 13 | `Slide13Rastreio.tsx` | Rastreio | WebSocket, GPS em background, buffer offline, permissão INSPECTOR |
| 14 | `Slide14Template.tsx` | Template | O molde: nome, sistema de origem, ativo, sessões |
| 15 | `Slide15Formulario.tsx` | Formulário | O template ganha localização, prioridade, prazo e verificador |
| 16 | `Slide16CriarEmCampo.tsx` | Criar em campo | O outro caminho: o verificador gera o formulário na rua |
| 17 | `Slide17Integracao.tsx` | Integração | Diagrama origem ↔ API ↔ app em 6 mensagens (2 steps) |
| 18 | `Slide18Implantacao.tsx` | Implantação | As duas frentes: Gates e APIs |
| 19 | `Slide19ProximosPassos.tsx` | Próximos passos | PWA, App Store, rebranding, responsivo, rastreio integrado |
| 20 | `Slide20Encerramento.tsx` | Encerramento | Informs hoje e amanhã, "Perguntas?" |

Shared data for the deck (status, prioridades, tipos de campo, fila offline) lives in `src/data/informs.ts`.

**Maquetes do app** — `src/slides/informs/ui.tsx` reproduz o front real (`E:\repos\informs_front`, monorepo Expo): header `#00a5e9` (`#f97316` offline), fundo `#f2f0f5`, cards brancos, tab bar Mapa/Criar/Formulários, pílulas de status com contador e o wordmark em SVG. As cores e rótulos de status em `src/data/informs.ts` são cópia de `formStatusData` (`shared/types/enums/form-status.types.ts`); ao mexer nas maquetes, confira lá antes de inventar. Dentro do celular o cromo roxo do deck não entra: vale o visual do produto.

**Sistemas de origem** — GAIA, Porto Alegre, Recife e SABESP (`SISTEMAS_ORIGEM` em `src/data/informs.ts`). O enum `System` do app (`shared/types/enums/system.types.ts`) ainda lista `GAIA`, `GEOVISTA` e `SGC`, que estão errados; não copie de lá. A palavra "gestor" não aparece no deck: quem cria template e formulário é o sistema de origem.

**Tom do texto** — sem travessão (`—`) na copy, sem frases de efeito e sem caixas que explicam por que o slide importa. Frase declarativa e curta.

### Fleets · demo ao vivo — 17 slides (`src/slides/fleets-demo/`)

Order is governed by `FLEETS_DEMO_DECK` in `src/slides/fleets-demo/deck.ts`.

**Formato** — apresentação de dois monitores: monitor 1 = estes slides, monitor 2 = a aplicação ao vivo. O slide é âncora visual, nunca documento: pouco texto, ~6 palavras por linha. Os slides 6–14 são `[DEMO]`, pano de fundo enquanto a demo roda, montados pelo `DemoSlide` do kit (eyebrow + título grande + tokens + selo "ao vivo · monitor 2").

Fontes de conteúdo, na raiz do repo:

| Arquivo | Papel |
|---|---|
| [`fleets-slides.md`](fleets-slides.md) | O que vai em cada slide (é a especificação do deck) |
| [`fleets-roteiro.md`](fleets-roteiro.md) | A fala do apresentador e os passos de cada demo |
| [`fleets-documentacao.md`](fleets-documentacao.md) | Referência de apoio (ecossistema, permissões, glossário, fluxos) |

| # | File | Label | Título / tema |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | "Fleets — hardware, operação e pagamento no mesmo lugar" |
| 1 | `Slide01PorQueExiste.tsx` | Por que existe | "Antes: uma planilha" — as três dores |
| 2 | `Slide02OQueResolvemos.tsx` | O que resolvemos | "Fonte única de verdade" — espelha as três dores |
| 3 | `Slide03Ecossistema.tsx` | Ecossistema | Campo → Ingestor → Fleets → Usuários; step 2 revela GatesAuth + CASL |
| 4 | `Slide04Usuarios.tsx` | Usuários | Os 5 perfis CASL; step 2 acende a máscara de LGPD |
| 5 | `Slide05Glossario.tsx` | Glossário | As 10 palavras; step 2 isola os dois contratos e traz a frase de ouro |
| 6 | `Slide06DemoAuth.tsx` | Demo · Autenticação | "Quem você é decide o que você vê" |
| 7 | `Slide07DemoCadastros.tsx` | Demo · Cadastros base | Usuários · Tipos · Chips |
| 8 | `Slide08DemoContrato.tsx` | Demo · Contrato | Contrato = dispositivos + colaboradores + pagamentos |
| 9 | `Slide09DemoColaboradores.tsx` | Demo · Colaboradores | "A pessoa no centro" — Card · Tabela · Mapa |
| 10 | `Slide10DemoDispositivos.tsx` | Demo · Dispositivos | "Ciclo do hardware" — Mapa · Tabela · Instalação · Lote |
| 11 | `Slide11DemoColeta.tsx` | Demo · Coleta em campo | Módulo novo — **a confirmar com o time** |
| 12 | `Slide12DemoPagamentos.tsx` | Demo · Pagamentos | "Fechar o mês" — Individual · Lote · Exportar |
| 13 | `Slide13DemoAlertas.tsx` | Demo · Alertas | "Hardware pedindo atenção" (beta) |
| 14 | `Slide14DemoGestores.tsx` | Demo · Para gestores | "O dado vira indicador. Sem montar planilha." |
| 15 | `Slide15ProximosPassos.tsx` | Próximos passos | 7 frentes em 3 colunas; step 2 acende a dor que cada coluna ataca |
| 16 | `Slide16Perguntas.tsx` | Perguntas | "Obrigado." + "Perguntas?" + contato |

### Fleets — 22 slides (`src/slides/fleets/`)

Order is governed by `FLEETS_DECK` in `src/slides/fleets/deck.ts`.

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | Cover — "Como a plataforma funciona" |
| 1 | `Slide01Problema.tsx` | O problema | "Três mundos que hoje vivem em planilhas separadas" — hardware, contratos, pessoas |
| 2 | `Slide02Dominio.tsx` | Domínio | 6 entidades (Device, Vehicle, Person, Contract, Payment, AuditLog) + regra de ouro |
| 3 | `Slide03Perfis.tsx` | Perfis | Os 5 perfis CASL em tabela; segundo step acende a coluna de LGPD |
| 4 | `Slide04QuemUsa.tsx` | Quem usa | Que módulos cada perfil abre; DRIVER destacado como superfície futura |
| 5 | `Slide05Mapa.tsx` | Módulos | Os 7 itens do menu, com gating por permissão e badge de alertas |
| 6 | `Slide06Dashboard.tsx` | Dashboard | KPIs, gráfico por tipo e comparação de frota (maquete) |
| 7 | `Slide07Dispositivos.tsx` | Dispositivos | Catálogo, cards por tipo, camadas do mapa, componente único de condição |
| 8 | `Slide08CicloVida.tsx` | Ciclo de vida | Fabricado → A instalar → Instalado → Manutenção → Perdido; step 2 revela DeviceActivity + AuditLog |
| 9 | `Slide09Instalacao.tsx` | Instalação | Individual, em lote, edição/histórico, desinstalação + risco de erro humano |
| 10 | `Slide10Alertas.tsx` | Alertas | Lista com status OPEN, sheet de detalhe, filtros; gancho para push no app |
| 11 | `Slide11Colaboradores.tsx` | Colaboradores | Pessoa-primeiro vs. placa-primeiro, mapa de pessoas, status |
| 12 | `Slide12Contratos.tsx` | Contratos | Ficha do contrato + vínculo com `metaKm` e `valueCents` |
| 13 | `Slide13Pagamentos.tsx` | Pagamentos | Estimado vs. pago, wizard em lote, exportação |
| 14 | `Slide14Configuracao.tsx` | Governança | Tipos, chips 4G, usuários, permissões e LGPD |
| 15 | `Slide15FluxoEstoque.tsx` | Fluxo 1 · Hardware | Do estoque à operação, em 5 passos (2 steps) |
| 16 | `Slide16FluxoPagamento.tsx` | Fluxo 2 · Contrato | Do contrato ao pagamento, em 5 passos (2 steps) |
| 17 | `Slide17Roadmap.tsx` | Roadmap | As três frentes e o que cada uma ataca |
| 18 | `Slide18Estoque.tsx` | Estoque | Próximo passo 1 — gerenciamento de estoque |
| 19 | `Slide19AppMotorista.tsx` | App do motorista | Próximo passo 2 — metas, push e suporte (maquete de app) |
| 20 | `Slide20InstalacaoAssistida.tsx` | Instalação assistida | Próximo passo 3 — hoje o operador declara, amanhã a Jetson confirma |
| 21 | `Slide21Encerramento.tsx` | Encerramento | Fleets hoje vs. amanhã + "Perguntas?" |

Shared data (perfis CASL, módulos, ciclo de vida do device) lives in `src/data/fleets.ts` — used by both Fleets decks.

## Content language

All user-facing copy is in Brazilian Portuguese.
