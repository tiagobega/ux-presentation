import type { SlideProps } from "./config";
import BulletSlide from "./shared/BulletSlide";
import { Sparkles, TrendingUp, Database, MessageSquare } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide15Claude({ action: _ }: SlideProps) {
  return (
    <BulletSlide
      eyebrow="Padrões · Claude corporativo"
      titleHighlight="Claude"
      titleTrail="para todo o time."
      paragraph="Assinatura corporativa para todos — uma decisão de investimento no jeito de trabalhar."
      bullets={[
        { Icon: Sparkles, text: "Diferencial claro no projeto SABESP" },
        { Icon: TrendingUp, text: "Times que adotaram performam visivelmente melhor" },
        {
          Icon: Database,
          text: "Integração com nossos bancos via MCP: consulta por chat simples",
        },
        { Icon: MessageSquare, text: "Uma pergunta em linguagem natural vira uma query" },
      ]}
    />
  );
}
