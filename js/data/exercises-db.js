/* ============================================================
   KellyFit Padrao 2026 — Exercises Database (62 exercicios)
   Valores MET baseados no Compendium of Physical Activities (Ainsworth et al.)
   ============================================================ */
const ExercisesDB = {
  exercises: [
    /* ==================== CARDIO ==================== */
    { id: 'e001', name: 'Corrida (8 km/h)', emoji: '&#127939;', category: 'cardio', muscle: 'full-body', met: 8.3, difficulty: 'medio', equipment: 'nenhum', desc: 'Corrida em ritmo moderado, ideal para queima de gordura.' },
    { id: 'e002', name: 'Corrida (12 km/h)', emoji: '&#127939;', category: 'cardio', muscle: 'full-body', met: 11.0, difficulty: 'intenso', equipment: 'nenhum', desc: 'Corrida rapida para alta queima calorica.' },
    { id: 'e003', name: 'Caminhada (5 km/h)', emoji: '&#127939;', category: 'cardio', muscle: 'full-body', met: 3.5, difficulty: 'facil', equipment: 'nenhum', desc: 'Caminhada em ritmo confortavel.' },
    { id: 'e004', name: 'Bike Ergometrica (moderada)', emoji: '&#128692;', category: 'cardio', muscle: 'pernas', met: 8.0, difficulty: 'medio', equipment: 'bike', desc: 'Ciclismo em intensidade moderada.' },
    { id: 'e005', name: 'Bike Ergometrica (intensa)', emoji: '&#128692;', category: 'cardio', muscle: 'pernas', met: 14.0, difficulty: 'intenso', equipment: 'bike', desc: 'Ciclismo em alta intensidade.' },
    { id: 'e006', name: 'Natacao (crawl moderado)', emoji: '&#127944;', category: 'cardio', muscle: 'full-body', met: 8.3, difficulty: 'medio', equipment: 'piscina', desc: 'Natacao em estilo crawl em ritmo moderado.' },
    { id: 'e007', name: 'Pular Corda', emoji: '&#129357;', category: 'cardio', muscle: 'full-body', met: 12.3, difficulty: 'intenso', equipment: 'corda', desc: 'Excelente para queima calorica e coordenacao.' },
    { id: 'e008', name: 'Eliptico (moderado)', emoji: '&#9881;', category: 'cardio', muscle: 'full-body', met: 5.0, difficulty: 'medio', equipment: 'eliptico', desc: 'Cardio de baixo impacto ideal para joelhos.' },
    { id: 'e009', name: 'Remo (moderado)', emoji: '&#127940;', category: 'cardio', muscle: 'full-body', met: 7.0, difficulty: 'medio', equipment: 'remo', desc: 'Exercicio de remo trabalhando costas e pernas.' },
    { id: 'e010', name: 'Danca / Zumba', emoji: '&#128131;', category: 'cardio', muscle: 'full-body', met: 6.5, difficulty: 'medio', equipment: 'nenhum', desc: 'Cardio divertido com musica.' },
    { id: 'e011', name: 'HIIT 20min', emoji: '&#9889;', category: 'cardio', muscle: 'full-body', met: 10.0, difficulty: 'intenso', equipment: 'nenhum', desc: 'Treino intervalado de alta intensidade.' },
    { id: 'e012', name: 'Aerobica de Step', emoji: '&#127939;', category: 'cardio', muscle: 'pernas', met: 8.5, difficulty: 'medio', equipment: 'step', desc: 'Step aerobico com musica.' },

    /* ==================== MUSCULACAO ==================== */
    { id: 'e013', name: 'Supino Reto', emoji: '&#127947;', category: 'musculacao', muscle: 'peito', met: 5.5, difficulty: 'medio', equipment: 'halteres/barra', desc: 'Exercicio basico para peitorais.' },
    { id: 'e014', name: 'Agachamento Livre', emoji: '&#127947;', category: 'musculacao', muscle: 'pernas', met: 6.0, difficulty: 'medio', equipment: 'barra', desc: 'Exercicio rainha para quadriceps e gluteos.' },
    { id: 'e015', name: 'Levantamento Terra', emoji: '&#127947;', category: 'musculacao', muscle: 'full-body', met: 6.0, difficulty: 'avancado', equipment: 'barra', desc: 'Composto para posterior, lombar e full-body.' },
    { id: 'e016', name: 'Puxada Frontal (Lat Pulldown)', emoji: '&#127947;', category: 'musculacao', muscle: 'costas', met: 5.0, difficulty: 'medio', equipment: 'pulley', desc: 'Desenvolve o latissimo do dorso.' },
    { id: 'e017', name: 'Rosca Direta', emoji: '&#127947;', category: 'musculacao', muscle: 'biceps', met: 4.5, difficulty: 'facil', equipment: 'halteres/barra', desc: 'Isolamento de biceps.' },
    { id: 'e018', name: 'Triceps Pulley', emoji: '&#127947;', category: 'musculacao', muscle: 'triceps', met: 4.5, difficulty: 'facil', equipment: 'pulley', desc: 'Isolamento de triceps no cabo.' },
    { id: 'e019', name: 'Desenvolvimento de Ombros', emoji: '&#127947;', category: 'musculacao', muscle: 'ombros', met: 5.0, difficulty: 'medio', equipment: 'halteres/barra', desc: 'Desenvolvimento frontal para deltoides.' },
    { id: 'e020', name: 'Leg Press 45°', emoji: '&#127947;', category: 'musculacao', muscle: 'pernas', met: 5.5, difficulty: 'medio', equipment: 'maquina', desc: 'Trabalho de quadriceps no leg press.' },
    { id: 'e021', name: 'Cadeira Extensora', emoji: '&#127947;', category: 'musculacao', muscle: 'pernas', met: 4.0, difficulty: 'facil', equipment: 'maquina', desc: 'Isolamento de quadriceps.' },
    { id: 'e022', name: 'Mesa Flexora', emoji: '&#127947;', category: 'musculacao', muscle: 'pernas', met: 4.0, difficulty: 'facil', equipment: 'maquina', desc: 'Isolamento de isquiotibiais.' },
    { id: 'e023', name: 'Elevacao de Panturrilhas', emoji: '&#127947;', category: 'musculacao', muscle: 'panturrilhas', met: 3.5, difficulty: 'facil', equipment: 'livre', desc: 'Fortalece as panturrilhas.' },
    { id: 'e024', name: 'Remada Baixa', emoji: '&#127947;', category: 'musculacao', muscle: 'costas', met: 5.5, difficulty: 'medio', equipment: 'pulley', desc: 'Remada no cabo para espessura de costas.' },
    { id: 'e025', name: 'Crucifixo Halter', emoji: '&#127947;', category: 'musculacao', muscle: 'peito', met: 4.5, difficulty: 'medio', equipment: 'halteres', desc: 'Isolamento de peito com halteres.' },
    { id: 'e026', name: 'Abdominais Crunch', emoji: '&#127947;', category: 'musculacao', muscle: 'abdomen', met: 3.8, difficulty: 'facil', equipment: 'nenhum', desc: 'Exercicio basico para abdomen.' },
    { id: 'e027', name: 'Prancha (Plank)', emoji: '&#127947;', category: 'musculacao', muscle: 'core', met: 4.0, difficulty: 'medio', equipment: 'nenhum', desc: 'Core isometrico para stabilidade.' },
    { id: 'e028', name: 'Afundo (Lunges)', emoji: '&#127947;', category: 'musculacao', muscle: 'pernas', met: 5.0, difficulty: 'medio', equipment: 'nenhum/halteres', desc: 'Excelente para gluteos e quadriceps.' },

    /* ==================== CALISTENIA ==================== */
    { id: 'e029', name: 'Flexao de Braco (Push-up)', emoji: '&#128170;', category: 'calistenia', muscle: 'peito', met: 5.0, difficulty: 'medio', equipment: 'nenhum', desc: 'Classico para peito, triceps e ombros.' },
    { id: 'e030', name: 'Barra Fixa (Pull-up)', emoji: '&#128170;', category: 'calistenia', muscle: 'costas', met: 5.5, difficulty: 'avancado', equipment: 'barra', desc: 'Exercicio de trao para costas e biceps.' },
    { id: 'e031', name: 'Dips (Mergulho)', emoji: '&#128170;', category: 'calistenia', muscle: 'triceps', met: 5.0, difficulty: 'medio', equipment: 'barras paralelas', desc: 'Triceps e peito nas paralelas.' },
    { id: 'e032', name: 'Agachamento (Bodyweight)', emoji: '&#128170;', category: 'calistenia', muscle: 'pernas', met: 4.5, difficulty: 'facil', equipment: 'nenhum', desc: 'Agachamento com o proprio peso.' },
    { id: 'e033', name: 'Burpee', emoji: '&#128170;', category: 'calistenia', muscle: 'full-body', met: 10.0, difficulty: 'intenso', equipment: 'nenhum', desc: 'Exercicio completo de alta intensidade.' },
    { id: 'e034', name: 'Mountain Climber', emoji: '&#128170;', category: 'calistenia', muscle: 'core', met: 8.0, difficulty: 'intenso', equipment: 'nenhum', desc: 'Core e cardio combinados.' },
    { id: 'e035', name: 'Triceps Banco', emoji: '&#128170;', category: 'calistenia', muscle: 'triceps', met: 4.5, difficulty: 'facil', equipment: 'banco/cadeira', desc: 'Triceps usando banco como apoio.' },
    { id: 'e036', name: 'Elevacao de Pernas', emoji: '&#128170;', category: 'calistenia', muscle: 'abdomen', met: 4.0, difficulty: 'medio', equipment: 'nenhum', desc: 'Abdomen inferior com elevacao de pernas.' },

    /* ==================== FUNCIONAL ==================== */
    { id: 'e037', name: 'Kettlebell Swing', emoji: '&#129513;', category: 'funcional', muscle: 'full-body', met: 9.0, difficulty: 'intenso', equipment: 'kettlebell', desc: 'Potencia e queima calorica com kettlebell.' },
    { id: 'e038', name: 'Box Jump', emoji: '&#129513;', category: 'funcional', muscle: 'pernas', met: 8.0, difficulty: 'intenso', equipment: 'box', desc: 'Salto sobre caixa para potencia explosiva.' },
    { id: 'e039', name: 'Battle Ropes', emoji: '&#129513;', category: 'funcional', muscle: 'full-body', met: 9.5, difficulty: 'intenso', equipment: 'cordas', desc: 'Cordas de batalha para full-body e cardio.' },
    { id: 'e040', name: 'Slam Ball', emoji: '&#129513;', category: 'funcional', muscle: 'full-body', met: 8.5, difficulty: 'intenso', equipment: 'medicine ball', desc: 'Arremesso de bola para potencia.' },
    { id: 'e041', name: 'TRX Remada', emoji: '&#129513;', category: 'funcional', muscle: 'costas', met: 5.5, difficulty: 'medio', equipment: 'trx', desc: 'Remada no TRX para costas.' },
    { id: 'e042', name: 'Farmer Walk', emoji: '&#129513;', category: 'funcional', muscle: 'full-body', met: 6.0, difficulty: 'medio', equipment: 'halteres/kettlebell', desc: 'Caminhada com carga para grip e full-body.' },

    /* ==================== FLEXIBILIDADE / YOGA ==================== */
    { id: 'e043', name: 'Yoga (moderado)', emoji: '&#129506;', category: 'flexibilidade', muscle: 'full-body', met: 3.0, difficulty: 'facil', equipment: 'tapete', desc: 'Flexibilidade e equilibrio mental.' },
    { id: 'e044', name: 'Pilates', emoji: '&#129506;', category: 'flexibilidade', muscle: 'core', met: 3.5, difficulty: 'facil', equipment: 'tapete', desc: 'Fortalecimento de core e postura.' },
    { id: 'e045', name: 'Alongamento Geral', emoji: '&#129506;', category: 'flexibilidade', muscle: 'full-body', met: 2.5, difficulty: 'facil', equipment: 'nenhum', desc: 'Melhora flexibilidade e recuperacao.' },
    { id: 'e046', name: 'Power Yoga', emoji: '&#129506;', category: 'flexibilidade', muscle: 'full-body', met: 4.5, difficulty: 'medio', equipment: 'tapete', desc: 'Yoga dinamico com mais intensidade.' },

    /* ==================== ESPORTES ==================== */
    { id: 'e047', name: 'Futebol (recreativo)', emoji: '&#9917;', category: 'esporte', muscle: 'full-body', met: 7.0, difficulty: 'medio', equipment: 'campo', desc: 'Futebol social ou recreativo.' },
    { id: 'e048', name: 'Tenis', emoji: '&#127934;', category: 'esporte', muscle: 'full-body', met: 7.3, difficulty: 'medio', equipment: 'quadra', desc: 'Tenis simples ou duplas.' },
    { id: 'e049', name: 'Basquete', emoji: '&#127944;', category: 'esporte', muscle: 'full-body', met: 8.0, difficulty: 'intenso', equipment: 'quadra', desc: 'Basquete recreativo ou competitivo.' },
    { id: 'e050', name: 'Vôlei', emoji: '&#127952;', category: 'esporte', muscle: 'full-body', met: 4.0, difficulty: 'medio', equipment: 'quadra', desc: 'Volei de quadra ou praia.' },
    { id: 'e051', name: 'Natacao (borboleta)', emoji: '&#127944;', category: 'esporte', muscle: 'full-body', met: 13.8, difficulty: 'intenso', equipment: 'piscina', desc: 'Estilo mais intenso da natacao.' },
    { id: 'e052', name: 'Ciclismo (exterior, 20km/h)', emoji: '&#128690;', category: 'esporte', muscle: 'pernas', met: 8.0, difficulty: 'medio', equipment: 'bicicleta', desc: 'Ciclismo em estrada em ritmo moderado.' },
    { id: 'e053', name: 'Corrida de Trilha', emoji: '&#127939;', category: 'esporte', muscle: 'full-body', met: 9.0, difficulty: 'intenso', equipment: 'trilha', desc: 'Corrida em terreno irregular, mais intenso.' },

    /* ==================== DOMÉSTICO / LEVE ==================== */
    { id: 'e054', name: 'Caminhada Leve (3 km/h)', emoji: '&#128694;', category: 'leve', muscle: 'pernas', met: 2.8, difficulty: 'facil', equipment: 'nenhum', desc: 'Caminhada tranquila.' },
    { id: 'e055', name: 'Subir Escadas', emoji: '&#128694;', category: 'leve', muscle: 'pernas', met: 8.0, difficulty: 'medio', equipment: 'nenhum', desc: 'Subir escadas vigorosamente.' },
    { id: 'e056', name: 'Faxina/Limpeza', emoji: '&#129529;', category: 'leve', muscle: 'full-body', met: 3.5, difficulty: 'facil', equipment: 'nenhum', desc: 'Atividade domestica de limpeza.' },
    { id: 'e057', name: 'Jardinagem', emoji: '&#127807;', category: 'leve', muscle: 'full-body', met: 3.5, difficulty: 'facil', equipment: 'nenhum', desc: 'Cuidar do jardim ou horta.' },

    /* ==================== LUTAS ==================== */
    { id: 'e058', name: 'Muay Thai', emoji: '&#129354;', category: 'luta', muscle: 'full-body', met: 10.0, difficulty: 'intenso', equipment: 'saco/luvas', desc: 'Arte marcial tailandesa de alta intensidade.' },
    { id: 'e059', name: 'Jiu-Jitsu', emoji: '&#129354;', category: 'luta', muscle: 'full-body', met: 7.0, difficulty: 'intenso', equipment: 'kimono', desc: 'Arte marcial de solo e finalizacoes.' },
    { id: 'e060', name: 'Boxe (treino)', emoji: '&#129354;', category: 'luta', muscle: 'full-body', met: 9.0, difficulty: 'intenso', equipment: 'luvas', desc: 'Treino de boxe com saco ou sparring.' },
    { id: 'e061', name: 'Capoeira', emoji: '&#129354;', category: 'luta', muscle: 'full-body', met: 7.0, difficulty: 'medio', equipment: 'nenhum', desc: 'Arte marcial brasileira com musica.' },
    { id: 'e062', name: 'Crossfit (WOD)', emoji: '&#9889;', category: 'funcional', muscle: 'full-body', met: 9.5, difficulty: 'intenso', equipment: 'academia', desc: 'Treino funcional de alta intensidade (WOD).' }
  ],

  getAll() { return this.exercises; },
  getById(id) { return this.exercises.find(e => e.id === id) || null; },
  getByCategory(cat) { return this.exercises.filter(e => e.category === cat); },
  getCategories() { return ['cardio', 'musculacao', 'calistenia', 'funcional', 'flexibilidade', 'esporte', 'leve', 'luta']; },
  getCategoryLabel(cat) {
    const l = { cardio: 'Cardio', musculacao: 'Musculacao', calistenia: 'Calistenia', funcional: 'Funcional', flexibilidade: 'Flexibilidade/Yoga', esporte: 'Esportes', leve: 'Atividade Leve', luta: 'Artes Marciais' };
    return l[cat] || cat;
  },

  calcCalories(exerciseId, weightKg, durationMin) {
    const ex = this.getById(exerciseId);
    if (!ex) return 0;
    return Math.round((ex.met * weightKg * durationMin) / 60);
  },

  getTotalCount() { return this.exercises.length; }
};
