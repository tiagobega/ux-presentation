# Ilum funcionando — plano e roteiro da demo

> **Plateia:** diretoria e time técnico.
> **Objetivo:** mostrar o Ilum funcionando, explicar o que acontece dentro dele e gerar o backend de um projeto ao vivo.
> **Tempo:** 20 a 40 minutos, slides e demo juntos · oito slides.
> **Formato:** dois focos. Os slides ficam num monitor; o Airflow, o GitHub, a API e o front do Bega ficam no outro.
> **Fontes:** números só de [`ilum-demo-contexto.md`](ilum-demo-contexto.md). Arquitetura do diagrama "Arquitetura de
> Tecnologia" do Programa de Tecnologia (19/10/2026), sem o InteliRoad.

## Revisão de 25/10 — duas partes, sete slides, nada ao vivo

Esta seção prevalece sobre o que vem abaixo onde os dois divergirem.

**Números.** A fonte passou a ser o relatório do run de 25/10 (`uberlandia-agosto-2026-2026-10-25.pdf`): 544.129 imagens e 2.769.828 detecções, contra 533.832 e 2.727.226 da passagem (as 10.297 imagens sem trecho de 10 m agora entram, ADR-0040). Os números do funil, dos grupos, da camada e dos tempos de job da passagem são do run antigo e **não valem mais**: os bancos voltaram zerados e os jobs precisam rodar de novo. Tudo isso está em `src/slides/ilum-demo/dados.ts`, com `null` para o que falta medir. Os jobs rodaram em 25/10 (informado pelo apresentador): agrupamento 17 min 41 s / 36 min 05 s e camada 2 min 20 s / 2 min 44 s (PostgreSQL / Oracle); 399.077 grupos, 908.385 detecções contadas e 399.068 pontos na camada, iguais nas duas engines; 350.106 detecções mudaram de unicidade pela regra do projeto; os 9 grupos que faltam ficaram sem contagem. **Ressalva para a fala:** os jobs rodaram na máquina do apresentador, com ~130 ms por ida e volta até cada banco e as duas engines ao mesmo tempo, então os tempos são o pior caso; no ambiente de verdade o job roda perto do banco. Total do zero ao projeto no ar: ~1 h 04 min no PostgreSQL e ~1 h 23 min no Oracle (repositório ~17 s, deploy ~3 min estimado).

**Nada roda ao vivo.** Tudo estará pronto antes; depois do slide 2 o apresentador mostra, fora do deck, o Airflow com as DAGs que já rodaram, os logs e o front do Bega. O slide "ao vivo" e o selo do Airflow saíram: o Airflow é fala, não slide. As seções "A cadeia ao vivo" e o checklist abaixo ficam como registro e precisam ser revistos.

- **O Router está validado** (o recorte do envio, usado em Uberlândia com **frota + cidade (um IBGE)**). O que ainda não
  existe é o tempo real: o projeto recebe o mês carregado, não cada foto quando chega. No slide 1 o Router
  leva o selo **VALIDADO** e é a metade chapada: o Builder roda uma vez por projeto, o Router é a esteira contínua de dados. As setas até o projeto são **DADOS · SEMPRE** (Router, grossa, com partículas) e **CRIAÇÃO · UMA VEZ** (Builder, tracejada), ao lado da gravação. O Builder gera o **código base, back e front**.
- **"Back", nunca "API"**, para a peça do projeto: o nome genérico apagava a Backend Factory. "API" só como
  um dos três serviços do back.
- **"Demo", nunca "POC".**

