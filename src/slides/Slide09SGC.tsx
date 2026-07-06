import type { SlideProps } from "./config";
import BulletSlide from "./shared/BulletSlide";
import { XCircle, Package, CheckCircle2, Clock, Rocket } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide09SGC({ action: _ }: SlideProps) {
  return (
    <BulletSlide
      eyebrow="SGC · decisão de produto"
      titleHighlight="O melhor código"
      titleTrail="é o que não precisamos escrever."
      paragraph="Descontinuamos o desenvolvimento interno do SGC ao encontrar uma alternativa open source — uma decisão madura, baseada em análise."
      bullets={[
        { Icon: XCircle, text: "Desenvolvimento interno descontinuado" },
        { Icon: Package, text: "Alternativa open source identificada" },
        { Icon: CheckCircle2, text: "Time de IA estudou e validou a troca" },
        { Icon: Clock, text: "Meses de trabalho economizados" },
        { Icon: Rocket, text: "Time liberado para o que só nós podemos construir: Vision e Fleets" },
      ]}
    />
  );
}
