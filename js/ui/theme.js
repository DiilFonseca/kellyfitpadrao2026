/* ============================================================
   KellyFit Padrao 2026 — Theme Toggle (Dark/Light)
   ============================================================ */
const Theme = {
  _key: 'kf_theme',

  init() {
    const saved = localStorage.getItem(this._key);
    const theme = saved || 'dark';
    this.apply(theme);
    this._bindToggle();
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this._key, theme);

    const icons = document.querySelectorAll('.theme-icon-light, .theme-icon-dark');
    icons.forEach(el => {
      if (el.classList.contains('theme-icon-light')) {
        el.style.display = theme === 'dark' ? 'inline' : 'none';
      } else {
        el.style.display = theme === 'light' ? 'inline' : 'none';
      }
    });

    EventBus.emit('theme:changed', { theme: theme });
  },

  toggle() {
    const current = this.get();
    this.apply(current === 'dark' ? 'light' : 'dark');
  },

  get() {
    return localStorage.getItem(this._key) || 'dark';
  },

  isDark() {
    return this.get() === 'dark';
  },

  _bindToggle() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle')) {
        this.toggle();
      }
    });
  }
};
