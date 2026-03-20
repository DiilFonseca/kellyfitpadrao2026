/* ============================================================
   KellyFit Padrao 2026 — Nutrition Calculations
   Formulas: Mifflin-St Jeor (TMB), Harris-Benedict (alternativa)
   ============================================================ */
const NutritionCalc = {

  // TMB via Mifflin-St Jeor (padrao ouro)
  calcTMB(peso, altura, idade, sexo) {
    if (sexo === 'M') return 10 * peso + 6.25 * altura - 5 * idade + 5;
    return 10 * peso + 6.25 * altura - 5 * idade - 161;
  },

  // Fator de atividade
  getActivityFactor(level) {
    const factors = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      ativo: 1.725,
      muito_ativo: 1.9
    };
    return factors[level] || 1.55;
  },

  // TDEE = TMB x Fator Atividade
  calcTDEE(tmb, activityLevel) {
    return Math.round(tmb * this.getActivityFactor(activityLevel));
  },

  // Calorias ajustadas por objetivo
  calcCalories(tdee, objetivo) {
    if (objetivo === 'emagrecer') return Math.round(Math.max(1200, tdee - 500));
    if (objetivo === 'ganhar') return Math.round(tdee + 300);
    if (objetivo === 'saude') return Math.round(tdee - 200);
    return Math.round(tdee); // manter
  },

  // Macros por objetivo
  calcMacros(calorias, peso, objetivo) {
    let proteinaG, gorduraG, carbsG;

    if (objetivo === 'emagrecer') {
      proteinaG = Math.round(peso * 2.2); // alta proteina para preservar musculo
      gorduraG = Math.round((calorias * 0.25) / 9);
    } else if (objetivo === 'ganhar') {
      proteinaG = Math.round(peso * 2.0);
      gorduraG = Math.round((calorias * 0.25) / 9);
    } else {
      proteinaG = Math.round(peso * 1.8);
      gorduraG = Math.round((calorias * 0.28) / 9);
    }

    carbsG = Math.round(Math.max(50, (calorias - proteinaG * 4 - gorduraG * 9) / 4));
    const fibraG = Math.round(calorias / 1000 * 14); // 14g por 1000kcal

    return { proteina: proteinaG, carbs: carbsG, gordura: gorduraG, fibra: fibraG };
  },

  // Meta de agua (ml)
  calcWaterGoal(peso) {
    return Math.round(peso * 35); // 35ml por kg
  },

  // Copos de agua (250ml)
  calcWaterCups(peso) {
    return Math.max(6, Math.min(15, Math.round(this.calcWaterGoal(peso) / 250)));
  },

  // IMC
  calcIMC(peso, alturaCm) {
    const alturaM = alturaCm / 100;
    return Math.round((peso / (alturaM * alturaM)) * 10) / 10;
  },

  // Classificacao IMC
  classifyIMC(imc) {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: 'var(--info)', level: 0 };
    if (imc < 25) return { label: 'Peso normal', color: 'var(--success)', level: 1 };
    if (imc < 30) return { label: 'Sobrepeso', color: 'var(--warning)', level: 2 };
    if (imc < 35) return { label: 'Obesidade I', color: 'var(--accent-500)', level: 3 };
    if (imc < 40) return { label: 'Obesidade II', color: 'var(--error)', level: 4 };
    return { label: 'Obesidade III', color: 'var(--error)', level: 5 };
  },

  // Gordura corporal estimada (formula BMI-based)
  calcBodyFat(imc, idade, sexo) {
    if (sexo === 'M') return Math.round(((1.20 * imc) + (0.23 * idade) - 16.2) * 10) / 10;
    return Math.round(((1.20 * imc) + (0.23 * idade) - 5.4) * 10) / 10;
  },

  // Peso ideal (Hamwi)
  calcIdealWeight(alturaCm, sexo) {
    const inchesOver60 = (alturaCm - 152.4) / 2.54;
    if (sexo === 'M') return Math.round((48 + 2.7 * inchesOver60) * 10) / 10;
    return Math.round((45.5 + 2.2 * inchesOver60) * 10) / 10;
  },

  // Massa magra estimada
  calcLeanMass(peso, bodyFatPct) {
    return Math.round(peso * (1 - bodyFatPct / 100) * 10) / 10;
  },

  // Projecao de tempo para meta
  calcProjection(pesoAtual, pesoMeta, objetivo) {
    if (objetivo === 'emagrecer' && pesoAtual > pesoMeta) {
      const kgPerWeek = 0.5;
      const weeks = Math.ceil((pesoAtual - pesoMeta) / kgPerWeek);
      const targetDate = new Date(Date.now() + weeks * 7 * 86400000);
      return { weeks, kgPerWeek, targetDate: targetDate.toISOString().split('T')[0] };
    }
    if (objetivo === 'ganhar' && pesoAtual < pesoMeta) {
      const kgPerWeek = 0.25;
      const weeks = Math.ceil((pesoMeta - pesoAtual) / kgPerWeek);
      const targetDate = new Date(Date.now() + weeks * 7 * 86400000);
      return { weeks, kgPerWeek, targetDate: targetDate.toISOString().split('T')[0] };
    }
    return null;
  },

  // Calorias queimadas por exercicio (MET)
  calcExerciseCalories(metValue, pesoKg, durationMin) {
    return Math.round(metValue * pesoKg * (durationMin / 60));
  },

  // Gerar plano completo a partir das respostas do quiz
  generatePlan(answers) {
    const peso = answers.peso || 75;
    const altura = answers.altura || 170;
    const idade = answers.idade || 30;
    const sexo = answers.sexo || 'M';
    const atividade = answers.atividade || 'moderado';
    const objetivo = answers.objetivo || 'emagrecer';
    const pesoDesejado = answers.pesoDesejado || 68;

    const tmb = Math.round(this.calcTMB(peso, altura, idade, sexo));
    const tdee = this.calcTDEE(tmb, atividade);
    const calorias = this.calcCalories(tdee, objetivo);
    const macros = this.calcMacros(calorias, peso, objetivo);
    const waterCups = this.calcWaterCups(peso);
    const imc = this.calcIMC(peso, altura);
    const bodyFat = this.calcBodyFat(imc, idade, sexo);
    const idealWeight = this.calcIdealWeight(altura, sexo);
    const projection = this.calcProjection(peso, pesoDesejado, objetivo);

    return {
      tmb, tdee, calorias,
      proteina: macros.proteina,
      carbs: macros.carbs,
      gordura: macros.gordura,
      fibra: macros.fibra,
      waterCups,
      imc, bodyFat, idealWeight,
      projecao: projection
    };
  }
};
