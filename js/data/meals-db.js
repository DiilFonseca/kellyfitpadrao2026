/* ============================================================
   KellyFit Padrao 2026 — Meals Database (122 refeicoes)
   Valores nutricionais baseados na Tabela TACO (UNICAMP) e USDA
   ============================================================ */
const MealsDB = {
  meals: [
    /* ==================== CAFE DA MANHA ==================== */
    {
      id: 'm001', name: 'Omelete de Espinafre', emoji: '&#127859;',
      category: 'cafe', tags: ['vegetariano', 'low-carb', 'highprotein'],
      calories: 320, protein: 22, carbs: 8, fat: 22, fiber: 2,
      servingSize: 200, servingUnit: 'g',
      prepTime: 10, difficulty: 'facil',
      ingredients: ['3 ovos', '50g espinafre', '1 colher azeite', 'sal e pimenta', '30g queijo ralado'],
      steps: ['Bata os ovos com sal e pimenta', 'Refogue o espinafre no azeite por 2min', 'Adicione os ovos e cozinhe em fogo medio', 'Adicione o queijo, dobre a omelete e sirva'],
      dietTypes: ['regular', 'lowcarb', 'vegetarian']
    },
    {
      id: 'm002', name: 'Iogurte Grego com Granola e Frutas', emoji: '&#129386;',
      category: 'cafe', tags: ['vegetariano'],
      calories: 380, protein: 18, carbs: 45, fat: 12, fiber: 4,
      servingSize: 300, servingUnit: 'g',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['200g iogurte grego natural', '40g granola artesanal', '100g morango', '1 colher mel'],
      steps: ['Coloque o iogurte em uma tigela', 'Adicione a granola por cima', 'Corte os morangos e adicione', 'Finalize com mel'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm003', name: 'Mingau de Aveia com Banana', emoji: '&#127843;',
      category: 'cafe', tags: ['vegetariano', 'vegan'],
      calories: 290, protein: 8, carbs: 52, fat: 5, fiber: 6,
      servingSize: 250, servingUnit: 'ml',
      prepTime: 8, difficulty: 'facil',
      ingredients: ['60g aveia em flocos', '200ml leite vegetal', '1 banana madura', '1 colher chia', 'canela a gosto'],
      steps: ['Misture a aveia no leite vegetal', 'Cozinhe em fogo baixo por 5min mexendo', 'Amasse a banana e misture', 'Adicione chia e canela'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm004', name: 'Panqueca de Proteina', emoji: '&#129386;',
      category: 'cafe', tags: ['highprotein', 'vegetariano'],
      calories: 420, protein: 35, carbs: 30, fat: 14, fiber: 3,
      servingSize: 3, servingUnit: 'unidades',
      prepTime: 15, difficulty: 'medio',
      ingredients: ['2 ovos', '1 scoop whey baunilha (30g)', '50g aveia', '1/2 banana', '1 colher fermento', '1 fio azeite'],
      steps: ['Bata ovos, banana e whey no liquidificador', 'Adicione a aveia e fermento', 'Unte frigideira com azeite', 'Cozinhe cada panqueca 2-3min de cada lado'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm005', name: 'Torrada Integral com Abacate', emoji: '&#129361;',
      category: 'cafe', tags: ['vegetariano', 'vegan'],
      calories: 280, protein: 7, carbs: 28, fat: 16, fiber: 8,
      servingSize: 2, servingUnit: 'fatias',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['2 fatias pao integral', '1/2 abacate', 'suco de limao', 'sal, pimenta e chia'],
      steps: ['Torre o pao integral', 'Amasse o abacate com limao, sal e pimenta', 'Espalhe no pao', 'Finalize com chia e pimenta calabresa'],
      dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean']
    },
    {
      id: 'm006', name: 'Smoothie Verde Proteico', emoji: '&#129749;',
      category: 'cafe', tags: ['vegetariano', 'highprotein'],
      calories: 310, protein: 28, carbs: 30, fat: 7, fiber: 5,
      servingSize: 400, servingUnit: 'ml',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['1 scoop whey (30g)', '200ml leite desnatado', '1/2 banana congelada', '30g espinafre', '1 colher pasta amendoim', '5 cubos gelo'],
      steps: ['Adicione todos os ingredientes no liquidificador', 'Bata por 1 minuto', 'Sirva imediatamente'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm007', name: 'Pao Frances com Ovo e Queijo', emoji: '&#127859;',
      category: 'cafe', tags: ['vegetariano'],
      calories: 350, protein: 20, carbs: 35, fat: 14, fiber: 2,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 8, difficulty: 'facil',
      ingredients: ['1 pao frances', '2 ovos mexidos', '30g queijo mussarela', '1 tomate fatiado', '1 fio azeite'],
      steps: ['Faca os ovos mexidos no azeite', 'Abra o pao ao meio', 'Adicione o queijo, o ovo e o tomate', 'Leve ao forno por 3min se desejar'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm008', name: 'Acai Bowl Proteico', emoji: '&#127815;',
      category: 'cafe', tags: ['vegetariano'],
      calories: 460, protein: 14, carbs: 65, fat: 14, fiber: 8,
      servingSize: 400, servingUnit: 'g',
      prepTime: 10, difficulty: 'facil',
      ingredients: ['200g acai sem acucar', '1 banana congelada', '1 scoop whey (30g)', '1 colher granola', '50g morango', '20g coco ralado'],
      steps: ['Bata o acai, banana e whey', 'Coloque em uma tigela', 'Cubra com granola, morango e coco', 'Sirva gelado'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm009', name: 'Tapioca com Frango e Queijo', emoji: '&#129385;',
      category: 'cafe', tags: ['sem-gluten'],
      calories: 380, protein: 30, carbs: 42, fat: 10, fiber: 1,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 12, difficulty: 'facil',
      ingredients: ['3 colheres goma de tapioca', '80g frango desfiado temperado', '30g queijo mussarela', '1 tomate cereja'],
      steps: ['Espalhe a goma na frigideira antiaderente', 'Aqueça em fogo medio ate firmar', 'Adicione o frango e o queijo', 'Dobre a tapioca e sirva'],
      dietTypes: ['regular']
    },
    {
      id: 'm010', name: 'Crepioca Proteica', emoji: '&#127859;',
      category: 'cafe', tags: ['sem-gluten', 'vegetariano'],
      calories: 290, protein: 24, carbs: 20, fat: 12, fiber: 1,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 10, difficulty: 'facil',
      ingredients: ['2 ovos', '2 colheres goma tapioca', '30g whey', '1 colher leite', 'recheio a gosto'],
      steps: ['Bata ovos, tapioca, whey e leite', 'Despeje na frigideira antiaderente aquecida', 'Cozinhe dos dois lados ate dourar', 'Recheie e sirva'],
      dietTypes: ['regular', 'vegetarian']
    },

    /* ==================== ALMOCO ==================== */
    {
      id: 'm011', name: 'Bowl de Frango Grelhado com Arroz e Legumes', emoji: '&#127809;',
      category: 'almoco', tags: ['highprotein'],
      calories: 520, protein: 42, carbs: 52, fat: 12, fiber: 6,
      servingSize: 400, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['150g file de frango', '120g arroz integral cozido', '100g brócolis no vapor', '50g cenoura', '1 colher azeite', 'alho e ervas'],
      steps: ['Tempere o frango com sal, alho e ervas', 'Grelhe em frigideira antiaderente 6min cada lado', 'Monte o bowl com arroz, frango e legumes', 'Regue com azeite'],
      dietTypes: ['regular', 'mediterranean']
    },
    {
      id: 'm012', name: 'Peixe Assado com Batata Doce e Salada', emoji: '&#129421;',
      category: 'almoco', tags: ['sem-gluten', 'highprotein'],
      calories: 480, protein: 38, carbs: 45, fat: 10, fiber: 7,
      servingSize: 450, servingUnit: 'g',
      prepTime: 30, difficulty: 'medio',
      ingredients: ['180g file tilapia', '150g batata doce', '100g alface', '1 tomate', '1/2 pepino', '1 colher azeite', 'limaõ e ervas'],
      steps: ['Asse a batata doce fatiada a 200°C por 25min', 'Tempere o peixe com limao e ervas', 'Asse o peixe a 200°C por 15min', 'Monte a salada e sirva'],
      dietTypes: ['regular', 'mediterranean']
    },
    {
      id: 'm013', name: 'Frango Xadrez com Arroz Integral', emoji: '&#127831;',
      category: 'almoco', tags: ['highprotein'],
      calories: 490, protein: 38, carbs: 48, fat: 14, fiber: 4,
      servingSize: 400, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['150g peito frango cubo', '120g arroz integral', '1 pimentao vermelho', '1 pimentao amarelo', '1 cenoura', '2 colheres shoyu light', '1 colher gergelim'],
      steps: ['Cozinhe o arroz integral', 'Refogue o frango no azeite ate dourar', 'Adicione os legumes em cubos e refogue 5min', 'Tempere com shoyu, adicione gergelim e sirva'],
      dietTypes: ['regular']
    },
    {
      id: 'm014', name: 'Carne Moida com Legumes e Puro', emoji: '&#129363;',
      category: 'almoco', tags: ['highprotein'],
      calories: 510, protein: 35, carbs: 42, fat: 18, fiber: 5,
      servingSize: 420, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['150g carne moida patinho', '1 cenoura', '1 abobrinha', '1 tomate', '150g pure batata', 'temperos naturais'],
      steps: ['Refogue a carne moida com alho e cebola', 'Adicione os legumes em cubos pequenos', 'Cozinhe ate os legumes ficarem macios', 'Sirva com o pure de batata'],
      dietTypes: ['regular']
    },
    {
      id: 'm015', name: 'Salada de Grao de Bico e Vegetais', emoji: '&#129361;',
      category: 'almoco', tags: ['vegetariano', 'vegan'],
      calories: 390, protein: 18, carbs: 52, fat: 12, fiber: 12,
      servingSize: 350, servingUnit: 'g',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['200g grao de bico cozido', '1 pepino', '2 tomates', '1/2 cebola roxa', '30g azeitona', '2 colheres azeite', 'limaõ e sumac'],
      steps: ['Escorra e lave o grao de bico', 'Corte todos os vegetais em cubos', 'Misture com o grao de bico', 'Tempere com azeite, limao e sumac'],
      dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean']
    },
    {
      id: 'm016', name: 'Macarrao Integral ao Molho de Frango', emoji: '&#127836;',
      category: 'almoco', tags: ['highprotein'],
      calories: 530, protein: 36, carbs: 62, fat: 12, fiber: 8,
      servingSize: 400, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['100g macarrao integral', '120g frango', '1 xicara molho tomate caseiro', '1 colher parmesao', 'manjericao'],
      steps: ['Cozinhe o macarrao al dente', 'Cozinhe e desfie o frango', 'Misture ao molho de tomate e aqueca', 'Sirva sobre o macarrao com parmesao'],
      dietTypes: ['regular', 'mediterranean']
    },
    {
      id: 'm017', name: 'Salmao Grelhado com Quinoa', emoji: '&#129421;',
      category: 'almoco', tags: ['highprotein', 'sem-gluten'],
      calories: 520, protein: 42, carbs: 30, fat: 22, fiber: 5,
      servingSize: 380, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['180g file salmao', '120g quinoa cozida', '100g aspargos', '1 colher azeite', 'limao siciliano', 'alecrim'],
      steps: ['Cozinhe a quinoa', 'Tempere o salmao com sal, limao e alecrim', 'Grelhe em frigideira 4min cada lado', 'Salteie os aspargos e sirva com a quinoa'],
      dietTypes: ['regular', 'mediterranean']
    },
    {
      id: 'm018', name: 'Feijoada Light', emoji: '&#129379;',
      category: 'almoco', tags: [],
      calories: 450, protein: 30, carbs: 48, fat: 12, fiber: 10,
      servingSize: 380, servingUnit: 'g',
      prepTime: 40, difficulty: 'avancado',
      ingredients: ['150g feijao preto cozido', '100g lombo defumado light', '60g arroz', '50g couve refogada', '1 laranja', 'farofa light'],
      steps: ['Cozinhe o feijao com lombo e temperos', 'Cozinhe o arroz', 'Refogue a couve com alho no azeite', 'Monte o prato com farofa e laranja'],
      dietTypes: ['regular']
    },
    {
      id: 'm019', name: 'Strogonoff de Frango Light', emoji: '&#127859;',
      category: 'almoco', tags: ['highprotein'],
      calories: 460, protein: 38, carbs: 40, fat: 14, fiber: 3,
      servingSize: 380, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['180g frango em tiras', '3 colheres creme de leite light', '1 lata cogumelos', '1 cebola', '1 colher extrato tomate', '100g arroz'],
      steps: ['Refogue a cebola', 'Adicione o frango e doure', 'Junte cogumelos, extrato de tomate e creme de leite', 'Cozinhe 5min e sirva com arroz'],
      dietTypes: ['regular']
    },
    {
      id: 'm020', name: 'Bowl Vegetariano Buddha', emoji: '&#127793;',
      category: 'almoco', tags: ['vegetariano', 'vegan'],
      calories: 420, protein: 16, carbs: 58, fat: 14, fiber: 12,
      servingSize: 400, servingUnit: 'g',
      prepTime: 20, difficulty: 'facil',
      ingredients: ['100g grao de bico', '80g quinoa', '100g abobora assada', '50g espinafre', '20g tahine', '1 colher azeite', 'pimenta curcuma'],
      steps: ['Cozinhe a quinoa e o grao de bico', 'Asse a abobora temperada', 'Monte o bowl com todos os ingredientes', 'Finalize com tahine diluido em limao'],
      dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean']
    },

    /* ==================== JANTAR ==================== */
    {
      id: 'm021', name: 'Sopa de Legumes com Frango', emoji: '&#129379;',
      category: 'jantar', tags: ['sem-gluten', 'highprotein'],
      calories: 320, protein: 28, carbs: 28, fat: 8, fiber: 6,
      servingSize: 400, servingUnit: 'ml',
      prepTime: 30, difficulty: 'medio',
      ingredients: ['150g frango', '1 cenoura', '2 batatas', '1 chuchu', '1 abobrinha', 'caldo caseiro', 'ervas frescas'],
      steps: ['Cozinhe o frango e desfie', 'Cozinhe os legumes no caldo', 'Adicione o frango desfiado', 'Finalize com ervas frescas'],
      dietTypes: ['regular']
    },
    {
      id: 'm022', name: 'Omelete de Atum com Salada', emoji: '&#129421;',
      category: 'jantar', tags: ['sem-gluten', 'low-carb', 'highprotein'],
      calories: 340, protein: 36, carbs: 6, fat: 18, fiber: 3,
      servingSize: 300, servingUnit: 'g',
      prepTime: 12, difficulty: 'facil',
      ingredients: ['3 ovos', '100g atum em agua', '1 tomate', '100g alface', '1 colher azeite', 'temperos'],
      steps: ['Bata os ovos', 'Misture o atum escorrido', 'Cozinhe a omelete em azeite', 'Sirva com salada temperada'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm023', name: 'Peito de Peru com Legumes Assados', emoji: '&#129369;',
      category: 'jantar', tags: ['sem-gluten', 'low-carb', 'highprotein'],
      calories: 310, protein: 35, carbs: 18, fat: 10, fiber: 5,
      servingSize: 380, servingUnit: 'g',
      prepTime: 35, difficulty: 'medio',
      ingredients: ['200g peito de peru', '1 abobrinha', '1 berinjela', '1 pimentao', '2 colheres azeite', 'alho e ervas'],
      steps: ['Corte os legumes e tempere com azeite e alho', 'Tempere o peru com ervas', 'Asse tudo a 200°C por 30min', 'Sirva com limao'],
      dietTypes: ['regular', 'lowcarb', 'mediterranean']
    },
    {
      id: 'm024', name: 'Carne Assada com Pure de Batata Doce', emoji: '&#129363;',
      category: 'jantar', tags: ['sem-gluten'],
      calories: 450, protein: 32, carbs: 40, fat: 16, fiber: 5,
      servingSize: 400, servingUnit: 'g',
      prepTime: 40, difficulty: 'avancado',
      ingredients: ['160g carne bovina magra', '200g batata doce', '1 colher manteiga light', '100ml leite desnatado', 'alho e cebola'],
      steps: ['Marine a carne com alho e cebola 30min', 'Asse a 180°C por 25-30min', 'Cozinhe a batata doce e amasse com leite e manteiga', 'Sirva com salada verde'],
      dietTypes: ['regular']
    },
    {
      id: 'm025', name: 'Wrap de Frango e Vegetais', emoji: '&#127822;',
      category: 'jantar', tags: ['highprotein'],
      calories: 380, protein: 30, carbs: 38, fat: 12, fiber: 6,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['1 tortilha integral', '120g frango grelhado fatiado', '30g cream cheese light', '50g alface', '1 tomate', '1/4 abacate'],
      steps: ['Aqueça a tortilha', 'Espalhe o cream cheese', 'Adicione o frango e os vegetais', 'Enrole firmemente e corte ao meio'],
      dietTypes: ['regular']
    },
    {
      id: 'm026', name: 'Curry de Legumes com Leite de Coco', emoji: '&#127802;',
      category: 'jantar', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 360, protein: 12, carbs: 50, fat: 14, fiber: 8,
      servingSize: 350, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['200g grao de bico', '1 batata doce', '1 cebola', '2 colheres pasta curry', '200ml leite de coco', '1 tomate', 'coentro'],
      steps: ['Refogue a cebola e o curry', 'Adicione batata doce em cubos e o grao de bico', 'Despeje o leite de coco e cozinhe 15min', 'Finalize com tomate e coentro'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm027', name: 'Atum com Batata Doce e Brocolis', emoji: '&#129421;',
      category: 'jantar', tags: ['sem-gluten', 'low-carb', 'highprotein'],
      calories: 380, protein: 38, carbs: 32, fat: 10, fiber: 6,
      servingSize: 380, servingUnit: 'g',
      prepTime: 20, difficulty: 'facil',
      ingredients: ['150g atum em agua', '150g batata doce', '100g brocolis', '1 colher azeite', 'sal e limaõ'],
      steps: ['Cozinhe a batata doce e o brocolis no vapor', 'Escorra o atum', 'Monte o prato e regue com azeite e limaõ'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm028', name: 'Frango ao Molho de Mostarda com Iogurte', emoji: '&#127869;',
      category: 'jantar', tags: ['sem-gluten', 'highprotein'],
      calories: 340, protein: 40, carbs: 10, fat: 14, fiber: 1,
      servingSize: 300, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['200g file frango', '2 colheres mostarda dijon', '100g iogurte grego', '1 dente alho', 'tomilho'],
      steps: ['Misture mostarda, iogurte, alho e tomilho', 'Marine o frango por 15min', 'Grelhe 6min cada lado', 'Sirva com a reducao do molho'],
      dietTypes: ['regular', 'lowcarb']
    },

    /* ==================== LANCHE ==================== */
    {
      id: 'm029', name: 'Shake Proteico de Chocolate', emoji: '&#127849;',
      category: 'lanche', tags: ['vegetariano', 'highprotein'],
      calories: 280, protein: 30, carbs: 22, fat: 8, fiber: 3,
      servingSize: 350, servingUnit: 'ml',
      prepTime: 3, difficulty: 'facil',
      ingredients: ['1 scoop whey chocolate (30g)', '200ml leite desnatado', '1/2 banana', '1 colher cacau em po', '5 cubos gelo'],
      steps: ['Bata todos os ingredientes no liquidificador', 'Sirva imediatamente bem gelado'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm030', name: 'Maçã com Pasta de Amendoim', emoji: '&#127822;',
      category: 'lanche', tags: ['vegetariano', 'vegan'],
      calories: 220, protein: 6, carbs: 28, fat: 10, fiber: 5,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 2, difficulty: 'facil',
      ingredients: ['1 maca media', '2 colheres pasta amendoim natural', 'canela opcional'],
      steps: ['Fatie a maca', 'Sirva com pasta de amendoim para mergulhar'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm031', name: 'Mix de Castanhas e Frutas Secas', emoji: '&#129385;',
      category: 'lanche', tags: ['vegetariano', 'vegan'],
      calories: 180, protein: 5, carbs: 14, fat: 12, fiber: 3,
      servingSize: 40, servingUnit: 'g',
      prepTime: 1, difficulty: 'facil',
      ingredients: ['10g castanha do para', '10g amendoa', '10g castanha de caju', '5g damasco seco', '5g uva passa'],
      steps: ['Porcione em pote pequeno', 'Leve como lanche'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm032', name: 'Biscoito de Arroz com Ricota', emoji: '&#129386;',
      category: 'lanche', tags: ['vegetariano', 'sem-gluten'],
      calories: 160, protein: 10, carbs: 18, fat: 5, fiber: 1,
      servingSize: 4, servingUnit: 'unidades',
      prepTime: 2, difficulty: 'facil',
      ingredients: ['4 biscoitos arroz', '60g ricota', 'orégano', 'pimenta do reino'],
      steps: ['Misture a ricota com temperos', 'Espalhe nos biscoitos'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm033', name: 'Energy Ball de Aveia e Chocolate', emoji: '&#9679;',
      category: 'lanche', tags: ['vegetariano', 'vegan'],
      calories: 190, protein: 6, carbs: 24, fat: 8, fiber: 4,
      servingSize: 3, servingUnit: 'bolinhas',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['80g aveia', '2 colheres mel', '2 colheres pasta amendoim', '1 colher cacau', '1 colher chia'],
      steps: ['Misture todos os ingredientes', 'Forme bolinhas e leve a geladeira por 30min', 'Conserve por ate 5 dias na geladeira'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm034', name: 'Vitamina de Morango com Leite', emoji: '&#127827;',
      category: 'lanche', tags: ['vegetariano'],
      calories: 200, protein: 8, carbs: 32, fat: 4, fiber: 3,
      servingSize: 300, servingUnit: 'ml',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['150g morango fresco', '200ml leite desnatado', '1 colher mel', '4 cubos gelo'],
      steps: ['Bata tudo no liquidificador', 'Sirva gelado'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm035', name: 'Queijo Coalho Grelhado com Mel', emoji: '&#129386;',
      category: 'lanche', tags: ['vegetariano', 'sem-gluten'],
      calories: 240, protein: 14, carbs: 18, fat: 12, fiber: 0,
      servingSize: 80, servingUnit: 'g',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['80g queijo coalho', '1 colher mel', 'orégano'],
      steps: ['Grelhe o queijo 2min cada lado', 'Regue com mel e orégano'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm036', name: 'Iogurte com Chia e Kiwi', emoji: '&#129748;',
      category: 'lanche', tags: ['vegetariano'],
      calories: 170, protein: 10, carbs: 22, fat: 4, fiber: 6,
      servingSize: 200, servingUnit: 'g',
      prepTime: 3, difficulty: 'facil',
      ingredients: ['150g iogurte natural desnatado', '1 kiwi', '1 colher chia', '1 colher mel'],
      steps: ['Coloque o iogurte em uma tigela', 'Adicione o kiwi fatiado', 'Salpique a chia e regue com mel'],
      dietTypes: ['regular', 'vegetarian']
    },

    /* ==================== PRE-TREINO ==================== */
    {
      id: 'm037', name: 'Banana com Pasta de Amendoim Pre-Treino', emoji: '&#127831;',
      category: 'pre-treino', tags: ['vegetariano', 'vegan'],
      calories: 250, protein: 8, carbs: 35, fat: 10, fiber: 4,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 2, difficulty: 'facil',
      ingredients: ['1 banana grande', '2 colheres pasta amendoim natural'],
      steps: ['Fatie a banana', 'Sirva com pasta de amendoim'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm038', name: 'Tapioca com Mel e Banana', emoji: '&#129385;',
      category: 'pre-treino', tags: ['sem-gluten', 'vegetariano'],
      calories: 260, protein: 4, carbs: 52, fat: 1, fiber: 2,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 8, difficulty: 'facil',
      ingredients: ['3 colheres goma tapioca', '1 banana', '1 colher mel'],
      steps: ['Prepare a tapioca na frigideira', 'Recheie com banana amassada e mel'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm039', name: 'Cafe Pre-Treino com Aveia', emoji: '&#9749;',
      category: 'pre-treino', tags: ['vegetariano', 'vegan'],
      calories: 220, protein: 8, carbs: 38, fat: 4, fiber: 5,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 5, difficulty: 'facil',
      ingredients: ['200ml cafe preto', '50g aveia em flocos', '1 colher mel', '1 colher cacau'],
      steps: ['Prepare o cafe', 'Misture a aveia com cacau e mel', 'Tome o cafe com o mingau de aveia'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm040', name: 'Torrada com Geleia e Banana', emoji: '&#127829;',
      category: 'pre-treino', tags: ['vegetariano', 'vegan'],
      calories: 240, protein: 5, carbs: 48, fat: 3, fiber: 4,
      servingSize: 2, servingUnit: 'fatias',
      prepTime: 3, difficulty: 'facil',
      ingredients: ['2 fatias pao integral', '2 colheres geleia sem acucar', '1 banana pequena'],
      steps: ['Torre o pao', 'Espalhe a geleia', 'Adicione a banana fatiada'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },

    /* ==================== POS-TREINO ==================== */
    {
      id: 'm041', name: 'Shake Pos-Treino Whey com Dextrose', emoji: '&#127849;',
      category: 'pos-treino', tags: ['vegetariano', 'highprotein'],
      calories: 300, protein: 30, carbs: 42, fat: 2, fiber: 0,
      servingSize: 350, servingUnit: 'ml',
      prepTime: 2, difficulty: 'facil',
      ingredients: ['1 scoop whey (30g)', '20g dextrose', '300ml agua', '5 cubos gelo'],
      steps: ['Misture whey e dextrose na agua gelada', 'Agite bem ou bata com gelo'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm042', name: 'Frango com Batata Doce Pos-Treino', emoji: '&#127823;',
      category: 'pos-treino', tags: ['sem-gluten', 'highprotein'],
      calories: 420, protein: 40, carbs: 48, fat: 8, fiber: 5,
      servingSize: 400, servingUnit: 'g',
      prepTime: 20, difficulty: 'facil',
      ingredients: ['200g peito frango', '200g batata doce', '1 colher azeite', 'sal e ervas'],
      steps: ['Cozinhe a batata doce no vapor', 'Grelhe o frango temperado', 'Monte o prato e sirva'],
      dietTypes: ['regular']
    },
    {
      id: 'm043', name: 'Ovo Cozido com Whey e Fruta', emoji: '&#129370;',
      category: 'pos-treino', tags: ['vegetariano', 'highprotein'],
      calories: 340, protein: 34, carbs: 28, fat: 10, fiber: 2,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 12, difficulty: 'facil',
      ingredients: ['3 ovos cozidos', '1 scoop whey (30g) em agua', '1 maca'],
      steps: ['Cozinhe os ovos 10min', 'Prepare o shake de whey', 'Sirva junto com a maca'],
      dietTypes: ['regular', 'vegetarian']
    },

    /* ==================== REFEICOES ESPECIAIS ==================== */
    {
      id: 'm044', name: 'Frango Teriyaki com Arroz e Brocolis', emoji: '&#127829;',
      category: 'almoco', tags: ['highprotein'],
      calories: 490, protein: 40, carbs: 52, fat: 10, fiber: 4,
      servingSize: 420, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['200g frango', '120g arroz japones', '100g brocolis', '3 colheres molho teriyaki light', '1 colher gergelim'],
      steps: ['Cozinhe o arroz', 'Grelhe o frango com teriyaki', 'Salteie o brocolis com gergelim', 'Monte e regue com o restante do teriyaki'],
      dietTypes: ['regular']
    },
    {
      id: 'm045', name: 'Pizza Fit de Frango', emoji: '&#127829;',
      category: 'jantar', tags: ['highprotein'],
      calories: 440, protein: 36, carbs: 42, fat: 14, fiber: 3,
      servingSize: 2, servingUnit: 'fatias',
      prepTime: 30, difficulty: 'avancado',
      ingredients: ['150g massa de pizza fit (whey+aveia)', '100g frango desfiado', '60g mussarela', '50g tomate cereja', 'orégano'],
      steps: ['Prepare a massa com whey, aveia e ovos', 'Asse a massa 10min a 200°C', 'Adicione o molho, frango e mussarela', 'Asse mais 10min e finalize com orégano'],
      dietTypes: ['regular']
    },
    {
      id: 'm046', name: 'Poke Bowl de Salmao', emoji: '&#129421;',
      category: 'almoco', tags: ['sem-gluten'],
      calories: 510, protein: 36, carbs: 50, fat: 18, fiber: 6,
      servingSize: 400, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['150g salmao fresco', '120g arroz japones', '1/2 abacate', '50g edamame', '1 colher shoyu', '1 colher gergelim', 'cebolinha'],
      steps: ['Cozinhe o arroz', 'Corte o salmao em cubos e marine no shoyu', 'Monte o bowl com arroz, salmao, abacate e edamame', 'Finalize com gergelim e cebolinha'],
      dietTypes: ['regular', 'mediterranean']
    },
    {
      id: 'm047', name: 'Hamburger Fit de Frango', emoji: '&#127828;',
      category: 'jantar', tags: ['highprotein'],
      calories: 420, protein: 38, carbs: 32, fat: 14, fiber: 4,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['200g frango moido', '1 pao integral', '30g queijo', 'alface, tomate, cebola roxa', '1 colher mostarda', 'temperos'],
      steps: ['Molde os hamburgeres e grelhe 5min cada lado', 'Aqueça o pao', 'Monte com os recheios'],
      dietTypes: ['regular']
    },
    {
      id: 'm048', name: 'Risoto de Cogumelos e Frango', emoji: '&#127869;',
      category: 'jantar', tags: ['highprotein'],
      calories: 480, protein: 32, carbs: 58, fat: 12, fiber: 4,
      servingSize: 380, servingUnit: 'g',
      prepTime: 35, difficulty: 'avancado',
      ingredients: ['120g arroz arbóreo', '120g frango', '150g cogumelos', '50ml vinho branco', '1 cebola', '2 colheres parmesao', 'caldo caseiro'],
      steps: ['Refogue cebola e frango', 'Adicione o arroz e o vinho', 'Vá adicionando o caldo aos poucos mexendo sempre', 'Finalize com cogumelos e parmesao'],
      dietTypes: ['regular']
    },

    /* ==================== SUPLEMENTOS / PROTEICOS ==================== */
    {
      id: 'm049', name: 'Ovos Mexidos com Torrada Integral', emoji: '&#129370;',
      category: 'cafe', tags: ['vegetariano', 'highprotein'],
      calories: 300, protein: 20, carbs: 24, fat: 14, fiber: 3,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 8, difficulty: 'facil',
      ingredients: ['3 ovos', '1 colher azeite', '2 fatias pao integral', 'sal e pimenta', 'cebolinhas'],
      steps: ['Bata os ovos com sal e pimenta', 'Cozinhe em fogo baixo mexendo sempre', 'Sirva sobre as torradas com cebolinha'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm050', name: 'Frango com Ora-pro-nobis e Inhame', emoji: '&#127793;',
      category: 'almoco', tags: ['highprotein', 'sem-gluten'],
      calories: 430, protein: 38, carbs: 38, fat: 10, fiber: 7,
      servingSize: 400, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['180g frango', '80g inhame', '60g ora-pro-nobis', '1 tomate', '1 colher azeite', 'alho'],
      steps: ['Cozinhe o inhame no vapor', 'Grelhe o frango temperado', 'Refogue a ora-pro-nobis com alho', 'Monte o prato'],
      dietTypes: ['regular']
    },

    /* ==================== VEGANO ==================== */
    {
      id: 'm051', name: 'Tofu Grelhado com Arroz e Legumes', emoji: '&#127809;',
      category: 'almoco', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 380, protein: 22, carbs: 48, fat: 10, fiber: 8,
      servingSize: 380, servingUnit: 'g',
      prepTime: 20, difficulty: 'medio',
      ingredients: ['180g tofu firme', '120g arroz integral', '100g esparragos', '1 colher shoyu', '1 colher gergelim', 'gengibre'],
      steps: ['Corte e marine o tofu em shoyu e gengibre', 'Grelhe o tofu 4min cada lado', 'Cozinhe o arroz e salteie os esparragos', 'Monte e finalize com gergelim'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm052', name: 'Pasta de Lentilha Vermelha', emoji: '&#129379;',
      category: 'jantar', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 340, protein: 20, carbs: 52, fat: 6, fiber: 14,
      servingSize: 350, servingUnit: 'g',
      prepTime: 25, difficulty: 'facil',
      ingredients: ['200g lentilha vermelha', '1 cebola', '2 tomates', '1 colher curry', '200ml leite de coco light', 'coentro'],
      steps: ['Cozinhe a lentilha', 'Refogue cebola, adicione tomate e curry', 'Adicione a lentilha e o leite de coco', 'Cozinhe 10min e finalize com coentro'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm053', name: 'Burger de Feijao Preto', emoji: '&#127828;',
      category: 'jantar', tags: ['vegetariano', 'vegan'],
      calories: 380, protein: 16, carbs: 52, fat: 10, fiber: 12,
      servingSize: 1, servingUnit: 'unidade',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['200g feijao preto', '50g farinha aveia', '1 cebola', '1 alho', '1 colher linhaça', 'temperos', '1 pao integral'],
      steps: ['Amasse o feijao cozido', 'Misture com farinha, cebola, alho e temperos', 'Forme hamburgeres e frite em azeite', 'Monte no pao com recheios a gosto'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },

    /* ==================== MEDITERRÂNEA ==================== */
    {
      id: 'm054', name: 'Hummus com Pao Pita Integral e Vegetais', emoji: '&#129386;',
      category: 'lanche', tags: ['vegetariano', 'vegan'],
      calories: 280, protein: 10, carbs: 36, fat: 10, fiber: 8,
      servingSize: 1, servingUnit: 'porcao',
      prepTime: 10, difficulty: 'facil',
      ingredients: ['100g hummus', '1 pao pita integral', '1/2 pepino', '1 cenoura', '6 tomatinhos cereja'],
      steps: ['Corte os vegetais em palitos', 'Sirva com hummus e o pao pita'],
      dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean']
    },
    {
      id: 'm055', name: 'Salada Grega Completa', emoji: '&#127807;',
      category: 'almoco', tags: ['vegetariano', 'sem-gluten'],
      calories: 320, protein: 12, carbs: 18, fat: 22, fiber: 5,
      servingSize: 350, servingUnit: 'g',
      prepTime: 10, difficulty: 'facil',
      ingredients: ['100g queijo feta', '2 tomates', '1 pepino', '50g azeitona kalamata', '1/4 cebola roxa', '2 colheres azeite', 'orégano'],
      steps: ['Corte todos os ingredientes', 'Misture na tigela', 'Adicione feta por cima', 'Tempere com azeite e orégano'],
      dietTypes: ['regular', 'vegetarian', 'mediterranean']
    },
    {
      id: 'm056', name: 'Frango ao Limao com Ervas e Couscous', emoji: '&#127869;',
      category: 'almoco', tags: ['highprotein'],
      calories: 470, protein: 38, carbs: 44, fat: 14, fiber: 5,
      servingSize: 400, servingUnit: 'g',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['180g file frango', '120g couscous', '1 limao siciliano', 'hortelã', 'salsa', '2 colheres azeite', 'alho'],
      steps: ['Marine o frango com limao, alho e ervas', 'Grelhe 6min cada lado', 'Prepare o couscous com agua quente', 'Monte com hortelã fresca'],
      dietTypes: ['regular', 'mediterranean']
    },

    /* ==================== LOW CARB ==================== */
    {
      id: 'm057', name: 'Frango com Abacate e Ovos', emoji: '&#129361;',
      category: 'almoco', tags: ['low-carb', 'sem-gluten', 'highprotein'],
      calories: 480, protein: 44, carbs: 6, fat: 32, fiber: 8,
      servingSize: 380, servingUnit: 'g',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['200g frango grelhado', '1/2 abacate', '2 ovos cozidos', 'alface', 'tomate', '1 colher azeite', 'limao'],
      steps: ['Grelhe o frango', 'Cozinhe os ovos', 'Monte a salada com todos os ingredientes', 'Tempere com azeite e limaõ'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm058', name: 'Wrap de Alface com Carne Moida', emoji: '&#129368;',
      category: 'jantar', tags: ['low-carb', 'sem-gluten', 'highprotein'],
      calories: 360, protein: 34, carbs: 8, fat: 22, fiber: 4,
      servingSize: 3, servingUnit: 'wraps',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['200g carne moida', '6 folhas alface americana grande', '1 tomate', '1/2 cebola', '1 colher mostarda', 'temperos'],
      steps: ['Refogue a carne com cebola e temperos', 'Deixe esfriar ligeiramente', 'Monte nas folhas de alface com tomate e mostarda'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm059', name: 'Salmao com Couve-flor Gratinade', emoji: '&#129421;',
      category: 'jantar', tags: ['low-carb', 'sem-gluten', 'highprotein'],
      calories: 430, protein: 40, carbs: 12, fat: 24, fiber: 5,
      servingSize: 380, servingUnit: 'g',
      prepTime: 30, difficulty: 'medio',
      ingredients: ['180g salmao', '200g couve-flor', '30g queijo parmesao', '1 colher manteiga', 'alho', 'ervas'],
      steps: ['Asse a couve-flor com parmesao e manteiga', 'Grelhe o salmao temperado', 'Sirva junto'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm060', name: 'Egg Muffin de Vegetais', emoji: '&#129370;',
      category: 'cafe', tags: ['vegetariano', 'sem-gluten', 'low-carb', 'highprotein'],
      calories: 240, protein: 20, carbs: 4, fat: 16, fiber: 2,
      servingSize: 3, servingUnit: 'muffins',
      prepTime: 25, difficulty: 'medio',
      ingredients: ['4 ovos', '50g espinafre', '30g queijo', '1/4 pimentao', 'sal e pimenta', '1 colher azeite'],
      steps: ['Bata os ovos com temperos', 'Adicione vegetais picados e queijo', 'Distribua em formas de muffin', 'Asse a 180°C por 20min'],
      dietTypes: ['regular', 'vegetarian', 'lowcarb']
    },

    /* ==================== MAIS REFEICOES ==================== */
    {
      id: 'm061', name: 'Sopa de Cenoura e Gengibre', emoji: '&#129364;',
      category: 'jantar', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 200, protein: 4, carbs: 38, fat: 5, fiber: 7,
      servingSize: 350, servingUnit: 'ml',
      prepTime: 25, difficulty: 'facil',
      ingredients: ['300g cenoura', '1 pedaco gengibre', '1 cebola', '400ml caldo legumes', '1 colher azeite', 'curry'],
      steps: ['Refogue cebola, adicione cenoura e gengibre', 'Cubra com caldo e cozinhe 20min', 'Bata no liquidificador', 'Tempere com curry'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm062', name: 'Arroz Integral com Feijao Carioca', emoji: '&#129379;',
      category: 'almoco', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 380, protein: 16, carbs: 72, fat: 4, fiber: 10,
      servingSize: 300, servingUnit: 'g',
      prepTime: 30, difficulty: 'facil',
      ingredients: ['120g arroz integral', '150g feijao carioca', 'alho', 'cebola', '1 colher azeite', 'temperos naturais'],
      steps: ['Cozinhe o arroz integral', 'Refogue alho e cebola, adicione o feijao', 'Tempere e cozinhe 5min', 'Sirva juntos'],
      dietTypes: ['regular', 'vegetarian', 'vegan']
    },
    {
      id: 'm063', name: 'Coxa de Frango Assada com Legumes', emoji: '&#127829;',
      category: 'almoco', tags: ['sem-gluten', 'highprotein'],
      calories: 460, protein: 38, carbs: 28, fat: 20, fiber: 5,
      servingSize: 400, servingUnit: 'g',
      prepTime: 45, difficulty: 'medio',
      ingredients: ['2 coxas frango sem pele', '150g batata', '1 cenoura', '1 abobrinha', '2 colheres azeite', 'alho e ervas'],
      steps: ['Tempere as coxas com antecedencia', 'Arranje os legumes na assadeira', 'Asse a 200°C por 40min virando na metade'],
      dietTypes: ['regular']
    },
    {
      id: 'm064', name: 'Cuscuz com Ovo e Charque Light', emoji: '&#127825;',
      category: 'cafe', tags: [],
      calories: 420, protein: 28, carbs: 52, fat: 10, fiber: 4,
      servingSize: 300, servingUnit: 'g',
      prepTime: 15, difficulty: 'facil',
      ingredients: ['120g cuscuz paulista', '2 ovos', '60g charque dessalgado e desfiado', '1 colher manteiga', 'sal'],
      steps: ['Hidrate o cuscuz com agua quente e sal', 'Frite os ovos', 'Prepare o charque desfiado', 'Monte o cuscuz com ovo e charque'],
      dietTypes: ['regular']
    },
    {
      id: 'm065', name: 'Brigadeiro Fit de Chocolate', emoji: '&#127859;',
      category: 'lanche', tags: ['vegetariano', 'sem-gluten'],
      calories: 160, protein: 6, carbs: 20, fat: 7, fiber: 3,
      servingSize: 3, servingUnit: 'unidades',
      prepTime: 15, difficulty: 'medio',
      ingredients: ['100g grao de bico cozido', '2 colheres cacau', '3 colheres mel', '1 colher pasta amendoim', 'granulado sem acucar'],
      steps: ['Bata o grao de bico no processador', 'Adicione cacau, mel e pasta de amendoim', 'Forme bolinhas e passe no granulado'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm066', name: 'Bolo Fit de Banana e Aveia', emoji: '&#127866;',
      category: 'lanche', tags: ['vegetariano'],
      calories: 200, protein: 7, carbs: 30, fat: 6, fiber: 4,
      servingSize: 1, servingUnit: 'fatia',
      prepTime: 35, difficulty: 'medio',
      ingredients: ['3 bananas maduras', '2 ovos', '120g aveia', '1 colher fermento', '2 colheres mel', 'canela'],
      steps: ['Bata todos os ingredientes no liquidificador', 'Coloque em forma untada', 'Asse a 180°C por 25min', 'Espere esfriar antes de cortar'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm067', name: 'Pao de Queijo Fit', emoji: '&#127855;',
      category: 'lanche', tags: ['sem-gluten', 'vegetariano'],
      calories: 180, protein: 8, carbs: 22, fat: 8, fiber: 1,
      servingSize: 3, servingUnit: 'unidades',
      prepTime: 30, difficulty: 'medio',
      ingredients: ['100g polvilho azedo', '50g queijo minas', '1 ovo', '50ml leite', '1 colher azeite', 'sal'],
      steps: ['Misture polvilho, queijo, ovo, leite e azeite', 'Forme bolinhas', 'Asse a 180°C por 20min'],
      dietTypes: ['regular', 'vegetarian']
    },
    {
      id: 'm068', name: 'Sushi Fit de Pepino', emoji: '&#129361;',
      category: 'lanche', tags: ['sem-gluten', 'low-carb'],
      calories: 140, protein: 12, carbs: 6, fat: 8, fiber: 2,
      servingSize: 4, servingUnit: 'rolinhos',
      prepTime: 15, difficulty: 'medio',
      ingredients: ['1 pepino grande', '80g cream cheese light', '60g salmao defumado', 'gergelim'],
      steps: ['Fatie o pepino em tiras com mandoline', 'Espalhe cream cheese', 'Adicione salmao', 'Enrole e fixe com palito'],
      dietTypes: ['regular', 'lowcarb']
    },
    {
      id: 'm069', name: 'Frango Desfiado com Abobora', emoji: '&#127802;',
      category: 'almoco', tags: ['sem-gluten', 'highprotein'],
      calories: 400, protein: 36, carbs: 36, fat: 10, fiber: 5,
      servingSize: 380, servingUnit: 'g',
      prepTime: 30, difficulty: 'facil',
      ingredients: ['180g frango', '200g abobora', '1 cebola', 'alho', '1 tomate', 'colorau'],
      steps: ['Cozinhe o frango e desfie', 'Cozinhe a abobora e amasse levemente', 'Refogue tudo com temperos', 'Sirva como prato principal'],
      dietTypes: ['regular']
    },
    {
      id: 'm070', name: 'Salada de Lentilha com Vegetais Assados', emoji: '&#127793;',
      category: 'almoco', tags: ['vegetariano', 'vegan', 'sem-gluten'],
      calories: 350, protein: 18, carbs: 50, fat: 8, fiber: 14,
      servingSize: 350, servingUnit: 'g',
      prepTime: 30, difficulty: 'medio',
      ingredients: ['150g lentilha', '1 berinjela', '1 pimentao', '50g rúcula', '2 colheres azeite', 'vinagre balsamico'],
      steps: ['Cozinhe a lentilha', 'Asse os vegetais cortados com azeite', 'Misture com a lentilha e a rucula', 'Tempere com azeite e balsamico'],
      dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean']
    },

    /* ==================== MAIS 50 REFEICOES ==================== */
    { id: 'm071', name: 'Costelinha Suina Magra Assada', emoji: '&#129363;', category: 'almoco', tags: [], calories: 480, protein: 36, carbs: 24, fat: 26, fiber: 3, servingSize: 350, servingUnit: 'g', prepTime: 50, difficulty: 'medio', ingredients: ['300g costelinha magra', '150g arroz', '80g feijao', 'temperos'], steps: ['Tempere a costelinha', 'Asse a 180°C por 45min', 'Sirva com arroz e feijao'], dietTypes: ['regular'] },
    { id: 'm072', name: 'Macaxeira Cozida com Carne Seca', emoji: '&#129372;', category: 'almoco', tags: [], calories: 520, protein: 30, carbs: 60, fat: 14, fiber: 4, servingSize: 400, servingUnit: 'g', prepTime: 45, difficulty: 'medio', ingredients: ['200g macaxeira', '150g carne seca dessalgada', 'manteiga', 'alho', 'coentro'], steps: ['Dessalgue e cozinhe a carne seca', 'Cozinhe a macaxeira', 'Desfie a carne e tempere', 'Sirva junto'], dietTypes: ['regular'] },
    { id: 'm073', name: 'Bolinho de Bacalhau Light', emoji: '&#129421;', category: 'lanche', tags: [], calories: 220, protein: 16, carbs: 22, fat: 8, fiber: 2, servingSize: 3, servingUnit: 'bolinhos', prepTime: 30, difficulty: 'avancado', ingredients: ['150g bacalhau dessalgado', '150g batata cozida', '1 ovo', 'salsa', 'azeite'], steps: ['Cozinhe o bacalhau e desfie', 'Amasse a batata', 'Misture tudo e forme bolinhos', 'Asse a 200°C por 20min'], dietTypes: ['regular', 'mediterranean'] },
    { id: 'm074', name: 'Frango ao Molho Pesto', emoji: '&#127807;', category: 'jantar', tags: ['highprotein'], calories: 420, protein: 42, carbs: 8, fat: 24, fiber: 2, servingSize: 320, servingUnit: 'g', prepTime: 20, difficulty: 'medio', ingredients: ['200g frango', '3 colheres pesto', '100g tomate cereja', '30g parmesao'], steps: ['Grelhe o frango', 'Misture com pesto e tomate cereja', 'Finalize com parmesao'], dietTypes: ['regular', 'mediterranean'] },
    { id: 'm075', name: 'Pepino Recheado com Atum', emoji: '&#129361;', category: 'lanche', tags: ['low-carb', 'sem-gluten'], calories: 150, protein: 18, carbs: 5, fat: 5, fiber: 2, servingSize: 2, servingUnit: 'unidades', prepTime: 10, difficulty: 'facil', ingredients: ['1 pepino grande', '100g atum', '1 colher cream cheese', 'sal', 'limaõ'], steps: ['Corte o pepino ao meio', 'Misture atum com cream cheese e limao', 'Recheie o pepino'], dietTypes: ['regular', 'lowcarb'] },
    { id: 'm076', name: 'Caldo de Frango com Legumes', emoji: '&#9749;', category: 'jantar', tags: ['sem-gluten'], calories: 240, protein: 24, carbs: 22, fat: 6, fiber: 5, servingSize: 400, servingUnit: 'ml', prepTime: 35, difficulty: 'facil', ingredients: ['150g frango', '1 cenoura', '2 batatas', '1 chuchu', 'caldo caseiro', 'ervas'], steps: ['Cozinhe tudo junto', 'Sirva quente'], dietTypes: ['regular'] },
    { id: 'm077', name: 'Berinjela Recheada com Carne', emoji: '&#127822;', category: 'jantar', tags: ['sem-gluten'], calories: 380, protein: 28, carbs: 22, fat: 18, fiber: 8, servingSize: 380, servingUnit: 'g', prepTime: 40, difficulty: 'avancado', ingredients: ['2 berinjelas', '150g carne moida', '1 tomate', '50g queijo', 'temperos'], steps: ['Escave as berinjelas', 'Refogue a carne com temperos', 'Recheie e cubra com queijo', 'Asse 25min a 200°C'], dietTypes: ['regular'] },
    { id: 'm078', name: 'Espaguete de Abobrinha com Frango', emoji: '&#127814;', category: 'jantar', tags: ['low-carb', 'sem-gluten'], calories: 340, protein: 36, carbs: 14, fat: 14, fiber: 5, servingSize: 380, servingUnit: 'g', prepTime: 20, difficulty: 'medio', ingredients: ['2 abobrinhas', '160g frango', '1 colher pesto', '30g parmesao', '1 colher azeite'], steps: ['Fatie a abobrinha em espiral', 'Cozinhe levemente no vapor', 'Grelhe o frango', 'Misture com pesto e parmesao'], dietTypes: ['regular', 'lowcarb'] },
    { id: 'm079', name: 'Chili de Carne com Feijao', emoji: '&#127798;', category: 'almoco', tags: [], calories: 440, protein: 34, carbs: 42, fat: 14, fiber: 12, servingSize: 380, servingUnit: 'g', prepTime: 40, difficulty: 'medio', ingredients: ['150g carne moida', '150g feijao carioca', '1 pimentao', '1 cebola', 'pimenta chipotle', 'cominho'], steps: ['Refogue carne e cebola', 'Adicione pimentao e temperos', 'Junte o feijao e cozinhe 20min'], dietTypes: ['regular'] },
    { id: 'm080', name: 'Salada Niçoise', emoji: '&#129421;', category: 'almoco', tags: ['sem-gluten'], calories: 390, protein: 32, carbs: 24, fat: 18, fiber: 6, servingSize: 380, servingUnit: 'g', prepTime: 20, difficulty: 'medio', ingredients: ['150g atum', '2 ovos cozidos', '100g vagem', '12 azeitonas', '1 tomate', 'alface', '1 colher mostarda'], steps: ['Cozinhe os ovos e vagem', 'Monte tudo na tigela', 'Tempere com molho de mostarda e azeite'], dietTypes: ['regular', 'mediterranean'] },
    { id: 'm081', name: 'Pupunha no Vapor com Azeite', emoji: '&#127807;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 180, protein: 3, carbs: 36, fat: 4, fiber: 6, servingSize: 200, servingUnit: 'g', prepTime: 25, difficulty: 'facil', ingredients: ['200g pupunha', '1 colher azeite', 'sal grosso'], steps: ['Cozinhe a pupunha no vapor 20min', 'Sirva com azeite e sal'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm082', name: 'Patinho Moido ao Molho de Ervas', emoji: '&#129363;', category: 'almoco', tags: ['sem-gluten'], calories: 430, protein: 36, carbs: 30, fat: 16, fiber: 4, servingSize: 380, servingUnit: 'g', prepTime: 25, difficulty: 'medio', ingredients: ['200g patinho moido', '120g batata cozida', 'alho', 'cebola', 'ervas frescas', '1 colher azeite'], steps: ['Refogue alho e cebola', 'Adicione a carne e cozinhe', 'Finalize com ervas frescas', 'Sirva com batata'], dietTypes: ['regular'] },
    { id: 'm083', name: 'Mousse de Chocolate Fit', emoji: '&#127849;', category: 'lanche', tags: ['vegetariano'], calories: 160, protein: 12, carbs: 14, fat: 6, fiber: 2, servingSize: 150, servingUnit: 'g', prepTime: 10, difficulty: 'facil', ingredients: ['150g iogurte grego', '2 colheres cacau', '2 colheres mel', '1 scoop whey (15g)'], steps: ['Misture tudo vigorosamente', 'Leve a geladeira 30min', 'Sirva gelado'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm084', name: 'Carneiro Assado com Hortalicas', emoji: '&#129363;', category: 'almoco', tags: ['sem-gluten'], calories: 510, protein: 42, carbs: 18, fat: 28, fiber: 4, servingSize: 400, servingUnit: 'g', prepTime: 90, difficulty: 'avancado', ingredients: ['250g pernil carneiro', '100g abobrinha', '100g berinjela', 'alho', 'alecrim', 'azeite'], steps: ['Marine o carneiro com alho e alecrim', 'Asse a 160°C por 80min', 'Asse os legumes', 'Sirva junto'], dietTypes: ['regular', 'mediterranean'] },
    { id: 'm085', name: 'Quinoa com Frutos do Mar', emoji: '&#129424;', category: 'almoco', tags: ['sem-gluten'], calories: 460, protein: 36, carbs: 46, fat: 12, fiber: 5, servingSize: 380, servingUnit: 'g', prepTime: 25, difficulty: 'medio', ingredients: ['120g quinoa', '100g camarao', '80g lula', '1 cebola', '1 tomate', 'limao', 'coentro'], steps: ['Cozinhe a quinoa', 'Salteie os frutos do mar com cebola e tomate', 'Misture com a quinoa', 'Finalize com limao e coentro'], dietTypes: ['regular', 'mediterranean'] },
    { id: 'm086', name: 'Ovo Pochê com Espinafre', emoji: '&#129370;', category: 'cafe', tags: ['vegetariano', 'low-carb', 'sem-gluten'], calories: 210, protein: 16, carbs: 4, fat: 14, fiber: 3, servingSize: 1, servingUnit: 'porcao', prepTime: 10, difficulty: 'medio', ingredients: ['2 ovos', '80g espinafre', '1 colher azeite', 'alho', 'sal', 'pimenta'], steps: ['Refogue espinafre com alho no azeite', 'Prepare os ovos poches em agua quente', 'Sirva sobre o espinafre'], dietTypes: ['regular', 'vegetarian', 'lowcarb'] },
    { id: 'm087', name: 'Frango ao Vinho Branco', emoji: '&#127869;', category: 'jantar', tags: ['sem-gluten', 'highprotein'], calories: 380, protein: 40, carbs: 6, fat: 18, fiber: 1, servingSize: 320, servingUnit: 'g', prepTime: 30, difficulty: 'medio', ingredients: ['220g file frango', '50ml vinho branco seco', '1 colher alho', 'tomilho', '1 colher manteiga light'], steps: ['Sele o frango em frigideira quente', 'Adicione o vinho e deixe reduzir', 'Adicione tomilho e alho', 'Cozinhe tampado 10min'], dietTypes: ['regular'] },
    { id: 'm088', name: 'Granola Caseira com Mel', emoji: '&#129386;', category: 'lanche', tags: ['vegetariano'], calories: 190, protein: 5, carbs: 30, fat: 7, fiber: 4, servingSize: 40, servingUnit: 'g', prepTime: 20, difficulty: 'facil', ingredients: ['200g aveia', '50g amendoa', '2 colheres mel', '1 colher canela', '1 colher azeite', '50g coco ralado'], steps: ['Misture tudo', 'Espalhe na assadeira', 'Asse a 160°C por 15min mexendo na metade', 'Deixe esfriar'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm089', name: 'Lagarto ao Molho Madeira Light', emoji: '&#129363;', category: 'almoco', tags: ['sem-gluten'], calories: 430, protein: 38, carbs: 20, fat: 20, fiber: 3, servingSize: 380, servingUnit: 'g', prepTime: 60, difficulty: 'avancado', ingredients: ['200g lagarto', '100ml vinho Madeira', '1 cebola', 'cogumelos', '100ml caldo carne', 'ervas'], steps: ['Sele o lagarto', 'Adicione cebola, cogumelos e vinho', 'Cubra com caldo e asse 50min a 180°C', 'Fatie e sirva com o molho'], dietTypes: ['regular'] },
    { id: 'm090', name: 'Bowl de Soja Texturizada com Vegetais', emoji: '&#127793;', category: 'almoco', tags: ['vegetariano', 'vegan'], calories: 380, protein: 28, carbs: 46, fat: 8, fiber: 10, servingSize: 380, servingUnit: 'g', prepTime: 20, difficulty: 'facil', ingredients: ['100g soja texturizada', '80g arroz integral', '100g brocolis', '1 cenoura', '2 colheres shoyu light', 'gengibre'], steps: ['Hidrate e cozinhe a soja texturizada', 'Cozinhe o arroz', 'Salteie os vegetais com gengibre', 'Misture e tempere com shoyu'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm091', name: 'Tortilha Espanhola Fit', emoji: '&#129370;', category: 'almoco', tags: ['vegetariano', 'sem-gluten'], calories: 340, protein: 22, carbs: 28, fat: 14, fiber: 4, servingSize: 2, servingUnit: 'fatias', prepTime: 30, difficulty: 'medio', ingredients: ['4 ovos', '200g batata', '1/2 cebola', '1 colher azeite', 'sal', 'salsa'], steps: ['Cozinhe a batata fatiada', 'Refogue com cebola', 'Adicione os ovos batidos', 'Cozinhe tampado ambos os lados'], dietTypes: ['regular', 'vegetarian', 'mediterranean'] },
    { id: 'm092', name: 'Sopa de Mandioquinha', emoji: '&#9749;', category: 'jantar', tags: ['vegetariano', 'sem-gluten'], calories: 250, protein: 6, carbs: 44, fat: 6, fiber: 5, servingSize: 350, servingUnit: 'ml', prepTime: 25, difficulty: 'facil', ingredients: ['250g mandioquinha', '1 cebola', '400ml caldo legumes', '1 colher azeite', 'noz-moscada'], steps: ['Cozinhe a mandioquinha', 'Bata com o caldo', 'Tempere com noz-moscada e azeite'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm093', name: 'Camarao no Alho e Oleo', emoji: '&#129424;', category: 'jantar', tags: ['sem-gluten', 'low-carb', 'highprotein'], calories: 300, protein: 32, carbs: 6, fat: 16, fiber: 1, servingSize: 250, servingUnit: 'g', prepTime: 10, difficulty: 'facil', ingredients: ['200g camarao', '4 dentes alho', '3 colheres azeite', 'pimenta calabresa', 'limao', 'salsa'], steps: ['Aqueca o azeite', 'Adicione o alho fatiado', 'Junte o camarao e cozinhe 5min', 'Finalize com limao e salsa'], dietTypes: ['regular', 'lowcarb', 'mediterranean'] },
    { id: 'm094', name: 'Nhoque de Batata Doce', emoji: '&#127815;', category: 'almoco', tags: ['vegetariano', 'sem-gluten'], calories: 380, protein: 12, carbs: 68, fat: 6, fiber: 6, servingSize: 300, servingUnit: 'g', prepTime: 40, difficulty: 'avancado', ingredients: ['300g batata doce', '100g farinha de arroz', '1 ovo', 'sal', 'molho sugo'], steps: ['Cozinhe e amasse a batata doce', 'Misture com farinha e ovo', 'Forme os nhoques', 'Cozinhe em agua salgada', 'Sirva com sugo'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm095', name: 'Feijao Verde com Linguica Light', emoji: '&#129379;', category: 'almoco', tags: [], calories: 400, protein: 24, carbs: 42, fat: 14, fiber: 10, servingSize: 350, servingUnit: 'g', prepTime: 35, difficulty: 'medio', ingredients: ['200g feijao verde', '80g linguica light', '1 cebola', 'alho', 'colorau', 'coentro'], steps: ['Cozinhe o feijao', 'Refogue linguica com alho e cebola', 'Misture ao feijao', 'Finalize com coentro'], dietTypes: ['regular'] },
    { id: 'm096', name: 'Salada Caesar Fit com Frango', emoji: '&#127801;', category: 'almoco', tags: ['highprotein'], calories: 360, protein: 34, carbs: 14, fat: 18, fiber: 4, servingSize: 350, servingUnit: 'g', prepTime: 15, difficulty: 'facil', ingredients: ['160g frango grelhado', '100g alface romana', '20g parmesao', '2 colheres molho caesar light', 'croutons integrais'], steps: ['Grelhe o frango e fatie', 'Monte com alface e molho', 'Adicione parmesao e croutons'], dietTypes: ['regular'] },
    { id: 'm097', name: 'Bolo de Cenoura Fit', emoji: '&#127866;', category: 'lanche', tags: ['vegetariano'], calories: 190, protein: 5, carbs: 28, fat: 7, fiber: 3, servingSize: 1, servingUnit: 'fatia', prepTime: 40, difficulty: 'medio', ingredients: ['2 cenouras', '3 ovos', '80g aveia', '2 colheres mel', '1 colher fermento', 'canela'], steps: ['Bata cenoura, ovos e mel', 'Adicione aveia, fermento e canela', 'Asse a 180°C por 30min'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm098', name: 'Picanha Grelhada com Farofa Fit', emoji: '&#129363;', category: 'almoco', tags: ['sem-gluten'], calories: 560, protein: 44, carbs: 22, fat: 30, fiber: 3, servingSize: 400, servingUnit: 'g', prepTime: 20, difficulty: 'avancado', ingredients: ['220g picanha', '60g farofa aveia', '100g arroz', 'vinagrete', 'sal grosso'], steps: ['Grelhe a picanha 4min cada lado', 'Descanse 5min antes de cortar', 'Sirva com farofa e arroz'], dietTypes: ['regular'] },
    { id: 'm099', name: 'Smoothie Detox Verde', emoji: '&#129749;', category: 'cafe', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 180, protein: 4, carbs: 30, fat: 5, fiber: 7, servingSize: 400, servingUnit: 'ml', prepTime: 5, difficulty: 'facil', ingredients: ['1 maca verde', '50g espinafre', '1/2 pepino', '1 limao', '200ml agua de coco', '1 pedaco gengibre'], steps: ['Bata tudo no liquidificador', 'Sirva com gelo'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm100', name: 'Frango Ensopado com Batata', emoji: '&#129363;', category: 'almoco', tags: [], calories: 440, protein: 36, carbs: 38, fat: 14, fiber: 4, servingSize: 400, servingUnit: 'g', prepTime: 35, difficulty: 'medio', ingredients: ['200g frango pedacos', '200g batata', '1 cebola', '2 tomates', 'colorau', 'temperos'], steps: ['Doure o frango em pedacos', 'Adicione cebola e tomate', 'Junte batatas e agua', 'Cozinhe 25min'], dietTypes: ['regular'] },
    { id: 'm101', name: 'Cogumelos Recheados com Ricota', emoji: '&#127810;', category: 'lanche', tags: ['vegetariano', 'sem-gluten', 'low-carb'], calories: 160, protein: 12, carbs: 6, fat: 8, fiber: 2, servingSize: 4, servingUnit: 'unidades', prepTime: 20, difficulty: 'facil', ingredients: ['4 cogumelos Paris grandes', '80g ricota', 'ervas frescas', '30g parmesao', 'alho'], steps: ['Retire o cabo dos cogumelos', 'Misture ricota com ervas e alho', 'Recheie os cogumelos', 'Cubra com parmesao e asse 15min'], dietTypes: ['regular', 'vegetarian', 'lowcarb'] },
    { id: 'm102', name: 'Pao de Aveia Caseiro', emoji: '&#127855;', category: 'cafe', tags: ['vegetariano'], calories: 220, protein: 8, carbs: 38, fat: 5, fiber: 6, servingSize: 2, servingUnit: 'fatias', prepTime: 60, difficulty: 'avancado', ingredients: ['200g aveia', '100g farinha integral', '1 colher fermento biologico', '1 colher mel', '1 ovo', '150ml agua morna'], steps: ['Ative o fermento', 'Misture os secos', 'Adicione os liquidos e amasse', 'Deixe crescer 1h', 'Asse a 180°C por 30min'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm103', name: 'Bolinho de Carne Moida Fit', emoji: '&#127861;', category: 'almoco', tags: [], calories: 360, protein: 30, carbs: 18, fat: 18, fiber: 2, servingSize: 3, servingUnit: 'bolinhos', prepTime: 30, difficulty: 'medio', ingredients: ['200g carne moida', '1 ovo', '2 colheres aveia', '1 cebola', 'temperos', '1 tomate'], steps: ['Misture a carne com ovo, aveia e temperos', 'Forme bolinhos', 'Asse a 200°C por 20min', 'Sirva com molho de tomate'], dietTypes: ['regular'] },
    { id: 'm104', name: 'Salada de Repolho Roxo com Gengibre', emoji: '&#127793;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten', 'low-carb'], calories: 100, protein: 3, carbs: 14, fat: 4, fiber: 5, servingSize: 200, servingUnit: 'g', prepTime: 10, difficulty: 'facil', ingredients: ['200g repolho roxo', '1 cenoura', '1 colher gengibre ralado', '2 colheres azeite', 'vinagre de arroz'], steps: ['Rale o repolho e a cenoura', 'Misture com gengibre e temperos', 'Deixe marinar 15min na geladeira'], dietTypes: ['regular', 'vegetarian', 'vegan', 'lowcarb'] },
    { id: 'm105', name: 'Doce de Abobora com Coco', emoji: '&#127802;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 150, protein: 2, carbs: 28, fat: 5, fiber: 4, servingSize: 100, servingUnit: 'g', prepTime: 30, difficulty: 'facil', ingredients: ['300g abobora', '50g coco ralado', '3 colheres mel', 'cravo', 'canela'], steps: ['Cozinhe a abobora', 'Amasse e misture com coco e mel', 'Adicione especiarias', 'Cozinhe mexendo ate engrossar'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm106', name: 'Tilapia Grelhada com Ervas', emoji: '&#129421;', category: 'jantar', tags: ['sem-gluten', 'low-carb', 'highprotein'], calories: 280, protein: 38, carbs: 4, fat: 12, fiber: 2, servingSize: 280, servingUnit: 'g', prepTime: 15, difficulty: 'facil', ingredients: ['200g file tilapia', '2 colheres azeite', 'alecrim', 'tomilho', 'limao', 'alho'], steps: ['Tempere com ervas, alho e limao', 'Grelhe 4min cada lado', 'Sirva com salada verde'], dietTypes: ['regular', 'lowcarb', 'mediterranean'] },
    { id: 'm107', name: 'Chocolate Quente Proteico', emoji: '&#127849;', category: 'lanche', tags: ['vegetariano'], calories: 220, protein: 18, carbs: 24, fat: 6, fiber: 4, servingSize: 300, servingUnit: 'ml', prepTime: 5, difficulty: 'facil', ingredients: ['200ml leite desnatado', '1 scoop whey chocolate (20g)', '2 colheres cacau', '1 colher mel'], steps: ['Aqueca o leite', 'Misture o whey e o cacau', 'Adoce com mel'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm108', name: 'Biscoito de Amendoim Fit', emoji: '&#129385;', category: 'lanche', tags: ['vegetariano'], calories: 180, protein: 8, carbs: 18, fat: 9, fiber: 3, servingSize: 4, servingUnit: 'biscoitos', prepTime: 25, difficulty: 'facil', ingredients: ['100g pasta amendoim', '1 ovo', '3 colheres mel', '50g aveia', '1 colher fermento'], steps: ['Misture tudo', 'Forme bolinhos e achate', 'Asse a 180°C por 12min'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm109', name: 'Arroz de Forno com Frango e Legumes', emoji: '&#127857;', category: 'almoco', tags: ['highprotein'], calories: 490, protein: 36, carbs: 52, fat: 14, fiber: 5, servingSize: 400, servingUnit: 'g', prepTime: 45, difficulty: 'medio', ingredients: ['120g arroz', '180g frango', '1 cenoura', '1 abobrinha', '100g molho tomate', '50g queijo'], steps: ['Cozinhe o arroz al dente', 'Misture com frango cozido e legumes', 'Leve ao forno com queijo por 20min'], dietTypes: ['regular'] },
    { id: 'm110', name: 'Polvo Grelhado ao Limaõ', emoji: '&#129419;', category: 'almoco', tags: ['sem-gluten', 'low-carb'], calories: 300, protein: 38, carbs: 8, fat: 12, fiber: 1, servingSize: 300, servingUnit: 'g', prepTime: 60, difficulty: 'avancado', ingredients: ['300g polvo', '3 colheres azeite', 'limao siciliano', 'alho', 'salsa', 'pimenta'], steps: ['Cozinhe o polvo 45min', 'Grelhe em frigideira quente', 'Tempere com azeite, limao e salsa'], dietTypes: ['regular', 'lowcarb', 'mediterranean'] },
    { id: 'm111', name: 'Salada de Frutas com Mel e Hortelã', emoji: '&#127823;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 150, protein: 2, carbs: 34, fat: 1, fiber: 5, servingSize: 250, servingUnit: 'g', prepTime: 8, difficulty: 'facil', ingredients: ['1 maca', '1 banana', '100g morango', '100g melancia', '1 colher mel', 'folhas hortela'], steps: ['Corte todas as frutas', 'Misture e regue com mel', 'Finalize com hortela'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm112', name: 'Espinafre Refogado com Ovo', emoji: '&#127793;', category: 'cafe', tags: ['vegetariano', 'low-carb', 'sem-gluten'], calories: 220, protein: 16, carbs: 6, fat: 14, fiber: 4, servingSize: 250, servingUnit: 'g', prepTime: 10, difficulty: 'facil', ingredients: ['100g espinafre', '3 ovos', '2 dentes alho', '1 colher azeite', 'sal'], steps: ['Refogue o espinafre no azeite com alho', 'Adicione os ovos mexidos', 'Cozinhe ate o ponto desejado'], dietTypes: ['regular', 'vegetarian', 'lowcarb'] },
    { id: 'm113', name: 'Sopa de Abobora com Creme de Coco', emoji: '&#129379;', category: 'jantar', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 240, protein: 4, carbs: 36, fat: 10, fiber: 6, servingSize: 350, servingUnit: 'ml', prepTime: 25, difficulty: 'facil', ingredients: ['300g abobora', '200ml leite de coco', '1 cebola', '1 colher curry', 'gengibre', 'coentro'], steps: ['Refogue cebola e abobora', 'Adicione curry e leite de coco', 'Cozinhe 15min e bata', 'Finalize com coentro'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm114', name: 'Hamburguer de Peixe Fit', emoji: '&#127828;', category: 'jantar', tags: ['sem-gluten'], calories: 380, protein: 34, carbs: 28, fat: 14, fiber: 3, servingSize: 1, servingUnit: 'unidade', prepTime: 20, difficulty: 'medio', ingredients: ['200g tilapia moida', '1 ovo', '2 colheres aveia', 'limao', 'ervas', 'pao integral'], steps: ['Misture o peixe com ovo, aveia e temperos', 'Forme o hamburguer', 'Grelhe 4min cada lado', 'Monte no pao'], dietTypes: ['regular'] },
    { id: 'm115', name: 'Pasta de Grão de Bico com Ervas', emoji: '&#129386;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 200, protein: 8, carbs: 24, fat: 8, fiber: 7, servingSize: 150, servingUnit: 'g', prepTime: 10, difficulty: 'facil', ingredients: ['150g grao de bico cozido', '2 colheres azeite', '1 limao', 'alho', 'paprica defumada', 'ervas frescas'], steps: ['Bata tudo no processador', 'Ajuste o tempero', 'Sirva com vegetais ou pao'], dietTypes: ['regular', 'vegetarian', 'vegan', 'mediterranean'] },
    { id: 'm116', name: 'Moqueca de Peixe Light', emoji: '&#129421;', category: 'almoco', tags: ['sem-gluten'], calories: 430, protein: 36, carbs: 20, fat: 20, fiber: 4, servingSize: 400, servingUnit: 'g', prepTime: 35, difficulty: 'avancado', ingredients: ['200g file peixe branco', '200ml leite de coco light', '1 pimentao', '1 tomate', 'azeite de dende (1 colher)', 'coentro', 'limao'], steps: ['Marine o peixe no limao', 'Refogue pimentao e tomate', 'Adicione leite de coco e peixe', 'Cozinhe 15min, finalize com coentro'], dietTypes: ['regular'] },
    { id: 'm117', name: 'Maionese Fit de Frango', emoji: '&#127829;', category: 'almoco', tags: [], calories: 380, protein: 32, carbs: 24, fat: 16, fiber: 3, servingSize: 300, servingUnit: 'g', prepTime: 20, difficulty: 'facil', ingredients: ['200g frango cozido desfiado', '100g batata cozida', '50g cenoura', '50g iogurte natural', '1 colher mostarda', 'sal e salsa'], steps: ['Cozinhe e desfie o frango', 'Cozinhe os legumes em cubinhos', 'Misture tudo com iogurte e mostarda'], dietTypes: ['regular'] },
    { id: 'm118', name: 'Sorvete Fit de Banana', emoji: '&#127846;', category: 'lanche', tags: ['vegetariano', 'vegan', 'sem-gluten'], calories: 140, protein: 2, carbs: 30, fat: 2, fiber: 3, servingSize: 150, servingUnit: 'g', prepTime: 5, difficulty: 'facil', ingredients: ['2 bananas maduras congeladas', '1 colher cacau', 'canela'], steps: ['Bata as bananas congeladas no processador', 'Adicione cacau e canela', 'Sirva imediatamente como sorvete'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm119', name: 'Frango ao Curry com Arroz Basmati', emoji: '&#127869;', category: 'almoco', tags: ['sem-gluten', 'highprotein'], calories: 490, protein: 40, carbs: 52, fat: 12, fiber: 4, servingSize: 400, servingUnit: 'g', prepTime: 25, difficulty: 'medio', ingredients: ['200g frango', '120g arroz basmati', '1 cebola', '200ml leite de coco light', '2 colheres curry', 'coentro'], steps: ['Cozinhe o basmati', 'Refogue cebola com curry', 'Adicione o frango e leite de coco', 'Cozinhe 15min', 'Sirva com coentro'], dietTypes: ['regular'] },
    { id: 'm120', name: 'Quiche de Legumes Fit', emoji: '&#127859;', category: 'almoco', tags: ['vegetariano'], calories: 340, protein: 18, carbs: 28, fat: 16, fiber: 4, servingSize: 1, servingUnit: 'fatia', prepTime: 45, difficulty: 'avancado', ingredients: ['3 ovos', '100ml creme de leite light', '1 abobrinha', '1 pimentao', '50g queijo', 'massa fit de aveia'], steps: ['Prepare a massa com aveia e azeite', 'Bata ovos com creme', 'Adicione legumes e queijo', 'Asse a 180°C por 30min'], dietTypes: ['regular', 'vegetarian'] },
    { id: 'm121', name: 'Cha de Ervas com Biscoito Integral', emoji: '&#9749;', category: 'lanche', tags: ['vegetariano', 'vegan'], calories: 120, protein: 3, carbs: 22, fat: 2, fiber: 3, servingSize: 1, servingUnit: 'porcao', prepTime: 5, difficulty: 'facil', ingredients: ['300ml cha de camomila/hortelã', '4 biscoitos integrais sem acucar'], steps: ['Prepare o cha', 'Sirva com os biscoitos'], dietTypes: ['regular', 'vegetarian', 'vegan'] },
    { id: 'm122', name: 'Pirarucu Assado com Pirão', emoji: '&#129421;', category: 'almoco', tags: ['sem-gluten'], calories: 460, protein: 40, carbs: 42, fat: 14, fiber: 3, servingSize: 400, servingUnit: 'g', prepTime: 35, difficulty: 'medio', ingredients: ['200g pirarucu', '80g farinha mandioca', '200ml caldo peixe', '1 limao', 'coentro', 'alho'], steps: ['Tempere o pirarucu com limao e alho', 'Asse 20min a 200°C', 'Prepare o pirao com caldo e farinha', 'Sirva com coentro'], dietTypes: ['regular'] }
  ],

  // ---- Query methods ----
  getAll() { return this.meals; },

  getById(id) { return this.meals.find(m => m.id === id) || null; },

  getByCategory(cat) { return this.meals.filter(m => m.category === cat); },

  getByGoal(goal, dietType) {
    return this.meals.filter(m => {
      if (dietType && dietType !== 'regular' && !m.dietTypes.includes(dietType)) return false;
      return true;
    });
  },

  search(query) {
    const q = query.toLowerCase();
    return this.meals.filter(m => m.name.toLowerCase().includes(q) || m.tags.some(t => t.includes(q)));
  },

  getByTags(tags) {
    return this.meals.filter(m => tags.every(t => m.tags.includes(t)));
  },

  getRandom(n, category) {
    let pool = category ? this.getByCategory(category) : this.meals;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  },

  getCategories() {
    return ['cafe', 'almoco', 'jantar', 'lanche', 'pre-treino', 'pos-treino'];
  },

  getCategoryLabel(cat) {
    const labels = {
      'cafe': 'Cafe da Manha',
      'almoco': 'Almoco',
      'jantar': 'Jantar',
      'lanche': 'Lanche',
      'pre-treino': 'Pre-Treino',
      'pos-treino': 'Pos-Treino'
    };
    return labels[cat] || cat;
  },

  getTotalCount() { return this.meals.length; }
};
