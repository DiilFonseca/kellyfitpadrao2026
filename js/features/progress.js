/* ============================================================
   KellyFit Padrao 2026 — Progress Charts Feature
   ============================================================ */
const Progress = {
  render() {
    var container = document.getElementById('page-progresso');
    if (!container) return;

    var weights = Store.get('weights', []);
    var last30 = DateUtils.getLast14Days();

    var html = '<div class="page-header"><div><h1 class="page-title">&#128200; Progresso</h1><p class="page-subtitle">Acompanhe sua evolucao de peso</p></div>' +
      '<button class="btn btn-primary btn-sm" id="btn-log-weight-prog">+ Registrar Peso</button></div>';

    if (weights.length < 2) {
      html += '<div class="card" style="text-align:center;padding:48px">' +
        '<div style="font-size:3rem;margin-bottom:16px">&#128200;</div>' +
        '<h3>Sem dados suficientes</h3>' +
        '<p style="color:var(--text-muted);margin:12px 0">Registre seu peso diariamente para ver os graficos de evolucao.</p>' +
        '<button class="btn btn-primary" id="btn-log-first-weight">Registrar Primeiro Peso</button>' +
        '</div>';
    } else {
      // Chart
      var chartData = weights.slice(-14).map(function (w) {
        return { label: DateUtils.formatDate(w.date).substr(0, 5), value: w.value };
      });

      html += '<div class="chart-card">' +
        '<div class="chart-header"><h3 class="chart-title">Evolucao de Peso</h3></div>' +
        '<div id="weight-chart" style="height:200px"></div>' +
        '</div>';

      // Stats
      var first = weights[0].value;
      var last = weights[weights.length - 1].value;
      var diff = (last - first).toFixed(1);
      var min = Math.min(...weights.map(function (w) { return w.value; }));
      var max = Math.max(...weights.map(function (w) { return w.value; }));

      html += '<div class="dashboard-grid" style="margin-bottom:20px">';
      html += '<div class="summary-card"><div class="summary-card-icon blue">&#9878;</div><div class="summary-card-value">' + last + 'kg</div><div class="summary-card-label">Peso Atual</div></div>';
      html += '<div class="summary-card"><div class="summary-card-icon ' + (parseFloat(diff) < 0 ? 'green' : 'orange') + '">' + (parseFloat(diff) < 0 ? '&#8595;' : '&#8593;') + '</div><div class="summary-card-value">' + (parseFloat(diff) > 0 ? '+' : '') + diff + 'kg</div><div class="summary-card-label">Variacao Total</div></div>';
      html += '<div class="summary-card"><div class="summary-card-icon green">&#8595;</div><div class="summary-card-value">' + min + 'kg</div><div class="summary-card-label">Minimo</div></div>';
      html += '<div class="summary-card"><div class="summary-card-icon red">&#8593;</div><div class="summary-card-value">' + max + 'kg</div><div class="summary-card-label">Maximo</div></div>';
      html += '</div>';

      // History table
      html += '<div class="card">' +
        '<div class="card-header"><h3>Historico de Pesagens</h3></div>' +
        '<div style="max-height:300px;overflow-y:auto">';
      [...weights].reverse().slice(0, 20).forEach(function (w) {
        html += '<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border-color)">' +
          '<span style="color:var(--text-secondary)">' + DateUtils.formatDateFull(w.date) + '</span>' +
          '<span style="font-weight:700">' + w.value + ' kg</span></div>';
      });
      html += '</div></div>';
    }

    container.innerHTML = html;

    // Render chart
    if (weights.length >= 2) {
      var chartEl = document.getElementById('weight-chart');
      if (chartEl) {
        var chartData2 = weights.slice(-14).map(function (w) {
          return { label: DateUtils.formatDate(w.date).substr(0, 5), value: w.value };
        });
        Charts.renderLine(chartEl, chartData2, { height: 200, unit: 'kg', label: 'Evolucao de peso' });
      }
    }

    // Log weight btn
    var logBtn = document.getElementById('btn-log-weight-prog') || document.getElementById('btn-log-first-weight');
    if (logBtn) {
      logBtn.addEventListener('click', function () {
        Modal.open({
          title: 'Registrar Peso',
          content: '<div class="input-group"><label>Peso (kg)</label><input class="input" type="number" id="modal-weight-prog" min="30" max="300" step="0.1" placeholder="70.5"></div>',
          footer: '<button class="btn btn-primary" id="save-weight-prog">Salvar</button>'
        });
        setTimeout(function () {
          var btn = document.getElementById('save-weight-prog');
          if (btn) btn.addEventListener('click', function () {
            var v = parseFloat(document.getElementById('modal-weight-prog').value);
            if (isNaN(v) || v < 30 || v > 300) { Toast.error('Peso invalido'); return; }
            var ws = Store.get('weights', []);
            var today = DateUtils.today();
            var idx = ws.findIndex(function (w) { return w.date === today; });
            if (idx > -1) ws[idx].value = v; else ws.push({ date: today, value: v });
            Store.set('weights', ws);
            Gamification.addXP(50);
            Gamification.awardBadge('b018');
            if (ws.length >= 10) Gamification.awardBadge('b019');
            Toast.success('Peso registrado: ' + v + 'kg');
            Modal.closeAll();
            Progress.render();
          });
        }, 100);
      });
    }
  }
};
