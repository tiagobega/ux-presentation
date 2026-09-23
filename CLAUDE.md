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

**Decks** — a deck is `{ id, brand, title, slides, config }` (type in `src/slides/config.ts`), declared in `<deck>/deck.ts`. `src/slides/decks.ts` picks the active one: **ILUM · diretoria** by default, `?deck=front`, `?deck=ilum`, `?deck=informs`, `?deck=fleets-demo` and `?deck=fleets` for the others. `Presentation.tsx` and `Nav.tsx` read `SLIDES` / `SLIDE_CONFIG` / `DECK` from there and know nothing about which deck is loaded. `config.ts` deliberately imports no deck — the slides import `SLIDE_PADDING` from it, so importing a deck back would close a cycle.

**Adding a slide** — create `src/slides/<deck>/SlideNN.tsx`, import it in `<deck>/deck.ts`, append to `slides`, and add the matching entry (label + actions) to `config` at the same index (Nav labels and the dot nav derive from it). Each slide applies `SLIDE_PADDING` (from `../config`) on its own root for the standard padding; omit it for a full-bleed slide. `src/slides/kit.tsx` holds the vocabulary shared by every deck (`SlideShell`, `SlideHeader`, `Punch`, `Bar`, `Chip`, `Accent`, `FlowSteps`, `Reveal`, the `up()` motion helper and the easings) — prefer it over re-declaring the same boilerplate. `src/slides/fleets/kit.tsx` is just a re-export of it. The demo deck has its own `src/slides/fleets-demo/kit.tsx` with the extra `LiveBadge` and `DemoSlide`, and Informs has `src/slides/informs/ui.tsx` with the phone mockups.

**Mecânica pergunta → resposta** — usada nos slides de abertura e de conclusão de um bloco (`Slide01PorQueExiste`, `Slide03Consequencias`): o título entra grande sozinho (a pergunta), recua com `scale` quando a resposta aparece, e depois uma faixa de cards abre por `max-height` (`Reveal` com `fade={false}`) com um item por step — a fala apresenta um de cada vez. Os itens da conclusão espelham, na mesma ordem, os da abertura.

**Cards that fill a row** — a `flex-1 min-h-0 grid` stretches its cards to the full row height, which leaves dead space inside them. Wrap the grid in `flex-1 min-h-0 flex items-center` and give the inner `grid` a plain `w-full`: cards then hug their content, stay equal-height (grid stretch) and sit centered in the free area.

**CSS** — Tailwind v4 utility classes written inline in the components. `src/index.css` only holds the `@theme` tokens (`--color-text`, `--color-purple`, mono font) plus the keyframes and pseudo-element effects that utilities can't express (nebula background, layer glows, entrance animations). No CSS modules.

## Slide maps

Seven decks live in this repo. **ILUM · diretoria** (`src/slides/diretoria/`) is the active one; **Front-end** (`src/slides/front/`, rascunho anterior do mesmo assunto), **Ilum** (`src/slides/ilum/`), **Informs** (`src/slides/informs/`), **Fleets · demo ao vivo** (`src/slides/fleets-demo/`) and the self-contained **Fleets** deck (`src/slides/fleets/`) are one URL param away; the **Branding & UX** deck (`src/slides/Slide00`–`Slide12`) stays as reference and renders nowhere until wrapped in a `deck.ts` and registered in `decks.ts`.

### ILUM · diretoria — 5 slides (`src/slides/diretoria/`)

A apresentação para a diretoria. **A fonte é [`plano-ilum-diretoria.md`](plano-ilum-diretoria.md)**: a seção "Revisão de 22/09" descreve o deck atual, e as seções seguintes guardam a versão anterior, de treze slides, como reserva de fala e de ressalvas. [`briefing-ilum-diretoria.md`](briefing-ilum-diretoria.md) guarda a plateia, o objetivo e as pendências. Não há roteiro separado — o plano é o roteiro.

Order is governed by `DIRETORIA_DECK` in `src/slides/diretoria/deck.ts`.

| # | File | Label | Tema |
|---|------|-------|------|
| 1 | `Slide01Arquitetura.tsx` | Arquitetura | Tudo dentro do `fluxo-novo.svg`: o cartão desliza, a câmera fecha e um conceito entra por etapa (plataforma → features → produto) |
| 2 | `Slide02CidadeX.tsx` | Cidade X | Composição por prompt: digitação, clique, montagem e a aplicação preenchida |
| 3 | `Slide03ComoFazer.tsx` | Como fazer | As frentes separadas em interno e produto |
| 4 | `Slide04Cronograma.tsx` | Cronograma | Cinco marcos numa linha do tempo, com data e descrição |
| 5 | `Slide05EntregasParalelas.tsx` | Em paralelo | Matriz frente × item: seis frentes, doze itens, um status por item |

