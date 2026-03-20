/* ============================================================
   KellyFit Padrao 2026 — Hash Utilities (SHA-256 + HMAC)
   ============================================================ */
const Hash = {
  async sha256(message) {
    try {
      if (crypto && crypto.subtle) {
        const data = new TextEncoder().encode(message);
        const buf = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) { /* fallback */ }
    // Fallback: simple hash (not crypto-secure but functional)
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const c = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash |= 0;
    }
    return 'fb_' + Math.abs(hash).toString(16).padStart(8, '0') + btoa(message).substring(0, 20);
  },

  async hmac(message, secret) {
    try {
      if (crypto && crypto.subtle) {
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
        return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) { /* fallback */ }
    return await this.sha256(secret + '|' + message);
  },

  getFingerprint() {
    const parts = [
      navigator.userAgent || '',
      screen.width + 'x' + screen.height,
      (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
      navigator.language || '',
      navigator.hardwareConcurrency || 0
    ];
    return parts.join('|');
  },

  simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  },

  generateId() {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);
  }
};
