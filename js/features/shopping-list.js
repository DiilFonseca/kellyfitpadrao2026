/* ============================================================
   KellyFit Padrao 2026 — Shopping List Feature
   ============================================================ */
const ShoppingList = {
  render() {
    var container = document.getElementById('page-compras');
    if (!container) return;

    var html = '<div class="page-header"><div><h1 class="page-title">&#128722; Lista de Compras</h1><p class="page-subtitle">Gerada automaticamente do seu planejamento semanal</p></div>' +
      '<button class="btn btn-primary btn-sm" id="btn-gen-list">&#9889; Gerar Lista</button></div>';

    var savedList = Store.get('shopping_list', null);

    if (!savedList) {
      html += '<div class="card" style="text-align:center;padding:48px">' +
        '<div style="font-size:3rem;margin-bottom:16px">&#128722;</div>' +
        '<h3>Lista vazia</h3>' +
        '<p style="color:var(--text-muted);margin:12px 0">Clique em "Gerar Lista" para criar automaticamente a partir do seu planejamento semanal.</p>' +
        '<button class="btn btn-primary" id="btn-gen-list-2">&#9889; Gerar Lista Agora</button></div>';
    } else {
      html += ShoppingList._renderList(savedList);
    }

    container.innerHTML = html;

    function generate() {
      var list = ShoppingList._generateFromWeeklyPlan();
      Store.set('shopping_list', list);
      ShoppingList.render();
      Toast.success('Lista gerada com ' + list.length + ' itens!');
      Gamification.awardBadge('b030');
    }

    var btn = document.getElementById('btn-gen-list');
    if (btn) btn.addEventListener('click', generate);
    var btn2 = document.getElementById('btn-gen-list-2');
    if (btn2) btn2.addEventListener('click', generate);

    if (savedList) {
      container.addEventListener('change', function (e) {
        if (e.target.classList.contains('shopping-check')) {
          var idx = parseInt(e.target.getAttribute('data-idx'));
          var list = Store.get('shopping_list', []);
          if (list[idx]) list[idx].checked = e.target.checked;
          Store.set('shopping_list', list);
        }
      });

      var clearBtn = document.getElementById('btn-clear-list');
      if (clearBtn) clearBtn.addEventListener('click', function () {
        Modal.confirm('Limpar lista de compras?', 'Remover todos os itens da lista?', function () {
          Store.set('shopping_list', null);
          ShoppingList.render();
        });
      });

      var exportBtn = document.getElementById('btn-export-list');
      if (exportBtn) exportBtn.addEventListener('click', function () {
        var list = Store.get('shopping_list', []);
        var text = 'LISTA DE COMPRAS — KellyFit 2026\n\n';
        var grouped = ShoppingList._groupByCategory(list);
        Object.keys(grouped).forEach(function (cat) {
          text += cat.toUpperCase() + '\n';
          grouped[cat].forEach(function (item) {
            text += (item.checked ? '[x] ' : '[ ] ') + item.name + (item.qty ? ' — ' + item.qty : '') + '\n';
          });
          text += '\n';
        });
        var blob = new Blob([text], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'lista-compras.txt'; a.click();
        URL.revokeObjectURL(url);
        Toast.success('Lista exportada!');
      });
    }
  },

  _generateFromWeeklyPlan() {
    var DateUtils2 = window.DateUtils || DateUtils;
    var days = DateUtils2.getLast7Days ? DateUtils2.getLast7Days() : [];

    // Also scan next 7 days weekly plan
    var weekDays = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      weekDays.push(d.toISOString().split('T')[0]);
    }

    var ingredientMap = {};

    function processDay(dateStr) {
      var meals = Store.get('meals_' + dateStr, []);
      meals.forEach(function (m) {
        var mealData = MealsDB.getById(m.id || m);
        if (!mealData || !mealData.ingredients) return;
        mealData.ingredients.forEach(function (ing) {
          var key = ing.toLowerCase().replace(/\d+g?|\d+ml?|xicara|colher|de\s/gi, '').trim();
          if (key.length < 3) return;
          if (!ingredientMap[key]) {
            ingredientMap[key] = { name: ShoppingList._capitalizeFirst(key), qty: ing, count: 0, category: ShoppingList._categorize(key), checked: false };
          }
          ingredientMap[key].count++;
        });
      });
    }

    weekDays.forEach(processDay);
    days.forEach(processDay);

    // Also add from current today meals
    var today = DateUtils2.today ? DateUtils2.today() : new Date().toISOString().split('T')[0];
    processDay(today);

    // Sort by category then name
    var list = Object.values(ingredientMap);
    list.sort(function (a, b) {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return a.name.localeCompare(b.name);
    });

    // If empty, generate default essentials
    if (list.length === 0) {
      list = ShoppingList._getDefaultList();
    }

    return list;
  },

  _categorize(name) {
    var proteinas = ['frango', 'carne', 'peixe', 'ovo', 'atum', 'sardinha', 'camarao', 'salmao', 'tilapia', 'proteina'];
    var laticinios = ['leite', 'queijo', 'iogurte', 'requeijao', 'manteiga', 'whey'];
    var graos = ['arroz', 'feijao', 'lentilha', 'aveia', 'quinoa', 'grao', 'fubá', 'fuba', 'macarrao', 'pao'];
    var frutas = ['banana', 'maca', 'laranja', 'mamao', 'abacaxi', 'mango', 'morango', 'uva', 'pera', 'limao', 'melao'];
    var vegetais = ['alface', 'tomate', 'cenoura', 'brocolis', 'espinafre', 'couve', 'chuchu', 'abobrinha', 'pepino', 'pimentao', 'repolho', 'berinjela'];
    var condimentos = ['azeite', 'oleo', 'sal', 'pimenta', 'alho', 'cebola', 'shoyu', 'vinagre', 'mostarda', 'molho'];

    var n = name.toLowerCase();
    if (proteinas.some(function (p) { return n.includes(p); })) return '1-Proteinas';
    if (laticinios.some(function (p) { return n.includes(p); })) return '2-Laticinios';
    if (graos.some(function (p) { return n.includes(p); })) return '3-Graos e Cereais';
    if (frutas.some(function (p) { return n.includes(p); })) return '4-Frutas';
    if (vegetais.some(function (p) { return n.includes(p); })) return '5-Vegetais';
    if (condimentos.some(function (p) { return n.includes(p); })) return '6-Condimentos';
    return '7-Outros';
  },

  _capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  _groupByCategory(list) {
    var groups = {};
    list.forEach(function (item) {
      var cat = item.category || '7-Outros';
      var catLabel = cat.replace(/^\d+-/, '');
      if (!groups[catLabel]) groups[catLabel] = [];
      groups[catLabel].push(item);
    });
    return groups;
  },

  _getDefaultList() {
    var defaults = [
      { name: 'Peito de Frango', qty: '1kg', category: '1-Proteinas', checked: false, count: 1 },
      { name: 'Ovos', qty: '12 unidades', category: '1-Proteinas', checked: false, count: 1 },
      { name: 'Atum em conserva', qty: '3 latas', category: '1-Proteinas', checked: false, count: 1 },
      { name: 'Leite desnatado', qty: '2L', category: '2-Laticinios', checked: false, count: 1 },
      { name: 'Iogurte natural', qty: '500g', category: '2-Laticinios', checked: false, count: 1 },
      { name: 'Queijo cottage', qty: '200g', category: '2-Laticinios', checked: false, count: 1 },
      { name: 'Arroz integral', qty: '1kg', category: '3-Graos e Cereais', checked: false, count: 1 },
      { name: 'Feijao carioca', qty: '500g', category: '3-Graos e Cereais', checked: false, count: 1 },
      { name: 'Aveia em flocos', qty: '500g', category: '3-Graos e Cereais', checked: false, count: 1 },
      { name: 'Banana', qty: '1 cacho', category: '4-Frutas', checked: false, count: 1 },
      { name: 'Maca', qty: '6 unidades', category: '4-Frutas', checked: false, count: 1 },
      { name: 'Laranja', qty: '6 unidades', category: '4-Frutas', checked: false, count: 1 },
      { name: 'Alface americana', qty: '1 pe', category: '5-Vegetais', checked: false, count: 1 },
      { name: 'Tomate', qty: '6 unidades', category: '5-Vegetais', checked: false, count: 1 },
      { name: 'Brocolis', qty: '1 cabeca', category: '5-Vegetais', checked: false, count: 1 },
      { name: 'Cenoura', qty: '500g', category: '5-Vegetais', checked: false, count: 1 },
      { name: 'Azeite extra virgem', qty: '500ml', category: '6-Condimentos', checked: false, count: 1 },
      { name: 'Alho', qty: '1 cabeca', category: '6-Condimentos', checked: false, count: 1 }
    ];
    return defaults;
  },

  _renderList(list) {
    var grouped = ShoppingList._groupByCategory(list);
    var checked = list.filter(function (i) { return i.checked; }).length;
    var pct = list.length > 0 ? Math.round((checked / list.length) * 100) : 0;

    var html = '<div class="card" style="margin-bottom:20px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
      '<div style="font-size:var(--text-sm);color:var(--text-secondary)">' + checked + ' de ' + list.length + ' itens marcados</div>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="btn btn-outline btn-sm" id="btn-export-list">&#128190; Exportar</button>' +
      '<button class="btn btn-ghost btn-sm" id="btn-clear-list" style="color:var(--error)">&#128465; Limpar</button></div></div>' +
      '<div style="background:var(--bg-input);border-radius:var(--radius-md);height:8px;overflow:hidden">' +
      '<div style="height:100%;width:' + pct + '%;background:var(--primary-500);transition:width 0.3s ease;border-radius:var(--radius-md)"></div></div></div>';

    var allItems = [];
    Object.keys(grouped).sort().forEach(function (cat) {
      html += '<div class="card" style="margin-bottom:12px">' +
        '<div class="card-header"><h3 style="font-size:var(--text-sm)">' + cat + '</h3>' +
        '<span class="badge badge-info">' + grouped[cat].filter(function (i) { return i.checked; }).length + '/' + grouped[cat].length + '</span></div>';
      grouped[cat].forEach(function (item) {
        var globalIdx = list.findIndex(function (l) { return l.name === item.name; });
        html += '<label style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-color);cursor:pointer">' +
          '<input type="checkbox" class="shopping-check" data-idx="' + globalIdx + '" ' + (item.checked ? 'checked' : '') + ' style="width:18px;height:18px;cursor:pointer">' +
          '<div style="flex:1">' +
          '<div style="font-weight:600;' + (item.checked ? 'text-decoration:line-through;color:var(--text-muted)' : '') + '">' + item.name + '</div>' +
          (item.qty ? '<div style="font-size:var(--text-xs);color:var(--text-muted)">' + item.qty + '</div>' : '') +
          '</div></label>';
      });
      html += '</div>';
    });

    return html;
  }
};
