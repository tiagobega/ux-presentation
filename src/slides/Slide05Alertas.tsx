import type { SlideProps } from "./config";
import UpdateSlide from "./shared/UpdateSlide";
import { Bell, Wrench, RefreshCw, GraduationCap } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide05Alertas({ action: _ }: SlideProps) {
  return (
    <UpdateSlide
      eyebrow="Intelifleets · Alertas"
      titleLead="O ciclo"
      titleHighlight="detectar → alertar → resolver."
      paragraph="Jetsons com possíveis problemas geram alertas que chegam na plataforma, permitindo resolução em campo."
      done={{
        items: [
          { Icon: Bell, text: "Alertas já funcionam dentro do fluxo do Vision" },
          { Icon: Wrench, text: "Problemas em campo viram ação resolvível" },
          { Icon: RefreshCw, text: "Fechamos o ciclo: detectar, alertar e resolver" },
        ],
      }}
      next={{
        items: [
          { Icon: GraduationCap, text: "Mesma pauta da Plataforma: precisa entrar no dia a dia" },
          { Icon: RefreshCw, text: "Conectar o uso com o workshop do Fleets" },
        ],
      }}
      note={{
        lead: "Funciona.",
        highlight: "Agora precisa ser usado.",
      }}
    />
  );
}
