import { useEffect, useRef } from "react";
import gsap from "gsap";
import diagrama from "../../assets/diagrama-futuro.svg?raw";
import type { SlideProps } from "../config";
import { SlideShell, SlideHeader, Accent } from "./kit";

const STEP2 = "Em construção";

/**
 * O diagrama (`src/assets/diagrama-futuro.svg`) é anotado com `data-part` em
 * cada elemento — é isso que permite animar camada por camada. Se o SVG for
 * reexportado do Figma, as anotações somem e precisam ser refeitas.
 *
 * Step 1 sobe a espinha que já roda hoje, de baixo para cima (o sentido do
 * dado: hardware → Fleets → processamento → projeto). Step 2 acende o que
 * está sendo construído, mantendo o esmaecido do desenho original.
 */
interface Passo {
  parte: string;
  em: number;
  stagger?: number;
}

const HOJE: Passo[] = [
  { parte: "lane", em: 0, stagger: 0.06 },
  { parte: "hw-hoje", em: 0.4 },
  { parte: "seta-hoje-1", em: 0.65 },
  { parte: "fleets", em: 0.85 },
  { parte: "seta-hoje-2", em: 1.1 },
  { parte: "proc-caixa", em: 1.3 },
  { parte: "proc-hoje", em: 1.45 },
  { parte: "validacao", em: 1.6, stagger: 0.04 },
  { parte: "seta-hoje-3", em: 1.8 },
  { parte: "proj-hoje", em: 2.0 },
];

const FUTURO: Passo[] = [
  { parte: "hw-futuro", em: 0, stagger: 0.12 },
  { parte: "seta-futuro-1", em: 0.18 },
  { parte: "proc-futuro", em: 0.35, stagger: 0.12 },
  { parte: "seta-futuro-2", em: 0.55 },
  { parte: "proj-futuro", em: 0.7, stagger: 0.12 },
];

/** Setas: animam a altura (disparam da base para a ponta), não só a opacidade. */
const SETAS = new Set([
  "seta-hoje-1",
  "seta-hoje-2",
  "seta-hoje-3",
  "seta-futuro-1",
  "seta-futuro-2",
]);

const alvos = (host: HTMLElement, parte: string) =>
  gsap.utils.toArray<SVGElement>(
    host.querySelectorAll(`[data-part="${parte}"]`),
  );

/**
 * Opacidade que veio do Figma: o item planejado nasce esmaecido e deve terminar
 * a animação assim, não em cor cheia. As setas do futuro vêm em 0.8 no arquivo,
 * então entram limitadas para acompanhar o resto do plano.
 */
const opacidadeFinal = (el: SVGElement, planejado: boolean) => {
  const base = Number(el.getAttribute("opacity") ?? 1);
  return planejado ? Math.min(base, 0.55) : base;
};

function anima(
  tl: gsap.core.Timeline,
  host: HTMLElement,
  passos: Passo[],
  planejado: boolean,
) {
  passos.forEach(({ parte, em, stagger = 0.08 }) => {
    const els = alvos(host, parte);
    if (!els.length) return;
    const para = {
      opacity: (_i: number, el: SVGElement) => opacidadeFinal(el, planejado),
      duration: SETAS.has(parte) ? 0.4 : 0.5,
      stagger,
    };
    if (SETAS.has(parte)) {
      tl.fromTo(
        els,
        { opacity: 0, scaleY: 0, transformOrigin: "center bottom" },
        { ...para, scaleY: 1 },
        em,
      );
    } else {
      tl.fromTo(els, { opacity: 0, y: 14 }, { ...para, y: 0 }, em);
    }
  });
}

export default function Slide02Arquitetura({ action }: SlideProps) {
  const host = useRef<HTMLDivElement>(null);
  const mostraFuturo = action === STEP2;

  // Entrada: esconde tudo e sobe a arquitetura de hoje, camada por camada.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    gsap.set(el.querySelectorAll("[data-part]"), { opacity: 0 });
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    anima(tl, el, HOJE, false);
    return () => {
      tl.kill();
    };
  }, []);

  // Cada mudança de step monta a própria timeline — ida acende, volta apaga.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (mostraFuturo) {
      anima(tl, el, FUTURO, true);
    } else {
      const planejados = FUTURO.flatMap(({ parte }) => alvos(el, parte));
      tl.to(planejados, { opacity: 0, duration: 0.3 });
    }
    return () => {
      tl.kill();
    };
  }, [mostraFuturo]);

  return (
    <SlideShell className="gap-16">
      <SlideHeader
        eyebrow="Arquitetura"
        title={
          <p className="text-center">
            A arquitetura que <Accent>estamos construindo.</Accent>
          </p>
        }
      />

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div
          ref={host}
          className="h-full w-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: diagrama }}
        />
      </div>
    </SlideShell>
  );
}
