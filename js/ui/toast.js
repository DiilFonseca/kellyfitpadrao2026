/* ============================================================
   KellyFit Padrao 2026 — Toast Notifications
   ============================================================ */
const Toast = {
  _container: null,

  _getContainer() {
    if (this._container) return this._container;
    this._container = document.getElementById('toast-container');
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.id = 'toast-container';
      this._container.setAttribute('aria-live', 'polite');
      Object.assign(this._container.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '380px',
        width: '100%'
      });
      document.body.appendChild(this._container);
    }
    return this._container;
  },

  show(message, type, duration) {
    type = type || 'info';
    duration = duration || 3500;

    const colors = {
      success: { bg: 'var(--success)', icon: '\u2713' },
      error: { bg: 'var(--error)', icon: '\u2717' },
      warning: { bg: 'var(--warning)', icon: '\u26A0' },
      info: { bg: 'var(--info)', icon: '\u2139' }
    };
    const c = colors[type] || colors.info;

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    Object.assign(toast.style, {
      background: 'var(--bg-card)',
      borderLeft: '4px solid ' + c.bg,
      borderRadius: '8px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: 'var(--shadow-lg)',
      color: 'var(--text-primary)',
      fontSize: '0.9rem',
      pointerEvents: 'auto',
      opacity: '0',
      transform: 'translateX(100%)',
      transition: 'all 0.3s ease'
    });

    toast.innerHTML = '<span style="font-size:1.2rem;color:' + c.bg + '">' + c.icon + '</span>' +
      '<span style="flex:1">' + message + '</span>' +
      '<button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.1rem;padding:0 4px" aria-label="Fechar">\u00D7</button>';

    toast.querySelector('button').addEventListener('click', () => this._dismiss(toast));

    this._getContainer().appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });

    if (duration > 0) {
      setTimeout(() => this._dismiss(toast), duration);
    }

    return toast;
  },

  _dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  },

  success(msg, dur) { return this.show(msg, 'success', dur); },
  error(msg, dur) { return this.show(msg, 'error', dur); },
  warning(msg, dur) { return this.show(msg, 'warning', dur); },
  info(msg, dur) { return this.show(msg, 'info', dur); }
};
