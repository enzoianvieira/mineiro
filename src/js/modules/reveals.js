import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initReveals({ reducedMotion }) {
  if (reducedMotion) {
    gsap.set("[data-reveal], [data-reveal-group] > *", { opacity: 1 });
    return;
  }

  // simple fade-up reveals
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(el,
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
  });

  // staggered groups
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    gsap.fromTo(group.children,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 85%" },
      });
  });

  // big statements: masked line reveal
  document.querySelectorAll("[data-split]").forEach((el) => {
    const split = new SplitText(el, { type: "lines", mask: "lines", autoSplit: true });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      stagger: 0.09,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 84%" },
    });
  });

  // parallax figures
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0;
    gsap.fromTo(el, { yPercent: speed }, {
      yPercent: -speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
    });
    const img = el.querySelector("img");
    if (img) {
      gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }
  });

  // footer wordmark rises in
  gsap.fromTo("[data-footer-wordmark]",
    { yPercent: 45, opacity: 0 },
    {
      yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: ".footer", start: "top 70%" },
    });

  // hero stamp slow spin
  gsap.to("[data-hero-stamp] svg", { rotate: 360, duration: 28, ease: "none", repeat: -1 });
}
