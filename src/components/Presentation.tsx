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
import Slide00Capa from "../slides/fleets-demo/Slide00Capa";
import Slide01PorQueExiste from "../slides/fleets-demo/Slide01PorQueExiste";
import Slide02Arquitetura from "../slides/fleets-demo/Slide02Arquitetura";
import Slide03Usuarios from "../slides/fleets-demo/Slide03Usuarios";
import Slide04OQueResolvemos from "../slides/fleets-demo/Slide04OQueResolvemos";
import Slide05Glossario from "../slides/fleets-demo/Slide05Glossario";
import Slide06DemoAuth from "../slides/fleets-demo/Slide06DemoAuth";
import Slide07DemoCadastros from "../slides/fleets-demo/Slide07DemoCadastros";
import Slide08DemoContrato from "../slides/fleets-demo/Slide08DemoContrato";
import Slide09DemoColaboradores from "../slides/fleets-demo/Slide09DemoColaboradores";
import Slide10DemoDispositivos from "../slides/fleets-demo/Slide10DemoDispositivos";
import Slide11DemoColeta from "../slides/fleets-demo/Slide11DemoColeta";
import Slide12DemoPagamentos from "../slides/fleets-demo/Slide12DemoPagamentos";
import Slide13DemoAlertas from "../slides/fleets-demo/Slide13DemoAlertas";
import Slide14DemoGestores from "../slides/fleets-demo/Slide14DemoGestores";
import Slide15ProximosPassos from "../slides/fleets-demo/Slide15ProximosPassos";
import Slide16Perguntas from "../slides/fleets-demo/Slide16Perguntas";
import { SLIDE_CONFIG, type SlideProps } from "../slides/config";

// Order matches SLIDE_CONFIG indices (e `fleets-slides.md`):
// 0 Capa · 1 Por que existe · 2 Arquitetura · 3 Usuários
// 4 O que resolvemos · 5 Glossário (o vocabulário fecha o contexto e abre a demo)
// 6–14 fluxos [DEMO]: Autenticação · Cadastros · Contrato · Colaboradores
//              Dispositivos · Coleta em campo · Pagamentos · Alertas · Dashboards
// 15 Próximos passos · 16 Perguntas
const SLIDES: ComponentType<SlideProps>[] = [
  Slide00Capa,
  Slide01PorQueExiste,
  Slide02Arquitetura,
  Slide03Usuarios,
  Slide04OQueResolvemos,
  Slide05Glossario,
  Slide06DemoAuth,
  Slide07DemoCadastros,
  Slide08DemoContrato,
  Slide09DemoColaboradores,
  Slide10DemoDispositivos,
  Slide11DemoColeta,
  Slide12DemoPagamentos,
  Slide13DemoAlertas,
  Slide14DemoGestores,
  Slide15ProximosPassos,
  Slide16Perguntas,
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
