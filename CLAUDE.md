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

**Data** — all mock data for the IC Vision demo lives in `src/slides/visionData.ts` (OS list, images per OS, evaluation criteria, analysis layers, summary). It is the single source of truth for all slides.

## Slide map — branch `vision-presentation` (IC Vision demo)

5 slides total. Full content + actions documented in `SLIDES-VISION.md`.

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide0Capa.tsx` | Capa | Cover — "Da Ordem de Serviço ao output inteligente." |
| 1 | `Slide1MenuOS.tsx` | Selecionar OS | OS selection menu (2 cards: 1 ready, 1 pending) |
| 2 | `Slide2Criterios.tsx` | Escopo da análise | Criteria & scope for the selected OS |
| 3 | `Slide3Processamento.tsx` | Processamento | Image processing — 4 actions: Imagens → Bronze → Prata → Ouro |
| 4 | `Slide4Output.tsx` | Output | Analysis output: criteria table + summary stats |

> **Slide 3 actions** drive the visual state of the 11 image cards — each action reveals the next analysis layer (quality → detection → context).

## Content language

All user-facing copy is in Brazilian Portuguese.
