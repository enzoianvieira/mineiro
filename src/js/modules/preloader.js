import gsap from "gsap";

const WORDS = ["fogão a lenha", "café passado", "couve na manteiga", "panela de ferro", "jeito mineiro"];

export function runPreloader({ reducedMotion, onDone }) {
  const el = document.querySelector(".preloader");
  const wordEl = document.querySelector("[data-preloader-word]");
  const countEl = document.querySelector("[data-preloader-count]");
  if (!el) { onDone(); return; }

  if (reducedMotion) {
    el.remove();
    onDone();
    return;
  }

  document.documentElement.style.overflow = "hidden";

  const state = { progress: 0 };
  let wordIndex = 0;
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    document.documentElement.style.overflow = "";
    el.remove();
    onDone();
  }

  // failsafe: if rAF is starved (background tab, occluded window),
  // never leave the page locked behind the preloader
  setTimeout(finish, 6000);

  const tl = gsap.timeline({ onComplete: finish });

  tl.to(state, {
    progress: 100,
    duration: 1.9,
    ease: "power2.inOut",
    onUpdate: () => {
      countEl.textContent = String(Math.round(state.progress)).padStart(3, "0");
      const next = Math.min(Math.floor((state.progress / 100) * WORDS.length), WORDS.length - 1);
      if (next !== wordIndex) {
        wordIndex = next;
        wordEl.textContent = WORDS[wordIndex];
      }
    },
  })
    .to(".preloader__inner", { opacity: 0, y: -28, duration: 0.4, ease: "power2.in" }, "-=0.1")
    .to(".preloader__panel--a", { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "-=0.05")
    .to(".preloader__panel--b", { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "-=0.62");

  return tl;
}
