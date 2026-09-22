# Front-end e back-end — roteiro

Sete slides, sem capa. O recorte de front-end e da conversa com o back-end do planejamento de
produto e tecnologia. Front-end é o deck padrão; `?deck=ilum`, `?deck=informs` e os decks Fleets
continuam disponíveis.

O arco: as três palavras → o custo de reconstruir o básico → como um serviço se monta → como o
front conversa com o back → onde fica a fronteira → o que está sendo entregue → em que ordem.

---

1. **Plataforma, produto e serviço** — quatro etapas sobre a mesma pilha, que nunca se
   reposiciona. Uma camada acende por etapa, de baixo para cima, e as anteriores continuam acesas.
   1. *Plataforma*: a base da aplicação, onde acoplamos módulos e serviços. Micro front-ends,
      Design System, autenticação.
   2. *Produto*: módulos construídos a partir da necessidade de um usuário, usáveis em qualquer
      plataforma. Query, Informs, Gates, Obras / Planejamento.
   3. *Serviço*: nossas aplicações específicas para cidades e clientes. Uberlândia, SABESP, Recape.
   4. *Como se combinam*: as ligações acendem e entra a regra — natureza diferente, custo e preço
      diferentes.

   Cuidado de fala: hoje chamamos tudo de produto. Sem as três palavras não existe catálogo.

2. **Cada serviço reconstrói o mesmo front-end** — duas etapas, dois painéis lado a lado desde o
   primeiro quadro.
   1. *Hoje*: três serviços, e os mesmos seis fundamentos aparecendo três vezes.
   2. *Com a base comum*: o segundo painel acende. Os três serviços ficam só com o diferencial e os
      fundamentos aparecem uma vez, embaixo.

   O desenho é o argumento — não vale gastar fala explicando a duplicação, ela está na tela.

3. **Como um serviço se monta** — quatro etapas sobre um desenho só. Registry à esquerda, shell no
   centro, serviços entregues à direita. A legenda embaixo troca a cada etapa.
   1. *Shell*: a aplicação que o usuário abre. Resolve a rota, carrega o que precisa, guarda a sessão.
   2. *Registry*: cada produto publicado versionado. É de lá que o shell sabe o que existe.
   3. *Módulos*: carregados em tempo de execução. Subir versão do produto não exige reconstruir o
      serviço.
   4. *Tema por cliente*: os mesmos módulos viram três serviços. Muda a composição, o tema e a
      configuração, não o código.

4. **Como o front conversa com o back** — cinco etapas, uma conversa por linha, três faixas
   (navegador, contrato compartilhado, back-end). Cada etapa acende a linha inteira.

   | Etapa | Navegador | Contrato | Back-end |
   |---|---|---|---|
   | Sessão | Shell | Gates (Cognito · PKCE) | Usuários e permissões |
   | Dados | Módulos | Cliente de dados | APIs por produto |
   | Tempo real | Acompanhamento | Canal aberto (WebSocket) | Ilum |
   | Offline | Fila local | Sincronização | APIs por produto |
   | Observabilidade | Uso e erro | Coletor | Métricas e logs |

   As setas do *tempo real* apontam ao contrário de propósito: ali quem começa a conversa é o
   back-end. Vale chamar atenção para isso na fala.

5. **O que a plataforma garante e o que o produto decide** — três etapas: a coluna da esquerda, a
   da direita e a regra. Responde a pergunta que o desenho anterior levanta: se todo módulo sobe no
   mesmo shell, o que ele é obrigado a seguir e o que continua sendo decisão de quem constrói.

6. **Entregáveis** — três etapas, uma por situação, acendendo acumulado: o que já existe, o que
   está em execução, o que vem a seguir. A grade é a mesma nas três.

   | Entregável | Situação |
   |---|---|
   | Informs · Bibliotecas do Gates | Entregue |
   | Arquitetura de front-end · Design System · Obras / Planejamento · Fleets | Em execução |
   | Gates para Segurança e Infra | Em transição |
   | Observabilidade no front · Demonstração e catálogo | A seguir |

   A data de 27 de novembro é a prevista no plano de arquitetura de front-end. As demais não têm
   data fechada e o rodapé diz isso.

7. **Duas etapas** — Fundação (até o fim de 2026) e Escala (jan — fev 2027), uma etapa por painel.
   Fecha com a ressalva: produtos e contratos continuam sendo atendidos durante a implementação.

## Onde mexer

| Arquivo | Papel |
|---|---|
| `src/slides/front/deck.ts` | Monta o deck: ordem dos slides e rótulos da nav |
| `src/slides/front/Slide00Vocabulario.tsx` | A pilha plataforma / produto / serviço |
| `src/slides/front/Slide01BaseComum.tsx` | Hoje vs. com a base comum |
| `src/slides/front/Slide02Composicao.tsx` | Registry → shell → serviços |
| `src/slides/front/Slide03Integracao.tsx` | As cinco conversas com o back-end |
| `src/slides/front/Slide04Contratos.tsx` | A fronteira entre plataforma e produto |
| `src/slides/front/Slide05Entregaveis.tsx` | Os nove entregáveis e suas situações |
| `src/slides/front/Slide06Etapas.tsx` | Fundação e Escala |
| `src/slides/front/ui.tsx` | `Selo`, `Chip`, `Rotulo` e o reexport do `Frame` / `delay` do Ilum |

Cada slide exporta suas próprias etapas em `ACTIONS`, e o `deck.ts` lê de lá — acrescentar um
entregável ou uma conversa já atualiza a navegação sozinho, sem editar dois lugares.

Duas regras ao editar, herdadas do deck Ilum:

- **Não empilhe utilities da mesma propriedade.** Duas classes `bg-*` de condições diferentes
  deixam o vencedor por conta da ordem na folha gerada. Escolha a classe por condição.
- **Pinte a borda do lado certo.** `border-[cor]` pinta os quatro lados; para um filete só, use
  `border-t-[cor]`.

E uma própria:

- **Nada entra empurrando o vizinho.** O que aparece numa etapa posterior já está no DOM desde o
  primeiro quadro, só apagado — senão o slide inteiro se reposiciona no meio da fala.
