# Ilum funcionando — plano e roteiro da demo

Estado consolidado em 25/10/2026. Este roteiro substitui as versões com geração ao vivo, sete slides e números do run de 23/10.

## Apresentação

- Plateia: diretoria e time técnico; duração de 20 a 40 minutos, incluindo a demonstração.
- Dez slides, começando pela equipe. Deck padrão: `?deck=ilum-demo`.
- Nada será executado durante a apresentação. Depois do slide 4, mostrar no outro monitor as DAGs concluídas, os logs e o front do Bega.
- Arquitetura do Programa de Tecnologia (`itens.pdf`), sem InteliRoad: Jetson, Geobox e Geolux são os hardwares; Intelifleets fornece gestão e contexto; Ilum encaminha ao processamento, recebe os resultados, grava no Banco Yoda e distribui aos projetos.
- Nesta demo, o Ilum é Builder e Router. O Builder prepara cada projeto uma vez; o Router é a esteira contínua de dados e tem maior peso visual. As regras do Router estão validadas; a integração contínua de fotos novas ainda é próximo passo.
- Vocabulário: Uberlândia, Dispositivos, Back e demo. API é um dos serviços do Back. Banco Yoda é nosso banco de dados, Ouro.
- Design: Montserrat, fundo branco, ameixa e malva, títulos menores que o conteúdo, pouco texto e sem faixas com frases de efeito. Rodapé só com número, sem data.

## Fontes e números

A fonte do provisionamento é `uberlandia-agosto-2026-2026-10-25.pdf`, run 975d1989, fornecido pelo Marco. Os jobs foram medidos e informados pelo apresentador em 25/10. A fonte usada pelo código é `src/slides/ilum-demo/dados.ts`. `ilum-demo-contexto.md` é uma passagem histórica: seus números do run anterior não devem voltar ao deck.

| Medida | PostgreSQL | Oracle |
|---|---:|---:|
| Imagens | 544.129 | 544.129 |
| Detecções | 2.769.828 | 2.769.828 |
| Trechos de 10 m | 763.131 | 763.131 |
| Grupos | 399.077 | 399.077 |
| Pontos na camada | 399.068 | 399.068 |
| Linhas recusadas | 0 | 0 |
| Agrupamento | 17 min 41 s | 36 min 05 s |
| Camada | 2 min 20 s | 2 min 44 s |
| Jobs somados | 20 min 01 s | 38 min 49 s |

Recorte: Uberlândia, IBGE 3170206, 01/08 a 31/08/2026, 20 dispositivos com imagem no mês (40 vinculados ao contrato). Os slides usam a formulação aprovada “uma cidade, 30 dias”. Regra da demo: **frota + uma cidade por IBGE**, não frota + polígono.

Reserva de fala: 908.385 detecções contadas nos grupos, 350.106 detecções com unicidade alterada pela regra do projeto e nove grupos sem contagem. Os números antigos do funil e a comparação de otimização “65 h → 19 min” saíram.

## Slide 1 — Quem construiu o Ilum

Abertura em uma única etapa: seis integrantes, em duas linhas de três, com fotos locais, nome e responsabilidade. Todos têm o mesmo peso visual e aparecem juntos, sem senioridade ou destaque individual.

- Gabriel Godoy — Tech Leader
- Marco Coimbra — Desenvolvimento Back-end
- Rodrigo Siqueira — Desenvolvimento Back-end
- Davi Soares — Banco de dados
- Tiago Bega — Desenvolvimento Front-end
- Alan Felix — Consultoria de arquitetura

As imagens fornecidas pelo apresentador estão em `src/assets/equipe/`. O slide é `Slide00Equipe.tsx`; os nomes dos arquivos anteriores foram preservados, e o rodapé acompanha a nova posição no deck.
## Slide 2 — Arquitetura

Passos: O ecossistema → A demo → O Ilum → Dentro do Builder.

Primeiro, a arquitetura inteira. Depois, apagar Geobox, Geolux, IRI e Luminosidade, mantendo Jetson e Vision; o projeto genérico vira Uberlândia. Aproximar do Ilum e mostrar Builder e Router. Router chapado, selo VALIDADO, conexão DADOS · SEMPRE; Builder em contorno, conexão CRIAÇÃO · UMA VEZ. O Builder gera o código base de back e front.

O último passo entra no Builder e cobre a página com “ILUM · Builder · Cria cada projeto, uma vez”. O próximo avanço entra no slide 3 por corte sobre o mesmo quadro.

Fala: “O Ilum prepara cada projeto e faz o roteamento dos dados. O Builder cria a base uma vez; o Router mantém o caminho dos dados de cada contrato.”

## Slide 3 — Como o Builder prepara cada projeto

