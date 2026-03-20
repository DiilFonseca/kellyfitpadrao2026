/* ============================================================
   KellyFit Padrao 2026 — BMI Calculator Feature
   ============================================================ */
const BMICalculator = {
  render() {
    var container = document.getElementById('page-imc');
    if (!container) return;

    Auth.getCurrentUser().then(function (user) {
      var qa = user && user.quizAnswers ? user.quizAnswers : {};
      var initWeight = qa.weight || '';
      var initHeight = qa.height || '';

      var html = '<div class="page-header"><div><h1 class="page-title">&#9878; Calculadora IMC</h1><p class="page-subtitle">Calcule seu indice de massa corporal e composicao corporal</p></div></div>';

      // Input form
      html += '<div class="card" style="margin-bottom:20px">' +
        '<div class="card-header"><h3>Seus Dados</h3></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
        '<div class="input-group"><label>Peso (kg)</label><input class="input" type="number" id="bmi-weight" min="30" max="300" step="0.1" placeholder="70.0" value="' + initWeight + '"></div>' +
        '<div class="input-group"><label>Altura (cm)</label><input class="input" type="number" id="bmi-height" min="100" max="250" step="1" placeholder="170" value="' + initHeight + '"></div>' +
        '<div class="input-group"><label>Idade</label><input class="input" type="number" id="bmi-age" min="10" max="120" step="1" placeholder="25" value="' + (qa.age || '') + '"></div>' +
        '<div class="input-group"><label>Sexo</label><select class="input" id="bmi-gender">' +
        '<option value="masculino" ' + (qa.gender === 'masculino' ? 'selected' : '') + '>Masculino</option>' +
        '<option value="feminino" ' + (qa.gender === 'feminino' ? 'selected' : '') + '>Feminino</option>' +
        '</select></div>' +
        '</div>' +
        '<button class="btn btn-primary" id="btn-calc-bmi" style="margin-top:16px;width:100%">Calcular IMC</button></div>';

      // Results placeholder
      html += '<div id="bmi-results"></div>';

      // Reference table
      html += '<div class="card">' +
        '<div class="card-header"><h3>&#128218; Tabela de Referencia IMC</h3></div>' +
        '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="border-bottom:1px solid var(--border-color)">' +
        '<th style="padding:10px;text-align:left;font-size:var(--text-sm)">IMC</th>' +
        '<th style="padding:10px;text-align:left;font-size:var(--text-sm)">Classificacao</th>' +
        '<th style="padding:10px;text-align:left;font-size:var(--text-sm)">Risco de Saude</th>' +
        '</tr></thead><tbody>';

      var refs = [
        { range: '< 18.5', label: 'Abaixo do Peso', risk: 'Aumentado', color: 'var(--info)' },
        { range: '18.5 - 24.9', label: 'Peso Normal', risk: 'Baixo', color: 'var(--primary-500)' },
        { range: '25.0 - 29.9', label: 'Sobrepeso', risk: 'Aumentado', color: 'var(--warning)' },
        { range: '30.0 - 34.9', label: 'Obesidade Grau I', risk: 'Alto', color: 'var(--warning)' },
        { range: '35.0 - 39.9', label: 'Obesidade Grau II', risk: 'Muito Alto', color: 'var(--error)' },
        { range: '>= 40.0', label: 'Obesidade Grau III', risk: 'Extremo', color: 'var(--error)' }
      ];
      refs.forEach(function (r) {
        html += '<tr style="border-bottom:1px solid var(--border-color)">' +
          '<td style="padding:10px;font-size:var(--text-sm);font-weight:700">' + r.range + '</td>' +
          '<td style="padding:10px;font-size:var(--text-sm);color:' + r.color + ';font-weight:600">' + r.label + '</td>' +
          '<td style="padding:10px;font-size:var(--text-sm);color:var(--text-secondary)">' + r.risk + '</td></tr>';
      });
      html += '</tbody></table></div></div>';

      container.innerHTML = html;

      // Auto-calculate if data pre-filled from quiz
      if (initWeight && initHeight) {
        BMICalculator._calculate();
      }

      document.getElementById('btn-calc-bmi').addEventListener('click', function () {
        BMICalculator._calculate();
      });
    });
  },

  _calculate() {
    var weight = parseFloat(document.getElementById('bmi-weight').value);
    var height = parseFloat(document.getElementById('bmi-height').value);
    var age = parseInt(document.getElementById('bmi-age').value) || 30;
    var gender = document.getElementById('bmi-gender').value;

    if (isNaN(weight) || weight < 30 || weight > 300) { Toast.error('Peso invalido (30-300 kg)'); return; }
    if (isNaN(height) || height < 100 || height > 250) { Toast.error('Altura invalida (100-250 cm)'); return; }

    var bmi = NutritionCalc.calcIMC(weight, height);
    var categoryData = NutritionCalc.classifyIMC(bmi);
    var category = categoryData.label;
    var sexCode = gender === 'masculino' ? 'M' : 'F';
    var idealMid = NutritionCalc.calcIdealWeight(height, sexCode);
    var idealWeight = { min: Math.round((idealMid - 4) * 10) / 10, max: Math.round((idealMid + 4) * 10) / 10 };
    var bodyFat = BMICalculator._estimateBodyFat(bmi, age, gender);

    // Color based on category
    var color = 'var(--primary-500)';
    if (bmi < 18.5) color = 'var(--info)';
    else if (bmi < 25) color = 'var(--primary-500)';
    else if (bmi < 30) color = 'var(--warning)';
    else color = 'var(--error)';

    // Bar position (BMI 10-45 range, clamped)
    var pct = Math.min(100, Math.max(0, ((bmi - 10) / 35) * 100));

    var results = '<div class="card" style="margin-bottom:20px;border-color:' + color + '">' +
      '<div class="card-header"><h3>&#127919; Seu Resultado</h3></div>' +
      '<div style="text-align:center;padding:24px 0">' +
      '<div style="font-size:4rem;font-weight:900;color:' + color + ';line-height:1">' + bmi + '</div>' +
      '<div style="font-size:var(--text-lg);font-weight:700;color:' + color + ';margin-top:8px">' + category + '</div>' +
      '</div>' +
      '<div style="background:var(--bg-input);border-radius:var(--radius-md);height:12px;position:relative;margin-bottom:12px">' +
      '<div style="position:absolute;height:100%;width:100%;border-radius:var(--radius-md);background:linear-gradient(to right,var(--info),var(--primary-500),var(--warning),var(--error))"></div>' +
      '<div style="position:absolute;top:-4px;left:' + pct + '%;transform:translateX(-50%);width:20px;height:20px;border-radius:50%;background:white;border:3px solid ' + color + ';box-shadow:var(--shadow-md)"></div>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--text-muted);margin-bottom:20px">' +
      '<span>Abaixo</span><span>Normal</span><span>Sobrepeso</span><span>Obeso</span></div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">' +
      '<div class="result-stat"><div class="result-stat-value">' + weight + 'kg</div><div class="result-stat-label">Peso Atual</div></div>' +
      '<div class="result-stat"><div class="result-stat-value">' + idealWeight.min + '-' + idealWeight.max + 'kg</div><div class="result-stat-label">Peso Ideal</div></div>' +
      '<div class="result-stat"><div class="result-stat-value">' + bodyFat + '%</div><div class="result-stat-label">Gordura Est.</div></div>' +
      '</div></div>';

    // Difference to ideal
    var midIdeal = (idealWeight.min + idealWeight.max) / 2;
    var diff = (weight - midIdeal).toFixed(1);
    var diffAbs = Math.abs(parseFloat(diff));

    var advice = '';
    if (bmi >= 18.5 && bmi < 25) {
      advice = '&#127881; Parabens! Voce esta dentro do peso ideal. Mantenha seus habitos saudaveis.';
    } else if (bmi < 18.5) {
      advice = '&#128276; Voce esta abaixo do peso ideal. Considere aumentar a ingestao calorica com alimentos nutritivos e consulte um nutricionista.';
    } else if (bmi < 30) {
      advice = '&#128336; Voce tem ' + diffAbs + 'kg acima do centro do peso ideal. Uma perda gradual de 0.5-1kg/semana e recomendada.';
    } else {
      advice = '&#9888;&#65039; Obesidade detectada. Recomenda-se acompanhamento medico e nutricional profissional.';
    }

    results += '<div class="card" style="background:rgba(16,185,129,0.05);border-color:var(--primary-500)">' +
      '<div style="font-size:1.2rem;margin-bottom:8px">&#128172; Recomendacao</div>' +
      '<div style="color:var(--text-secondary);font-size:var(--text-sm)">' + advice + '</div></div>';

    document.getElementById('bmi-results').innerHTML = results;
    Gamification.awardBadge('b026');
  },

  _estimateBodyFat(bmi, age, gender) {
    // Deurenberg formula (1991)
    var bf;
    var isMale = gender === 'masculino' ? 1 : 0;
    bf = (1.20 * bmi) + (0.23 * age) - (10.8 * isMale) - 5.4;
    return Math.max(5, Math.min(60, parseFloat(bf.toFixed(1))));
  }
};
