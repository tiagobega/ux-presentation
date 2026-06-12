import { motion } from "motion/react";
import type { SlideProps } from "./config";
import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  Activity,
  Leaf,
  TrendingDown,
  Wind,
  Droplets,
  Layers,
  Eye,
  Building2,
} from "lucide-react";

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const easeIn: [number, number, number, number] = [0.66, 0, 0.33, 1];

const up = (delay: number, ease: [number, number, number, number] = easeOut) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease, delay },
});

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

const badgeStyle: Record<string, string> = {
  sd: "bg-green-800/[0.07] text-green-700 border border-green-700/20",
  sp: "bg-yellow-700/[0.07] text-yellow-700 border border-yellow-700/20",
  sn: "bg-red-700/[0.07] text-red-700 border border-red-700/20",
};

interface VisionSub {
  color: string;
  Icon: LucideIcon;
  name: string;
  desc: string;
}

const visionSubs: VisionSub[] = [
  { color: "#d4c53a", Icon: Lightbulb, name: "IC Lumen", desc: "Luminosidade pública" },
  { color: "#7a9ab8", Icon: Activity, name: "IC Quality", desc: "Qualidade do asfalto · IRI" },
  { color: "#2d7a4e", Icon: Leaf, name: "IC Grass", desc: "Vegetação urbana" },
  { color: "#c06840", Icon: TrendingDown, name: "IC Margin", desc: "Encostas · risco" },
  { color: "#e87c3a", Icon: Wind, name: "IC Gas", desc: "Vazamento de gás" },
  { color: "#3a7ce8", Icon: Droplets, name: "IC Flood", desc: "Alagamento · alertas" },
];

interface SabespFront {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const sabespFronts: SabespFront[] = [
  {
    Icon: Layers,
    title: "Plataforma operacional",
    body: "Fluxo de instalação, verificação e manutenção de dispositivos. Wizard guiado, sem margem para erro, com confirmação imediata.",
  },
  {
    Icon: Eye,
    title: "Dashboard de gestão",
    body: "Painel desenhado para o gestor da SABESP: visualização por área, status de dispositivos, alertas e exportação formatada.",
  },
  {
    Icon: Building2,
    title: "Onboarding e demo",
    body: "Fluxo de primeira experiência que demonstra valor em minutos. Pensado para a reunião de validação — sem precisar de um consultor ao lado.",
  },
];

export default function Slide04Branding({ action }: SlideProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0">
      <div>
        <motion.div
          {...up(0.0)}
          className="font-mono text-xs tracking-[0.2em] text-purple/45 mb-4 uppercase"
        >
          Em andamento
        </motion.div>
        <motion.h1
          {...up(0.1)}
          className="text-4xl font-bold leading-[1.05] text-text tracking-[-0.03em] mb-3"
        >
          O foco atual —
          <br />Fleets, Vision e{" "}
          <em className="not-italic text-purple">SABESP.</em>
        </motion.h1>
        <motion.p {...up(0.22)} className="text-gray-950 leading-[1.65] max-w-[560px]">
          Não dá para fazer tudo ao mesmo tempo. As três frentes ativas formam a base do que vem
          depois: a plataforma operacional, o processamento especializado e o primeiro caso de uso
          com cliente externo.
        </motion.p>
      </div>

      <div key={action} className="flex-1 min-h-0 overflow-y-auto pb-4">
        {action === "Fleets" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-4"
            >
              IC Fleets · Situação atual por módulo
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

        {action === "Vision" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              IC Vision · Estrutura de processamento
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-4"
            >
              Com os produtos crescendo,
              <br />a arquitetura precisa ser definida agora.
            </motion.h2>
            <motion.p {...up(0.25)} className="text-gray-950 leading-[1.75] max-w-[580px] mb-5">
              O Vision é o processador central — recebe dados brutos e distribui para módulos
              especializados. O trabalho de UX define como cada produto se apresenta, como os dados
              são exibidos e como o gestor navega entre eles sem se perder.
            </motion.p>
            <motion.div
              {...up(0.35)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-3"
            >
              Módulos especializados de processamento
            </motion.div>
            <div className="grid grid-cols-3 gap-2">
              {visionSubs.map((s, i) => (
                <motion.div
                  key={s.name}
                  {...up(0.45 + i * 0.08, easeIn)}
                  className="flex items-center gap-3 px-4 py-3 border border-black/8 bg-black/2"
                >
                  <s.Icon className="size-4 flex-shrink-0" style={{ color: s.color }} />
                  <div>
                    <div className="text-[13px] font-semibold text-black/80">{s.name}</div>
                    <div className="text-[11px] font-light text-black/40">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {action === "SABESP" && (
          <>
            <motion.div
              {...up(0.05)}
              className="font-mono text-[10px] tracking-[0.2em] text-purple/40 uppercase mb-2"
            >
              SABESP · Primeiro caso de uso externo
            </motion.div>
            <motion.h2
              {...up(0.15)}
              className="text-[28px] font-bold text-text tracking-[-0.025em] leading-[1.1] mb-4"
            >
              Validar a cadeia completa
              <br />com um cliente real.
            </motion.h2>
            <motion.p {...up(0.25)} className="text-gray-950 leading-[1.75] max-w-[580px] mb-5">
              O contrato com a SABESP é a oportunidade de provar que a cadeia funciona de ponta a
              ponta — coleta, processamento, qualidade e acesso — com uma experiência que o cliente
              consiga usar sem treinamento extenso. Três frentes de UX em paralelo.
            </motion.p>
            <div className="flex flex-col gap-2">
              {sabespFronts.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...up(0.35 + i * 0.1, easeIn)}
                  className="flex gap-5 px-5 py-4 border border-text/8 bg-black/2 items-start"
                >
                  <f.Icon className="size-4 text-purple/40 flex-shrink-0 mt-[2px]" />
                  <div>
                    <div className="text-[14px] font-semibold text-text/85 mb-1">{f.title}</div>
                    <div className="text-xs font-light text-gray-950 leading-[1.65]">{f.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              {...up(0.65, easeIn)}
              className="relative mt-3 p-6 border border-purple/20 bg-purple/[0.04] overflow-hidden"
            >
              <div
                className="absolute w-[200px] h-[200px] rounded-full top-[-50px] right-[-30px] pointer-events-none blur-[48px]"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }}
              />
              <div className="font-mono text-[10px] tracking-[0.2em] text-purple/45 mb-2 uppercase relative z-[1]">
                Por que importa
              </div>
              <div className="text-[17px] font-bold text-text tracking-[-0.02em] mb-2 relative z-[1]">
                Com os três funcionando bem, o caminho para novos clientes fica claro.
              </div>
              <div className="text-xs font-light text-gray-950 leading-[1.75] max-w-[500px] relative z-[1]">
                Fleets organiza a operação. Vision estrutura o produto. SABESP valida a cadeia no
                mundo real. Cada frente cumpre um papel diferente — e juntas formam a base do que
                a Intelicity pode oferecer para qualquer cidade.
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
