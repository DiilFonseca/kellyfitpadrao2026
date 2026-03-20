/* ============================================================
   KellyFit Padrao 2026 — Badges Database (30 badges)
   ============================================================ */
const BadgesDB = {
  badges: [
    // Primeiro passos
    { id: 'b001', name: 'Primeiro Passo', emoji: '&#127919;', desc: 'Complete seu primeiro dia de registro', xp: 50, category: 'inicio', condition: 'first_day' },
    { id: 'b002', name: 'Quiz Completo', emoji: '&#128218;', desc: 'Finalizou o quiz de anamnese', xp: 100, category: 'inicio', condition: 'quiz_done' },
    { id: 'b003', name: 'Hidratado!', emoji: '&#128167;', desc: 'Atingiu a meta de agua pela primeira vez', xp: 75, category: 'agua', condition: 'water_goal_once' },
    { id: 'b004', name: 'Nutricao em Dia', emoji: '&#127869;', desc: 'Registrou todas as refeicoes do dia', xp: 100, category: 'nutricao', condition: 'all_meals_logged' },
    { id: 'b005', name: 'Primeiro Treino', emoji: '&#127947;', desc: 'Registrou seu primeiro exercicio', xp: 100, category: 'exercicio', condition: 'first_exercise' },

    // Streaks
    { id: 'b006', name: 'Streak 3 Dias', emoji: '&#128293;', desc: '3 dias consecutivos usando o app', xp: 150, category: 'streak', condition: 'streak_3' },
    { id: 'b007', name: 'Streak 7 Dias', emoji: '&#128293;', desc: '7 dias consecutivos — 1 semana completa!', xp: 300, category: 'streak', condition: 'streak_7' },
    { id: 'b008', name: 'Streak 14 Dias', emoji: '&#129517;', desc: '14 dias seguidos — 2 semanas!', xp: 600, category: 'streak', condition: 'streak_14' },
    { id: 'b009', name: 'Streak 30 Dias', emoji: '&#127942;', desc: '30 dias consecutivos — campiao!', xp: 1500, category: 'streak', condition: 'streak_30' },

    // Agua
    { id: 'b010', name: 'Semana Hidratada', emoji: '&#128167;', desc: 'Meta de agua atingida 7 dias na semana', xp: 350, category: 'agua', condition: 'water_7days' },
    { id: 'b011', name: 'Mestre da Agua', emoji: '&#129524;', desc: 'Meta de agua atingida 30 dias no mes', xp: 1000, category: 'agua', condition: 'water_30days' },

    // Nutricao
    { id: 'b012', name: 'Calorias Controladas', emoji: '&#127869;', desc: 'Ficou dentro da meta calorica 7 dias seguidos', xp: 400, category: 'nutricao', condition: 'calorie_goal_7days' },
    { id: 'b013', name: 'Proteina Ideal', emoji: '&#129371;', desc: 'Atingiu a meta de proteina 5 vezes', xp: 300, category: 'nutricao', condition: 'protein_goal_5days' },
    { id: 'b014', name: 'Planejador Mestre', emoji: '&#128197;', desc: 'Usou o planejador semanal por 2 semanas', xp: 400, category: 'nutricao', condition: 'planner_2weeks' },

    // Exercicio
    { id: 'b015', name: 'Queimador Calorias', emoji: '&#128293;', desc: 'Queimou mais de 300kcal em um treino', xp: 200, category: 'exercicio', condition: 'burn_300kcal' },
    { id: 'b016', name: 'Atleta da Semana', emoji: '&#127942;', desc: 'Treinou 5 vezes em uma semana', xp: 500, category: 'exercicio', condition: 'train_5_week' },
    { id: 'b017', name: 'Ironman', emoji: '&#127939;', desc: 'Acumulou 1000 minutos de exercicio', xp: 1000, category: 'exercicio', condition: 'total_1000min' },

    // Peso / Progresso
    { id: 'b018', name: 'Primeiro Registro', emoji: '&#9878;', desc: 'Registrou o peso pela primeira vez', xp: 50, category: 'progresso', condition: 'first_weight' },
    { id: 'b019', name: 'Constante', emoji: '&#128200;', desc: 'Registrou o peso 10 vezes', xp: 200, category: 'progresso', condition: 'weight_10times' },
    { id: 'b020', name: 'Progresso Real', emoji: '&#128200;', desc: 'Perdeu ou ganhou 1kg em direcao ao objetivo', xp: 500, category: 'progresso', condition: 'weight_progress_1kg' },
    { id: 'b021', name: 'Transformacao', emoji: '&#9654;', desc: 'Atingiu o peso alvo!', xp: 2000, category: 'progresso', condition: 'weight_goal_reached' },

    // Habitos
    { id: 'b022', name: 'Habito Formado', emoji: '&#9989;', desc: 'Completou um habito 21 dias seguidos', xp: 700, category: 'habito', condition: 'habit_21days' },
    { id: 'b023', name: 'Multi-Habito', emoji: '&#129531;', desc: 'Completou 3 habitos em um dia', xp: 200, category: 'habito', condition: 'habits_3_oneday' },
    { id: 'b024', name: 'Disciplina Total', emoji: '&#127942;', desc: 'Completou todos os habitos por 7 dias', xp: 800, category: 'habito', condition: 'all_habits_7days' },

    // Gamificacao
    { id: 'b025', name: 'Level 5', emoji: '&#128081;', desc: 'Alcancou o nivel 5', xp: 0, category: 'nivel', condition: 'level_5' },
    { id: 'b026', name: 'Level 10', emoji: '&#128081;', desc: 'Alcancou o nivel 10', xp: 0, category: 'nivel', condition: 'level_10' },
    { id: 'b027', name: 'Level 15', emoji: '&#128081;', desc: 'Alcancou o nivel maximo — Mestre!', xp: 0, category: 'nivel', condition: 'level_15' },

    // Especiais
    { id: 'b028', name: 'Madrugador', emoji: '&#127749;', desc: 'Registrou uma refeicao antes das 7h', xp: 100, category: 'especial', condition: 'early_meal' },
    { id: 'b029', name: 'Explorador', emoji: '&#128270;', desc: 'Visualizou receitas de 20 refeicoes diferentes', xp: 200, category: 'especial', condition: 'recipes_20' },
    { id: 'b030', name: 'Lista de Compras', emoji: '&#128722;', desc: 'Gerou e completou uma lista de compras', xp: 150, category: 'especial', condition: 'shopping_complete' }
  ],

  getAll() { return this.badges; },
  getById(id) { return this.badges.find(b => b.id === id) || null; },
  getByCategory(cat) { return this.badges.filter(b => b.category === cat); },
  getTotalXP() { return this.badges.reduce((sum, b) => sum + b.xp, 0); },
  getTotalCount() { return this.badges.length; }
};
