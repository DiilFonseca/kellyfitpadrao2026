/* ============================================================
   KellyFit Padrao 2026 — Habits Tracker Feature
   ============================================================ */
const Habits = {
  DEFAULT_HABITS: [
    { id: 'h_water', name: 'Beber agua (meta)', icon: '&#128167;', xp: 20 },
    { id: 'h_sleep', name: 'Dormir 7-8 horas', icon: '&#128164;', xp: 20 },
    { id: 'h_exercise', name: 'Exercitar-se', icon: '&#127939;', xp: 30 },
    { id: 'h_vegetables', name: 'Comer vegetais', icon: '&#129377;', xp: 20 },
    { id: 'h_nosugar', name: 'Sem acucar refinado', icon: '&#127850;', xp: 25 }
  ],

  _getHabits() {
    var user = Store.get('habits_config', null);
    return user || this.DEFAULT_HABITS;
  },

  render() {
    var container = document.getElementById('page-habitos');
    if (!container) return;

    var habits = this._getHabits();
    var today = DateUtils.today();
    var todayData = Store.get('habits_' + today, {});
    var last14 = DateUtils.getLast14Days();

    var html = '<div class="page-header"><div><h1 class="page-title">&#9989; Habitos Diarios</h1><p class="page-subtitle">Construa consistencia um dia de cada vez</p></div></div>';

    // Today's habits
    html += '<div class="card" style="margin-bottom:20px">' +
      '<div class="card-header"><h3>Hoje</h3><span class="badge badge-success">' + Object.values(todayData).filter(Boolean).length + ' / ' + habits.length + '</span></div>' +
      '<div class="habits-grid" id="habits-grid">';

    habits.forEach(function (h) {
      var done = !!todayData[h.id];
      var streak = Habits._calcStreak(h.id, last14);
      html += '<div class="habit-row">' +
        '<div class="habit-icon">' + h.icon + '</div>' +
        '<div class="habit-info"><div class="habit-name">' + h.name + '</div>' +
        '<div class="habit-streak">' + (streak > 0 ? '&#128293; ' + streak + ' dias seguidos' : 'Comece hoje!') + ' &bull; +' + h.xp + ' XP</div></div>' +
        '<button class="habit-check-btn ' + (done ? 'done' : '') + '" data-habit="' + h.id + '" data-xp="' + h.xp + '" aria-label="Marcar ' + h.name + '">' +
        (done ? '&#10003;' : '') + '</button></div>';
    });
    html += '</div></div>';

    // Heatmap last 14 days
    html += '<div class="card" style="margin-bottom:20px"><div class="card-header"><h3>Historico (14 dias)</h3></div>';
    habits.forEach(function (h) {
      html += '<div style="margin-bottom:12px"><div style="font-size:var(--text-sm);font-weight:700;margin-bottom:6px">' + h.icon + ' ' + h.name + '</div>' +
        '<div style="display:flex;gap:4px">';
      last14.forEach(function (d) {
        var hData = Store.get('habits_' + d, {});
        var done = !!hData[h.id];
        html += '<div class="heatmap-cell ' + (done ? 'level-4' : '') + '" title="' + DateUtils.formatDate(d) + '"></div>';
      });
      html += '</div></div>';
    });
    html += '</div>';

    // Tips
    var tip = TipsDB.getByCategory('mental')[0];
    if (tip) {
      html += '<div class="card" style="background:rgba(139,92,246,0.08);border-color:rgba(139,92,246,0.3)">' +
        '<div style="font-size:1.4rem;margin-bottom:8px">' + tip.icon + '</div>' +
        '<div style="font-weight:700;margin-bottom:4px">Dica de Habito</div>' +
        '<div style="color:var(--text-secondary);font-size:var(--text-sm)">' + tip.text + '</div></div>';
    }

    container.innerHTML = html;

    // Events
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.habit-check-btn');
      if (!btn) return;
      var hId = btn.getAttribute('data-habit');
      var xp = parseInt(btn.getAttribute('data-xp')) || 20;
      var hData = Store.get('habits_' + today, {});
      hData[hId] = !hData[hId];
      Store.set('habits_' + today, hData);

      if (hData[hId]) {
        Gamification.addXP(xp);
        Toast.success('&#9989; Habito marcado! +' + xp + ' XP');
        var done = Object.values(hData).filter(Boolean).length;
        if (done >= 3) Gamification.awardBadge('b023');
        if (done >= habits.length) Gamification.awardBadge('b024');
      }
      Habits.render();
    });
  },

  _calcStreak(habitId, days) {
    var streak = 0;
    var reversed = [...days].reverse();
    for (var i = 0; i < reversed.length; i++) {
      var hData = Store.get('habits_' + reversed[i], {});
      if (hData[habitId]) { streak++; } else { break; }
    }
    return streak;
  }
};
