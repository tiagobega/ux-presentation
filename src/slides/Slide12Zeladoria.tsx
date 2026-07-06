import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Inbox, Users, Map, ScanEye } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide12Zeladoria({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Novo app · Zeladoria Urbana"
      titleLead="A próxima fronteira: o"
      titleHighlight="cidadão."
      paragraph="Demanda recém-recebida, entrando no roadmap agora. Pela primeira vez, um produto voltado ao munícipe — não só ao operador."
      done={{
        label: "Status",
        items: [
          { Icon: Inbox, text: "Não iniciado — demanda recém-recebida" },
          { Icon: Users, text: "Primeiro produto voltado ao cidadão" },
        ],
      }}
      next={{
        items: [
          { Icon: Map, text: "Report de zeladoria urbana para munícipes" },
          { Icon: ScanEye, text: "Nasce com integração ao Vision: foto do munícipe passa pelo pipeline" },
        ],
      }}
      note={{
        lead: "Cada produto novo",
        highlight: "já nasce conectado ao ecossistema.",
      }}
    />
  );
}
