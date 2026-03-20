/* ============================================================
   KellyFit Padrao 2026 — Exercise Tracker Feature
   ============================================================ */
const ExerciseTracker = {
  render() {
    var container = document.getElementById('page-exercicios');
    if (!container) return;

    var today = DateUtils.today();
    var todayExercises = Store.get('exercises_' + today, []);
    var categories = ExercisesDB.getCategories();

    Auth.getCurrentUser().then(function (user) {
      var weightKg = 70;
      if (user && user.quizAnswers && user.quizAnswers.weight) weightKg = user.quizAnswers.weight;
      var totalMin = todayExercises.reduce(function (s, e) { return s + e.duration; }, 0);
      var totalKcal = todayExercises.reduce(function (s, e) { return s + e.kcalBurned; }, 0);

      var html = '<div class="page-header"><div><h1 class="page-title">&#127947; Exercicios</h1><p class="page-subtitle">Registre seus treinos e veja as calorias gastas</p></div></div>';

      // Today summary
      html += '<div class="card" style="margin-bottom:20px">' +
        '<div class="card-header"><h3>Treinos de Hoje</h3><div style="display:flex;gap:12px">' +
        '<span class="badge badge-success">&#9200; ' + totalMin + 'min</span>' +
        '<span class="badge badge-error">&#128293; ' + totalKcal + ' kcal</span></div></div>';

      if (todayExercises.length > 0) {
        todayExercises.forEach(function (ex, i) {
          html += '<div class="exercise-row"><div class="exercise-icon">' + ex.emoji + '</div>' +
            '<div class="exercise-info"><div class="exercise-name">' + ex.name + '</div>' +
            '<div class="exercise-meta">' + ex.duration + 'min &bull; ' + ExercisesDB.getCategoryLabel(ex.category) + '</div></div>' +
            '<div class="exercise-kcal">-' + ex.kcalBurned + ' kcal</div>' +
            '<button class="btn btn-ghost btn-sm" data-remove-ex="' + i + '" style="color:var(--error)">&#10005;</button></div>';
        });
      } else {
        html += '<div style="text-align:center;padding:24px;color:var(--text-muted)">Nenhum exercicio registrado hoje. Selecione um abaixo!</div>';
      }
      html += '</div>';

      // Browse exercises by category
      categories.forEach(function (cat) {
        var exercises = ExercisesDB.getByCategory(cat);
        if (!exercises.length) return;
        html += '<div class="card" style="margin-bottom:16px">' +
          '<div class="card-header"><h3>' + ExercisesDB.getCategoryLabel(cat) + '</h3></div>' +
          '<div class="exercise-list">';
        exercises.forEach(function (ex) {
          html += '<div class="exercise-row" data-ex-id="' + ex.id + '">' +
            '<div class="exercise-icon">' + ex.emoji + '</div>' +
            '<div class="exercise-info"><div class="exercise-name">' + ex.name + '</div>' +
            '<div class="exercise-meta">MET ' + ex.met + ' &bull; ' + ex.difficulty + ' &bull; ' + ex.equipment + '</div></div>' +
            '<button class="btn btn-primary btn-sm" data-add-ex="' + ex.id + '">+ Adicionar</button></div>';
        });
        html += '</div></div>';
      });

      container.innerHTML = html;

      container.addEventListener('click', function (e) {
        var addBtn = e.target.closest('[data-add-ex]');
        if (addBtn) {
          var exId = addBtn.getAttribute('data-add-ex');
          var ex = ExercisesDB.getById(exId);
          if (!ex) return;

          Modal.open({
            title: ex.emoji + ' ' + ex.name,
            content: '<p style="color:var(--text-secondary);margin-bottom:16px">' + ex.desc + '</p>' +
              '<div class="input-group"><label>Duracao (minutos)</label><input class="input" type="number" id="ex-duration" min="1" max="300" placeholder="30" value="30"></div>' +
              '<div class="input-group"><label>Seu peso (kg) — para calculo de calorias</label><input class="input" type="number" id="ex-weight" min="30" max="300" value="' + weightKg + '"></div>' +
              '<div id="ex-kcal-preview" style="text-align:center;font-size:1.4rem;font-weight:800;color:var(--accent-500);padding:12px;background:var(--bg-input);border-radius:var(--radius-md)">~' + ExercisesDB.calcCalories(exId, weightKg, 30) + ' kcal</div>',
            footer: '<button class="btn btn-outline btn-sm" onclick="Modal.closeAll()">Cancelar</button><button class="btn btn-primary" id="save-ex-btn">Salvar Treino</button>'
          });

          setTimeout(function () {
            var durEl = document.getElementById('ex-duration');
            var wEl = document.getElementById('ex-weight');
            var preview = document.getElementById('ex-kcal-preview');
            function updatePreview() {
              var d = parseInt(durEl.value) || 30;
              var w = parseFloat(wEl.value) || 70;
              if (preview) preview.textContent = '~' + ExercisesDB.calcCalories(exId, w, d) + ' kcal';
            }
            if (durEl) durEl.addEventListener('input', updatePreview);
            if (wEl) wEl.addEventListener('input', updatePreview);

            var saveBtn = document.getElementById('save-ex-btn');
            if (saveBtn) saveBtn.addEventListener('click', function () {
              var dur = parseInt(durEl.value) || 30;
              var w = parseFloat(wEl.value) || 70;
              var kcal = ExercisesDB.calcCalories(exId, w, dur);
              var exList = Store.get('exercises_' + today, []);
              exList.push({ id: exId, name: ex.name, emoji: ex.emoji, category: ex.category, duration: dur, kcalBurned: kcal });
              Store.set('exercises_' + today, exList);
              Gamification.addXP(Math.round(dur * 2));
              Gamification.awardBadge('b005');
              if (kcal >= 300) Gamification.awardBadge('b015');
              Toast.success(ex.name + ' registrado! -' + kcal + ' kcal');
              Modal.closeAll();
              ExerciseTracker.render();
            });
          }, 100);
        }

        var removeBtn = e.target.closest('[data-remove-ex]');
        if (removeBtn) {
          var idx = parseInt(removeBtn.getAttribute('data-remove-ex'));
          var exList = Store.get('exercises_' + today, []);
          exList.splice(idx, 1);
          Store.set('exercises_' + today, exList);
          ExerciseTracker.render();
        }
      });
    });
  }
};
