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
import Slide0Capa from "../slides/Slide0Capa";
import Slide1MenuOS from "../slides/Slide1MenuOS";
import Slide2Criterios from "../slides/Slide2Criterios";
import Slide3Processamento from "../slides/Slide3Processamento";
import Slide4Output from "../slides/Slide4Output";
import { SLIDE_CONFIG, type SlideProps } from "../slides/config";

// Demo IC Vision — ordem casa com os índices de SLIDE_CONFIG:
// 0 Capa · 1 Selecionar OS · 2 Escopo · 3 Processamento (4 steps) · 4 Output
const SLIDES: ComponentType<SlideProps>[] = [
  Slide0Capa,
  Slide1MenuOS,
  Slide2Criterios,
  Slide3Processamento,
  Slide4Output,
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
  const [selectedOS, setSelectedOS] = useState<number | null>(null);
  const [navBlocked, setNavBlocked] = useState(false);
  const total = SLIDES.length;

  const slideRef = useRef(slide);
  const actionRef = useRef(action);
  const selectedOSRef = useRef<number | null>(null);
  slideRef.current = slide;
  actionRef.current = action;
  selectedOSRef.current = selectedOS;

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

  const blockNav = useCallback(() => {
    setNavBlocked(true);
    window.setTimeout(() => setNavBlocked(false), 1400);
  }, []);

  // Seleção de OS vinda do Slide1 — avança direto para o slide 2.
  const handleSelectOS = useCallback((idx: number) => {
    setSelectedOS(idx);
    setSlide(2);
    setAction(SLIDE_CONFIG[2].actions[0]);
    activate(2);
  }, [activate]);

  const next = useCallback(() => {
    const s = slideRef.current;
    const a = actionRef.current;
    // Bloqueia avanço além de slide 1 sem OS selecionada.
    if (s >= 1 && selectedOSRef.current === null) { blockNav(); return; }
    const actions = SLIDE_CONFIG[s].actions as readonly string[];
    const idx = actions.indexOf(a);
    if (idx < actions.length - 1) {
      setAction(actions[idx + 1]);
    } else if (s < total - 1) {
      setSlide(s + 1);
      setAction(SLIDE_CONFIG[s + 1].actions[0]);
      activate(s + 1);
    }
  }, [total, activate, blockNav]);

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
      // Bloqueia navegação para slides além do 1 sem OS selecionada.
      if (i > 1 && selectedOSRef.current === null) { blockNav(); return; }
      setSlide(i);
      setAction(SLIDE_CONFIG[i].actions[0]);
      activate(i);
    },
    [activate, blockNav],
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
                {activated.has(i) ? (
                  <S
                    action={slideAction}
                    selectedOS={selectedOS}
                    onSelectOS={handleSelectOS}
                    navBlocked={i === 1 ? navBlocked : undefined}
                  />
                ) : null}
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
