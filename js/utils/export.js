/* ============================================================
   KellyFit Padrao 2026 — Export Utility (JSON + CSV)
   ============================================================ */
const Export = {
  _collectData() {
    var data = {
      exportedAt: new Date().toISOString(),
      version: '2026.1',
      profile: null,
      nutritionPlan: null,
      weights: [],
      meals: {},
      water: {},
      exercises: {},
      habits: {},
      gamification: null
    };

    // Profile
    try { data.profile = Store.get('current_user_data', null); } catch (e) {}
    if (data.profile && data.profile.nutritionPlan) {
      data.nutritionPlan = data.profile.nutritionPlan;
    }

    // All stored keys
    var dateKeys = [];
    for (var k in localStorage) {
      if (!localStorage.hasOwnProperty(k)) continue;
      if (k.startsWith('kf_meals_')) dateKeys.push({ type: 'meals', date: k.replace('kf_meals_', ''), key: k });
      else if (k.startsWith('kf_water_')) dateKeys.push({ type: 'water', date: k.replace('kf_water_', ''), key: k });
      else if (k.startsWith('kf_exercises_')) dateKeys.push({ type: 'exercises', date: k.replace('kf_exercises_', ''), key: k });
      else if (k.startsWith('kf_habits_')) dateKeys.push({ type: 'habits', date: k.replace('kf_habits_', ''), key: k });
    }

    data.weights = Store.get('weights', []);
    data.gamification = Store.get('gamification', {});
    data.shoppingList = Store.get('shopping_list', []);

    dateKeys.forEach(function (entry) {
      var val = Store.get(entry.key.replace('kf_', ''), null);
      if (val !== null) {
        data[entry.type][entry.date] = val;
      }
    });

    return data;
  },

  downloadJSON() {
    var data = Export._collectData();
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'kellyfit-backup-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  downloadCSV() {
    var data = Export._collectData();
    var rows = [['Data', 'Tipo', 'Nome', 'Calorias', 'Proteina (g)', 'Carbs (g)', 'Gordura (g)', 'Duracao (min)', 'Kcal Gastas']];

    // Meals
    Object.keys(data.meals).sort().forEach(function (date) {
      var meals = data.meals[date];
      if (!Array.isArray(meals)) return;
      meals.forEach(function (m) {
        rows.push([date, 'Refeicao', m.name || '', m.calories || 0, m.protein || 0, m.carbs || 0, m.fat || 0, '', '']);
      });
    });

    // Exercises
    Object.keys(data.exercises).sort().forEach(function (date) {
      var exes = data.exercises[date];
      if (!Array.isArray(exes)) return;
      exes.forEach(function (e) {
        rows.push([date, 'Exercicio', e.name || '', '', '', '', '', e.duration || 0, e.kcalBurned || 0]);
      });
    });

    // Weights
    data.weights.forEach(function (w) {
      rows.push([w.date, 'Peso (kg)', w.value, '', '', '', '', '', '']);
    });

    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');

    var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'kellyfit-dados-' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importJSON(jsonString) {
    try {
      var data = JSON.parse(jsonString);
      if (!data.version || !data.exportedAt) {
        return { ok: false, error: 'Arquivo invalido' };
      }
      var count = 0;

      if (data.weights && data.weights.length) {
        Store.set('weights', data.weights);
        count++;
      }
      if (data.gamification) {
        Store.set('gamification', data.gamification);
        count++;
      }

      Object.keys(data.meals || {}).forEach(function (d) {
        Store.set('meals_' + d, data.meals[d]);
        count++;
      });
      Object.keys(data.water || {}).forEach(function (d) {
        Store.set('water_' + d, data.water[d]);
        count++;
      });
      Object.keys(data.exercises || {}).forEach(function (d) {
        Store.set('exercises_' + d, data.exercises[d]);
        count++;
      });
      Object.keys(data.habits || {}).forEach(function (d) {
        Store.set('habits_' + d, data.habits[d]);
        count++;
      });

      return { ok: true, count: count };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
