# Ilum — contexto para a demonstração

Passagem da sessão de engenharia (23 a 25/10/2026) para quem vai montar a apresentação da demo do Ilum
funcionando. Tudo aqui foi executado e medido; o que não foi está na seção "O que não está pronto". Leia
junto com [`briefing-ilum-diretoria.md`](briefing-ilum-diretoria.md), [`plano-ilum-diretoria.md`](plano-ilum-diretoria.md)
e [`ilum-roteiro.md`](ilum-roteiro.md).

## A divergência a resolver antes de montar

O slide "Novo Fluxo" de `ilum-roteiro.md` diz que o Ilum **ingere** o dado das fontes (GeoBox, Jetson…),
manda para o processamento e **salva no Yoda**. O que foi construído e provado é outro papel, e é o que
está no Documento Mestre e nas ADRs do repositório `ilum`:

- **Quem conhece o Yoda é o Fleets** (ADR-0002). O Fleets processa as fotos e grava no Yoda.
- **O Ilum é uma engine com duas funções** (ADR-0045):
  - **esteira de dados:** provisiona o banco de cada projeto (o Grogu) em PostgreSQL e em Oracle, carrega
    o recorte do território vindo do Yoda e governa o estado de cada banco;
  - **construtor de aplicações:** pede à Backend Factory o backend do projeto e abre a PR no repositório
    dele.

Confirme com o Gabriel qual narrativa vale para a demo antes de reaproveitar o slide.

## A linguagem que mudou

| Use | Não use | Por quê |
|---|---|---|
| projeto | território, cidade (como unidade) | o projeto é a unidade provisionada; território é o recorte geográfico dele; cidade é um município dentro do território (ADR-0041) |
| Grogu | banco da cidade | o banco de cada projeto |
| Ouro, Prata, Bronze | — | as classes das tabelas: Ouro é o dado da origem (só leitura), Prata é a derivada padrão (grupos), Bronze é o que a API e o mapa leem (camada) (ADR-0043) |
| unicidade | — | se a detecção é um objeto novo ou o mesmo visto de novo: repetida quando a próxima foto do mesmo aparelho, classe e dia está a 15 m ou menos |
| grupo | — | um trecho de 10 m de via × uma classe, com a contagem e a foto representativa |
| camada | — | uma linha por grupo, pronta para o mapa |

## O que foi provado: Uberlândia, agosto de 2026

Backend gerado pela Backend Factory, rodando contra os bancos reais da demo: PostgreSQL na Railway e
Oracle Autonomous 26ai na OCI. Os dois bancos foram provisionados pelo Ilum (o Marco rodou).

| | PostgreSQL (Railway) | Oracle (OCI) |
|---|---|---|
| Fotos carregadas | 533.832 | 533.832 |
| Detecções carregadas | 2.727.226 | 2.727.226 |
| Únicas pela regra do projeto | 919.978 | 919.978 |
| Grupos (trecho de 10 m × classe) | 399.095 | 399.095 |
| Detecções contadas nos grupos | 908.440 | 908.440 |
| Pontos na camada do mapa | 399.085 | 399.085 |
| Tempo do agrupamento (agosto inteiro) | 19 min 33 s | 14 min 34 s ¹ |
| Tempo da camada | 2 min 43 s | 2 min 38 s |
| Segunda rodada | nada mudou | nada mudou |

¹ Retomando 27.445 grupos gravados por uma tentativa anterior que parou.

- **Comparação classe por classe: idênticas** nas duas engines, inclusive nas fotos representativas. É a
  prova de agnosticidade: o mesmo código, o mesmo resultado em PostgreSQL e em Oracle.
- **Recorte:** projeto `br-mg-uberlandia`, IBGE 3170206, 1 contrato, 40 aparelhos (20 com foto em agosto),
  763.131 trechos de 10 m e 70.530 de 100 m. Período: 01/08/2026 04h21 a 31/08/2026 23h06 (horário de
  Brasília).
- **Funil para slide:** 2.727.226 detecções → 919.978 únicas → 908.440 contadas → 399.095 grupos →
  399.085 pontos no mapa.

### O que a prova encontrou e foi corrigido no caminho

| Achado | Antes | Depois |
|---|---|---|
| O agrupamento ia ao banco par a par (444.664 pares, 132 ms por ida e volta à Railway) | cerca de 65 h estimadas | 19 min (factory 0.5.4) |
| No Oracle, a consulta dos pares de cada lote | 117 s de CPU só para o banco montar o plano | 0,15 s por lote de 500 pares (factory 0.5.5) |
| No Oracle, lote grande de pares | recusado pelo banco (`ORA-01460`) | aceito, com o dado num LOB temporário (factory 0.5.5) |

### A divergência de unicidade com o Yoda

A regra do projeto discorda do valor do Yoda em 346.942 das 2.727.226 detecções (87,3% de concordância),
com o total de únicas quase igual (917.291 no Yoda, 919.978 no projeto). A hipótese é o universo: o Yoda
calcula sobre todos os contratos, o projeto só sobre o recorte dele. Decisão (ADR-0044): **a unicidade é do
projeto** e vai para uma tabela Prata própria, que ainda não existe. Não está confirmada com o time do Yoda.