| # | Slide | Passos |
|---|---|---|
| 1 | Arquitetura | O ecossistema (projeto genérico, "Contrato / Projeto") · A demo (apaga Geobox, Geolux, IRI e Luminosidade; o projeto vira Uberlândia · agosto de 2026) · O Ilum (zoom, com "Ilum" escrito em cima de Builder e Router) · Dentro do Builder (a câmera entra no Builder e a tela vira ameixa; o slide 2 abre por corte nesse quadro) |
| | **Builder** | |
| 2 | O que o Builder monta | O projeto · O banco (Ouro "o dado como veio", Prata "o dado agrupado", Bronze "pronto para a apresentação ao cliente") · O back (Camada e Agrupamento, "rotina agendada · gera o Bronze/a Prata", cada uma ligada à classe que gera; e a API) · O front ("código base gerado; o Builder vai subir o front sozinho", em breve) |
| | *Fora do deck* | O Airflow com as DAGs que já rodaram, os logs e o front do Bega |
| 3 | Uberlândia: uma cidade, 30 dias | Prova 1, o tamanho: 20 aparelhos · 544.129 imagens · 2.769.828 detecções · 763.131 trechos; "Este é o recorte de referência. Mais dados, mais tempo." |
| 4 | Do zero ao projeto no ar | Prova 2, o tempo: banco 41,1 min (relatório) · repositório ~18 s · deploy ~5 min (manual, estimado) · jobs a medir; total e pontos no mapa |
| 5 | Duas engines, o mesmo dado | Prova 3, a fidelidade: 0 recusadas, contagens iguais, validação por contagem e conteúdo equivalente |
| | **Router** | |
| 6 | Cada contrato escolhe o que chega ao projeto | Frota do contrato · Uma cidade (IBGE) · Várias cidades (lista de IBGE) · Polígono · Frota + cidade (IBGE; o recorte da demo). Fonte: guia "Regras de agrupamento por contrato", bloco A. "Tudo, sem recorte" fica de fora. Mapa ilustrativo |
| 7 | O que vem depois da demo | Tempo real em destaque · o Back lendo o Oracle · a Prata da unicidade · DT-02 |

**Fala do Router (slide 6).** “O Router é a outra metade do Ilum. Cada contrato escolhe o que chega ao
projeto: a frota dele onde estiver, uma cidade, uma lista de cidades, uma área desenhada no mapa, ou a frota
só dentro da área. Em Uberlândia usamos este último.”

## A narrativa

A arquitetura é a do programa de tecnologia:

- os **hardwares** (Jetson, Geobox, Geolux) capturam em campo e enviam ao Ilum;
- o **Intelifleets** é exclusivamente a gestão da frota e dos dispositivos, e passa ao Ilum o contexto válido no
  momento da captura;
- o **Ilum** encaminha as entradas aos **processadores** (Vision, Qualidade/IRI, Luminosidade), recebe os
  resultados, **grava nos dados corporativos** (Yoda, Object Storage) e distribui aos **projetos**.

Nesta demo, o Ilum tem duas partes. Regras e Operação, que estão no diagrama do programa, ficam fora:

| Parte | O que faz | Nesta demo |
|---|---|---|
| **Builder** | Prepara o banco, os dados iniciais e os serviços de cada projeto; carrega e valida o histórico | **Provado.** Provisionou PostgreSQL e Oracle, carregou agosto de Uberlândia e gera o backend ao vivo |
| **Router** | Recebe e contextualiza os dados, encaminha ao processamento, distribui os recortes autorizados | **Próximo passo.** O fluxo contínuo de fotos novas não está construído |

Essa separação, entre o que foi provado e o que vem a seguir, aparece na tela. O arquivo de passagem descreve
outra divisão (ADR-0002: o Fleets grava no Yoda), mas **para este deck vale a arquitetura do programa**,
decidida pelo apresentador.

## A cadeia ao vivo

1. O **Marco** dispara o fluxo no **Airflow**; a plateia vê a execução rodando.
2. O Builder pede o backend à Backend Factory (release 0.5.5), **cria o repositório** do projeto e **abre a PR**
   pela GitHub App da organização.
3. O merge e o deploy na Railway são **manuais**: o Marco faz enquanto a apresentação segue.
4. A API sobe, e o **front do Bega**, já pronto, passa a consumir.

**Tempo estimado:** cerca de 5 minutos de conversa. É estimativa, não medição, e **não vai para a tela**. Os
slides 3 a 6 cobrem o intervalo; o slide 6 é o elástico.

---

### Slide 1 — Arquitetura [diagrama com câmera]
**Passos:** O ecossistema · A demo · O Ilum · O projeto

Um desenho só, montado em código como SVG a partir de dados. A câmera é o `viewBox`, como no slide 1 da
diretoria: nada é trocado por réplica. Ela se aproxima do que já está no desenho, e o que sai de foco apaga
sem sair do lugar.

**Passo 1: O ecossistema**

```
 [Jetson] [Geobox] [Geolux]  < - - gestão - -  [Intelifleets]
      \      |      /                               ¦ contexto na captura
       v     v     v                                v
   +-------------------- ILUM --------------------+ ⇄ [Vision] [Qualidade/IRI] [Luminosidade]
   +----------------------------------------------+
            | gravação                  \ distribuição
   [Yoda] [Object Storage]               [Projeto · Uberlândia]
```

