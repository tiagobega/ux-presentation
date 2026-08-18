# Roteiro — Informs para gestores (workshop)

Fala slide a slide do deck `src/slides/informs-workshop/`. Os números batem com
o índice do slide na esteira (`INFORMS_WORKSHOP_DECK` em
`src/slides/informs-workshop/deck.ts`). Onde há mais de um step, a fala está
separada por step.

**Público** — gestores da Intelicity que já sabem, em alto nível, o que é o
Informs. O que eles não sabem é quando usar nos projetos deles, quanto do
produto está na mão deles, como o Informs entra em um sistema que já existe,
quem procurar e onde está o limite. Também não sabem o que é PWA, então isso se
explica com o aparelho na mão, não com definição.

**Formato** — conversa, não aula. Deck em um monitor, o site novo em outro. O
tablet fica na mão com o app instalado e o PWA abertos.

| Bloco | Slides | Peso |
|---|---|---|
| Modelo mental e o que vocês controlam | 0, 1, 2, 3 | médio |
| PWA, ciclo e o site novo | 4, 5, 6 | o mais longo |
| Quando usar e quando não | 7, 8 | médio |
| Implantação, contato e fecho | 9, 10, 11 | curto |

---

## 0 · Capa

> "Hoje eu não quero apresentar o Informs do zero, porque vocês já sabem o que
> ele é. Quero mostrar como ele entra nos projetos, qual é o caminho para usar e
> onde está o limite entre parametrizar o Informs e criar outro aplicativo."

Deixe as três perguntas do workshop no ar antes de virar o slide: quando faz
sentido usar, como um projeto entra e quando a necessidade já passou do limite.

---

## 1 · O papel do Informs

**Step 1 (O modelo)**

> "É um caminho de ida e volta. O sistema de origem manda a demanda para o
> Informs, o Informs entrega para quem está na rua, e o preenchido volta pelo
> mesmo caminho."

Leia as duas faixas como contrato: **input** é demanda, template, localização,
prioridade, prazo e responsável. **Output** é respostas, fotos, horários,
autoria e status.

**Step 2 (Quem faz o quê)**

> "Se o GAIA sabe qual poste precisa ser vistoriado, ele continua dono dessa
> regra. O Informs apenas entrega essa atividade para o usuário em campo, coleta
> as respostas, as fotos e a localização, e devolve o resultado."

Feche na frase do slide: o Informs não substitui o sistema do projeto, ele
resolve a operação de campo.

---

## 2 · O que já vem pronto

Não leia os dez cartões. Escolha três que falem com a plateia e diga o resto de
uma vez.

> "Tudo isso já existe, testado, com gente usando. Cada projeto que constrói um
> app de campo do zero refaz esta lista inteira."

Fecho:

> "Usar Informs evita criar um novo app de campo para cada projeto."

---

## 3 · O que vocês controlam

O slide que responde "então o que sobra para mim?".

**Step 1 (O que vocês controlam)**

> "Tudo que define o formulário é de vocês. O template, as sessões, quais
> sessões o verificador pode duplicar, os campos, as validações, a localização,
> a prioridade, o prazo, quem executa, e até os motivos de cancelamento e o que
> cada motivo exige. Nada disso passa por um pedido ao time do Informs. É API."

Se alguém perguntar de campo novo:

> "Os tipos de campo são 10 de coleta e 4 informativos. Dentro deles vocês
> montam o que quiserem. Tipo de campo novo, aí sim, é conversa de produto."

**Step 2 (Como um projeto entra)**

> "E como um projeto novo entra? Do mesmo jeito que o GAIA já entrou. O sistema
> vira mais um na lista, publica o template pela API, cria os formulários com
> endereço, prioridade, prazo e responsável, e recebe o preenchido de volta: o
> Informs faz POST no endpoint de vocês, em lote, com checkpoint para não
> repetir e retry automático quando falha."