## O que dá para mostrar ao vivo

### A API do projeto (a que o front do Bega consulta)

- Endereço: `https://uberlandia-api-production.up.railway.app`
- Saúde, sem token: `GET /health/ready` → `{"status":"ready","checks":[{"name":"postgres","status":"up"}]}`
- Toda rota `/v1` exige o token do Cognito da Intelicity (`Authorization: Bearer <token>`). Sem token: 401.
- Lê o PostgreSQL da Railway com um usuário que só tem leitura.

| Rota | Mostra | Medido na prova |
|---|---|---|
| `GET /v1/vision/detections-layer?limit=5&month=2026-08` | os pontos da camada, paginados | 200 em 672 ms |
| `GET /v1/vision/detections-layer/geo?month=2026-08&bbox=-48.2716,-18.9583,-48.2316,-18.9183` | GeoJSON para o mapa (teto de 5.000 pontos) | 200 em 412 ms, 5.000 pontos |
| `GET /v1/vision/detections-layer/summary?group_by=class_id&month=2026-08` | contagem por classe, igual ao SQL | 200 em 207 ms |
| `GET /v1/vision/detection-classes` | o catálogo de classes | 200 em 137 ms |
| `GET /v1/vision/detections/680122532` e `/v1/vision/images/360629809` | detalhe de uma detecção e de uma foto | 200 em 152 e 149 ms |
| `GET /v1/vision/detections-layer?limit=201` | pedido malformado | 400 |

O token: pool do Cognito `sa-east-1_CxWEvEdzB`, client `2mgfju0l6r27ao65g99866vvn9` (identificadores
públicos). Quem tem usuário no Cognito da Intelicity faz login e pega o access token; o Bega já tem. O
token vence em cerca de 1 hora: gere um novo minutos antes da demo.

### O guia de negócio do Ilum

`docs/negocio/como-o-ilum-funciona.html` no repositório `ilum`, branch `codex/docs-prova-uberlandia`
(PR #14). Mesmo visual do guia da Sabesp: 21 seções, as regras de cada fluxo com o código e a fonte, os 10
débitos técnicos, as 45 ADRs, dois simuladores (estado da assinatura com as duas engines e a regra dos
15 m da unicidade) e os números acima. Autocontido: abre com duplo clique, sem internet. Os simuladores
são bons para demo ao vivo.

### O código e as decisões

| PR no `inteli-city/ilum` | O quê |
|---|---|
| #11 | `group_detections` e `camada_deteccao` como tabelas derivadas; ADRs 0043 (Ouro/Prata/Bronze) e 0044 (unicidade do projeto) |
| #12 | projeto no lugar de território |
| #13 | `publish_services`: o builder escolhe serviços e horários dos jobs, o Ilum gera o backend pela factory e abre a PR |
| #14 | specs por fluxo, guia de negócio, runbook, débito técnico, ADR-0045 e o relatório da prova |

As quatro estão prontas para revisão do Marco, empilhadas nessa ordem. A Backend Factory está na
release 0.5.5.

## O que não está pronto (não prometa na demo)

- **Fotos novas chegando sozinhas.** O fluxo Fleets → fila do projeto → worker não está construído do lado
  do Ilum. A demo mostra agosto carregado e processado, não dado em tempo real.
- **A API lendo o Oracle.** Os dados do Oracle estão idênticos aos do PostgreSQL, mas a API publicada lê só
  o PostgreSQL; a mesma API sobre o Oracle não foi provada.
- **A publicação contra o GitHub real.** O `publish_services` está testado com um GitHub falso; falta a
  GitHub App da organização. A credencial está em discussão com o Marco (comentário na PR #13).
- **A tabela Prata da unicidade** (ADR-0044): decidida, não implementada. Hoje o job grava a unicidade
  numa tabela do Ouro, com o valor do Yoda guardado antes.
- **Os usuários do projeto no banco** (worker, job, leitura): na prova foram criados à mão; o
  provisionamento ainda não cria (DT-02).
- **O backend de Uberlândia não tem repositório:** a API subiu na Railway a partir de uma pasta local.

## Riscos da demo e plano B

| Risco | Plano B |
|---|---|
| Token do Cognito vencido no meio | gerar um novo minutos antes; ter um segundo na manga |
| Railway fora do ar ou lenta | as tabelas desta página e o guia HTML, que abre sem internet |
| Wi-Fi ruim | o guia HTML local; os números já estão nos slides |
| Pergunta sobre tempo real | "é o próximo fluxo: agosto prova a esteira e o backend; as fotos novas dependem da integração com o Fleets" |
| Pergunta sobre a diferença com o Yoda | a unicidade é do projeto, calculada sobre o recorte dele (ADR-0044); a causa ainda será confirmada com o time do Yoda |