**Critério editorial** — na tela entram títulos, termos, dados e status; a explicação longa é a fala. Por isso o `Frame` de `src/slides/diretoria/ui.tsx` **não tem rodapé de nota**, ao contrário do `Frame` do deck Ilum. As definições curtas do slide 1 são a exceção combinada: são vocabulário, e sem elas a diretoria não acompanha o resto.

**O slide 1 é um desenho só, nunca uma réplica** — os três passos acontecem dentro do `fluxo-novo.svg`: o cartão do projeto que desliza é o do próprio desenho, e o fade fica só no que sai de foco. A versão anterior trocava o SVG por um cartão em HTML no passo 2 e o corte aparecia, dois desenhos parecidos cruzando em fade.

Isso exige classificar o SVG por geometria em tempo de execução, porque o export do Figma é plano (sem grupos, sem ids, texto virado path). As regras de `classificar()` sobrevivem a um reexport; só as coordenadas de destino dependem do layout:

- **cartão do projeto** = o único `rect` com contorno mais alto que 300;
- **pastilhas** = `rect` com `fill="#9C59F9"`, levando junto o contorno e o texto que caem dentro delas — e **só o que cabe dentro delas** (`cabeEm`). Olhar só o centro não basta: o centro do cartão do projeto (911, 432) cai dentro da terceira pastilha da equipe, e a peça "Bio" saía voando com o cartão inteiro embarcado. O furo só apareceu quando o bloco da equipe passou a voar, porque nenhuma pastilha dos outros blocos passa pela altura do centro do cartão;
- **blocos** = os rótulos roxos (`fill="#7C3AED"`) separam serviços, equipe e produtos: uma pastilha pertence ao último rótulo acima dela. É mais robusto que contar posições, que quebraria se um item fosse acrescentado ao cartão. Os três blocos voam; **o título do projeto não** — repetido dentro da plataforma, ele só ocupava a linha mais cara do quadro para dizer o que o cartão apagado à esquerda já diz.

**Uma classificação por montagem** — `classificado` é uma trava de `useRef`. Sem ela o StrictMode classificava duas vezes, gerava dois objetos `Desenho` e o efeito de entrada (dep `[desenho]`) disparava uma vez para cada: o desenho aparecia, o `clearProps` da limpeza o jogava de volta à opacidade cheia e ele entrava de novo. Lia como animação duplicada começando clara. A trava só fecha depois de uma classificação bem-sucedida, então as tentativas por quadro continuam funcionando.

Para medir isso não sirva contar opacidade por índice de `querySelectorAll`: a classificação reagrupa os elementos e o índice passa a apontar para outro nó, o que inventa "reinícios" que não existem. Conte a **população** de elementos com `style.opacity` inline (zerados / animando / cheios) — num passe único ela é monotônica.

**A entrada acende elemento por elemento, varrendo da esquerda para a direita** — e duas regras mantêm isso estável:

- **`aplicarFase` anima grupos, a entrada anima folhas.** Por isso `Desenho.fora` é um `<g>`, não a lista de elementos: as opacidades de grupo e de folha se multiplicam em SVG, então cada animação escreve na sua própria propriedade e nenhuma precisa de `overwrite`. Enquanto `fora` era a lista, os dois tweens escreviam na mesma propriedade dos mesmos nós, se matavam no meio e o desenho piscava. A primeira `aplicarFase` também é instantânea (`jaAplicou`): na montagem não há transição a fazer.
- **Cada folha acende até a opacidade que tem no arquivo, nunca até 1.** As sete linhas tracejadas do fluxo nascem com `opacity="0.12"` no export; levá-las a 1 e devolver o valor do arquivo no `clearProps` fazia cair de 1 para 0.12 num quadro só, no fim da entrada. O alvo é lido por elemento (`clearProps` antes de medir, para ler o valor do arquivo e não o parcial de um tween morto).

O detector que fecha esses casos conta **inversões de direção de opacidade por elemento** (subiu, desceu, subiu): 78 antes do grupo, 7 com o alvo fixo em 1, 0 agora.

