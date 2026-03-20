/* ============================================================
   KellyFit Padrao 2026 — Meal Detail (Receita com porcoes ajustaveis)
   ============================================================ */
const MealDetail = {
  _portion: 1.0,

  show(meal) {
    if (!meal) return;
    this._portion = 1.0;
    var self = this;

    var content = self._buildContent(meal, 1.0);
    Modal.open({
      title: meal.emoji + ' ' + meal.name,
      content: content,
      maxWidth: '560px'
    });

    setTimeout(function () {
      self._bindPortionControls(meal);
    }, 100);
  },

  _buildContent(meal, portion) {
    var p = portion;
    var kcal = Math.round(meal.calories * p);
    var prot = Math.round(meal.protein * p);
    var carb = Math.round(meal.carbs * p);
    var fat = Math.round(meal.fat * p);

    var html = '<div style="display:flex;gap:16px;margin-bottom:16px">' +
      '<div class="macro-block prot" style="flex:1;text-align:center"><div class="macro-block-value">' + kcal + '</div><div class="macro-block-label">kcal</div></div>' +
      '<div class="macro-block prot" style="flex:1;text-align:center"><div class="macro-block-value">' + prot + 'g</div><div class="macro-block-label">Proteina</div></div>' +
      '<div class="macro-block carb" style="flex:1;text-align:center"><div class="macro-block-value">' + carb + 'g</div><div class="macro-block-label">Carb</div></div>' +
      '<div class="macro-block fat" style="flex:1;text-align:center"><div class="macro-block-value">' + fat + 'g</div><div class="macro-block-label">Gordura</div></div>' +
      '</div>';

    // Portion selector
    html += '<div style="margin-bottom:16px;background:var(--bg-input);border-radius:var(--radius-md);padding:12px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">' +
      '<span style="font-weight:700;font-size:var(--text-sm)">&#127869; Porcao</span>' +
      '<div style="display:flex;gap:8px">';
    [0.5, 0.75, 1.0, 1.5, 2.0].forEach(function (p2) {
      html += '<button class="btn btn-sm portion-btn' + (p2 === p ? ' btn-primary' : ' btn-outline') + '" data-portion="' + p2 + '">' + (p2 === 0.5 ? '1/2' : p2 === 0.75 ? '3/4' : p2 === 1 ? '1x' : p2 === 1.5 ? '1.5x' : '2x') + '</button>';
    });
    html += '</div></div>' +
      '<div style="font-size:var(--text-sm);color:var(--text-muted)">' + Math.round(meal.servingSize * p) + meal.servingUnit + '</div></div>';

    // Ingredients
    if (meal.ingredients && meal.ingredients.length) {
      html += '<div style="margin-bottom:16px"><div style="font-weight:800;margin-bottom:8px">&#128218; Ingredientes (' + Math.round(meal.servingSize * p) + meal.servingUnit + ')</div><ul style="list-style:disc;padding-left:20px">';
      meal.ingredients.forEach(function (ing) {
        html += '<li style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:4px">' + ing + '</li>';
      });
      html += '</ul></div>';
    }

    // Steps
    if (meal.steps && meal.steps.length) {
      html += '<div><div style="font-weight:800;margin-bottom:8px">&#128300; Modo de Preparo</div>';
      meal.steps.forEach(function (step, i) {
        html += '<div style="display:flex;gap:12px;margin-bottom:10px">' +
          '<div style="width:24px;height:24px;border-radius:50%;background:var(--primary-500);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.75rem;flex-shrink:0">' + (i + 1) + '</div>' +
          '<div style="font-size:var(--text-sm);color:var(--text-secondary);padding-top:2px">' + step + '</div></div>';
      });
      html += '</div>';
    }

    // Meta
    html += '<div style="display:flex;gap:12px;margin-top:16px">' +
      '<span class="badge badge-info">&#8987; ' + meal.prepTime + 'min</span>' +
      '<span class="badge badge-' + (meal.difficulty === 'facil' ? 'success' : meal.difficulty === 'medio' ? 'warning' : 'error') + '">' + meal.difficulty + '</span>' +
      '</div>';

    return html;
  },

  _bindPortionControls(meal) {
    var self = this;
    document.querySelectorAll('.portion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = parseFloat(btn.getAttribute('data-portion'));
        self._portion = p;
        var bodyEl = document.querySelector('.modal-body');
        if (bodyEl) bodyEl.innerHTML = self._buildContent(meal, p);
        self._bindPortionControls(meal);
      });
    });
  }
};
