import type { SlideProps } from "../config";
import { Cartao, Frame, Rotulo, Termo, delay } from "./ui";

/**
 * Slide 3 — Como vamos fazer isso acontecer?
 *
 * As frentes separadas em **interno** e **produto**, usando o vocabulário que
 * o slide 1 acabou de estabelecer: o que é base de construção não vai para o
 * cliente; o que é produto vai. Sem a separação, design system e Lens
 * apareciam com o mesmo peso, e a diretoria não tinha como saber o que dali
 * vira oferta.
 *
 * Uma etapa só: os dois blocos entram escalonados. Uma frente por passo
 * transformaria a lista numa leitura em voz alta.
 */

interface Frente {
  termo: string;
  detalhe?: string;
}

/** Base de construção: sustenta os produtos e não é entregue ao cliente. */
const INTERNO: Frente[] = [
  {
    termo: "Design system",
    detalhe: "componentes, tokens, tudo que representa a nossa identidade.",
  },
  { termo: "Padrões de front-end", detalhe: "arquitetura de projeto." },
  { termo: "Registry", detalhe: "Biblioteca de componentes documentada." },
  {
    termo: "Microfront-ends",
    detalhe:
      "Produtos carregados a partir em runtime utlizando store compartilhada.",
  },
  {
    termo: "Comunicação back e front.",
    detalhe:
      "Padrão que utiliza Open-API e mapeia parâmetros da API para serem utilizados nos escopos dos produtos.",
  },
  {
    termo: "Observabilidade e Testes (E2E)",
    detalhe: "Utilização de ferramentas para prevenção e correção de bugs.",
  },
];

/** Chega na mão do cliente: é o que a base existe para viabilizar. */
const PRODUTO: Frente[] = [
  { termo: "Lens", detalhe: "BI" },
  {
    termo: "Query",
    detalhe: "IA assistente da aplicação inteira, não mais só do mapa",
  },
];

export const ACTIONS = ["As frentes"];

function Bloco({
  rotulo,
  itens,
  colunas,
  atraso,
  destaque,
}: {
  rotulo: string;
  itens: Frente[];
  colunas: number;
  atraso: number;
  destaque?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border p-6 animate-ilum-rise motion-reduce:animate-none ${
        destaque
          ? "border-[#7c3aed] bg-[#f3ebff]"
          : "border-[#c3aadc] bg-[#ffffff70]"
      }`}
      style={delay(atraso)}
    >
      <div className="mb-4">
        <Rotulo>{rotulo}</Rotulo>
      </div>
      <div
        className="grid gap-3 max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
      >
        {itens.map((f) => (
          <Cartao
            key={f.termo}
            estado="aceso"
            className="px-5 py-4 flex flex-col items-baseline gap-2.5"
          >
            <Termo>{f.termo}</Termo>
            {f.detalhe && (
              <span className="text-[clamp(11px,0.95vw,15px)] leading-[1.35] text-[#64566f]">
                ({f.detalhe})
              </span>
            )}
          </Cartao>
        ))}
      </div>
    </section>
  );
}

export default function Slide03ComoFazer({ action: _ }: SlideProps) {
  void _;

  return (
    <Frame title="Como vamos fazer isso acontecer?">
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-5 items-start max-[900px]:grid-cols-1">
        <Bloco
          rotulo="INTERNO · COMO CONSTRUÍMOS"
          itens={INTERNO}
          colunas={2}
          atraso={0.1}
        />
        <Bloco
          rotulo="PRODUTO · O QUE O CLIENTE USA"
          itens={PRODUTO}
          colunas={1}
          atraso={0.24}
          destaque
        />
      </div>
    </Frame>
  );
}
