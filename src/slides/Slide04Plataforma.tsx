import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Rocket, FileBarChart, Users, GraduationCap } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide04Plataforma({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Intelifleets · Plataforma"
      titleLead="Em produção. Agora, a"
      titleHighlight="adoção."
      paragraph="Entregue em produção no último mês, substituindo a planilha e o report antigo."
      done={{
        items: [
          { Icon: Rocket, text: "Plataforma em produção, no lugar da planilha" },
          { Icon: FileBarChart, text: "Novo report do Fleets, focado em projetos" },
          { Icon: Users, text: "Ponto de honestidade: adoção ainda é baixa" },
        ],
      }}
      next={{
        items: [
          { Icon: GraduationCap, text: "Workshop do Fleets para todos" },
          { Icon: Users, text: "Driblar a barreira com capacitação, não com feature nova" },
        ],
      }}
      note={{
        lead: "A tecnologia está pronta;",
        highlight: "o próximo passo são as pessoas.",
      }}
    />
  );
}
