import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

import { runPreloader } from "./modules/preloader.js";
import { initMagnetic } from "./modules/magnetic.js";
import { initStatus } from "./modules/status.js";
import { initNav } from "./modules/nav.js";
import { initMenu } from "./modules/menu.js";
import { initReveals } from "./modules/reveals.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- smooth scroll ----------
let lenis = null;
if (!reducedMotion) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ---------- modules ----------
initMagnetic();
initStatus();
initNav({ lenis });
initMenu({ reducedMotion });

// three.js is heavy: load the WebGL hero off the critical path
import("./modules/heroGL.js").then(({ initHeroGL }) => initHeroGL({ reducedMotion }));

// ---------- ticker skew reacts to scroll velocity ----------
if (lenis) {
  const track = document.querySelector(".ticker__track");
  if (track) {
    const skewTo = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power2.out" });
    lenis.on("scroll", ({ velocity }) => {
      skewTo(gsap.utils.clamp(-8, 8, velocity * 0.32));
    });
  }
}

// ---------- hero intro ----------
function heroIntro() {
  const lines = document.querySelectorAll("[data-hero-line]");
  const chars = [...lines].flatMap((line) => new SplitText(line, { type: "chars" }).chars);

  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(chars, { yPercent: 118, rotate: 5, duration: 1.05, stagger: 0.03 })
    .fromTo("[data-hero-eyebrow]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.75")
    .fromTo("[data-hero-lede]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
    .fromTo("[data-hero-actions]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
    .fromTo("[data-hero-stamp]", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)" }, "-=0.7")
    .fromTo("[data-hero-foot]", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.5");
}

// ---------- boot ----------
runPreloader({
  reducedMotion,
  onDone: () => {
    if (!reducedMotion) heroIntro();
    initReveals({ reducedMotion });
    ScrollTrigger.refresh();
  },
});