- O desenho acende da esquerda para a direita, elemento por elemento.
- Setas contínuas são dados e resultados; tracejadas são gestão e contexto, com a mesma legenda do diagrama do
  programa.
- Depois da entrada, **partículas correm pelas setas contínuas** (campo → Ilum → processadores → Ilum →
  Yoda e projeto). É o que faz o desenho ler como fluxo, não como organograma. Elas param quando a
  câmera sai do ecossistema.
- Os hardwares aparecem soltos, sem a caixa do InteliRoad.

**Passo 2: A demo**

A câmera não se mexe. Apaga o que a demo não usa: Geobox, Geolux, IRI e Luminosidade. Sobram o
**Jetson** e o **Vision**. O cartão do projeto, genérico no passo 1 ("Contrato / Projeto"), vira
**Uberlândia · agosto de 2026**. O todo vem primeiro de propósito: a arquitetura é a de hoje, e a demo é um
recorte dela.

**Passo 3: O Ilum**

A câmera fecha no Ilum e a caixa se abre em duas metades, com o nome **Ilum** em cima delas, para quem
se distraiu no zoom:

| Router · *próximo passo* | Builder · *provado em Uberlândia* |
|---|---|
| Receber e contextualizar | Preparar bancos e dados iniciais |
| Encaminhar ao processamento | Carregar e validar o histórico |
| Distribuir os recortes | Gerar o backend do projeto |

- As setas mudam de cor conforme o dono: entrada, processadores, gravação e distribuição pertencem ao Router;
  a seta para o projeto pertence ao Builder.
- O selo do Builder é sólido e o do Router é contorno, na mesma escala de proximidade do slide 5 da diretoria.
- A caixa cresce **sobre uma área já reservada** e não empurra o vizinho (é a regra de layout do repositório).

**Passo 4: O projeto**

A câmera segue a seta do Builder até o cartão do projeto, e ele se abre:

```
 Projeto · Uberlândia
 +-------------------------+  +-----------+  +-----------+
 | Grogu                   |  | Back      |  | Front     |
 | PostgreSQL · Oracle     |  | Backend   |  | Frontend  |
 |  ▰ Bronze  camada       |  | Factory   |  | Factory   |
 |  ▰ Prata   grupos       |  |           |  |           |
 |  ▰ Ouro    origem       |  |           |  |           |
 +-------------------------+  +-----------+  +-----------+
   ↑ Builder                    ↑ Builder
```

- O banco do projeto é o **Grogu**, com as três classes empilhadas como camadas, na ordem em que o dado sobe:
  Ouro é a origem (só leitura), Prata são os grupos, Bronze é a camada que a API e o mapa leem.
- Banco e Back levam a marca do Builder; o Front é da Frontend Factory, de quem o Builder não cuida.
- As definições curtas são vocabulário, a mesma exceção combinada no slide 1 da diretoria. Sem elas a diretoria
  não acompanha o funil.

**Fala**

*O ecossistema:* “Este é o caminho do dado. Os hardwares capturam em campo e enviam ao Ilum. O Intelifleets é
a gestão da frota: ele diz ao Ilum qual dispositivo, qual veículo e qual contrato valiam no momento da captura.
O Ilum manda para os processadores, recebe o resultado, grava no Yoda e entrega a cada projeto o seu recorte.”

*O Ilum:* “Dentro do Ilum há duas partes. O Router é o caminho contínuo: recebe, contextualiza, encaminha e
distribui; é o próximo fluxo que vamos ligar. O Builder prepara cada projeto: o banco, os dados, o backend. É
ele que vocês vão ver funcionando hoje.”

*O projeto:* “Cada projeto ganha um banco próprio, o Grogu, em PostgreSQL ou Oracle. Dentro dele o dado sobe
em três classes: o Ouro é o dado como veio, a Prata são os grupos que a regra do projeto calcula, e o Bronze é
o que a API e o mapa leem. O Builder monta o banco e o back; o front encaixa em cima.”

---

### Slide 2 — O Builder [fluxo] **[AO VIVO: disparo]**
**Passos:** O banco · O backend

**Na tela**

Uma esteira horizontal, com duas metades que acendem uma por passo:

