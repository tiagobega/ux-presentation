import type { SlideProps } from "./config";
import BulletSlide from "./shared/BulletSlide";
import { Boxes, BookMarked, Wrench, Plug } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide13IcePanel({ action: _ }: SlideProps) {
  return (
    <BulletSlide
      eyebrow="Padrões de Arquitetura · IcePanel + ADRs"
      titleHighlight="Arquitetura"
      titleTrail="que não se perde."
      paragraph="Um padrão único de arquitetura e documentação — o porquê das decisões fica registrado."
      image={{
        src: "/icepanel.svg",
        alt: "Diagrama de arquitetura do Intelifleets exportado do IcePanel",
      }}
      bullets={[
        { Icon: Boxes, text: "Ferramenta única e padronizada de arquitetura" },
        {
          Icon: BookMarked,
          text: 'ADRs: a memória das decisões, o "porquê" preservado',
        },
        { Icon: Wrench, text: "Onboarding mais rápido para o time" },
        {
          Icon: Plug,
          text: "MCP do IcePanel: a IA acessa o contexto arquitetural — usado na SABESP",
        },
      ]}
    />
  );
}
