/* ============================================================
   KellyFit Padrao 2026 — Gamification (XP, Levels, Badges, Streaks)
   ============================================================ */
const Gamification = {
  LEVELS: [
    { level: 1, title: 'Iniciante Fitness', minXP: 0, maxXP: 100 },
    { level: 2, title: 'Aspirante Saudavel', minXP: 100, maxXP: 250 },
    { level: 3, title: 'Praticante', minXP: 250, maxXP: 500 },
    { level: 4, title: 'Guerreiro Fit', minXP: 500, maxXP: 900 },
    { level: 5, title: 'Atleta Amador', minXP: 900, maxXP: 1400 },
    { level: 6, title: 'Atleta Dedicado', minXP: 1400, maxXP: 2100 },
    { level: 7, title: 'Maquina de Treino', minXP: 2100, maxXP: 3000 },
    { level: 8, title: 'Elite Fitness', minXP: 3000, maxXP: 4200 },
    { level: 9, title: 'Campeao Regional', minXP: 4200, maxXP: 5700 },
    { level: 10, title: 'Master Nutricao', minXP: 5700, maxXP: 7500 },
    { level: 11, title: 'Lenda Fitness', minXP: 7500, maxXP: 10000 },
    { level: 12, title: 'Expert Saude', minXP: 10000, maxXP: 13000 },
    { level: 13, title: 'Semideus do Esporte', minXP: 13000, maxXP: 17000 },
    { level: 14, title: 'Lenda Imortal', minXP: 17000, maxXP: 22000 },
    { level: 15, title: 'MESTRE KELLY FIT', minXP: 22000, maxXP: 99999 }
  ],

  getData() {
    return Store.get('gamification', { xp: 0, streak: 0, lastDate: null, badges: [], totalXP: 0 });
  },

  _save(data) {
    Store.set('gamification', data);
  },

  addXP(amount) {
    var data = this.getData();
    var oldLevel = this.getLevelData(data.xp).level;
    data.xp += amount;
    data.totalXP = (data.totalXP || 0) + amount;
    this._save(data);

    var newLevel = this.getLevelData(data.xp).level;
    if (newLevel > oldLevel) {
      Toast.success('&#127881; Level Up! Voce e agora ' + this.getLevelData(data.xp).title + '!', 5000);
      if (newLevel === 5) this.awardBadge('b025');
      if (newLevel === 10) this.awardBadge('b026');
      if (newLevel === 15) this.awardBadge('b027');
    }

    EventBus.emit('gamification:xp', { amount: amount, total: data.xp });
    return data.xp;
  },

  getLevelData(xp) {
    var lvl = this.LEVELS[0];
    for (var i = this.LEVELS.length - 1; i >= 0; i--) {
      if (xp >= this.LEVELS[i].minXP) { lvl = this.LEVELS[i]; break; }
    }
    var pct = lvl.maxXP === 99999 ? 100 : Math.min(100, Math.round(((xp - lvl.minXP) / (lvl.maxXP - lvl.minXP)) * 100));
    return { level: lvl.level, title: lvl.title, pct: pct, nextXP: lvl.maxXP };
  },

  updateStreak() {
    var data = this.getData();
    var today = DateUtils.today();
    if (data.lastDate === today) return data.streak;

    var yesterday = DateUtils.addDays(today, -1);
    if (data.lastDate === yesterday) {
      data.streak = (data.streak || 0) + 1;
    } else if (data.lastDate !== today) {
      data.streak = 1;
    }
    data.lastDate = today;
    this._save(data);

    if (data.streak === 3) this.awardBadge('b006');
    if (data.streak === 7) { this.awardBadge('b007'); this.addXP(100); }
    if (data.streak === 14) { this.awardBadge('b008'); this.addXP(200); }
    if (data.streak === 30) { this.awardBadge('b009'); this.addXP(500); }

    return data.streak;
  },

  awardBadge(badgeId) {
    var data = this.getData();
    if (data.badges.indexOf(badgeId) > -1) return false;
    var badge = BadgesDB.getById(badgeId);
    if (!badge) return false;

    data.badges.push(badgeId);
    this._save(data);
    if (badge.xp > 0) this.addXP(badge.xp);

    Toast.success('&#127942; Conquista: ' + badge.name + '!', 5000);
    EventBus.emit('gamification:badge', { badge: badge });
    return true;
  },

  checkAndAward() {
    this.updateStreak();
    var today = DateUtils.today();
    var weights = Store.get('weights', []);
    if (weights.length >= 1) this.awardBadge('b018');
    if (weights.length >= 10) this.awardBadge('b019');

    var exercises = Store.get('exercises_' + today, []);
    if (exercises.length > 0) this.awardBadge('b005');
  },

  renderPage() {
    var container = document.getElementById('page-conquistas');
    if (!container) return;

    var data = this.getData();
    var earned = data.badges || [];
    var lvlData = this.getLevelData(data.xp);
    var allBadges = BadgesDB.getAll();

    var html = '<div class="page-header"><div><h1 class="page-title">&#127942; Conquistas</h1><p class="page-subtitle">Sua jornada de conquistas e evolucao</p></div></div>';

    // XP summary
    html += '<div class="card" style="margin-bottom:20px"><div style="display:flex;gap:20px;align-items:center">' +
      '<div class="xp-level-badge" style="width:64px;height:64px;font-size:1.6rem">' + lvlData.level + '</div>' +
      '<div style="flex:1"><div style="font-weight:800;font-size:1.1rem">' + lvlData.title + '</div>' +
      '<div class="progress-bar" style="margin:8px 0"><div class="progress-bar-fill" style="width:' + lvlData.pct + '%"></div></div>' +
      '<div style="font-size:var(--text-sm);color:var(--text-muted)">' + data.xp + ' XP / ' + lvlData.nextXP + ' XP &bull; ' + earned.length + ' / ' + allBadges.length + ' conquistas</div>' +
      '</div></div></div>';

    // Badges grid
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px">';
    allBadges.forEach(function (b) {
      var isEarned = earned.indexOf(b.id) > -1;
      html += '<div class="card ' + (isEarned ? '' : '') + '" style="text-align:center;opacity:' + (isEarned ? '1' : '0.45') + ';filter:' + (isEarned ? 'none' : 'grayscale(1)') + '">' +
        '<div style="font-size:2.4rem;margin-bottom:8px">' + b.emoji + '</div>' +
        '<div style="font-weight:800;font-size:0.85rem;margin-bottom:4px">' + b.name + '</div>' +
        '<div style="font-size:0.72rem;color:var(--text-muted)">' + b.desc + '</div>' +
        (b.xp > 0 ? '<div style="margin-top:8px" class="badge badge-success">+' + b.xp + ' XP</div>' : '') +
        (isEarned ? '<div style="margin-top:8px;font-size:0.7rem;color:var(--success)">&#10003; Conquistada</div>' : '') +
        '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
  }
};
