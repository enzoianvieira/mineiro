// Live open/closed pill. Lunch service: Mon–Sat, 11:00–14:30, America/Sao_Paulo.
const OPEN_MIN = 11 * 60;
const CLOSE_MIN = 14 * 60 + 30;

function nowInCuritiba() {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const days = { "dom.": 0, "seg.": 1, "ter.": 2, "qua.": 3, "qui.": 4, "sex.": 5, "sáb.": 6 };
  return {
    day: days[get("weekday")] ?? new Date().getDay(),
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function initStatus() {
  const el = document.querySelector("[data-status]");
  if (!el) return;
  const text = el.querySelector(".status__text");

  function update() {
    const { day, minutes } = nowInCuritiba();
    const isServiceDay = day >= 1 && day <= 6;
    const open = isServiceDay && minutes >= OPEN_MIN && minutes < CLOSE_MIN;

    el.classList.toggle("is-open", open);
    el.classList.toggle("is-closed", !open);

    if (open) {
      text.textContent = "Aberto agora · até 14h30";
    } else if (isServiceDay && minutes < OPEN_MIN) {
      text.textContent = "Fechado · abre hoje às 11h";
    } else {
      const next = day === 6 || day === 0 ? "seg." : "amanhã";
      text.textContent = `Fechado · abre ${next} às 11h`;
    }
  }

  update();
  setInterval(update, 60_000);
}
