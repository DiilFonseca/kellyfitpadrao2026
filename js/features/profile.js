/* ============================================================
   KellyFit Padrao 2026 — Profile Feature
   ============================================================ */
const Profile = {
  render() {
    var container = document.getElementById('page-perfil');
    if (!container) return;

    Auth.getCurrentUser().then(function (user) {
      if (!user) return;
      var qa = user.quizAnswers || {};
      var plan = user.nutritionPlan || {};
      var gamData = Gamification.getData();
      var levelData = Gamification.getLevelData(gamData.xp);

      var avatar = (user.name || 'U').charAt(0).toUpperCase();
      var trialDaysLeft = user.trialDaysLeft !== undefined ? user.trialDaysLeft : '?';

      var html = '<div class="page-header"><div><h1 class="page-title">&#128100; Perfil</h1><p class="page-subtitle">Seus dados e configuracoes pessoais</p></div>' +
        '<button class="btn btn-outline btn-sm" id="btn-edit-profile">&#9998; Editar</button></div>';

      // Profile card
      html += '<div class="card" style="margin-bottom:20px">' +
        '<div style="display:flex;align-items:center;gap:20px;margin-bottom:20px">' +
        '<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-500),var(--secondary-500));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;color:white;flex-shrink:0">' + avatar + '</div>' +
        '<div>' +
        '<div style="font-size:1.4rem;font-weight:800">' + (user.name || 'Usuario') + '</div>' +
        '<div style="color:var(--text-secondary);font-size:var(--text-sm)">' + (user.email || '') + '</div>' +
        '<div style="margin-top:4px">' +
        '<span class="badge badge-' + (trialDaysLeft > 0 ? 'success' : 'error') + '">' +
        (trialDaysLeft > 0 ? '&#9989; Trial ativo: ' + trialDaysLeft + 'd restantes' : '&#9940; Trial expirado') + '</span>' +
        '</div></div></div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">' +
        '<div class="result-stat"><div class="result-stat-value">' + levelData.level + '</div><div class="result-stat-label">Nivel</div></div>' +
        '<div class="result-stat"><div class="result-stat-value">' + gamData.xp.toLocaleString() + '</div><div class="result-stat-label">XP Total</div></div>' +
        '<div class="result-stat"><div class="result-stat-value">' + (gamData.badges ? gamData.badges.length : 0) + '</div><div class="result-stat-label">Conquistas</div></div>' +
        '</div></div>';

      // Nutrition plan
      if (plan && plan.calories) {
        html += '<div class="card" style="margin-bottom:20px">' +
          '<div class="card-header"><h3>&#127828; Plano Nutricional</h3></div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">' +
          '<div class="result-stat"><div class="result-stat-value">' + plan.calories + '</div><div class="result-stat-label">kcal/dia</div></div>' +
          '<div class="result-stat"><div class="result-stat-value">' + plan.protein + 'g</div><div class="result-stat-label">Proteina</div></div>' +
          '<div class="result-stat"><div class="result-stat-value">' + plan.carbs + 'g</div><div class="result-stat-label">Carboidratos</div></div>' +
          '<div class="result-stat"><div class="result-stat-value">' + plan.fat + 'g</div><div class="result-stat-label">Gordura</div></div>' +
          '</div>';
        if (plan.waterCups) {
          html += '<div style="margin-top:12px;padding:12px;background:var(--bg-input);border-radius:var(--radius-md);font-size:var(--text-sm)">' +
            '&#128167; Meta de agua: <strong>' + plan.waterCups + ' copos/dia</strong></div>';
        }
        html += '</div>';
      }

      // Quiz answers summary
      if (qa && Object.keys(qa).length > 0) {
        html += '<div class="card" style="margin-bottom:20px">' +
          '<div class="card-header"><h3>&#128203; Dados do Perfil</h3><button class="btn btn-outline btn-sm" id="btn-retake-quiz">Refazer Quiz</button></div>' +
          '<div style="display:grid;gap:8px">';

        var fields = [
          { key: 'weight', label: 'Peso Atual', suffix: 'kg' },
          { key: 'height', label: 'Altura', suffix: 'cm' },
          { key: 'age', label: 'Idade', suffix: 'anos' },
          { key: 'gender', label: 'Sexo', suffix: '' },
          { key: 'activity', label: 'Nivel de Atividade', suffix: '' },
          { key: 'goal', label: 'Objetivo', suffix: '' },
          { key: 'target_weight', label: 'Peso Meta', suffix: 'kg' },
          { key: 'diet_type', label: 'Tipo de Dieta', suffix: '' },
          { key: 'training_days', label: 'Dias de Treino', suffix: 'dias/sem' }
        ];

        fields.forEach(function (f) {
          if (qa[f.key] !== undefined && qa[f.key] !== '') {
            html += '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-color)">' +
              '<span style="color:var(--text-secondary);font-size:var(--text-sm)">' + f.label + '</span>' +
              '<span style="font-weight:600;font-size:var(--text-sm)">' + qa[f.key] + (f.suffix ? ' ' + f.suffix : '') + '</span></div>';
          }
        });
        html += '</div></div>';
      }

      // Danger zone
      html += '<div class="card" style="border-color:var(--error);background:rgba(239,68,68,0.05)">' +
        '<div class="card-header"><h3 style="color:var(--error)">&#9888;&#65039; Zona de Perigo</h3></div>' +
        '<div style="display:flex;flex-direction:column;gap:12px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<div><div style="font-weight:600">Exportar meus dados</div><div style="font-size:var(--text-xs);color:var(--text-muted)">Baixar todos os dados em JSON</div></div>' +
        '<button class="btn btn-outline btn-sm" id="btn-export-data">&#128190; Exportar</button></div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<div><div style="font-weight:600;color:var(--error)">Apagar conta</div><div style="font-size:var(--text-xs);color:var(--text-muted)">Remove todos os dados permanentemente</div></div>' +
        '<button class="btn btn-sm" style="background:var(--error);color:white" id="btn-delete-account">&#128465; Apagar</button></div>' +
        '</div></div>';

      container.innerHTML = html;

      // Events
      var editBtn = document.getElementById('btn-edit-profile');
      if (editBtn) editBtn.addEventListener('click', function () { Profile._showEditModal(user); });

      var retakeBtn = document.getElementById('btn-retake-quiz');
      if (retakeBtn) retakeBtn.addEventListener('click', function () {
        window.location.href = 'quiz.html';
      });

      var exportBtn = document.getElementById('btn-export-data');
      if (exportBtn) exportBtn.addEventListener('click', function () {
        Export.downloadJSON();
        Toast.success('Dados exportados!');
      });

      var deleteBtn = document.getElementById('btn-delete-account');
      if (deleteBtn) deleteBtn.addEventListener('click', function () {
        Modal.confirm(
          'Apagar conta',
          'ATENCAO: Apagar todos os dados permanentemente? Esta acao NAO pode ser desfeita.',
          function () {
            localStorage.clear();
            window.location.href = 'index.html';
          }
        );
      });
    });
  },

  _showEditModal(user) {
    Modal.open({
      title: '&#9998; Editar Perfil',
      content: '<div class="input-group"><label>Nome</label><input class="input" type="text" id="edit-name" value="' + (user.name || '') + '" maxlength="50" placeholder="Seu nome"></div>' +
        '<div class="input-group"><label>Email</label><input class="input" type="email" id="edit-email" value="' + (user.email || '') + '" placeholder="email@exemplo.com"></div>',
      footer: '<button class="btn btn-outline btn-sm" onclick="Modal.closeAll()">Cancelar</button>' +
        '<button class="btn btn-primary" id="save-profile-btn">Salvar</button>'
    });
    setTimeout(function () {
      var saveBtn = document.getElementById('save-profile-btn');
      if (saveBtn) saveBtn.addEventListener('click', function () {
        var name = document.getElementById('edit-name').value.trim();
        var email = document.getElementById('edit-email').value.trim();
        if (!name || name.length < 2) { Toast.error('Nome invalido'); return; }
        if (!email || !email.includes('@')) { Toast.error('Email invalido'); return; }
        Auth.getCurrentUser().then(function (u) {
          if (!u) return;
          Auth.updateUser(u.id, { name: name, email: email });
          Toast.success('Perfil atualizado!');
          Modal.closeAll();
          Profile.render();
        });
      });
    }, 100);
  }
};