```
 O banco  (já rodou)                         O backend  (ao vivo)
 Provisionar Grogu → Carregar agosto →  |  Backend Factory → Repositório → PR → Deploy
 PostgreSQL · Oracle   do Yoda          |
```

No segundo passo, o selo **ao vivo · Airflow** acende (`LiveBadge` do kit do `fleets-demo`).

**Montagem**

A esteira inteira está no DOM desde o primeiro quadro; o passo 2 só acende a metade da direita. O rótulo
"já rodou" e o selo "ao vivo" separam o que a plateia vai conferir nos números do que vai ver acontecer.

**Fala**

*O banco:* “O Builder já fez a primeira parte para Uberlândia: provisionou o Grogu em PostgreSQL e em Oracle e
carregou agosto inteiro a partir do Yoda.”

*O backend:* “A segunda parte não precisa de slide. O Builder pede o backend à Backend Factory, cria o
repositório do projeto e abre a PR. O Marco vai disparar agora.”

*[O Marco dispara no Airflow; mostrar a execução começando no outro monitor e voltar para os slides.]*

“Enquanto ele roda, vamos ver o que o Builder já fez com Uberlândia.”

---

### Slide 3 — O projeto Uberlândia [dados]
**Passos:** O recorte

**Na tela**

**Uberlândia, agosto de 2026**

| | |
|---|---|
| Código IBGE | 3170206 |
| Contratos | 1 |
| Aparelhos | 40 · 20 com foto em agosto |
| Trechos de via | 763.131 de 10 m · 70.530 de 100 m |
| Período | 01/08/2026 04h21 → 31/08/2026 23h06 |

**Fala**

“Este é o projeto da prova: Uberlândia, um contrato, quarenta aparelhos, metade deles com foto em agosto.”

---

### Slide 4 — O funil [funil]
**Passos:** O funil

**Na tela**

2.727.226 detecções → 919.978 únicas → 908.440 contadas → 399.095 grupos → 399.085 pontos no mapa

Definições de apoio, uma linha cada: **única** (é repetida se a próxima foto do mesmo aparelho, classe e dia
está a 15 m ou menos) · **grupo** (trecho de 10 m de via × classe).

**Montagem**

Cinco degraus que estreitam da esquerda para a direita, com os números em destaque. As 533.832 fotos ficam
na fala.

**Fala**

“Agosto inteiro: 533.832 fotos e 2,7 milhões de detecções. A regra de unicidade separa o que é objeto novo do
que é o mesmo objeto visto de novo, e sobram 919.978. Eles viram 399.095 grupos de 10 metros de via por
classe, e é isso que vira ponto no mapa.”

**Desvio opcional:** o simulador da regra dos 15 m do guia de negócio.

**Reserva de fala (só se perguntarem):** a regra do projeto discorda do valor do Yoda em 346.942 das
2.727.226 detecções (87,3% de concordância), com o total de únicas quase igual (917.291 no Yoda, 919.978 no
projeto). A hipótese é o universo: o Yoda calcula sobre todos os contratos, o projeto só sobre o recorte dele.
Decisão (ADR-0044): a unicidade é do projeto. **A causa ainda não foi confirmada com o time do Yoda.**

---

### Slide 5 — Duas engines, o mesmo resultado [comparação]
**Passos:** A comparação

**Na tela**

| | PostgreSQL · Railway | Oracle · OCI |
|---|---|---|
| Grupos | 399.095 | 399.095 |
| Pontos na camada | 399.085 | 399.085 |
| Agrupamento (agosto inteiro) | 19 min 33 s | 14 min 34 s ¹ |
| Camada | 2 min 43 s | 2 min 38 s |
| Segunda rodada | nada mudou | nada mudou |

**Idênticas classe por classe, inclusive nas fotos representativas.**

¹ Retomando 27.445 grupos gravados por uma tentativa anterior que parou.

**Montagem**

Duas colunas espelhadas, e as linhas de resultado iguais acendem juntas. A nota ¹ fica na tela: sem ela, o
Oracle parece mais rápido, e a comparação de tempo não é justa.

**Fala**

“O mesmo código, rodando em PostgreSQL e em Oracle, chegou ao mesmo resultado, classe por classe. Rodar de novo
não muda nada. É a prova de que o projeto não fica preso a um banco.”

**Desvio opcional:** o simulador de estado da assinatura do guia de negócio, com as duas engines.

---

### Slide 6 — O que a prova encontrou [antes · depois]
**Passos:** Os achados

