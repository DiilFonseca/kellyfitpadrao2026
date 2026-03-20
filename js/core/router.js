/* ============================================================
   KellyFit Padrao 2026 — SPA Hash Router
   ============================================================ */
const Router = {
  _routes: {},
  _current: null,
  _default: null,

  define(routes, defaultRoute) {
    this._routes = routes;
    this._default = defaultRoute || Object.keys(routes)[0];
  },

  init() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  },

  navigate(path) {
    window.location.hash = path;
  },

  _resolve() {
    const hash = window.location.hash.replace('#', '') || this._default;
    const route = this._routes[hash] || this._routes[this._default];
    if (!route) return;

    const prev = this._current;
    this._current = hash;

    if (prev) {
      const prevEl = document.getElementById('page-' + prev);
      if (prevEl) { prevEl.style.display = 'none'; prevEl.setAttribute('aria-hidden', 'true'); }
    }

    const el = document.getElementById('page-' + hash);
    if (el) { el.style.display = ''; el.removeAttribute('aria-hidden'); }

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-route') === hash);
    });

    EventBus.emit('router:change', { from: prev, to: hash });
    if (typeof route === 'function') route();
  },

  getCurrent() { return this._current; }
};
