import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { PauseCircle, Focus, Plug, Boxes } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide10Gravata({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Streaming · Gravata"
      titleLead="Não volta de onde parou —"
      titleHighlight="volta melhor."
      paragraph="O desenvolvimento da versão nova foi pausado nos últimos 6 meses por decisão de foco. Agora foi retomado a pedido."
      done={{
        items: [
          { Icon: PauseCircle, text: "Versão nova pausada nos últimos 6 meses" },
          { Icon: Focus, text: "Decisão de foco, não abandono" },
        ],
      }}
      next={{
        items: [
          { Icon: Plug, text: "Retorno já com integração nativa ao Fleets" },
          { Icon: Boxes, text: "Coleta de dados e dispositivos anexados a cada contrato" },
        ],
      }}
      note={{
        lead: "O Gravata renasce dentro do ecossistema —",
        highlight: "não como um sistema à parte.",
      }}
    />
  );
}
