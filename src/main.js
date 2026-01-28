import "./style.css"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Hero Animations ---
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.to(".hero-title", { 
    y: 0, 
    opacity: 1, 
    duration: 1.2, 
    delay: 0.2 
  })
  .to(".hero-description", { 
    y: 0, 
    opacity: 1, 
    duration: 1 
  }, "-=0.8")
  .to(".hero-actions", { 
    y: 0, 
    opacity: 1, 
    duration: 1 
  }, "-=0.8")
  .to(".hero-stats", {
    y: 0,
    opacity: 1,
    duration: 1
  }, "-=0.8");

  // Hero visual parallax
  gsap.to(".hero-visual", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: 200,
    opacity: 0
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  // Features stagger animation
  gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // Section titles
  gsap.utils.toArray(".section-title").forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });
}

// --- 3D Tilt Effect ---
function initTiltEffect() {
  const cards = document.querySelectorAll('.feature-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: "power1.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.out"
      });
    });
  });
}

// --- Initialization ---
window.addEventListener('load', () => {
  initHeroAnimations();
  initScrollAnimations();
  initTiltEffect();
  
  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    // Simple toggle for mobile menu demo
    const isHidden = navLinks.style.display === 'none' || navLinks.style.display === '';
    navLinks.style.display = isHidden ? 'flex' : 'none';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'rgba(0,0,0,0.9)';
    navLinks.style.padding = '20px';
  });
}
