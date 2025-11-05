document.getElementById('year').textContent = new Date().getFullYear();

const page = document.body.dataset.page;
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.dataset.link === page) {
    a.style.color = '#7a42ff';
    a.style.fontWeight = '700';
  }
});
// 3D-Tilt für Elemente mit .media-tilt
(function tilt(){
  const els = document.querySelectorAll('.media-tilt');
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  els.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = clamp((0.5 - y) * 10, -8, 8);
      const ry = clamp((x - 0.5) * 10, -8, 8);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });
})();

// Sanfte Einblendung beim Scrollen
(function revealOnScroll(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(el=>{
      if(el.isIntersecting){
        el.target.style.transition = 'opacity .6s ease, transform .6s ease';
        el.target.style.opacity = 1;
        el.target.style.transform = 'translateY(0)';
        obs.unobserve(el.target);
      }
    });
  }, {threshold: .12});

  document.querySelectorAll('.card, .strategy-card, .project, .project-grid img, .profile').forEach(el=>{
    el.style.opacity = .0; el.style.transform = 'translateY(16px)'; obs.observe(el);
  });
})();

// Floating/Sticky Header bei Scroll
(function headerScroll(){
  const nav = document.querySelector('.navbar');
  const onScroll = () => {
    if(window.scrollY > 8){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

// Burger-Menü Toggle
(function mobileMenu(){
  const btn = document.querySelector('.menu-toggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    document.body.classList.toggle('menu-open');
  });
  // Schließen bei Link-Klick
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', ()=> document.body.classList.remove('menu-open'));
  });
})();

(function patternParallax(){
  const layer = document.querySelector('.pattern-layer');
  if(!layer) return;
  let cx=0, cy=0;
  window.addEventListener('mousemove', (e)=>{
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    // kleine Verschiebung
    const offsetX = Math.round(x * 20);
    const offsetY = Math.round(y * 16);
    layer.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
  }, {passive:true});
})();
/* Premium Tilt Cards */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `translateY(-8px) rotateX(${(-y/20)}deg) rotateY(${(x/20)}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});
// Smooth Hover – Physics-Style
document.querySelectorAll(".strategy-box").forEach(box => {
  box.addEventListener("mousemove", e => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    box.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px) scale(1.02)`;
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "";
  });
});


