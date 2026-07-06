import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Map, ScanEye } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide11Zeladoria({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Novo app · Zeladoria Urbana"
      titleLead="A próxima fronteira: o"
      titleHighlight="cidadão."
      paragraph="Demanda recém-recebida, entrando no roadmap agora. Pela primeira vez, um produto voltado ao munícipe — não só ao operador."
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
