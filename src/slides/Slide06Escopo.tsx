import { motion } from "motion/react";
import type { SlideProps } from "./config";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

const dsDeliverables = [
  "Auditoria do que existe hoje — componentes, padrões e inconsistências mapeados",
  "Tokens de design — cores, tipografia, espaçamentos, bordas, sombras e grid",
  "Biblioteca de componentes — botões, inputs, tabelas, cards, modais, filtros, mapas, gráficos",
  "Padrões de interação — estados, animações e comportamentos documentados",
  "Guia de uso — exemplos de aplicação correta e incorreta por componente",
];

const modules = [
  { name: "Config · CRUDs", focus: "Cinco telas de configuração gerencial. Revisar consistência com o design system.", badge: "sd", status: "Pronto · revisar" },
  { name: "Users & Roles", focus: "Perfil Motorista sem fluxo específico — precisa ser desenhado do zero.", badge: "sd", status: "Pronto · revisar" },
  { name: "Person", focus: "Busca por nome/CPF/placa, filtro por contrato, dispositivos, custo, histórico, metas.", badge: "sp", status: "Parcial · completar" },
  { name: "Vehicles", focus: "Mapa com pins por veículo, camadas por dispositivo, heartbeat e gráficos de saúde.", badge: "sp", status: "Mapa pendente" },
  { name: "Devices · Listagem", focus: "Geolux, GeoGuard e Camera precisam de fluxo específico de criação.", badge: "sp", status: "Parcial" },
  { name: "Devices · Detalhes", focus: "Histórico do dispositivo, chip 5G, streaming GeoGuard, notificações e alertas.", badge: "sp", status: "Parcial" },
  { name: "Contratos", focus: "Filtros por tipo, status e cidade.", badge: "sd", status: "Pronto · expandir" },
  { name: "Pagamentos", focus: "Histórico filtrável, extrato, exportação Excel e PDF formatado.", badge: "sp", status: "Parcial · completar" },
  { name: "Dashboards e Reports", focus: "Gráficos temporais, TV 55'', controle remoto via QR e microfone.", badge: "sn", status: "Alta prioridade" },
  { name: "Motorista", focus: "Landing, wizard de inscrição, agendamento, contrato digital, área logada, notificações.", badge: "sn", status: "Do zero · produto novo" },
  { name: "Funcionalidades Gerais", focus: "Wizard de instalação, QR code, alertas de desvio, cookies, LGPD.", badge: "sn", status: "Do zero · transversais" },
];

const deliverables = [
  {
    num: "1",
    title: "Protótipo Figma navegável",
    tag: "por módulo",
    body: "Telas completas com todos os fluxos, estados e variantes. Navegável para validação interna e apresentação ao cliente antes de uma linha de código.",
  },
  {
    num: "2",
    title: "Especificações para dev — handoff",
    tag: "por módulo",
    body: "Anotações com medidas, estados, variantes e comportamentos. O dev abre e executa — sem reunião de alinhamento, sem dúvida sobre o que fazer.",
  },
  {
    num: "3",
    title: "Descoberta por módulo quando necessário",
    tag: "módulos novos e complexos",
    body: "Para módulos novos ou complexos — Motorista, Dashboards, campo — entrevistas com os perfis reais antes de projetar. Persona e journey map documentados.",
  },
];

const badgeStyle: Record<string, string> = {
  sd: "bg-green-800/[0.07] text-green-700 border border-green-700/20",
  sp: "bg-yellow-700/[0.07] text-yellow-700 border border-yellow-700/20",
  sn: "bg-red-700/[0.07] text-red-700 border border-red-700/20",
};

