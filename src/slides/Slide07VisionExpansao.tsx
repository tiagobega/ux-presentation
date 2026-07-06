import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Sparkles, Cpu, Building2, Share2, Droplets } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide07VisionExpansao({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Intelivision · marco do semestre"
      titleLead="De pipeline das Jetsons a"
      titleHighlight="serviço de visão."
      paragraph="O Vision nasceu nos últimos 6 meses focado nas Jetsons. Agora vira um serviço de visão computacional da empresa."
      done={{
        items: [
          { Icon: Sparkles, text: "Nascimento do projeto, focado nas Jetsons" },
          { Icon: Cpu, text: "Pipeline medallion escalável por design" },
        ],
      }}
      next={{
        items: [
          { Icon: Building2, text: "Produção na SABESP no próximo mês — primeiro cliente real" },
          { Icon: Share2, text: "Análise de fotos on demand para qualquer pessoa ou sistema" },
          { Icon: Droplets, text: "Expansão para saneamento e outras verticais" },
        ],
      }}
      note={{
        lead: "O Vision deixa de ser um pipeline das Jetsons",
        highlight: "e vira um serviço de visão da empresa.",
      }}
    />
  );
}
