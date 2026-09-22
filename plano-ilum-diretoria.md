# ILUM — plano executivo e roteiro

> **Plateia:** diretoria da Intelicity.
> **Objetivo:** informar — formalizar a direção de front-end, os marcos e a incorporação de produtos no ILUM.
> **Tempo:** sem restrição · 15 slides principais e um anexo.
> **Formato:** somente slides.

## Critérios editoriais

“Na tela” contém apenas títulos, termos, dados e status. Sem punchlines, subtítulos explicativos ou descrições nos cartões. As explicações ficam em “Fala”; “Montagem” orienta a composição visual. Notas e referências são apoio do apresentador.

O plano distingue fatos informados pelo usuário, escopo registrado no Linear e propostas para a execução. Não atribui conclusão a tarefas apenas planejadas. Produto já entregue não significa produto já integrado à nova plataforma.

Datas: 15/10/2026 é o marco informado, com ano inferido do contexto. A janela posterior de seis meses leva a abril de 2027. Os blocos mensais abaixo são proposta de organização; datas individuais e quantidade de produtos não foram confirmadas.

Vocabulário de trabalho: plataforma = aplicação que reúne e configura módulos; produto = capacidade reutilizável; serviço específico = extensão para uma plataforma ou cliente. Essa definição segue o registro mais recente do Linear e substitui, neste rascunho, a definição antiga de serviço como aplicação inteira entregue ao cliente. Validação terminológica pendente.

---

### Slide 1 — O compromisso do ILUM [arquétipo: pergunta-em-camadas]
**Passos:** O compromisso · Uberlândia · Expansão

**Na tela**

**ILUM · Plano de execução**

- **15/10** · POC de Uberlândia
- **Seis meses seguintes** · Incorporação de produtos

**Montagem**

Duas etapas na horizontal, com destaque para a data da POC. Sem frase de fechamento.

**Fala**

“O trabalho já está em execução. O primeiro marco é finalizar a POC de Uberlândia até 15 de outubro. Depois, temos seis meses para trazer mais produtos para essa estrutura. Quero formalizar como vamos organizar essas entregas, o que passa a ser compartilhado e como vamos acompanhar o resultado.”

---

### Slide 2 — Plataforma, produto e serviço [arquétipo: pergunta-em-camadas]
**Passos:** Plataforma · Produto · Serviço específico

**Na tela**

**Plataforma, produto e serviço**

- Plataforma
- Produto
- Serviço específico

**Montagem**

Três camadas, reveladas de baixo para cima: plataforma, produto e serviço específico. Apenas os nomes; as definições ficam na fala.

**Fala**

“A plataforma é a aplicação principal: organiza navegação, acesso e configuração. O produto é uma capacidade que queremos aproveitar em mais de uma plataforma, como Obras ou a administração do Informs. O serviço específico atende uma necessidade particular daquele cliente. Um componente visual, como uma tabela ou um botão, pertence à base compartilhada; não precisa virar um produto.”

**Nota de preparação**

Obras já foi entregue; sua integração à nova composição ainda não está comprovada. Administração do Informs está em evolução, conforme relato do usuário.

---

### Slide 3 — A arquitetura em uma imagem [arquétipo: diagrama-svg]
**Passos:** A estrutura

**Na tela**

**Arquitetura**

Plataforma
Navegação · Acesso · Configuração

Produtos | Serviços específicos

APIs → Dados

Query _(visão de integração)_

**Montagem**

Simplificar o desenho fornecido em três faixas. Query fica ao lado, conectado aos módulos por linhas discretas. MCP aparece apenas no anexo. O desenho não deve sugerir que cada módulo necessariamente possui banco próprio, nem que o front acessa diretamente o banco. Não incluir protocolos, frameworks ou organograma.

**Fala**

“A plataforma reúne os produtos e define as regras de convivência. Cada produto mantém sua função de negócio e conversa com os dados por integrações acordadas com o back-end. O Query aparece como a visão de assistência transversal. Sua presença no desenho não representa compromisso de implementação completa nesta etapa.”

---

### Slide 4 — O que permite reaproveitar [arquétipo: título+grade]
**Passos:** As peças compartilhadas

**Na tela**

**Base compartilhada**

- Design system
- Registry
- Microfront-ends

**Montagem**

Três colunas com os nomes. Sem descrições abaixo dos termos.

**Fala**

“O design system define a experiência comum. O registry organiza a distribuição de componentes e blocos padronizados para quem constrói as aplicações. Os microfront-ends permitem que produtos com autonomia justificada evoluam separadamente e sejam incorporados à plataforma. Vamos escolher a forma adequada para cada capacidade; uma tela isolada não vira automaticamente um produto independente.”

