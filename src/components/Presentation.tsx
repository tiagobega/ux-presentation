import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Background } from "./Background";
import Nav from "./Nav";
import QROverlay from "./QROverlay";
import { useRemoteControl } from "../hooks/useRemoteControl";
// Esteira e nav vêm do deck ativo (Informs por padrão; `?deck=fleets` troca).
import { DECK, SLIDES, SLIDE_CONFIG } from "../slides/decks";

// Easing dramático para o pan da câmera entre slides.
const camera: [number, number, number, number] = [0.76, 0, 0.24, 1];
const PAN_SEC = 0.85; // duração do pan da câmera
// Atraso da montagem do slide: ele só monta (e anima) quando o pan está terminando.
const ENTER_DELAY_MS = 700;

/**
 * Ponto de partida pela URL: `?at=3.2` abre o slide 3 no passo 2 (contando de
 * 1). Serve para ensaiar um trecho e para voltar ao ponto certo se a página
 * recarregar no meio da apresentação. Sem o parâmetro, começa do início.
 */
function inicio(): { slide: number; action: string } {
  const pedido = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("at");
  const [s, a] = (pedido ?? "").split(".").map((n) => Number(n) - 1);
  const slide = Number.isInteger(s) && SLIDE_CONFIG[s] ? s : 0;
  const actions = SLIDE_CONFIG[slide].actions;
  return { slide, action: actions[Number.isInteger(a) && actions[a] ? a : 0] };
}

const INICIO = inicio();

export default function Presentation() {
  const reduzido = useReducedMotion();
  const [slide, setSlide] = useState(INICIO.slide);
  const [action, setAction] = useState<string>(INICIO.action);
  // Slides já visitados ficam montados (estado completo, sem reset ao sair).
  const [activated, setActivated] = useState<Set<number>>(() => new Set([INICIO.slide]));
  const [showQR, setShowQR] = useState(false);
  // A passagem corrente é um corte (sem pan)? Vale para entrar num slide com
  // `corte` e para voltar dele ao anterior: a emenda é a mesma nos dois sentidos.
  const [corte, setCorte] = useState(false);
  const total = SLIDES.length;

  const slideRef = useRef(slide);
  const actionRef = useRef(action);
  slideRef.current = slide;
  actionRef.current = action;

  // Último step visto de cada slide — usado para congelar slides inativos no estado completo.
  const actionMemory = useRef<Record<number, string>>({
    [INICIO.slide]: INICIO.action,
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
      const porCorte = !!SLIDE_CONFIG[s + 1].corte;
      setCorte(porCorte);
      setSlide(s + 1);
      setAction(SLIDE_CONFIG[s + 1].actions[0]);
      // No corte o slide monta no mesmo quadro: sem pan, não há o que esperar.
      if (porCorte) setActivated((prev) => (prev.has(s + 1) ? prev : new Set(prev).add(s + 1)));
      else activate(s + 1);
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
      const porCorte = !!SLIDE_CONFIG[s].corte;
      setCorte(porCorte);
      setSlide(s - 1);
      setAction(prevActions[prevActions.length - 1]);
      if (porCorte) setActivated((prev) => (prev.has(s - 1) ? prev : new Set(prev).add(s - 1)));
      else activate(s - 1);
    }
  }, [activate]);

  const gotoSlide = useCallback(
    (i: number) => {
      const porCorte = !!SLIDE_CONFIG[i].corte ||
        (i === slideRef.current - 1 && !!SLIDE_CONFIG[slideRef.current].corte);
      setCorte(porCorte);
      setSlide(i);
      setAction(SLIDE_CONFIG[i].actions[0]);
      if (porCorte) setActivated((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
      else activate(i);
    },
    [activate],
  );

  const handleRemote = useCallback(
    (cmd: string) => {
      const s = slideRef.current;
      if (cmd === "prev") {
        if (s > 0) {
          gotoSlide(s - 1);
        }
      } else if (cmd === "next") {
        if (s < total - 1) {
          gotoSlide(s + 1);
        }
      } else {
        const actions = SLIDE_CONFIG[s].actions as readonly string[];
        if ((actions as string[]).includes(cmd)) setAction(cmd);
      }
    },
    [total, gotoSlide],
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
  const fundoBranco = DECK.background === "white";

  return (
    <div className={`fixed inset-0 flex flex-col ${fundoBranco ? "bg-white" : ""}`}>
      {!fundoBranco && <Background />}

      {/* Esteira global: todos os slides renderizados lado a lado; a câmera desliza. */}
      <div className="flex-1 relative overflow-hidden z-20">
        <motion.div
          className="flex h-full"
          style={{ width: `${total * 100}%` }}
          initial={false}
          animate={{ x: `-${(100 / total) * slide}%` }}
          transition={{ duration: corte || reduzido ? 0 : PAN_SEC, ease: camera }}
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
                className={`h-full flex flex-col shrink-0 ${fundoBranco ? "bg-white" : ""}`}
                style={{ width: `${100 / total}%` }}
              >
                {/* Monta só quando visitado pela 1ª vez → anima ao chegar; depois fica completo, sem remontar. */}
                {activated.has(i) ? <S action={slideAction} active={isActive} /> : null}
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
