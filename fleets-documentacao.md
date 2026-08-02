# Fleets — Documentação de apoio

> Referência completa da apresentação. Se você se perdeu durante a demo, leia aqui: cada seção corresponde a um slide/fluxo.
> Terminologia validada contra o código e os `docs/` do projeto.
>
> **Índice**
> 1. Ecossistema · 2. Usuários e permissões · 3. Glossário · 4. Fluxos (4.1 a 4.9) · 5. Próximos passos

---

## 1. Ecossistema

O Fleets liga o mundo físico (hardware nos veículos) ao operacional (contratos, pessoas, pagamentos).

- **Hardware em campo:** dispositivos IoT — **JETSON** (captura de imagens) e **GEOBOX** (rastreamento GPS) — instalados nos veículos.
- **Ingestão de telemetria:** GPS e imagens Jetson entram pela **Ingestor API** (fluxo separado do backend principal), em tempo quase real.
- **Plataforma Fleets (web):** onde a operação gerencia dispositivos, pessoas, contratos e pagamentos, e visualiza a telemetria.
- **Autenticação:** delegada ao **GatesAuth (Cognito)**, via OAuth2/JWT.
- **Autorização:** **CASL**, calculada a partir do `role` do perfil, espelhando o backend, com máscara de LGPD.

Fluxo do dado: **Campo (devices) → Ingestor → Fleets → Usuários**. O mapa, as metas e os pagamentos se alimentam dessa telemetria.

---

## 2. Usuários e permissões

Cinco perfis (CASL). "Dado sensível" = CPF, RG, telefone, endereço e dados de pagamento — mascarados pela própria API para quem não pode ver.

| Perfil | O que faz | Dado sensível (LGPD) |
|---|---|---|
| **ADMIN** | Gerencia tudo, incluindo Configuração e usuários da plataforma | Vê em claro |
| **MANAGER** | Gerencia a operação: dispositivos, veículos, pessoas, contratos, pagamentos, configuração | Vê em claro |
| **OPERATOR** | Cria/edita e **instala/desinstala**; **não deleta**; não acessa configuração | 🔒 Mascarado |
| **VIEWER** | Somente leitura | 🔒 Mascarado |
| **DRIVER** | Lê seus dispositivos, veículos e pagamentos | 🔒 Mascarado |

- `manage` = create + read + update + delete (+ install/uninstall para dispositivos).
- **Delete** é privilégio de MANAGER/ADMIN.
- O **role** é resolvido no login e injetado em toda a árvore de rotas: ele decide desde os itens do menu até os botões visíveis.
- O perfil **DRIVER** hoje tem leitura restrita e é a base do futuro **app do motorista**.

---

## 3. Glossário

> Seção mais importante. Sem esse vocabulário, os fluxos não fazem sentido.

### Contrato — cuidado: são dois conceitos
- **Contrato de dados** (`device_contract_person` / DCP): diz **para onde o dispositivo manda dados**.
  - Vários por dispositivo, **opcional** (bancada/teste não tem), **sem valor financeiro**.
- **Centro de custo** (`colaborator_contract`): diz **de onde sai o pagamento de uma pessoa**.
  - **Um ativo por pessoa**, com **valor mensal** e **metas**.
- Na UI, os tipos `MOBILE`/`FIXED` aparecem como **"Veículo"** / **"Fixo"**.

> Frase de ouro: *"contrato de dados é para onde o device manda dado; centro de custo é de onde sai o pagamento da pessoa."*

### Centro de custo
- É **um** dos contratos, usado como **contrato pagador** de uma pessoa.
- **Máximo um ativo por pessoa** — o backend rejeita um segundo ativo.
- **Editar mantém histórico:** encerra o período atual (`ended_at`) e abre um novo.
- Carrega `value_cents` (valor mensal) e as **metas**.

### Meta
- Objetivo **por tipo de dispositivo**: **KM** (GeoBox) ou **imagens** (Jetson).
- Mora dentro do centro de custo.
- É a **régua do pagamento**: a barra de progresso do mês compara a **telemetria real × meta** do vínculo ativo.
- Exemplo: motorista com meta de X km/mês → o sistema soma os km rodados pela GeoBox dele no mês e mostra o quanto bateu.

### Colaborador (pessoa)
- É a **pessoa** (motorista/colaborador) e o **identificador primário na UX** — a operação procura "o equipamento do fulano", não "o veículo X".
- É **proprietário** de veículos e tem **um centro de custo ativo**.
- Tem status (ativo/inativo/demitido) e dados pessoais protegidos por LGPD.