Fecho:

> "Isso não é promessa, é o que o GAIA faz hoje com o Apex. Sistema novo é
> configuração e contrato, não aplicativo novo."

---

## 4 · O que é PWA

Aqui o tablet entra. Não defina PWA por sigla, mostre.

> "PWA é o site que vira app. É o mesmo produto, o mesmo login, o mesmo
> formulário. O que muda é como ele chega no aparelho de quem vai a campo."

Passe o tablet com os dois abertos:

> "Neste tablet estão os dois. Um veio da loja, o outro veio de um link e virou
> ícone na tela inicial. Descubram qual é qual."

A tabela tem seis linhas. A primeira e a quinta são as que interessam ao gestor:

> "Colocar em campo, no app de loja, é publicar e esperar aprovação. No PWA é
> mandar um link. E uma correção, na loja, depende de revisão da Apple e do
> Google e de o usuário atualizar; no PWA entra no mesmo dia. Offline os dois
> funcionam igual, que é o que a rua exige."

---

## 5 · O ciclo

Sete steps, um por fase, no seu ritmo. Esta plateia já viu o fluxo em outro
workshop, então não se demonstra passo a passo: avance as fases enquanto fala e
mostre o site novo de relance ao lado.

**Steps 1 a 4 (Chega na fila · Inicia · Preenche · Foto e validação)**

> "O formulário nasce na fila, com endereço, prioridade e prazo. O verificador
> inicia e o horário fica registrado. Preenche sessão a sessão, com cada resposta
> salva no aparelho na hora. Anexa foto, e a validação acusa o erro antes do
> envio, não na conferência."

**Step 5 (Sem sinal)** — pare aqui, é a fase que interessa.

> "Se ele terminou sem sinal, o formulário fica completo e não enviado. Não se
> perde e não trava a operação."

**Steps 6 e 7 (Conexão volta · Na origem)**

> "Quando a conexão volta, sobe com as fotos, o status vira completo, e o sistema
> de origem recebe respostas, fotos, horários e autoria."

Sobre o endereço na tela:

> "Esse endereço é ambiente de teste. A URL final do produto quem define é a
> Intelicity, não o projeto."

---

## 6 · Rastreio

O slide anima sozinho, em loop de 18 segundos. Deixe rodar e fale por cima.

> "Quando o verificador inicia o percurso, o app passa a emitir a posição. Cada
> bolinha é um ping: latitude, longitude e o horário do aparelho. O GPS lê a
> cada 5 segundos ou a cada 10 metros."

Espere a janela sem sinal do loop, que é o ponto do slide:

> "Agora ele entrou numa região sem sinal. Reparem que os pings ficam laranja e
> o contador de buffer sobe. Nada se perde: fica guardado no aparelho. Quando a
> conexão volta, sobe tudo em pacote e o trajeto se completa."

Fecho:

> "E nada disso se apaga. O histórico fica guardado para sempre, então dá para
> saber a rota que a pessoa fez, o que ajuda em questões administrativas. Isso
> não é maquete de ideia, é o que já roda."

---

## 7 · A decisão

O slide é um semáforo, um step por luz. Não corra: é aqui que o gestor decide.

**Step 1 (Verde)**

> "Se o problema é levar uma regra de negócio para o campo, comece avaliando
> Informs."

Peça exemplos: "alguém aqui tem uma operação assim?"

**Step 2 (Amarelo)**

> "Amarelo não é não. É: senta com produto e arquitetura antes de prometer.
> Uma necessidade nova entra no Informs quando melhora o produto, não quando
> atende um cliente só."

**Step 3 (Vermelho)**

> "Informs é um produto, não um template infinito de aplicativos."

E a nota do limite:

> "Personalizar o formulário é esperado, é para isso que o produto existe.
> Personalizar produto, layout, marca, URL e navegação é outro escopo."

---

## 8 · Estudo de caso SGISV

