import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import {
  Rocket,
  Boxes,
  Cpu,
  ShieldCheck,
  FileBarChart,
  Users,
  GraduationCap,
  Handshake,
  CardSim,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide03Plataforma({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Intelifleets · Plataforma"
      titleLead="Em produção. Agora, a"
      titleHighlight="adoção."
      paragraph="Entregue em produção no último mês, substituindo a planilha e o report antigo — e já bem mais do que isso."
      done={{
        items: [
          { Icon: Rocket, text: "Plataforma em produção, no lugar da planilha" },
          { Icon: Boxes, text: "Cadastro centralizado de contratos, veículos e motoristas" },
          { Icon: Cpu, text: "Gestão de hardwares e dispositivos por contrato" },
          { Icon: ShieldCheck, text: "Papéis e permissões por time" },
          { Icon: FileBarChart, text: "Novo report de dados, focado em projetos" },
          { Icon: CardSim, text: "Visibilidade de uso de Chips 5G" },
        ],
      }}
      next={{
        items: [
          { Icon: GraduationCap, text: "Workshop do Fleets para todos" },
          { Icon: Users, text: "Manual para uso da plataforma" },
          { Icon: Handshake, text: "Melhorias de UX com fluxos específicos para cada tipo de usuário" },
        ],
      }}
      note={{
        lead: "A tecnologia está pronta.",
        highlight: "A evolução é a usabilidade.",
      }}
    />
  );
}
