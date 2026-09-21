# Ilum — roteiro de trabalho

Quatro slides, sem capa adicional. Navegação por setas, etapas e controle remoto herdados do apresentador. Ilum é o deck padrão; `?deck=informs` e os decks Fleets continuam disponíveis.

1. Arquitetura atual: apresentar o conjunto, depois destacar ingestão, armazenamento em dois ambientes, carga sobre o Yoda, aplicações e identidade, e integração LLM. As conexões são esquemáticas a partir dos relatos, não inventário técnico validado. O problema de identidade é a ausência de padrão comum para integrar produtos às plataformas. Não afirmar acesso desprotegido indiscriminadamente.
2. Estrutura proposta: Ilum nomeia a iniciativa completa. Explicar responsabilidades e a composição por plataformas, produtos reutilizáveis e serviços específicos. Lens, mapas e APIs ainda precisam de interfaces e posição detalhadas. Ganhos são esperados, não resultados medidos.
3. Planejamento: horizonte de seis meses proposto. Preencher início real, entregas existentes, datas, capacidade e critérios. Não presumir alinhamento de toda a equipe. Uberlândia é POC da estrutura independente de cliente.
4. Dificuldades, riscos e limites: discutir inventário, capacidade e adoção; confirmar mitigação e escopo de hardware e backup. Atribuições de pessoas e entrada de demandas são definidas pelo organograma de Angelo. O slide apenas explicita responsabilidades necessárias.

Fonte da implementação: branch informs, apresentação mais recente no repositório local. Conteúdo central em src/slides/ilum/deck.tsx; estilos isolados em ilum.css.
