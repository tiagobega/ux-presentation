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

**Adding a slide** — create `src/slides/fleets-demo/SlideNN.tsx`, import it in `Presentation.tsx`, append to the `SLIDES` array, and add an entry (label + actions) to `SLIDE_CONFIG` in `src/slides/config.ts` (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `config.ts`) on its own root for the standard padding; omit it for a full-bleed slide. `src/slides/fleets-demo/kit.tsx` holds the shared vocabulary (`SlideShell`, `SlideHeader`, `Punch`, `Bar`, `Chip`, `LiveBadge`, `DemoSlide`, `Reveal`, the `up()` motion helper and the easings) — prefer it over re-declaring the same boilerplate.

**Revelar conteúdo step a step** — `Reveal` (kit) abre o bloco por `max-height`; o espaçamento vai **dentro** dele (`pt-*` no filho), senão o `gap` do pai sobra enquanto está fechado, e o `max` em px tem que ser um pouco maior que a altura real do conteúdo (`max-height` só limita, não estica). O padrão do deck é: **a estreia de uma faixa abre por altura, o que vem depois dentro dela só acende em fade** — assim nada se reposiciona no meio da fala. Para essa combinação use `fade={false}` no `Reveal` e um `delay` no conteúdo, para ele aparecer depois da abertura. Ver `Slide01PorQueExiste.tsx`.

**Cards that fill a row** — a `flex-1 min-h-0 grid` stretches its cards to the full row height, which leaves dead space inside them. Wrap the grid in `flex-1 min-h-0 flex items-center` and give the inner `grid` a plain `w-full`: cards then hug their content, stay equal-height (grid stretch) and sit centered in the free area.

**Glossário no celular da plateia** — `plugins/remoteControl.ts` (plugin do dev server) já mantinha um canal SSE: o deck faz `POST /remote-update` a cada troca de slide/step e o servidor reemite o estado em `/slide-state`. Em cima disso, a rota **`/glossario`** serve uma página mobile que a plateia abre pelo QR do slide 5 e mantém aberta durante toda a demo: ela mostra **os termos relevantes ao slide que está no ar** (trocados pelo SSE) e uma **folha com os 22 termos**, com busca sem acento e navegação por "veja também". Dois pontos:

- A fonte única é `src/data/glossario.ts` — `TERMOS` (o que a palavra significa na aplicação) e `FOCO` (quais termos valem em cada slide, com uma nota do que observar). O arquivo é lido **pelo slide e pelo plugin**, então não pode importar nada: o plugin é bundlado fora do app. Para mudar o que aparece no celular durante um fluxo, mexa em `FOCO` — não na página HTML.
- Tudo isso é **dev-only**: o plugin vive em `configureServer` e o `POST /remote-update` está atrás de `import.meta.env.DEV`. Apresentar com `npm run dev` (o `server.host` já está ligado, e `/remote-info` devolve o IP da máquina na rede — `localhost` não serve num QR).

**CSS** — Tailwind v4 utility classes written inline in the components. `src/index.css` only holds the `@theme` tokens (`--color-text`, `--color-purple`, mono font) plus the keyframes and pseudo-element effects that utilities can't express (nebula background, layer glows, entrance animations). No CSS modules.

## Slide map

Three decks live in this repo; only **Fleets · demo ao vivo** (`src/slides/fleets-demo/`) is wired into the track. The other two stay as reference and render nowhere until re-listed in `SLIDES`: the 22-slide self-contained Fleets deck (`src/slides/fleets/`) and the **Branding & UX** deck (`src/slides/Slide00`–`Slide12`).

**Formato do deck ativo** — apresentação de dois monitores: monitor 1 = estes slides, monitor 2 = a aplicação ao vivo. O slide é âncora visual, nunca documento — pouco texto, ~6 palavras por linha. Os slides 6–14 são de fluxo: existem só para a plateia se localizar no domínio, sem frase de efeito, montados pelo `DemoSlide` do kit (eyebrow + nome do domínio + tokens + selo "ao vivo · monitor 2").

Fontes de conteúdo, na raiz do repo:

| Arquivo | Papel |
|---|---|
| [`fleets-slides.md`](fleets-slides.md) | O que vai em cada slide (é a especificação do deck) |
| [`fleets-ajustes.md`](fleets-ajustes.md) | Ajustes pedidos depois da 1ª versão — **prevalece sobre `fleets-slides.md`** |
| [`fleets-roteiro.md`](fleets-roteiro.md) | A fala do apresentador e os passos de cada demo |
| [`fleets-documentacao.md`](fleets-documentacao.md) | Referência de apoio (ecossistema, permissões, glossário, fluxos) |

