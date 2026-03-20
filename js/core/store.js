/* ============================================================
   KellyFit Padrao 2026 — Store (localStorage + HMAC anti-tamper)
   ============================================================ */
const Store = {
  _SECRET: 'KF2026_',

  async _sign(data) {
    const raw = JSON.stringify(data);
    const sig = await Hash.hmac(raw, this._SECRET + Hash.getFingerprint());
    return { d: data, s: sig };
  },

  async _verify(wrapped) {
    if (!wrapped || !wrapped.d || !wrapped.s) return null;
    const raw = JSON.stringify(wrapped.d);
    const expected = await Hash.hmac(raw, this._SECRET + Hash.getFingerprint());
    if (expected !== wrapped.s) {
      console.warn('[Store] Tamper detected — signature mismatch');
      return null;
    }
    return wrapped.d;
  },

  async setSecure(key, data) {
    try {
      const wrapped = await this._sign(data);
      localStorage.setItem('kf_' + key, JSON.stringify(wrapped));
      return true;
    } catch (e) {
      console.error('[Store] setSecure error:', e);
      return false;
    }
  },

  async getSecure(key) {
    try {
      const raw = localStorage.getItem('kf_' + key);
      if (!raw) return null;
      const wrapped = JSON.parse(raw);
      return await this._verify(wrapped);
    } catch (e) {
      console.error('[Store] getSecure error:', e);
      return null;
    }
  },

  set(key, data) {
    try {
      localStorage.setItem('kf_' + key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('[Store] set error:', e);
      return false;
    }
  },

  get(key, fallback) {
    try {
      const raw = localStorage.getItem('kf_' + key);
      if (raw === null) return fallback !== undefined ? fallback : null;
      return JSON.parse(raw);
    } catch (e) {
      return fallback !== undefined ? fallback : null;
    }
  },

  remove(key) {
    localStorage.removeItem('kf_' + key);
  },

  has(key) {
    return localStorage.getItem('kf_' + key) !== null;
  },

  keys() {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kf_')) result.push(k.substring(3));
    }
    return result;
  },

  clear() {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kf_')) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  },

  getSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kf_')) {
        total += k.length + (localStorage.getItem(k) || '').length;
      }
    }
    return total;
  }
};