**Na tela**

| Achado | Antes | Depois |
|---|---|---|
| Agrupamento par a par (444.664 pares, 132 ms por ida e volta) | ~65 h estimadas | 19 min |
| Plano da consulta no Oracle | 117 s de CPU | 0,15 s por lote de 500 pares |
| Lote grande no Oracle | recusado (`ORA-01460`) | aceito |

**Montagem**

Três linhas, e a coluna "depois" acende por último. As versões da factory (0.5.4 e 0.5.5) ficam na fala.

**Fala**

“A prova serviu para isso: achar o que só aparece com o volume real. O agrupamento ia ao banco par a par e
levaria umas 65 horas; foi para 19 minutos na versão 0.5.4 da factory. No Oracle, o banco gastava 117 segundos
só para montar o plano da consulta; caiu para 0,15 segundo por lote na 0.5.5.”

*[É o slide elástico: se o Marco ainda não sinalizou, a conversa continua aqui.]*

---

### Slide 7 — O backend no ar [demo] **[AO VIVO]**
**Passos:** Ao vivo

**Na tela**

**O backend de Uberlândia no ar**

Repositório · PR · Deploy · API · Mapa

Selo **ao vivo · monitor 2**.

**Montagem**

Âncora visual enquanto a demo roda, no formato do `DemoSlide` do `fleets-demo`. Os cinco tokens são o caminho
que a demo percorre, na ordem.

**Roteiro da demo**

1. O repositório criado e a PR aberta pelo Builder.
2. O deploy feito pelo Marco na Railway.
3. `GET /health/ready`, sem token.
4. Uma rota `/v1` com o token: o resumo por classe (`/v1/vision/detections-layer/summary?group_by=class_id&month=2026-08`).
5. O front do Bega com o mapa.

**Fala**

“O que o Marco disparou lá no começo virou isto: um repositório, uma PR e um backend no ar, lendo o banco do
projeto. E o front consome essa API.”

---

### Slide 8 — O que vem a seguir [lista]
**Passos:** Os próximos passos

**Na tela**

**A seguir**

- **O Router:** fotos novas chegando sozinhas
- O Back lendo o Oracle
- A tabela Prata da unicidade (ADR-0044)
- O Builder criando os usuários do banco (DT-02)

**Montagem**

O Router em destaque: ele fecha o desenho do slide 1. Os outros três têm o mesmo peso. Nenhum item tem
data, porque nenhum prazo foi informado.

**Fala**

“Hoje vocês viram o Builder. O próximo é o Router: as fotos novas chegando sozinhas, sem carga de mês
fechado. Os dados do Oracle já estão idênticos; falta provar a API lendo de lá.”

---

## Riscos e plano B

| Risco | Plano B |
|---|---|
| O Airflow falha ou trava | A API `uberlandia-api-production` já está no ar e o front pode apontar para ela; a geração vira fala no slide 2 *(confirmar com o Bega se ele troca o endereço rápido)* |
| A cadeia demora mais que os ~5 min | Os simuladores do guia HTML e o slide 6 como slide elástico |
| O token do Cognito vence no meio | Gerar um novo minutos antes; ter um segundo na manga (vence em ~1 h) |
| Railway fora do ar ou lenta | As tabelas dos slides 3 a 6 e o guia HTML, que abre sem internet |
| Wi-Fi ruim | O guia HTML local; os números já estão nos slides |
| Pergunta sobre tempo real | “É o Router, o próximo fluxo: agosto prova o Builder; as fotos novas dependem dele.” |
| Pergunta sobre a diferença com o Yoda | A reserva de fala do slide 4 |
| Pergunta sobre quem grava no Yoda (alguém lembra da ADR-0002) | “O desenho é a arquitetura do programa: o Fleets fica com a gestão da frota e o Ilum assume o caminho do dado.” |

## Checklist antes de começar

- [ ] Token do Cognito gerado minutos antes, mais um de reserva
- [ ] Guia `como-o-ilum-funciona.html` (branch `codex/docs-prova-uberlandia`) aberto localmente
- [ ] Airflow aberto no monitor 2 e o fluxo conferido com o Marco
- [ ] Front do Bega aberto, com o endereço de reserva combinado
- [ ] `/health/ready` da API atual respondendo

## Pendências

1. Nome do repositório que o Builder vai criar (aparece na demo, não no slide).
2. O sinal do Marco de que a API está de pé.
