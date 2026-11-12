/**
 * Luxury Golden Stardust & Bokeh Particles Engine
 * Designed for Imran & Saniya's Royal Islamic Wedding Invitation
 */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Particle configuration
  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
  const particles = [];

  // Mouse interaction tracker
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', () => {
    initCanvas();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  class GoldenParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 20;
      this.size = Math.random() * 2.8 + 0.8;
      this.baseAlpha = Math.random() * 0.6 + 0.2;
      this.alpha = this.baseAlpha;
      this.speedY = Math.random() * 0.45 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.swingPeriod = Math.random() * 0.02 + 0.005;
      this.swingPhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      this.twinklePhase = Math.random() * Math.PI * 2;
      
      // Color variety: Champagne gold, metallic gold, bright ivory
      const colors = [
        '255, 245, 216', // Champagne
        '212, 175, 98',  // Metallic gold
        '243, 229, 189', // Pale gold
        '255, 255, 255'  // Diamond glint
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isGlint = Math.random() < 0.15;
    }

    update() {
      this.y -= this.speedY;
      this.swingPhase += this.swingPeriod;
      this.twinklePhase += this.twinkleSpeed;
      this.x += Math.sin(this.swingPhase) * 0.4 + this.speedX;

      // Soft twinkle effect
      this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.25;
      if (this.alpha < 0.1) this.alpha = 0.1;

      // Subtle mouse repulsion / aura
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
      }

      // Recycle when off-screen
      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      
      // Radial glow for larger glints
      if (this.isGlint || this.size > 2.2) {
        ctx.shadowColor = `rgba(212, 175, 98, ${this.alpha * 0.8})`;
        ctx.shadowBlur = this.size * 5;
      }

      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles
  initCanvas();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new GoldenParticle());
  }

  // Animation Loop
  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
})();

