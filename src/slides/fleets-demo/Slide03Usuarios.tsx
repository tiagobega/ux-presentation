import { motion } from "motion/react";
import type { SlideProps } from "../config";
import { MODULOS, PERFIS } from "../../data/fleets";
import { SlideShell, SlideHeader, Accent, up, easeIn } from "./kit";
import { AlertTriangle } from "lucide-react";

/**
 * Matriz módulo × perfil, na ordem de `MODULOS` e `PERFIS`.
 * Regras conforme `fleets-documentacao.md § 2`: `manage` = criar + ler + editar
 * + excluir (+ instalar); excluir é privilégio de MANAGER/ADMIN; OPERATOR não
 * entra em Configuração; DRIVER só lê o que é dele.
 */
type Nivel = "gerencia" | "edita" | "ve" | "proprio" | "nada";

const NIVEL_LABEL: Record<Nivel, string> = {
  gerencia: "Gerencia",
  edita: "Cria e edita",
  ve: "Apenas Visualização",
  proprio: "Só os seus",
  nada: "—",
};

const NIVEL_ESTILO: Record<Nivel, string> = {
  gerencia: "border-purple/35 bg-purple/[0.1] text-purple font-semibold",
  edita: "border-purple/20 bg-purple/[0.05] text-purple/75",
  ve: "border-text/10 bg-black/[0.02] text-black/80",
  proprio: "border-dashed border-purple/30 bg-purple/[0.03] text-black/80",
  nada: "border-transparent text-red-600 font-bold",
};

/** Célula com texto próprio (ex.: o poder de instalar do OPERATOR). */
interface Celula {
  nivel: Nivel;
  label?: string;
}

const c = (nivel: Nivel, label?: string): Celula => ({ nivel, label });

// Uma linha por módulo, na ordem do menu; uma coluna por perfil.
const MATRIZ: Celula[][] = [
  // Dashboard — ninguém "gerencia" um painel: é leitura.
  [c("ve"), c("ve"), c("ve"), c("ve"), c("nada")],
  // Dispositivos
  [
    c("gerencia"),
    c("gerencia"),
    c("edita", "Cria, edita e instala"),
    c("ve"),
    c("proprio"),
  ],
  // Alertas
  [c("gerencia"), c("gerencia"), c("edita", "Resolve"), c("ve"), c("nada")],
  // Colaboradores & Veículos
  [
    c("gerencia"),
    c("gerencia"),
    c("edita", "Cria, edita e instala"),
    c("ve"),
    c("proprio"),
  ],
  // Contratos
  [c("gerencia"), c("gerencia"), c("edita"), c("ve"), c("nada")],
  // Pagamentos
  [c("gerencia"), c("gerencia"), c("edita"), c("ve"), c("proprio")],
  // Configuração
  [c("gerencia"), c("gerencia"), c("nada"), c("nada"), c("nada")],
];

const COLS = "grid-cols-[290px_repeat(5,minmax(0,1fr))]";

/**
 * Abertura em persiana na transversal: cada célula é uma lâmina que gira a
 * partir do topo, e o atraso vem da diagonal (linha + coluna) — a onda varre
 * do canto superior esquerdo até o inferior direito.
 *
 * A linha de cabeçalho é a linha 0 e a coluna do módulo é a coluna 0, então
 * elas entram na mesma onda em vez de virem antes por conta própria.
 */
const SLAT_BASE = 0.2;
const SLAT_STEP = 0.055;

const slat = (linha: number, coluna: number) => ({
  initial: { opacity: 0, rotateX: -65, transformPerspective: 900 },
  animate: { opacity: 1, rotateX: 0, transformPerspective: 900 },
  transition: {
    duration: 0.45,
    ease: easeIn,
    delay: SLAT_BASE + (linha + coluna) * SLAT_STEP,
  },
});

export default function Slide03Usuarios({ action: _ }: SlideProps) {
  void _;
  return (
    <SlideShell className="gap-6">
      <SlideHeader
        eyebrow="Usuários e permissões"
        title={
          <>
            Quem pode ver e <Accent>fazer o quê.</Accent>
          </>
        }
      />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-1.5">
        {/* cabeçalho: os 5 perfis — linha 0 da onda */}
        <div className={`grid ${COLS} gap-2 items-end px-1`}>
          <motion.div
            {...slat(0, 0)}
            className="font-mono tracking-[0.16em] text-purple uppercase pb-2 origin-top"
          >
            Módulo
          </motion.div>
          {PERFIS.map((p, ci) => (
            <motion.div
              key={p.key}
              {...slat(0, ci + 1)}
              className="flex items-center gap-2 pb-2 origin-top"
            >
              <p.Icon className="size-6 text-purple/50 shrink-0" />
              <span className="font-mono  tracking-[0.1em] text-text/70">
                {p.key}
              </span>
            </motion.div>
          ))}
        </div>

        {MODULOS.map((m, li) => (
          <div key={m.nome} className={`grid ${COLS} gap-2 items-stretch`}>
            <motion.div
              {...slat(li + 1, 0)}
              className="flex items-center gap-3 border border-text/10 bg-black/[0.02] px-5 py-4 origin-top"
            >
              <m.Icon
                className="size-6 text-purple/50 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[19px] font-semibold text-text/85 tracking-[-0.01em] leading-[1.15]">
                {m.nome}
              </span>
            </motion.div>

            {MATRIZ[li].map((cel, ci) => (
              <motion.div
                key={PERFIS[ci].key}
                {...slat(li + 1, ci + 1)}
                className={`border flex items-center justify-center px-3 py-4 text-center text-[17px] leading-[1.2] origin-top ${
                  NIVEL_ESTILO[cel.nivel]
                }`}
              >
                {cel.label ?? NIVEL_LABEL[cel.nivel]}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center ">
        <motion.div
          {...up(1.15, easeIn)}
          className="border border-purple/25 bg-purple/6 shadow-md rounded-2xl text-center px-8 py-4 flex flex-col items-center gap-4 max-w-[30vw]"
        >
          <div className="flex flex-col gap-2 items-center animate-pulse">
            <AlertTriangle className="text-purple " />
            <span className="font-mono text tracking-[0.16em] text-purple uppercase shrink-0">
              Dados sensíveis
            </span>
          </div>
          <span className="text-[19px] text-text/75 leading-[1.35]">
            CPF, RG, telefone, endereço e dados de pagamento aparecem em claro{" "}
            <span className="font-semibold text-text">
              só para ADMIN e MANAGER
            </span>
            . para os outros perfis esses dados chegam mascarados.
          </span>
        </motion.div>
      </div>
    </SlideShell>
  );
}
