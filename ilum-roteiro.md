# Ilum — roteiro de trabalho

Quatro slides, sem capa adicional. Navegação por setas, etapas e controle remoto herdados do apresentador. Ilum é o deck padrão; `?deck=informs` e os decks Fleets continuam disponíveis.

1. Arquitetura atual — **sete etapas sobre o mesmo desenho, que nunca se reposiciona**:
   1. *Desenho*: o diagrama se monta sozinho (zonas → caixas → conexões → faixa de identidade). Falar enquanto monta: estes são os ambientes, as aplicações, os bancos e os caminhos relatados. Deixar claro que é esquemático, não um inventário validado.
   2–6. Um problema por etapa — ingestão, armazenamento em dois ambientes, carga sobre a base central, aplicações e identidade, integração do LLM. **As marcas se acumulam**: cada problema ganha um número (01…05) fixado nas caixas e nas conexões envolvidas, e o anterior continua aceso. Na coluna da direita a lista cresce; só o problema da etapa corrente mostra a descrição.
   7. *Quadro completo*: os cinco problemas marcados ao mesmo tempo sobre o desenho, e só então as consequências — sustentação complexa, dependência de conhecimento localizado, dificuldade de controlar acessos/mudanças/carga, integrações específicas e custo de operação.

   Cuidados de fala: o problema de identidade é a **ausência de padrão comum** para acoplar produtos às plataformas — não afirmar acesso desprotegido nem dados expostos. Compartilhar banco não é, por si só, defeito. Os R$ 150 mil/ano de Oracle são custo informado, não economia garantida.
2. Novo Fluxo (em execução) — **sete passos sobre o fluxograma** de `src/assets/fluxo-novo.svg`. Desenho à esquerda, pilha de camadas à direita, igual ao slide 1: acende e permanece aceso.
   0. O desenho se monta e a coluna fica **vazia** — nada concorre com o diagrama enquanto você abre a fala.
   1. *Gestão de frota*: o Fleets cuida do contrato de campo, dos veículos e dos colaboradores.
   2. *Ilum*: ingere o dado, relaciona ao contrato e envia para o processamento. As fontes (GeoBox, Jetson, GeoLux, N100, WFM, 156) acendem junto, porque é delas que ele ingere.
   3. *Processamento*: o Vision devolve o dado processado.
   4. *Banco Yoda*: o Ilum salva o dado no Yoda.
   5. *Projetos*: o Ilum encaminha os dados para os seus respectivos projetos.
   6. *Padronização*: a caixa dos padrões compartilhados — back-end, front-end, banco de dados, autenticação e comunicação entre camadas.

   Cada camada traz um ganho esperado no selo — são **esperados, não medidos**. Equipe e produtos do projeto estão no desenho como exemplo.

3. Cronograma macro — **etapa única**, tudo entra de uma vez quando a câmera chega: a linha do tempo varre da esquerda para a direita, as bolinhas marcam o centro de cada fase e os quatro cartões sobem em seguida.

   | Fase | Situação | O que é |
   |---|---|---|
   | Inventário | **Já está feito** | Rotinas, dependências e riscos levantados |
   | Fundação | **Em execução** | Padrões de dados, integração e desenvolvimento |
   | **POC** | A seguir | A base validada em uma plataforma real: Uberlândia |
   | Equalização | A seguir | Time alinhado aos padrões |
   | Rollout | A seguir | Adoção pelas equipes dos projetos |

   O cartão da **POC** pulsa — é o marco que a fala defende. O halo é `box-shadow`, que não ocupa espaço, então o cartão não empurra os vizinhos a cada batida.

   Fecha com o disclaimer — *produtos e contratos continuam sendo atendidos durante a implementação* — e a linha de **Coordenação: Fortes · Godoy · Lima · Bega**, centralizada. É quem coordena a iniciativa, não o organograma: esse é do Angelo. Saíram o step "Equipes", a régua de início/término "a definir" e as notas de POC e rollout — o cronograma diz isso sozinho. A ressalva de datas ficou no rodapé.

4. Dificuldades, riscos e limites: discutir inventário, capacidade e adoção; confirmar mitigação e escopo de hardware e backup. Atribuições de pessoas e entrada de demandas são definidas pelo organograma de Angelo. O slide apenas explicita responsabilidades necessárias.

Fonte da implementação: branch informs, apresentação mais recente no repositório local.

## Onde mexer

O deck segue a estrutura dos outros do repositório: um arquivo por slide, montados em `deck.ts`.

