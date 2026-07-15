import gsap from "gsap";

export function initNav({ lenis }) {
  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");
  const overlay = document.querySelector("[data-overlay]");
  const overlayLinks = overlay.querySelectorAll("[data-overlay-link]");

  // hide on scroll down / show on up + solid after hero
  let lastY = 0;
  function onScroll(y) {
    nav.classList.toggle("is-solid", y > 40);
    if (y > window.innerHeight * 0.8 && y > lastY + 4 && !overlayOpen) {
      nav.classList.add("is-hidden");
    } else if (y < lastY - 4) {
      nav.classList.remove("is-hidden");
    }
    lastY = y;
  }
  if (lenis) lenis.on("scroll", ({ scroll }) => onScroll(scroll));
  else window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });

  // fullscreen overlay
  let overlayOpen = false;
  const tl = gsap.timeline({ paused: true })
    .set(overlay, { visibility: "visible" })
    .to(overlay, { clipPath: "inset(0% 0 0% 0)", duration: 0.65, ease: "power4.inOut" })
    .fromTo(overlayLinks, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" }, "-=0.25")
    .fromTo(".overlay__foot", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");

  function setOverlay(open) {
    overlayOpen = open;
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    overlay.setAttribute("aria-hidden", String(!open));
    if (open) {
      nav.classList.remove("is-hidden");
      lenis?.stop();
      tl.timeScale(1).play();
    } else {
      lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }

  burger.addEventListener("click", () => setOverlay(!overlayOpen));
  overlayLinks.forEach((a) => a.addEventListener("click", () => setOverlay(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlayOpen) setOverlay(false);
  });

  // smooth anchor scroll via lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    });
  });
}
