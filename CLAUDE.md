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

**Adding a slide** — create `src/slides/fleets-demo/SlideNN.tsx`, import it in `Presentation.tsx`, append to the `SLIDES` array, and add an entry (label + actions) to `SLIDE_CONFIG` in `src/slides/config.ts` (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `config.ts`) on its own root for the standard padding; omit it for a full-bleed slide. `src/slides/fleets-demo/kit.tsx` holds the shared vocabulary (`SlideShell`, `SlideHeader`, `Punch`, `Bar`, `Chip`, `LiveBadge`, `DemoSlide`, the `up()` motion helper and the easings) — prefer it over re-declaring the same boilerplate.

**Cards that fill a row** — a `flex-1 min-h-0 grid` stretches its cards to the full row height, which leaves dead space inside them. Wrap the grid in `flex-1 min-h-0 flex items-center` and give the inner `grid` a plain `w-full`: cards then hug their content, stay equal-height (grid stretch) and sit centered in the free area.

**CSS** — Tailwind v4 utility classes written inline in the components. `src/index.css` only holds the `@theme` tokens (`--color-text`, `--color-purple`, mono font) plus the keyframes and pseudo-element effects that utilities can't express (nebula background, layer glows, entrance animations). No CSS modules.

## Slide map

Three decks live in this repo; only **Fleets · demo ao vivo** (`src/slides/fleets-demo/`) is wired into the track. The other two stay as reference and render nowhere until re-listed in `SLIDES`: the 22-slide self-contained Fleets deck (`src/slides/fleets/`) and the **Branding & UX** deck (`src/slides/Slide00`–`Slide12`).

**Formato do deck ativo** — apresentação de dois monitores: monitor 1 = estes slides, monitor 2 = a aplicação ao vivo. O slide é âncora visual, nunca documento — pouco texto, ~6 palavras por linha. Os slides 6–14 são `[DEMO]`: pano de fundo enquanto a demo roda, montados pelo `DemoSlide` do kit (eyebrow + título grande + tokens + selo "ao vivo · monitor 2").

Fontes de conteúdo, na raiz do repo:

| Arquivo | Papel |
|---|---|
| [`fleets-slides.md`](fleets-slides.md) | O que vai em cada slide (é a especificação do deck) |
| [`fleets-roteiro.md`](fleets-roteiro.md) | A fala do apresentador e os passos de cada demo |
| [`fleets-documentacao.md`](fleets-documentacao.md) | Referência de apoio (ecossistema, permissões, glossário, fluxos) |

17 slides. File names encode position (`Slide00`–`Slide16`). Order is governed by the `SLIDES` array in `Presentation.tsx` and the matching `SLIDE_CONFIG` in `src/slides/config.ts`.

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

Shared data (perfis CASL, módulos, ciclo de vida do device) lives in `src/data/fleets.ts` — used by both Fleets decks.

## Content language

All user-facing copy is in Brazilian Portuguese.
