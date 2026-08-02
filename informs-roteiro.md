# Roteiro de apresentação — Informs

Fala slide a slide do deck `src/slides/informs/`. Os números batem com o índice
do slide na esteira (`INFORMS_DECK` em `src/slides/informs/deck.ts`). Onde há
mais de um step, a fala está separada por step.

---

## 0 · Capa

> "Este é o Informs: a plataforma que a Intelicity usa para transformar qualquer
> demanda de campo em um formulário digital, preenchido offline, rastreável e
> integrado aos sistemas de origem."

---

## 1 · O problema

Conte como cena, não como lista.

> "Imagine um moto-verificador em campo. Ele recebe uma lista de endereços para
> vistoriar. Hoje, sem o Informs, isso acontece em papel, planilha ou um app
> rígido feito para um único sistema. Cada sistema de origem tem seu próprio
> formato. Se cai a internet no meio da rua, o trabalho para ou se perde. O
> ninguém sabe onde o verificador está nem quanto falta da rota. E mudou a
> regra da vistoria? Novo projeto vira um novo desenvolvimento, novo app, nova
> release, semanas de espera."

---

## 2 · A resposta (dores → soluções)

**Step 1 (Dores)** — leia a coluna da esquerda.

**Step 2 (Como resolvemos)**

> "O Informs separa o que se pergunta, que é o template definido pelo sistema de
> origem, de como se preenche, que é o app offline no bolso do verificador."

---

## 3 · Anatomia de um formulário

**Step 1 (Campos → Sessões)**

> "Lendo de baixo para cima: campos de coleta e campos informativos são
> agrupados em sessões, e uma sessão pode ser duplicável."

**Step 2 (Template → Formulário)**

> "Sessões compõem um template, que é o molde preparado uma vez e reutilizado. E
> cada vez que atribuímos esse template a um endereço e a um verificador, nasce
> um formulário, a instância que é preenchida no campo."

O mesmo step traz os dois termos que ficam fora da pirâmide:

- **Sistema de Origem** — relaciona o template com o moto-verificador e habilita
  o preenchimento. Hoje: GAIA, Porto Alegre, Recife e SABESP.
- **Justificativa** — motivo estruturado exigido no cancelamento, que pode pedir
  texto e foto.

---

## 4 · Tipos de campo

Dez tipos de coleta (Texto, Numérico, Dropdown, Typeahead, Radio, Data,
Checkbox, Grupo de Checkbox, Switch, Arquivo) e quatro informativos (Texto,
Imagem, URL/mídia, Mapa).

> "O template combina os tipos que já existem, sem pedir campo novo ao time de
> software."

---

# Fluxo do app: como o verificador interage

## 5 · Autenticação

> "O login usa o Gates: Cognito com PKCE. A tela de senha abre em uma WebView
> embutida dentro do próprio app, então o verificador não é jogado para o
> navegador do sistema. Assim que autentica, buscamos o perfil do usuário: nome,
> e-mail, papel e placa do veículo."

---

## 6 · Listagem de formulários

> "A tela principal é a fila do dia. Uma aba por status, com contador, mais a
> aba Todos. Visão em mapa para ver o que está perto, visão em lista com busca,
> filtro, prioridade e prazo."

Prioridades: Baixa (0), Média (1), Alta (2), Crítica (3).

---

## 7 · Status

**Step 1 (Cinco status)**

> "Pendente é o atribuído e não iniciado. Ao iniciar, vira Em andamento e marca
> o horário; daqui em diante tudo é rascunho local. Enviar fecha em Completo,
> com horário de conclusão. Cancelado sai do fluxo esperado e fica registrado
> com o motivo."

**Step 2 (O laranja)**

> "Repare no laranja: Completo e não enviado. O verificador terminou, mas o
> envio está aguardando conexão. Esse status nasce no próprio app; para a API o
> formulário ainda está em andamento."

---

## 8 · Preenchimento

> "O preenchimento é sessão por sessão. Cada campo é validado na hora com Zod:
> obrigatoriedade, tamanho, faixa numérica, quantidade de fotos. Tudo o que o
> verificador digita é salvo automaticamente como rascunho no aparelho."

---

## 9 · Duplicação de sessão

> "Algumas sessões são duplicáveis. Numa vistoria com vários equipamentos, o
> verificador duplica a sessão Equipamento quantas vezes precisar, e cada
> instância guarda suas próprias respostas de forma independente."

---

## 10 · Cancelamento

