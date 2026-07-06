import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { ClipboardCheck, Bug, Apple, ScanEye } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide08Informs({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Informs · produto vivo"
      titleLead="Em campo, iterando com o"
      titleHighlight="usuário real."
      paragraph="Em produção desde o último semestre; motoverificadores já usando no dia a dia."
      done={{
        items: [
          { Icon: ClipboardCheck, text: "Em produção, com motoverificadores em campo" },
          { Icon: Bug, text: "Ciclo ativo de feedback e correção de bugs" },
        ],
      }}
      next={{
        items: [
          { Icon: Apple, text: "Deploy na App Store — acessibilidade e alcance" },
          {
            Icon: ScanEye,
            text: "Visão de futuro: foto passa em tempo real pelo Vision, que valida na hora se é a foto ideal",
          },
        ],
      }}
      note={{
        lead: "Um produto alimentando o outro —",
        highlight: "o melhor exemplo da tese do ecossistema integrado.",
      }}
    />
  );
}
