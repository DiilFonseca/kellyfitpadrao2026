/* ============================================================
   KellyFit Padrao 2026 — Particles Background
   ============================================================ */
const Particles = {
  _canvas: null,
  _ctx: null,
  _particles: [],
  _animId: null,
  _paused: false,
  _w: 0,
  _h: 0,
  _mouse: { x: null, y: null },

  init(canvasId) {
    this._canvas = document.getElementById(canvasId);
    if (!this._canvas) return;
    this._ctx = this._canvas.getContext('2d');
    this._resize();
    this._createParticles();
    this._bindEvents();
    this._animate();
  },

  _resize() {
    this._w = this._canvas.width = window.innerWidth;
    this._h = this._canvas.height = window.innerHeight;
  },

  _createParticles() {
    const count = Math.min(Math.floor((this._w * this._h) / 12000), 80);
    this._particles = [];
    for (let i = 0; i < count; i++) {
      this._particles.push(this._makeParticle());
    }
  },

  _makeParticle() {
    return {
      x: Math.random() * this._w,
      y: Math.random() * this._h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: this._randomColor()
    };
  },

  _randomColor() {
    const colors = ['16,185,129', '59,130,246', '249,115,22', '139,92,246'];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  _bindEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this._resize();
        this._createParticles();
      }, 200);
    });

    window.addEventListener('mousemove', (e) => {
      this._mouse.x = e.clientX;
      this._mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this._mouse.x = null;
      this._mouse.y = null;
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          this._paused = !e.isIntersecting;
        });
      }, { threshold: 0 });
      observer.observe(this._canvas);
    }
  },

  _animate() {
    this._animId = requestAnimationFrame(() => this._animate());
    if (this._paused) return;

    this._ctx.clearRect(0, 0, this._w, this._h);

    this._particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this._w;
      if (p.x > this._w) p.x = 0;
      if (p.y < 0) p.y = this._h;
      if (p.y > this._h) p.y = 0;

      if (this._mouse.x !== null) {
        const dx = this._mouse.x - p.x;
        const dy = this._mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }
      }

      this._ctx.beginPath();
      this._ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this._ctx.fillStyle = 'rgba(' + p.color + ',' + p.opacity + ')';
      this._ctx.fill();
    });

    this._drawConnections();
  },

  _drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < this._particles.length; i++) {
      for (let j = i + 1; j < this._particles.length; j++) {
        const a = this._particles[i];
        const b = this._particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          this._ctx.beginPath();
          this._ctx.moveTo(a.x, a.y);
          this._ctx.lineTo(b.x, b.y);
          this._ctx.strokeStyle = 'rgba(16,185,129,' + alpha + ')';
          this._ctx.lineWidth = 0.8;
          this._ctx.stroke();
        }
      }
    }
  },

  destroy() {
    if (this._animId) cancelAnimationFrame(this._animId);
    this._particles = [];
  }
};