> "Ao cancelar, o verificador escolhe uma justificativa, e cada motivo pode
> exigir texto e foto. Local inacessível, por exemplo, pede a foto que comprove.
> O formulário vai para Cancelado com o motivo registrado."

---

## 11 · Offline-first

**Step 1 (Fila offline)**

> "O Informs assume que a internet vai faltar. Iniciar, responder, enviar e
> cancelar funcionam sem sinal. As ações entram numa fila de sincronização
> persistida no aparelho."

**Step 2 (Sincronização)**

> "Quando a conexão volta, o app processa a fila em ordem, sozinho. A detecção
> de rede é multicamada. As fotos ficam em cache e sobem para o S3 na
> sincronização, e o formulário sai de Completo e não enviado para Completo."

---

## 12 · Roteirização

> "O verificador não precisa decidir a ordem das visitas. Ele define um ponto de
> partida, por GPS ou toque no mapa, opcionalmente um destino, e o Informs ordena
> os formulários pela rota mais curta, mostrando a distância total."

Modos: configurando, pré-visualização, navegando, concluído.

---

## 13 · Rastreio de rota

> "Durante o percurso, o app envia a posição em tempo real via WebSocket, com o
> GPS rodando em segundo plano. No Android, uma notificação fixa avisa que o
> rastreamento está ativo. Se o sinal cai, os pontos ficam em buffer e são
> enviados quando reconecta. Só o papel INSPECTOR pode iniciar o percurso."

---

# Fluxo do sistema de origem: como implantar e operar

## 14 · Criação de template

> "Um template define nome, Sistema de Origem, se está ativo, e as sessões e
> campos que o compõem. É aqui que a regra de negócio vira formulário, sem
> precisar de release do app."

---

## 15 · Criação de formulário

> "Com o template pronto, o sistema de origem gera os formulários pela API: cada
> um recebe localização, prioridade, prazo de expiração e o verificador
> responsável."

---

## 16 · Criar formulário em campo

Fecha o bloco: o slide anterior mostrou o sistema de origem gerando a demanda,
este mostra o outro caminho.

> "Nem tudo vem programado do sistema de origem. Em campo, o verificador pode
> pegar um template existente, informar endereço e localização, e criar um
> formulário ali mesmo, para a demanda que surgiu na hora."

---

## 17 · Integração

**Step 1 (Publicação)** — o sistema de origem cria e atualiza templates, gera
formulários; o app lista e baixa.

**Step 2 (Retorno)** — o app inicia, preenche, envia e transmite rastreio; o
sistema de origem consome os resultados.

> "O sistema de origem conversa com a API do Informs: publica templates, gera
> formulários e depois consome os resultados preenchidos. O app é o elo de
> campo."

---

## 18 · Implantação

> "A implantação tem duas frentes: Gates para autenticar quem usa, e a
> integração de APIs para o sistema de origem trocar templates e resultados com
> o Informs. O desenho das APIs e o cronograma, Godoy."

---

## 19 · Próximos passos

Testes da PWA, publicação na App Store, aplicação do rebranding, versão
tablet e desktop responsiva, integrar o rastreio às plataformas.

---

## 20 · Encerramento

> "O Informs já resolve o ciclo completo, do template do sistema de origem ao
> formulário enviado do campo, offline e rastreado. Os próximos passos são sobre alcance:
> mais plataformas, publicação nas lojas, identidade visual nova e o rastreio
> integrado direto aos sistemas de origem."

---

## Anexo — referência rápida de regras de negócio

- **Sistemas de origem:** GAIA, Porto Alegre, Recife e SABESP. (O enum
  `System` do app ainda lista `GAIA`, `GEOVISTA` e `SGC`; o deck segue a lista
  correta, não o enum.)
- **Status e cores (iguais ao `formStatusData` do app):** Pendente (yellow-400),
  Em andamento (sky-500), Completo e não enviado (orange-400), Completo
  (green-400), Cancelado (red-400).
- **Prioridades:** Baixa (0), Média (1), Alta (2), Crítica (3).
- **Tipos de campo (10):** Texto, Numérico, Dropdown, Typeahead, Radio, Data,
  Checkbox, Grupo de Checkbox, Switch, Arquivo.
- **Campos informativos (4):** Texto, Imagem, URL/mídia, Mapa.
- **Fila offline:** Iniciar, Responder, Enviar, Cancelar.
- **Rastreio:** WebSocket e GPS em background; só INSPECTOR inicia; buffer
  offline de pontos.
- **Roteirização:** ordena formulários por menor distância a partir de um ponto
  de partida.
