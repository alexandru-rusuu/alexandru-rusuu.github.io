// ── Year in footer ───────────────────────────
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Live local clock (Suceava / browser local) ──
const clockEl = document.getElementById("clock");
if (clockEl) {
  const tick = () => {
    const t = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    clockEl.textContent = `Suceava · ${t}`;
  };
  tick();
  setInterval(tick, 1000 * 15);
}

// ── Scroll reveal ────────────────────────────
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);
revealEls.forEach((el) => io.observe(el));

// ── Scroll progress bar ──────────────────────
const progressBar = document.querySelector(".scroll-progress span");
if (progressBar) {
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    progressBar.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ── Cursor spotlight (pointer-capable devices) ──
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && !reduceMotion) {
  const spotlight = document.querySelector(".spotlight");
  let raf = null;
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 3;

  const render = () => {
    spotlight.style.setProperty("--mx", `${mx}px`);
    spotlight.style.setProperty("--my", `${my}px`);
    raf = null;
  };

  window.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) raf = requestAnimationFrame(render);
  });
}
