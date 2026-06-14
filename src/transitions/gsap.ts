import gsap from "gsap";

// Custom ease matching the brand feel
const EASE_OUT = "power3.out";
const EASE_IN_OUT = "power2.inOut";

export function transitionSlideForward(outEl: HTMLElement, inEl: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();

  // Outgoing slide: scale down + fade out
  tl.to(outEl, {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    duration: 0.28,
    ease: EASE_IN_OUT,
  });

  // Incoming slide: clip-path reveal from left
  tl.fromTo(
    inEl,
    {
      clipPath: "inset(0 100% 0 0)",
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.42,
      ease: EASE_OUT,
    },
    "-=0.08",
  );

  return tl;
}

export function transitionSlideBackward(outEl: HTMLElement, inEl: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline();

  tl.to(outEl, {
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
    duration: 0.28,
    ease: EASE_IN_OUT,
  });

  tl.fromTo(
    inEl,
    {
      clipPath: "inset(0 0 0 100%)",
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    {
      clipPath: "inset(0 0 0 0%)",
      duration: 0.42,
      ease: EASE_OUT,
    },
    "-=0.08",
  );

  return tl;
}

// Used for text element reveals (SplitText-style fallback without plugin)
export function revealWords(
  els: Element[],
  baseDelay = 0,
  stagger = 0.04,
): gsap.core.Tween {
  return gsap.fromTo(
    els,
    { y: "110%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.65,
      ease: "power4.out",
      stagger,
      delay: baseDelay,
    },
  );
}

// Hero number/metric counter animation
export function countUp(el: HTMLElement, target: number, duration = 1.2, delay = 0): void {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    delay,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = Math.round(obj.val).toString();
    },
  });
}
