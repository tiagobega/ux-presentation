import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ComponentType,
} from "react";
import { motion } from "motion/react";
import { Background } from "./Background";
import Nav from "./Nav";
import QROverlay from "./QROverlay";
import { useRemoteControl } from "../hooks/useRemoteControl";
import Slide0Capa from "../slides/Slide00Capa";
import Slide1Coerencia from "../slides/Slide1Coerencia";
import Slide2Dados from "../slides/Slide2Dados";
import Slide3Cadeia from "../slides/Slide3Cadeia";
import Slide4Falhas from "../slides/Slide4Falhas";
import Slide5Valor from "../slides/Slide5Valor";
import Slide6Custo from "../slides/Slide6Custo";
import Slide7Narrativa from "../slides/Slide7Narrativa";
import Slide8StackIC from "../slides/Slide8StackIC";
import Slide9Branding from "../slides/Slide9Branding";
import Slide10Foco from "../slides/Slide10Foco";
import Slide11Citacao from "../slides/Slide11Citacao";
import { SLIDE_CONFIG, type SlideProps } from "../slides/config";

// Order matches SLIDE_CONFIG indices:
// 0 Capa · 1 O problema · 2 Mais dados · 3 A cadeia · 4 Falhas na cadeia
// 5 Valor · 6 O custo · 7 Narrativa · 8 Stack IC · 9 Branding dos produtos
// 10 Onde o UX entra · 11 Citação (Steve Jobs)
const SLIDES: ComponentType<SlideProps>[] = [
  Slide0Capa,
  Slide1Coerencia,
  Slide2Dados,
  Slide3Cadeia,
  Slide4Falhas,
  Slide5Valor,
  Slide6Custo,
  Slide7Narrativa,
  Slide8StackIC,
  Slide9Branding,
  Slide10Foco,
  Slide11Citacao,
];

// Easing dramático para o pan da câmera entre slides.
const camera: [number, number, number, number] = [0.76, 0, 0.24, 1];
const PAN_SEC = 0.85; // duração do pan da câmera
// Atraso da montagem do slide: ele só monta (e anima) quando o pan está terminando.
const ENTER_DELAY_MS = 700;

export default function Presentation() {
  const [slide, setSlide] = useState(0);
  const [action, setAction] = useState<string>(SLIDE_CONFIG[0].actions[0]);
  // Slides já visitados ficam montados (estado completo, sem reset ao sair).
  const [activated, setActivated] = useState<Set<number>>(() => new Set([0]));
  const [showQR, setShowQR] = useState(false);
  const total = SLIDES.length;

  const slideRef = useRef(slide);
  const actionRef = useRef(action);
  slideRef.current = slide;
  actionRef.current = action;

  // Último step visto de cada slide — usado para congelar slides inativos no estado completo.
  const actionMemory = useRef<Record<number, string>>({
    0: SLIDE_CONFIG[0].actions[0],
  });
  useEffect(() => {
    actionMemory.current[slide] = action;
  }, [slide, action]);

  // Monta o slide só DEPOIS do pan da câmera → a animação de entrada dispara ao chegar.
  // (Slides já visitados ignoram, pois continuam montados e completos.)
  const activate = useCallback((i: number) => {
    window.setTimeout(() => {
      setActivated((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
    }, ENTER_DELAY_MS);
  }, []);

  const next = useCallback(() => {
    const s = slideRef.current;
    const a = actionRef.current;
    const actions = SLIDE_CONFIG[s].actions as readonly string[];
    const idx = actions.indexOf(a);
    if (idx < actions.length - 1) {
      setAction(actions[idx + 1]);
    } else if (s < total - 1) {
      setSlide(s + 1);
      setAction(SLIDE_CONFIG[s + 1].actions[0]);
      activate(s + 1);
    }
  }, [total, activate]);

  const prev = useCallback(() => {
    const s = slideRef.current;
    const a = actionRef.current;
    const actions = SLIDE_CONFIG[s].actions as readonly string[];
    const idx = actions.indexOf(a);
    if (idx > 0) {
      setAction(actions[idx - 1]);
    } else if (s > 0) {
      const prevActions = SLIDE_CONFIG[s - 1].actions;
      setSlide(s - 1);
      setAction(prevActions[prevActions.length - 1]);
      activate(s - 1);
    }
  }, [activate]);

  const gotoSlide = useCallback(
    (i: number) => {
      setSlide(i);
      setAction(SLIDE_CONFIG[i].actions[0]);
      activate(i);
    },
    [activate],
  );

  const handleRemote = useCallback(
    (cmd: string) => {
      const s = slideRef.current;
      if (cmd === "prev") {
        if (s > 0) {
          setSlide(s - 1);
          setAction(SLIDE_CONFIG[s - 1].actions[0]);
          activate(s - 1);
        }
      } else if (cmd === "next") {
        if (s < total - 1) {
          setSlide(s + 1);
          setAction(SLIDE_CONFIG[s + 1].actions[0]);
          activate(s + 1);
        }
      } else {
        const actions = SLIDE_CONFIG[s].actions as readonly string[];
        if ((actions as string[]).includes(cmd)) setAction(cmd);
      }
    },
    [total, activate],
  );

  useRemoteControl(handleRemote);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showQR) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, showQR]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (showQR) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 50) next();
      else if (diff < -50) prev();
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev, showQR]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const config = SLIDE_CONFIG[slide];
    const actionIndex = (config.actions as readonly string[]).indexOf(action);
    fetch("/remote-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slide,
        action,
        actionIndex,
        slideLabel: config.label,
        actions: config.actions,
        totalSlides: total,
      }),
    }).catch(() => {});
  }, [slide, action, total]);

  const config = SLIDE_CONFIG[slide];
  const actions = config.actions as readonly string[];
  const actionIndex = actions.indexOf(action);
  const isFirst = slide === 0 && actionIndex === 0;
  const isLast = slide === total - 1 && actionIndex === actions.length - 1;

  return (
    <div className="fixed inset-0 flex flex-col">
      <Background />

      {/* Esteira global: todos os slides renderizados lado a lado; a câmera desliza. */}
      <div className="flex-1 relative overflow-hidden z-20">
        <motion.div
          className="flex h-full"
          style={{ width: `${total * 100}%` }}
          animate={{ x: `-${(100 / total) * slide}%` }}
          transition={{ duration: PAN_SEC, ease: camera }}
        >
          {SLIDES.map((S, i) => {
            const isActive = i === slide;
            // Slide ativo segue o action atual; inativos congelam no último step visto.
            const slideAction = isActive
              ? action
              : (actionMemory.current[i] ?? SLIDE_CONFIG[i].actions[0]);
            return (
              <div
                key={i}
                className="h-full flex flex-col shrink-0"
                style={{ width: `${100 / total}%` }}
              >
                {/* Monta só quando visitado pela 1ª vez → anima ao chegar; depois fica completo, sem remontar. */}
                {activated.has(i) ? <S action={slideAction} /> : null}
              </div>
            );
          })}
        </motion.div>
      </div>

      <Nav
        current={slide}
        total={total}
        action={action}
        actionIndex={actionIndex}
        totalActions={actions.length}
        isFirst={isFirst}
        isLast={isLast}
        onPrev={prev}
        onNext={next}
        onGoto={gotoSlide}
        onQR={() => setShowQR(true)}
      />
      {showQR && <QROverlay onClose={() => setShowQR(false)} />}
    </div>
  );
}