Passos: O Builder → O pedido → O banco → A conferência → A aplicação.

O mergulho da arquitetura termina na tela ameixa; este slide entra por corte no mesmo quadro e a tela encolhe até o cabeçalho do Builder no diagrama. O fluxo acende por passo, com partículas no caminho corrente, como no Router.

A configuração do projeto define contrato/frota, território/período, bancos e serviços. Dentro da fronteira do Builder, executada pelo Airflow: preparar estrutura e catálogo; carregar malha/contexto e histórico do Yoda uma vez para os Grogus; conferir a carga e a equivalência dos destinos; liberar a publicação do código. Backend Factory fica fora, como origem do código padrão. O GitHub recebe o repositório e o código do Back. Deploy aparece tracejado, como próximo passo do Builder: automatizar a colocação dos serviços no ar. A conexão GitHub/Railway atual foi configurada externamente, não por uma DAG do Ilum.

Fontes no repositório Ilum: `apps/airflow/volume/dags/provision_project.py`, `provision_project_lib/steps.py`, `publish_services.py`, `.specs/publicacao.md` e ADR-0042. A publicação depende dos módulos escolhidos estarem ACTIVE; não sugerir duas esteiras independentes rodando em paralelo. O slide seguinte mantém a expansão do projeto em Banco, Back e Front, sem repetir a tela ameixa.
## Slide 4 — O que o Builder monta

Passos: O projeto → O banco → O back → O front.

Depois do fluxo do Builder, o cartão de Uberlândia se expande em Banco, Back e Front.

- Banco/Grogu: Ouro, “o dado como veio”; Prata, “o dado agrupado”; Bronze, “pronto para a apresentação ao cliente”. PostgreSQL e Oracle.
- Back: Camada, Agrupamento e API; cada rotina se liga à camada que gera. Os rótulos atuais das rotinas são “rotina agendada · gera o Bronze/a Prata”.
- Front: código base gerado; o Builder vai subir o front automaticamente em breve.

Depois deste slide, mostrar as DAGs que já rodaram, seus logs e o front do Bega. Sem disparo, espera de execução ou selo de ao vivo.

## Slide 5 — Uberlândia: uma cidade, 30 dias

Uma prova: o tamanho do que foi provisionado. Período e IBGE, depois quatro totais: 20 dispositivos, 544.129 imagens, 2.769.828 detecções e 763.131 trechos de via de 10 m. Sem faixa de conclusão.

Fala: “Foi esta cidade e este período. Os tempos a seguir se referem a esse volume.”

## Slide 6 — Do zero ao projeto no ar

Uma prova: o tempo. É o único slide com tempos. PostgreSQL e Oracle têm totais do mesmo tamanho e barras na mesma escala: aproximadamente 1 h 04 min e 1 h 23 min.

| Etapa | PostgreSQL | Oracle |
|---|---:|---:|
| Estrutura | ~3,4 min | ~3,4 min |
| Migração dos dados | ~29,2 min | ~33,2 min |
| Índices e chaves | 1,4 min | 2,8 min |
| Espera pela outra engine | ~5,5 min | — |
| Validação entre as duas | 1,6 min | 1,6 min |
| Repositório, código base do back | ~17 s | ~17 s |
| Deploy manual, estimado | ~3 min | ~3 min |
| Jobs | 20 min | 38,8 min |

O banco das duas engines foi provisionado no mesmo run, de 16:11:27 a 16:52:30 UTC, e fecha em 41,1 min após a validação comum. A carga termina em momentos diferentes; o PostgreSQL aguarda o Oracle. Manter esse bloco branco listrado com ampulheta, sem texto na legenda. As etapas que diferem têm uma linha por engine na legenda.

Os valores aproximados de migração são derivados dos horários do relatório, cujo fim da carga é registrado só em minutos; levam “~”. Os totais combinam o run de banco, publicação do back, deploy estimado e jobs medidos: não são a medição de uma execução única de ponta a ponta. Os jobs rodaram na máquina do apresentador, em paralelo entre engines e com cerca de 130 ms por ida e volta aos bancos. Preservar essa ressalva; no ambiente final eles devem rodar perto do banco. Mais volume implica mais tempo, e a leitura do Yoda (27,6 min) é uma frente de melhoria.

## Slide 7 — Duas engines, o mesmo resultado

Passos: A comparação → Dentro do Router.

Uma prova: a fidelidade. A tabela compara Banco Yoda (recorte extraído), PostgreSQL e Oracle (Grogus do projeto). Imagens, detecções e trechos de 10 m têm as mesmas contagens nas três colunas, conforme a seção 3 do relatório. Linhas recusadas, grupos e pontos mostram “—” no Yoda: recusas são da carga, e os derivados são gerados no projeto. Sem tabela de tempo ou soma adicional. A nota distingue a conferência de contagens da origem ao destino da validação de conteúdo por hash por amostra entre engines; não afirmar hash integral de todas as linhas nem identidade de todas as colunas após os jobs.

