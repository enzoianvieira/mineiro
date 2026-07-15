import gsap from "gsap";
import { WEEK } from "../data/menu.js";

export function initMenu({ reducedMotion }) {
  const tabsEl = document.querySelector("[data-menu-tabs]");
  const panelEl = document.querySelector("[data-menu-panel]");
  if (!tabsEl || !panelEl) return;

  // default tab = today (mon–sat), fallback monday
  const todayIdx = new Date().getDay(); // 0 sun … 6 sat
  let activeId = WEEK[todayIdx >= 1 && todayIdx <= 6 ? todayIdx - 1 : 0].id;

  // ---- tabs
  WEEK.forEach((day) => {
    const btn = document.createElement("button");
    btn.className = "menu-tab";
    btn.setAttribute("role", "tab");
    btn.id = `tab-${day.id}`;
    btn.setAttribute("aria-controls", "menu-panel");
    btn.innerHTML = `${day.label}${day.id === activeId ? "<em>hoje</em>" : ""}`;
    btn.addEventListener("click", () => select(day.id));
    tabsEl.appendChild(btn);
  });
  panelEl.id = "menu-panel";

  // keyboard arrows on tablist
  tabsEl.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tabs = [...tabsEl.children];
    const i = tabs.findIndex((t) => t.classList.contains("is-active"));
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    next.focus();
    next.click();
  });

  function renderPanel(day) {
    panelEl.setAttribute("aria-labelledby", `tab-${day.id}`);
    panelEl.innerHTML = day.groups.map((g, i) => `
      <article class="menu-card${i === 0 ? " menu-card--feature" : ""}">
        <figure class="menu-card__media">
          <img src="${g.img}" alt="${g.name} do dia" loading="lazy" />
        </figure>
        <div class="menu-card__body">
          <p class="menu-card__cat"><span>0${i + 1}</span>${g.name}</p>
          <ul class="menu-list${g.dishes.length >= 6 ? " menu-list--cols" : ""}">
            ${g.dishes.map((d) => `
              <li class="dish"><span class="dish__name">${d}</span></li>`).join("")}
          </ul>
        </div>
      </article>`).join("");

    if (!reducedMotion) {
      gsap.fromTo(panelEl.children,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true });
    }
  }

  function select(id) {
    activeId = id;
    [...tabsEl.children].forEach((btn) => {
      const on = btn.id === `tab-${id}`;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
      btn.tabIndex = on ? 0 : -1;
    });
    renderPanel(WEEK.find((d) => d.id === id));
  }

  select(activeId);
}