Contexto rápido: app de campo de tapa-buraco para a zeladoria de pavimento de
Uberlândia, PWA Android-first, integrado ao Apex.

**Step 1 (O que caberia)**

> "Olhem a coluna verde. Executar o serviço, cancelar com motivo, justificativa,
> fotos de antes e depois, dimensões do buraco em linhas repetíveis, salvar sem
> concluir, concluir, offline e sincronização. Isso é formulário. O Informs faz
> hoje."

**Step 2 (O que passa do limite)**

> "Agora a coluna vermelha. A home é um mapa. O mapa é o produto, não uma tela
> de apoio. Pin colorido por status, busca por logradouro, satélite, ação direto
> no pin, filtros e cards próprios de OS, criação de OS com pin arrastável no
> padrão do Uber. E cerca de 5.000 OS abertas, com pico de 10.000 pontos, o que
> obriga clustering e renderização por viewport."

Fecho:

> "A execução de campo do SGISV o Informs resolve. Essa home, esse mapa e esses
> filtros já são outro produto. E tudo bem: o erro não é construir outro app, o
> erro é chamar isso de Informs e prometer que sai parametrizando."

---

## 9 · Como implementar

**Step 1 (Seis passos)**

Passe rápido pelos seis. O que importa é que existe caminho e que o passo 01
tem três saídas possíveis, inclusive "é outro app".

**Step 2 (De quem é o trabalho)**

> "Não é o time do Informs integrando o seu sistema sozinho. É uma implantação
> conjunta do time do projeto, do time do Informs e do Gates. O time do projeto
> é dono da origem dos dados e do consumo dos resultados."

---

## 10 · Quem procurar

**Step 1 (Quem começa)**

> "O gestor não precisa saber quem desenvolveu cada pedaço. Ele leva a demanda
> para um ponto de entrada só, e a triagem responde: Informs, Informs com
> evolução, ou app próprio."

**Step 2 (Quem apoia)**

> "Depois da triagem, o time do projeto define de onde vêm os dados e para onde
> voltam, o time do Informs apoia template, capacidades e contrato, e o Gates
> apoia autenticação, usuários e papéis."

Fecho: a entrada precisa ser única. Primeiro contato: Godoy, Arquitetura e
Produto.

---

## 11 · Encerramento

> "Antes de criar outro app de campo, avalie Informs. Se cabe no modelo do
> produto, reutilizamos. Se exige transformar o produto para atender um projeto
> só, construímos outra coisa, e essa conversa é de escopo, prazo e time."

Abra a conversa:

> "Agora a ideia é olhar para os projetos de vocês e entender onde o Informs
> pode reduzir desenvolvimento, padronizar campo e acelerar implantação."

---

## Perguntas que costumam vir

**"PWA funciona no iPhone?"** — Funciona, com limitações maiores que no Android.
Por isso o app de loja continua existindo: o PWA não substitui, amplia.

**"Consigo a minha marca no app?"** — Rebranding do produto está no roadmap do
Informs, e vale para todo mundo ao mesmo tempo. Marca por cliente é white-label,
e white-label é outro escopo.

**"Consigo uma URL do meu projeto?"** — A URL é do produto, não do projeto. A
URL de hoje é ambiente de teste e a oficial quem define é a Intelicity.

**"O rastreio consome bateria?"** — O GPS lê a cada 5 segundos ou 10 metros e o
envio é um ping pequeno por WebSocket. O rastreio só roda enquanto o percurso
está ativo, não o dia inteiro.

**"E se eu precisar de um mapa?"** — Mapa como apoio o Informs tem (campo
informativo de mapa, roteirização, rastreio). Mapa como interface principal do
produto é o sinal vermelho do slide 7.

**"Quanto tempo leva?"** — Depende do passo 04, a integração. O desenho do
template é rápido; o que dita o prazo é o sistema de origem criar demandas e
consumir resultados.
