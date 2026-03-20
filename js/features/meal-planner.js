/* ============================================================
   KellyFit Padrao 2026 — Meal Planner (Cardapio + Semanal)
   ============================================================ */
const MealPlanner = {
  render() {
    var container = document.getElementById('page-cardapio');
    if (!container) return;

    var today = DateUtils.today();
    var savedMeals = Store.get('meals_' + today, []);
    var categories = MealsDB.getCategories();

    var html = '<div class="page-header"><div><h1 class="page-title">&#127869; Cardapio de Hoje</h1><p class="page-subtitle">' + DateUtils.formatDateFull(today) + '</p></div>' +
      '<button class="btn btn-primary btn-sm" id="btn-add-meal-today">+ Adicionar Refeicao</button></div>';

    // Meals consumed today
    if (savedMeals.length > 0) {
      var totalKcal = savedMeals.reduce(function (s, m) { return s + m.calories; }, 0);
      var totalProt = savedMeals.reduce(function (s, m) { return s + m.protein; }, 0);
      html += '<div class="card" style="margin-bottom:20px">' +
        '<div class="card-header"><h3>Refeicoes Registradas</h3><span class="badge badge-success">' + totalKcal + ' kcal total</span></div>';
      savedMeals.forEach(function (m, i) {
        html += '<div class="meal-slot">' +
          '<span class="meal-slot-icon">' + (m.emoji || '&#127869;') + '</span>' +
          '<div class="meal-slot-info"><div class="meal-slot-name">' + m.name + '</div>' +
          '<div class="meal-slot-kcal">' + m.calories + ' kcal &bull; ' + MealsDB.getCategoryLabel(m.category) + '</div>' +
          '<div class="meal-slot-macros"><span class="macro-tag p">P:' + m.protein + 'g</span><span class="macro-tag c">C:' + m.carbs + 'g</span><span class="macro-tag g">G:' + m.fat + 'g</span></div></div>' +
          '<div class="meal-slot-actions">' +
          '<button class="btn-meal-swap" data-idx="' + i + '" title="Ver receita">&#128218;</button>' +
          '<button class="btn-meal-swap" data-remove="' + i + '" title="Remover" style="color:var(--error)">&#10005;</button>' +
          '</div></div>';
      });
      html += '</div>';
    } else {
      html += '<div class="card" style="text-align:center;padding:32px;margin-bottom:20px;color:var(--text-muted)"><div style="font-size:3rem">&#127869;</div><p>Nenhuma refeicao registrada hoje.<br>Adicione sua primeira refeicao!</p></div>';
    }

    // Browse meals by category
    categories.forEach(function (cat) {
      var catMeals = MealsDB.getByCategory(cat);
      if (!catMeals.length) return;
      html += '<div class="card" style="margin-bottom:16px">' +
        '<div class="card-header"><h3>' + MealsDB.getCategoryLabel(cat) + '</h3><span class="badge badge-info">' + catMeals.length + ' opcoes</span></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">';
      catMeals.slice(0, 6).forEach(function (m) {
        html += '<div class="card" style="padding:12px;cursor:pointer" data-meal-id="' + m.id + '" class="meal-card-item">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' +
          '<span style="font-size:1.4rem">' + m.emoji + '</span>' +
          '<div style="flex:1"><div style="font-weight:700;font-size:0.85rem">' + m.name + '</div>' +
          '<div style="font-size:0.72rem;color:var(--text-muted)">' + m.calories + ' kcal | ' + m.prepTime + 'min</div></div></div>' +
          '<div class="meal-slot-macros"><span class="macro-tag p">P:' + m.protein + 'g</span><span class="macro-tag c">C:' + m.carbs + 'g</span><span class="macro-tag g">G:' + m.fat + 'g</span></div>' +
          '<button class="btn btn-primary btn-sm btn-block" style="margin-top:8px" data-add-meal="' + m.id + '">+ Adicionar</button></div>';
      });
      html += '</div></div>';
    });

    container.innerHTML = html;

    // Events
    container.addEventListener('click', function (e) {
      var addBtn = e.target.closest('[data-add-meal]');
      if (addBtn) {
        var id = addBtn.getAttribute('data-add-meal');
        var meal = MealsDB.getById(id);
        if (meal) {
          var meals = Store.get('meals_' + today, []);
          meals.push(meal);
          Store.set('meals_' + today, meals);
          Gamification.addXP(25);
          Gamification.updateStreak();
          Toast.success('&#127869; ' + meal.name + ' adicionada!');
          MealPlanner.render();
        }
      }
      var removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) {
        var idx = parseInt(removeBtn.getAttribute('data-remove'));
        var meals = Store.get('meals_' + today, []);
        meals.splice(idx, 1);
        Store.set('meals_' + today, meals);
        Toast.info('Refeicao removida');
        MealPlanner.render();
      }
      var recipeBtn = e.target.closest('[data-idx]');
      if (recipeBtn && !recipeBtn.hasAttribute('data-remove')) {
        var idx = parseInt(recipeBtn.getAttribute('data-idx'));
        var meals = Store.get('meals_' + today, []);
        MealDetail.show(meals[idx]);
      }
    });
  },

  renderWeekly() {
    var container = document.getElementById('page-planejador');
    if (!container) return;

    var weekDates = DateUtils.getWeekDates();
    var html = '<div class="page-header"><div><h1 class="page-title">&#128197; Planejador Semanal</h1><p class="page-subtitle">Monte seu cardapio da semana completo</p></div>' +
      '<button class="btn btn-primary btn-sm" id="btn-gen-shopping">&#128722; Gerar Lista de Compras</button></div>';

    weekDates.forEach(function (date) {
      var dayName = DateUtils.getDayName(date);
      var meals = Store.get('meals_' + date, []);
      var totalKcal = meals.reduce(function (s, m) { return s + m.calories; }, 0);
      var isToday = date === DateUtils.today();

      html += '<div class="card" style="margin-bottom:16px' + (isToday ? ';border-color:var(--primary-500)' : '') + '">' +
        '<div class="card-header">' +
        '<div><h3>' + dayName + (isToday ? ' <span class="badge badge-success">Hoje</span>' : '') + '</h3>' +
        '<div style="font-size:var(--text-sm);color:var(--text-muted)">' + DateUtils.formatDate(date) + '</div></div>' +
        '<div style="font-weight:800;color:var(--primary-500)">' + totalKcal + ' kcal</div></div>';

      if (meals.length > 0) {
        meals.forEach(function (m) {
          html += '<div class="meal-slot" style="padding:8px 0"><span class="meal-slot-icon">' + m.emoji + '</span>' +
            '<div class="meal-slot-info"><div class="meal-slot-name">' + m.name + '</div>' +
            '<div class="meal-slot-kcal">' + m.calories + ' kcal &bull; ' + MealsDB.getCategoryLabel(m.category) + '</div></div></div>';
        });
      } else {
        html += '<div style="padding:12px 0;color:var(--text-muted);font-size:var(--text-sm);text-align:center">Sem refeicoes planejadas &bull; <button class="btn btn-ghost btn-sm" data-plan-date="' + date + '">+ Planejar</button></div>';
      }
      html += '</div>';
    });

    container.innerHTML = html;

    var genBtn = document.getElementById('btn-gen-shopping');
    if (genBtn) genBtn.addEventListener('click', function () { Router.navigate('compras'); });

    container.addEventListener('click', function (e) {
      var planBtn = e.target.closest('[data-plan-date]');
      if (planBtn) { Router.navigate('cardapio'); Toast.info('Adicione refeicoes para ' + planBtn.getAttribute('data-plan-date')); }
    });
  }
};
