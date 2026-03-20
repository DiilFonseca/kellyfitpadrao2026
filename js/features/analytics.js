/* ============================================================
   KellyFit Padrao 2026 — Analytics Feature
   ============================================================ */
const Analytics = {
  render() {
    var container = document.getElementById('page-analytics');
    if (!container) return;

    Auth.getCurrentUser().then(function (user) {
      var plan = user && user.nutritionPlan ? user.nutritionPlan : null;
      var weights = Store.get('weights', []);
      var last7 = DateUtils.getLast7Days();

      var html = '<div class="page-header"><div><h1 class="page-title">&#128202; Analytics</h1><p class="page-subtitle">Tendencias e predicoes baseadas em seus dados reais</p></div></div>';

      // Daily calorie trend
      var calData = last7.map(function (d) {
        var meals = Store.get('meals_' + d, []);
        var kcal = meals.reduce(function (s, m) { return s + m.calories; }, 0);
        return { label: DateUtils.getDayName(d).substr(0, 3), value: kcal };
      });

      html += '<div class="chart-card"><div class="chart-header"><h3 class="chart-title">Calorias por Dia (7 dias)</h3>' +
        (plan ? '<span class="badge badge-info">Meta: ' + plan.calories + ' kcal</span>' : '') + '</div>' +
        '<div id="cal-chart" style="height:180px"></div></div>';

      // Protein trend
      var protData = last7.map(function (d) {
        var meals = Store.get('meals_' + d, []);
        var prot = meals.reduce(function (s, m) { return s + m.protein; }, 0);
        return { label: DateUtils.getDayName(d).substr(0, 3), value: prot };
      });

      html += '<div class="chart-card"><div class="chart-header"><h3 class="chart-title">Proteina por Dia (g)</h3>' +
        (plan ? '<span class="badge badge-error">Meta: ' + plan.protein + 'g</span>' : '') + '</div>' +
        '<div id="prot-chart" style="height:160px"></div></div>';

      // Weight projection
      if (weights.length >= 3 && plan && user.quizAnswers) {
        var recentWeights = weights.slice(-7);
        var avgChange = 0;
        for (var i = 1; i < recentWeights.length; i++) {
          avgChange += recentWeights[i].value - recentWeights[i - 1].value;
        }
        avgChange = avgChange / (recentWeights.length - 1);
        var currentW = recentWeights[recentWeights.length - 1].value;
        var targetW = user.quizAnswers.target_weight || currentW;
        var daysToGoal = avgChange !== 0 ? Math.abs(Math.round((targetW - currentW) / avgChange)) : null;

        html += '<div class="card" style="margin-bottom:20px;background:rgba(16,185,129,0.05);border-color:var(--primary-500)">' +
          '<div class="card-header"><h3>&#127919; Projecao de Resultado</h3></div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">' +
          '<div class="result-stat"><div class="result-stat-value">' + currentW + '</div><div class="result-stat-label">kg atual</div></div>' +
          '<div class="result-stat"><div class="result-stat-value">' + targetW + '</div><div class="result-stat-label">kg meta</div></div>' +
          '<div class="result-stat"><div class="result-stat-value">' + (daysToGoal !== null ? daysToGoal + 'd' : 'N/A') + '</div><div class="result-stat-label">estimativa</div></div>' +
          '</div>' +
          '<div style="margin-top:16px;padding:12px;background:var(--bg-input);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--text-secondary)">' +
          '<strong>Tendencia atual:</strong> ' + (avgChange > 0 ? '+' : '') + avgChange.toFixed(2) + 'kg/dia (' + (avgChange < 0 ? 'emagrecendo' : avgChange > 0 ? 'engordando' : 'estavel') + ')' +
          '</div></div>';
      }

      // Water adherence
      var waterAdherence = last7.map(function (d) {
        var wd = Store.get('water_' + d, { cups: 0 });
        var goal = plan ? plan.waterCups : 8;
        return { label: DateUtils.getDayName(d).substr(0, 3), value: Math.min(100, Math.round((wd.cups / goal) * 100)) };
      });

      html += '<div class="chart-card"><div class="chart-header"><h3 class="chart-title">Aderencia Hidratacao (%)</h3></div>' +
        '<div id="water-chart" style="height:150px"></div></div>';

      // Exercise activity
      var exData = last7.map(function (d) {
        var exes = Store.get('exercises_' + d, []);
        var min = exes.reduce(function (s, e) { return s + e.duration; }, 0);
        return { label: DateUtils.getDayName(d).substr(0, 3), value: min };
      });

      html += '<div class="chart-card"><div class="chart-header"><h3 class="chart-title">Minutos de Exercicio por Dia</h3></div>' +
        '<div id="ex-chart" style="height:150px"></div></div>';

      container.innerHTML = html;

      setTimeout(function () {
        var calEl = document.getElementById('cal-chart');
        var protEl = document.getElementById('prot-chart');
        var waterEl = document.getElementById('water-chart');
        var exEl = document.getElementById('ex-chart');
        if (calEl) Charts.renderLine(calEl, calData, { height: 180, unit: ' kcal' });
        if (protEl) Charts.renderBar(protEl, protData, { height: 160, unit: 'g', colors: ['var(--error)'] });
        if (waterEl) Charts.renderBar(waterEl, waterAdherence, { height: 150, unit: '%', colors: ['var(--info)'] });
        if (exEl) Charts.renderBar(exEl, exData, { height: 150, unit: 'min', colors: ['var(--accent-500)'] });
      }, 50);
    });
  }
};
