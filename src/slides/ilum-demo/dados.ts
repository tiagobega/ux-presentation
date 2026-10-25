/**
 * Os números do deck Ilum · demo, num lugar só.
 *
 * Fontes: o relatório do run de provisionamento de 25/10/2026
 * (`uberlandia-agosto-2026-2026-10-25.pdf`, run 975d1989). Ele substitui os
 * números de `ilum-demo-contexto.md`, que eram do run anterior: os bancos
 * foram refeitos do zero, e agora entram as 10.297 imagens sem trecho de
 * 10 m que antes eram recusadas (ADR-0040). E a rodada dos dois jobs sobre os
 * mesmos bancos, medida e informada pelo apresentador em 25/10.
 *
 * `null` = **a medir**. Os jobs de agrupamento e de camada ainda não rodaram
 * sobre os bancos de hoje (as duas tabelas derivadas saíram vazias, como devem
 * sair do provisionamento). Os slides mostram "a medir" no lugar, nunca um
 * número do run antigo.
 */

/** O recorte: uma cidade, um mês. */
export const RECORTE = {
  cidade: 'Uberlândia',
  ibge: '3170206',
  periodo: '01/08 a 31/08/2026',
  dias: 30,
  /** Dispositivos do contrato com imagem no recorte (de 40 vinculados). */
  aparelhos: 20,
  imagens: 544_129,
  deteccoes: 2_769_828,
  trechos10m: 763_131,
}

/** Duração total do run do banco: 16:11:27 → 16:52:30 UTC (41,1 min). */
export const BANCO_TOTAL = 2463

/**
 * O tempo, do zero ao projeto no ar, **por engine**, em segundos.
 *
 * O banco das duas engines foi provisionado **no mesmo run**, alimentado pela
 * mesma leitura do Yoda, e o run só fecha depois da validação entre as duas.
 * Cada etapa abaixo vem da seção 2 do relatório ou dos horários dele:
 *
 * - estrutura: do pedido (16:11:27) ao início da leitura do histórico,
 *   16:42:25 − 1.654 s = 16:14:51 → 204 s, comum (migrations, classes e malha);
 * - migração dos dados: até o fim da carga de cada engine (16:44 no
 *   PostgreSQL, 16:48 no Oracle; o relatório dá só o minuto) → 1.749 s e
 *   1.989 s;
 * - índices e chaves: 83 s e 169 s (seção 2);
 * - espera: o PostgreSQL termina antes e aguarda o Oracle para a validação;
 *   é o que sobra para fechar o run → 332 s no PostgreSQL, ~0 no Oracle;
 * - validação entre as engines: 95 s, uma vez, depois das duas.
 *
 * As duas somas do banco dão 2.463 s, o total do run. Os valores derivados
 * levam "~" na tela.
 *
 * Depois do banco: o repositório (~17 s) e o deploy (manual hoje; ~3 min é
 * estimativa), informados pelo apresentador, e os jobs medidos por ele
 * (agrupamento + camada). Os jobs rodaram na máquina do apresentador, com
 * ~130 ms por ida e volta até cada banco e as duas engines ao mesmo tempo:
 * é o pior caso.
 */
export const TEMPO: {
  etapa: string
  detalhe: string
  pg: number
  ora: number
  /** Valor aproximado: estimado ou derivado. Leva "~". */
  aproximado?: boolean
  /** Pertence ao banco e fica sob a chave dele. */
  banco?: boolean
  /** Tempo parado, não trabalho: desenhado tracejado. */
  espera?: boolean
}[] = [
  { etapa: 'Estrutura', detalhe: 'tabelas, classes e a malha da cidade', pg: 204, ora: 204, aproximado: true, banco: true },
  { etapa: 'Migração dos dados', detalhe: 'agosto inteiro, do Yoda para o banco', pg: 1749, ora: 1989, aproximado: true, banco: true },
  { etapa: 'Índices e chaves', detalhe: 'depois da carga', pg: 83, ora: 169, banco: true },
  { etapa: 'Espera', detalhe: 'só o PostgreSQL, aguardando o Oracle', pg: 332, ora: 0, aproximado: true, banco: true, espera: true },
  { etapa: 'Validação', detalhe: 'contagem e conteúdo, entre as duas', pg: 95, ora: 95, banco: true },
  { etapa: 'Repositório', detalhe: 'código base do back', pg: 17, ora: 17, aproximado: true },
  { etapa: 'Deploy', detalhe: 'manual hoje, tempo estimado', pg: 180, ora: 180, aproximado: true },
  { etapa: 'Jobs', detalhe: 'agrupamento e camada', pg: 1201, ora: 2329 },
]

/** Dentro da migração, o trecho que pesa: a leitura do Yoda (seção 2; DT-11). */
export const LEITURA_DO_YODA = 1654

/** O que os jobs entregam: os pontos que o mapa mostra, iguais nas duas engines. */
export const PONTOS_NO_MAPA = 399_068

type PorEngine = { nome: string; pg: number; ora: number }

/**
 * O resultado nas duas engines: contagem inteira por tabela (seção 3 do
 * relatório) e, para as tabelas derivadas, a rodada dos jobs. Tem de ser
 * igual linha por linha; é a prova do slide 5.
 */
export const RESULTADO: PorEngine[] = [
  { nome: 'Linhas recusadas', pg: 0, ora: 0 },
  { nome: 'Imagens', pg: 544_129, ora: 544_129 },
  { nome: 'Detecções', pg: 2_769_828, ora: 2_769_828 },
  { nome: 'Trechos de 10 m', pg: 763_131, ora: 763_131 },
  { nome: 'Grupos', pg: 399_077, ora: 399_077 },
  { nome: 'Pontos na camada', pg: 399_068, ora: 399_068 },
]

export const fmt = (n: number) => n.toLocaleString('pt-BR')

/** "41,1 min", "17 s", "1 h 04 min". */
export function duracao(s: number) {
  if (s < 60) return `${s} s`
  if (s >= 3600) {
    const min = Math.round(s / 60)
    return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')} min`
  }
  const min = s / 60
  return `${min.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} min`
}