**Nota de preparação**

A decisão de distribuição ainda está prevista na TIA-32. Evitar a explicação antiga de que todo produto é publicado no registry e carregado por ele: o backlog diferencia registry, pacotes compartilhados e produtos independentes. A configuração da plataforma determina a composição.

---

### Slide 5 — Continuidade do APEX [arquétipo: comparação]
**Passos:** A transição

**Na tela**

**APEX · Transição**

1. Operação atual
2. Reconstrução em paralelo
3. Homologação
4. Substituição condicionada

**Montagem**

Linha de transição com APEX presente até a homologação. A substituição aparece como etapa condicionada à viabilidade.

**Fala**

“O APEX continua sendo operado. A proposta é validar os novos módulos tanto no ambiente APEX quanto numa aplicação independente, preservando o investimento na reconstrução. A integração será comprovada na execução. Só discutiremos desativação quando a substituição estiver concluída, homologada e puder assumir a operação.”

**Nota de preparação**

TIA-10 prevê provar o mesmo módulo em APEX e em hospedeiro independente; TIA-28 e TIA-29 cobrem publicação com retorno de versão e homologação. Não apresentar essa viabilidade como já comprovada nem prometer ausência absoluta de falhas.

---

### Slide 6 — Onde absorvemos as demandas [arquétipo: matriz]
**Passos:** O destino de cada demanda

**Na tela**

**Distribuição das demandas**

| Demanda | Frente |
|---|---|
| Navegação e configuração | Plataforma |
| Componentes visuais | Base compartilhada |
| Funcionalidade reutilizável | Produto |
| Particularidade de cliente | Serviço específico |
| Regras e dados | Back-end |
| Publicação e operação | Infraestrutura |
| Identidade e acesso | Segurança · Integração com Gates |

**Montagem**

Tabela de duas colunas, sem cards adicionais ou texto de fechamento.

**Fala**

“Esse é o critério que proponho para absorver o trabalho da empresa. Antes de desenvolver, identificamos se estamos ampliando a plataforma, fortalecendo um produto ou atendendo uma particularidade. Minha condução está na arquitetura e na evolução de front-end, articulando interfaces com back-end, experiência e operação. Os responsáveis de cada área precisam acompanhar seus respectivos entregáveis.”

**Nota de preparação**

É uma divisão funcional proposta, não alteração de organograma. Gates e autenticação exigem integração com Segurança/Infra; não atribuir sua propriedade à frente de front-end. Responsáveis nominativos, além dos informados pelo usuário, não foram confirmados.

---

### Slide 7 — O portfólio em andamento [arquétipo: tabela]
**Passos:** As entregas

**Na tela**

**Portfólio · Status e entregas**

| Frente | Status / entrega |
|---|---|
| COMGAS · RFID | Reestruturação com Giovanni |
| FLEETS | Guia de instalação · Setembro |
| INFORMS | PWA entregue · Painel em evolução |
| Obras | Entregue ao Fortes |
| Planejamento | Homologação POA · Apresentação Recife |

**Montagem**

Uma linha por frente. Destacar status e prazo; usar o mesmo peso visual para todas as iniciativas.

**Fala**

“A construção da base acontece junto com as entregas do portfólio. Na COMGAS, estamos com o Giovanni reestruturando a aplicação de RFID. No Fleets, o guia de instalação de dispositivo será entregue ainda neste mês. O Informs já recebeu uma nova PWA e evolui para um painel que auxilia a montar formulários. Obras já foi entregue ao Fortes. Planejamento está em homologação em Porto Alegre e será apresentado para Recife.”

**Nota de preparação**

Fonte: atualização do usuário nesta conversa, em setembro de 2026. Não inventar prazo de COMGAS, painel Informs ou Recife. O usuário não informou a próxima etapa de Obras.

---

### Slide 8 — Como o portfólio entra [arquétipo: matriz]
**Passos:** A incorporação

**Na tela**

**Incorporação ao ILUM**

| Iniciativa | Destino proposto |
|---|---|
| Uberlândia | Plataforma de referência |
| Obras e Planejamento | Produtos |
| Administração do Informs | Produto |
| COMGAS · RFID | A definir |
| Guia de instalação · Fleets | Operação de campo |

**Montagem**

Tabela de enquadramento. Manter “proposto” no cabeçalho e “a definir” para RFID.

**Fala**