**Duas limpezas diferentes, e confundi-las quebra tudo** — o StrictMode roda a classificação duas vezes. `data-arq` marca grupos de elementos **do desenho** e é desembrulhado (os elementos voltam a ser filhos do `svg`); `data-arq-extra` marca o que foi **criado** ali (os fantasmas e os textos dos termos) e é removido inteiro. Desembrulhar um fantasma devolve os clones ao `svg`, e na passagem seguinte eles entram na conta como pastilhas: o número de peças deixa de bater com o de destinos e a classificação aborta em silêncio.

**A câmera é o `viewBox`** — a partir do passo 2 ele fecha na área do cartão e dos termos, o que amplia o desenho em ~40% sem mexer em nada dentro dele. Para isso o SVG precisa de `w-full h-full` no CSS, **não** `max-w/max-h`: com a largura intrínseca do arquivo (1087) a caixa do elemento mantém a proporção antiga e limita o zoom a 10%.

**Peças movem por `x`/`y` do grupo, nunca por escala** — os destinos respeitam a largura original de cada pastilha (por isso os cinco produtos param em duas colunas, não numa fileira). Reescalar distorceria o texto, que no export é path.

**Palco de tamanho fixo (slide 2)** — `Slide02CidadeX.tsx` desenha num palco de 1180×520 escalado por `ResizeObserver`. Origem e destino das peças são coordenadas escritas no código, sem medir nada do DOM. A armadilha já paga: `Lugar` guarda `x/y/w/h` e `caixa()` converte para `left/top/width/height` — espalhar `{x,y,w,h}` direto no `style` não posiciona nada, porque CSS ignora essas chaves, e todas as peças empilham no canto.

**A cadeia do slide 2** — o clique simulado dispara a montagem sozinho (plataforma, depois os módulos voando). Um clique que não causa nada lê como animação quebrada, que foi o defeito da primeira versão. Sobra um único avanço manual, o que preenche a aplicação: o apresentador nunca aperta seta sem que algo mude na tela. A digitação conta por **tempo decorrido** em `requestAnimationFrame`, não um caractere por tique de `setInterval` — cada caractere provoca um render do palco inteiro, e com intervalo fixo o tique atrasava e a frase levava o dobro do previsto.

**O enquadramento é uma forma, e entra um conceito por vez** — no slide 1 a relação está no desenho: a **plataforma** é a caixa sólida com as stacks dentro, as **features da plataforma** ficam *dentro* dela, e o **produto** é outra camada *fora*, ligada por uma seta que sobe. Dentro/fora é a informação, e não depende de ninguém ler o rótulo; com três rótulos empilhados, os dois de baixo tinham o mesmo peso visual e a diferença ficava por conta da frase.

As features **não têm caixa própria**: uma caixa dentro da caixa dava três bordas empilhadas na mesma região, e a de dentro competia com a da plataforma. O que separa os dois é uma divisória fina — hierarquia sem moldura.

**A segregação do time é a informação que fecha o quadro** — *dentro* da plataforma há três nomes (Eduardo, Curci, Bio), que entram na etapa das features porque é por elas que respondem; *fora* há um time por produto. Por isso os rótulos são um par ("TIME DA PLATAFORMA" / "TIMES PRÓPRIOS POR PRODUTO"), e o segundo é genérico de propósito: são cinco produtos na tela, e nomear o time de um mentiria sobre os outros quatro.

Features e time ficam **lado a lado**, partidos por uma divisória vertical em `MEIO`, e não empilhados: assim a divisória diz "isto é feito por aquilo" numa olhada. A coluna da direita é dimensionada pela pastilha, que tem 284 fixos e não pode ser reescalada; a da esquerda fica com 270, e por isso a descrição das features é escrita em **duas linhas explícitas** — `<text>` em SVG não reflui, e a frase inteira pediria 420.

O passo do zoom (`O projeto`) deixa a direita **vazia** de propósito: mostrar a estrutura inteira ali dava um quadro cheio de caixas sem conteúdo, e a fala não tinha onde começar. Cada conceito entra depois com a sua frase, e as peças do cartão pousam nele — `DESTINOS` guarda a etapa de cada peça junto da coordenada.

**Ressalva de vocabulário** — no `fluxo-novo.svg` as pastilhas Banco · Front-end · Back-end estão sob "SERVIÇOS DEDICADOS", mas o deck as apresenta como **stacks da plataforma**. O rótulo do SVG precisa ser atualizado no Figma; até lá, os dois divergem.

