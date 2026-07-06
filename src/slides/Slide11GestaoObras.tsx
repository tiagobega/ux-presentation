import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Zap, HardHat, Package, Repeat } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide11GestaoObras({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Novo produto · Gestão de Obras"
      titleLead="Uma demo funcional em"
      titleHighlight="1 semana."
      paragraph="Demo para a SABESP construída em uma semana — só possível por causa dos novos padrões de dev com IA."
      done={{
        items: [
          { Icon: Zap, text: "Demo funcional para a SABESP em 1 semana" },
          { Icon: HardHat, text: "Necessidade simples e universal de gestão de obras" },
        ],
      }}
      next={{
        items: [
          { Icon: Package, text: "Evoluir de demo para produto de prateleira" },
          { Icon: Repeat, text: "Baixa complexidade, alta recorrência: SABESP, Porto Alegre, SP, Bia" },
        ],
      }}
      note={{
        lead: "Demanda universal + baixa complexidade =",
        highlight: "produto ideal para padronizar e vender.",
      }}
    />
  );
}
