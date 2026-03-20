/* ============================================================
   KellyFit Padrao 2026 — Water Tracker Feature
   ============================================================ */
const WaterTracker = {
  render() {
    var container = document.getElementById('page-agua');
    if (!container) return;

    Auth.getCurrentUser().then(function (user) {
      var plan = user && user.nutritionPlan ? user.nutritionPlan : null;
      var goalCups = plan ? (plan.waterCups || 8) : 8;
      var goalL = (goalCups * 0.25).toFixed(2);
      var today = DateUtils.today();
      var data = Store.get('water_' + today, { cups: 0 });

      var html = '<div class="page-header"><div><h1 class="page-title">&#128167; Tracking de Agua</h1><p class="page-subtitle">Meta: ' + goalL + 'L / dia (' + goalCups + ' copos de 250ml)</p></div></div>';

      // Big circle indicator
      var pct = Math.min(100, Math.round((data.cups / goalCups) * 100));
      var currentL = (data.cups * 0.25).toFixed(2);
      html += '<div class="card" style="text-align:center;margin-bottom:20px">' +
        '<div style="display:flex;justify-content:center;margin-bottom:16px" id="water-radial"></div>' +
        '<div style="font-size:2rem;font-weight:900;color:var(--info)">' + currentL + 'L</div>' +
        '<div style="color:var(--text-muted)">de ' + goalL + 'L</div>' +
        '<div class="water-cups-grid" id="water-cups-main" style="justify-content:center;margin:16px 0"></div>' +
        '<div style="display:flex;gap:12px;justify-content:center;margin-top:16px">' +
        '<button class="btn btn-primary" id="water-add-btn">&#128167; + 1 Copo (250ml)</button>' +
        '<button class="btn btn-outline btn-sm" id="water-remove-btn">- Remover</button>' +
        '</div>' +
        '</div>';

      // Weekly stats
      var weekData = WaterTracker._getWeekStats(goalCups);
      html += '<div class="card" style="margin-bottom:20px">' +
        '<div class="card-header"><h3>Ultimos 7 Dias</h3></div>' +
        '<div id="water-week-chart" style="height:160px"></div>' +
        '</div>';

      // Tips
      var tip = TipsDB.getByCategory('agua')[Math.floor(Math.random() * 5)];
      html += '<div class="card" style="background:rgba(59,130,246,0.08);border-color:var(--info)">' +
        '<div style="font-size:1.4rem;margin-bottom:8px">' + (tip ? tip.icon : '&#128167;') + '</div>' +
        '<div style="font-weight:700;margin-bottom:4px">Dica do Dia</div>' +
        '<div style="color:var(--text-secondary);font-size:var(--text-sm)">' + (tip ? tip.text : '') + '</div>' +
        '</div>';

      container.innerHTML = html;

      // Render radial
      var radialEl = document.getElementById('water-radial');
      if (radialEl) Charts.renderRadial(radialEl, data.cups, goalCups, 'var(--info)', 120);

      // Render cups
      WaterTracker._renderCups('water-cups-main', data.cups, goalCups, today);

      // Buttons
      var addBtn = document.getElementById('water-add-btn');
      var remBtn = document.getElementById('water-remove-btn');
      if (addBtn) addBtn.addEventListener('click', function () {
        var wd = Store.get('water_' + today, { cups: 0 });
        if (wd.cups < goalCups) {
          wd.cups++;
          Store.set('water_' + today, wd);
          if (wd.cups >= goalCups) { Toast.success('&#127881; Meta de agua atingida!'); Gamification.awardBadge('b003'); }
          else Toast.info('&#128167; Copo ' + wd.cups + ' de ' + goalCups + ' registrado!');
          WaterTracker.render();
        }
      });
      if (remBtn) remBtn.addEventListener('click', function () {
        var wd = Store.get('water_' + today, { cups: 0 });
        if (wd.cups > 0) { wd.cups--; Store.set('water_' + today, wd); WaterTracker.render(); }
      });

      // Chart
      var chartEl = document.getElementById('water-week-chart');
      if (chartEl) {
        Charts.renderBar(chartEl, weekData, { height: 150, colors: ['var(--info)'], unit: 'L', label: 'Agua semanal' });
      }
    });
  },

  _renderCups(containerId, cups, goalCups, today) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (var i = 1; i <= goalCups; i++) {
      var btn = document.createElement('button');
      btn.className = 'water-cup-btn' + (i <= cups ? ' filled' : '');
      btn.innerHTML = '&#128167;';
      btn.setAttribute('aria-label', 'Copo ' + i);
      btn.addEventListener('click', (function (n) {
        return function () {
          var wd = Store.get('water_' + today, { cups: 0 });
          wd.cups = wd.cups >= n ? n - 1 : n;
          Store.set('water_' + today, wd);
          WaterTracker.render();
        };
      }(i)));
      container.appendChild(btn);
    }
  },

  _getWeekStats(goalCups) {
    var days = DateUtils.getLast7Days();
    return days.map(function (d) {
      var wd = Store.get('water_' + d, { cups: 0 });
      return { label: DateUtils.getDayName(d).substr(0, 3), value: parseFloat((wd.cups * 0.25).toFixed(2)) };
    });
  }
};