“Vamos avaliar o que cada entrega acrescenta à estrutura. Obras, Planejamento e a administração do Informs são candidatos à composição como produtos. No RFID, precisamos distinguir o que é específico da COMGAS e o que pode ser reutilizado. O guia do Fleets é uma entrega operacional; ele não precisa virar módulo de software. Para incorporar um produto, ainda teremos de validar suas interfaces, permissões, comportamento e sustentação.”

**Nota de preparação**

Os destinos são propostas de enquadramento; não são migrações concluídas. A ordem de entrada dos produtos nos seis meses ainda não foi definida. O painel Informs não equivale à PWA já entregue.

---

### Slide 9 — O plano de execução [arquétipo: linha-do-tempo]
**Passos:** Os marcos de construção

**Na tela**

**Frentes de execução**

1. Catálogo
2. Fundação
3. Sistema visual
4. Composição e dados
5. Qualidade
6. Publicação

**Montagem**

Seis blocos numerados. Não associar cada bloco a um mês; as frentes podem avançar em paralelo.

**Fala**

“O Linear já organiza essas frentes em 29 tarefas. Traduzindo para acompanhamento executivo: primeiro sabemos o que precisa ser atendido; depois estabelecemos a base, padronizamos a experiência, integramos os módulos, verificamos os resultados e publicamos com condições de sustentação. Algumas frentes podem avançar em paralelo, respeitando as dependências.”

**Nota de preparação**

Seis frentes não significam seis meses nem seis fases estritamente sequenciais. O Linear consultado não comprova avanço percentual: tarefas em Backlog e sem vencimento. A execução em curso foi informada pelo usuário.

---

### Slide 10 — O marco de 15/10 [arquétipo: título+grade]
**Passos:** A evidência da POC

**Na tela**

**POC Uberlândia · 15/10**

| Aceite proposto |
|---|
| Fluxo representativo |
| Acesso e dados |
| Integração APEX |
| Configuração neutra |

**Montagem**

Data em destaque e quatro itens de aceite. Manter “proposto” visível.

**Fala**

“Para acompanhar a POC, proponho estes critérios: demonstrar um fluxo representativo, integrado a acesso e dados, validar sua convivência com APEX e mostrar que a fundação funciona também numa configuração neutra. O catálogo e a equipe precisam fechar a cobertura exata do aceite. O backlog também prevê a reconstrução completa de Uberlândia; concluir uma prova da base não comprova sozinho a entrega de toda a aplicação.”

**Nota de preparação**

15/10 veio do usuário. Os critérios são proposta apoiada nas TIA-10 e TIA-20. Não há confirmação de que toda Uberlândia deve estar reconstruída em 15/10; tampouco reduzir o escopo final de Uberlândia a um fluxo. Essa fronteira precisa constar do aceite antes de formalizar compromisso de cobertura.

---

### Slide 11 — Os seis meses seguintes [arquétipo: linha-do-tempo]
**Passos:** A expansão

**Na tela**

**Expansão · Cronograma proposto**

| Período | Marco |
|---|---|
| Meses 1–2 | Base e catálogo |
| Meses 3–4 | Incorporação de produtos |
| Meses 5–6 | Adoção e estabilização |

Outubro de 2026 → Abril de 2027

**Montagem**

Três blocos numa linha do tempo após a POC. Não atribuir produtos específicos aos períodos.

**Fala**

“Depois da POC, proponho organizar a expansão em três blocos. Consolidamos a base e fechamos o catálogo e as lacunas de Uberlândia; incorporamos os produtos priorizados; depois ampliamos a adoção e estabilizamos a operação. A conclusão de Uberlândia continua no plano. A sequência e a quantidade de produtos dependem da capacidade da equipe, das integrações e das homologações.”

**Nota de preparação**

Somente a duração de seis meses foi confirmada. Blocos são proposta, não prazos extraídos do Linear. Não atribuir automaticamente cada produto a um mês. A entrega completa de Uberlândia precisa ter previsão própria após definição da cobertura da POC e do catálogo.

---

### Slide 12 — Como acompanhamos o resultado [arquétipo: tabela]
**Passos:** Os critérios de conclusão

**Na tela**

**Critérios de conclusão**

| Entregável | Aceite proposto |
|---|---|
| Base comum | Configuração neutra |
| Uberlândia | Paridade homologada |
| Produto incorporado | Fluxo homologado |
| Reutilização | Segundo contexto |
| Continuidade | Retorno de versão validado |
| Sustentação | Responsável e documentação |

**Montagem**

Tabela única de entregáveis e critérios, sem indicadores percentuais.

**Fala**

