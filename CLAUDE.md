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

**Adding a slide** — create `src/slides/fleets/SlideNN.tsx`, import it in `Presentation.tsx`, append to the `SLIDES` array, and add an entry (label + actions) to `SLIDE_CONFIG` in `src/slides/config.ts` (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `config.ts`) on its own root for the standard padding; omit it for a full-bleed slide. `src/slides/fleets/kit.tsx` holds the shared vocabulary (`SlideShell`, `SlideHeader`, `Punch`, `Bar`, `Chip`, `FlowSteps`, the `up()` motion helper and the easings) — prefer it over re-declaring the same boilerplate.

**CSS** — Tailwind v4 utility classes written inline in the components. `src/index.css` only holds the `@theme` tokens (`--color-text`, `--color-purple`, mono font) plus the keyframes and pseudo-element effects that utilities can't express (nebula background, layer glows, entrance animations). No CSS modules.

## Slide map

Two decks live in this repo. The **Fleets** deck (`src/slides/fleets/`) is the one wired into the track; the **Branding & UX** deck (`src/slides/Slide00`–`Slide12`) stays in the repo as reference and renders nowhere until re-listed in `SLIDES`.

22 slides total. File names encode position (`Slide00`–`Slide21`). Order is governed by the `SLIDES` array in `Presentation.tsx` and the matching `SLIDE_CONFIG` in `src/slides/config.ts`. Full script and speaker notes: [`SLIDES-FLEETS.md`](SLIDES-FLEETS.md).

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

Shared data for the deck (perfis CASL, módulos, ciclo de vida do device) lives in `src/data/fleets.ts`.

## Content language

All user-facing copy is in Brazilian Portuguese.
