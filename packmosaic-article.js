/* ============================================
   PackAlchemy — Article Page JavaScript
   Handles: Reading progress bar, scroll
   animations, bar chart animation
   ============================================ */

/* ── Reading Progress Bar ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 62px; left: 0; height: 3px;
  background: linear-gradient(90deg, #F5B85A, #E8826A, #4AAFC4);
  width: 0%; z-index: 999; transition: width 0.1s linear;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ── Animate bar chart fills on scroll ── */
const barFills = document.querySelectorAll('.di-bar-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.style.width;
      target.style.width = '0%';
      target.style.transition = 'width 1.2s ease';
      setTimeout(() => { target.style.width = width; }, 100);
      observer.unobserve(target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => observer.observe(bar));

/* ── Smooth scroll for back link ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Masthead hide on scroll ── */
let lastScroll = 0;
const masthead = document.querySelector('.masthead');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    masthead.style.transform = 'translateY(-100%)';
    masthead.style.transition = 'transform 0.3s ease';
  } else {
    masthead.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

/* ── Fade in article sections on scroll ── */
const fadeEls = document.querySelectorAll('.sec-div, .pull-q, .inline-stat, .callout, .takeaways, .data-insight');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});
