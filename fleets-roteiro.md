# Fleets — ROTEIRO DO APRESENTADOR

> Como usar: **Monitor 1** = slides (arquivo `fleets-slides.md`). **Monitor 2** = aplicação ao vivo.
> `🎤` = o que falar. `🖥️ DEMO` = virar o foco para o monitor 2 e executar os passos.
> `📖` = se precisar aprofundar/alguém perguntar, a resposta está na `fleets-documentacao.md` (seção citada).
> Números batem com os slides.

---

### Slide 1 — Capa
🎤 "Fleets é onde hardware em campo, operação e pagamento vivem no mesmo lugar. Hoje vou mostrar por que ele existe, o vocabulário da plataforma, e depois os fluxos ao vivo."
🎤 Combinar a dinâmica: "slides aqui de apoio, a aplicação de verdade no outro monitor."

---

### Slide 2 — Por que existe (trágica história)
🎤 Contar a dor da planilha, três pontos:
1. Não escala a gestão de campo — qual veículo, qual instalação, qual device em quem, tudo em células.
2. Não conversa com sistema — bancos e plataformas sofriam pra extrair visibilidade.
3. Não tem regra de negócio — exportava dado quebrado (vínculo inconsistente, meta sem centro de custo).
🎤 Fechar: "o dado nascia sujo e virava problema lá na frente."

---

### Slide 3 — O que resolvemos (linda história)
🎤 Espelhar os três pontos: fonte única de verdade; regra de negócio no lugar (o sistema impede o erro); visibilidade real (telemetria, condição, metas, pagamento); rastreabilidade (tudo com período e histórico).
🎤 Frase-âncora: "saímos de 'planilha que exporta erro' para 'plataforma que impede o erro'."

---

### Slide 4 — Ecossistema
🎤 Percorrer o diagrama: device em campo → **Ingestor API** (GPS e imagens) → **Fleets web** → usuários. Auth pelo **GatesAuth (Cognito)**, permissão por **CASL**.
🎤 Plantar a semente: "o mapa e as metas se alimentam dessa telemetria."
📖 `Documentação › 1. Ecossistema`

---

### Slide 5 — Usuários
🎤 Passar os 5 perfis rápido: ADMIN (tudo), MANAGER (operação + vê dado sensível), OPERATOR (cria/edita/instala, não deleta, dado mascarado), VIEWER (leitura), DRIVER (leitura restrita → base do futuro app).
🎤 Destacar LGPD: CPF/RG/telefone/endereço/pagamento só em claro para MANAGER/ADMIN — a própria API mascara.
📖 `Documentação › 2. Usuários e permissões`

---

### Slide 6 — Glossário
🎤 **Momento mais importante.** Ir devagar; sem esse vocabulário o resto não cola. Definir com as próprias palavras:
- **A pegadinha dos dois contratos:** _contrato de dados_ = pra onde o device manda dado (vários, sem valor). _Centro de custo_ = de onde sai o pagamento da pessoa (um por pessoa, com valor + metas).
- **Meta:** objetivo por tipo de device (KM na GeoBox, imagens na Jetson); mora no centro de custo; é a régua do pagamento.
- **Colaborador:** a pessoa; identificador primário na UX; dono de veículos.
- **Veículo:** onde o device é instalado; pertence a uma pessoa.
- **Dispositivo:** hardware IoT (JETSON/GEOBOX) com serial, tipo, versão, chip e **condição**.
- **Condição:** Disponível · Em teste · Em manutenção · Com defeito · Perdido · Baixado. Só Disponível/Em teste instala.
- **Instalação:** amarra device↔veículo; é o que torna a telemetria **atribuível** (alimenta mapa, meta e pagamento).
- **Chip:** o 4G da Jetson.
- **Alerta:** hardware pedindo atenção, vindo da telemetria.
🎤 Guardar a frase de ouro: "contrato de dados é pra onde o device manda dado; centro de custo é de onde sai o pagamento."
📖 `Documentação › 3. Glossário` (mandar quem se perder ler essa seção)

---

## Abertura da demo (transição)
🎤 "A partir daqui, olhem para o outro monitor — vou mostrar na aplicação. Os slides ficam só sinalizando onde estamos."

---

### Slide 7 — Autenticação `🖥️ DEMO`
🖥️ Mostrar a tela de login → entrar pelo GatesAuth → cair na home.
🎤 Enquanto carrega: token JWT, perfil carregado no `POST /auth/login`, e o **role** define o CASL — "reparem que o menu muda conforme o perfil."
🎤 Se sobrar tempo: mostrar que um item de menu some sem permissão.
📖 `Documentação › 4.1 Autenticação e primeiro login`

---

