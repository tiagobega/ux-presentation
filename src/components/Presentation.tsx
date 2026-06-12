import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ComponentType,
} from "react";
import { Background } from "./Background";
import Nav from "./Nav";
import QROverlay from "./QROverlay";
import { useRemoteControl } from "../hooks/useRemoteControl";
import Slide00 from "../slides/Slide00Capa";
import Slide01 from "../slides/Slide01Fundamento";
import Slide02 from "../slides/Slide02Desafio";
import Slide03 from "../slides/Slide03Crescimento";
import Slide04 from "../slides/Slide04Branding";
import { SLIDE_CONFIG, type SlideProps } from "../slides/config";

const SLIDES: ComponentType<SlideProps>[] = [
  Slide00,
  Slide01,
  Slide02,
  Slide03,
  Slide04,
];

export default function Presentation() {
  const [slide, setSlide] = useState(0);
  const [action, setAction] = useState<string>(SLIDE_CONFIG[0].actions[0]);
  const [slideDirection, setSlideDirection] = useState<"fwd" | "bwd">("fwd");
  const [showQR, setShowQR] = useState(false);
  const total = SLIDES.length;

  const slideRef = useRef(slide);
  const actionRef = useRef(action);
  slideRef.current = slide;
  actionRef.current = action;

  const next = useCallback(() => {
    const s = slideRef.current;
    const a = actionRef.current;
    const actions = SLIDE_CONFIG[s].actions as readonly string[];
    const idx = actions.indexOf(a);
    if (idx < actions.length - 1) {
      setAction(actions[idx + 1]);
    } else if (s < total - 1) {
      setSlideDirection("fwd");
      setSlide(s + 1);
      setAction(SLIDE_CONFIG[s + 1].actions[0]);
    }
  }, [total]);

  const prev = useCallback(() => {
    const s = slideRef.current;
    const a = actionRef.current;
    const actions = SLIDE_CONFIG[s].actions as readonly string[];
    const idx = actions.indexOf(a);
    if (idx > 0) {
      setAction(actions[idx - 1]);
    } else if (s > 0) {
      setSlideDirection("bwd");
      const prevActions = SLIDE_CONFIG[s - 1].actions;
      setSlide(s - 1);
      setAction(prevActions[prevActions.length - 1]);
    }
  }, []);

  const gotoSlide = useCallback((i: number) => {
    setSlideDirection(i > slideRef.current ? "fwd" : "bwd");
    setSlide(i);
    setAction(SLIDE_CONFIG[i].actions[0]);
  }, []);

  const handleRemote = useCallback(
    (cmd: string) => {
      const s = slideRef.current;
      if (cmd === "prev") {
        if (s > 0) {
          setSlideDirection("bwd");
          setSlide(s - 1);
          setAction(SLIDE_CONFIG[s - 1].actions[0]);
        }
      } else if (cmd === "next") {
        if (s < total - 1) {
          setSlideDirection("fwd");
          setSlide(s + 1);
          setAction(SLIDE_CONFIG[s + 1].actions[0]);
        }
      } else {
        const actions = SLIDE_CONFIG[s].actions as readonly string[];
        if ((actions as string[]).includes(cmd)) setAction(cmd);
      }
    },
    [total],
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

  const SlideComponent = SLIDES[slide];
  const config = SLIDE_CONFIG[slide];
  const actions = config.actions as readonly string[];
  const actionIndex = actions.indexOf(action);
  const isFirst = slide === 0 && actionIndex === 0;
  const isLast = slide === total - 1 && actionIndex === actions.length - 1;

  return (
    <div className="fixed inset-0 flex flex-col">
      <Background />
      
      <div className="flex-1 relative overflow-hidden z-20">
        <div
          key={slide}
          className={`absolute inset-0 overflow-hidden slide-${slideDirection}`}
        >
          <div className="relative h-full mx-auto max-w-360 px-8 pt-7 pb-6 flex flex-col">
            <SlideComponent action={action} />
          </div>
        </div>
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
