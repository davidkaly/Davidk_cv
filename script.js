
// Smooth scrolling and active section highlighting
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

// Smooth scroll behavior (native via CSS), but ensure focus for accessibility
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
      history.replaceState(null, '', link.getAttribute('href'));
    }
  });
});

// Intersection Observer to toggle active nav state
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = navLinks.find(l => l.getAttribute('href') === id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(sec => { if (sec) observer.observe(sec); });

 // Theme toggle (light/dark)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('resume-theme', next);
});

// Restore theme from localStorage
(function restoreTheme() {
  const saved = localStorage.getItem('resume-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});
