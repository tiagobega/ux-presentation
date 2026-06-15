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

**Slide flow** — `src/components/Presentation.tsx` holds the navigation state (`slide` index + `action` step). All slides are rendered side-by-side in one horizontal track ("esteira"); a Framer Motion `x` translate pans the "camera" to `-slide` viewport widths. Each slide is keyed `s{i}-active` / `s{i}-idle`; toggling that key remounts the slide so its entrance animation (motion/GSAP) replays when it scrolls into view. The active slide gets the current `action`; idle slides render their first action. Keyboard (←→↑↓), swipe (touch), QR remote, and dot/button clicks all funnel through `prev()` / `next()` / `gotoSlide()`.

**Adding a slide** — create `src/slides/SlideNN.tsx`, import it in `Presentation.tsx`, append to the `SLIDES` array, and add an entry (label + actions) to `SLIDE_CONFIG` in `src/slides/config.ts` (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `config.ts`) on its own root for the standard padding; omit it for a full-bleed slide.

**CSS** — all styles live in `src/index.css` as plain CSS with custom properties defined in `:root`. No CSS modules or utility classes. Class names match the original HTML. Presentation-specific classes (`.presentation`, `.slide-area`, `.slide`, `.pres-nav`, `.pres-dot`, etc.) are prefixed with `pres-` or `slide-`.

## Slide map

13 slides total. File names encode position (`Slide00`–`Slide12`). Order is governed by the `SLIDES` array in `Presentation.tsx` and the matching `SLIDE_CONFIG` in `src/slides/config.ts`.

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | Cover slide |
| 1 | `Slide01UxExistente.tsx` | UX hoje | "Nós já utilizamos UX, mesmo quando não chamamos assim" — grid of 6 UX artefacts already delivered |
| 2 | `Slide02Dados.tsx` | Mais dados | "Mais dados não significam mais clareza" — the risk of data without context |
| 3 | `Slide03Mapa.tsx` | O protagonista | "O mapa nem sempre precisa ser o protagonista" — map vs. ordem de serviço |
| 4 | `Slide04Falhas.tsx` | Falhas na cadeia | "Quando a experiência falha, a cadeia inteira sente" — real failure cases |
| 5 | `Slide05Custo.tsx` | O custo | "Quando a experiência falha, o custo aparece" — business argument |
| 6 | `Slide06Cadeia.tsx` | A cadeia | "UX atravessa a cadeia inteira" — Coleta → Dados → Contexto → Informação → Decisão → Acompanhamento |
| 7 | `Slide07Narrativa.tsx` | Narrativa | "Além da experiência, falta uma narrativa comum" — fragmented product names |
| 8 | `Slide08StackIC.tsx` | Stack IC | "Stack IC: a árvore do dado" — branding proposal |
| 9 | `Slide09Branding.tsx` | Branding dos produtos | "Uma identidade para cada produto" |
| 10 | `Slide10Foco.tsx` | Onde o UX entra | Practical UX entry points: Fleets, Vision, SABESP, Design System |
| 11 | `Slide11ProblemasSolucoes.tsx` | Respostas | "Problemas atuais. Respostas possíveis." — 6 problem→solution cards |
| 12 | `Slide12Citacao.tsx` | Citação | Steve Jobs quote — "começar pela experiência do cliente" |

## Content language

All user-facing copy is in Brazilian Portuguese.