### Slide 8 — Populando a aplicação `🖥️ DEMO`
🖥️ Ir em Configuração e passear pelos cadastros base: Usuários, Tipos de Veículo, Tipos de Contrato, Status de Contrato, Tipos de Colaborador, Chips.
🎤 No item Usuários, explicar o **primeiro login**: o perfil é criado/vinculado no primeiro acesso via `idToken`; sem perfil, sem rota privada.
🎤 Mensagem: "antes de operar, alguém semeia esses cadastros."
📖 `Documentação › 4.2 Populando a aplicação`

---

### Slide 9 — Contrato `🖥️ DEMO`
🖥️ Criar um contrato (tipo, status, localização). Abrir a listagem.
🖥️ Abrir o detalhe e percorrer as 3 abas: **Dispositivos** (o que gera dado pro contrato), **Colaboradores** (quem tem esse contrato como centro de custo, com meta/valor), **Pagamentos** (extrato).
🎤 Reforçar a distinção contrato de dados × centro de custo aqui, ao vivo.
📖 `Documentação › 4.3 Contrato`

---

### Slide 10 — Colaboradores e Veículos `🖥️ DEMO`
🖥️ Mostrar os **filtros**: busca por colaborador/placa, itens por página, tipo de colaborador, contrato, status.
🖥️ Alternar os 3 **modos**: Card → Tabela → **Mapa** (explicar por que o mapa existe: posicionar pessoa/veículo e cruzar com a telemetria).
🖥️ Criar um veículo + colaborador pela sheet.
🖥️ No detalhe, mostrar as ações: detalhar pessoa/veículo, **instalar/desinstalar**, **gerenciar centro de custo** (um ativo por pessoa; editar encerra e abre novo), **ver pagamentos**.
🎤 Reforçar UX: nome da pessoa primeiro, veículo secundário.
📖 `Documentação › 4.4 Colaboradores e Veículos`

---

### Slide 11 — Dispositivos `🖥️ DEMO`
🖥️ **Visualizações:** Tabela e **Mapa** (GPS GeoBox + capturas Jetson; devices do mesmo veículo; range pelo mês).
🖥️ **Filtros:** tipo, versões, busca por serial; adicionais → **Condição** (Operacional/Manutenção/Defeito/Perdido), **Instalação** (Todos/Com/Sem), **Contrato**.
🖥️ **Ações:** criar versão, criar dispositivo, detalhar (painel de preview com pessoa→veículo), **instalar/desinstalar**, **vincular chip**, **vincular contrato**, **histórico de atividades**, **histórico de instalações**, **instalação em lote** (vários devices num veículo).
🎤 Amarrar: "instalar exige condição Disponível/Em teste; o filtro de instalação separa estoque de campo."
📖 `Documentação › 4.5 Dispositivos`

---

### Slide 12 — Coleta em campo `🖥️ DEMO` — [A CONFIRMAR]
🎤 ⚠️ Módulo novo, ainda não mapeado no código. **Definir com o time antes da apresentação** o que mostrar aqui.
🖥️ (Preencher os passos da demo quando o fluxo estiver fechado.)
📖 `Documentação › 4.6 Coleta em campo` (marcada como pendente)

---

### Slide 13 — Pagamentos `🖥️ DEMO`
🖥️ Filtrar por **Contrato** e **Mês**.
🖥️ Ações: **pagar individual**, **pagar em lote** (fecha o mês de vários), **exportar**.
🎤 Explicar: a tela cruza centros de custo ativos com pagamentos do mês → mostra quem está pendente.
📖 `Documentação › 4.7 Pagamentos`

---

### Slide 14 — Alertas (beta) `🖥️ DEMO`
🖥️ Mostrar a lista (badge de OPEN no menu), filtros, **detalhar** um alerta e **resolver**.
🎤 Ser honesto: "beta — fonte e regras ainda amadurecendo; é a semente do monitoramento proativo."
📖 `Documentação › 4.8 Alertas`

---

### Slide 15 — Para gestores (dashboards) `🖥️ DEMO`
🎤 Trocar o chapéu: "agora é conversa de decisão, não de operação."
🖥️ Mostrar KPIs, comparação de frota entre contratos, metas × realizado, distribuição por tipo, evolução diária.
🎤 Mensagem: "o dado da operação vira indicador sem ninguém montar planilha."
📖 `Documentação › 4.9 Dashboards`

---

### Slide 16 — Próximos passos
🎤 Amarrar cada item à dor da abertura:
- **Heartbeat** e **estoque** → visibilidade real do hardware.
- **App do motorista**, **QR Code**, **instalação assistida** → matar erro humano e melhorar experiência.
- **N100/câmeras** e **TV 55"** → ampliar alcance e presença.
🎤 Destacar: o registry de tipos já está pronto para receber N100/câmeras; o perfil DRIVER já existe para o app.
📖 `Documentação › 5. Próximos passos`

---

### Slide 17 — Perguntas
🎤 Recolocar a tese em uma frase: "fonte única de verdade que impede o erro e dá visibilidade — e o roadmap fecha o ciclo entre o físico e o operacional."
🎤 Abrir para perguntas. Se travar em vocabulário, apontar a documentação (glossário).
