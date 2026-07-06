import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Database, ShieldCheck, Eye, Video, Radio } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide04Ingestao({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Intelifleets · Ingestão de dados"
      titleLead="A fundação que"
      titleHighlight="destravou o Vision."
      paragraph="Refatoração completa da ingestão de dados das Jetsons — fotos e metadados num pipeline confiável."
      done={{
        items: [
          { Icon: Database, text: "Nova arquitetura de ingestão das Jetsons (fotos + metadados)" },
          { Icon: ShieldCheck, text: "Mais confiabilidade, observabilidade e manutenibilidade" },
          { Icon: Eye, text: "Desbloqueio estratégico: sem ela, o Vision não existiria" },
        ],
      }}
      next={{
        items: [
          { Icon: Video, text: "Trazer Geobox e N100 (vídeos) para dentro do Fleets" },
          { Icon: Radio, text: "Integração com streaming e IRI" },
        ],
      }}
      note={{
        highlight: "A fundação que permitiu lançar o Intelivision.",
      }}
    />
  );
}