### Veículo
- Placa, modelo e **tipo**; pertence a **uma pessoa**.
- É onde o dispositivo é **instalado** — o elo físico entre hardware e pessoa.

### Dispositivo
- Hardware IoT com **serial único** (ex.: `JETSON_000001`), **tipo** (JETSON, GEOBOX), **versão**, firmware e **chip**.
- Tem uma **condição** operacional, **ortogonal à instalação** (diz *em que estado está*, não *onde está*).

### Condição do dispositivo
| Condição | Significado | Instala? |
|---|---|---|
| **Disponível** | Operacional, pronto para uso | ✅ |
| **Em teste** | Bancada ou veículo de sócio/colaborador | ✅ |
| **Em manutenção** | Em assistência, retorno esperado | ❌ |
| **Com defeito** | Quebrado, aguardando avaliação | ❌ |
| **Perdido** | Extraviado ou roubado (terminal) | ❌ |
| **Baixado** | Fim de vida, descartado (terminal) | ❌ |

- Só **Disponível** e **Em teste** permitem instalar.
- **Perdido** e **Baixado** são **terminais**: aplicá-los encerra a instalação e os vínculos ativos.

### Versão do dispositivo
- Variação de hardware **abaixo do tipo** (ex.: JETSON v1, v2).
- Pode ter **flag de alerta visual** para destacar versões problemáticas.
- Gerenciada por tipo, com botão para criar nova versão.

### Instalação e desinstalação — e o impacto nos dados
- **Instalar** cria o vínculo device↔veículo (`device_installation`) com `started_at`; opcionalmente já vincula contratos de dados.
- **Desinstalar** define `ended_at` e mantém o histórico.
- **Impacto:** só um dispositivo **instalado num veículo que pertence a uma pessoa** gera telemetria **atribuível**. É isso que alimenta o **mapa**, as **metas** e o **pagamento**. Instalação errada = dado órfão = meta e pagamento errados.

### Chip
- O **chip 4G** que dá conectividade às Jetsons (a "linha").
- Cadastrado em Configuração e vinculado ao dispositivo.

### Alerta
- Sinal de **hardware pedindo atenção** (ex.: inoperante), derivado da **telemetria/ingestão**.
- Fica com status **OPEN** até ser resolvido; o menu mostra **badge com a contagem**.
- Base do futuro push no app do motorista.

---

## 4. Fluxos

### 4.1 Autenticação e primeiro login
- Login delegado ao **GatesAuth (Cognito)** via OAuth2 (redirect + JWT).
- No retorno, o app troca o *authorization code* por tokens e faz `POST /auth/login` para carregar o **perfil** (id, nome, email, **role**).
- O **role** define o **CASL ability**, calculado uma vez e injetado em toda a árvore de rotas privadas.
- **Primeiro login:** no primeiro acesso, o backend cria/vincula o perfil a partir do `idToken`; sem perfil válido, sem acesso às rotas privadas.
- Token expira → interceptor faz **refresh automático**; se falhar, desloga e volta para `/auth`.

### 4.2 Populando a aplicação
Antes de operar, ADMIN/MANAGER semeiam os cadastros base (em Configuração):
- **Usuários** da plataforma e seus papéis (ver primeiro login em 4.1).
- **Tipos de Veículo** (ex.: ônibus, carga).
- **Tipos de Contrato** (inclui a distinção que aparece como "Veículo"/"Fixo").
- **Status de Contrato** (ativo, encerrado…).
- **Tipos de Colaborador** (classes usadas na filtragem/cadastro).
- **Chips** (chips 4G disponíveis para vincular às Jetsons).

### 4.3 Contrato
- **Criar:** cadastro do contrato (tipo, status, localização).
- **Listagem:** contratos com dados e status.
- **Detalhe (abas):**
  - **Dispositivos** — quais dispositivos geram dados para este contrato (contrato de dados).
  - **Colaboradores** — quem tem este contrato como **centro de custo** (com metas/valor).
  - **Pagamentos** — extrato de pagamentos ligados ao contrato.

### 4.4 Colaboradores e Veículos
- **Filtros de listagem:** busca por **colaborador** ou **placa**; itens por página; **tipo de colaborador**; **contrato**; **status**.
- **Modos de visualização:**
  - **Card** — leitura rápida, pessoa em destaque.
  - **Tabela** — densidade e comparação.
  - **Mapa** — *por que existe:* posicionar geograficamente pessoas/veículos e cruzar com a telemetria dos dispositivos (onde a operação acontece de fato).
