/* ============================================================
   KellyFit Padrao 2026 — Auth (registro, login, trial 7 dias)
   ============================================================ */
const Auth = {
  TRIAL_DAYS: 7,

  async register(name, email, password) {
    if (!name || !email || !password) return { ok: false, msg: 'Preencha todos os campos.' };
    if (password.length < 6) return { ok: false, msg: 'Senha deve ter pelo menos 6 caracteres.' };

    const users = Store.get('users', []);
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Email ja cadastrado.' };

    const id = Hash.generateId();
    const passHash = await Hash.sha256(email + ':' + password);
    const now = Date.now();

    const user = {
      id: id,
      name: name,
      email: email,
      passHash: passHash,
      createdAt: now,
      trialStart: now,
      trialEnd: now + this.TRIAL_DAYS * 86400000,
      plan: 'trial',
      quizDone: false,
      quizAnswers: null,
      nutritionPlan: null
    };

    users.push(user);
    Store.set('users', users);

    await this._createSession(user);
    EventBus.emit('auth:register', { userId: id });
    return { ok: true, user: user };
  },

  async login(email, password) {
    if (!email || !password) return { ok: false, msg: 'Preencha todos os campos.' };

    const users = Store.get('users', []);
    const user = users.find(u => u.email === email);
    if (!user) return { ok: false, msg: 'Email nao encontrado.' };

    const passHash = await Hash.sha256(email + ':' + password);
    if (passHash !== user.passHash) return { ok: false, msg: 'Senha incorreta.' };

    await this._createSession(user);
    EventBus.emit('auth:login', { userId: user.id });
    return { ok: true, user: user };
  },

  logout() {
    Store.remove('session');
    EventBus.emit('auth:logout');
  },

  async _createSession(user) {
    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      loginAt: Date.now()
    };
    await Store.setSecure('session', session);
  },

  async getSession() {
    return await Store.getSecure('session');
  },

  async getCurrentUser() {
    const session = await this.getSession();
    if (!session) return null;
    const users = Store.get('users', []);
    return users.find(u => u.id === session.userId) || null;
  },

  async isLoggedIn() {
    const session = await this.getSession();
    return session !== null;
  },

  async isTrialValid() {
    const user = await this.getCurrentUser();
    if (!user) return false;
    if (user.plan === 'premium') return true;
    return Date.now() < user.trialEnd;
  },

  async getTrialDaysLeft() {
    const user = await this.getCurrentUser();
    if (!user) return 0;
    if (user.plan === 'premium') return Infinity;
    const left = Math.ceil((user.trialEnd - Date.now()) / 86400000);
    return Math.max(0, left);
  },

  updateUser(userId, updates) {
    const users = Store.get('users', []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    Object.assign(users[idx], updates);
    Store.set('users', users);
    EventBus.emit('auth:userUpdated', { userId: userId });
    return true;
  },

  async saveQuizResults(answers, plan) {
    const user = await this.getCurrentUser();
    if (!user) return false;
    return this.updateUser(user.id, {
      quizDone: true,
      quizAnswers: answers,
      nutritionPlan: plan
    });
  },

  async requireAuth(redirectTo) {
    const loggedIn = await this.isLoggedIn();
    if (!loggedIn) {
      window.location.href = redirectTo || 'index.html#login';
      return false;
    }
    return true;
  },

  async requireTrial() {
    const valid = await this.isTrialValid();
    if (!valid) {
      EventBus.emit('auth:trialExpired');
      return false;
    }
    return true;
  }
};