“Quero acompanhar resultados verificáveis. Uma base comum precisa funcionar além da primeira cidade. Um produto incorporado precisa operar dentro da plataforma. A reconstrução precisa atender ao catálogo acordado. E toda publicação precisa ter quem a sustente e como voltar à versão anterior. Essas evidências tornam o plano acompanhável pela direção.”

**Nota de preparação**

Não apresentar metas numéricas de redução de tempo ou custo sem linha de base. A prova de segunda fonte da TIA-21 não equivale, por si só, a implantação do produto em um segundo cliente.

---

### Slide 13 — A condução desse trabalho [arquétipo: título+grade]
**Passos:** A responsabilidade

**Na tela**

**Responsabilidades · Front-end**

- Arquitetura
- Padrões
- Integração entre frentes
- Acompanhamento das entregas

**Montagem**

Quatro itens com o mesmo peso visual. O escopo de responsabilidade é apresentado na fala.

**Fala**

“Estou assumindo a condução dessa frente: organizar a arquitetura de front-end, estabelecer os padrões, orientar como os produtos entram na estrutura e acompanhar as dependências e entregas. Quero formalizar esse escopo de responsabilidade e tornar seus resultados visíveis. A execução continua articulada com os responsáveis de produto, back-end, experiência e operação.”

**Nota de preparação**

Apresentar como escopo a formalizar. Não declarar mandato corporativo já concedido, gestão de pessoas ou propriedade sobre outras áreas. Preservar a atribuição coletiva das entregas e a participação de Giovanni, Fortes e demais responsáveis.

---

### Slide 14 — O plano que formalizamos [arquétipo: título+grade]
**Passos:** O compromisso

**Na tela**

**Formalização do plano**

- POC · 15/10
- Expansão · Seis meses
- Continuidade operacional
- Responsabilidades e acompanhamento

**Montagem**

Lista simples dos compromissos, com destaque apenas para os prazos.

**Fala**

“Este é o plano que quero registrar: validar a estrutura com Uberlândia, ampliar sua adoção nos seis meses seguintes e preservar a operação durante a transição. Com isso, formalizamos tanto a direção dos produtos quanto a responsabilidade por conduzir essa evolução e acompanhar seus resultados.”

---

### Slide 15 — Composição de uma aplicação [arquétipo: mockup]
**Passos:** Prompt · Plataforma · Produtos · Aplicação

**Na tela**

**Cidade X**

Visão futura · Composição por prompt

> Preciso criar uma aplicação para a Cidade X, adicionar os módulos de Obras, Informs e Mapas e utilizar o Lens para ver a qualidade do pavimento.

Plataforma → Obras · Informs · Mapas · Lens

Catálogo
Obras · Informs · Mapas · Lens · Planejamento · Módulo X · Módulo Y

**Montagem**

Um único cenário, com área de prompt e catálogo à esquerda e prévia da aplicação à direita. O catálogo contém sete módulos: Obras, Informs, Mapas, Lens, Planejamento, Módulo X e Módulo Y. Reservar o espaço da aplicação desde o início para que a animação não reposicione o conteúdo. O título, a indicação de visão futura e o prompt permanecem no mesmo lugar. Sem punchline ou descrição abaixo do desenho.

1. **Prompt.** O texto aparece como digitação em um campo de entrada. Ao terminar, o botão “Montar aplicação” acende e recebe um clique simulado. A digitação acontece automaticamente; o avanço para a montagem segue o controle do apresentador.
2. **Plataforma.** A prévia ganha primeiro a estrutura vazia: janela da aplicação, nome “Cidade X”, cabeçalho, navegação e área de conteúdo. Usar “Plataforma” como rótulo da base. A ideia visual é a infraestrutura da aplicação; não animar provisionamento de servidores ou nuvem.
3. **Produtos.** No catálogo, Obras, Informs, Mapas e Lens são destacados em sequência. Uma cópia visual de cada peça se desloca até a plataforma e passa a ocupar uma entrada do menu; o catálogo mantém todos os módulos disponíveis. Os quatro selecionados recebem uma marca de seleção. Planejamento, Módulo X e Módulo Y permanecem no catálogo, sem marca, com aparência normal de itens disponíveis — não desabilitados. Eles não se deslocam nem entram no menu da cidade. A plataforma fica fixa e os módulos permanecem visíveis após entrar. Lens recebe o rótulo “Lens · BI”.
4. **Aplicação.** A estrutura se transforma na prévia final: menu com os quatro módulos, Mapas exibindo trechos de pavimento e um painel Lens com o título “Qualidade do pavimento”. Usar categorias como “Bom”, “Regular” e “Ruim”, com indicação discreta de “Dados ilustrativos”. Obras e Informs continuam acessíveis no menu; não inventar fluxos automáticos entre eles. O catálogo permanece ao lado, mostrando Planejamento, Módulo X e Módulo Y fora da composição da Cidade X.