- **Criar veículo e colaborador:** pela sheet de criação.
- **Ações (página e sheet):**
  - Detalhar pessoa e veículo.
  - **Instalar** / **Desinstalar** dispositivo.
  - **Gerenciar centro de custo** — criar/editar/encerrar o vínculo pagador (um ativo por pessoa; editar encerra o atual e abre novo).
  - **Visualizar pagamentos** (extrato da pessoa).
- **UX:** nome da pessoa primeiro (destaque), veículo como secundário.

### 4.5 Dispositivos
- **Visualizações:**
  - **Mapa** — GPS da GeoBox + capturas da Jetson, mostrando **todos os devices do mesmo veículo**; range de datas pelo mês selecionado.
  - **Tabela** — lista operacional.
- **Filtros:**
  - **Tipo** (JETSON, GEOBOX…).
  - **Versões** de dispositivo.
  - **Busca por serial**.
  - **Adicionais:**
    - **Condição** — Operacional (Disponível), Em manutenção, Com defeito, Perdido _(conjunto canônico completo: Disponível, Em teste, Em manutenção, Com defeito, Perdido, Baixado)_.
    - **Instalação** — Todos · Com instalação · Sem instalação (separa "estoque" de "campo").
    - **Contrato**.
- **Ações:**
  - **Criar versão** (nova versão sob um tipo).
  - **Criar dispositivo**.
  - **Detalhar** (painel de preview com contexto de instalação: pessoa → veículo).
  - **Instalar** / **Desinstalar**.
  - **Vincular um chip**.
  - **Vincular contrato** (contrato de dados).
  - **Ver histórico de atividades** (fabricação, manutenção, inspeção…).
  - **Histórico de instalações**.
  - **Instalação em lote** (vários dispositivos em um veículo de uma vez).
- **Regra:** instalar exige condição Disponível/Em teste.

### 4.6 Coleta em campo — [PENDENTE / A CONFIRMAR]
> ⚠️ Módulo novo, ainda **não mapeado no código** desta versão. Preencher quando o fluxo estiver fechado.
>
> A definir com o time: quem usa (perfil), se é mobile, o que é coletado, se conecta com a Jetson, e se gera atividade/alerta.

### 4.7 Pagamentos
- **Filtros:** **Contrato** e **Mês**.
- **Ações:**
  - **Pagar um usuário** (individual).
  - **Pagar em lote** (fecha o mês de vários motoristas de uma vez).
  - **Exportar** (para financeiro/auditoria).
- A tela cruza os **centros de custo ativos** com os **pagamentos do mês** para identificar quem está **pendente**.

### 4.8 Alertas (beta)
- **Filtros:** por status/tipo do alerta.
- **Ações:**
  - **Detalhar alerta** (sheet com o contexto do dispositivo).
  - **Resolver alerta** (tira do OPEN).
- **Beta:** fonte e regras ainda amadurecendo; é a semente do monitoramento proativo.

### 4.9 Dashboards (para gestores)
- **KPIs** — saúde da operação num olhar.
- **Comparação de frota** entre contratos/centros de custo.
- **Metas × realizado** — progresso de KM/imagens no mês.
- **Distribuição por tipo de dispositivo** e evolução diária.
- Mensagem: o dado da operação vira indicador **sem ninguém montar planilha**.

---

## 5. Próximos passos

| Iniciativa | O que é / por que |
|---|---|
| **Heartbeat** | Sinal de vida contínuo do hardware — base para disponibilidade real e alertas confiáveis. |
| **Gerenciamento de estoque de hardware** | Controlar o device antes do campo (Disponível/Em teste): entradas, saídas, disponibilidade. |
| **Melhorias de fluxos** | Reduzir atrito nos caminhos mais usados da aplicação. |
| **Aplicativo do motorista** | Metas, notificações de hardware inoperante e suporte, na mão do DRIVER (perfil já existe). |
| **Integração N100 / Câmeras** | Novos tipos de dispositivo — o registry de tipos/layers já está pronto para recebê-los. |
| **QR Codes de hardware** | Identificar e puxar o device na hora, em campo. |
| **Fluxo assistido de instalação** | A própria Jetson confirma a instalação correta e fecha o ciclo, eliminando erro humano. |
| **Dashboard em TV 55"** | Dispositivos funcionando em tempo real ("stream") no painel da operação. |

Amarração com as dores da abertura:
- **Heartbeat + estoque** → visibilidade real do hardware.
- **App do motorista + QR + instalação assistida** → matar erro humano e melhorar a experiência.
- **N100/câmeras + TV** → ampliar alcance e presença.
