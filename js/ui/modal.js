/* ============================================================
   KellyFit Padrao 2026 — Modal System
   ============================================================ */
const Modal = {
  _stack: [],

  open(options) {
    const id = options.id || 'modal-' + Date.now();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = id;
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'var(--overlay-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: String(9000 + this._stack.length),
      opacity: '0',
      transition: 'opacity 0.25s ease',
      padding: '16px'
    });

    const maxW = options.maxWidth || '500px';
    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    Object.assign(dialog.style, {
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-xl)',
      width: '100%',
      maxWidth: maxW,
      maxHeight: '90vh',
      overflow: 'auto',
      transform: 'scale(0.9)',
      transition: 'transform 0.25s ease',
      position: 'relative'
    });

    let html = '';

    if (options.title) {
      html += '<div style="padding:20px 24px 0;display:flex;align-items:center;justify-content:space-between">' +
        '<h3 style="margin:0;font-size:1.2rem;color:var(--text-primary)">' + options.title + '</h3>' +
        '<button class="modal-close-btn" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;padding:0 4px" aria-label="Fechar">\u00D7</button>' +
        '</div>';
    }

    html += '<div class="modal-body" style="padding:20px 24px">' + (options.content || '') + '</div>';

    if (options.footer) {
      html += '<div class="modal-footer" style="padding:12px 24px 20px;display:flex;gap:10px;justify-content:flex-end">' + options.footer + '</div>';
    }

    dialog.innerHTML = html;
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const closeBtn = dialog.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close(id));

    if (options.closeOnOverlay !== false) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close(id);
      });
    }

    this._stack.push({ id: id, overlay: overlay, onClose: options.onClose });

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    });

    const handleEsc = (e) => {
      if (e.key === 'Escape' && this._stack.length > 0 && this._stack[this._stack.length - 1].id === id) {
        this.close(id);
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);

    EventBus.emit('modal:opened', { id: id });
    return id;
  },

  close(id) {
    const idx = this._stack.findIndex(m => m.id === id);
    if (idx === -1) return;

    const entry = this._stack[idx];
    const overlay = entry.overlay;
    const dialog = overlay.querySelector('.modal-dialog');

    overlay.style.opacity = '0';
    if (dialog) dialog.style.transform = 'scale(0.9)';

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 250);

    this._stack.splice(idx, 1);
    if (entry.onClose) entry.onClose();
    EventBus.emit('modal:closed', { id: id });
  },

  closeAll() {
    [...this._stack].forEach(m => this.close(m.id));
  },

  confirm(title, message, onConfirm, onCancel) {
    const id = this.open({
      title: title,
      content: '<p style="color:var(--text-secondary);margin:0">' + message + '</p>',
      footer: '<button class="modal-cancel-btn" style="padding:10px 20px;border-radius:var(--radius-md);background:var(--bg-input);color:var(--text-primary);border:none;cursor:pointer">Cancelar</button>' +
        '<button class="modal-confirm-btn" style="padding:10px 20px;border-radius:var(--radius-md);background:var(--primary-500);color:white;border:none;cursor:pointer;font-weight:600">Confirmar</button>',
      closeOnOverlay: false,
      onClose: onCancel
    });

    const overlay = document.getElementById(id);
    if (overlay) {
      const cancelBtn = overlay.querySelector('.modal-cancel-btn');
      const confirmBtn = overlay.querySelector('.modal-confirm-btn');
      if (cancelBtn) cancelBtn.addEventListener('click', () => { this.close(id); if (onCancel) onCancel(); });
      if (confirmBtn) confirmBtn.addEventListener('click', () => { this.close(id); if (onConfirm) onConfirm(); });
    }
    return id;
  },

  alert(title, message, onOk) {
    const id = this.open({
      title: title,
      content: '<p style="color:var(--text-secondary);margin:0">' + message + '</p>',
      footer: '<button class="modal-ok-btn" style="padding:10px 24px;border-radius:var(--radius-md);background:var(--primary-500);color:white;border:none;cursor:pointer;font-weight:600">OK</button>'
    });

    const overlay = document.getElementById(id);
    if (overlay) {
      const okBtn = overlay.querySelector('.modal-ok-btn');
      if (okBtn) okBtn.addEventListener('click', () => { this.close(id); if (onOk) onOk(); });
    }
    return id;
  }
};