Manter uma conexão discreta “ILUM · APIs e dados” abaixo da prévia, ligada à aplicação. Ela indica a integração que sustenta o front-end e não entra como um quinto produto. A tela final permanece aberta para o encerramento da fala. Ao voltar uma etapa, restaurar o estado correspondente; ao revisitar o slide, permitir repetir a sequência.

**Fala**

**Prompt**

“Para mostrar onde essa estrutura pode chegar: preciso criar uma aplicação para a Cidade X, adicionar Obras, Informs e Mapas e usar o Lens para acompanhar a qualidade do pavimento.”

**Plataforma**

“Primeiro, montamos a plataforma da cidade: a base da aplicação, com navegação, acesso e configuração.”

**Produtos**

“Depois, acoplamos os produtos selecionados. Obras, Informs, Mapas e Lens passam a fazer parte dessa aplicação. O catálogo também oferece Planejamento e outros módulos, mas eles não entram porque não foram pedidos para esta cidade. Cada aplicação recebe a composição de que precisa.”

**Aplicação**

“Aqui está o resultado que queremos viabilizar com o ILUM: uma aplicação composta para a cidade, conectada aos dados e com os produtos necessários. Neste exemplo, o Lens apresenta a qualidade do pavimento. A criação por prompt é uma visão futura; a base, os padrões e as integrações deste plano são o que precisamos construir para chegar lá.”

**Nota de preparação**

O usuário confirmou Lens como BI e pediu esta sequência como fechamento. Planejamento aparece como opção não selecionada; Módulo X e Módulo Y são exemplos fictícios para ilustrar um catálogo maior. A animação é uma simulação da experiência desejada, não uma demonstração de geração, publicação ou provisionamento já implementados. A composição de Mapas e a configuração específica de qualidade do pavimento ilustram o cenário; não comprovam que essas capacidades já estão prontas. A geração por prompt não é acrescentada aos compromissos da POC ou dos seis meses.

---

### Anexo — Query e comunicação [arquétipo: diagrama-svg]
**Passos:** A visão de comunicação

**Na tela**

**Query · Comunicação**

Query ↔ Integração ↔ Módulos

MCP _(ilustrativo · fora do escopo de front-end)_

**Montagem**

Diagrama horizontal com três elementos. MCP junto à conexão, sem aparência de entregável ou marco.

**Fala**

“O desenho mostra como o Query poderia se comunicar com os módulos. MCP aparece como possibilidade de integração. Essa implementação não faz parte das entregas da arquitetura de front-end aqui formalizadas.”

## Referências de preparação

- [Projeto Ilum no Linear](https://linear.app/tiago-bega/project/ilum-a74f30e94d02): escopo, seis marcos, 29 tarefas e limites das frentes.
- [TIA-32 — Fronteiras de registry, pacotes, microfrontends e Lens](https://linear.app/tiago-bega/issue/TIA-32/decidir-fronteiras-de-registry-pacotes-microfrontends-e-lens).
- [TIA-10 — Validação da integração APEX](https://linear.app/tiago-bega/issue/TIA-10/validar-host-e-remote-no-apex-com-isolamento-e-desmontagem).
- [TIA-20 — Fluxo vertical e alcance da validação](https://linear.app/tiago-bega/issue/TIA-20/validar-a-arquitetura-com-um-fluxo-vertical-de-uberlandia).
- front-roteiro.md e ilum-roteiro.md: referências locais, corrigidas quando divergem da atualização do usuário e do escopo recente.
- Diagrama anexado pelo usuário: visão de composição e comunicação.
- Apresentação Claude: acesso direto indisponível; o projeto Linear registra contexto derivado dela, sem equivaler à leitura integral do artefato.

## Pendências para consolidar o compromisso

1. Confirmar vocabulário de serviço específico/extensão versus solução completa para cliente.
2. Fechar a cobertura da POC de 15/10 e distinguir seu aceite da reconstrução completa de Uberlândia.
3. Escolher ordem e quantidade de produtos dos seis meses, conforme capacidade e dependências.
4. Definir responsáveis de homologação e sustentação por frente, sem presumir alterações de organograma.

Essas pendências não impedem revisar a narrativa. O roteiro está preparado; o deck visual aguarda revisão deste plano.
