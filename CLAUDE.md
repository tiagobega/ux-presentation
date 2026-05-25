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

**Slide flow** — `src/components/Presentation.tsx` holds all navigation state (`current`, `direction`). It renders one slide at a time using `key={${current}-${direction}}` to trigger a CSS `enterRight`/`enterLeft` animation on remount. Keyboard (←→), swipe (touch), and dot/button clicks all funnel through `prev()` / `next()` / `gotoSlide()`.

**Adding a slide** — create `src/slides/SlideNN.tsx`, import it in `Presentation.tsx`, append to the `SLIDES` array, and add its label to the `SLIDE_LABELS` array in `src/components/Nav.tsx`.

**CSS** — all styles live in `src/index.css` as plain CSS with custom properties defined in `:root`. No CSS modules or utility classes. Class names match the original HTML. Presentation-specific classes (`.presentation`, `.slide-area`, `.slide`, `.pres-nav`, `.pres-dot`, etc.) are prefixed with `pres-` or `slide-`.

## Content language

All user-facing copy is in Brazilian Portuguese.
