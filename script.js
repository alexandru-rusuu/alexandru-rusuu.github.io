const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const canvas = document.getElementById("bg-canvas");
const context = canvas.getContext("2d");
let particles = [];

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const createParticles = (count) => {
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.7 + 0.8,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.55 + 0.2,
  }));
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(140, 180, 255, ${particle.alpha})`;
    context.fill();
  }

  requestAnimationFrame(draw);
};

resizeCanvas();
createParticles(Math.min(120, Math.floor(window.innerWidth / 11)));
requestAnimationFrame(draw);

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles(Math.min(120, Math.floor(window.innerWidth / 11)));
});