O último passo expande a tela “ILUM · Router · A esteira de dados, sempre”. O próximo avanço corta para um quadro idêntico no slide 8, como na entrada do Builder.

## Slide 8 — O caminho de um dado

Passos: O Router → Chega → Processa → Volta → Entrega.

A tela ameixa encolhe até o bloco do Router. Um desenho único acende um caminho por passo; as partículas correm no caminho corrente.

1. Chega: Jetson → Router; contexto do contrato vindo do Intelifleets.
2. Processa: Router → Vision.
3. Volta: Vision → Router → Banco Yoda, nosso banco de dados Ouro.
4. Entrega: Router → projeto Uberlândia, conforme a regra do contrato, frota + IBGE da cidade.

O fluxo segue a arquitetura do Programa de Tecnologia adotada para o deck, que diverge da divisão histórica da ADR-0002. A arquitetura desenhada não significa que a integração em tempo real já esteja implementada.

## Slide 9 — Cada contrato escolhe o que chega ao projeto

Passos: Frota do contrato → Uma cidade → Várias cidades → Polígono → Frota + cidade.

O mapa destaca quem passa em cada regra: carros do contrato onde estiverem; qualquer carro em uma cidade; uma lista de cidades; uma área desenhada; finalmente, só os carros do contrato dentro de uma cidade, por um IBGE. O último é o recorte da demo. Fonte das regras: `regras-agrupamento-por-contrato 2.html`, bloco A. A opção “Tudo” fica de fora. O rótulo “mapa ilustrativo” foi retirado; a geometria e os carros continuam sendo um desenho conceitual, não dados geográficos reais de Uberlândia.

## Slide 10 — Próximos passos

Uma etapa, dois pontos. Não há projeto real rodando com o Ilum; a demo validou componentes e regras no recorte, sem provar a operação contínua de um cliente.

**01 · Roteamento:** “Ligar o Vision e rotear os dados”. SABESP já está aguardando. Validar o fluxo e as regras no primeiro projeto real.

**02 · Expansão:** “Alinhar a expansão ao planejamento da empresa”. Faixa em lavanda com borda ameixa: “O próximo passo exige toda a empresa trabalhando na mesma direção”, com “toda a empresa” em negrito. Definir prioridades e capacidade das equipes. Dentro desse ponto, quatro cards em grade 2×2, nesta ordem: primeiros projetos (levar o Ilum à operação real), deploy automático (o Builder colocando os serviços no ar), IRI (integrar o próximo processador) e novos hardwares (conectar novas fontes de dados).

O planejamento de 12 meses orientará as próximas entregas. Não exibir datas do roadmap anterior, nomes de pessoas ou a palavra mandato. O ponto 02 explicita o alinhamento necessário para expandir; os quatro cards não são compromissos com prazo. Oracle, Prata e usuários do banco saem deste slide, sem significar que suas pendências foram resolvidas.
## Navegação e ensaio

- `?deck=ilum-demo&at=7.1` abre a comparação; avançar prepara a tela Router e avançar novamente entra no fluxo.
- `?deck=ilum-demo&at=2.4` abre o mergulho no Builder.
- As duas entradas usam `TelaParte` e `SaidaDaTela`, com `corte: true` nos slides 3 e 8.
- Teclado, botões, pontos e controle remoto respeitam o corte. Pontos e comandos remotos de slide abrem no primeiro passo; setas percorrem os passos.
- A saída da tela ameixa se repete ao revisitar Builder ou Router. Com redução de movimento, o diagrama entra diretamente.

## Preparação e alternativas

- Conferir com Marco as DAGs concluídas e os logs que serão mostrados; deixá-los abertos no segundo monitor.
- Abrir e testar o front do Bega; conferir a autenticação e o acesso ao back antes da apresentação.
- Se o login expirar, autenticar de novo. Não registrar tokens no roteiro ou em capturas.
- Deixar o guia local `docs/negocio/como-o-ilum-funciona.html`, no repositório Ilum, disponível como apoio. Em falha de rede, usar o guia e os resultados do deck.
- Tempo real: explicar que o mês carregado e as regras de envio foram validados; fotos novas chegando continuamente ainda dependem da integração.
- A versão Oracle diverge entre fontes (23ai no relatório, 26ai na passagem); os slides dizem só Oracle. Confirmar com Marco apenas se for necessário citar a versão.

Não há sinal de término do Marco, repositório a ser criado durante a fala, slide elástico para espera ou geração ao vivo.
