import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Zap, HardHat, Package, Repeat } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide10GestaoObras({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Novo produto · Gestão e Planejamento de Obras"
      titleLead="Um novo produto para"
      titleHighlight="gestão e planejamento de obras."
      paragraph="Nasceu como demo para a SABESP — construída em apenas 1 semana, graças aos novos padrões de dev com IA — e agora vira um produto próprio do ecossistema."
      done={{
        items: [
          { Icon: Zap, text: "Demo funcional entregue à SABESP em 1 semana com tecnologias tradicionais" },
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
