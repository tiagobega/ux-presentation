import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Cpu, EyeOff, Radio, Plug } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide09Gravata({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Streaming · Gravata"
      titleLead="Retorno de desenvolvimento."
      titleHighlight=""
      paragraph="O desenvolvimento da versão nova foi pausado nos últimos 6 meses por decisão de foco. Agora retoma com novo hardware para sustentação e uma arquitetura repensada."
      next={{
        items: [
          { Icon: Cpu, text: "Retomada com novo hardware, focado em sustentação" },
          { Icon: EyeOff, text: "Nova arquitetura com blur automático (privacidade)" },
          { Icon: Radio, text: "Streaming via HLS — padrão de mercado, compatível com qualquer player" },
          { Icon: Plug, text: "Integração nativa ao Fleets — coleta e dispositivos por contrato" },
        ],
      }}
      note={{
        lead: "O Gravata renasce dentro do ecossistema.",
        highlight: "Não como um sistema à parte.",
      }}
    />
  );``
}