export default function Slide06Escopo({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          IC Fleets · Detalhe
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          O que existe, o que falta
          <br />e o que o UX <em className="not-italic text-purple">entrega.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          O Fleets tem uma base real. O problema não é ausência — é inconsistência. O trabalho
          começa pelo design system. Sem ele, qualquer coisa nova agrava o problema.
        </motion.p>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto pb-4">
        {action === "Design System" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Fase 0 · antes de qualquer tela nova
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-4"
            >
              O design system não é
              <br />um entregável paralelo. É a fundação.
            </motion.h2>
            <motion.p {...up(0.25)} className="text-gray-950 leading-[1.75] max-w-[580px] mb-5">
              Tokens de cor, tipografia, espaçamento, componentes, estados, padrões de interação —
              tudo documentado e versionado. Quando o dev abre o Figma, não tem dúvida. Quando um
              módulo novo entra, ele segue o mesmo sistema.
            </motion.p>
            <div className="flex flex-col gap-[2px]">
              {dsDeliverables.map((d, i) => (
                <motion.div
                  key={i}
                  {...up(0.35 + i * 0.08, easeIn)}
                  className="flex gap-4 px-5 py-[13px] border border-text/8 bg-black/2 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-purple/8 border border-purple/20 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-purple/55">
                    {i + 1}
                  </div>
                  <div className="text-xs font-light text-gray-950 leading-[1.65] pt-[3px]">{d}</div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {action === "Módulos" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-4"
            >
              Situação atual por módulo
            </motion.div>
            <motion.div {...up(0.15)}>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="font-mono text-[9px] tracking-[0.14em] text-purple/45 text-left px-[13px] py-[9px] border-b border-text/8 uppercase">
                      Módulo
                    </th>
                    <th className="font-mono text-[9px] tracking-[0.14em] text-purple/45 text-left px-[13px] py-[9px] border-b border-text/8 uppercase">
                      Foco UX
                    </th>
                    <th className="font-mono text-[9px] tracking-[0.14em] text-purple/45 text-left px-[13px] py-[9px] border-b border-text/8 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => (
                    <tr key={m.name}>
                      <td className="px-[13px] py-[9px] border-b border-text/5 align-top font-medium text-text/82">
                        {m.name}
                      </td>
                      <td className="px-[13px] py-[9px] border-b border-text/5 align-top font-light text-text/55">
                        {m.focus}
                      </td>
                      <td className="px-[13px] py-[9px] border-b border-text/5 align-top">
                        <span
                          className={`font-mono text-[10px] px-2 py-[3px] rounded-full whitespace-nowrap ${badgeStyle[m.badge]}`}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </>
        )}

        {action === "Entrega" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              Como o UX entrega tudo isso
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-5"
            >
              Três entregáveis por módulo,
              <br />em ordem.
            </motion.h2>
            <div className="flex flex-col gap-[2px] mb-6">
              {deliverables.map((item, i) => (
                <motion.div
                  key={item.num}
                  {...up(0.25 + i * 0.1, easeIn)}
                  className="flex gap-5 py-4 px-5 border border-text/8 bg-black/2 items-start"
                >
                  <div className="w-7 h-7 rounded-full bg-purple/8 border border-purple/20 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-purple/55">
                    {item.num}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-text mb-1 flex items-center gap-2">
                      {item.title}
                      <span className="font-mono text-[9px] px-[7px] py-[2px] rounded-full border border-purple/20 text-purple/45">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-xs font-light text-gray-950 leading-[1.65]">{item.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              {...up(0.55, easeIn)}
              className="relative p-7 border border-purple/20 bg-purple/[0.04] overflow-hidden"
            >
              <div
                className="absolute w-[240px] h-[240px] rounded-full top-[-60px] right-[-40px] pointer-events-none blur-[48px]"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }}
              />
              <div className="font-mono text-[10px] tracking-[0.2em] text-purple/45 mb-3 uppercase relative z-[1]">
                Próximo passo
              </div>
              <div className="text-[22px] font-bold text-text mb-2 tracking-[-0.02em] relative z-[1]">
                Design system primeiro.
              </div>
              <div className="text-xs font-light text-gray-950 leading-[1.75] max-w-[500px] relative z-[1]">
                Sem a fundação, cada módulo novo aprofunda a inconsistência. Com ela, o produto
                cresce sem perder coerência — e o cliente percebe a diferença.
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