**Dois remendos do desenho que o Figma ainda não tem** — `prepararDesenho()` roda uma vez, antes da classificação: o cartão "WFM" vira **Dados de terceiros**, o "156" sai (junto com a metade da seta combinada que apontava para ele), e entram **IRI, LUX e "…"**, tracejados, no pé da coluna do Vision, com a base alinhada em 642 — a mesma linha em que termina o cartão do projeto. Só o Vision fica no alto: o vão entre ele e os três é a informação, o que está em produção está no fluxo e o que ainda não existe espera embaixo. O mesmo par de correções vive no slide 1 do deck Ilum (`src/slides/ilum/Slide01EstruturaProposta.tsx`) — enquanto o arquivo do Figma não for atualizado, os dois decks aplicam em tempo de execução, e mexer num pede conferir o outro.

O que é criado ali leva **`data-arq-fixo`**, nunca `data-arq-extra`: o `extra` é apagado a cada classificação (é o que o StrictMode exige para os fantasmas) e levaria os cartões junto. `classificar()` tira os `fixo` de `filhos`, senão o número de peças deixaria de bater com o de destinos e a classificação abortaria em silêncio; devolve-os ao `fora`, que é quem apaga quando a câmera fecha, e a `folhas`, para acenderem com o resto na entrada.

**Em SVG não há `z-index`** — quem pinta por último fica por cima. A estrutura é criada depois do cartão, então o cartão é reanexado ao fim (`svg.appendChild(cartao)`): sem isso o preenchimento da caixa da plataforma esconde as peças que pousam dentro dela, e só os produtos, que param fora, aparecem.

O slide 3 usa esse mesmo vocabulário para separar **interno** de **produto**: sem a separação, design system e Lens apareciam com o mesmo peso, e a diretoria não tinha como saber o que dali vira oferta.

**Data derivada nunca se apresenta como compromisso** — no cronograma só 15/10 e FEV/27 vieram do usuário; as outras três janelas são derivadas da ordem dos marcos entre esses dois âncoras, e o rodapé do slide diz isso na tela. No slide 5, só dois dos doze itens têm data informada (25/09); os outros exibem só o status, nunca uma data inventada. O rodapé que datava o levantamento saiu por decisão do apresentador — a data do levantamento passa a ser fala, não tela. Status envelhece entre a escrita e a reunião; datar o levantamento é o que permite mostrá-lo sem que vire promessa. Ao acrescentar marco ou frente, mantenha a regra: dado do usuário em destaque, derivado rotulado, desconhecido explícito.

**A matriz do slide 5 lê pela cor, não pelo texto** — cada item carrega o seu próprio selo, e o `Situacao` do `ui.tsx` vira escala de proximidade da entrega: sólido = homologação, contorno = em andamento, apagado = planejamento ou bloqueado. É o que permite varrer as seis frentes sem ler uma palavra. A grade é `items-start`: as frentes têm de um a quatro itens, e com o esticão padrão do grid a linha inteira ganhava a altura do Informs, deixando o cartão do Comgás com 250px de vazio embaixo.

**Regra de layout do deck** — nada entra empurrando o vizinho. O que aparece numa etapa posterior já está no DOM desde o primeiro quadro, só apagado.

### Front-end — 7 slides (`src/slides/front/`)

Rascunho anterior, mantido como referência e fora do deck padrão: o recorte de front-end e da conversa com o back-end do planejamento de produto e tecnologia. Order is governed by `FRONT_DECK` in `src/slides/front/deck.ts`. Full script and speaker notes: [`front-roteiro.md`](front-roteiro.md).

| # | File | Label | Título / tema |
|---|------|-------|---------------|
| 0 | `Slide00Vocabulario.tsx` | Três palavras | Pilha plataforma / produto / serviço, acendendo de baixo para cima |
| 1 | `Slide01BaseComum.tsx` | O custo de hoje | "Hoje" e "com a base comum" lado a lado; os mesmos fundamentos três vezes vs. uma |
| 2 | `Slide02Composicao.tsx` | Como se monta | Registry → shell → três serviços com tema de cliente |
| 3 | `Slide03Integracao.tsx` | Front e back | Cinco conversas (sessão, dados, tempo real, offline, observabilidade) em três faixas |
| 4 | `Slide04Contratos.tsx` | A fronteira | O que a plataforma garante vs. o que o produto decide |
| 5 | `Slide05Entregaveis.tsx` | Entregáveis | Nove entregáveis acendendo por situação |
| 6 | `Slide06Etapas.tsx` | Duas etapas | Fundação (até o fim de 2026) e Escala (jan — fev 2027) |

`src/slides/front/ui.tsx` reexporta o `Frame` e o `delay` do deck Ilum — é a continuação daquela conversa, e duas molduras divergiriam com o tempo — e acrescenta o `Selo` de situação, o `Chip` e o `Rotulo`. As animações de entrada também são as do Ilum (`animate-ilum-*`).