17 slides. File names encode position (`Slide00`–`Slide16`). Order is governed by the `SLIDES` array in `Presentation.tsx` and the matching `SLIDE_CONFIG` in `src/slides/config.ts`. Steps: "O que resolvemos" tem seis, "Por que existe" tem cinco, Arquitetura tem dois, todo o resto tem um.

**Animar o diagrama de arquitetura** — `src/assets/diagrama-futuro.svg` (export do Figma, com o texto em paths) é anotado com `data-part="..."` em cada elemento: `lane`, `hw-hoje`/`hw-futuro`, `fleets`, `proc-caixa`/`proc-hoje`/`proc-futuro`, `validacao`, `proj-hoje`/`proj-futuro` e as `seta-*`. `Slide02Arquitetura.tsx` importa o arquivo com `?raw`, injeta e monta as timelines GSAP em cima desses seletores. Dois cuidados: (1) o esmaecido dos itens planejados está no atributo `opacity` do próprio SVG, então a animação lê esse valor como destino em vez de ir até `1`; (2) **reexportar o SVG apaga as anotações** — refaça-as antes de trocar o arquivo. Cada troca de step monta uma timeline nova (ida acende, volta apaga); `timeline.reverse()` não reverteu de forma confiável aqui.

| # | File | Label | Título / tema |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | Wordmark "Fleets" em Exo 2 + "hardware, operação e pagamento no mesmo lugar" |
| 1 | `Slide01PorQueExiste.tsx` | Por que existe | "Por que o Fleets existe?" — 5 steps: a pergunta sozinha, a resposta, e **uma dor por step** (já com a descrição). Título recua com `scale`; a faixa das dores abre por `max-height` no step 3 e os outros dois cards só acendem em fade |
| 2 | `Slide02Arquitetura.tsx` | Arquitetura | O diagrama `src/assets/diagrama-futuro.svg` animado camada por camada — 2 steps: o que roda hoje, depois o que está em construção |
| 3 | `Slide03Usuarios.tsx` | Usuários | Matriz módulo × perfil: o que cada um vê e faz + nota de dado sensível |
| 4 | `Slide04OQueResolvemos.tsx` | O que resolvemos | A resposta às três dores da abertura — **mesma mecânica do slide 1**: 6 steps (pergunta, resposta, um ganho por step, fecho), título que recua com `scale` e faixas que abrem por `max-height` |
| 5 | `Slide05Glossario.tsx` | Glossário | O **QR do glossário** (`/glossario`) + a parede com os nomes dos 22 termos. Etapa única: só os dois contratos ficam escritos, com a frase de ouro fechando. A definição de cada palavra vive no celular |
| 6 | `Slide06DemoAuth.tsx` | Fluxo · Autenticação | Login · Perfil · Menu por permissão |
| 7 | `Slide07DemoCadastros.tsx` | Fluxo · Cadastros base | Usuários · Tipos · Chips |
| 8 | `Slide08DemoContrato.tsx` | Fluxo · Contrato | As 3 abas: Dispositivos · Colaboradores · Pagamentos |
| 9 | `Slide09DemoColaboradores.tsx` | Fluxo · Colaboradores | Card · Tabela · Mapa |
| 10 | `Slide10DemoDispositivos.tsx` | Fluxo · Dispositivos | Mapa · Tabela · Instalação · Lote |
| 11 | `Slide11DemoColeta.tsx` | Fluxo · Coleta em campo | Módulo novo — **a confirmar com o time** |
| 12 | `Slide12DemoPagamentos.tsx` | Fluxo · Pagamentos | Individual · Lote · Exportar |
| 13 | `Slide13DemoAlertas.tsx` | Fluxo · Alertas | Lista · Detalhe · Resolver (beta) |
| 14 | `Slide14DemoGestores.tsx` | Fluxo · Dashboards | KPIs · Metas × realizado · Comparação de frota |
| 15 | `Slide15ProximosPassos.tsx` | Próximos passos | 7 frentes em 3 colunas, cada coluna rotulada pela dor que ataca |
| 16 | `Slide16Perguntas.tsx` | Perguntas | "Obrigado." + "Perguntas?" + contato |

Shared data (perfis CASL, módulos, ciclo de vida do device) lives in `src/data/fleets.ts` — used by both Fleets decks. O vocabulário fica em `src/data/glossario.ts`, compartilhado com a página do celular (ver "Glossário no celular da plateia").

## Content language

All user-facing copy is in Brazilian Portuguese.
