/* ============================================================
   KellyFit Padrao 2026 — Onboarding (Tour Guiado)
   ============================================================ */
const Onboarding = {
  _steps: [
    {
      title: '&#127881; Bem-vindo ao KellyFit 2026!',
      text: 'O app de nutricao e fitness mais completo do Brasil. Vamos fazer um tour rapido para voce aproveitar ao maximo!',
      icon: '&#128640;',
      target: null
    },
    {
      title: '&#127828; Cardapio Inteligente',
      text: 'Acesse 120+ refeicoes com receitas detalhadas, ingredientes e modo de preparo. Adicione ao seu cardapio com um clique!',
      icon: '&#127828;',
      target: 'nav-cardapio'
    },
    {
      title: '&#128167; Hidratacao',
      text: 'Registre cada copo de agua bebido. O tracker visual mostra seu progresso em tempo real com base na sua meta personalizada.',
      icon: '&#128167;',
      target: 'nav-agua'
    },
    {
      title: '&#127947; Exercicios com Calculo de Calorias',
      text: 'Mais de 60 exercicios com calculo de calorias gastas baseado no seu peso real usando o MET (Metabolic Equivalent of Task).',
      icon: '&#127947;',
      target: 'nav-exercicios'
    },
    {
      title: '&#9989; Habitos Diarios',
      text: 'Construa consistencia com 5 habitos essenciais. O visual estilo GitHub mostra sua sequencia dos ultimos 14 dias!',
      icon: '&#9989;',
      target: 'nav-habitos'
    },
    {
      title: '&#127942; Gamificacao e Conquistas',
      text: 'Ganhe XP, suba de nivel e desbloqueie 30 badges exclusivos completando metas e mantendo sua consistencia.',
      icon: '&#127942;',
      target: 'nav-conquistas'
    },
    {
      title: '&#128202; Analytics e Predicoes',
      text: 'Veja tendencias de calorias, proteina, hidratacao e exercicios. A IA projeta quantos dias para atingir sua meta de peso!',
      icon: '&#128202;',
      target: 'nav-analytics'
    },
    {
      title: '&#127917; Voce esta pronto!',
      text: 'Comece registrando seu cardapio de hoje. Quanto mais dados voce inserir, mais preciso o app fica. Bom treino!',
      icon: '&#127917;',
      target: null
    }
  ],

  _current: 0,

  shouldShow() {
    return !Store.get('onboarding_done', false);
  },

  start() {
    if (!Onboarding.shouldShow()) return;
    Onboarding._current = 0;
    Onboarding._showStep(0);
  },

  _showStep(idx) {
    var step = Onboarding._steps[idx];
    if (!step) { Onboarding._finish(); return; }

    var total = Onboarding._steps.length;
    var dots = '';
    for (var i = 0; i < total; i++) {
      dots += '<div style="width:8px;height:8px;border-radius:50%;background:' + (i === idx ? 'var(--primary-500)' : 'var(--border-color)') + ';transition:background 0.2s"></div>';
    }

    var isLast = idx === total - 1;

    var overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.2s ease';

    overlay.innerHTML = '<div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-xl);padding:32px;max-width:420px;width:100%;position:relative;animation:scaleIn 0.2s ease">' +
      '<div style="font-size:3rem;text-align:center;margin-bottom:16px">' + step.icon + '</div>' +
      '<h2 style="text-align:center;margin-bottom:12px;font-size:1.1rem">' + step.title + '</h2>' +
      '<p style="color:var(--text-secondary);text-align:center;font-size:var(--text-sm);line-height:1.7;margin-bottom:24px">' + step.text + '</p>' +
      '<div style="display:flex;justify-content:center;gap:6px;margin-bottom:24px">' + dots + '</div>' +
      '<div style="display:flex;gap:12px">' +
      (idx > 0 ? '<button class="btn btn-ghost btn-sm" id="ob-prev" style="flex:1">&#8592; Anterior</button>' : '') +
      '<button class="btn btn-outline btn-sm" id="ob-skip" style="' + (idx === 0 ? 'flex:1' : '') + '">Pular Tour</button>' +
      '<button class="btn btn-primary" id="ob-next" style="flex:2">' + (isLast ? '&#127881; Comecar!' : 'Proximo &#8594;') + '</button>' +
      '</div></div>';

    // Remove existing overlay
    var existing = document.getElementById('onboarding-overlay');
    if (existing) existing.remove();

    document.body.appendChild(overlay);

    document.getElementById('ob-next').addEventListener('click', function () {
      overlay.remove();
      if (isLast) {
        Onboarding._finish();
      } else {
        Onboarding._showStep(idx + 1);
      }
    });

    var prevBtn = document.getElementById('ob-prev');
    if (prevBtn) prevBtn.addEventListener('click', function () {
      overlay.remove();
      Onboarding._showStep(idx - 1);
    });

    document.getElementById('ob-skip').addEventListener('click', function () {
      overlay.remove();
      Onboarding._finish();
    });
  },

  _finish() {
    Store.set('onboarding_done', true);
    Gamification.addXP(100);
    Toast.success('&#127881; Tour concluido! +100 XP');
  }
};
