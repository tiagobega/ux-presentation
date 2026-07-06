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

**Shared slide templates** (`src/slides/shared/`) — most content slides don't lay out from scratch, they fill a template:
- `UpdateSlide.tsx` — "status update" layout: eyebrow, title (lead + highlight), paragraph, an optional "done" column and a "next" column of icon+text items, closing note. When `done` is omitted the slide renders as a single full-width "next steps" column (used by slides that are next-steps-only, e.g. Gravata, Zeladoria).
- `BulletSlide.tsx` — simpler eyebrow/title/paragraph + single bullet list (optionally 2 columns via `bulletCols`). Used for decision/summary slides (CVAT, IcePanel).
- `EcosystemMap.tsx` — the recurring SVG/diagram of the product ecosystem (Fleets at the center, other products plugged in), reused across slides in different "variant" states.

**CSS** — all styles live in `src/index.css` as plain CSS with custom properties defined in `:root`. No CSS modules or utility classes. Class names match the original HTML. Presentation-specific classes (`.presentation`, `.slide-area`, `.slide`, `.pres-nav`, `.pres-dot`, etc.) are prefixed with `pres-` or `slide-`.

## Slide map

17 slides total. File names encode position (`Slide00`–`Slide16`). Order is governed by the `SLIDES` array in `Presentation.tsx` and the matching `SLIDE_CONFIG` in `src/slides/config.ts`. This deck is a **semester status update on the Intelifleets/Vision product ecosystem**, not the earlier UX-branding pitch (see git history for that version).

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide00Abertura.tsx` | Abertura | "Saímos de sistemas isolados para um ecossistema integrado" — thesis statement for the whole deck |
| 1 | `Slide01MapaEcossistema.tsx` | Mapa do ecossistema | Recurring ecosystem map (Fleets at center, Vision/Informs/Gravata plugged in) |
| 2 | `Slide02Fleets.tsx` | Intelifleets | "O hub que conecta as peças" — 3 fronts: Ingestão, Plataforma, Alertas |
| 3 | `Slide03Plataforma.tsx` | Plataforma | "Em produção. Agora, a adoção" — platform shipped (told before Ingestão), adoption still low |
| 4 | `Slide04Ingestao.tsx` | Ingestão | "A fundação que destravou o Vision" — Jetsons ingestion refactor (done/next via `UpdateSlide`) |
| 5 | `Slide05Alertas.tsx` | Alertas | "O ciclo detectar → alertar → resolver" — alerting loop closed, incl. device heartbeat health check |
| 6 | `Slide06Vision.tsx` | Intelivision | "Bronze, Prata e Ouro" — medallion pipeline; 3-step action (layers → photo animates → expansion targets: SABESP, on-demand, new verticals) |
| 7 | `Slide07Informs.tsx` | Informs | "Em campo, iterando com o usuário real" — live product, App Store, new features/projects/sustentação, future Vision integration |
| 8 | `Slide08Cvat.tsx` | CVAT | "O melhor código é o que não precisamos escrever" — SGC discontinued in favor of CVAT (Computer Vision Annotation Tool), an open-source alternative (`BulletSlide`) |
| 9 | `Slide09Gravata.tsx` | Gravata | "Não volta de onde parou — volta melhor" — streaming project resumes with new hardware, blur + HLS architecture, integrated into Fleets (next-steps only, no `done` column) |
| 10 | `Slide10GestaoObras.tsx` | Gestão de Obras | New product framing (Gestão e Planejamento de Obras) — the 1-week SABESP demo is supporting evidence, not the headline |
| 11 | `Slide11Zeladoria.tsx` | Zeladoria | "A próxima fronteira: o cidadão" — first citizen-facing product, born wired to Vision (next-steps only, no status column) |
| 12 | `Slide12PadroesIntro.tsx` | Padrões & Inovação | Transition slide: "Como mudamos o jeito de construir software" |
| 13 | `Slide13IcePanel.tsx` | IcePanel | "Arquitetura que não se perde" — architecture tool + ADRs + MCP for AI context (`BulletSlide`) |
| 14 | `Slide14Padroes.tsx` | Claude, dev com IA & MCPs | Merged slide: Claude corporate subscription, Specs→Docs→IcePanel→MCPs→Código pipeline, and MCPs as the "USB-C" of AI integrations, side by side |
| 15 | `Slide15Roadmap.tsx` | Roadmap | "Agora, próximo e explorando" — 3-column roadmap |
| 16 | `Slide16Creditos.tsx` | Créditos | "Nada incrível é construído sozinho" — centered thank-you naming a handful of people, closes the deck |

## Content language

All user-facing copy is in Brazilian Portuguese.
