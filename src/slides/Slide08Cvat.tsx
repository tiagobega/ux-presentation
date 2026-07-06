import type { SlideProps } from "./config";
import BulletSlide from "./shared/BulletSlide";
import { XCircle, Package, CheckCircle2, Clock, Rocket } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Slide08Cvat({ action: _ }: SlideProps) {
  return (
    <BulletSlide
      eyebrow="SGC > CVAT (Computer Vision Annotation Tool)"
      titleHighlight="O melhor código"
      titleTrail="é o que não precisamos escrever."
      paragraph="Descontinuamos o desenvolvimento interno do SGC ao encontrar o CVAT (Computer Vision Annotation Tool) — uma alternativa open source, madura e validada."
      bullets={[
        { Icon: XCircle, text: "Desenvolvimento interno do SGC descontinuado" },
        { Icon: Package, text: "CVAT identificado como alternativa open source" },
        { Icon: CheckCircle2, text: "Time de IA estudou e validou a adoção do CVAT" },
        { Icon: Clock, text: "Meses de trabalho economizados" },
        { Icon: Rocket, text: "Time liberado para o que só nós podemos construir: Vision e Fleets" },
      ]}
    />
  );
}
