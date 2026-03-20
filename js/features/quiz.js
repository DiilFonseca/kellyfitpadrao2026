/* ============================================================
   KellyFit Padrao 2026 — Quiz (20 perguntas adaptativas)
   ============================================================ */
(function () {
  'use strict';

  // ---- Questions Definition ----
  var QUESTIONS = [
    {
      id: 'goal',
      category: '&#127919; Objetivo',
      title: 'Qual e o seu principal objetivo?',
      subtitle: 'Isso define toda a sua estrategia nutricional.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'loss', icon: '&#128205;', label: 'Emagrecer', sub: 'Perder gordura e definir o corpo' },
        { value: 'gain', icon: '&#127947;', label: 'Ganhar Massa', sub: 'Aumentar musculo e forca' },
        { value: 'maintain', icon: '&#9878;', label: 'Manter Peso', sub: 'Manter saude e bem-estar' },
        { value: 'health', icon: '&#10084;', label: 'Melhorar Saude', sub: 'Mais energia, disposicao e longevidade' }
      ]
    },
    {
      id: 'gender',
      category: '&#128101; Perfil',
      title: 'Qual e o seu sexo biologico?',
      subtitle: 'Usado para calcular seu metabolismo com precisao (formula Mifflin-St Jeor).',
      type: 'single',
      grid: 'grid-2',
      options: [
        { value: 'male', icon: '&#9794;', label: 'Masculino', sub: '' },
        { value: 'female', icon: '&#9792;', label: 'Feminino', sub: '' }
      ]
    },
    {
      id: 'age',
      category: '&#128197; Perfil',
      title: 'Qual e a sua idade?',
      subtitle: 'O metabolismo basal diminui com a idade. Isso afeta seu calculo de calorias.',
      type: 'number',
      unit: 'anos',
      min: 14,
      max: 90,
      placeholder: '25',
      hint: 'Entre 14 e 90 anos'
    },
    {
      id: 'weight',
      category: '&#9878; Medidas',
      title: 'Qual e o seu peso atual?',
      subtitle: 'Sera usado para calcular sua TMB e proteina diaria.',
      type: 'number',
      unit: 'kg',
      min: 30,
      max: 250,
      placeholder: '70',
      hint: 'Entre 30 e 250 kg'
    },
    {
      id: 'height',
      category: '&#9878; Medidas',
      title: 'Qual e a sua altura?',
      subtitle: 'Combinada com peso e idade, determina seu gasto energetico basal.',
      type: 'number',
      unit: 'cm',
      min: 130,
      max: 220,
      placeholder: '170',
      hint: 'Entre 130 e 220 cm'
    },
    {
      id: 'activity',
      category: '&#127939; Estilo de Vida',
      title: 'Qual e o seu nivel de atividade fisica?',
      subtitle: 'Seja honesto — isso define o multiplicador do seu TDEE.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'sedentary', icon: '&#128187;', label: 'Sedentario', sub: 'Pouco ou nenhum exercicio (escritorio, home office)' },
        { value: 'light', icon: '&#127959;', label: 'Levemente Ativo', sub: 'Exercicio leve 1-3 dias por semana' },
        { value: 'moderate', icon: '&#127946;', label: 'Moderadamente Ativo', sub: 'Exercicio moderado 3-5 dias por semana' },
        { value: 'active', icon: '&#127939;', label: 'Muito Ativo', sub: 'Exercicio intenso 6-7 dias por semana' },
        { value: 'extreme', icon: '&#127947;', label: 'Extremamente Ativo', sub: 'Atleta, trabalho fisico + treino diario' }
      ]
    },
    {
      id: 'target_weight',
      category: '&#127919; Objetivo',
      title: 'Qual e o seu peso alvo?',
      subtitle: 'Qual peso voce quer atingir? Usaremos para calcular projecoes.',
      type: 'number',
      unit: 'kg',
      min: 30,
      max: 250,
      placeholder: '65',
      hint: 'Peso que voce quer alcancar'
    },
    {
      id: 'meals_per_day',
      category: '&#127869; Alimentacao',
      title: 'Quantas refeicoes voce prefere por dia?',
      subtitle: 'Isso distribui suas calorias ao longo do dia.',
      type: 'single',
      grid: 'grid-2',
      options: [
        { value: 3, icon: '&#51;', label: '3 refeicoes', sub: 'Classico: cafe, almoco, jantar' },
        { value: 4, icon: '&#52;', label: '4 refeicoes', sub: '+ 1 lanche da tarde' },
        { value: 5, icon: '&#53;', label: '5 refeicoes', sub: '+ cafe e lanche antes do treino' },
        { value: 6, icon: '&#54;', label: '6 refeicoes', sub: 'A cada 3h para maximizar anabolismo' }
      ]
    },
    {
      id: 'diet_type',
      category: '&#127807; Preferencias',
      title: 'Qual tipo de dieta voce prefere?',
      subtitle: 'Selecionaremos refeicoes adequadas ao seu estilo alimentar.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'regular', icon: '&#127829;', label: 'Dieta Balanceada', sub: 'Come de tudo, sem restricoes' },
        { value: 'lowcarb', icon: '&#129370;', label: 'Low Carb', sub: 'Reduz carboidratos, mais proteinas e gorduras boas' },
        { value: 'vegetarian', icon: '&#129379;', label: 'Vegetariano', sub: 'Sem carnes, com ovos e laticinios' },
        { value: 'vegan', icon: '&#127807;', label: 'Vegano', sub: 'Apenas alimentos de origem vegetal' },
        { value: 'mediterranean', icon: '&#127757;', label: 'Mediterranea', sub: 'Azeite, peixes, legumes e cereais integrais' }
      ]
    },
    {
      id: 'allergies',
      category: '&#9888; Restricoes',
      title: 'Voce tem alguma alergia ou intolerancia?',
      subtitle: 'Selecione todas que se aplicam (pode pular se nao tiver).',
      type: 'multi',
      grid: 'grid-2',
      optional: true,
      options: [
        { value: 'gluten', icon: '&#127839;', label: 'Gluten', sub: 'Trigo, centeio, cevada' },
        { value: 'lactose', icon: '&#129371;', label: 'Lactose', sub: 'Laticinios em geral' },
        { value: 'nut', icon: '&#129375;', label: 'Nozes/Amendoas', sub: 'Oleaginosas em geral' },
        { value: 'egg', icon: '&#129370;', label: 'Ovo', sub: 'Intolerancia a ovo' },
        { value: 'none', icon: '&#10003;', label: 'Nenhuma', sub: 'Sem restricoes alimentares' }
      ]
    },
    {
      id: 'meal_prep',
      category: '&#128300; Rotina',
      title: 'Como e sua rotina de preparo de refeicoes?',
      subtitle: 'Isso influencia no tipo de receitas que vamos recomendar.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'no_time', icon: '&#9200;', label: 'Pouco tempo', sub: 'Preciso de refeicoes rapidas, menos de 15 minutos' },
        { value: 'moderate', icon: '&#127859;', label: 'Moderado', sub: 'Posso dedicar 30-45 min por refeicao' },
        { value: 'meal_prep', icon: '&#128218;', label: 'Preparo semanal', sub: 'Gosto de fazer marmitas e cozinhar em grande quantidade' },
        { value: 'enjoy', icon: '&#127868;', label: 'Adoro cozinhar', sub: 'Tenho tempo e gosto de preparar refeicoes elaboradas' }
      ]
    },
    {
      id: 'training_type',
      category: '&#127947; Treino',
      title: 'Que tipo de treino voce faz (ou pretende fazer)?',
      subtitle: 'Ajusta a distribuicao de proteinas e carboidratos.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'none', icon: '&#128128;', label: 'Nao treino', sub: 'Ainda nao comecei ou nao pratico' },
        { value: 'cardio', icon: '&#127939;', label: 'Cardio / Aerobico', sub: 'Corrida, bike, natacao, danca' },
        { value: 'strength', icon: '&#127947;', label: 'Musculacao / Forca', sub: 'Academia, crossfit, calistenia' },
        { value: 'mixed', icon: '&#9881;', label: 'Misto', sub: 'Combino cardio e musculacao' },
        { value: 'functional', icon: '&#127952;', label: 'Funcional / Esportivo', sub: 'Esportes, funcional, artes marciais' }
      ]
    },
    {
      id: 'training_days',
      category: '&#127939; Treino',
      title: 'Quantos dias por semana voce treina?',
      subtitle: 'Calculamos o total de calorias gastas em exercicio.',
      type: 'slider',
      min: 0,
      max: 7,
      step: 1,
      defaultVal: 3,
      unit: 'dias/semana',
      labels: ['0', '1', '2', '3', '4', '5', '6', '7']
    },
    {
      id: 'sleep_hours',
      category: '&#128164; Recuperacao',
      title: 'Quantas horas voce dorme por noite?',
      subtitle: 'O sono afeta hormonios, apetite e recuperacao muscular.',
      type: 'slider',
      min: 4,
      max: 10,
      step: 0.5,
      defaultVal: 7,
      unit: 'horas/noite',
      labels: ['4h', '6h', '8h', '10h']
    },
    {
      id: 'stress_level',
      category: '&#129504; Bem-estar',
      title: 'Como voce avalia seu nivel de estresse atual?',
      subtitle: 'Estresse elevado aumenta cortisol, dificultando emagrecimento.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 1, icon: '&#128512;', label: 'Muito baixo', sub: 'Vida tranquila, poucas preocupacoes' },
        { value: 2, icon: '&#128522;', label: 'Baixo', sub: 'Estresse pontual, bem controlado' },
        { value: 3, icon: '&#128528;', label: 'Moderado', sub: 'Estresse do dia a dia, trabalho/familia' },
        { value: 4, icon: '&#128533;', label: 'Alto', sub: 'Muitas demandas, pouco tempo de lazer' },
        { value: 5, icon: '&#128552;', label: 'Muito alto', sub: 'Estresse crônico, ansiedade frequente' }
      ]
    },
    {
      id: 'water_intake',
      category: '&#128167; Hidratacao',
      title: 'Quantos litros de agua voce bebe por dia hoje?',
      subtitle: 'Vamos comparar com sua meta ideal e criar um plano de hidratacao.',
      type: 'slider',
      min: 0,
      max: 4,
      step: 0.25,
      defaultVal: 1.5,
      unit: 'litros/dia',
      labels: ['0L', '1L', '2L', '3L', '4L']
    },
    {
      id: 'motivation',
      category: '&#127775; Motivacao',
      title: 'O que mais te motiva a manter a dieta?',
      subtitle: 'Personalizamos as mensagens e conquistas para o que mais importa para voce.',
      type: 'single',
      grid: 'grid-2',
      options: [
        { value: 'aesthetic', icon: '&#129333;', label: 'Estetica', sub: 'Ficar bonito, definido' },
        { value: 'health', icon: '&#10084;', label: 'Saude', sub: 'Prevenir doencas, longevidade' },
        { value: 'energy', icon: '&#9889;', label: 'Energia', sub: 'Mais disposicao no dia a dia' },
        { value: 'performance', icon: '&#127942;', label: 'Performance', sub: 'Melhorar no esporte' }
      ]
    },
    {
      id: 'experience',
      category: '&#127891; Experiencia',
      title: 'Qual e a sua experiencia com dieta e nutricao?',
      subtitle: 'Ajusta o nivel de detalhes das orientacoes que voce recebera.',
      type: 'single',
      grid: 'grid-1',
      options: [
        { value: 'beginner', icon: '&#128250;', label: 'Iniciante', sub: 'Primeira vez seguindo um plano alimentar' },
        { value: 'intermediate', icon: '&#127891;', label: 'Intermediario', sub: 'Ja fiz dieta antes, conhego o basico' },
        { value: 'advanced', icon: '&#127942;', label: 'Avancado', sub: 'Acompanho macros, conheco nutricao' }
      ]
    },
    {
      id: 'habits_to_build',
      category: '&#9989; Habitos',
      title: 'Quais habitos voce quer desenvolver?',
      subtitle: 'Selecione ate 3 habitos prioritarios para seu tracking diario.',
      type: 'multi',
      grid: 'grid-2',
      optional: false,
      maxSelect: 3,
      options: [
        { value: 'water', icon: '&#128167;', label: 'Beber agua', sub: 'Meta diaria de hidratacao' },
        { value: 'sleep', icon: '&#128164;', label: 'Dormir bem', sub: '7-8 horas por noite' },
        { value: 'exercise', icon: '&#127939;', label: 'Exercitar-se', sub: 'Treino regular' },
        { value: 'vegetables', icon: '&#129377;', label: 'Comer vegetais', sub: '5 porcoes por dia' },
        { value: 'nosugar', icon: '&#127850;', label: 'Sem acucar', sub: 'Evitar acucar refinado' },
        { value: 'meditate', icon: '&#129504;', label: 'Meditar', sub: 'Mindfulness diario' }
      ]
    }
  ];

  // ---- State ----
  var state = {
    currentIndex: 0,
    answers: {},
    direction: 'forward'
  };

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', async function () {
    Theme.init();

    var loggedIn = await Auth.isLoggedIn();
    if (!loggedIn) {
      window.location.href = 'index.html';
      return;
    }

    var user = await Auth.getCurrentUser();
    if (user && user.quizDone) {
      window.location.href = 'app.html';
      return;
    }

    renderQuestion(0);
  });

  // ---- Render ----
  function renderQuestion(index) {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    updateProgress(index);

    var q = QUESTIONS[index];
    var html = '<div class="question-card' + (state.direction === 'back' ? ' animate-left' : '') + '">';
    html += '<div class="question-category">' + q.category + '</div>';
    html += '<h2 class="question-title">' + q.title + '</h2>';
    html += '<p class="question-subtitle">' + q.subtitle + '</p>';

    if (q.type === 'single') {
      html += renderOptions(q, false);
    } else if (q.type === 'multi') {
      html += '<p class="multi-select-hint">&#128071; Selecione ' + (q.maxSelect ? 'ate ' + q.maxSelect : 'todas que se aplicam') + (q.optional ? ' (opcional)' : '') + '</p>';
      html += renderOptions(q, true);
    } else if (q.type === 'number') {
      html += renderNumberInput(q);
    } else if (q.type === 'slider') {
      html += renderSlider(q);
    }

    html += '<div class="quiz-nav">';
    if (index > 0) {
      html += '<button class="btn-quiz-back" id="btn-back">&#8592; Voltar</button>';
    } else {
      html += '<div></div>';
    }
    html += '<button class="btn-quiz-next" id="btn-next" ' + (needsAnswer(q) && !state.answers[q.id] ? 'disabled' : '') + '>';
    html += index < QUESTIONS.length - 1 ? 'Proximo &#8594;' : '&#127807; Ver Meu Plano';
    html += '</button>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
    bindQuestionEvents(q, index);
    restoreAnswer(q);
  }

  function renderOptions(q, isMulti) {
    var html = '<div class="options-grid ' + (q.grid || 'grid-1') + '">';
    q.options.forEach(function (opt) {
      html += '<button class="option-btn' + (isMulti ? ' multi' : '') + '" data-value="' + opt.value + '" type="button">';
      html += '<span class="option-icon">' + opt.icon + '</span>';
      html += '<span class="option-text-wrap"><span class="option-label">' + opt.label + '</span>';
      if (opt.sub) html += '<span class="option-sub">' + opt.sub + '</span>';
      html += '</span>';
      html += '<span class="option-check" aria-hidden="true">&#10003;</span>';
      html += '</button>';
    });
    html += '</div>';
    return html;
  }

  function renderNumberInput(q) {
    var html = '<div class="number-input-wrap">';
    html += '<input class="number-input-field" id="q-number" type="number" min="' + q.min + '" max="' + q.max + '" placeholder="' + q.placeholder + '" inputmode="numeric">';
    html += '<span class="number-unit">' + q.unit + '</span>';
    html += '</div>';
    html += '<p class="number-hint">' + q.hint + '</p>';
    return html;
  }

  function renderSlider(q) {
    var saved = state.answers[QUESTIONS[state.currentIndex].id];
    var val = saved !== undefined ? saved : q.defaultVal;
    var html = '<div class="slider-wrap">';
    html += '<div class="slider-value-display"><span id="slider-val">' + val + '</span> <span class="slider-unit">' + q.unit + '</span></div>';
    html += '<input type="range" class="quiz-slider" id="q-slider" min="' + q.min + '" max="' + q.max + '" step="' + q.step + '" value="' + val + '">';
    if (q.labels) {
      html += '<div class="slider-labels">';
      q.labels.forEach(function (l) { html += '<span>' + l + '</span>'; });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function bindQuestionEvents(q, index) {
    var btnNext = document.getElementById('btn-next');
    var btnBack = document.getElementById('btn-back');

    if (btnBack) {
      btnBack.addEventListener('click', function () {
        state.direction = 'back';
        state.currentIndex = index - 1;
        renderQuestion(state.currentIndex);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        if (!validateAnswer(q)) return;
        if (index < QUESTIONS.length - 1) {
          state.direction = 'forward';
          state.currentIndex = index + 1;
          renderQuestion(state.currentIndex);
        } else {
          finishQuiz();
        }
      });
    }

    // Single select
    if (q.type === 'single') {
      document.querySelectorAll('.option-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.option-btn').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          var val = btn.getAttribute('data-value');
          var numVal = parseFloat(val);
          state.answers[q.id] = isNaN(numVal) ? val : numVal;
          if (btnNext) btnNext.disabled = false;
        });
      });
    }

    // Multi select
    if (q.type === 'multi') {
      document.querySelectorAll('.option-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var val = btn.getAttribute('data-value');
          var selected = state.answers[q.id] || [];

          if (val === 'none') {
            // Deselect all others
            document.querySelectorAll('.option-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
            state.answers[q.id] = ['none'];
            if (btnNext) btnNext.disabled = false;
            return;
          }

          // Remove 'none' if selecting other
          selected = selected.filter(function (v) { return v !== 'none'; });
          document.querySelector('[data-value="none"]') && document.querySelector('[data-value="none"]').classList.remove('selected');

          var idx = selected.indexOf(val);
          if (idx > -1) {
            selected.splice(idx, 1);
            btn.classList.remove('selected');
          } else {
            if (q.maxSelect && selected.length >= q.maxSelect) {
              Toast.warning('Selecione no maximo ' + q.maxSelect + ' opcoes');
              return;
            }
            selected.push(val);
            btn.classList.add('selected');
          }
          state.answers[q.id] = selected;
          if (btnNext) btnNext.disabled = !q.optional && selected.length === 0;
        });
      });
    }

    // Number input
    if (q.type === 'number') {
      var numInput = document.getElementById('q-number');
      if (numInput) {
        numInput.addEventListener('input', function () {
          var v = parseFloat(numInput.value);
          if (!isNaN(v) && v >= q.min && v <= q.max) {
            state.answers[q.id] = v;
            if (btnNext) btnNext.disabled = false;
          } else {
            if (btnNext) btnNext.disabled = true;
          }
        });
        numInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && !btnNext.disabled) btnNext.click();
        });
      }
    }

    // Slider
    if (q.type === 'slider') {
      var slider = document.getElementById('q-slider');
      var display = document.getElementById('slider-val');
      if (slider) {
        state.answers[q.id] = parseFloat(slider.value);
        slider.addEventListener('input', function () {
          var v = parseFloat(slider.value);
          state.answers[q.id] = v;
          if (display) display.textContent = v;
          if (btnNext) btnNext.disabled = false;
        });
      }
    }
  }

  function restoreAnswer(q) {
    var saved = state.answers[q.id];
    if (saved === undefined) return;

    if (q.type === 'single') {
      var btn = document.querySelector('.option-btn[data-value="' + saved + '"]');
      if (btn) btn.classList.add('selected');
    }
    if (q.type === 'multi') {
      (saved || []).forEach(function (v) {
        var btn = document.querySelector('.option-btn[data-value="' + v + '"]');
        if (btn) btn.classList.add('selected');
      });
    }
    if (q.type === 'number') {
      var inp = document.getElementById('q-number');
      if (inp) inp.value = saved;
    }
    if (q.type === 'slider') {
      var sl = document.getElementById('q-slider');
      var disp = document.getElementById('slider-val');
      if (sl) sl.value = saved;
      if (disp) disp.textContent = saved;
    }

    var btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.disabled = false;
  }

  function needsAnswer(q) {
    return !q.optional;
  }

  function validateAnswer(q) {
    var ans = state.answers[q.id];

    if (q.type === 'number') {
      var inp = document.getElementById('q-number');
      var v = inp ? parseFloat(inp.value) : NaN;
      if (isNaN(v) || v < q.min || v > q.max) {
        Toast.error('Digite um valor entre ' + q.min + ' e ' + q.max + ' ' + q.unit);
        return false;
      }
      state.answers[q.id] = v;
      return true;
    }

    if (q.type === 'slider') {
      if (ans === undefined) {
        var sl = document.getElementById('q-slider');
        state.answers[q.id] = sl ? parseFloat(sl.value) : q.defaultVal;
      }
      return true;
    }

    if (q.optional) return true;

    if (q.type === 'multi' && (!ans || ans.length === 0)) {
      Toast.error('Selecione pelo menos uma opcao');
      return false;
    }

    if (!ans && ans !== 0) {
      Toast.error('Selecione uma opcao para continuar');
      return false;
    }
    return true;
  }

  function updateProgress(index) {
    var pct = Math.round(((index + 1) / QUESTIONS.length) * 100);
    var fill = document.getElementById('quiz-progress-fill');
    var label = document.getElementById('quiz-progress-label');
    var counter = document.getElementById('quiz-step-counter');
    if (fill) { fill.style.width = pct + '%'; fill.parentElement.setAttribute('aria-valuenow', pct); }
    if (label) label.textContent = pct + '%';
    if (counter) counter.textContent = 'Pergunta ' + (index + 1) + ' de ' + QUESTIONS.length;
  }

  // ---- Finish Quiz ----
  async function finishQuiz() {
    var a = state.answers;
    var gender = a.gender === 'male' ? 'M' : 'F';
    var plan = NutritionCalc.generatePlan({
      weight: a.weight || 70,
      height: a.height || 170,
      age: a.age || 25,
      gender: gender,
      activity: a.activity || 'moderate',
      goal: a.goal || 'maintain',
      targetWeight: a.target_weight || a.weight || 70
    });

    var saved = await Auth.saveQuizResults(a, plan);
    if (!saved) {
      Toast.error('Erro ao salvar. Tente novamente.');
      return;
    }

    renderResults(plan, a);
  }

  function renderResults(plan, answers) {
    var container = document.getElementById('quiz-container');
    var name = '';
    (async function () {
      var user = await Auth.getCurrentUser();
      if (user) name = user.name.split(' ')[0];

      var imc = NutritionCalc.calcIMC(answers.weight || 70, answers.height || 170);
      var imcClass = NutritionCalc.classifyIMC(imc);
      var daysToGoal = NutritionCalc.calcProjection(answers.weight || 70, answers.target_weight || answers.weight || 70, plan.calories);

      var html = '<div class="quiz-results">';
      html += '<div class="results-icon">&#127881;</div>';
      html += '<h2 class="results-title">Seu Plano Esta Pronto, ' + (name || 'Atleta') + '!</h2>';
      html += '<p class="results-subtitle">Baseado nas suas respostas, calculamos seu plano nutricional personalizado.</p>';

      html += '<div class="results-grid">';
      html += '<div class="result-stat"><div class="result-stat-value">' + plan.calories + '</div><div class="result-stat-label">kcal / dia</div></div>';
      html += '<div class="result-stat"><div class="result-stat-value">' + imc.toFixed(1) + '</div><div class="result-stat-label">IMC (' + imcClass + ')</div></div>';
      html += '<div class="result-stat"><div class="result-stat-value">' + plan.water + 'L</div><div class="result-stat-label">Agua / dia</div></div>';
      if (daysToGoal > 0 && daysToGoal < 999) {
        html += '<div class="result-stat"><div class="result-stat-value">' + daysToGoal + 'd</div><div class="result-stat-label">Estimativa para meta</div></div>';
      }
      html += '</div>';

      html += '<div class="results-macros">';
      html += '<div class="macro-block prot"><div class="macro-block-value">' + plan.protein + 'g</div><div class="macro-block-label">Proteina</div></div>';
      html += '<div class="macro-block carb"><div class="macro-block-value">' + plan.carbs + 'g</div><div class="macro-block-label">Carboidrato</div></div>';
      html += '<div class="macro-block fat"><div class="macro-block-value">' + plan.fat + 'g</div><div class="macro-block-label">Gordura</div></div>';
      html += '</div>';

      html += '<button class="btn btn-primary btn-lg" id="btn-go-app">Abrir Meu Dashboard &#8594;</button>';
      html += '</div>';

      container.innerHTML = html;

      var counter = document.getElementById('quiz-step-counter');
      if (counter) counter.textContent = 'Quiz Concluido!';
      var fill = document.getElementById('quiz-progress-fill');
      if (fill) { fill.style.width = '100%'; fill.parentElement.setAttribute('aria-valuenow', 100); }
      var lbl = document.getElementById('quiz-progress-label');
      if (lbl) lbl.textContent = '100%';

      var btnApp = document.getElementById('btn-go-app');
      if (btnApp) {
        btnApp.addEventListener('click', function () {
          window.location.href = 'app.html';
        });
      }

      Toast.success('Plano calculado com sucesso!');
    }());
  }

}());