Dois slides são diagramas em SVG montados por dados (`Slide02` e `Slide03`): cada caixa e cada seta declara em que etapas acende, e a legenda embaixo usa `key={action}` para a animação de entrada rodar de novo a cada troca. As pontas de seta são elementos comuns, não `marker` — marcador ignora o `stroke-dashoffset` que desenha a linha, e as pontas apareceriam todas no primeiro quadro.

**Regra de layout do deck** — nada entra empurrando o vizinho. O que aparece numa etapa posterior (a faixa da regra, o painel "com a base comum", os cartões ainda não acesos) já está no DOM desde o primeiro quadro, só apagado.

### Ilum — 4 slides (`src/slides/ilum/`)

Apresentação administrativa de arquitetura, sem capa. Order is governed by `ILUM_DECK` in `src/slides/ilum/deck.ts`. Full script and speaker notes: [`ilum-roteiro.md`](ilum-roteiro.md).

| # | File | Label | Título / tema |
|---|------|-------|---------------|
| 0 | `Slide00ArquiteturaAtual.tsx` | Estrutura atual | Diagrama atual, os 5 problemas acumulando marcas e as consequências |
| 1 | `Slide01EstruturaProposta.tsx` | Novo Fluxo | Fluxograma das camadas (`src/assets/fluxo-novo.svg`), com os ganhos por etapa |
| 2 | `Slide02Planejamento.tsx` | Cronograma macro | Linha do tempo e as 5 fases |
| 3 | `Slide03RiscosLimites.tsx` | Riscos e limites | Dificuldades, riscos, limites e responsabilidades |

### Informs — 21 slides (`src/slides/informs/`)

Order is governed by `INFORMS_DECK` in `src/slides/informs/deck.ts`. Full script and speaker notes: [`informs-roteiro.md`](informs-roteiro.md).

| # | File | Label | Title / theme |
|---|------|-------|---------------|
| 0 | `Slide00Capa.tsx` | Capa | O nome como elemento principal, com a tagline "do template ao envio" |
| 1 | `Slide01PorQueExiste.tsx` | Por que existe | Pergunta → resposta (a cena do moto-verificador) → uma dor por step (4 dores) |
| 2 | `Slide02Arquitetura.tsx` | Arquitetura | Sistema de origem ↔ Informs ↔ Moto-verificador, um step só |
| 3 | `Slide03Consequencias.tsx` | Consequências | Pergunta → resposta → um ganho por step, espelhando as 4 dores do slide 1; fecha com a frase "o que se pergunta e como se preenche são coisas separadas" |
| 4 | `Slide04Anatomia.tsx` | Anatomia | Full-bleed: só o título centralizado e o mockup `src/assets/form-anatomy.svg`, revelado por `clipPath` de cima para baixo; um step só |
| 5 | `Slide05Campos.tsx` | Tipos de campo | Os 10 campos de coleta e os 4 informativos |
| 6 | `Slide06Autenticacao.tsx` | Autenticação | Gates (Cognito + PKCE), WebView embutida, perfil carregado no login |
| 7 | `Slide07Listagem.tsx` | Listagem | Abas por status com contador, busca e filtro, prioridades |
| 8 | `Slide08Status.tsx` | Status | Os 5 status na linha do tempo; step 2 isola "Completo e não enviado" |
| 9 | `Slide09Preencher.tsx` | Preenchimento | Sessão a sessão, validação na hora, autosave do rascunho |
| 10 | `Slide10Duplicacao.tsx` | Duplicação | Uma sessão duplicável virando N instâncias independentes |
| 11 | `Slide11Cancelamento.tsx` | Cancelamento | Justificativas e o que cada motivo exige (texto/foto) |
| 12 | `Slide12Offline.tsx` | Offline-first | Fila de mutations persistida; step 2 mostra a sincronização |
| 13 | `Slide13Roteirizacao.tsx` | Roteirização | Modos da rota e maquete de mapa com paradas ordenadas |
| 14 | `Slide14Rastreio.tsx` | Rastreio | WebSocket, GPS em background, buffer offline, permissão INSPECTOR |
| 15 | `Slide15Template.tsx` | Template | O molde: nome, sistema de origem, ativo, sessões |
| 16 | `Slide16Formulario.tsx` | Formulário | O template ganha localização, prioridade, prazo e verificador |
| 17 | `Slide17CriarEmCampo.tsx` | Criar em campo | O outro caminho: o verificador gera o formulário na rua |
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