| Arquivo | Papel |
|---|---|
| `src/slides/ilum/deck.ts` | Monta o deck: ordem dos slides e rótulos da nav |
| `src/slides/ilum/Slide00ArquiteturaAtual.tsx` | Diagrama atual, os 5 problemas e as consequências |
| `src/slides/ilum/Slide01EstruturaProposta.tsx` | Fluxograma das camadas, com os ganhos por etapa |
| `src/slides/ilum/Slide02Planejamento.tsx` | Cronograma macro: linha do tempo e as 4 fases |
| `src/slides/ilum/Slide03RiscosLimites.tsx` | Dificuldades, riscos, limites e responsabilidades |
| `src/slides/ilum/ui.tsx` | `Frame` (título + corpo + nota) e o helper `delay` |
| `src/slides/ilum/logos.ts` | Logos embutidos do diagrama do slide 1 |
| `src/assets/fluxo-novo.svg` | O fluxograma do slide 2, export do Figma |
| `src/index.css` | `@theme` do deck: a fonte e os keyframes de entrada (o que utility não expressa) |

Cada slide exporta suas próprias etapas em `ACTIONS`, e o `deck.ts` lê de lá — acrescentar um problema ou uma fase já atualiza a navegação sozinho, sem editar dois lugares.

O deck é escrito em **utilities do Tailwind inline**, como o resto do repositório; não há arquivo CSS próprio. Duas regras ao editar:

- **Não empilhe utilities da mesma propriedade.** `fill-[#faf7ff]` junto de `fill-[#f3ebff]` deixa o vencedor por conta da ordem na folha gerada. Escolha a classe por condição (é o que `caixa`, `traco` e `faixaIdentidade` fazem no slide 1).
- **Pinte a borda do lado certo.** `border-[cor]` pinta os quatro lados; para um filete só, use `border-t-[cor]` / `border-l-[cor]`.

## Logos no diagrama (slide 1)

As caixas de tecnologia usam o logo da marca no lugar do nome, em `src/slides/ilum/logos.ts` — SVGs embutidos, sem dependência de pacote de ícones nem de rede. Regra usada:

- **Oracle** e **Supabase**: o logo é a marca escrita, então substitui o nome. Sobra só o qualificador (`LLM` no Supabase).
- **PostgreSQL**, **S3**, **Node-RED** e **MinIO**: o logo é um símbolo, então vem acompanhado do texto que identifica o papel da caixa (`Yoda`, `S3`, `triggers`, `MinIO`).

Para trocar ou redimensionar, mexa em `logo` / `logoH` no array `NODES` de `Slide00ArquiteturaAtual.tsx`; a largura sai sozinha do `aspect` do logo.

## Animar o fluxograma (slide 2)

O export do Figma é **plano**: sem grupos, sem ids, texto virado path — 118 elementos soltos. Em vez de anotar o arquivo à mão (que reexportar apagaria), `Slide01EstruturaProposta.tsx` **classifica por geometria** em tempo de execução: cartão é `rect` com `stroke` maior que 100x35 (os chips têm 26 de altura e ficam de fora), cada elemento pertence ao cartão que contém o seu centro, e do que sobra `line` é divisória, path roxo é rótulo e path escuro é conector. Reexportar o SVG não quebra a animação; só `ordemDoCartao` depende do layout.

Três armadilhas que já custaram caro aqui:

- **O SVG é injetado à mão** (`host.innerHTML`), não por `dangerouslySetInnerHTML`. O React recriava aquele conteúdo e a classificação passava a guardar nós fora do documento — o realce ia para elementos órfãos e nada aparecia na tela.
- **Nada de `gsap.context().revert()`.** O revert desfazia também o realce da etapa, porque ele pinta elementos que a entrada animou. Use `tl.kill()`.
- **`const m = gsap.set` perde o `this`** e lança. Chame sempre como método.
- **`overwrite: 'auto'` nos tweens de etapa.** A varredura de abertura dura mais que o fechamento; sem overwrite, navegando rápido um tween de abertura ainda em curso termina depois do fechamento e reabre a seta.
- **A classificação limpa o que a passagem anterior criou.** Ela roda mais de uma vez, e sem a limpeza as setas duplicam — pior, na segunda passagem as cópias roxas entram na conta como rótulos de coluna, porque a regra de rótulo é "path roxo solto".

As setas do Figma são formas **preenchidas** (o contorno da flecha), não traços, então `stroke-dashoffset` não desenha elas. A saída foi duplicar o conector, pintar a cópia de roxo e revelá-la por um `clipPath` que varre no sentido do fluxo.

- **Zere o `fill-opacity` da cópia.** Os conectores vêm com `fill-opacity="0.14"` — é o cinza claro do desenho. O `cloneNode` herda esse atributo, e sem zerá-lo o roxo é pintado a 14% e quase não aparece. Trocar a cor não basta.

A entrada tem uma rede de segurança: `requestAnimationFrame` congela em aba oculta, então um `setTimeout` de 4s força o fim da timeline. Sem isso, chegar no slide com a janela atrás de outra deixa o desenho parado em invisível.
