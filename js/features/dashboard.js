/* ============================================================
   KellyFit Padrao 2026 — Dashboard Feature
   ============================================================ */
(function () {
  'use strict';

  var _user = null;
  var _plan = null;

  document.addEventListener('DOMContentLoaded', async function () {
    Theme.init();

    var loggedIn = await Auth.isLoggedIn();
    if (!loggedIn) { window.location.href = 'index.html'; return; }

    _user = await Auth.getCurrentUser();
    if (!_user) { window.location.href = 'index.html'; return; }

    if (!_user.quizDone) { window.location.href = 'quiz.html'; return; }

    var trialValid = await Auth.isTrialValid();
    if (!trialValid) {
      var ov = document.getElementById('trial-expired-overlay');
      if (ov) ov.style.display = 'flex';
      return;
    }

    _plan = _user.nutritionPlan;
    initTopbar();
    initSidebar();
    initRouter();
    renderDashboard();

    // Start onboarding tour for first-time users
    if (window.Onboarding && Onboarding.shouldShow()) {
      setTimeout(function () { Onboarding.start(); }, 800);
    }
  });

  function initTopbar() {
    var nameEl = document.getElementById('topbar-user-name');
    var avatarEl = document.getElementById('topbar-avatar');
    var trialEl = document.getElementById('trial-days-left');

    if (nameEl) nameEl.textContent = _user.name.split(' ')[0];
    if (avatarEl) avatarEl.textContent = _user.name.charAt(0).toUpperCase();

    Auth.getTrialDaysLeft().then(function (days) {
      if (trialEl) trialEl.textContent = days === Infinity ? '&#8734;' : days;
      var badge = document.getElementById('trial-badge');
      if (badge && days <= 1) badge.style.background = 'rgba(239,68,68,0.15)';
    });

    var toggleBtn = document.getElementById('sidebar-toggle');
    var sidebar = document.getElementById('app-sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', function (e) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          sidebar.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    var logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        Modal.confirm('Sair', 'Deseja realmente sair do KellyFit?', function () {
          Auth.logout();
          window.location.href = 'index.html';
        });
      });
    }

    var userBtn = document.getElementById('topbar-user-btn');
    if (userBtn) {
      userBtn.addEventListener('click', function () {
        Router.navigate('perfil');
      });
    }
  }

  function initSidebar() {
    document.querySelectorAll('.nav-item[data-route]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        Router.navigate(btn.getAttribute('data-route'));
      });
    });
  }

  function initRouter() {
    Router.define({
      dashboard: renderDashboard,
      cardapio: renderCardapio,
      planejador: renderPlanejador,
      agua: renderAgua,
      exercicios: renderExercicios,
      habitos: renderHabitos,
      progresso: renderProgresso,
      analytics: renderAnalytics,
      imc: renderIMC,
      compras: renderCompras,
      conquistas: renderConquistas,
      perfil: renderPerfil
    }, 'dashboard');
    Router.init();
  }

  // ---- Render Dashboard ----
  function renderDashboard() {
    renderGreeting();
    renderXPBar();
    renderSummaryCards();
    renderMacrosRing();
    renderQuickWater();
    renderTodayMealsPreview();
    renderRecentBadges();
  }

  function renderGreeting() {
    var hour = new Date().getHours();
    var greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    var el = document.getElementById('dashboard-greeting');
    var dateEl = document.getElementById('dashboard-date');
    if (el) el.innerHTML = greet + ', ' + _user.name.split(' ')[0] + '! &#128075;';
    if (dateEl) dateEl.textContent = DateUtils.formatDateFull(DateUtils.today());

    var logWeightBtn = document.getElementById('btn-log-weight');
    if (logWeightBtn) {
      logWeightBtn.addEventListener('click', function () {
        Modal.open({
          title: 'Registrar Peso',
          content: '<div class="input-group"><label>Peso atual (kg)</label><input class="input" type="number" id="modal-weight" min="30" max="300" step="0.1" placeholder="70.5"></div>',
          footer: '<button class="btn btn-primary" id="modal-save-weight">Salvar</button>',
          onClose: null
        });
        setTimeout(function () {
          var saveBtn = document.getElementById('modal-save-weight');
          if (saveBtn) {
            saveBtn.addEventListener('click', function () {
              var v = parseFloat(document.getElementById('modal-weight').value);
              if (isNaN(v) || v < 30 || v > 300) { Toast.error('Peso invalido'); return; }
              var weights = Store.get('weights', []);
              var today = DateUtils.today();
              var idx = weights.findIndex(function (w) { return w.date === today; });
              if (idx > -1) { weights[idx].value = v; } else { weights.push({ date: today, value: v }); }
              Store.set('weights', weights);
              Gamification.addXP(50);
              Toast.success('Peso registrado: ' + v + 'kg');
              Modal.closeAll();
              renderSummaryCards();
            });
          }
        }, 100);
      });
    }
  }

  function renderXPBar() {
    var gData = Gamification.getData();
    var lvlData = Gamification.getLevelData(gData.xp);
    var el = document.getElementById('xp-level-num');
    var title = document.getElementById('xp-title');
    var fill = document.getElementById('xp-bar-fill');
    var text = document.getElementById('xp-bar-text');
    var streak = document.getElementById('streak-num');

    if (el) el.textContent = lvlData.level;
    if (title) title.textContent = lvlData.title;
    if (fill) fill.style.width = lvlData.pct + '%';
    if (text) text.textContent = gData.xp + ' / ' + lvlData.nextXP + ' XP';
    if (streak) streak.textContent = gData.streak;
  }

  function renderSummaryCards() {
    var container = document.getElementById('summary-cards');
    if (!container || !_plan) return;

    var today = DateUtils.today();
    var meals = Store.get('meals_' + today, []);
    var consumed = meals.reduce(function (sum, m) { return { kcal: sum.kcal + (m.calories || 0), prot: sum.prot + (m.protein || 0) }; }, { kcal: 0, prot: 0 });
    var weights = Store.get('weights', []);
    var lastWeight = weights.length ? weights[weights.length - 1].value : null;

    var remaining = Math.max(0, _plan.calories - consumed.kcal);

    container.innerHTML = [
      { icon: '&#127869;', label: 'Calorias Consumidas', value: consumed.kcal + ' kcal', color: 'green', pct: Math.min(100, (consumed.kcal / _plan.calories) * 100) },
      { icon: '&#9878;', label: 'Restante do Dia', value: remaining + ' kcal', color: 'blue', pct: null },
      { icon: '&#129371;', label: 'Proteina Hoje', value: consumed.prot + 'g / ' + _plan.protein + 'g', color: 'red', pct: Math.min(100, (consumed.prot / _plan.protein) * 100) },
      { icon: '&#9878;', label: 'Peso Atual', value: lastWeight ? lastWeight + ' kg' : 'Nao registrado', color: 'orange', pct: null }
    ].map(function (c) {
      return '<div class="summary-card"><div class="summary-card-header"><div class="summary-card-icon ' + c.color + '">' + c.icon + '</div></div>' +
        '<div class="summary-card-value">' + c.value + '</div><div class="summary-card-label">' + c.label + '</div>' +
        (c.pct !== null ? '<div class="summary-card-progress"><div class="progress-bar"><div class="progress-bar-fill" style="width:' + c.pct + '%"></div></div></div>' : '') +
        '</div>';
    }).join('');
  }

  function renderMacrosRing() {
    var container = document.getElementById('macros-ring-wrap');
    if (!container || !_plan) return;

    var today = DateUtils.today();
    var meals = Store.get('meals_' + today, []);
    var prot = meals.reduce(function (s, m) { return s + (m.protein || 0); }, 0);
    var carb = meals.reduce(function (s, m) { return s + (m.carbs || 0); }, 0);
    var fat = meals.reduce(function (s, m) { return s + (m.fat || 0); }, 0);

    var ringDiv = document.createElement('div');
    ringDiv.id = 'macros-ring-svg';
    var legendDiv = document.createElement('div');
    legendDiv.className = 'macros-legend';

    container.innerHTML = '';
    container.appendChild(ringDiv);
    container.appendChild(legendDiv);

    var total = prot * 4 + carb * 4 + fat * 9 || 1;
    Charts.renderRing(ringDiv, [
      { value: prot * 4, color: 'var(--error)' },
      { value: carb * 4, color: 'var(--warning)' },
      { value: fat * 9, color: 'var(--info)' }
    ], {
      size: 120,
      centerText: (prot * 4 + carb * 4 + fat * 9) + '',
      centerLabel: 'kcal'
    });

    legendDiv.innerHTML = [
      { label: 'Proteina', val: prot + 'g', target: _plan.protein + 'g', color: 'var(--error)' },
      { label: 'Carb', val: carb + 'g', target: _plan.carbs + 'g', color: 'var(--warning)' },
      { label: 'Gordura', val: fat + 'g', target: _plan.fat + 'g', color: 'var(--info)' }
    ].map(function (m) {
      return '<div class="macro-item"><div class="macro-dot" style="background:' + m.color + '"></div>' +
        '<div class="macro-info"><div class="macro-name">' + m.label + '</div><div class="macro-val">' + m.val + '</div>' +
        '<div class="macro-target">Meta: ' + m.target + '</div></div></div>';
    }).join('');
  }

  function renderQuickWater() {
    var container = document.getElementById('water-quick-cups');
    var label = document.getElementById('water-quick-label');
    if (!container) return;

    var today = DateUtils.today();
    var waterData = Store.get('water_' + today, { cups: 0 });
    var goalCups = _plan ? _plan.waterCups : 8;

    container.innerHTML = '';
    for (var i = 1; i <= goalCups; i++) {
      var btn = document.createElement('button');
      btn.className = 'water-cup-btn' + (i <= waterData.cups ? ' filled' : '');
      btn.innerHTML = '&#128167;';
      btn.setAttribute('aria-label', 'Copo ' + i + ' de agua');
      btn.setAttribute('data-cup', i);
      btn.addEventListener('click', (function (cupNum) {
        return function () {
          var wd = Store.get('water_' + today, { cups: 0 });
          wd.cups = wd.cups >= cupNum ? cupNum - 1 : cupNum;
          Store.set('water_' + today, wd);
          renderQuickWater();
          if (wd.cups >= goalCups) Gamification.awardBadge('b003');
        };
      }(i)));
      container.appendChild(btn);
    }

    var totalL = (waterData.cups * 0.25).toFixed(2);
    if (label) label.textContent = totalL + 'L / ' + (goalCups * 0.25).toFixed(2) + 'L';
  }

  function renderTodayMealsPreview() {
    var container = document.getElementById('today-meals-preview');
    var btnGo = document.getElementById('btn-go-cardapio');
    if (!container) return;

    var today = DateUtils.today();
    var meals = Store.get('meals_' + today, []);

    if (btnGo) btnGo.addEventListener('click', function () { Router.navigate('cardapio'); });

    if (!meals.length) {
      container.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-muted)"><p>&#127869; Nenhuma refeicao registrada hoje.</p><button class="btn btn-primary btn-sm" style="margin-top:12px" id="go-cardapio-from-dash">Adicionar Refeicao</button></div>';
      var btn = container.querySelector('#go-cardapio-from-dash');
      if (btn) btn.addEventListener('click', function () { Router.navigate('cardapio'); });
      return;
    }

    var categories = { cafe: '7:00', almoco: '12:00', lanche: '15:00', jantar: '19:00', 'pre-treino': '17:00', 'pos-treino': '18:30' };
    container.innerHTML = meals.slice(0, 3).map(function (m) {
      return '<div class="meal-slot">' +
        '<span class="meal-slot-time">' + (categories[m.category] || '') + '</span>' +
        '<span class="meal-slot-icon">' + (m.emoji || '&#127869;') + '</span>' +
        '<div class="meal-slot-info"><div class="meal-slot-name">' + m.name + '</div>' +
        '<div class="meal-slot-kcal">' + m.calories + ' kcal</div>' +
        '<div class="meal-slot-macros"><span class="macro-tag p">P:' + m.protein + 'g</span><span class="macro-tag c">C:' + m.carbs + 'g</span><span class="macro-tag g">G:' + m.fat + 'g</span></div></div>' +
        '</div>';
    }).join('');
  }

  function renderRecentBadges() {
    var container = document.getElementById('recent-badges');
    var btnGo = document.getElementById('btn-go-conquistas');
    if (!container) return;

    if (btnGo) btnGo.addEventListener('click', function () { Router.navigate('conquistas'); });

    var gData = Gamification.getData();
    var earned = gData.badges || [];
    var allBadges = BadgesDB.getAll().slice(0, 8);

    container.innerHTML = allBadges.map(function (b) {
      var isEarned = earned.indexOf(b.id) > -1;
      return '<div class="badge-mini ' + (isEarned ? 'earned' : 'locked') + '" data-tooltip="' + b.name + ': ' + b.desc + '">' + b.emoji + '</div>';
    }).join('');
  }

  // ---- Route delegations ----
  function renderCardapio() { if (window.MealPlanner) MealPlanner.render(); }
  function renderPlanejador() { if (window.MealPlanner) MealPlanner.renderWeekly(); }
  function renderAgua() { if (window.WaterTracker) WaterTracker.render(); }
  function renderExercicios() { if (window.ExerciseTracker) ExerciseTracker.render(); }
  function renderHabitos() { if (window.Habits) Habits.render(); }
  function renderProgresso() { if (window.Progress) Progress.render(); }
  function renderAnalytics() { if (window.Analytics) Analytics.render(); }
  function renderIMC() { if (window.BMICalculator) BMICalculator.render(); }
  function renderCompras() { if (window.ShoppingList) ShoppingList.render(); }
  function renderConquistas() { if (window.Gamification) Gamification.renderPage(); }
  function renderPerfil() { if (window.Profile) Profile.render(); }

}());
