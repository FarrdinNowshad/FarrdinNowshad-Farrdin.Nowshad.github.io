// Futuristic Visual Enhancements

// Create floating particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    // Random color between neon colors
    const colors = [
      'var(--neon-blue)',
      'var(--neon-purple)',
      'var(--neon-pink)',
      'var(--neon-green)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    particle.style.boxShadow = `0 0 10px ${randomColor}`;
    
    particlesContainer.appendChild(particle);
  }
}

// Add mouse tracking glow effect
function addMouseGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.15), transparent 70%);
    filter: blur(40px);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// Add subtle parallax effect to sections
function addParallaxEffect() {
  const sections = document.querySelectorAll('section');
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
          const speed = 0.05; // Reduced speed for subtle effect
          const yPos = -(scrolled * speed);
          
          // Only apply to background elements, not the content
          const bgElements = section.querySelectorAll('.image-overlay, .entry-image');
          bgElements.forEach(el => {
            if (el && el.style) {
              el.style.transform = `translateY(${yPos * 0.2}px)`;
            }
          });
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Add glitch effect to title on hover
function addGlitchEffect() {
  const titles = document.querySelectorAll('h1, .hero-title');
  
  titles.forEach(title => {
    const text = title.textContent;
    title.setAttribute('data-text', text);
    
    title.addEventListener('mouseenter', () => {
      title.classList.add('glitch');
    });
    
    title.addEventListener('mouseleave', () => {
      setTimeout(() => {
        title.classList.remove('glitch');
      }, 300);
    });
  });
}

// Add typing effect to typed elements
function enhanceTypedElements() {
  // Wait for typed.js to initialize
  setTimeout(() => {
    const typedElements = document.querySelectorAll('.typed');
    typedElements.forEach(el => {
      el.style.textShadow = '0 0 20px rgba(0, 217, 255, 0.8)';
    });
  }, 1000);
}

// Add scroll reveal animations with glow
function addScrollGlow() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInGlow 1s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.skill-item, .timeline-item, .portfolio-item');
  elements.forEach(el => observer.observe(el));
}

// Create cyber grid lines in hero section
function createCyberGrid() {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('cyber-grid');
  }
}

// Add loading animation
function addLoadingEffect() {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '1';
  });
}

// Enhanced card interactions
function enhanceCards() {
  const cards = document.querySelectorAll('.skill-item, .glass-card, .portfolio-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const spotlight = document.createElement('div');
      spotlight.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s;
      `;
      
      card.style.position = 'relative';
      card.appendChild(spotlight);
      
      setTimeout(() => {
        spotlight.style.opacity = '0';
        setTimeout(() => spotlight.remove(), 500);
      }, 300);
    });
  });
}

// Initialize all effects
function initFuturisticEffects() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runEffects();
    });
  } else {
    runEffects();
  }
}

function runEffects() {
  // Minimal effects for better performance
  addLoadingEffect();
  // Disabled for performance: createParticles();
  // Disabled for performance: addMouseGlow();
  // Disabled for performance: addGlitchEffect();
  enhanceTypedElements();
  // Disabled for performance: addScrollGlow();
  // Disabled for performance: createCyberGrid();
  // Disabled for performance: enhanceCards();
}

// Start the effects
initFuturisticEffects();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInGlow {
    from {
      opacity: 0;
      transform: translateY(30px);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }
`;
document.head.appendChild(style);
